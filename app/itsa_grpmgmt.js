


//------------------------------------------------------------------------------

	view_build["grpmgmt"] = function(){
		
		//----------------------------------------
			var headblock = headblock_build();
			document.body.appendChild(headblock);
		//----------------------------------------
			var mainres = document.getElementById("mainres");
				mainres.innerHTML = "";
		//----------------------------------------
			grpmgmt_blade_call( mainres );
		//----------------------------------------
	}
	
//------------------------------------------------------------------------------
	
	
	function grpmgmt_blade_call( target ){
		
		var data = new FormData();
			data.append("function", "ldap_srvgroups_call");
		
		form_post( app_api , data , grpmgmt_blade_build , target );
		
	}

//---------------------------------------------------
	
	function grpmgmt_blade_build( obj , target ){
		
		//----------------------------------------
			var opt_ary = [];
				opt_ary.ldap_icon 	 	= "Change icon";
				opt_ary.grp_url	 		= "Service URL";
				opt_ary.grp_members	 	= "Members";
				opt_ary.grp_status 		= "Status";
				opt_ary.ldap_delete	 	= "Delete";
		//----------------------------------------
		
		var view_blade = simple_element_build( "DIV" , "view_blade" );
				
			var view_blade_hl = document.createElement("DIV");
				view_blade_hl.setAttribute("hl" , "1");
				view_blade_hl.innerHTML = "Manage IT-Services and LDAP Groups";
					
			view_blade.appendChild(view_blade_hl);
			
		//----------------------------------------
			
			var chk_details = hash_handler['get']( "details" );
			
			for(var prop in obj ){
				
				var view_blade_bar = document.createElement("DIV");
					view_blade_bar.setAttribute("bar" , "1");
					view_blade_bar.id = "grp_blade_bar_"+obj[prop].dn;
					view_blade_bar.setAttribute("servicestatus" , obj[prop].servicestatus );
					view_blade_bar.setAttribute("serviceurl" , obj[prop].description );
					
				view_blade.appendChild(view_blade_bar);
			
				//---------------------
					
					var view_blade_icon_frame = document.createElement("DIV");
						view_blade_icon_frame.setAttribute("option_frame" , "1");
						view_blade_icon_frame.style.float = "left";
						
					view_blade_bar.appendChild(view_blade_icon_frame);
					
					
						var view_blade_icon = document.createElement("IMG");
							view_blade_icon.src = "icos/"+obj[prop].objecticon;
							view_blade_icon.setAttribute("icon" , "1");
							view_blade_icon.setAttribute("serviceurl" , obj[prop].description);
							view_blade_icon.onclick = function(){
								
								var serviceurl = this.getAttribute("serviceurl");
								window.open( serviceurl );
							}
						view_blade_icon_frame.appendChild(view_blade_icon);
				
				//---------------------

					
					var view_blade_txtbox = document.createElement("DIV");
						view_blade_txtbox.setAttribute("bar_txtbox" , "1");
						
					view_blade_bar.appendChild(view_blade_txtbox);
					
					
				//-----------------------
						
						input_ary = [];
						input_ary.dn 	= obj[prop].dn;
						input_ary.key 	= "descshort";
						input_ary.val 	= obj[prop].descshort;
						
						var view_blade_txtbox_hl = domel_ldap_change["input"](input_ary);
							view_blade_txtbox_hl.setAttribute("bar_txtbox_hl" , "1");
							
						view_blade_txtbox.appendChild(view_blade_txtbox_hl);
						
					//---------------
						
						input_ary = [];
						input_ary.dn 	= obj[prop].dn;
						input_ary.key 	= "desclong";
						input_ary.val 	= obj[prop].desclong;
						
						var view_blade_txtbox_txt = domel_ldap_change["textarea"](input_ary);
							view_blade_txtbox_txt.setAttribute("bar_txtbox_txt" , "1");
							
						view_blade_txtbox.appendChild(view_blade_txtbox_txt);
				
				
				//---------------------
					
					var view_blade_opt_frame = document.createElement("DIV");
						view_blade_opt_frame.setAttribute("option_frame" , "1");
						view_blade_opt_frame.style.float = "right";
						
					view_blade_bar.appendChild(view_blade_opt_frame);
					
						
						var view_blade_btn = opt_menue( obj[prop].dn , opt_ary );
							
							view_blade_btn.style.marginTop = "18px";
						view_blade_opt_frame.appendChild(view_blade_btn);
					
				//-----------------------
					
					if( chk_details == "true" ){
						
						var bar_detailbox = document.createElement("DIV");
								
							bar_detailbox.setAttribute("bar_detailbox" , "1");
							bar_detailbox.innerHTML = "Status: " + obj[prop].servicestatus;
								
						view_blade_bar.appendChild(bar_detailbox);
						
					//-------
						
						var bar_detailbox = document.createElement("DIV");
								
							bar_detailbox.setAttribute("bar_detailbox" , "1");
							bar_detailbox.innerHTML = "URL: " + obj[prop].description;
								
						view_blade_bar.appendChild(bar_detailbox);
					
					//-------
					
						var bar_detailbox = document.createElement("DIV");
								
							bar_detailbox.setAttribute("bar_detailbox" , "1");
							
							bar_detailbox.innerHTML = "Members: ";
							
						for( var prop2 in obj[prop].member ){
							
							var usr_id = obj[prop].member[prop2];
							var usr_id = usr_id.split(",");
							var usr_id = usr_id[0];
							
							var member_span = document.createElement("SPAN");
								member_span.innerHTML = usr_id;
								member_span.style.marginRight = "8px";
								
							bar_detailbox.appendChild(member_span);
						}
						
						view_blade_bar.appendChild(bar_detailbox);
					}
					
				//-----------------------
				
			}
			
		//----------------------------------------
		
			var view_blade_btn = document.createElement("BUTTON");
				view_blade_btn.setAttribute("btn" , "1");
				view_blade_btn.innerHTML = "add Group";
				view_blade_btn.onclick = function(){
					
					opt_menue_fw["grp_add"]();
				}
					
			view_blade.appendChild(view_blade_btn);
			
		//----------------------------------------
			
			var view_blade_btn = document.createElement("BUTTON");
				view_blade_btn.setAttribute("btn" , "1");
				view_blade_btn.innerHTML = "Details";
				view_blade_btn.onclick = function(){
					
					var chk_details = hash_handler['get']("details");
					
					if( chk_details == undefined ){
						location.href = "#"+hash_handler['set']("details" , "true");
					}
					else{
						location.href = "#"+hash_handler['remove']("details");
					}
					
					view_call();
				}
					
			view_blade.appendChild(view_blade_btn);
			
		//----------------------------------------
			
			
		target.appendChild( view_blade );
	}
	
//------------------------------------------------------------------------------
	

	opt_menue_fw["grp_add"] = function(){
		
		blocker_call();
		
		//----------------------
			
			var af = simple_element_build( "DIV" , "action_form" );
		
		//----------------------
		
			var	af_hl = document.createElement("DIV");
				af_hl.setAttribute("af_hl" , "1" );
				af_hl.innerHTML = "Add LDAP Group";
				
			af.appendChild(af_hl);
			
		//----------------------
			
			var	af_input = document.createElement("INPUT");
				af_input.type = "text";
				af_input.id = "grp_shortdesc_input";
				af_input.placeholder = "Please enter a short group description";
				//af_input.id   = "";
				
			af.appendChild(af_input);
			
		//----------------------
			
			var	af_btn = document.createElement("BUTTON");
				af_btn.innerHTML = "Ok";
				
				af_btn.onclick = function(){
					
					var grp_shortdesc_input = document.getElementById("grp_shortdesc_input");
					var grp_descShort		= grp_shortdesc_input.value;
					
					if( grp_descShort == "" ){
					
						alert("please enter a short description.");
						return null;
					}
										
					var data = new FormData();
						data.append("function", "ldap_grp_add");
						data.append("grp_descShort", grp_descShort);
						
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
		center_domel( af , "200px" );
	}
	
//------------------------------------------------------------------------------
	
	
	opt_menue_fw["grp_members"] = function( dn ){
		
		var data = new FormData();
			data.append("function", "ldap_grp_members_call");
			data.append("grp_dn", dn);
						
		form_post( app_api , data , grp_members_build );
		
	}
	
//--------------------------------------
	
	function grp_members_build(obj){
		
		//----------------------
			
			blocker_call();
			
			var af = simple_element_build( "DIV" , "action_form" );
				af.id = "grp_change_form_"+obj.dn;
				
		//----------------------
		
			var	af_hl = document.createElement("DIV");
				af_hl.setAttribute("af_hl" , "1" );
				af_hl.innerHTML = "Add or remove group Members";
				
			af.appendChild(af_hl);
			
		//----------------------
			
			for( var prop in obj.user_list ){
				
				var usr_frame = document.createElement("DIV");
					usr_frame.setAttribute("usr_frame" , "1" );
					
					var usr_chk = document.createElement("INPUT");
						usr_chk.type = "checkbox";
						usr_chk.id = "usr_chk_" + obj.user_list[prop].dn;
						usr_chk.setAttribute("usr_dn" , obj.user_list[prop].dn );
						usr_chk.setAttribute("grp_dn" , obj.dn );
						
						if( obj.member_list.includes(obj.user_list[prop].dn) ){
							usr_chk.checked = true;
						}
						
					//-------------
						usr_chk.onclick = function(){
							
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

					usr_frame.appendChild(usr_chk);
					
					var usr_label = document.createElement("LABEL");
						usr_label.setAttribute("for" , "usr_chk_" + obj.user_list[prop].dn );
						usr_label.innerHTML = " " + obj.user_list[prop].uid + ": " + obj.user_list[prop].givenname + " " + obj.user_list[prop].sn;
						
					usr_frame.appendChild(usr_label);
					
				af.appendChild(usr_frame);
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
		
	
	opt_menue_fw["grp_status"] = function( dn ){ 
		
		blocker_call();
			
		//----------------------
			
			var af = simple_element_build( "DIV" , "action_form" );
		
		//----------------------
		
			var	af_hl = document.createElement("DIV");
				af_hl.setAttribute("af_hl" , "1" );
				af_hl.innerHTML = "Change Group Status";
				
			af.appendChild(af_hl);
			
		//----------------------
			
			var status_ary = [];
				status_ary.active    	= "active";
				status_ary.inactive 	= "inactive";
				status_ary.deprecated 	= "deprecated";
			
			var	af_select = document.createElement("SELECT");
				af_select.type = "dropdown";
				af_select.id = "grp_status_dd";
				
			for(var prop in status_ary ){
				
				var	af_select_opt = document.createElement("OPTION");
					af_select_opt.value = prop;
					af_select_opt.innerHTML = status_ary[prop];
				
				af_select.appendChild(af_select_opt);
			}
				
			af.appendChild(af_select);
			
		//----------------------
			
			var servicestatus_domel = document.getElementById("grp_blade_bar_" + dn);
			var servicestatus = servicestatus_domel.getAttribute("servicestatus");
			
			af_select.value = servicestatus;
		
		//----------------------
			
			var	af_btn = document.createElement("BUTTON");
				af_btn.innerHTML = "Ok";
				af_btn.setAttribute("dn" , dn );
				af_btn.onclick = function(){
					
					var grp_status = document.getElementById("grp_status_dd").value;
					var dn = this.getAttribute("dn");
					
					var data = new FormData();
						data.append("function", "ldap_entry_change");
						data.append("dn", dn );
						data.append("key", "servicestatus" );
						data.append("val", grp_status );
					
					form_post( app_api , data , view_call );
				
					this.parentNode.parentNode.removeChild(this.parentNode);
					blocker_remove();
				
				}
				
			af.appendChild(af_btn);
		
		//----------------------
		
		document.body.appendChild(af);
		center_domel( af , "200px" );
	}
	
//------------------------------------------------------------------------------
	
	opt_menue_fw["grp_url"] = function( dn ){ 
		
		blocker_call();
			
		//----------------------
			
			var af = simple_element_build( "DIV" , "action_form" );
		
		//----------------------
		
			var	af_hl = document.createElement("DIV");
				af_hl.setAttribute("af_hl" , "1" );
				af_hl.innerHTML = "Change Service URL";
				
			af.appendChild(af_hl);
			
		//----------------------
			
			var serviceurl_domel = document.getElementById("grp_blade_bar_" + dn);
			var serviceurl = serviceurl_domel.getAttribute("serviceurl");
			
			var	af_input = document.createElement("INPUT");
				af_input.type = "text";
				af_input.id = "grp_url_input";
				af_input.value = serviceurl;
				
			af.appendChild(af_input);
			
		//----------------------
			
			var	af_btn = document.createElement("BUTTON");
				af_btn.innerHTML = "Ok";
				af_btn.setAttribute("dn" , dn );
				af_btn.onclick = function(){
					
					var grp_url = document.getElementById("grp_url_input").value;
					var dn = this.getAttribute("dn");
					
					var data = new FormData();
						data.append("function", "ldap_entry_change");
						data.append("dn", dn );
						data.append("key", "description" );
						data.append("val", grp_url );
					
					form_post( app_api , data , view_call );
				
					this.parentNode.parentNode.removeChild(this.parentNode);
					blocker_remove();
				
				}
				
			af.appendChild(af_btn);
		
		//----------------------
		
		document.body.appendChild(af);
		center_domel( af , "200px" );
	}
	
//------------------------------------------------------------------------------