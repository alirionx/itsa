

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






