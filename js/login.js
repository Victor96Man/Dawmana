{
	let $usuario;
	let $errorUsuario;
	let $contrasena;
	let $errorContrasena;
	let $errorLogin;
	const REGEXPUSUARIO = /^(\w{6,})$/;
	const REGEXPCONTRASENA = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@Â¡#Â·Â¬=^/{}\\.+Â¿!\[\]%*<>_?,;:\-&])([A-Za-z\d$@Â¡#Â·<>Â¬=^/{}\\.+Â¿!\[\]%*_?,;:\-&]|[^ ]){6,}$/;
	$(function(){
		$("#home").on("click", index);
		$("#ponentes").on("click", ponentes);
		$("#registro").on("click", registro);

		$usuario = $(".usuario");
		$errorUsuario = $("#errorUsuario");
		
		$contrasena = $(".password");
		$errorContrasena = $("#errorContrasena");

		$errorLogin = $("#errorLogin");
		
		$("#logearse").on("click", validarLogin);
	});

	function validarLogin(){
		let usuarioValido = validarRegExp(REGEXPUSUARIO, $usuario, $errorUsuario);
		let contrasenaValida = validarRegExp(REGEXPCONTRASENA, $contrasena, $errorContrasena);
		let usuarioContrasena= false;
		if(usuarioValido && contrasenaValida){
			$.getJSON("php/actividades.php?login", function(data) {
				$.each( data, function( key, value ) {
					if(value.Usuario === $usuario.val() && value.Contraseña === $contrasena.val()){
						sessionStorage.usuario = $usuario.val();
							$.get("ponenteLogeado.html", function(data) {
								$("body").html(data);
							});
							usuarioContrasena=true;
					}
	 			});
				if(!usuarioContrasena){
					$errorLogin.css("display", "block");
			 	}
			});			
		}
	}

	function validarRegExp(regExp, $valor, $variableError){
		if($valor.val() !== undefined){
			if(!regExp.test($valor.val().trim())){
				$variableError.html("* Datos Erroneos.");
				
				return false;
			}else{
				$variableError.text("*");
				return true;
			}	
		}else{
			$variableError.html("*");
			return false;
		}	
	}
	
	function registro(){
			$.get("registro.html", function(data) {
				$("body").html(data);
			});
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
}