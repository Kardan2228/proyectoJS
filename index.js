let contadorDisp = 1;
const arrDispositivos = [];
let nDisp;
let tipo;
let tamano;
let veces;
let fecha;
let hora;

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
        console.log(arrDispositivos);
    }
    let generaResumen = document.getElementById("resultado_sobreescritura");
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
                            <input name="borrarOtro" id="borrarOtro" type="button" value="Borrar otro dispositivo" onclick = "BorrarOtroDispositivo()">`;
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
}

function BorrarOtroDispositivo() {
    horaFechaBorrado = Date();
    desbloqueaFormulario();
    let borraResumen = document.getElementById("resultado_sobreescritura");
    borraResumen.innerHTML = `<h2>Resultados del borrado seguro</h2>
                                <hr>`;
}

function alertaBorrado() {
    swal({
        title: "¿Estás seguro?",
        text: "Una vez borrado el dispositivo, ya no podrás recuperar los archivos",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("¡El dispositivo ha sido borrado con éxito!", {
            icon: "success",
            
          });
          agregaDispositivo;
        } else {
          swal("¡Tu dispositivo sigue intacto!");
        }
      });
}

let borrandoDisp = document.getElementById("dispositivo")
borrandoDisp.addEventListener(`input`, () => {
    let dispBorrado = borrandoDisp.value;

    console.log(borrandoDisp.value);
    document.getElementById("contadorDisp").innerHTML = `<strong>Evento.</strong> Preparado para borrar el dispositivo Nº <strong>${contadorDisp}: ${dispBorrado}</strong>`;
})


function agregaDispositivo(e) {
    e.preventDefault();
    nDisp = contadorDisp;
    tipo = document.getElementById("dispositivo").value;
    tamano = document.getElementById("tamano").value;
    veces = document.getElementById("veces").value;
    fecha = new Date().toDateString();
    let horas = new Date().getHours();
    let minutos = new Date().getMinutes();
    let segundos = new Date().getSeconds();
    hora = `${horas}:${minutos}:${segundos}`;
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

    //alertaBorrado();

    document.getElementById("contadorDisp").innerHTML = `<strong>Evento.</strong> Borrado seguro del dispositivo Nº <strong>${contadorDisp - 1}: ${tipo}</strong>`;
}

//let btnBorrar = document.getElementById("frm_datos").addEventListener("submit", agregaDispositivo);
let btnBorrar = document.getElementById("frm_datos").addEventListener("submit", alertaBorrado);
