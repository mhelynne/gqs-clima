jQuery.support.cors = true;

var def_city = "Maceio";
var city_name = "Maceio";

var data;
var statusMap;

function setMap () {
	
	statusMap = new Map();

	statusMap.set("0", "Tempestade forte");
	statusMap.set("1", "Tempestade tropical");
	statusMap.set("2", "Furacão");
	statusMap.set("3", "Tempestades severas");
	statusMap.set("4", "Tempestades");
	statusMap.set("5", "Misto de neve e chuva");
	statusMap.set("6", "Misto chuva e gelo");
	statusMap.set("7", "Misto neve e gelo");
	statusMap.set("8", "Geada fina");
	statusMap.set("9", "Chuviscos");
	statusMap.set("10", "Congelamento chuva");
	statusMap.set("11", "Alguns chuviscos");
	statusMap.set("12", "Alguns chuviscos");
	statusMap.set("13", "Neve baixa");
	statusMap.set("14", "Tempestade com neve");
	statusMap.set("15", "Ventania com neve");
	statusMap.set("16", "Neve");
	statusMap.set("17", "Granizo");
	statusMap.set("18", "Gelo");
	statusMap.set("19", "Poeira");
	statusMap.set("20", "Neblina");
	statusMap.set("21", "Tempestade de areia");
	statusMap.set("22", "Fumacento");
	statusMap.set("23", "Vento acentuado");
	statusMap.set("24", "Ventania");
	statusMap.set("25", "Tempo frio");
	statusMap.set("26", "Tempo nublado");
	statusMap.set("27", "Tempo limpo");
	statusMap.set("28", "Tempo nublado");
	statusMap.set("29", "Parcialmente nublado");
	statusMap.set("30", "Parcialmente nublado");
	statusMap.set("31", "Tempo limpo");
	statusMap.set("32", "Ensolarado");
	statusMap.set("33", "Estrelado");
	statusMap.set("34", "Ensolarado com muitas nuvens");
	statusMap.set("35", "Misto chuva e granizo");
	statusMap.set("36", "Ar quente");
	statusMap.set("37", "Tempestades isoladas");
	statusMap.set("38", "Trovoadas dispersas");
	statusMap.set("39", "Trovoadas dispersas");
	statusMap.set("40", "Chuvas esparsas");
	statusMap.set("41", "Pesados neve");
	statusMap.set("42", "Chuviscos com neve");
	statusMap.set("43", "Neve pesada");
	statusMap.set("44", "Sol com poucas nuvens");
	statusMap.set("45", "Chuva");
	statusMap.set("46", "Queda de neve");
	statusMap.set("47", "Tempestades isoladas");
	statusMap.set("48", "Serviço não disponível");
}

function requestWeather(city_name) {
	
	$.getJSON({
	  url: "https://api.hgbrasil.com/weather",
	  data: {
		key: '682b03fb',
		format: 'json-cors',
		city_name: city_name
	  },
	  success: function( result ) {
		
		if(result.by == "default") {
			
			$("#city-exists").hide();
			
			$( "#city" ).html( "Cidade não localizada" );
			$( "#temp" ).html( "" );
			$( "#status" ).html( "" );
			$( "#wind" ).html( "" );
			$( "#sunrise" ).html( "" );
			$( "#sunset" ).html( "" );
			
			//var url_img = "https://assets.hgbrasil.com/weather/images/38.png";
			//$( "#not-img" ).attr("src",url_img);
			
			$("#city-not-exists").show();
			
		} else {
			
			$("#city-not-exists").hide();
			
			data = result.results;
			city_name = data.city_name;
			
			$( "#city" ).html( "Clima em " + city_name );
			$( "#temp" ).html( "Temperatura atual: " + data.temp +" °C" );
			$( "#status" ).html( "Descrição: " + statusMap.get(data.condition_code) );
			$( "#wind" ).html( "Velocidade do vento: " + data.wind_speedy );
			$( "#sunrise" ).html( "Nascer do sol: " + data.sunrise );
			$( "#sunset" ).html( "Por do sol: " + data.sunset );			
			var url_img = "https://assets.hgbrasil.com/weather/images/"+ data.img_id +".png";
			$( "#weather-img" ).attr("src",url_img);
			
			$("#city-exists").show();
			
			
		}
		
	  }
	  
	});
	
}

function searchForCity() {
	var search_city = $("#search-city").val();
		
	if( search_city ) {
		requestWeather( search_city );		
	}
}

setMap();
requestWeather(def_city);

$(document).ready(function() {
	
	$("#search-btn").on("click", function() {		
		searchForCity();		
	});
	
	$("#search-city").on('keypress',function(e) {
    if(e.which == 13) {
        searchForCity();
    }
	
});

});

