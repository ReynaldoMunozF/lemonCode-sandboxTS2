interface ValidacionClave {
    esValida: boolean;
    error?: string;
  }
  
  const commonPasswords: string[] = [
    "password", "123456", "qwerty", "admin", "letmein", "welcome", "monkey", "sunshine",
    "password1", "123456789", "football", "iloveyou", "1234567", "123123", "12345678",
    "abc123", "qwerty123", "1q2w3e4r", "baseball", "password123", "superman", "987654321",
    "mypass", "trustno1", "hello123", "dragon", "1234", "555555", "loveme", "hello", 
    "hockey", "letmein123", "welcome123", "mustang", "shadow", "12345", "passw0rd", 
    "abcdef", "123abc", "football123", "master", "jordan23", "access", "flower", 
    "qwertyuiop", "admin123", "iloveyou123", "welcome1", "monkey123", "sunshine1", 
    "password12", "1234567890"
  ];
  
  const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
    const tieneMayus = /[A-Z]/.test(clave);
    const tieneMinus = /[a-z]/.test(clave);
    return tieneMayus && tieneMinus
      ? { esValida: true }
      : { esValida: false, error: "La clave debe de tener mayúsculas y minúsculas" };
  };
  
  const tieneNumeros = (clave: string): ValidacionClave => {
    return /\d/.test(clave)
      ? { esValida: true }
      : { esValida: false, error: "La clave debe de tener números" };
  };
  
  const tieneCaracteresEspeciales = (clave: string): ValidacionClave => {
    return /[@#_+\-.,!$%^&*()]/.test(clave)
      ? { esValida: true }
      : { esValida: false, error: "La clave debe de tener caracteres especiales" };
  };
  
  const tieneLongitudMinima = (clave: string): ValidacionClave => {
    return clave.length >= 8
      ? { esValida: true }
      : { esValida: false, error: "La clave debe de tener una longitud mínima de 8 caracteres" };
  };
  
  const tieneNombreUsuario = (nombreUsuario: string, clave: string): ValidacionClave => {
    const claveLower = clave.toLowerCase();
    const nombreLower = nombreUsuario.toLowerCase();
    return claveLower.includes(nombreLower)
      ? { esValida: false, error: "La clave no debe tener el nombre del usuario" }
      : { esValida: true };
  };
  
  const tienePalabrasComunes = (clave: string, commonPasswords: string[]): ValidacionClave => {
    const claveLower = clave.toLowerCase();
    const encontrada = commonPasswords.some(p => claveLower.includes(p));
    return encontrada
      ? { esValida: false, error: "La clave no debe de contener palabras comunes" }
      : { esValida: true };
  };
  
  const validarClave = (
    nombreUsuario: string,
    clave: string,
    commonPasswords: string[]
  ): ValidacionClave => {
    const validaciones = [
      tieneLongitudMinima(clave),
      tieneMayusculasYMinusculas(clave),
      tieneNumeros(clave),
      tieneCaracteresEspeciales(clave),
      tieneNombreUsuario(nombreUsuario, clave),
      tienePalabrasComunes(clave, commonPasswords),
    ];
  
    for (const validacion of validaciones) {
      if (!validacion.esValida) return validacion;
    }
  
    return { esValida: true };
  };
  
 
  const btnValidar = document.getElementById("validar")!;
  const resultado = document.getElementById("resultado")!;
  const inputUsuario = document.getElementById("usuario") as HTMLInputElement;
  const inputClave = document.getElementById("clave") as HTMLInputElement;
  
  btnValidar.addEventListener("click", () => {
    const usuario = inputUsuario.value;
    const clave = inputClave.value;
    const validacion = validarClave(usuario, clave, commonPasswords);
  
    if (validacion.esValida) {
      resultado.textContent = "✅ Clave válida";
      resultado.className = "resultado valida";
    } else {
      resultado.textContent = `❌ ${validacion.error}`;
      resultado.className = "resultado invalida";
    }
  });
  