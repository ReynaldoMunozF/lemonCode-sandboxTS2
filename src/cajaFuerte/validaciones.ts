// validaciones.ts

export interface ValidacionClave {
    esValida: boolean;
    error?: string;
  }
  
  export const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
    const tieneMayus = /[A-Z]/.test(clave);
    const tieneMinus = /[a-z]/.test(clave);
    return tieneMayus && tieneMinus
      ? { esValida: true }
      : { esValida: false, error: "La clave debe de tener mayúsculas y minúsculas" };
  };
  
  export const tieneNumeros = (clave: string): ValidacionClave => {
    return /\d/.test(clave)
      ? { esValida: true }
      : { esValida: false, error: "La clave debe de tener números" };
  };
  
  export const tieneCaracteresEspeciales = (clave: string): ValidacionClave => {
    return /[@#_+\-.,!$%^&*()]/.test(clave)
      ? { esValida: true }
      : { esValida: false, error: "La clave debe de tener caracteres especiales" };
  };
  
  export const tieneLongitudMinima = (clave: string): ValidacionClave => {
    return clave.length >= 8
      ? { esValida: true }
      : { esValida: false, error: "La clave debe de tener una longitud mínima de 8 caracteres" };
  };
  
  export const tieneNombreUsuario = (nombreUsuario: string, clave: string): ValidacionClave => {
    return clave.toLowerCase().includes(nombreUsuario.toLowerCase())
      ? { esValida: false, error: "La clave no debe tener el nombre del usuario" }
      : { esValida: true };
  };
  
  export const tienePalabrasComunes = (clave: string, comunes: string[]): ValidacionClave => {
    const claveLower = clave.toLowerCase();
    return comunes.some(p => claveLower.includes(p))
      ? { esValida: false, error: "La clave no debe de contener palabras comunes" }
      : { esValida: true };
  };
  