{
	$(function(){
		if(sessionStorage.imagenInicio === "true"){
			verIndex();
			$("#imagenInicio").addClass("despues");
		}else{
			$("#imagenInicio").hide("scale", 6000, verIndex);
		}

		$( "#tablas" ).tabs();


		mostrar($("#lunes"), "Lunes");
	    $("#Lunes").one("click", mostrar($("#lunes"), "Lunes"));
	    $("#Martes").one("click", mostrar($("#martes"), "Martes"));
	    $("#Miercoles").one("click", mostrar($("#miercoles"), "Miercoles"));
	    $("#Jueves").one("click", mostrar($("#jueves"), "Jueves"));
	    $("#Viernes").one("click", mostrar($("#viernes"), "Viernes"));

		$("#ponentes").on("click", ponentes);
		$("#registro").on("click", registro);
		$("#login").on("click", login);
		$("article").tooltip();
	});

	function verIndex(){
		$("header").removeClass("despues");
		$("nav").removeClass("despues");
		$("#tablas").removeClass("despues");
		$("footer").removeClass("despues");
		sessionStorage.imagenInicio = "true";
	}

	function mostrar($div, dia){
		$.getJSON("php/actividades.php?dia="+dia, function(data) {

			$.each( data, function( key, value ) {
					$div.append("<article title='Esto es una breve descripcion de prueba'>"+
									"<img src='"+value.Imagen+"'>"+
									"<div>"+
										"<h2>"+value.Nombre+"</h2>"+
										"<p><span>Ponente:</span> "+value.Ponente+"</p>"+
										"<p><span>Hora:</span> "+value.Hora+"</p>"+
										"<p><span>Origen:</span> "+value.Empresa+"</p>"+
									"</div>"+
								"</article>");
			});
	 	});
	}

	function registro(){
			$.get("registro.html", function(data) {
				$("body").html(data);
			});
	}

	function ponentes(){
			$.get("ponentes.html", function(data) {
				$("body").html(data);
			});
	}

	function login(){
			$.get("login.html", function(data) {
				$("body").html(data);
			});
	}


}
