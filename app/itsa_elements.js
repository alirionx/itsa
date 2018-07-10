
	var form_element_call = [];
	var domel_ldap_change = [];
	
//------------------------------------------------------------------------------

	function simple_element_build( domel_tag , domel_style ){
		
		var domel = document.createElement(domel_tag);
			
		if( domel_style != undefined ){
			domel.classList.add(domel_style);
		}
		
		return domel;
	}
	
//------------------------------------------------------------------------------

	function menue_bar_build( obj ){
		
		var domel = document.createElement("DIV");
			domel.setAttribute("bar" , "1");
			domel.setAttribute("type" , obj.type );
			domel.setAttribute("linkval" , obj.linkval );

			domel.innerHTML = obj.txt;
			
			domel.onclick = function(){
				
				burger_menue_hide();
			
				var type = domel.getAttribute("type");
				var linkval = domel.getAttribute("linkval");
				
				if( type == "function_fw" ){
					
					function_fw[linkval]();
				}
				
				if( type == "hash" ){
					
					location.href = "#"+linkval;
					view_call();
				}
			
			}
		
		
		return domel;
	}
	
//------------------------------------------------------------------------------
	
	function opt_menue( id , val_ary ){
	
		//console.log(id); console.log(val_ary);
		
		//-----------------------------------------
			var opt_select = document.createElement("SELECT");
				opt_select.classList.add("opt_menue");
				
			//---------------------
			
				opt_select.setAttribute( "func_id" , id );
				opt_select.onchange = function(){
					
					var func_id = this.getAttribute( "func_id" );
					var action = this.value;
					
					opt_menue_fw[action](func_id );
					
					this.value = "null";
				}
				
			//---------------------
				
				var opt_opt = document.createElement("OPTION");
					opt_opt.innerHTML = "Options";
					opt_opt.value = "null";
				
				opt_select.appendChild(opt_opt);
				
			//-----------
			
			for( prop in val_ary ){
				
				var opt_opt = document.createElement("OPTION");
					opt_opt.innerHTML = val_ary[prop];
					opt_opt.value = prop;
				
				opt_select.appendChild(opt_opt);	
			}
			
		//-----------------------------------------
		
		return opt_select;
	}

//------------------------------------------------------------------------------

	
	domel_ldap_change["input"] = function( input_ary ){
		
		var domel = document.createElement("INPUT");
			domel.type = "text";
			domel.value = input_ary.val;
			
			domel.setAttribute( "dn" , input_ary.dn );
			domel.setAttribute( "key" , input_ary.key );
			domel.onchange = function(){
				
				var dn 	= this.getAttribute( "dn" );
				var key = this.getAttribute( "key" );
				var val = this.value;
				
				var data = new FormData();
					data.append("function", "ldap_entry_change");
					data.append("dn" , dn);
					data.append("key", key);
					data.append("val", val);
				
				form_post( app_api , data  );
			}
		
		return domel;
	}
	
	domel_ldap_change["textarea"] = function( input_ary ){
		
		var domel = document.createElement("TEXTAREA");
			domel.value = input_ary.val;
			
			domel.setAttribute( "dn" , input_ary.dn );
			domel.setAttribute( "key" , input_ary.key );
			domel.onchange = function(){
				
				var dn 	= this.getAttribute( "dn" );
				var key = this.getAttribute( "key" );
				var val = this.value;
				
				var data = new FormData();
					data.append("function", "ldap_entry_change");
					data.append("dn" , dn);
					data.append("key", key);
					data.append("val", val);
				
				form_post( app_api , data  );
			}
		
		return domel;
	}

//------------------------------------------------------------------------------

	function blocker_call(){
		
		var blocker = document.createElement("DIV");
			blocker.classList.add("blocker");
			blocker.id = "blocker";
			
		document.body.appendChild(blocker);
	}
	
//------------------

	function blocker_remove(){
		
		var blocker = document.getElementById("blocker");
			
		document.body.removeChild(blocker);
	}

//------------------------------------------------------------------------------
	
	
/*
	form_element_call["input"] = function( val , ph ){
		
		var form_element = document.createElement("INPUT");
			form_element.value = val;
			
		if( ph != undefined ){
			form_element.placeholder = ph;
		}
			
		return form_element;
	}
	
//-----------------------
	
	form_element_call["textarea"] = function( val , ph ){
		
		var form_element = document.createElement("TEXTAREA");
			form_element.value = val;
			
		if( ph != undefined ){
			form_element.placeholder = ph;
		}
			
		return form_element;
	}
	
//-----------------------
	
	form_element_call["file"] = function( val ){
		
		
		var form_element = document.createElement("INPUT");
			form_element.type = "file";
		
		return form_element;
		
		
		
		var form_element_frame = document.createElement("DIV");
			form_element_frame.setAttribute("value" , val);
		
			var ran_nbr = Math.floor((Math.random() * 1000000) + 1);
		
		//------------------
		
			var form_element = document.createElement("INPUT");
				form_element.id = "file_" + ran_nbr;
				form_element.type = "file";
				form_element.style.display = "none";
				form_element.setAttribute( "ran_nbr" , ran_nbr);
				form_element.onchange = function(){
					
					var ran_nbr = this.getAttribute("ran_nbr");
					document.getElementById("blender_" + ran_nbr).value = this.value;
					this.parentNode.setAttribute("value" , this.value);
				}
				
			form_element_frame.appendChild(form_element);
		
		//------------------
				
			var form_element_blender = document.createElement("INPUT");
				form_element_blender.id = "blender_" + ran_nbr;
				form_element_blender.value = val;
				form_element_blender.setAttribute( "ran_nbr" , ran_nbr);
				form_element_blender.onclick = function(){
					
					var ran_nbr = this.getAttribute("ran_nbr");
					document.getElementById("file_" + ran_nbr).click();
				}
				
			form_element_frame.appendChild(form_element_blender);
		
		//------------------
			
		return form_element_frame;
		
		
	}
		
		
//------------------------------------------------------------------------------		
*/		
		
		
		
		
		
		