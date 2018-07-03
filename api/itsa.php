<?php

//---MySQL Connect-----------------------------------------------
	
	$conf_file = file_get_contents("../config/database.json");
	$conf_obj  = json_decode($conf_file, true);
		
	$my_con = mysqli_connect(
		$conf_obj["host"] , 
		$conf_obj["user"] , 
		$conf_obj["password"] , 
		$conf_obj["schema"]
	);

//--MySQL Connection Test----------------------------------------

	function my_con_test(){
		
		$my_con = $GLOBALS['my_con'];
		
		$sql_qry = mysqli_query( $my_con, " SHOW TABLES " )or die("Error in Script Line ". __LINE__ .": ".mysqli_error($my_con) ) ;
		while( $sql_row = mysqli_fetch_array($sql_qry) ){
			
			echo $sql_row[0] . '<br>';
			//print_r($sql_row);
		}
	}

//---------------------------------------------------------------


//--------Function Caller------------------------------------------------------
		
	if( isset( $_POST["function"] ) ) {
		
		$_POST["function"]( $_POST );	
	}	
	
	if( isset( $_GET["function"] ) ) {
		
		$_GET["function"]( $_GET );	
	}	
	
//-----------------------------------------------------------------------------

















?>