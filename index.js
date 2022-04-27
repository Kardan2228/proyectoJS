let tipoDispositivo;
let numDispositivo = 0;
let vecesSobreEscritura;
let tamanoDispositivo;
let otroDispositivo;
let respuesta;
let resultadoBorrado;
let horaFechaBorrado = Date();
let numeroPositivo = /^[0-9]+$/;
let validacion;
let contadorDisp = 1;
const arrDispositivos = [];



class Dispositivo {
    constructor(tipo, tamano, veces, fecha, hora) {
        this.tipo = tipo;
        this.tamano = tamano;
        this.veces = veces;
        this.fecha = fecha;
        this.hora = hora;
    }
}

/*
function resumen() {
    contadorDisp++;
    let generaResumen = document.getElementById("resultado_sobreescritura");
    let rDispositivo = document.getElementById("dispositivo").value;
    let rTamano = document.getElementById("tamano").value;
    let rVeces = document.getElementById("veces").value;
    generaResumen.innerHTML = `<h2>Resultados del borrado seguro</h2>
                            <hr>
                                <ul id="listaResultado">
                                <li><strong>Dispositivo tipo:</strong> ${rDispositivo}</li>
                                <li><strong>Tamaño del dispositivo:</strong> ${rTamano}  Mb</li>
                                <li><strong>Veces que fue sobreescrito:</strong> ${rVeces}</li>
                                <li><strong>Fecha y hora del procedimento:</strong> ${horaFechaBorrado}</li>
                            </ul>
                            <input name="borrarOtro" id="borrarOtro" type="button" value="Borrar otro dispositivo" onclick = "BorrarOtroDispositivo()">`;
    bloqueaFormulario();
}
*/

function resumen(dispositivos) {
    let generaResumen = document.getElementById("listaResultado");
    generaResumen.innerHTML = "";

    dispositivos.forEach(dispositivo => {
        let li = document.createElement("li");
        li.innerHTML =
            `<hr>
            <li><strong>Dispositivo tipo:</strong> ${dispositivo.tipo}</li>
            <li><strong>Tamaño del dispositivo:</strong> ${dispositivo.tamano}  Mb</li>
            <li><strong>Veces que fue sobreescrito:</strong> ${dispositivo.veces}</li>
            <li><strong>Fecha y hora del procedimento:</strong> ${dispositivo.fecha}</li> `
    })

    /*
                 
                 <input name="borrarOtro" id="borrarOtro" type="button" value="Borrar otro dispositivo" onclick = "BorrarOtroDispositivo()">`;*/
    bloqueaFormulario();
}

function bloqueaFormulario() {
    document.getElementById("dispositivo").disabled = true;
    document.getElementById("tamano").disabled = true;
    document.getElementById("veces").disabled = true;
}

function desbloqueaFormulario() {
    document.getElementById("dispositivo").disabled = false;
    document.getElementById("tamano").disabled = false;
    document.getElementById("veces").disabled = false;
    //crear código para dejar en blanco los input del formulario
}

function BorrarOtroDispositivo() {
    horaFechaBorrado = Date();
    desbloqueaFormulario();
    let borraResumen = document.getElementById("resultado_sobreescritura");
    borraResumen.innerHTML = `<h2>Resultados del borrado seguro</h2>
                                <hr>`;
}

let borrandoDisp = document.getElementById("dispositivo")
borrandoDisp.addEventListener(`input`, () => {
    let dispBorrado = borrandoDisp.value;

    console.log(borrandoDisp.value);
    console.log(contadorDisp);
    document.getElementById("contadorDisp").innerHTML = `<strong>Evento.</strong> Preparado para borrar el dispositivo Nº <strong>${contadorDisp}: ${dispBorrado}</strong>`;
})


function agregaDispositivo(e) {
    e.preventDefault();
    contadorDisp++;
    let tipo = document.getElementById("dispositivo").value;
    let tamano = document.getElementById("tamano").value;
    let veces = document.getElementById("veces").value;
    let fecha = new Date().toDateString();
    let horas = new Date().getHours;
    let minutos = new Date().getMinutes;
    let segundos = new Date().getSeconds;
    let hora = `${horas}:${minutos}:${segundos}`;

    const dispositivo = new Dispositivo(tipo, tamano, veces, fecha, hora);

    const dispositivoLS = JSON.parse(localStorage.getItem(contadorDisp));
    if (dispositivoLS === null) {
        localStorage.setItem(contadorDisp, JSON.stringify([dispositivo]));
        resumen([dispositivo]);
    } else {
        dispositivoLS.push(dispositivo);
        localStorage.setItem(contadorDisp, JSON.stringify([dispositivoLS]));
        resumen(dispositivoLS);
    }
    e.target.reset();
}


let btnBorrar = document.getElementById("frm_datos").addEventListener("submit", agregaDispositivo);
//let btnBorrar = document.getElementById("borrar");
//btnBorrar.onclick = resumen;

/*let btnReiniciar = document.getElementById("borraOtro");
btnReiniciar.onclick = mensaje;
/*
function borraSeguro(tipoDispositivo, tamanoDispositivo, vecesSobreEscritura) {

    if (vecesSobreEscritura > 1) {
        for (let i = 0; i < vecesSobreEscritura; i++) {
            let incremento = i + 1;
            alert(`
    Se realiza el proceso de sobreescritura n° $ { incremento }
    en el dispositivo $ { tipoDispositivo }
    `)
            alert("Sobreescritura exitosa...")
        }
    }

    alert(`
    Se realizó el borrado seguro al dispositivo $ { tipoDispositivo }
    `);
}

function verificaErrorNumero(numeroVerificar) {

    if (numeroVerificar.match(numeroPositivo)) {
        validacion = "numero+"
    } else {
        alert("Escriba un número positivo");
        return validacion = "NaN+";
        validacion = "NaN+"
    }
    return validacion;
}

do {
    numDispositivo++;
    tipoDispositivo = prompt("¿Qué dispositivo de almacenamiento quiere quitar?");
    tipoDispositivo = tipoDispositivo.toUpperCase();
    do {
        tamanoDispositivo = prompt("¿Qué tamaño tiene el dispositivo?");
        numeroVerificar = tamanoDispositivo;
        verificaErrorNumero(numeroVerificar);
    } while (validacion == "NaN+");

    do {
        vecesSobreEscritura = prompt("¿Cuántas veces deseas que se sobreescriba el dispositivo?");
        numeroVerificar = vecesSobreEscritura;
        verificaErrorNumero(numeroVerificar);
    } while (validacion == "NaN+");

    arrDispositivos.push([tipoDispositivo, tamanoDispositivo]);

    resultadoBorrado = borraSeguro(tipoDispositivo, tamanoDispositivo, vecesSobreEscritura);
    alert(`
    Reporte de borrado seguro.Dispositivo: $ { tipoDispositivo }, tamaño: $ { tamanoDispositivo }, cantidad de sobreescrituras: $ { vecesSobreEscritura }, fecha y hora del procedimento: $ { horaFechaBorrado }
    `);
    otroDispositivo = window.confirm("¿Deseas borrar otro dispositivo?");

} while (otroDispositivo == true);

for (var i = 0; i < arrDispositivos.length; i++) {
    alert(`
    Dispositivo borrado N° $ { i + 1 }. - Tipo: $ { arrDispositivos[i][0] }, Tamaño: $ { arrDispositivos[i][1] }
    MB.
    `);
}

alert("Gracias por utilizar esta herramienta")*/