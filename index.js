let contadorDisp = 1;
const arrDispositivos = [];
let nDisp;
let tipo;
let tamano;
let veces;
let fecha;
let hora;
let fechaActual;
let urlImagen;
class Dispositivo {
    constructor(nDisp, tipo, tamano, veces, fecha, hora) {
        this.nDisp = nDisp;
        this.tipo = tipo;
        this.tamano = tamano;
        this.veces = veces;
        this.fecha = fecha;
        this.hora = hora;
    }
}

function resumen() {
    for (const disp of arrDispositivos) {
        nDisp = disp.nDisp;
        tipo = disp.tipo;
        tamano = disp.tamano;
        veces = disp.veces;
        fecha = disp.fecha;
        hora = disp.hora;
    }

    const generaResumen = document.getElementById("resultado_sobreescritura");
    generaResumen.innerHTML = `<h2>Resultados del borrado seguro</h2>
                            <hr>
                                <ul id="listaResultado">
                                <li><strong>Dispositivo N°:</strong> ${nDisp}</li>
                                <li><strong>Tipo:</strong> ${tipo}</li>
                                <li><strong>Tamaño del dispositivo:</strong> ${tamano}  Mb</li>
                                <li><strong>Veces que fue sobreescrito:</strong> ${veces}</li>
                                <li><strong>Fecha procedimento:</strong> ${fecha}</li>
                                <li><strong>Hora del procedimento:</strong> ${hora}</li>
                                </ul>
                                <hr>
                            `;

    const imagenDispositivo = document.querySelector("#resultado_sobreescritura");
    const origenJSON = "/data.json";

    fetch(origenJSON)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((dispositivo) => {
                if (dispositivo.descripcion === tipo) {
                    urlImagen = dispositivo.imagen;
                    const divImagen = document.createElement("div");
                    divImagen.innerHTML = `
                    <img src="${urlImagen}"></img>
                    <hr/>
                    <input name="borrarOtro" id="borrarOtro" type="button" value="Borrar otro dispositivo" onclick = "BorrarOtroDispositivo()">
                `;
                imagenDispositivo.append(divImagen);
                } 

            });
        });

    bloqueaFormulario();

}

function bloqueaFormulario() {
    document.getElementById("dispositivo").disabled = true;
    document.getElementById("tamano").disabled = true;
    document.getElementById("veces").disabled = true;
    document.querySelector("#borrar").disabled = true;
}

function desbloqueaFormulario() {
    document.getElementById("dispositivo").disabled = false;
    document.getElementById("tamano").disabled = false;
    document.getElementById("veces").disabled = false;
    document.querySelector("#borrar").disabled = false;
}

function BorrarOtroDispositivo() {
    horaFechaBorrado = Date();
    desbloqueaFormulario();
    let borraResumen = document.getElementById("resultado_sobreescritura");
    borraResumen.innerHTML = `<h2>Resultados del borrado seguro</h2>
                                <hr>`;
}

function agregaDispositivo(e) {
    e.preventDefault();
    nDisp = contadorDisp;
    tipo = document.getElementById("dispositivo").value;
    tamano = document.getElementById("tamano").value;
    veces = document.getElementById("veces").value;
    let fecha = luxon.DateTime;
    fechaActual = fecha.now();
    fecha = fechaActual.toLocaleString();
    let horas = fechaActual.hour;
    let minutos = fechaActual.minute;
    let segundos = fechaActual.second;
    hora = `${horas}:${minutos}:${segundos}`;

    swal({
        title: "¿Estás seguro?",
        text: "Una vez borrado el dispositivo, ya no podrás recuperar los archivos",
        icon: "warning",
        buttons: ["Cancelar", "Borrar"],
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            swal("¡El dispositivo ha sido borrado con éxito!", {
                icon: "success",

            });

            const dispositivo = new Dispositivo(nDisp, tipo, tamano, veces, fecha, hora);
            arrDispositivos.push(dispositivo);
            const dispositivoLS = JSON.parse(localStorage.getItem("arrayDispositivos"));
            if (dispositivoLS === null) {
                localStorage.setItem("arrayDispositivos", JSON.stringify([arrDispositivos]));
                contadorDisp++;
                resumen(dispositivo);
            } else {
                dispositivoLS.push(dispositivo);
                localStorage.setItem("arrayDispositivos", JSON.stringify([dispositivoLS]));
                contadorDisp++;
                resumen(dispositivoLS);
            }
            e.target.reset();

            document.getElementById("contadorDisp").innerHTML = `<strong>Evento.</strong> Borrado seguro del dispositivo Nº <strong>${contadorDisp - 1}: ${tipo}</strong>`;

        } else {
            swal("¡Tu dispositivo sigue intacto!");
        }
    });

}

let btnBorrar = document.getElementById("frm_datos").addEventListener("submit", agregaDispositivo);

let borrandoDisp = document.getElementById("dispositivo")
borrandoDisp.addEventListener(`input`, () => {
    let dispBorrado = borrandoDisp.value;

    document.getElementById("contadorDisp").innerHTML = `<strong>Evento.</strong> Preparado para borrar el dispositivo Nº <strong>${contadorDisp}: ${dispBorrado}</strong>`;
})