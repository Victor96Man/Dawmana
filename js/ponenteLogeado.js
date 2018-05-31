{
	//variables
	let $nombre;
	let $apellidos;
	let $empresa;
	let $ponencia;
	let $descBreve;
	let $desc;
	let $imagen;
	let $materialPonente;
	let $materialAsistente;
	let $numAsistentes;
	//variables de errores
	let $errorNombre;
	let $errorApellidos;
	let $errorEmpresa;
	let $errorPonencia;
	let $errorDescBreve;
	let $errorDesc;
	let $errorImagen;
	let $errorNumAsistentes;

	let error = 0;

	const REGEXPNOMBRE = /^([a-zA]{3,}\s*)+$/i;
	const REGEXPACTIVIDAD = /^([a-zA]+\s*)+$/i;
	const REGEXPDESCBREVE = /^(.){20,40}$/i;
	const REGEXPDESCEXTENSA = /^(.){40,}$/i;
	const REGEXPAPELLIDOS = /^([a-zA-ZÀ-ÿ]{3,}\s[a-zA]{3,})+$/i;
	const REGEXPNUMEROS = /^\d+$/;
	const REGEXPURLIMAGEN = /^([A-z\.\-+\d])+(\.|\-)*\.(jpg|jpeg|png)$/;

	$(function(){
		let $patrocinio = $("#patrocinio");
		let $fechaDesde = $("#fechaDesde");
		let $fechaHasta = $("#fechaHasta");
		let $observaciones = $("#observaciones");	
		$nombre = $("#Nombre");
		$errorNombre = $("#errorNombre");
		$apellidos = $("#Apellidos");
		$errorApellidos = $("#errorApellidos");
		$empresa = $("#Empresa");
		$errorEmpresa = $("#errorEmpresa");

		$ponencia = $("#Ponencia");
		$errorPonencia = $("#errorPonencia");
		$descBreve = $("#DescBreve");
		$errorDescBreve = $("#errorDescBreve");
		$desc = $("#desc");
		$errorDesc = $("#errorDesc");
		$imagen = $("#Imagen");
		$errorImagen = $("#errorImagen");
		$materialPonente = $("#materialPonente");
		$materialAsistente = $("#materialAsistente");
		$numAsistentes = $("#NumAsistentes");
		$errorNumAsistentes = $("#errorNumAsistentes");

		$("#actualizar").on("click", comprobarDatos);
		$("#registrar").on("click", comprobarFormularioPonencia);
		$("#cerrar").on("click", index);

		$( "#tablas" ).tabs();
		$.datepicker.setDefaults($.datepicker.regional["es"]);
		let dateFormat = "dd/mm/yy",
	  		from = $( "#fechaDesde" ).datepicker({
	        	changeMonth: true,
	        	numberOfMonths: 1,
	        	minDate: "29/01/2018",
	        	maxDate: "02/02/2018" 
	   		}).on( "change", function() {
	   			to.datepicker( "option", "minDate", getDate( this ));
	 		}),
	    	to = $( "#fechaHasta" ).datepicker({
		        changeMonth: true,
		        numberOfMonths: 1,
		        minDate: "29/01/2018",
		        maxDate: "02/02/2018" 
	  		}).on( "change", function() {
	    		from.datepicker( "option", "maxDate", getDate( this ) );
			});
			function getDate( element ) {
				let date;
				try {
					date = $.datepicker.parseDate( dateFormat, $(element).val() );
				} catch( error ) {
					date = null;
				}
				if($(element).attr("id") === "fechaDesde"){
					$fechaDesde = date;
				}else{
					$fechaHasta = date;
				}
				return date;
			}

		$.getJSON("php/actividades.php?login", function(data) {
			$.each( data, function( key, value ) {
				if(value.Usuario === sessionStorage.usuario){
					$nombre.val(value.Nombre);
					$apellidos.val(value.Apellidos);
					$empresa.val(value.Empresa);
					$patrocinio.prop("checked", value.Patrocinio);
					$patrocinio.val(value.Patrocinio);
					$fechaDesde.val(value.FechaDesde);
					$fechaHasta.val(value.FechaHasta);
					$observaciones.val(value.Observaciones);
				}
 			});
		});
	});

	function comprobar(regExp, $variable, $variableError){
		if(!regExp.test($variable.val().trim())){
			$variableError.html("* Error, campo invalido.").attr('value', 'error');;
			error++;
		}else{
			$variableError.text("*").attr('value', '');
		}
	}

	function buscaError(){

	let $errorFoco = $("i").attr('value', 'error').first().attr('id');
	console.log($errorFoco);
	}


	function comprobarFormularioPonencia(){
		comprobar(REGEXPACTIVIDAD, $ponencia, $errorPonencia);
		comprobar(REGEXPDESCBREVE, $descBreve, $errorDescBreve);
		comprobar(REGEXPDESCEXTENSA, $desc, $errorDesc);
		comprobar(REGEXPNUMEROS, $numAsistentes, $errorNumAsistentes);
		comprobar(REGEXPURLIMAGEN, $imagen, $errorImagen);
	
		if(error==0){
			$( "#dialog-message-ponencia" ).dialog({
				modal: true,
		    	buttons: {
		    		Aceptar: function() {
		     			$( this ).dialog( "close" );
		    		}
		   		}
		  	});
		}else{
			error=0;
			buscaError();
			window.scrollTo(0,0);
		}
	}
	function comprobarDatos(){
		comprobar(REGEXPNOMBRE, $nombre, $errorNombre);
		comprobar(REGEXPAPELLIDOS, $apellidos, $errorApellidos);
		comprobar(REGEXPNOMBRE, $empresa, $errorEmpresa);
		if(error==0){
			$( "#dialog-message" ).dialog({
				modal: true,
		    	buttons: {
		    		Aceptar: function() {
		     			$( this ).dialog( "close" );
		    		}
		   		}
		  	});
		 
		}
		error=0;
		buscaError();
	}

	function index(){
			$.get("index.html", function(data) {
				$("body").html(data);
			});
	}
}