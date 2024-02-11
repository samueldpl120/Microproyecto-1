let count = 0; // Variable global. Indices para el sessionStorage
let turno = 1; // Variable global. Turno

//Mostrar Turno
var elementoTurno = document.getElementById("turno");
elementoTurno.textContent = turno;

function mostrarFormulario() {
  if (VerificarCartonLleno()) {
    verificarYAgregarAlLocalStorage();
    vitoria();
    crearTabla();
    let popup2 = document.getElementById("popup2");
    popup2.style.display = "block";
  } else {
    if (turno < 25) {
      AsignarPuntos();
      let popup = document.getElementById("popup");
      let number = document.getElementById("number");
      var n = generarNumeroAleatorio();

      var arregloGuardado = JSON.parse(sessionStorage.getItem("arreglo"));

      while (arregloGuardado.indexOf(n) !== -1) {
        n = generarNumeroAleatorio();
      }

      arregloGuardado.push(n);
      sessionStorage.setItem("arreglo", JSON.stringify(arregloGuardado));
      AsignarPuntos();
      number.textContent = n;
      popup.style.display = "block";
    } else {
      verificarYAgregarAlLocalStorage();
      vitoria();
      crearTabla();
      let popup2 = document.getElementById("popup2");
      popup2.style.display = "block";
    }
  }
}

function mostrarFondoOscuro() {
  var fondoOscuro = document.getElementById("fondoOscuro");
  fondoOscuro.style.display = "block";
}

function ocultarFondoOscuro() {
  var fondoOscuro = document.getElementById("fondoOscuro");
  fondoOscuro.style.display = "none";
}

// En la nueva página
document.addEventListener("DOMContentLoaded", function () {
  // Obtener los valores almacenados en sessionStorage
  let jugador1 = JSON.parse(sessionStorage.getItem("j1"));

  //Crear arreglo que contendrá los numeros que ya hayan salido
  let arregloNum = [];
  sessionStorage.setItem("arreglo", JSON.stringify(arregloNum));

  let mostraIndex = count + 1;

  // Mostrar los valores en la página
  document.getElementById("jugador").textContent =
    "Jugador " + mostraIndex + ": " + jugador1.nombre;
  console.log(sessionStorage.getItem("j1"));

  let j1String = sessionStorage.getItem("j1");
  // Convertir la cadena JSON de vuelta a un objeto JavaScript
  let j1c = JSON.parse(j1String);
  // Acceder al atributo 'matriz' del objeto j1
  let matriz = j1c.matriz;

  mostrarMatrizEnHTML(matriz);
});

//Funcion para mostrar la matriz
function mostrarMatrizEnHTML(matriz) {
  let matrizContainer = document.getElementById("matriz-container");
  let tabla = document.createElement("table");
  let arregloNumeros = JSON.parse(sessionStorage.getItem("arreglo"));

  for (let i = 0; i < matriz.length; i++) {
    let fila = document.createElement("tr");

    for (let j = 0; j < matriz[i].length; j++) {
      let celda = document.createElement("td");
      celda.textContent = matriz[i][j];
      console.log(arregloNumeros.includes(parseInt(celda.textContent)));
      if (arregloNumeros.includes(parseInt(celda.textContent))) {
        celda.style.backgroundColor = "yellow";
      }
      fila.appendChild(celda);
    }

    tabla.appendChild(fila);
  }

  matrizContainer.appendChild(tabla);
}

//Funcion para actualizar la matriz
function ModificarMatriz(matriz) {
  const element = document.getElementById("matriz-container");
  const children = element.childNodes;

  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i];
    if (
      child.tagName === "TABLE" ||
      child.tagName === "TR" ||
      child.tagName === "TD"
    ) {
      element.removeChild(child);
    }
  }
  mostrarMatrizEnHTML(matriz);
}

//Funcion para ver el siguiente jugador
function siguienteJugador() {
  count = count + 1;

  if (count === 4) {
    count = 0;
  }

  let elementos = [
    sessionStorage.getItem("j1"),
    sessionStorage.getItem("j2"),
    sessionStorage.getItem("j3"),
    sessionStorage.getItem("j4"),
  ];

  //Tomo el elemento actual
  let elementoActual = elementos[count];

  //Convierto a Objeto el elemento
  elementact = JSON.parse(elementoActual);
  let mostraIndex = count + 1;

  document.getElementById("jugador").textContent =
    "Jugador " + mostraIndex + ": " + elementact.nombre;
  ModificarMatriz(elementact.matriz);
}

//Funcion para ver el siguiente jugador
function ActualJugador() {
  let elementos = [
    sessionStorage.getItem("j1"),
    sessionStorage.getItem("j2"),
    sessionStorage.getItem("j3"),
    sessionStorage.getItem("j4"),
  ];

  //Tomo el elemento actual
  let elementoActual = elementos[count];

  //Convierto a Objeto el elemento
  elementact = JSON.parse(elementoActual);
  let mostraIndex = count + 1;

  document.getElementById("jugador").textContent =
    "Jugador " + mostraIndex + ": " + elementact.nombre;
  ModificarMatriz(elementact.matriz);
}

//Funcion para ver el jugador anterior
function Retroceder() {
  count = count - 1;

  if (count === -1) {
    count = 3;
  }

  let elementos = [
    sessionStorage.getItem("j1"),
    sessionStorage.getItem("j2"),
    sessionStorage.getItem("j3"),
    sessionStorage.getItem("j4"),
  ];

  //Tomo el elemento actual
  let elementoActual = elementos[count];

  //Convierto a Objeto el elemento
  elementact = JSON.parse(elementoActual);
  let mostraIndex = count + 1;

  document.getElementById("jugador").textContent =
    "Jugador " + mostraIndex + ": " + elementact.nombre;
  ModificarMatriz(elementact.matriz);
}

//Funcion para abortar la poartida
function vaciarSessionStorageYRedirigir() {
  // Vaciar sessionStorage
  sessionStorage.clear();

  // Redirigir a otra página
  window.location.href = "index.html";
}

//Funcion para generar un numero aleatorio
function generarNumeroAleatorio() {
  return Math.floor(Math.random() * 50) + 1;
}

function ocultarPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "none";
  turno = turno + 1;

  var elementoTurno = document.getElementById("turno");
  elementoTurno.textContent = turno;
}

function AsignarPuntos() {
  var elemento1 = JSON.parse(sessionStorage.getItem("j1"));
  var elemento2 = JSON.parse(sessionStorage.getItem("j2"));
  var elemento3 = JSON.parse(sessionStorage.getItem("j3"));
  var elemento4 = JSON.parse(sessionStorage.getItem("j4"));

  let matriz1 = elemento1.matriz;
  let matriz2 = elemento2.matriz;
  let matriz3 = elemento3.matriz;
  let matriz4 = elemento4.matriz;

  let arreglo = JSON.parse(sessionStorage.getItem("arreglo"));

  var puntosVertical1 = columnasCompletasEnArreglo(matriz1, arreglo);
  var puntosVertical2 = columnasCompletasEnArreglo(matriz2, arreglo);
  var puntosVertical3 = columnasCompletasEnArreglo(matriz3, arreglo);
  var puntosVertical4 = columnasCompletasEnArreglo(matriz4, arreglo);

  var puntosHorizontal1 = filasCompletasEnArreglo(matriz1, arreglo);
  var puntosHorizontal2 = filasCompletasEnArreglo(matriz2, arreglo);
  var puntosHorizontal3 = filasCompletasEnArreglo(matriz3, arreglo);
  var puntosHorizontal4 = filasCompletasEnArreglo(matriz4, arreglo);

  var diagonal1 = sumarDiagonalesSiContenidas(matriz1, arreglo);
  var diagonal2 = sumarDiagonalesSiContenidas(matriz2, arreglo);
  var diagonal3 = sumarDiagonalesSiContenidas(matriz3, arreglo);
  var diagonal4 = sumarDiagonalesSiContenidas(matriz4, arreglo);

  var puntosCartonLleno1 = sumarCartonLleno(matriz1, arreglo);
  var puntosCartonLleno2 = sumarCartonLleno(matriz2, arreglo);
  var puntosCartonLleno3 = sumarCartonLleno(matriz3, arreglo);
  var puntosCartonLleno4 = sumarCartonLleno(matriz4, arreglo);

  elemento1.puntos =
    puntosVertical1 + puntosHorizontal1 + diagonal1 + puntosCartonLleno1;
  elemento2.puntos =
    puntosVertical2 + puntosHorizontal2 + diagonal2 + puntosCartonLleno2;
  elemento3.puntos =
    puntosVertical3 + puntosHorizontal3 + diagonal3 + puntosCartonLleno3;
  elemento4.puntos =
    puntosVertical4 + puntosHorizontal4 + diagonal4 + puntosCartonLleno4;

  sessionStorage.setItem("j1", JSON.stringify(elemento1));
  sessionStorage.setItem("j2", JSON.stringify(elemento2));
  sessionStorage.setItem("j3", JSON.stringify(elemento3));
  sessionStorage.setItem("j4", JSON.stringify(elemento4));
}

function columnasCompletasEnArreglo(matriz, arreglo) {
  var columnasCompletas = 0;

  // Recorremos cada columna de la matriz
  for (var j = 0; j < matriz[0].length; j++) {
    var columnaEnArreglo = true;

    // Verificamos si todos los elementos de la columna están en el arreglo
    for (var i = 0; i < matriz.length; i++) {
      if (!arreglo.includes(matriz[i][j])) {
        columnaEnArreglo = false;
        break;
      }
    }

    // Si la columna está contenida en el arreglo, sumamos 1 a columnasCompletas
    if (columnaEnArreglo) {
      columnasCompletas++;
    }
  }

  return columnasCompletas;
}

function filasCompletasEnArreglo(matriz, arreglo) {
  var filasCompletas = 0;

  // Recorremos cada fila de la matriz
  for (var i = 0; i < matriz.length; i++) {
    var filaEnArreglo = true;

    // Verificamos si todos los elementos de la fila están en el arreglo
    for (var j = 0; j < matriz[i].length; j++) {
      if (!arreglo.includes(matriz[i][j])) {
        filaEnArreglo = false;
        break;
      }
    }

    // Si la fila está contenida en el arreglo, sumamos 1 a filasCompletas
    if (filaEnArreglo) {
      filasCompletas++;
    }
  }

  return filasCompletas;
}

function sumarCartonLleno(matriz, arreglo) {
  var suma = 0;

  // Verificar si todos los números de la matriz están en el arreglo
  var todosContenidos = true;
  for (var i = 0; i < matriz.length; i++) {
    for (var j = 0; j < matriz[i].length; j++) {
      if (!arreglo.includes(matriz[i][j])) {
        todosContenidos = false;
        break;
      }
    }
    if (!todosContenidos) {
      break;
    }
  }

  // Si todos los números de la matriz están en el arreglo, sumar 5 a la variable
  if (todosContenidos) {
    suma += 5;
  }

  return suma;
}

function sumarDiagonalesSiContenidas(matriz, arreglo) {
  var suma = 0;

  // Verificar si todos los números de la diagonal principal están en el arreglo
  var diagonalPrincipalContenida = true;
  for (var i = 0; i < matriz.length; i++) {
    if (!arreglo.includes(matriz[i][i])) {
      diagonalPrincipalContenida = false;
      break;
    }
  }

  // Verificar si todos los números de la diagonal secundaria están en el arreglo
  var diagonalSecundariaContenida = true;
  for (var i = 0; i < matriz.length; i++) {
    if (!arreglo.includes(matriz[i][matriz.length - 1 - i])) {
      diagonalSecundariaContenida = false;
      break;
    }
  }

  // Si todos los números de ambas diagonales están en el arreglo, sumar 5 a la variable
  if (diagonalPrincipalContenida && diagonalSecundariaContenida) {
    suma += 4;
  } else if (diagonalPrincipalContenida) {
    suma += 2;
  } else if (diagonalSecundariaContenida) {
    suma += 2;
  }

  return suma;
}

function crearTabla() {
  // Obtener los objetos del sessionStorage
  let j1 = JSON.parse(sessionStorage.getItem("j1"));
  let j2 = JSON.parse(sessionStorage.getItem("j2"));
  let j3 = JSON.parse(sessionStorage.getItem("j3"));
  let j4 = JSON.parse(sessionStorage.getItem("j4"));

  // Crear un array de jugadores
  let jugadores = [j1, j2, j3, j4];

  // Ordenar los jugadores por puntos en orden ascendente
  jugadores.sort((a, b) => b.puntos - a.puntos);

  // Crear la tabla HTML
  let tabla = '<table border="1" class="tabla-resultados">';
  tabla += "<tr><th>Nombre</th><th>Puntos</th><th>Lugar</th></tr>";

  // Iterar sobre los jugadores para agregar filas a la tabla
  jugadores.forEach((jugador, index) => {
    tabla += "<tr>";
    tabla += `<td>${jugador.nombre}</td>`;
    tabla += `<td>${jugador.puntos}</td>`;
    tabla += `<td>${index + 1}</td>`; // El lugar se determina por el índice + 1
    tabla += "</tr>";
  });

  tabla += "</table>";

  // Insertar la tabla en el div con id "popup2"
  document.getElementById("popup2").innerHTML = tabla;

  // Crear un botón "Terminar partida"
  let botonTerminar = document.createElement("button");
  botonTerminar.id = "terminarPartidaBtn";

  botonTerminar.textContent = "Terminar partida";
  botonTerminar.addEventListener("click", function () {
    vaciarSessionStorageYRedirigir();
  });

  // Insertar el botón debajo de la tabla
  document.getElementById("popup2").appendChild(botonTerminar);
}

function CartonLleno(matriz, arreglo) {
  // Crear un arreglo plano a partir de la matriz
  const numerosMatriz = matriz.flat();

  // Verificar si todos los números de la matriz están en el arreglo
  for (let i = 0; i < numerosMatriz.length; i++) {
    if (!arreglo.includes(numerosMatriz[i])) {
      return false;
    }
  }

  return true;
}

function VerificarCartonLleno() {
  let j1 = JSON.parse(sessionStorage.getItem("j1"));
  let j2 = JSON.parse(sessionStorage.getItem("j2"));
  let j3 = JSON.parse(sessionStorage.getItem("j3"));
  let j4 = JSON.parse(sessionStorage.getItem("j4"));

  let arreglo = JSON.parse(sessionStorage.getItem("arreglo"));

  if (
    CartonLleno(j1.matriz, arreglo) ||
    CartonLleno(j2.matriz, arreglo) ||
    CartonLleno(j3.matriz, arreglo) ||
    CartonLleno(j4.matriz, arreglo)
  ) {
    return true;
  }
  return false;
}

function verificarYAgregarAlLocalStorage() {
  // Obtener los elementos del sessionStorage
  let j1 = JSON.parse(sessionStorage.getItem("j1"));
  let j2 = JSON.parse(sessionStorage.getItem("j2"));
  let j3 = JSON.parse(sessionStorage.getItem("j3"));
  let j4 = JSON.parse(sessionStorage.getItem("j4"));

  // Verificar si los elementos existen en el localStorage y agregarlos si no existen
  agregarAlLocalStorageSiNoExiste(j1.nombre);
  agregarAlLocalStorageSiNoExiste(j2.nombre);
  agregarAlLocalStorageSiNoExiste(j3.nombre);
  agregarAlLocalStorageSiNoExiste(j4.nombre);
}

function agregarAlLocalStorageSiNoExiste(key) {
  // Obtener el valor del localStorage
  let valorLocalStorage = JSON.parse(localStorage.getItem(key));
  // Verificar si el valor no existe en el localStorage
  if (!valorLocalStorage) {
    // Agregar el valor al localStorage
    localStorage.setItem(key, 0);
  }
}

function vitoria() {
  // Obtener los objetos del sessionStorage
  let j1 = JSON.parse(sessionStorage.getItem("j1"));
  let j2 = JSON.parse(sessionStorage.getItem("j2"));
  let j3 = JSON.parse(sessionStorage.getItem("j3"));
  let j4 = JSON.parse(sessionStorage.getItem("j4"));

  // Array de jugadores
  let jugadores = [j1, j2, j3, j4];

  // Inicializar variables para el jugador con más puntos
  let jugadorConMasPuntos = jugadores[0].nombre;
  let maxPuntos = jugadores[0].puntos; // Inicializamos con los puntos del primer jugador

  // Iterar sobre los jugadores para encontrar el que tiene más puntos
  jugadores.forEach((jugador) => {
    if (jugador.puntos > maxPuntos) {
      maxPuntos = jugador.puntos;
      jugadorConMasPuntos = jugador.nombre;
    }
  });

  var pto = localStorage.getItem(jugadorConMasPuntos);
  pto = parseInt(pto) + 1;
  localStorage.setItem(jugadorConMasPuntos, pto);
}
