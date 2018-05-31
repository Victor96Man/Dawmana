{
	$(function(){
		$.getJSON("php/actividades.php?ponentes").done(verIndex);

		$("#home").on("click",index);
		$("#login").on("click", login);
		$("#registro").on("click", registro);
	});

	function verIndex(data){
		$.each( data, function( key, value ) {
			$("main").append("<article>"+
								"<p><a href='"+value.Imagen+"' data-lightbox='roadtrip'><img src='"+value.Imagen+"'></a></p>"+
								"<p><span>Ponente:</span> "+value.Ponente+".</p>"+
								"<p><span>Origen:</span> "+value.Empresa+".</p>"+
							"</article>");
		});
		
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

	function login(){
			$.get("login.html", function(data) {
				$("body").html(data);
			});
	}
}