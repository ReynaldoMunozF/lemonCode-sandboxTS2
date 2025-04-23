import {
    ValidacionClave,
    tieneMayusculasYMinusculas,
    tieneNumeros,
    tieneCaracteresEspeciales,
    tieneLongitudMinima,
    tieneNombreUsuario,
    tienePalabrasComunes,
  } from "./validaciones";
  
  import { commonPasswords } from "./palabras-comunes";
  
  export const validarClave = (
    nombreUsuario: string,
    clave: string
  ): ValidacionClave => {
    const validaciones = [
      tieneLongitudMinima(clave),
      tieneMayusculasYMinusculas(clave),
      tieneNumeros(clave),
      tieneCaracteresEspeciales(clave),
      tieneNombreUsuario(nombreUsuario, clave),
      tienePalabrasComunes(clave, commonPasswords),
    ];
  
    for (const v of validaciones) {
      if (!v.esValida) return v;
    }
  
    return { esValida: true };
  };