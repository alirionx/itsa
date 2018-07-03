

//------------------------------------------------------------------------------

	function headblock_build(){
		
		var headblock_frame = document.createElement("DIV");
			headblock_frame.classList.add("headblock");
			
		//--------------------
		
			var headblock_img = document.createElement("DIV");
				headblock_img.classList.add("headblock_img");
				headblock_img.onclick = function(){
					location.href = "";
					location.reload();
				}
				
				//var headblock_gfx = document.createElement("IMG");
				
			headblock_frame.appendChild(headblock_img);
			
		//--------------------
		
			var headblock_hl = document.createElement("DIV");
				headblock_hl.classList.add("headblock_hl");
				headblock_hl.innerHTML = "IT Service Assignment";
		
			headblock_frame.appendChild(headblock_hl);
		
		//--------------------
		
			var headblock_burger = document.createElement("DIV");
				headblock_burger.classList.add("headblock_burger");
				headblock_burger.onclick = function(){ 
					
					class_change( this , "headblock_burger" , "headblock_burger_active" ) 
					burger_menue_call();
				};
				
				var i;
				for (i = 0; i < 3; i++) { 
					
					var burger_bar = document.createElement("DIV");
					headblock_burger.appendChild(burger_bar);
				}
				
			headblock_frame.appendChild(headblock_burger);
		
		//--------------------
		
		
		return headblock_frame;
	}
	
//------------------------------------------------------------------------------
	
	function burger_menue_call(){
		
		var url = "config/menue.json";

		get_file_content( url , burger_menue_build );
		
	}

//------------------------------------------------------------------------------
	
	function burger_menue_build( menue_json ){
		
		//----------------------------------
		
			if( IsJsonString( menue_json ) ){	
				var menue_obj = JSON.parse(menue_json);
			}
			else{
				console.log("JSON File corrupt or not readable");
				return false;
			}
		
		//----------------------------------
		
			if( document.getElementById("burger_blade" ) == undefined ){
			
				var burger_blade = simple_element_build( "DIV" , "burger_blade" );
					burger_blade.style.display = "none";
					burger_blade.id = "burger_blade";
					
			//----------------------
				
				var burger_hl = document.createElement( "DIV" );
					burger_hl.innerHTML = "Menue";
					burger_hl.setAttribute("hl" , "1");

				burger_blade.appendChild(burger_hl);
			
			//----------------------
				
				for(var prop in menue_obj ){
					
					var menue_bar = menue_bar_build(menue_obj[prop]);
					
					burger_blade.appendChild(menue_bar);
				}
			
			//----------------------
				
				document.body.appendChild(burger_blade);
				$(burger_blade).show("slide", { direction: "right" }, 400);
				
				setTimeout( function(){ 
					$(burger_blade).draggable();
				} ,500 );
			}
			
			else{
				burger_menue_hide();
			}
	}
	
	//----------------------------------
		
	function burger_menue_hide(){
		
		if( document.getElementById("burger_blade" ) != undefined ){
			
			var burger_blade = document.getElementById("burger_blade");
					
			setTimeout( function(){ 
				burger_blade.parentNode.removeChild( burger_blade ); 
			} ,400 );
					
			$(burger_blade).hide("slide", { direction: "right" }, 400);
		}
	}

//------------------------------------------------------------------------------






	
	