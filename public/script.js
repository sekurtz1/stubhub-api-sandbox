$(document).ready(function(){

	$("form").one("submit", function(e){
		

		$("#customrow").animate({marginTop: '-=200px'},700);

	});

	$('body').on('submit','#testform', function() {
    	
		      return true;
	});

	$("#testform").on("submit", function(e){
		e.preventDefault();
		$(".special").fadeOut(700, ajaxCall);

	});

		var ajaxCall = function(){ 

		var formData = $("#data").val();

		
			$.ajax ({
					 type: "POST",
		             url: '/',
		             data: {q: formData},
		             contentType: 'application/x-www-form-urlencoded',
		             success: function (data, status, jqXHR) {
		             	var dataObject = data;

		                var source   = $("#entry-template").html();
		                console.log(source);
		                var template = Handlebars.compile(source);
						Handlebars.registerPartial("eventPartial", $("#events-template").html());
						var html    = template(dataObject);
 
						$(".special").html(html);
						// console.log(html);
						
						$(".special").fadeIn(700);
						
		             },
		
		             error: function (jqXHR, status) {
		                 // error handler
		                 console.log(jqXHR);
		                 console.log('fail' + status.code);
		             }
	          });
		};
				

	

});