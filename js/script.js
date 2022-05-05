$(document).ready(() => {
  // CARGA PESTAÑA SIMPLE AUTOMATICAMENTE
  // $('.nav-tabs a[href="#simple"]').tab("show");

  // Escribe valores estandar desde standardValues.js
  let macros = values[0].medidas;
  let tabAlto = values[1].pestana_alto;
  let tabAncho = values[2].pestana_ancho;
  let tabLargo = values[3].pestana_largo;
  // WRITE STANDARDVALUES ON DOCUMENTs
  document.getElementById("largo_m").value = macros.largo_m;
  document.getElementById("largo_s").value = macros.largo_m;
  document.getElementById("ancho_m").value = macros.ancho_m;
  document.getElementById("ancho_s").value = macros.ancho_m;
  document.getElementById("alto_m").value = macros.alto_m;
  document.getElementById("alto_s").value = macros.alto_m;
  document.getElementById("altopallet_m").value = macros.altopallet_m;
  document.getElementById("altopallet_s").value = macros.altopallet_m;
  document.getElementById("altopallet_t").value = macros.altopallet_m;
  document.getElementById("s_altopallet_t").value = macros.altopallet_m;
  // PESTAÑA ALTO
  document.getElementById("qsuperior").value = tabAlto.qsuperior;
  document.getElementById("s_qsuperior").value = tabAlto.qsuperior;
  document.getElementById("vanopiso").value = tabAlto.vanopiso;
  document.getElementById("s_vanopiso").value = tabAlto.vanopiso;
  document.getElementById("vanotecho").value = tabAlto.vanotecho;
  document.getElementById("s_vanotecho").value = tabAlto.vanotecho;
  // PESTAÑA ANCHO
  document.getElementById("anchopallet").value = tabAncho.anchopallet;
  document.getElementById("s_anchopallet").value = tabAncho.anchopallet;
  document.getElementById("qancho").value = tabAncho.qancho;
  document.getElementById("s_qancho").value = tabAncho.qancho;
  document.getElementById("vanoadelante").value = tabAncho.vanoadelante;
  document.getElementById("s_vanoadelante").value = tabAncho.vanoadelante;
  document.getElementById("vanoatras").value = tabAncho.vanoatras;
  document.getElementById("s_vanoatras").value = tabAncho.vanoatras;
  // PESTAÑA LARGO
  document.getElementById("largopallet").value = tabLargo.largopallet;
  document.getElementById("s_largopallet").value = tabLargo.largopallet;
  document.getElementById("qprof").value = tabLargo.qprof;
  document.getElementById("s_qprof").value = tabLargo.qprof;
  document.getElementById("vanoposterior").value = tabLargo.vanoposterior;
  document.getElementById("s_vanoposterior").value = tabLargo.vanoposterior;
  document.getElementById("vanopasillo").value = tabLargo.vanopasillo;
  document.getElementById("s_vanopasillo").value = tabLargo.vanopasillo;

  calcularMultiprof("modalSimu");
  calcularSimple();


  dibujarVistaFrontal();
  dibujarVistaFrontal("modalSimuSimple");
  dibujarVistaSuperior();
  dibujarVistaSuperiorSyD();


  // CAMBIA IMAGEN() SEGUN TRANS SIMPLE O DOBLE
  $("input:radio[name=tipoAlmacen]").click(function () {
    let nroTrans = document.getElementById("transelevadores_s").value;
    let value = $(this).val();
    let image_name;
    if (value == "Simple") {
      image_name = "img/transSimple.png";
      document.getElementById("profundidad_s").value = nroTrans * 2;
    } else {
      if (value == "Doble") {
        image_name = "img/transDoble.png";
        document.getElementById("profundidad_s").value = nroTrans * 4;
      } else {
        image_name = "img/transmult.png";
      }
    }
    $("#simpledoble").attr("src", image_name);
  });
});

// Cierra modal con ESC
$(document).keydown(function (event) {
  if (event.keyCode == 27) {
    $("#popup").hide();
    $("#s_popup").hide();
  }
});

function redondear(cantidad, decimales) {
  var cantidad = parseFloat(cantidad);
  var decimales = parseFloat(decimales);
  decimales = !decimales ? 2 : decimales;
  return Math.round(cantidad * Math.pow(10, decimales)) / Math.pow(10, decimales);
}

function getValuesMultiprof() {
  let values = {};
  // CALLES - LARGO
  values.calles = parseFloat(document.getElementById("calles_m").value);
  values.largo = parseFloat(document.getElementById("largo_m").value);
  values.vanoAdelante = parseFloat(document.getElementById("vanoadelante").value);
  values.vanoAtras = parseFloat(document.getElementById("vanoatras").value);
  values.vanoLargo = values.vanoAtras + values.vanoAdelante;
  values.anchoPallet = parseFloat(document.getElementById("anchopallet").value);
  values.vanoCalle = parseFloat(document.getElementById("qancho").value);
  values.anchoCalle = values.anchoPallet + values.vanoCalle;
  // NIVELES - ALTO
  values.niveles = parseFloat(document.getElementById("niveles_m").value);
  values.alto = parseFloat(document.getElementById("alto_m").value);
  values.altoPallet = parseFloat(document.getElementById("altopallet_m").value);
  values.holguraSuperior = parseFloat(document.getElementById("qsuperior").value);
  values.vanoTecho = parseFloat(document.getElementById("vanotecho").value);
  values.vanoPiso = parseFloat(document.getElementById("vanopiso").value);
  values.vanoAlto = values.vanoTecho + values.vanoPiso;
  // PROFUNDIDADES - ANCHO
  values.profundidades = parseFloat(document.getElementById("profundidad_m").value);
  values.ancho = parseFloat(document.getElementById("ancho_m").value);
  values.holguraProf = parseFloat(document.getElementById("qprof").value);
  values.largoPallet = parseFloat(document.getElementById("largopallet").value);
  values.profundidadPos = (values.largoPallet + values.holguraProf)*2;
  values.vanoPosterior = parseFloat(document.getElementById("vanoposterior").value);
  values.vanoPasillo = parseFloat(document.getElementById("vanopasillo").value);
  values.vanoAncho = values.vanoPasillo + values.vanoPosterior * 2;
  return values;
}

function calcularMultiprof(di) {
  const v = getValuesMultiprof();
  let niveles = Math.floor((v.alto - v.vanoAlto) / (v.altoPallet + v.holguraSuperior));
  let profundidades = Math.floor((v.ancho - v.vanoAncho) / v.profundidadPos);
  let calles = Math.floor((v.largo - v.vanoLargo) / v.anchoCalle);
  let posiciones = Math.floor(calles * niveles * profundidades);
  document.getElementById("calles_m").value = calles;
  document.getElementById("niveles_m").value = niveles;
  document.getElementById("profundidad_m").value = profundidades;
  document.getElementById("posiciones_m").value = posiciones *2;
  $('[data-index="' + (di + 1).toString() + '"]').focus();

}

function calcularDimensionesMultiprof(di) {
  const v = getValuesMultiprof();
  let largo = redondear(parseFloat(v.calles * v.anchoCalle + v.vanoLargo), 2);
  let alto = redondear(parseFloat(v.niveles * (v.altoPallet + v.holguraSuperior) + v.vanoAlto), 2);
  let ancho = redondear(parseFloat(v.profundidades * v.profundidadPos + v.vanoAncho), 2);
  document.getElementById("largo_m").value = largo;
  document.getElementById("ancho_m").value = ancho;
  document.getElementById("alto_m").value = alto;
  let posiciones = Math.floor(v.calles * v.niveles * v.profundidades *2);
  document.getElementById("posiciones_m").value = posiciones;
  
  $('[data-index="' + (di + 1).toString() + '"]').focus();
  // calcularMultiprof();
}

function calcularAlturaMultiprof() {
  let alturaPallet = document.getElementById("altopallet_t").value;
  document.getElementById("altopallet_m").value = alturaPallet;
  calcularDimensionesMultiprof();
  calcularMultiprof();
}
function calcularAnchoMultiprof() {
  let alturaPallet = document.getElementById("altopallet_t").value;
  document.getElementById("altopallet_m").value = alturaPallet;
  calcularDimensionesMultiprof();
  calcularMultiprof();
}
function calcularLargoMultiprof() {
  let alturaPallet = document.getElementById("altopallet_t").value;
  document.getElementById("altopallet_m").value = alturaPallet;
  calcularDimensionesMultiprof();
  calcularMultiprof();
}

function getValuesSimple() {
  let values = {};
  // CALLES - LARGO
  values.calles = parseFloat(document.getElementById("calles_s").value);
  values.largo = parseFloat(document.getElementById("largo_s").value);
  values.vanoAdelante = parseFloat(document.getElementById("s_vanoadelante").value);
  values.vanoAtras = parseFloat(document.getElementById("s_vanoatras").value);
  values.vanoLargo = values.vanoAtras + values.vanoAdelante;
  values.anchoPallet = parseFloat(document.getElementById("s_anchopallet").value);
  values.vanoCalle = parseFloat(document.getElementById("s_qancho").value);
  values.anchoCalle = values.anchoPallet + values.vanoCalle;
  // NIVELES - ALTO
  values.niveles = parseFloat(document.getElementById("niveles_s").value);
  values.alto = parseFloat(document.getElementById("alto_s").value);
  values.altoPallet = parseFloat(document.getElementById("altopallet_s").value);
  values.holguraSuperior = parseFloat(document.getElementById("s_qsuperior").value);
  values.vanoTecho = parseFloat(document.getElementById("s_vanotecho").value);
  values.vanoPiso = parseFloat(document.getElementById("s_vanopiso").value);
  values.vanoAlto = values.vanoTecho + values.vanoPiso;
  // PROFUNDIDADES - ANCHO
  values.profundidades = parseFloat(document.getElementById("profundidad_s").value);
  values.ancho = parseFloat(document.getElementById("ancho_s").value);
  values.holguraProf = parseFloat(document.getElementById("s_qprof").value);
  values.largoPallet = parseFloat(document.getElementById("s_largopallet").value);
  values.profundidadPos = values.largoPallet + values.holguraProf;
  values.vanoPosterior = parseFloat(document.getElementById("s_vanoposterior").value);
  values.vanoPasillo = parseFloat(document.getElementById("s_vanopasillo").value);
  values.vanoAncho = values.vanoPasillo + values.vanoPosterior * 2;
  values.transelevadores = document.getElementById("transelevadores_s").value;
  return values;
}

function calcularSimple(di) {
  const v = getValuesSimple();
  let profs = 0;
  let i = 0;
  let tipoElegido = $("input[name=tipoAlmacen]:checked", "#tipo").val();
  if (tipoElegido == "Simple") {
    profs = 2;
  } else if (tipoElegido == "Doble") {
    profs = 4;
  }
  // COMPROBAR ANCHO Y PROFUNDIDADES FONDO PASILLO MAS PASILLO
  let anchoEquipo = profs * v.profundidadPos + v.vanoAncho;
  if (v.ancho < anchoEquipo) {
    alert("Ancho mínimo insuficiente, el equipo abarca " + anchoEquipo + "mts.");
  }
  // CANTIDAD DE EQUIPOS
  while (i * anchoEquipo < v.ancho+0.1) {
    i++;
  }
  let equipos = i - 1;
  let niveles = Math.floor((v.alto - v.vanoAlto) / (v.altoPallet + v.holguraSuperior));
  let calles = Math.floor((v.largo - v.vanoLargo) / v.anchoCalle);
  let profundidades = profs * equipos;
  let posiciones = Math.floor(calles * niveles * profundidades);
  document.getElementById("transelevadores_s").value = equipos;
  document.getElementById("calles_s").value = calles;
  document.getElementById("niveles_s").value = niveles;
  document.getElementById("profundidad_s").value = profundidades;
  document.getElementById("posiciones_s").value = posiciones;
  
  $('[data-index="' + (di + 1).toString() + '"]').focus();
}

// Con tecla enter pasa a siguiente campo según data-index=i
$(".inputform").on("keydown", "input", function (event) {
  if (event.which == 13) {
    event.preventDefault();
    let $this = $(event.target);
    let index = parseFloat($this.attr("data-index"));
    $('[data-index="' + (index + 1).toString() + '"]').focus();
  }
});

function calcularDimensionesSimple(di) {
  const v = getValuesSimple();
  let profs = 0;
  let i = 0;
  let tipoElegido = $("input[name=tipoAlmacen]:checked", "#tipo").val();
  if (tipoElegido == "Simple") {
    profs = 2;
  } else if (tipoElegido == "Doble") {
    profs = 4;
  }
  let anchoEquipo = profs * v.profundidadPos + v.vanoAncho;
  let largo = redondear(parseFloat(v.calles * v.anchoCalle + v.vanoLargo), 2);
  let alto = redondear(parseFloat(v.niveles * (v.altoPallet + v.holguraSuperior) + v.vanoAlto), 2);
  let ancho = redondear(parseFloat(anchoEquipo * v.transelevadores), 2);
  document.getElementById("largo_s").value = largo;
  document.getElementById("ancho_s").value = ancho;
  document.getElementById("alto_s").value = alto;
  calcularSimple();
  let profundidades = profs * v.transelevadores;
  document.getElementById("profundidad_s").value = profundidades; 
  $('[data-index="' + (di + 1).toString() + '"]').focus();
}


function calcularAlturaSimple() {
  let alturaPallet = document.getElementById("s_altopallet_t").value;
  document.getElementById("altopallet_s").value = alturaPallet;
  calcularDimensionesSimple();
  calcularMultiprof();
}
function calcularAnchoSimple() {
  let alturaPallet = document.getElementById("s_altopallet_t").value;
  document.getElementById("altopallet_s").value = alturaPallet;
  calcularDimensionesSimple();
  calcularMultiprof();
}
function calcularLargoSimple() {
  let alturaPallet = document.getElementById("s_altopallet_t").value;
  document.getElementById("altopallet_s").value = alturaPallet;
  calcularDimensionesSimple();
  calcularMultiprof();
}

function printPDF() {
  let elems = document.getElementsByName("ipForm")[0].getElementsByTagName("input");
  for (let i = 0; i < elems.length; i++) {
    // Temporalmente crea elementos para imprimir en PDF
    elems[i].setAttribute("value", elems[i].value);
    elems[i].insertAdjacentHTML("afterend", "<span class ='insertedContent'>" + elems[i].value + "</span>");
    elems[i].style.display = "none";
  }
  elems = document.getElementsByName("ipForm2")[0].getElementsByTagName("input");
  for (let i = 0; i < elems.length; i++) {
    elems[i].setAttribute("value", elems[i].value);
    elems[i].insertAdjacentHTML("afterend", "<span class ='insertedContent'>" + elems[i].value + "</span>");
    elems[i].style.display = "none";
  }

  let body = document.body;
  let html = document.documentElement;
  let height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  const invoice = document.querySelector(".wrapper");
  let heightCM = height / 35.35;
  
  
  // EXPORTAR A PDF
  console.log(invoice);
  const opt = {
    margin: 3,
    filename: "myfile.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "cm", format: [heightCM, 60], orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"], after: ".breakme" }
  };
  html2pdf(invoice, opt);
  // html2pdf().from(invoice).set(opt).save();

  // DELETE elementos de PDF
  elems = document.getElementsByName("ipForm2")[0].getElementsByTagName("input");
  for (let i = 0; i < elems.length; i++) {
    let insertedContent = document.querySelector(".insertedContent");
    if (insertedContent) {
      insertedContent.parentNode.removeChild(insertedContent);
    }
    elems[i].style.display = "block";
  }
  elems = document.getElementsByName("ipForm")[0].getElementsByTagName("input");
  for (let i = 0; i < elems.length; i++) {
    let insertedContent = document.querySelector(".insertedContent");
    if (insertedContent) {
      insertedContent.parentNode.removeChild(insertedContent);
    }
    elems[i].style.display = "block";
  }
}




// LUCAS 
// var modal = document.getElementById("modal");
// document.addEventListener('keydown', function(e) {
//     let keyCode = e.keyCode;
//     document.getElementById("result").innerHTML = "Key Code: "+keyCode+"<br/> Key: "+e.key+"<br/>";
//     if (keyCode === 27) {//keycode is an Integer, not a String
//       modal.classList.remove('modal-visible');
//       document.getElementById("result").innerHTML += "Escape key pressed. Modal hidden.";
//     }
// });

// Calcular dimensiones unidad de carga multiprof

function calcularUnidCargaMultiprof() {
  let alturaPallet = document.getElementById("altopallet_t").value;
  document.getElementById("altopallet_m").value = alturaPallet;
  calcularDimensionesMultiprof();
  calcularMultiprof();
}


// Dibujar vista frontal
const dibujarVistaFrontal = (idEven) => {
  let divVista = document.getElementById('modalFrontView');
  let profundidadGral = document.getElementById("profundidad_m").value;
  let nivelesGral = document.getElementById("niveles_m").value;
  let ancho = document.getElementById("ancho_m").value
  let altoMts = document.getElementById("alto_m").value
  const fragment = document.createDocumentFragment();
  if (idEven == "modalSimu") {
    divVista.innerHTML = null;

  }
  else if(idEven == "modalSimuSimple") {
    divVista = document.getElementById('modalFrontViewSyD');
    divVista.innerHTML = null;
    profundidadGral = document.getElementById("profundidad_s").value;
    if (profundidadGral == 4) {
      profundidadGral = 2
    } else if (profundidadGral == 2) {
      profundidadGral = 1
    }
    nivelesGral = document.getElementById("niveles_s").value;
    ancho = document.getElementById("ancho_s").value
    altoMts = document.getElementById("alto_s").value
    console.log("asds");
  }
  console.log();
  
  // const pasilloSup = document.getElementById('pasilloFrontSup');

  let cotaAncho = document.createElement("div");
  cotaAncho.className = "cotaAnchoFrontal"
  cotaAncho.innerHTML = `[ Ancho total ${ancho}Mts - ${profundidadGral} Profundidades ]`
  divVista.appendChild(cotaAncho)



  let cotaAltura = document.createElement("div");
  cotaAltura.className = "cotaAltura"
  cotaAltura.innerHTML = `<div class="cotaInfo">
   [ Altura total ${altoMts}Mts - ${nivelesGral} Niveles ]
  </div>`
  divVista.appendChild(cotaAltura);

  divDepositoFront = document.createElement("div");
  divDepositoFront.className = "divSimuFront"


  //For que recorre las profundidades
  for (let prof = profundidadGral; prof > 0; prof--) {
    //Por cada profundidad crea un div que representa una celda o columna
    const celdaAltura = document.createElement("div");
    celdaAltura.id = `celdaIzq-${prof}`;
    celdaAltura.className = 'celdaAltura';

    for (let level = nivelesGral; level > 0; level--){
      const carga = document.createElement('div');
      carga.id = `cargaIzq${level}`;
      carga.className = 'cargaDiv';
      celdaAltura.appendChild(carga);
      if (level === 1) {
        const piso = document.createElement('div');
        piso.className = "divPiso"
        celdaAltura.appendChild(piso)
      }
      
    }

    fragment.appendChild(celdaAltura); 
  }
  // Dibujar pasillo
  const pasilloFrontView = document.createElement('div');
  pasilloFrontView.id = "pasilloFrontView";
  pasilloFrontView.className = "pasilloFrontDiv"
  pasilloFrontView.innerHTML = `
  <div id="pasilloFrontSup" class="pasilloFrontSup"> <img src="./img/ColumnaSup.svg" alt=""> </div>
  <div class="pasilloFrontMedio"></div>
  <div class="pasilloFrontInf"> <img src="./img/ColumnaInf.svg" alt=""> </div>
  `;
  if (nivelesGral <= 2) {
    pasilloFrontView.innerHTML = `
    <div class="pasilloFrontMedio"></div>
    <div class="pasilloFrontInf"> <img src="./img/ColumnaInf.svg" alt=""> </div>
    `;
  }
  fragment.appendChild(pasilloFrontView);
  
  for (let prof = 1; prof <= profundidadGral; prof++) {
    //Por cada profundidad crea un div que representa una celda o columna
    const celdaAlturaDos = document.createElement("div");
    celdaAlturaDos.id = `celdaDer-${prof}`;
    celdaAlturaDos.className = 'celdaAltura';

    for (let level = nivelesGral; level > 0; level--){
      const carga = document.createElement('div');
      carga.id = `cargaDer${level}`;
      carga.className = 'cargaDiv';
      celdaAlturaDos.appendChild(carga);
      if (level === 1) {
        const piso = document.createElement('div');
        piso.className = "divPiso"
        celdaAlturaDos.appendChild(piso)
      }
      
    }
    
    fragment.appendChild(celdaAlturaDos); 
  }
  

  divVista.appendChild(divDepositoFront)
  divDepositoFront.appendChild(fragment);


}

// Dibujas vista superior
const dibujarVistaSuperior = () => {
  let divVista = document.getElementById('divVistaSup');
  let divcallesIzq = document.getElementById('callesIzquierda');
  let divcallesDerecha = document.getElementById('callesDerecha');
  let profundidadGral = document.getElementById("profundidad_m").value;
  let callesGral = document.getElementById("calles_m").value;
  let anchoTotal = document.getElementById("ancho_m").value
  let largoTotal = document.getElementById("largo_m").value;
  let pasillo = document.getElementById("pasilloSupView")
  const fragment = document.createDocumentFragment()
  divcallesIzq.innerHTML = null
  divcallesDerecha.innerHTML = null  
  divVista.innerHTML=null;
  




  let divCotaSup = document.createElement("div");
  divCotaSup.className = "cotaSuperiorS";
  divCotaSup.innerHTML = `[ Largo total ${largoTotal}Mts - ${callesGral} Calles ]`;

  let cotaLateral = document.createElement("div");
  cotaLateral.className = "cotaLateralS cotaInfo";
  cotaLateral.innerHTML = `[ Ancho total ${anchoTotal}Mts - ${profundidadGral} Profundidades ]`;

  fragment.appendChild(divCotaSup);
  fragment.appendChild(cotaLateral);

  let pasilloSupView = document.createElement('div');
  pasilloSupView.id = "pasilloSupView";
  pasilloSupView.className = "pasilloSup";
  pasilloSupView.innerHTML = `
  <div style= "position: absolute;"> <img src="./img/transSup.svg" alt=""> </div>
  <div class="pasilloSupRiel" > </div>
  `;


  //Borrar pasillo.
  if(typeof(pasillo) != 'undefined' && pasillo != null){
    pasillo.remove();
  }

  //for que recorre las calles
  for (let calles = 1; calles <= callesGral; calles++) {
    //Por cada calle crea un div
    const calleNew = document.createElement('div');
    calleNew.id = `calleIzq${calles}`
    calleNew.className = 'calleIzq'
    const divPasillo = document.createElement('div')
    divPasillo.className = 'pasilloCelda'
    
    //for que recorre profundidad
    for (let prof = profundidadGral; prof > 0; prof--) {
      const profCarga = document.createElement('div');
      profCarga.id = `profCargaIzq${prof}`;
      profCarga.className = 'profCargaIzq';
      calleNew.appendChild(profCarga);
    }
    divcallesIzq.appendChild(calleNew)
    fragment.appendChild(divcallesIzq)
    pasilloSupView.appendChild(divPasillo)
    
  }

  fragment.appendChild(pasilloSupView);

  for (let calles = 1; calles <= callesGral; calles++) {
    //Por cada calle crea un div
    const calleNew = document.createElement('div');
    calleNew.id = `calleDer${calles}`
    calleNew.className = 'calleIzq'
    
    //for que recorre profundidad
    for (let prof = profundidadGral; prof > 0; prof--) {
      const profCarga = document.createElement('div');
      profCarga.id = `profCargaDer${prof}`;
      profCarga.className = 'profCargaIzq';
      calleNew.appendChild(profCarga);
    }
    divcallesDerecha.appendChild(calleNew)
    fragment.appendChild(divcallesDerecha)
    
  }
    divVista.appendChild(fragment)

}



// Dibujas vista superior para SIMPLE Y DOBLE
const dibujarVistaSuperiorSyD = () => {
  let divVista = document.getElementById('divVistaSupSyD');
  let divcallesIzq = document.getElementById('callesIzquierdaSyD');
  let divcallesDerecha = document.getElementById('callesDerechaSyD');
  let profundidadGral = document.getElementById("profundidad_s").value;
  let callesGral = document.getElementById("calles_s").value;
  let anchoTotal = document.getElementById("ancho_s").value
  let largoTotal = document.getElementById("largo_s").value;
  let pasillo = document.getElementById("pasilloSupViewSyD")
  const fragment = document.createDocumentFragment()
  divcallesIzq.innerHTML = null
  divcallesDerecha.innerHTML = null  
  divVista.innerHTML=null;
  




  let divCotaSup = document.createElement("div");
  divCotaSup.className = "cotaSuperiorS";
  divCotaSup.innerHTML = `[ Largo total ${largoTotal}Mts - ${callesGral} Calles ]`;

  let cotaLateral = document.createElement("div");
  cotaLateral.className = "cotaLateralS cotaInfo";
  cotaLateral.innerHTML = `[ Ancho total ${anchoTotal}Mts - ${profundidadGral} Profundidades ]`;

  fragment.appendChild(divCotaSup);
  fragment.appendChild(cotaLateral);

  const pasilloSupView = document.createElement('div');
  pasilloSupView.id = "pasilloSupViewSyD";
  pasilloSupView.className = "pasilloSup";
  pasilloSupView.innerHTML = `
  <div style= "position: absolute;"> <img src="./img/transSup.svg" alt=""> </div>
  <div class="pasilloSupRiel" > </div>
  `;


  //Borrar pasillo.
  if(typeof(pasillo) != 'undefined' && pasillo != null){
    pasillo.remove();
  }

  //for que recorre las calles
  for (let calles = 1; calles <= callesGral; calles++) {
    //Por cada calle crea un div
    const calleNew = document.createElement('div');
    calleNew.id = `calleIzq${calles}`
    calleNew.className = 'calleIzq'
    const divPasillo = document.createElement('div')
    divPasillo.className = 'pasilloCelda'
    
    //for que recorre profundidad
    for (let prof = profundidadGral; prof > 0; prof--) {
      const profCarga = document.createElement('div');
      profCarga.id = `profCargaIzqSyD${prof}`;
      profCarga.className = 'profCargaIzq';
      calleNew.appendChild(profCarga);
    }
    divcallesIzq.appendChild(calleNew)
    fragment.appendChild(divcallesIzq)
    pasilloSupView.appendChild(divPasillo)
    
  }

  fragment.appendChild(pasilloSupView);

  for (let calles = 1; calles <= callesGral; calles++) {
    //Por cada calle crea un div
    const calleNew = document.createElement('div');
    calleNew.id = `calleDerSyD${calles}`
    calleNew.className = 'calleIzq'
    
    //for que recorre profundidad
    for (let prof = profundidadGral; prof > 0; prof--) {
      const profCarga = document.createElement('div');
      profCarga.id = `profCargaDerSyD${prof}`;
      profCarga.className = 'profCargaIzq';
      calleNew.appendChild(profCarga);
    }
    divcallesDerecha.appendChild(calleNew)
    fragment.appendChild(divcallesDerecha)
    
  }
    divVista.appendChild(fragment)

}