jQuery.support.cors = true;

var def_city = "Maceio";
var city_name = "Maceio";

var data;

function requestWeather(city_name) {
	
	$.getJSON({
	  url: "https://api.hgbrasil.com/weather",
	  data: {
		key: '682b03fb',
		format: 'json-cors',
		city_name: city_name,
		locale: 'pt'

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
			$( "#status" ).html( "Descrição: " + data.description );
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

