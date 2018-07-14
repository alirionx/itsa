
//------------------------------------------------------------------------------

	view_build["usrmgmt"] = function(){
		
		//----------------------------------------
			var headblock = headblock_build();
			document.body.appendChild(headblock);
		//----------------------------------------
			var mainres = document.getElementById("mainres");
				mainres.innerHTML = "";
		//----------------------------------------
			usrmgmt_blade_call( mainres );
		//----------------------------------------
	}
	
//------------------------------------------------------------------------------

	function usrmgmt_blade_call( target ){
		
		var data = new FormData();
			data.append("function", "ldap_users_call");
		
		form_post( app_api , data , usrmgmt_blade_build , target );
		
	}

//---------------------------------------------------
	
	function usrmgmt_blade_build( obj , target ){
		
		//----------------------------------------
			var opt_ary = [];
				opt_ary.usr_pwd 		= "Reset pwd";
				opt_ary.usr_membership 	= "Memberships";
				opt_ary.usr_status 		= "Status";
				opt_ary.ldap_delete	 	= "Delete";
		//----------------------------------------
		
			var view_blade = simple_element_build( "DIV" , "view_blade" );
				
			var view_blade_hl = document.createElement("DIV");
				view_blade_hl.setAttribute("hl" , "1");
				view_blade_hl.innerHTML = "Manage LDAP Users";
					
			view_blade.appendChild(view_blade_hl);
			
		//----------------------------------------
			
			var ut = document.createElement("TABLE");
				ut.setAttribute( "simpletable" , "1" );
				
				var ut_tr = document.createElement("TR");
				ut.appendChild(ut_tr);
				
			for( var prop in obj.def ){
				
				var ut_th = document.createElement("TH");
					ut_th.style.textAlign = obj.def[prop].align;
					ut_th.style.width = obj.def[prop].width;
					ut_th.innerHTML = obj.def[prop].hl;
				
				ut_tr.appendChild(ut_th);
			}
			
			//--------------
			
				var ut_th = document.createElement("TH");
					ut_th.style.textAlign = "center";
					ut_th.style.width = "";
					ut_th.innerHTML = "Admin";
				
				ut_tr.appendChild(ut_th);
				
				
				var ut_th = document.createElement("TH");
					ut_th.style.textAlign = "center";
					ut_th.style.width = "";
					ut_th.innerHTML = "";
				
				ut_tr.appendChild(ut_th);
			
		//--------------
			
			for( var prop in obj.content ){
				
				var ut_tr = document.createElement("TR");
				ut.appendChild(ut_tr);
				
				for( var prop2 in obj.def ){
					
					var ut_td = document.createElement("TD");
					ut_td.style.textAlign = obj.def[prop2].align;
					
						var input_ary = [];
							input_ary.dn  = obj.content[prop].dn;
							input_ary.key = prop2;
							input_ary.val = obj.content[prop][prop2];
					
						var ut_input = domel_ldap_change["input"]( input_ary );
						
						ut_td.appendChild(ut_input);
						
					ut_tr.appendChild(ut_td);
				}	
				
				//--------------
					
					var ut_td = document.createElement("TD");
						ut_td.style.textAlign = "center";
					
						var admin_chk = document.createElement("INPUT");
							admin_chk.type = "checkbox";
							admin_chk.setAttribute("entry" , obj.content[prop].dn );
							admin_chk.onclick = function(){
								
								var ldap_attr = "member";
								var ldap_dn = "cn=admins," + base_dn;
								var ldap_entry = this.getAttribute("entry");
								
								var func_chk = this.checked;
								var func = [];
									func["true"] = "ldap_attr_add";
									func["false"] = "ldap_attr_remove";
								
								var data = new FormData();
									data.append("function", func[func_chk] );
									data.append("dn", ldap_dn );
									data.append("attr", ldap_attr );
									data.append("entry", ldap_entry );
								
								form_post( app_api , data );	
							}
							
						if( obj.content[prop].memberof != undefined ){
							if( obj.content[prop].memberof.includes("cn=admins," + base_dn) ){
							
								admin_chk.checked = true;
							}
						}
						
						ut_td.appendChild( admin_chk );
					
					ut_tr.appendChild(ut_td);
					
				//--------------
			
					var ut_td = document.createElement("TD");
						ut_td.style.textAlign = "center";
						ut_td.style.padding = "0";
						
						var view_blade_btn = opt_menue( obj.content[prop].dn , opt_ary );
						
						ut_td.appendChild( view_blade_btn );
					
					ut_tr.appendChild(ut_td);
				
				//--------------
			}
			
			view_blade.appendChild(ut);
			
		//----------------------------------------	
			
			var view_blade_btn = document.createElement("BUTTON");
				view_blade_btn.setAttribute("btn" , "1");
				view_blade_btn.innerHTML = "add User";
				view_blade_btn.onclick = function(){
					
					opt_menue_fw["usr_add"]();
				}
					
			view_blade.appendChild(view_blade_btn);
		
		//----------------------------------------
		
		target.appendChild(view_blade);
		
	}
	
//------------------------------------------------------------------------------

	opt_menue_fw["usr_add"] = function(){
		
		blocker_call();
		
		//----------------------
			
			var usr_attr_ary = [];
			
				usr_attr_ary.givenname = [];
				usr_attr_ary.givenname.txt = "Given name";
				usr_attr_ary.givenname.mandatory = "false";
				
				usr_attr_ary.sn = [];
				usr_attr_ary.sn.txt = "Surname";
				usr_attr_ary.sn.mandatory = "true";
				
				usr_attr_ary.mail = [];
				usr_attr_ary.mail.txt = "Email address";
				usr_attr_ary.mail.mandatory = "false";
				
		//----------------------
			
			var af = simple_element_build( "DIV" , "action_form" );
		
		//----------------------
		
			var	af_hl = document.createElement("DIV");
				af_hl.setAttribute("af_hl" , "1" );
				af_hl.innerHTML = "Add LDAP User";
				
			af.appendChild(af_hl);
			
		//----------------------
			
			var	af_input = document.createElement("INPUT");
				af_input.type = "text";
				af_input.id = "uid_input";
				af_input.setAttribute("usr_attr_mandatory" , "true" );
				af_input.placeholder = "Please enter a user ID";
				
			af.appendChild(af_input);
			
			for( var prop in usr_attr_ary){
			
				var	af_input = document.createElement("INPUT");
					af_input.type = "text";
					af_input.setAttribute("usr_attr" , prop );
					af_input.setAttribute("usr_attr_mandatory" , usr_attr_ary[prop].mandatory );
					af_input.placeholder = usr_attr_ary[prop].txt;
					
				af.appendChild(af_input);
			}
			
		//----------------------
			
			var	af_btn = document.createElement("BUTTON");
				af_btn.innerHTML = "Ok";
				
				af_btn.onclick = function(){
					
					var uid_input = document.getElementById("uid_input");
					var uid			= uid_input.value;
				
				//-----------------
				
					var domel_ary = this.parentNode.querySelectorAll("[usr_attr_mandatory=true]");
					var x = domel_ary.length;
					var manda_chk = 0;
					
					for (var i = 0; i < x; i++) {
						
						if( domel_ary[i].value == "" ){ 
							domel_ary[i].style.border = "1px solid #b30000";
							manda_chk = 1; 
						}
					}
						
					if( manda_chk == 1 ){
						alert("please fill in all mandatory fields.");
						return null;
					}
					
				//-----------------
					
					var usr_data_ary = {};
					
					var domel_ary = this.parentNode.querySelectorAll("[usr_attr]");
					var x = domel_ary.length;
					
					for (var i = 0; i < x; i++) {
						
						var is_attr = domel_ary[i].getAttribute("usr_attr");
						var is_val  = domel_ary[i].value;
						
						if( is_val != "" ){
							usr_data_ary[is_attr] = is_val;
						}
					}
					
					var usr_data_json = JSON.stringify(usr_data_ary);
				
				//-----------------
				
					var data = new FormData();
						data.append("function", "ldap_usr_add");
						data.append("uid", uid);
						data.append("usr_data", usr_data_json);
										
					form_post( app_api , data , view_call );
						
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
		center_domel( af , "120px" );
	}
	
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
	
	opt_menue_fw["usr_pwd"] = function( dn ){ 
		
		usrpwd_reset( "admin" , dn );
	}
		
	function usrpwd_reset( mode , dn ){
		
		blocker_call();
			
		//----------------------
			
			var af = simple_element_build( "DIV" , "action_form" );
		
		//----------------------
		
			var	af_hl = document.createElement("DIV");
				af_hl.setAttribute("af_hl" , "1" );
				af_hl.innerHTML = "Reset user password";
				
			af.appendChild(af_hl);
			
		//----------------------
			
			if( mode == "user" ){
			
				var	af_input = document.createElement("INPUT");
					af_input.type = "password";
					af_input.id = "pwd_cur";
					af_input.placeholder = "Enter current password";
					
				af.appendChild(af_input);
			}
			
			var	af_input = document.createElement("INPUT");
				af_input.type = "password";
				af_input.id = "pwd_new";
				af_input.placeholder = "Enter new password";
				
			af.appendChild(af_input);
			
			var	af_input = document.createElement("INPUT");
				af_input.type = "password";
				af_input.id = "pwd_rep";
				af_input.placeholder = "Repeat new password";
				
			af.appendChild(af_input);
			
		//----------------------
			
			var	af_btn = document.createElement("BUTTON");
				af_btn.innerHTML = "Ok";
				af_btn.setAttribute("dn" , dn );
				af_btn.setAttribute("mode" , mode );
				af_btn.onclick = function(){
					
					var dn = this.getAttribute("dn");
					
					var pwd_new = document.getElementById("pwd_new");
					var pwd_rep = document.getElementById("pwd_rep");
					
					chk_pwd = 0;
					
					//-------------------------
					
						if( mode == "user" ){ 
							var pwd_cur = document.getElementById("pwd_cur"); 
							
							if( pwd_cur.value == "" ){
								
								pwd_cur.style.backgroundColor = "#ffe6e6";
								pwd_cur.onclick = function(){ this.style.backgroundColor = "#fff"; }
								
								chk_pwd = 1;
							}
						}
						
					//-------------------------
						
						if( pwd_new.value == "" || pwd_new.value != pwd_rep.value ){
									
							pwd_new.value = "";
							pwd_new.style.backgroundColor = "#ffe6e6";
							pwd_new.onclick = function(){ this.style.backgroundColor = "#fff"; }
							
							pwd_rep.value = "";
							pwd_rep.style.backgroundColor = "#ffe6e6";
							pwd_rep.onclick = function(){ this.style.backgroundColor = "#fff"; }
							
							chk_pwd = 1;
						}
						
					//-------------------------
						
						if( chk_pwd == 1 ){
							return null;
						}
						
					//-------------------------
					
					var data = new FormData();
						data.append("function", "ldap_usrpwd_reset");
						data.append("pwd_new", pwd_new.value );
						
						data.append("mode", mode );
						
					if( mode == "user" ){ 
						data.append("pwd_cur", pwd_cur.value );
					}
					if( mode == "admin" ){
						data.append("usr_dn", dn );
					}
					
					form_post( app_api , data , pwd_change_return , af );
				
					//this.parentNode.parentNode.removeChild(this.parentNode);
					//blocker_remove();
					
				}
				
			af.appendChild(af_btn);
		
		//----------------------
		
			var	af_btn = document.createElement("BUTTON");
				af_btn.innerHTML = "Cancel";
				af_btn.setAttribute("dn" , dn );
				af_btn.onclick = function(){
					
					this.parentNode.parentNode.removeChild(this.parentNode);
					blocker_remove();
				}
				
			af.appendChild(af_btn);
		
		//----------------------
		
		document.body.appendChild(af);
		center_domel( af , "180px" );
	}
	
	function pwd_change_return( obj , af ){
		
		if( obj != null ){
		
			if( obj["status"] == "true" ){
				
				blocker_remove();
				af.parentNode.removeChild(af);
				alert("Password changed");
			}
		}
		else{
			
			var inpu_list = af.getElementsByTagName("INPUT");
			var x = inpu_list.length;
			
			for (var i = 0; i < x; i++) {
				inpu_list[i].value = "";
			}
				
			alert("Wrong credentials or action not allowed");
		}
	}
	
//------------------------------------------------------------------------------


	opt_menue_fw["usr_membership"] = function( dn ){
		
		var data = new FormData();
			data.append("function", "ldap_usr_memberships_call");
			data.append("usr_dn", dn);
						
		form_post( app_api , data , usr_membership_build );
		
	}
	
//--------------------------------------
	
	function usr_membership_build(obj){
		
		//----------------------
			
			blocker_call();
			
			var af = simple_element_build( "DIV" , "action_form" );
				//af.id = "grp_change_form_"+obj.dn;
				
		//----------------------
		
			var	af_hl = document.createElement("DIV");
				af_hl.setAttribute("af_hl" , "1" );
				af_hl.innerHTML = "Add or remove group Memberships";
				
			af.appendChild(af_hl);
			
		//----------------------
			
			for( var prop in obj.grp_list ){
				
				var grp_frame = document.createElement("DIV");
					grp_frame.setAttribute("usr_frame" , "1" );
					
					var grp_chk = document.createElement("INPUT");
						grp_chk.type = "checkbox";
						grp_chk.id = "grp_chk_" + obj.grp_list[prop].dn;
						grp_chk.setAttribute("grp_dn" , obj.grp_list[prop].dn );
						grp_chk.setAttribute("usr_dn" , obj.dn );
						
						if( obj.membership_list.includes(obj.grp_list[prop].dn) ){
							grp_chk.checked = true;
						}
					//-------------
						grp_chk.onclick = function(){
							
							var usr_dn = this.getAttribute("usr_dn");
							var grp_dn = this.getAttribute("grp_dn");
							
							if( this.checked == true ){
								
								var api_func = "ldap_attr_add";
							}
							else{
								var api_func = "ldap_attr_remove";
							}
							
							var data = new FormData();
								data.append("function", api_func);
								data.append("attr", "member");
								data.append("entry", usr_dn);
								data.append("dn", grp_dn);
											
							form_post( app_api , data );
							
						}
					//-------------

					grp_frame.appendChild(grp_chk);
					
					var grp_label = document.createElement("LABEL");
						grp_label.setAttribute("for" , "grp_chk_" + obj.grp_list[prop].dn );
						grp_label.innerHTML = " " + obj.grp_list[prop].cn + ": " + obj.grp_list[prop].descshort;
						
					grp_frame.appendChild(grp_label);
					
				af.appendChild(grp_frame);
			}
			
		//----------------------
			
			var	af_btn = document.createElement("BUTTON");
				af_btn.innerHTML = "Ok";
				
				af_btn.onclick = function(){
					
					this.parentNode.parentNode.removeChild(this.parentNode);
					blocker_remove();
					view_call();
				}
				
			af.appendChild(af_btn);
		
		//----------------------
		
			document.body.appendChild(af);
			center_domel( af , "120px" );
		
		//----------------------
	
	}
	
//------------------------------------------------------------------------------
