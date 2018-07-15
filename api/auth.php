<?php

//-----------Work with Sessions---------------------------
	if (session_status() == PHP_SESSION_NONE) {
		
		ini_set('session.gc_maxlifetime', 180);
		session_start();
	}
//--------------------------------------------------------



//--------The Auth Ting--------------------------------------------------------
	
	function auth_check(){
		
		if( isset( $_SESSION['uid'] )){
			
			echo $_SESSION['uid'];
		}
		else{
			
			exit( header("HTTP/1.1 401 Unauthorized") ); 
		}
	}
	
//--------------------------------------
	
	function auth_do( $POST ){
		
		//---------------------
			
			$uid = $POST['uid'];
			$pwd = $POST['pwd'];
		
		//---------------------
		
			$conf_file = file_get_contents("../config/ldap.json");
			$conf_obj  = json_decode($conf_file, true);
					
			$ldap_host 		= $conf_obj["host"];
			$ldap_port 		= $conf_obj["port"];
			
			$ldap_base_dn 	= $conf_obj["base_dn"];
					
		//---------------------
		
			$ldap_user 		= 'uid=' . $uid . ',ou=people,' . $ldap_base_dn ;
			$ldap_password 	= $pwd;
			
			$ldap_con = ldap_connect( $ldap_host , $ldap_port );

			ldap_set_option($ldap_con, LDAP_OPT_PROTOCOL_VERSION, 3) or die("Error in Script Line ". __LINE__ .": ".ldap_error($ldap_con) ) ;
			ldap_set_option($ldap_con, LDAP_OPT_REFERRALS, 0); 

			if (TRUE === ldap_bind($ldap_con, $ldap_user, $ldap_password)){
				
				$_SESSION['uid'] = $uid; 
				
				$search_filter = '(&(objectClass=inetOrgPerson)(memberOf=cn=admins,'.$ldap_base_dn.')(uid='.$uid.'))';
				$justthese = array( "uid" );
				
				$result  = ldap_search($ldap_con, $ldap_base_dn, $search_filter , $justthese);				
				$entries = ldap_get_entries($ldap_con, $result);
				
				//echo'<pre>';
				//print_r($entries);
				
				if( $entries['count'] > 0 ){
					
					//echo 'is admin!';
					$_SESSION['adm'] = true;
				}
			}
			else{
				exit( header("HTTP/1.1 401 Unauthorized") ); 
			}
	}
	
//--------------------------------------

	function auth_kill( $POST ){
		
		session_destroy();
	}

//-----------------------------------------------------------------------------




//--------Function Caller------------------------------------------------------
		
	if( isset( $_POST["function"] ) ) {
		
		$_POST["function"]( $_POST );	
	}	
	
	if( isset( $_GET["function"] ) ) {
		
		$_GET["function"]( $_GET );	
	}	
	
//-----------------------------------------------------------------------------











?>