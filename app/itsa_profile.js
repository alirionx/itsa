//------------------------------------------------------------------------------

	view_build["profile"] = function(){
		
		//----------------------------------------
			var headblock = headblock_build();
			document.body.appendChild(headblock);
		//----------------------------------------
			var mainres = document.getElementById("mainres");
				mainres.innerHTML = "";
		//----------------------------------------
			usr_edit_call( mainres );
		//----------------------------------------
		
	}
		
//------------------------------------------------------------------------------


	function usr_edit_call( target ){
		
		var data = new FormData();
			data.append("function", "ldap_usr_edit_call");
										
		form_post( app_api , data , usr_edit_build , target );
	}
	
	function usr_edit_build( obj , target ){
		
		//----------------------
			
			var af = simple_element_build( "DIV" , "action_form" );
				af.id = "usr_profile_form";
				
		//----------------------
		
			var	af_hl = document.createElement("DIV");
				af_hl.setAttribute("af_hl" , "1" );
				af_hl.innerHTML = "Edit User Profile: " + obj.content.uid;
				
			af.appendChild(af_hl);
			
		//----------------------
			
			var	af_img = document.createElement("IMG");
				af_img.id = "avatar_icon_img";
				af_img.src = "icos/"+obj.icon;
				af_img.setAttribute("avatar", "1")
				af_img.onclick = function(){
					
					var avatar_icon_input = document.getElementById("avatar_icon_input");
						avatar_icon_input.click();
				}
				
			af.appendChild(af_img);
			
			var	af_img_input = document.createElement("INPUT");
				af_img_input.id = "avatar_icon_input";
				af_img_input.type = "file";
				af_img_input.style.display = "none";
				
				af_img_input.setAttribute("dn" , obj.content.dn);
				af_img_input.setAttribute("uid" , obj.content.uid);
				af_img_input.onchange = function(){
					
					var dn  = this.getAttribute("dn");
					var uid = this.getAttribute("uid");
					
					var avatar_icon_input = document.getElementById("avatar_icon_input");
					
					var data = new FormData();
						data.append("function", "ldap_icon_change");
						data.append("dn", dn);
						data.append("uid", uid);
						data.append("ico_file", avatar_icon_input.files[0]);
										
					form_post( app_api , data );
					
					
					//document.getElementById("avatar_icon_img").src = "";
					setTimeout( function(){ 
						
						usr_edit_call( obj.content.dn );	
					} , 1500 ); 
				}
				
			af.appendChild(af_img_input);
			
		//----------------------	
			
			for( var prop in obj.def ){
				
				var	af_input_hl = document.createElement("DIV");
					af_input_hl.setAttribute("profile_hl", "1")
					af_input_hl.style.width = obj.def[prop].width;
					af_input_hl.innerHTML = obj.def[prop].hl + ":";
					
				af.appendChild(af_input_hl);
				
				var input_ary = [];
					input_ary.dn  =obj.content.dn;
					input_ary.key = prop;
					input_ary.val = obj.content[prop];
					
				var af_input = domel_ldap_change["input"]( input_ary );
					af_input.setAttribute("profile", "1");
					af_input.style.width = obj.def[prop].width;
				
				af.appendChild(af_input);
			}
			
		//----------------------
			
			var	af_btn = document.createElement("BUTTON");
				af_btn.innerHTML = "Reset password";
				af_btn.style.marginTop = "20px";
				af_btn.onclick = function(){
					
					usrpwd_reset( "user" );
				}
				
			af.appendChild(af_btn);
		
		//-------------
			
			var	af_btn = document.createElement("BUTTON");
				af_btn.innerHTML = "Home";
				af_btn.style.marginTop = "20px";
				af_btn.onclick = function(){
					
					this.parentNode.parentNode.removeChild(this.parentNode);
					
					location.href = "#view=home";					
					view_call();
				}
				
			//af.appendChild(af_btn);

		//----------------------
		
		target.appendChild(af);
		center_domel( af , "160px" );
	}
	
	
//------------------------------------------------------------------------------