import {
  enviarMensajeChatbot,
  MENSAJE_ERROR_CHATBOT,
  MENSAJE_TIMEOUT_CHATBOT,
} from '../components/Features/chatbot/chatbotApi';

const respuesta = (status, body) => Promise.resolve({ ok: status >= 200 && status < 300, status, json: async () => body });

describe('chatbot mobile', () => {
  afterEach(() => jest.useRealTimers());

  it('devuelve la respuesta del bot', async () => {
    const fetchImpl = jest.fn(() => respuesta(200, { data: { chat_response: 'Elegí un evento y un puesto.' } }));
    await expect(enviarMensajeChatbot('¿Cómo pido?', { fetchImpl, baseUrl: 'https://api/' })).resolves.toBe('Elegí un evento y un puesto.');
    expect(fetchImpl.mock.calls[0][0]).toBe('https://api/chatbot');
    expect(fetchImpl.mock.calls[0][1].body).toBe('userMessage=%C2%BFC%C3%B3mo+pido%3F');
  });

  it('un error del servidor llega como mensaje para mostrar en el chat', async () => {
    const fetchImpl = () => respuesta(429, { msg: 'Demasiados mensajes, esperá un minuto.' });
    await expect(enviarMensajeChatbot('hola', { fetchImpl, baseUrl: 'https://api/' })).rejects.toThrow('Demasiados mensajes, esperá un minuto.');
  });

  it('un fallo de red o una respuesta inválida muestran el mensaje genérico', async () => {
    await expect(enviarMensajeChatbot('hola', { fetchImpl: () => Promise.reject(new TypeError('Network request failed')), baseUrl: 'https://api/' })).rejects.toThrow(MENSAJE_ERROR_CHATBOT);
    await expect(enviarMensajeChatbot('hola', { fetchImpl: () => respuesta(200, { data: {} }), baseUrl: 'https://api/' })).rejects.toThrow(MENSAJE_ERROR_CHATBOT);
  });

  it('corta la espera y avisa si el bot tarda demasiado', async () => {
    jest.useFakeTimers();
    const fetchImpl = (_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => reject(Object.assign(new Error('Aborted'), { name: 'AbortError' })));
    });
    const envio = enviarMensajeChatbot('hola', { fetchImpl, baseUrl: 'https://api/', timeoutMs: 1000 });
    jest.advanceTimersByTime(1000);
    await expect(envio).rejects.toThrow(MENSAJE_TIMEOUT_CHATBOT);
  });
});
