//---Loader Snapin-------------------------------------

function loader_call(){
		
	var loader_frame = document.createElement("DIV");
		loader_frame.classList.add("loader_frame");
		loader_frame.id = "loader_frame";
			
		var loader = document.createElement("DIV");
			loader.classList.add("loader");
			
			loader_frame.appendChild( loader );
			
	document.body.appendChild( loader_frame );
	
		var page_width 		= document.body.offsetWidth;
		var page_height 	= document.body.offsetHeight + 240;
		
		var loader_width 	= loader_frame.offsetWidth;
		var loader_height 	= loader_frame.offsetHeight;
		
		var target_left 	=  ( ( page_width - loader_width ) / 2 ) / page_width  * 100 ;
		var target_top		=  ( ( page_height - loader_height ) / 2 ) / page_width  * 100 ;
		
		loader_frame.style.left = target_left+"%";
		loader_frame.style.top 	= target_top+"%";
	
}
	
function loader_remove(){
		
	if( loader_frame = document.getElementById( "loader_frame" ) != undefined ){
		
		var loader_frame = document.getElementById( "loader_frame" ); 
			loader_frame.parentNode.removeChild( loader_frame );
	}
}
	
//-----------------------------------------------------