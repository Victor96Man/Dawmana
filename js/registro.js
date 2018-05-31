{
	let $nombre;
	let $errorNombre;
	let $dni;
	let $errorDni;
	let $apellido;
	let $errorApellido;
	let $email;
	let $errorEmail;
	const REGEXPNOMBRE = /^([a-zA]{3,}\s*)+$/i;
	const REGEXPAPELLIDO = /^([a-zA]{3,}\s[a-zA]{3,})+$/i;
	const REGEXPEMAIL = /^(\w+)(@{1})(\w+)(\.{1})(\w+)$/;
	const REGEXPDNI = /^(\d{8})(\s?|\-?)([TRWAGMYFPDXBNJZSQVHLCKET])$/i;
	const LETRASDNI = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];

	$(function(){
		
		$("#home").on("click",index);
		$("#ponentes").on("click", ponentes);
		$("#login").on("click", login);

		$nombre = $("#nombre");
		$errorNombre = $("#errorNombre");
		
		$apellidos = $("#apellidos");
		$errorApellidos = $("#errorApellidos");
		
		$dni = $("#dni");
		$errorDni = $("#errorDni");

		$email = $("#email");
		$errorEmail = $("#errorEmail");
		
		$("#registrarse").on("click", comprobarFormulario);
	});

	function comprobarFormulario(){
		comprobar(REGEXPNOMBRE, $nombre, $errorNombre);
		comprobar(REGEXPAPELLIDO, $apellidos, $errorApellidos);
		comprobar(REGEXPEMAIL, $email, $errorEmail);
		comprobarDNI();

		if($("#formulario>div>i").text() === "****"){
			$( "#dialog-message" ).dialog({
				modal: true,
		    	buttons: {
		    		Aceptar: function() {
		     			$( this ).dialog( "close" );
		    		}
		   		}
		  	});
		}
	}

	function comprobar(regExp, $variable, $variableError){
		if(!regExp.test($variable.val().trim())){
			$variableError.html("* Algo esta mal.");
		}else{
			$variableError.text("*");
		}
	}

	function comprobarDNI(){
		if(REGEXPDNI.test($dni.val().trim())){
			let grupos = $dni.val().trim().match(REGEXPDNI);
			let numero = grupos[1];
			let letra = grupos[3];

			if (letra.toUpperCase() === LETRASDNI[numero%23]) {
				$errorDni.text("*");
			}else{
				$errorDni.text("* Letra incorrecta.");
			}
		}else{
			$errorDni.text("* DNI invalido.");
		}
	}
	function index(){
			$.get("index.html", function(data) {
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