//------------------------------------------------------------------------------

	view_build["services"] = function(){
		
		//----------------------------------------
			var headblock = headblock_build();
			document.body.appendChild(headblock);
		//----------------------------------------
			var mainres = document.getElementById("mainres");
				mainres.innerHTML = "";
		//----------------------------------------
			services_call( mainres );
		//----------------------------------------
		
	}
		
//------------------------------------------------------------------------------
	
	
	function services_call( target ){
		
		var data = new FormData();
			data.append("function", "services_call");
										
		form_post( app_api , data , services_build , target );
	}
	
	function services_build( obj , target ){
			
		var srv_frame = document.createElement("DIV");
			srv_frame.classList.add("services_frame");
		
		target.appendChild(srv_frame);
		
		for( var prop in obj ){
			
			var srv_block = document.createElement("DIV");
				srv_block.classList.add("services_block");
				
				var srv_icon = document.createElement("IMG");
					srv_icon.src = "icos/"+obj[prop].objecticon;
					srv_icon.setAttribute("serviceurl" , obj[prop].description);
					srv_icon.onclick = function(){
								
						var serviceurl = this.getAttribute("serviceurl");
						window.open( serviceurl );
					}
					
				srv_block.appendChild(srv_icon);
				
				
				var srv_label = document.createElement("DIV");
					srv_label.setAttribute("descshort" , "1" );
					srv_label.innerHTML = obj[prop].descshort;
					
				srv_block.appendChild(srv_label);
					
					
			srv_frame.appendChild(srv_block);
		}
		
	}
	
//------------------------------------------------------------------------------
	
	
	
	
	
	
	
	