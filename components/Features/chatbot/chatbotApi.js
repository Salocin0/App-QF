export const CHATBOT_TIMEOUT_MS = 45000;

const DEFAULT_API_URL = "https://backendnode-qf-production.up.railway.app/";
export const MENSAJE_ERROR_CHATBOT = "No pude responder en este momento. Intentá de nuevo en unos minutos.";
export const MENSAJE_TIMEOUT_CHATBOT = "Foody tardó demasiado en responder. Revisá tu conexión e intentá de nuevo.";

export const chatbotUrl = (baseUrl = process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL) =>
  `${baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`}chatbot`;

const mensajeDeError = (responseText) => {
  try {
    return JSON.parse(responseText)?.msg || MENSAJE_ERROR_CHATBOT;
  } catch {
    return MENSAJE_ERROR_CHATBOT;
  }
};

/**
 * Streams the reply from POST /chatbot/stream, calling onText(textSoFar) as it arrives.
 * React Native's fetch cannot read a body progressively, but its XMLHttpRequest
 * delivers incremental responseText through onprogress.
 * Falls back to the classic endpoint when the backend has no streaming route (404).
 * Resolves with the full reply; rejects with an Error ready to show in the chat.
 */
export function enviarMensajeChatbotStream(
  mensaje,
  onText,
  { xhrFactory = () => new XMLHttpRequest(), baseUrl, timeoutMs = CHATBOT_TIMEOUT_MS, fallback = enviarMensajeChatbot } = {}
) {
  return new Promise((resolve, reject) => {
    const xhr = xhrFactory();
    let settled = false;
    let recibido = 0;
    const finish = (fn, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      fn(value);
    };
    // Only waits for the first fragment; once Foody is writing the stream may take longer.
    const timeoutId = setTimeout(() => {
      xhr.abort();
      finish(reject, new Error(MENSAJE_TIMEOUT_CHATBOT));
    }, timeoutMs);

    xhr.open("POST", `${chatbotUrl(baseUrl)}/stream`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.responseType = "text";
    xhr.onprogress = () => {
      if (xhr.status !== 200) return;
      const texto = xhr.responseText || "";
      if (texto.length > recibido) {
        recibido = texto.length;
        clearTimeout(timeoutId);
        onText?.(texto);
      }
    };
    xhr.onload = () => {
      if (xhr.status === 404) {
        clearTimeout(timeoutId);
        settled = true;
        fallback(mensaje, { baseUrl, timeoutMs }).then(
          (texto) => {
            onText?.(texto);
            resolve(texto);
          },
          reject
        );
        return;
      }
      const texto = xhr.responseText || "";
      if (xhr.status !== 200) return finish(reject, new Error(mensajeDeError(texto)));
      if (!texto.trim()) return finish(reject, new Error(MENSAJE_ERROR_CHATBOT));
      onText?.(texto);
      finish(resolve, texto);
    };
    xhr.onerror = () => finish(reject, new Error(MENSAJE_ERROR_CHATBOT));
    xhr.send(new URLSearchParams({ userMessage: mensaje }).toString());
  });
}

/**
 * Sends a message to the help chatbot and resolves with the reply text.
 * Rejects with an Error whose message is ready to show in the chat (server error, invalid reply or timeout).
 */
export async function enviarMensajeChatbot(mensaje, { fetchImpl = fetch, baseUrl, timeoutMs = CHATBOT_TIMEOUT_MS } = {}) {
  const controller = new AbortController();
  let timedOut = false;
  const timeoutId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  try {
    const response = await fetchImpl(chatbotUrl(baseUrl), {
      method: "POST",
      body: new URLSearchParams({ userMessage: mensaje }).toString(),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: controller.signal,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data?.msg || MENSAJE_ERROR_CHATBOT);
    if (typeof data?.data?.chat_response !== "string") throw new Error(MENSAJE_ERROR_CHATBOT);
    return data.data.chat_response;
  } catch (error) {
    if (timedOut) throw new Error(MENSAJE_TIMEOUT_CHATBOT);
    throw new Error(error?.message && error.name !== "AbortError" && error.name !== "TypeError" ? error.message : MENSAJE_ERROR_CHATBOT);
  } finally {
    clearTimeout(timeoutId);
  }
}
