// FUNCIONES OPERATORIAS

function sumar(a, b) { return parseInt(a) + parseInt(b); }
function restar(a, b) { return parseInt(a) - parseInt(b); }
function multiplicar(a, b) { return parseInt(a) * parseInt(b); }
function dividir(a, b) { return parseInt(a) / parseInt(b); }

// VARIABLES VARIAS

let resultado;
let listaPromedios = [];
let sumatoria;
let valor;
let datosJSON = "./json/valores.json"


// STORAGE
if (localStorage.getItem("lista-promedios")) {
    listaPromedios = JSON.parse(localStorage.getItem("lista-promedios"));
}

// DECLARACIÓN DOM

let suma = document.getElementById("boton-sumar");
let resta = document.getElementById("boton-restar");
let multiplicacion = document.getElementById("boton-multiplicar");
let division = document.getElementById("boton-dividir");
let reiniciar = document.getElementById("boton-reiniciar")
let promediar = document.getElementById("boton-promediar")

let borrar = document.getElementById("boton-borrar");
let anadir = document.getElementById("boton-anadir");
let pegar = document.getElementById("boton-pegar");
let anadirManual = document.getElementById("boton-anadir-manual");
let valorManual = document.getElementById("valor-manual");
let cargarJSON = document.getElementById("boton-anadir-json");

let primerValor = document.getElementById("primer-valor");
let segundoValor = document.getElementById("segundo-valor");
let campoResultado = document.getElementById("campo-resultado");
let campoPromedio = document.getElementById("campo-promedios")

let tablaPromedios = document.getElementById("tabla-promedios")

// FUNCIONES VARIAS

function borrarResultado() {
    campoResultado.innerText = "";
    primerValor.value = "";
    segundoValor.value = "";
    resultado = null;
}

function pegarResultado() {
    primerValor.value = resultado;
    segundoValor.value = null;
}


function agregarPromedio() {
    listaPromedios.push(resultado);
    console.log(listaPromedios);
}
function mostrarTabla() {
    tablaPromedios.innerHTML = "";
    listaPromedios.forEach((numeros) => {
        let p = document.createElement("p");
        p.innerHTML = `${numeros}`
        tablaPromedios.appendChild(p)
        resultado = null;
    })
}
function reiniciarTabla() {
    listaPromedios = [];
}

// EVENTOS 

suma.addEventListener("click",
    () => {
        if (!isNaN(primerValor.value) && !isNaN(segundoValor.value)) {
            resultado = sumar(primerValor.value, segundoValor.value);
            campoResultado.innerText = resultado;
        } else {
            campoResultado.innerText = ""
            Swal.fire({
                title: "Error",
                text: "Debe agregar un valor numérico",
                confirmButtonText: "Entendido"
            })
        }
    })
resta.addEventListener("click",
    () => {
        if (!isNaN(primerValor.value) && !isNaN(segundoValor.value)) {
            resultado = restar(primerValor.value, segundoValor.value);
            campoResultado.innerText = resultado;
        } else {
            campoResultado.innerText = ""
            Swal.fire({
                title: "Error",
                text: "Debe agregar un valor numérico",
                confirmButtonText: "Entendido"
            })
        }
    })
multiplicacion.addEventListener("click",
    () => {
        if (!isNaN(primerValor.value) && !isNaN(segundoValor.value)) {
            resultado = multiplicar(primerValor.value, segundoValor.value);
            campoResultado.innerText = resultado;
        } else {
            campoResultado.innerText = ""
            Swal.fire({
                title: "Error",
                text: "Debe agregar un valor numérico",
                confirmButtonText: "Entendido"
            })
        }
    })
division.addEventListener("click",
    () => {
        if (!isNaN(primerValor.value) && !isNaN(segundoValor.value)) {
            resultado = dividir(primerValor.value, segundoValor.value);
            campoResultado.innerText = resultado;
        } else {
            campoResultado.innerText = ""
            Swal.fire({
                title: "Error",
                text: "Debe agregar un valor numérico",
                confirmButtonText: "Entendido"
            })
        }
    })

borrar.addEventListener("click",
    () => {
        borrarResultado();
        Toastify({
            text: "Calculadora renovada",
            gravity: "bottom",
            style: {
                background: "#735aff",
            }
        }).showToast();
    })

pegar.addEventListener("click",
    () => {
        if (resultado <= 0 || resultado >= 0) {
            pegarResultado();
        }
    })

anadir.addEventListener("click",
    () => {
        console.log(resultado || "Error: el campo está vacio"); // OPERADOR AVANZADO
        if (resultado != null && !isNaN(resultado) && listaPromedios.length < 7) {
            agregarPromedio();
            borrarResultado();
            mostrarTabla();
            Toastify({
                text: "Añadido a la tabla",
                gravity: "bottom",
                style: {
                    background: "#735aff",
                }
            }).showToast();
            localStorage.setItem("lista-promedios", JSON.stringify(listaPromedios))
        } else if (listaPromedios.length >= 7) {
            Toastify({
                text: "Máximo de 7 valores",
                gravity: "bottom",
                style: {
                    background: "red",
                }
            }).showToast();
        } else {
            Toastify({
                text: "Campo vacío",
                gravity: "bottom",
                style: {
                    background: "red",
                }
            }).showToast();
        }
    })

reiniciar.addEventListener("click",
    () => {
        reiniciarTabla();
        mostrarTabla();
        campoPromedio.innerText = "";
        console.log(listaPromedios)
        Toastify({
            text: "Tabla renovada",
            gravity: "bottom",
            style: {
                background: "#735aff",
            }
        }).showToast();
        localStorage.clear();
    })

promediar.addEventListener("click",
    () => {
        if (listaPromedios.length > 0) {
            sumatoria = 0;
            for (let n of listaPromedios) {
                sumatoria += n;
            }
            campoPromedio.innerText = sumatoria / listaPromedios.length;
        } else {
            campoPromedio.innerText = "";
            Toastify({
                text: "No hay datos en la tabla",
                gravity: "bottom",
                style: {
                    background: "red",
                }
            }).showToast();
        }
    }
)

anadirManual.addEventListener("click",
    () => {
        console.log(valorManual.value || "Error: el campo está vacio"); // OPERADOR AVANZADO
        if (valorManual.value == "") {
            valorManual.value = null;
            Toastify({
                text: "Campo vacío",
                gravity: "bottom",
                style: {
                    background: "red",
                }
            }).showToast();
        } else if (!isNaN(valorManual.value) && listaPromedios.length < 7) {
            valor = parseInt(valorManual.value);
            listaPromedios.push(valor);
            console.log(listaPromedios)
            valorManual.value = null;
            Toastify({
                text: "Añadido a la tabla",
                gravity: "bottom",
                style: {
                    background: "#735aff",
                }
            }).showToast();
            localStorage.setItem("lista-promedios", JSON.stringify(listaPromedios))
        }
        else if (listaPromedios.length >= 7) {
            Toastify({
                text: "Máximo de 7 valores",
                gravity: "bottom",
                style: {
                    background: "red",
                }
            }).showToast();
        } else {
            valorManual.value = null;
            Swal.fire({
                title: "Error",
                text: "Debe agregar un valor numérico",
                confirmButtonText: "Entendido"
            })
        }
        mostrarTabla();
    })


// FETCH

cargarJSON.addEventListener("click",
    () => {
        if (listaPromedios.length < 7) {
            fetch(datosJSON) // DATOS EN BASE A TEMPERATURAS MÁXIMAS DURANTE LA PRIMER SEMANA DE ENERO 2023
                .then((respuesta) => respuesta.json())
                .then((datos) => {
                    for (let i = 0; i < datos.length; i++) {
                        listaPromedios.push(datos[i])
                        console.log(listaPromedios)
                    }
                    mostrarTabla();
                    localStorage.setItem("lista-promedios", JSON.stringify(listaPromedios))
                })
        } else {
            Toastify({
                text: "Máximo de 7 valores",
                gravity: "bottom",
                style: {
                    background: "red",
                }
            }).showToast();
        }
    })

mostrarTabla();
