import { iniciarSeguimientoUbicacion } from '../components/Features/ubicacion/seguimientoUbicacion';

const flush = () => new Promise((resolve) => jest.requireActual('timers').setImmediate(resolve));

describe('seguimiento de ubicación', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('envía la ubicación cada intervalo', async () => {
    const enviar = jest.fn();
    const detener = iniciarSeguimientoUbicacion({ obtenerUbicacion: async () => ({ latitud: 1, longitud: 2 }), enviarUbicacion: enviar, intervaloMs: 5000 });
    jest.advanceTimersByTime(5000); await flush();
    jest.advanceTimersByTime(5000); await flush();
    expect(enviar).toHaveBeenCalledTimes(2);
    expect(enviar).toHaveBeenCalledWith({ latitud: 1, longitud: 2 });
    detener();
  });

  it('no superpone lecturas: con un GPS lento espera a que termine antes de pedir otra', async () => {
    let resolverLectura;
    const obtener = jest.fn(() => new Promise((resolve) => { resolverLectura = resolve; }));
    const detener = iniciarSeguimientoUbicacion({ obtenerUbicacion: obtener, enviarUbicacion: jest.fn(), intervaloMs: 5000 });
    jest.advanceTimersByTime(5000); await flush();
    jest.advanceTimersByTime(30000); await flush();
    expect(obtener).toHaveBeenCalledTimes(1);
    resolverLectura({ latitud: 1, longitud: 2 }); await flush();
    jest.advanceTimersByTime(5000); await flush();
    expect(obtener).toHaveBeenCalledTimes(2);
    detener();
  });

  it('después de detener no vuelve a leer ni enviar', async () => {
    const obtener = jest.fn(async () => ({ latitud: 1, longitud: 2 }));
    const enviar = jest.fn();
    const detener = iniciarSeguimientoUbicacion({ obtenerUbicacion: obtener, enviarUbicacion: enviar, intervaloMs: 5000 });
    detener();
    jest.advanceTimersByTime(20000); await flush();
    expect(obtener).not.toHaveBeenCalled();
    expect(enviar).not.toHaveBeenCalled();
  });

  it('un error no corta el seguimiento', async () => {
    const onError = jest.fn();
    const obtener = jest.fn().mockRejectedValueOnce(new Error('sin señal')).mockResolvedValue({ latitud: 1, longitud: 2 });
    const enviar = jest.fn();
    const detener = iniciarSeguimientoUbicacion({ obtenerUbicacion: obtener, enviarUbicacion: enviar, intervaloMs: 5000, onError });
    jest.advanceTimersByTime(5000); await flush();
    jest.advanceTimersByTime(5000); await flush();
    expect(onError).toHaveBeenCalledTimes(1);
    expect(enviar).toHaveBeenCalledTimes(1);
    detener();
  });
});
