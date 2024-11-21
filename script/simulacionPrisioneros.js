const cajasConNumerosDesordenados = [
    56, 97, 59, 88, 11, 92, 40, 73, 57, 99, 33, 20, 28, 1, 7, 36, 55, 24, 93, 74,
    91, 53, 35, 3, 27, 69, 90, 76, 87, 9, 2, 15, 48, 41, 77, 61, 50, 68, 32, 95,
    75, 49, 65, 71, 21, 19, 80, 89, 26, 14, 67, 37, 46, 31, 18, 86, 6, 25, 78, 30,
    42, 10, 8, 17, 72, 29, 58, 4, 60, 44, 63, 98, 34, 52, 39, 94, 13, 5, 45, 12,
    96, 84, 66, 83, 47, 79, 81, 70, 85, 43, 64, 0, 51, 22, 16, 62, 54, 38, 82, 23,
  ];
  
  // Función para desordenar el arreglo usando el algoritmo de Fisher-Yates
  function desordenarArreglo(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Intercambiar elementos
    }
  }
  
  // Función para obtener un índice aleatorio entre 0 y el tamaño del arreglo
  function obtenerIndiceAleatorio(arr) {
    return Math.floor(Math.random() * arr.length);
  }
  
  function prisioneroSeleccionaCajasAlAzar() {
    // Inicializar el registro de intentos
    let registroIntentos = {
      tipoDeIntento: "50 cajas al azar",
      prisionerosExitosos: [],
      prisionerosFallidos: [],
      estadisticas: {
        totalExitos: 0,
        totalFallos: 0,
      },
      intentos: [], // Detalle de cada intento individual
    };
  
    // Simular el intento para cada prisionero
    for (let prisionero = 0; prisionero < 100; prisionero++) {
      let cajasAbiertas = new Set(); // Para evitar abrir la misma caja más de una vez
      let cajasEncontradas = [];
      let encontroSuNumero = false;
  
      // Seleccionar 50 cajas al azar o hasta que encuentre su número
      while (cajasAbiertas.size < 50) {
        let cajaAzar = Math.floor(Math.random() * 100); // Índice entre 0 y 99
        if (!cajasAbiertas.has(cajaAzar)) {
          cajasAbiertas.add(cajaAzar);
          let numeroEncontrado = cajasConNumerosDesordenados[cajaAzar];
          cajasEncontradas.push({
            cajaNumero: cajaAzar,
            numeroEncontrado: numeroEncontrado,
          });
  
          // Verificar si encontró su número
          if (numeroEncontrado === prisionero) {
            encontroSuNumero = true;
            break; // Detener la búsqueda al encontrar su número
          }
        }
      }
  
      // Registrar el intento
      registroIntentos.intentos.push({
        prisionero,
        cajasEncontradas,
        encontroSuNumero,
      });
  
      // Actualizar estadísticas y clasificar al prisionero
      if (encontroSuNumero) {
        registroIntentos.estadisticas.totalExitos++;
        registroIntentos.prisionerosExitosos.push(prisionero);
      } else {
        registroIntentos.estadisticas.totalFallos++;
        registroIntentos.prisionerosFallidos.push(prisionero);
      }
    }
  
    // Retornar el registro de intentos
    return registroIntentos;
  }
  
  function prisioneroSigueCiclo() {
    // Desordenar el arreglo de cajas antes de empezar
    let cajasDesordenadas = [...cajasConNumerosDesordenados]; // Copiar el arreglo original
    desordenarArreglo(cajasDesordenadas);
  
    // Inicializar el registro de intentos
    let registroIntentos = {
      tipoDeIntento: "Sigue el ciclo desde su número",
      prisionerosExitosos: [],
      prisionerosFallidos: [],
      estadisticas: {
        totalExitos: 0,
        totalFallos: 0,
      },
      intentos: [], // Detalle de cada intento individual
    };
  
    // Simular el intento para cada prisionero
    for (let prisionero = 0; prisionero < 100; prisionero++) {
      let cajasEncontradas = [];
      let encontroSuNumero = false;
      let cajaActual = prisionero; // Inicia con la caja que corresponde a su número
  
      // Seguir el ciclo por hasta 50 intentos
      for (let intentos = 0; intentos < 50; intentos++) {
        let numeroEncontrado = cajasDesordenadas[cajaActual];
  
        // Registrar la caja abierta
        cajasEncontradas.push({
          cajaNumero: cajaActual,
          numeroEncontrado,
        });
  
        // Verificar si encontró su número
        if (numeroEncontrado === prisionero) {
          encontroSuNumero = true;
          break;
        }
  
        // Continuar al siguiente número encontrado
        cajaActual = numeroEncontrado;
      }
  
      // Registrar el intento
      registroIntentos.intentos.push({
        prisionero,
        cajasEncontradas,
        encontroSuNumero,
      });
  
      // Actualizar estadísticas y clasificar al prisionero
      if (encontroSuNumero) {
        registroIntentos.estadisticas.totalExitos++;
        registroIntentos.prisionerosExitosos.push(prisionero);
      } else {
        registroIntentos.estadisticas.totalFallos++;
        registroIntentos.prisionerosFallidos.push(prisionero);
      }
    }
  
    // Retornar el registro de intentos
    return registroIntentos;
  }
  
  function prisioneroAbreCajaAlAzarYsigueCiclo() {
    // Inicializar el registro de intentos
    let registroIntentos = {
      tipoDeIntento: "Abre una caja al azar y sigue el ciclo",
      prisionerosExitosos: [],
      prisionerosFallidos: [],
      estadisticas: {
        totalExitos: 0,
        totalFallos: 0,
      },
      intentos: [], // Detalle de cada intento individual
    };
  
    // Simular el intento para cada prisionero
    for (let prisionero = 0; prisionero < 100; prisionero++) {
      let cajasEncontradas = [];
      let encontroSuNumero = false;
      let cajaActual = obtenerIndiceAleatorio(cajasConNumerosDesordenados); // Inicia con una caja aleatoria
  
      // Seguir el ciclo por hasta 50 intentos o hasta encontrar el número
      for (let intentos = 0; intentos < 50; intentos++) {
        let numeroEncontrado = cajasConNumerosDesordenados[cajaActual];
  
        // Registrar la caja abierta
        cajasEncontradas.push({
          cajaNumero: cajaActual,
          numeroEncontrado,
        });
  
        // Verificar si encontró su número
        if (numeroEncontrado === prisionero) {
          encontroSuNumero = true;
          break; // Detener la búsqueda si encontró su número
        }
  
        // Continuar al siguiente número encontrado
        cajaActual = numeroEncontrado;
      }
  
      // Registrar el intento
      registroIntentos.intentos.push({
        prisionero,
        cajasEncontradas,
        encontroSuNumero,
      });
  
      // Actualizar estadísticas y clasificar al prisionero
      if (encontroSuNumero) {
        registroIntentos.estadisticas.totalExitos++;
        registroIntentos.prisionerosExitosos.push(prisionero);
      } else {
        registroIntentos.estadisticas.totalFallos++;
        registroIntentos.prisionerosFallidos.push(prisionero);
      }
    }
  
    // Retornar el registro de intentos
    return registroIntentos;
  }
  
  
  // Funcion 1
  // Ejecutar la simulación y guardar los resultados
  //let intento = prisioneroSeleccionaCajasAlAzar();
  
  // Mostrar los resultados en consola para validar
  //console.log(JSON.stringify(intento, null, 2));
  
  // Funcion 2
  // Ejecutar la simulación y guardar los resultados
  // let intento = prisioneroSigueCiclo();
  
  // Mostrar los resultados en consola para validar
  // console.log(JSON.stringify(intento, null, 2));
  
  // Funcion 3
  // Ejecutar la simulación y guardar los resultados
  let intento = prisioneroAbreCajaAlAzarYsigueCiclo();
  
  // Mostrar los resultados en consola para validar
  console.log(JSON.stringify(intento, null, 2));
  