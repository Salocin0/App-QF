import { armarHistorial, cuerpoChatbot, enviarMensajeChatbotStream } from '../components/Features/chatbot/chatbotApi';

describe('memoria corta del chatbot (mobile)', () => {
  const conversacion = [
    { seq: 1, pregunta: 'q1', respuesta: 'a1' },
    { seq: 2, pregunta: 'q2', respuesta: 'a2' },
    { seq: 3, pregunta: 'q3', respuesta: 'a3' },
    { seq: 4, pregunta: 'q4', respuesta: 'a4' },
    { seq: 5, pregunta: 'q5' }, // pregunta actual, todavía sin respuesta
    { seq: 6, pregunta: 'q6' }, // pregunta encolada después
  ];

  it('usa los últimos 3 intercambios anteriores a la pregunta, en orden', () => {
    expect(armarHistorial(conversacion, 5)).toEqual([
      { rol: 'usuario', texto: 'q2' }, { rol: 'foody', texto: 'a2' },
      { rol: 'usuario', texto: 'q3' }, { rol: 'foody', texto: 'a3' },
      { rol: 'usuario', texto: 'q4' }, { rol: 'foody', texto: 'a4' },
    ]);
  });

  it('no incluye preguntas encoladas después ni respuestas fallidas', () => {
    const out = armarHistorial([{ seq: 1, pregunta: 'q1' }, { seq: 2, pregunta: 'q2', respuesta: '  ' }, { seq: 3, pregunta: 'q3' }], 3);
    expect(out).toEqual([{ rol: 'usuario', texto: 'q1' }, { rol: 'usuario', texto: 'q2' }]);
    expect(armarHistorial(undefined, 1)).toEqual([]);
  });

  it('manda el historial como JSON solo si hay mensajes previos', () => {
    expect(new URLSearchParams(cuerpoChatbot('hola', [])).get('historial')).toBeNull();
    const body = new URLSearchParams(cuerpoChatbot('¿y cuánto sale?', [{ rol: 'usuario', texto: 'vegano?' }]));
    expect(body.get('userMessage')).toBe('¿y cuánto sale?');
    expect(JSON.parse(body.get('historial'))).toEqual([{ rol: 'usuario', texto: 'vegano?' }]);
  });

  it('el streaming envía el historial en el cuerpo', () => {
    const xhr = { open: jest.fn(), setRequestHeader: jest.fn(), send: jest.fn(), abort: jest.fn() };
    enviarMensajeChatbotStream('¿y cuánto sale?', () => {}, {
      xhrFactory: () => xhr,
      historial: [{ rol: 'usuario', texto: 'vegano?' }],
    }).catch(() => {});
    const body = new URLSearchParams(xhr.send.mock.calls[0][0]);
    expect(JSON.parse(body.get('historial'))).toEqual([{ rol: 'usuario', texto: 'vegano?' }]);
    xhr.onerror();
  });
});
