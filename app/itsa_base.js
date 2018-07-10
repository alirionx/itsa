
//----------------------------------------------------------
	
	var app_api 	= 'api/itsa.php';
	var auth_api	= 'api/auth.php';
	
	var base_view 	= "home";
	
	var view_fw		= [];
	var view_build 	= [];
	
	//var func_fw 	= [];
	
	var opt_menue_fw = [];

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
	
	var function_fw = [];
	
	function_fw["logoff"] = function() {
		
				
		alert( "here comes the logoff ;)" );
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
	
	function form_post( url , data , follow_function , target ){
		
		var xhr = new XMLHttpRequest();
			xhr.withCredentials = true;

			xhr.addEventListener("readystatechange", function () {
				if ( this.readyState === 4 ) {
					
					console.log(this.responseText);
					
					var header_code = this.status;
					
					if( header_code.toString()[0] == 2 ){
						
						var obj = null;
						
						if( IsJsonString( this.responseText ) == true ){ 
							
							var obj = JSON.parse( this.responseText );	
						}
						
						if( follow_function != undefined ){
							follow_function( obj , target );
						}
					}
					else{
						alert("Something went wrong in function " + data.get("function") + " with error code " + this.status );
					} 
				}
				
			});
			xhr.open("POST", url );
			xhr.setRequestHeader("Cache-Control", "no-cache");

			xhr.send(data);
	}

//----------------------------------------------------------


	opt_menue_fw["ldap_delete"] = function( dn ){
		
		var chk = confirm("Do you really want to delete this entry?");
		if (chk == true) {
   
			var data = new FormData();
				data.append("function", "ldap_entry_delete");
				data.append("dn", dn);
							
			form_post( app_api , data , view_call );
		}
	}
	
//----------------------------------------------------------
	
	
	opt_menue_fw["ldap_icon"] = function( dn ){
		
		blocker_call();
		
		//----------------------
			
			var af = simple_element_build( "DIV" , "action_form" );
		
		//----------------------
		
			var	af_hl = document.createElement("DIV");
				af_hl.setAttribute("af_hl" , "1" );
				af_hl.innerHTML = "Change Ldap Object Icon";
				
			af.appendChild(af_hl);
			
		//----------------------
			
			var	af_input = document.createElement("INPUT");
				af_input.type = "file";
				af_input.id   = "ldap_icon_input";
				
			af.appendChild(af_input);
			
		//----------------------
			
			var	af_btn = document.createElement("BUTTON");
				af_btn.innerHTML = "Ok";
				
				af_btn.setAttribute( "dn" , dn );
				af_btn.onclick = function(){
					
					var dn 		  = this.getAttribute("dn");
					var ico_domel = document.getElementById("ldap_icon_input");
					var ico_file  = ico_domel.files[0];
					
					if( ico_file == undefined ){
					
						alert("please select an image file.");
						return null;
					}
					if( ico_file.type != "image/png" && ico_file.type != "image/jpeg" ){
					
						alert("please select an valid image file (jpeg or png).");
						ico_domel.value = "";
						return null;
					}
					console.log(ico_file); 
					
					var data = new FormData();
						data.append("function", "ldap_icon_change");
						data.append("dn", dn);
						data.append("ico_file", ico_file);
						
					form_post( app_api , data, view_call );
						
					blocker_remove();
					this.parentNode.parentNode.removeChild(this.parentNode);
				}
				
			af.appendChild(af_btn);
			
			
			var	af_btn = document.createElement("BUTTON");
				af_btn.innerHTML = "Cancel";
				af_btn.onclick = function(){
					
					blocker_remove();
					this.parentNode.parentNode.removeChild(this.parentNode);
				}
				
			af.appendChild(af_btn);
		
		//----------------------
		
		document.body.appendChild(af);
		center_domel( af , "200px" );
	}

//----------------------------------------------------------

