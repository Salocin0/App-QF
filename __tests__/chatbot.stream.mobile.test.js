import {
  enviarMensajeChatbotStream,
  MENSAJE_ERROR_CHATBOT,
} from '../components/Features/chatbot/chatbotApi';

// Minimal XMLHttpRequest double: the test drives progress/load by hand.
const crearXhr = () => {
  const xhr = {
    status: 0,
    responseText: '',
    open: jest.fn((method, url) => { xhr.url = url; }),
    setRequestHeader: jest.fn(),
    send: jest.fn((body) => { xhr.body = body; }),
    abort: jest.fn(),
    progreso(texto) { xhr.status = 200; xhr.responseText += texto; xhr.onprogress(); },
    terminar(status = 200) { xhr.status = status; xhr.onload(); },
  };
  return xhr;
};

describe('chatbot mobile streaming', () => {
  it('va mostrando el texto a medida que llega y resuelve con la respuesta completa', async () => {
    const xhr = crearXhr();
    const parciales = [];
    const promesa = enviarMensajeChatbotStream('hola & chau', (t) => parciales.push(t), {
      xhrFactory: () => xhr,
      baseUrl: 'https://api.qf.test/',
    });

    expect(xhr.url).toBe('https://api.qf.test/chatbot/stream');
    expect(new URLSearchParams(xhr.body).get('userMessage')).toBe('hola & chau');
    xhr.progreso('Hola ');
    xhr.progreso('Ana');
    xhr.terminar();

    await expect(promesa).resolves.toBe('Hola Ana');
    expect(parciales.slice(0, 2)).toEqual(['Hola ', 'Hola Ana']);
  });

  it('usa el endpoint clásico si el backend no tiene streaming (404)', async () => {
    const xhr = crearXhr();
    const fallback = jest.fn(async () => 'respuesta clásica');
    const parciales = [];
    const promesa = enviarMensajeChatbotStream('hola', (t) => parciales.push(t), {
      xhrFactory: () => xhr,
      fallback,
    });
    xhr.terminar(404);

    await expect(promesa).resolves.toBe('respuesta clásica');
    expect(fallback).toHaveBeenCalledWith('hola', expect.any(Object));
    expect(parciales).toEqual(['respuesta clásica']);
  });

  it('muestra el mensaje de error del backend', async () => {
    const xhr = crearXhr();
    const promesa = enviarMensajeChatbotStream('hola', () => {}, { xhrFactory: () => xhr });
    xhr.responseText = JSON.stringify({ msg: 'Demasiadas consultas seguidas.' });
    xhr.terminar(429);
    await expect(promesa).rejects.toThrow('Demasiadas consultas seguidas.');
  });

  it('ante un 500 nunca muestra el texto del servidor', async () => {
    const xhr = crearXhr();
    const promesa = enviarMensajeChatbotStream('hola', () => {}, { xhrFactory: () => xhr });
    xhr.responseText = JSON.stringify({ msg: 'something went wrong :(' });
    xhr.terminar(500);
    await expect(promesa).rejects.toThrow(MENSAJE_ERROR_CHATBOT);
  });

  it('falla con el mensaje genérico ante un error de red', async () => {
    const xhr = crearXhr();
    const promesa = enviarMensajeChatbotStream('hola', () => {}, { xhrFactory: () => xhr });
    xhr.onerror();
    await expect(promesa).rejects.toThrow(MENSAJE_ERROR_CHATBOT);
  });
});
