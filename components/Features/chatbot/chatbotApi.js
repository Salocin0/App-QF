export const CHATBOT_TIMEOUT_MS = 45000;

const DEFAULT_API_URL = "https://backendnode-qf-production.up.railway.app/";
export const MENSAJE_ERROR_CHATBOT = "No pude responder en este momento. Intentá de nuevo en unos minutos.";
export const MENSAJE_TIMEOUT_CHATBOT = "Foody tardó demasiado en responder. Revisá tu conexión e intentá de nuevo.";

export const chatbotUrl = (baseUrl = process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL) =>
  `${baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`}chatbot`;

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
