
var count = 0;
var resultado_diler = 0;
var resultado_jugador = 0;
var suma_jugador = 0;
var suma_diler = 0;
var resultado_IA = 0;
var suma_IA = 0;
var primerajugada=0;

var banderadeAJugador = 0;
var jugadaconAjugador = 0;
var banderaDeADealer = 0;
var banderaDeAIA = 0;
var jugadaConAIA =0;
var jugadaConADiler = 0;

var btnDame = document.getElementById('dame');
var btnPlanto = document.getElementById('planto');
var btnInicio = document.getElementById('iniciar');


function darCartaJugador(input) {

  var jqXHR = $.ajax({
    type: "POST",
    url: "/dame",
    async: false,
    data: { mydata: input },
    success: callbackFunc


  });

  return jqXHR.responseText;
  function callbackFunc(result) {
    


    var numeroCarta = result.split("-");

    if (input == "diler") {

      alert('dealer pensando pensando :3 ');

      if (numeroCarta[0] ==1) {
        banderaDeADealer =1;
        jugadaConADiler = parseInt(suma_diler, 10)+ 11;
        
        if (jugadaConADiler <22) {
          suma_diler = jugadaConADiler;
          
        }else{

          banderaDeADealer = 0;
          console.log('Got back ' + result + 'numero : ' + numeroCarta[0]);
          suma_diler = parseInt(suma_diler, 10) + parseInt(numeroCarta[0], 10);


        }        
      }else{

        console.log('Got back ' + result + 'numero : ' + numeroCarta[0]);
        suma_diler = parseInt(suma_diler, 10) + parseInt(numeroCarta[0], 10);
  

      }

      if (banderaDeADealer ==1 && suma_diler>21) {
        suma_diler = suma_diler -10;
        banderaDeADealer = 0;
      }

 
     
      var lista = document.getElementById("inner");
      console.log('suma diler :' + suma_diler + ' - suma jugador: ' + suma_jugador + " - Suma IA :" + suma_IA);
      count = count + 1;
      if (count % 4 == 0) {

        lista.insertAdjacentHTML("beforeend", "<img height='100' width='100' src='static/images/" + result + ".png'><br>");

      } else {
        lista.insertAdjacentHTML("beforeend", "<img height='100' width='100' src='static/images/" + result + ".png'>");
      }


    } else if (input == "jugador") {



      alert('entro al callback de jugador');
      var numeroCarta = result.split("-");

      if (numeroCarta[0] ==1) {
        banderadeAJugador =1;
        jugadaconAjugador = parseInt(suma_jugador, 10)+ 11;
        
        if (jugadaconAjugador <22) {
          suma_jugador = jugadaconAjugador;
          
        }else{
          
          banderadeAJugador = 0;
          console.log('Got back ' + result + 'numero : ' + numeroCarta[0]);
          suma_jugador = parseInt(suma_jugador, 10) + parseInt(numeroCarta[0], 10);
        }
      }else{

        console.log('Got back ' + result + 'numero : ' + numeroCarta[0]);
        resultado_jugador = result;
        suma_jugador = parseInt(suma_jugador, 10) + parseInt(numeroCarta[0], 10);

      }

      if (banderadeAJugador ==1 && suma_jugador>21) {
        suma_jugador = suma_jugador -10;
        banderadeAJugador = 0;
      }

      
      var lista = document.getElementById("first");
      console.log('suma diler :' + suma_diler + ' - suma jugador: ' + suma_jugador + " - Suma IA :" + suma_IA);
      if (suma_jugador > 21) {
        planto();
      }

      count = count + 1;
      if (count % 4 == 0) {

        lista.insertAdjacentHTML("beforeend", "<img height='100' width='100' src='static/images/" + result + ".png'><br>");

      } else {
        lista.insertAdjacentHTML("beforeend", "<img height='100' width='100' src='static/images/" + result + ".png'>");
      }


    }else if (input == "IA") {

      
   
     

      alert('IA pensando :3 ');
      var numeroCarta = result.split("-");

      if (numeroCarta[0] ==1) {
        banderaDeAIA =1;
        jugadaConAIA = parseInt(suma_IA, 10)+ 11;
        
        if (jugadaConAIA <22) {
          suma_IA = jugadaConAIA;
          
        }else{
          
          banderaDeAIA = 0;
          console.log('Got back ' + result + 'numero : ' + numeroCarta[0]);
          suma_IA = parseInt(suma_IA, 10) + parseInt(numeroCarta[0], 10);
        }
      }else{

      resultado_IA = result;
      suma_IA = parseInt(suma_IA,10) + parseInt(numeroCarta[0], 10);

      }

      console.log('Got back ' + result + 'numero : ' + numeroCarta[0]);

      var lista = document.getElementById("IA");




      if (banderaDeAIA ==1 && suma_IA>21) {
        suma_IA = suma_IA -10;
        banderaDeAIA = 0;
      }

      console.log('suma diler :' + suma_diler + ' - suma jugador: ' + suma_jugador + " - Suma IA :" + suma_IA);

      count = count + 1;
      if (count % 4 == 0) {

        lista.insertAdjacentHTML("beforeend", "<img height='100' width='100' src='static/images/" + result + ".png'><br>");

      } else {
        lista.insertAdjacentHTML("beforeend", "<img height='100' width='100' src='static/images/" + result + ".png'>");
      }

      
    }

  }










}


function dame() {


  result = darCartaJugador("jugador");

}

function iniciar() {

  

  result = darCartaJugador("diler");

  btnDame.style.display = "block";
  btnPlanto.style.display = "block";
  btnInicio.style.display = "none";


}

function planto() {



  btnDame.style.display = "none";
  btnPlanto.style.display = "none";

  result = Jugada_IA();


}

function Jugada_IA() {

  if (primerajugada==0) {
    darCartaJugador("IA");
    primerajugada=primerajugada+1
  }



  var jqXHR = $.ajax({
    type: "POST",
    url: "/desicion",
    async: true,
    data: { mydata: suma_IA },
    success: callbackFunc


  });

  return jqXHR.responseText;
  function callbackFunc(result) {

    console.log(result)
    if (result == "dame") {
      darCartaJugador("IA");
      Jugada_IA();
    }else{
      PlantoIA();
    }

  }

}

function PlantoIA(params) {

  var jqXHR = $.ajax({
    type: "POST",
    url: "/desicion",
    async: true,
    data: { mydata: suma_diler },
    success: callbackFunc


  });

  return jqXHR.responseText;
  function callbackFunc(result) {

    console.log(result)
    if (result == "dame") {

      darCartaJugador("diler");
      PlantoIA();
    }else{
      ganador();
    }

  }

}

function ganador() {
  
    if (suma_diler==suma_IA) {
      alert('empate entre IA y diler');
      console.log('empate entre IA y diler');
    }else if((suma_diler>suma_IA && suma_diler<22) || suma_IA >22){ 
      alert('gana diler contra IA')
      console.log('gana diler contra IA');
    }else if(suma_IA<22){
       alert('gana IA')
       console.log('gana IA');
     }
     if (suma_jugador>22) {
      console.log('gana dealer');
     } 
    
    
    if (suma_diler==suma_jugador) {
      alert('empate entre jugador y diler');
      console.log('empate entre jugador y diler');
    }else if ((suma_diler > suma_jugador && suma_diler<22) || suma_jugador>22) {
      alert('gana diler contra el jugador');
      console.log('gana diler contra el jugador');
    }else if(suma_jugador<22){
      alert('gana jugador');
      console.log('gana jugador');

    }
    if (suma_IA>22) {
      console.log('gana dealer');
     } 
    
    var volver = document.getElementById('refresh');

    volver.style.display = "block";
}

function refresh() {
  
  location.reload();
}