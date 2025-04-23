
import { TipoIva } from "./modelos";

export const porcentajeIva: Record<TipoIva, number> = {
  general: 21,
  reducido: 10,
  superreducidoA: 5,
  superreducidoB: 4,
  superreducidoC: 0,
  sinIva: 0,
};
