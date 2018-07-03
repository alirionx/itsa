
//----------------------------------------------------------
	
	var app_api 	= 'api/itsa.php';
	var auth_api	= 'api/auth.php';
	
	var base_view 	= "home";
	
	var view_build 	= [];

//----------------------------------------------------------

	function IsJsonString( str ) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}

//----------------------------------------------------------

	function center_domel( domel , fixed_top ) {
		
				
		var body_with 		= document.body.offsetWidth;
		var body_height 	= document.body.offsetHeight;
		
		var domel_with 		= domel.offsetWidth;
		var domel_height 	= domel.offsetHeight;
		
		var left 	= (( body_with - domel_with ) / 2 ) / body_with * 100 ;
		var top 	= (( body_height - domel_height ) / 2 ) / body_height * 100 ;
		
				
		domel.style.position 	= "fixed";
		domel.style.left 		= left+"%";
		
		if( fixed_top != undefined ){
			
			domel.style.top 	= fixed_top;
		}
		else{
			domel.style.top 	= top+"%";
		}
	}
	
//----------------------------------------------------------

	function class_change( domel , class_1 , class_2 ) {
		
				
		if( domel.classList.contains(class_1) ){
			
			domel.classList.remove(class_1);
			domel.classList.add(class_2)
		}
		else{
		
			domel.classList.remove(class_2);
			domel.classList.add(class_1);
		}
	}
	
//----------------------------------------------------------

	function view_call(){
		
		var view = hash_handler['get']("view");
		
		if( view == undefined ){ 
			
			view = base_view; 
			location.href = "#" + hash_handler['set'] ( "view" , view );
		}
		
		view_build[view]();
	}
	
//----------------------------------------------------------

	function get_file_content( url , follow_function ){
		
		var data = null;

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
				console.log(this.responseText);
				
				follow_function( this.responseText );
			}
			else{
				return false;  
			}
		});

		xhr.open("GET", url );
		xhr.setRequestHeader("Cache-Control", "no-cache");

		xhr.send(data);
	}

//----------------------------------------------------------


//----------------------------------------------------------
