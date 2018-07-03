



//---Mod Hashhandler ---------------------------------
	
	var hash_handler = [];
	
	//-----------------------------
	
	hash_handler['get'] = function ( hash_key ){

		var hash = window.location.hash.substr(1);
		
		//console.log( hash );
		
		var hash_ary = hash.split('/');
		
				
		var hash_sry_assoc = [];
			
		x = hash_ary.length;

		for( i=0; i < x ; i++ ){
			
			var n = hash_ary[i].indexOf( "=" );
			
			hash_sry_assoc[ hash_ary[i].substring( 0, n) ] = hash_ary[i].substring( n+1 ) ;			
		}		
			
		//console.log( hash_sry_assoc );
		
		var hash_result = hash_sry_assoc[ hash_key ];
		console.log( hash_result );
		
		return hash_result;	
	}


	//------------------------------
	
	
	hash_handler['set'] = function ( hash_key , hash_val ){
		
		if( window.location.hash == "" ){
			var hash_result = hash_key + "=" + hash_val;
		}
		else{
			
		
			if( hash_handler['get']( hash_key ) == undefined ){
				
				var hash = window.location.hash.substr(1) + "/" + hash_key + "=";
				
			}
			else{
				var hash = window.location.hash.substr(1);
			}
			
			//console.log( hash );
			
			var hash_ary = hash.split('/');
			
					
			var hash_sry_assoc = [];
				
			x = hash_ary.length;

			for( i=0; i < x ; i++ ){
				
				var n = hash_ary[i].indexOf( "=" );
				
								
				if( hash_ary[i].substring( 0, n) == hash_key ){
					
					hash_sry_assoc[ hash_ary[i].substring( 0, n) ] =  hash_val ;			
				}
				else{
					hash_sry_assoc[ hash_ary[i].substring( 0, n) ] = hash_ary[i].substring( n+1 ) ;	
				}
			}		
				
			console.log( hash_sry_assoc );
			
			var hash_result = '';
			
			i = 1;
			for ( var prop in hash_sry_assoc ) {
				
				hash_result = hash_result + prop + '=' + hash_sry_assoc[prop] ;
				
				if( i < x ){
					hash_result = hash_result + '/'
				}
				
				i++
			}
			
		}
		
		console.log( hash_result );
		return hash_result;	
	}


	//------------------------------
	
	
	hash_handler['remove'] = function ( hash_key ){

		var hash = window.location.hash.substr(1);
		
		//console.log( hash );
		
		var hash_ary = hash.split('/');
		
				
		var hash_sry_assoc = [];
			
		x = hash_ary.length;
		y = hash_ary.length;
		
		for( i = 0; i < x ; i++ ){
			
			var n = hash_ary[i].indexOf( "=" );
			
							
			if( hash_ary[i].substring( 0, n) == hash_key ){
				y --;
			}
			else{
				hash_sry_assoc[ hash_ary[i].substring( 0, n) ] = hash_ary[i].substring( n+1 ) ;	
			}
		}		
			
		console.log( hash_sry_assoc );
		
		var hash_result = '';
		
		i = 1;
		for ( var prop in hash_sry_assoc ) {
			
			hash_result = hash_result + prop + '=' + hash_sry_assoc[prop] ;
			
			if( i < y ){
				hash_result = hash_result + '/'
			}
			
			i++
		}
		
		console.log( hash_result );
		return hash_result;	
	}
	
	
	