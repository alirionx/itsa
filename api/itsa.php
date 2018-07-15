<?php

//-----------Work with Sessions---------------------------
	if (session_status() == PHP_SESSION_NONE) {
		
		ini_set('session.gc_maxlifetime', 180);
		session_start();
	}
//--------------------------------------------------------


//---Maintenance Mode-------------------------------------
	
	//$_SESSION['uid'] = 'dquilitzsch';
	//$_SESSION['adm'] = true;

//--------------------------------------------------------


//---Usefull Functions-------------------------------------------
	
	function recursive_unset(&$array, $unwanted_key) {
		unset($array[$unwanted_key]);
		foreach ($array as &$value) {
			if (is_array($value)) {
				recursive_unset($value, $unwanted_key);
			}
		}
	}
	
//---------------------------------------------------------------

//---MySQL Connect-----------------------------------------------
	
/*
	$conf_file = file_get_contents("../config/database.json");
	$conf_obj  = json_decode($conf_file, true);
		
	$my_con = mysqli_connect(
		$conf_obj["host"] , 
		$conf_obj["user"] , 
		$conf_obj["password"] , 
		$conf_obj["schema"]
	);
*/

//--MySQL Connection Test---------------------------

	function my_con_test(){
		
		$my_con = $GLOBALS['my_con'];
		
		$sql_qry = mysqli_query( $my_con, " SHOW TABLES " )or die("Error in Script Line ". __LINE__ .": ".mysqli_error($my_con) ) ;
		while( $sql_row = mysqli_fetch_array($sql_qry) ){
			
			echo $sql_row[0] . '<br>';
			//print_r($sql_row);
		}
	}

//-----------------------------------------------------------------------------



//--------Establish LDAP Connection--------------------------------------------

	$conf_file = file_get_contents("../config/ldap.json");
	$conf_obj  = json_decode($conf_file, true);
			
	$ldap_host 		= $conf_obj["host"];
	$ldap_port 		= $conf_obj["port"];
	$ldap_user 		= $conf_obj["user"];
	$ldap_password 	= $conf_obj["password"];
	$ldap_base_dn 	= $conf_obj["base_dn"];
	
//-------------------------
	
	function ldap_con_do( ){
		
		$ldap_host 		= $GLOBALS['ldap_host'];
		$ldap_port 		= $GLOBALS['ldap_port'];
		$ldap_user 		= $GLOBALS['ldap_user'];
		$ldap_password 	= $GLOBALS['ldap_password'];
		$ldap_base_dn 	= $GLOBALS['ldap_base_dn'];
		
		$ldap_con = ldap_connect( $ldap_host , $ldap_port );

		ldap_set_option($ldap_con, LDAP_OPT_PROTOCOL_VERSION, 3) or die("Error in Script Line ". __LINE__ .": ".ldap_error($ldap_con) ) ;
		ldap_set_option($ldap_con, LDAP_OPT_REFERRALS, 0); 

		if (TRUE === ldap_bind($ldap_con, $ldap_user, $ldap_password)){
			return $ldap_con;
		}
		else{
			return FALSE;
		}
	}
	
//-------------------------		
	
	function ldap_con_chk( $usr , $pwd ){
		
		$ldap_host 		= $GLOBALS['ldap_host'];
		$ldap_port 		= $GLOBALS['ldap_port'];
		$ldap_base_dn 	= $GLOBALS['ldap_base_dn'];
		
		$ldap_user 		= 'uid=' . $usr . ',ou=people,' . $ldap_base_dn ;
		$ldap_password 	= $pwd;
		
		$ldap_con = ldap_connect( $ldap_host , $ldap_port );

		ldap_set_option($ldap_con, LDAP_OPT_PROTOCOL_VERSION, 3) or die("Error in Script Line ". __LINE__ .": ".ldap_error($ldap_con) ) ;
		ldap_set_option($ldap_con, LDAP_OPT_REFERRALS, 0); 

		if (TRUE === ldap_bind($ldap_con, $ldap_user, $ldap_password)){
			return $ldap_con;
		}
		else{
			return FALSE;
		}
	}

	
//--LDAP Connection Test---------------------------

	function ldap_con_test(){
		
		$ldap_base_dn 	= $GLOBALS['ldap_base_dn'];
		
		$ldap_con = ldap_con_do();
		
		$search_filter = '(&(objectClass=inetOrgPerson)(uid=*))';
		$justthese = array( "uid", "cn", "sn", "givenname", "memberOf");
		
		$result  = ldap_search($ldap_con, $ldap_base_dn, $search_filter , $justthese);				
		$entries = ldap_get_entries($ldap_con, $result);
		
		echo '<pre>';
			print_r($entries);
		echo '</pre>';
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



//--------Call LDAP Users and Attributes---------------------------------------
	
	function ldap_users_call( $POST ){
		
		$obj_in['def'] = array();
	
	//----------------------------
	
		$obj_in['def']['uid']['hl'] 	 		= 'User ID';
		$obj_in['def']['uid']['align'] 			= 'left';
		$obj_in['def']['uid']['width'] 			= '';
		$obj_in['def']['uid']['plh'] 			= '';
		
		$obj_in['def']['givenname']['hl'] 	 	= 'Givenname';
		$obj_in['def']['givenname']['align'] 	= 'left';
		$obj_in['def']['givenname']['width'] 	= '';
		$obj_in['def']['givenname']['plh'] 		= '';
		
		$obj_in['def']['sn']['hl'] 	 			= 'Surname';
		$obj_in['def']['sn']['align'] 			= 'left';
		$obj_in['def']['sn']['width'] 			= '';
		$obj_in['def']['sn']['plh'] 			= '';
		
		$obj_in['def']['mail']['hl'] 	 		= 'Email';
		$obj_in['def']['mail']['align'] 		= 'left';
		$obj_in['def']['mail']['width'] 		= '';
		$obj_in['def']['mail']['plh'] 			= '';
	
	//----------------------------
	
		$ldap_base_dn = "OU=People," . $GLOBALS['ldap_base_dn'];
			
		$ldap_con = ldap_con_do();
			
		$search_filter = '(&(objectClass=inetOrgPerson)(uid=*))';
		$justthese = array( "uid" , "cn", "description", "givenName", "sn" , "mail" , "dn", "memberof" );
			
		$result  = ldap_search($ldap_con, $ldap_base_dn, $search_filter , $justthese);				
		$entries = ldap_get_entries($ldap_con, $result);
		
		$obj_in['content']  = $entries;
		
		//---------------------
		
			recursive_unset($obj_in['content'], 'count');
			
			$i = 0;
			
			foreach( $obj_in['content'] as $is_entry ){
				
				if( file_exists("../icos/".$is_entry["cn"][0].".png") ){	
					$obj_in['content'][$i]['objecticon'] = $is_entry["cn"][0].".png";
				}
				else if( file_exists("../icos/".$is_entry["cn"][0].".jpg") ){	
					$obj_in['content'][$i]['objecticon'] = $is_entry["cn"][0].".jpg";
				}
				else{
					$obj_in['content'][$i]['objecticon'] = "usr_plh.png";
				}
				
				$i ++;
			}
		
		//---------------------

			if( isset( $POST['output'] ) && $POST['output'] == 'return_obj' ){
				return $obj_in;
			}
			else{
				if( isset( $POST['output'] ) && $POST['output'] == 'print' ){
					echo '<pre>';
				}
				$json_out = json_encode( $obj_in, JSON_PRETTY_PRINT);
				print_r( $json_out );
			}
		
		//---------------------
	}
	
//-----------------------------------------------------------------------------





//--------Call LDAP Groups and Attributes--------------------------------------
	
	function ldap_srvgroups_call( $POST ){
	
		$ldap_base_dn = "OU=groups," . $GLOBALS['ldap_base_dn'];
			
		$ldap_con = ldap_con_do();
			
		$search_filter = '(&(objectClass=groupOfNames)(cn=*))';
		$justthese = array( "cn", "businessCategory", "description", "descShort", "descLong", "serviceCosts" , "member" , "servicestatus");
			
		$result  = ldap_search($ldap_con, $ldap_base_dn, $search_filter , $justthese);				
		$entries = ldap_get_entries($ldap_con, $result);
		
		//---------------------
		
			recursive_unset($entries, 'count');
			
			$i = 0;
			$admin_dn = 'cn=admin,'.$GLOBALS['ldap_base_dn'];
			//$admin_dn = 'cn=admin,dc=app-scape,dc=lab';
			
			foreach( $entries as $is_entry ){
				
				if (($key = array_search( $admin_dn , $entries[$i]['member'])) !== false) {
					unset($entries[$i]['member'][$key]);
				}
				
				if( file_exists("../icos/".$is_entry["cn"][0].".png") ){	
					$entries[$i]['objecticon'] = $is_entry["cn"][0].".png";
				}
				else if( file_exists("../icos/".$is_entry["cn"][0].".jpg") ){	
					$entries[$i]['objecticon'] = $is_entry["cn"][0].".jpg";
				}
				else{
					$entries[$i]['objecticon'] = "grp_plh.png";
				}
				
				$i ++;
			}
		
		//---------------------
			
			if( isset( $POST['output'] ) && $POST['output'] == 'return_obj' ){
				return $entries;
			}
			else{
				if( isset( $POST['output'] ) && $POST['output'] == 'print' ){
					echo '<pre>';
				}
				$json_out = json_encode( $entries, JSON_PRETTY_PRINT);
				print_r( $json_out );
			}
		
		//---------------------
	}
	
//-----------------------------------------------------------------------------


/*
//--------Call LDAP Group------------------------------------------------------
	
	function ldap_srvgroup_call( $POST ){
	
		//---------------------
			
			$obj_in["identifier"]["dn"] = $POST['ldap_grp_dn'];
		
		//---------------------
		
			$obj_in["func_from"] = $POST['function'];
			$obj_in["func_edit"]  = 'ldap_entry_change';
			
		//---------------------
			
			$def["cn"]["hl"] 					= "Common Name";
			$def["cn"]["type"] 					= "input";
			$def["cn"]["placeholder"] 			= "don't use special characters";
			
			//$def["serviceicon"]["hl"] 			= "Icon File";
			//$def["serviceicon"]["type"] 		= "file";
			//$def["serviceicon"]["placeholder"] 	= "PNG or JPG";
			
			$def["descshort"]["hl"] 			= "Short service description";
			$def["descshort"]["type"] 			= "input";
			$def["descshort"]["placeholder"] 	= "";
			
			$def["desclong"]["hl"] 				= "Long service description";
			$def["desclong"]["type"] 			= "textarea";
			$def["desclong"]["placeholder"] 	= "";
			
			$obj_in["def"] = $def;
			
		//---------------------
		
			$ldap_base_dn = "OU=groups," . $GLOBALS['ldap_base_dn'];
			$ldap_grp_dn  = $POST['ldap_grp_dn'];
				
			$ldap_con = ldap_con_do();
				
			$search_filter = '(cn=*)';
			$justthese = array( "cn", "businessCategory", "descShort", "descLong", "serviceCosts" , "member");
				
			$result  = ldap_search($ldap_con, $ldap_grp_dn, $search_filter , $justthese);				
			$entries = ldap_get_entries($ldap_con, $result);
			
			//unset ($entries["count"]);
			
		//---------------------
		
			recursive_unset($entries, 'count');
			$obj_in["content"] = $entries[0];
			
		//---------------------
		
			$obj_in["title"] 	= 'Edit Group: ' . $entries[0]["cn"][0];
		
		//---------------------
			
			if( isset( $POST['output'] ) && $POST['output'] == 'print' ){
				echo '<pre>';
			}

			$json_out = json_encode( $obj_in, JSON_PRETTY_PRINT);
			print_r( $json_out );
		
		//---------------------
	}
	
//-----------------------------------------------------------------------------
*/


//--------LDAP Entry Change----------------------------------------------------
	
	function ldap_entry_change( $POST ){
		
		//---------------------
			
			if( isset($POST['mode']) && $POST['mode'] == 'quiet' ){
				
			}
			else{
				print_r( $POST);
			}
		
		//---------------------
			
			$dn  = $POST['dn'];
			$key = $POST['key'];
			$val = $POST['val'];
		
			$ary_in[$key] = $val;
			
		//---------------------
			
			$ldap_con = ldap_con_do();
			
			ldap_modify($ldap_con, $dn, $ary_in); 
			
			ldap_close($ldap_con);
			
		//---------------------
	}

//-----------------------------------------------------------------------------


//--------LDAP Entry Delete----------------------------------------------------
	
	function ldap_entry_delete( $POST ){
		
		print_r( $POST);
		
		//---------------------
			$dn  = $POST['dn'];
		//---------------------
			
			$ldap_con = ldap_con_do();
			
			ldap_delete($ldap_con, $dn ); 
			
			ldap_close($ldap_con);
			
		//---------------------
	}

//-----------------------------------------------------------------------------



//--------LDAP Attribute add / remove------------------------------------------
	
	function ldap_attr_add( $POST ){
		
		print_r( $POST);
		
		//---------------------
		
			$dn  	= $POST['dn'];
			$entry  = $POST['entry'];
			$attr 	= $POST['attr'];
			
			$entry_ary[$attr] = $entry;
			
		//---------------------
			
			$ldap_con = ldap_con_do();
			
			ldap_mod_add($ldap_con, $dn, $entry_ary ); 
			
			ldap_close($ldap_con);
			
		//---------------------
	}
	
	
	function ldap_attr_remove( $POST ){
		
		print_r( $POST);
		
		//---------------------
		
			$dn  	= $POST['dn'];
			$entry  = $POST['entry'];
			$attr 	= $POST['attr'];
			
			$entry_ary[$attr] = $entry;
			
		//---------------------
			
			$ldap_con = ldap_con_do();
			
			ldap_mod_del($ldap_con, $dn, $entry_ary ); 
			
			ldap_close($ldap_con);
			
		//---------------------
	}

//-----------------------------------------------------------------------------




//--------LDAP Change Icon-----------------------------------------------------
	
	function ldap_icon_change( $POST ){
		
		print_r( $POST);
		
		//---------------------
			
			$dn  = $POST['dn'];
			
			$dn_id = explode(",",$dn);
			$dn_id = $dn_id[0];
			$dn_id = explode("=",$dn_id);
			$dn_id = $dn_id[1];
			
			echo $dn_id;
		
		//---------------------
			
			$mime_ary = array( "image/jpeg" => "jpg" , "image/png" => "png" );
			$mimetype = mime_content_type($_FILES['ico_file']['tmp_name']);
			
			$uploaddir = '../icos/';
			//$uploadfile = $uploaddir . basename($_FILES['ico_file']['name']);
			
			unlink( $uploaddir . $dn_id . '.png' );
			unlink( $uploaddir . $dn_id . '.jpg' );
			
			$uploadfile = $uploaddir . $dn_id . '.' . $mime_ary[$mimetype];
			
			if( move_uploaded_file($_FILES['ico_file']['tmp_name'], $uploadfile) ) {
				echo "File is ok, upload successfull.";
			} 
			else{
				echo "something went wrong";
			}
			
		//---------------------
	}

//-----------------------------------------------------------------------------


//--------LDAP Group Add-------------------------------------------------------
	
	function ldap_grp_add( $POST ){
		
		//print_r( $POST);
		
		//---------------------
		
			$ldap_base_dn 	= $GLOBALS['ldap_base_dn'];
			
			$descShort = $POST['grp_descShort'];
		
		//---------------------
			
			$REST['output'] = 'return_obj';
			$obj_in = ldap_srvgroups_call( $REST );
			
			$grp_cn_ary = array();
			
			foreach( $obj_in as $is_grp ){
				
				array_push( $grp_cn_ary , $is_grp['cn'][0] );
			}
			
			$chk = 0; 
			$i	 = 1;
			
			while($chk < 1) {
				
				$is_cn = "itsa" . $i;
				
				if( !in_array( $is_cn , $grp_cn_ary)) {
					
					$grp_cn = $is_cn;
					$chk = 1;
				}
				$i++;
			} 
			
		//---------------------
		
			$grp_dn = "ou=groups," . $ldap_base_dn;
			
			$attr_ary = array();
			$attr_ary["objectclass"]   = "itsa";
			$attr_ary['cn'] 		   = $grp_cn;
			$attr_ary['descShort']     = $descShort;  
			$attr_ary['descLong']      = " ";  
			$attr_ary['member']   	   = "cn=admin,dc=app-scape,dc=lab";  
			$attr_ary['description']   = "http://";  
			$attr_ary['servicestatus'] = "inactive";  
			
			$new_dn = "cn=" . $attr_ary['cn'] . "," . $grp_dn;
			
		//---------------------
		
			$ldap_con = ldap_con_do();
			
			ldap_add($ldap_con, $new_dn, $attr_ary); 
			
			ldap_close($ldap_con);
			
		//---------------------
	}

//-----------------------------------------------------------------------------


//--------LDAP Call Group Members----------------------------------------------

	function ldap_grp_members_call($POST){
		
		//---------------------
			
			$ldap_base_dn = $GLOBALS['ldap_base_dn'];
			$grp_dn = $POST['grp_dn'];
			
			$obj_out = array();
			$obj_out['dn'] = $grp_dn;
			$obj_out['function'] = $POST['function'];
			
		//---------------------
			
			$user_list = array();
			
			$REST['output'] = 'return_obj';
			$obj_in = ldap_users_call( $REST );
			
			$attr_ary = array( "uid" , "description" , "givenname" , "sn" , "mail" );
			
			foreach( $obj_in['content'] as $is_user ){
				
				foreach( $attr_ary as $is_attr ){
					
					if( isset( $is_user[$is_attr][0] ) ){
						
						$user_list[ $is_user['uid'][0] ] [$is_attr] = $is_user[$is_attr][0];
					}
				}
			
				$user_list[ $is_user['uid'][0] ] ["dn"] = $is_user["dn"];
			}
				
			$obj_out['user_list'] = $user_list;
			
		//---------------------
			
			$member_list = array();
			
			//$ldap_base_dn = "OU=groups," . $GLOBALS['ldap_base_dn'];
			
			$ldap_con = ldap_con_do();
				
			$search_filter = '(cn=*)';
			$justthese = array( "member");
				
			$result  = ldap_search($ldap_con, $grp_dn, $search_filter , $justthese);				
			$entries = ldap_get_entries($ldap_con, $result);
			
			recursive_unset($entries, 'count');
			
			foreach( $entries[0]['member'] as $is_member ){
				
				array_push($member_list , $is_member);
			}
			
			$obj_out['member_list'] = $member_list;
			
		//---------------------
			
			$json_out = json_encode( $obj_out, JSON_PRETTY_PRINT);
			print_r( $json_out );
			
		//---------------------
	}

//-----------------------------------------------------------------------------


//--------LDAP User Attributes Call--------------------------------------------

	function ldap_usr_edit_call($POST){
		
		//print_r($POST);
			
			if( isset( $POST['usr_dn'] ) && $POST['usr_dn']!= "undefined" ){
				$usr_dn = $POST['usr_dn'];
			}
			else{
				$usr_dn = 'uid=' . $_SESSION['uid'] . ',ou=people,' . $GLOBALS['ldap_base_dn'];
			}
			
		//---------------------
			
			$ldap_base_dn = $GLOBALS['ldap_base_dn'];

			$obj_in = array();
			$obj_in['dn'] = $usr_dn;
			$obj_in['function'] = $POST['function'];
		
		//---------------------
			
			$obj_in['def']['givenname']['hl'] 		= 'Given name';
			$obj_in['def']['givenname']['width'] 	= '50%';
			
			$obj_in['def']['sn']['hl'] 				= 'Surname';
			$obj_in['def']['sn']['width'] 			= '50%';
			
			$obj_in['def']['mail']['hl'] 			= 'User Email';
			$obj_in['def']['mail']['width'] 		= '50%';
			
		//---------------------
		
			$ldap_con = ldap_con_do();
			
			$search_filter = '(&(objectClass=inetOrgPerson)(cn=*))';
			$justthese = array( "uid", "givenname", "sn", "mail" );
				
			$result  = ldap_search($ldap_con, $usr_dn, $search_filter , $justthese);				
			$entries = ldap_get_entries($ldap_con, $result);
			
			recursive_unset($entries, 'count');
			
			//print_r($entries);
			
			$obj_in['content'] = $entries[0];
		//---------------------
			
			if( file_exists("../icos/".$obj_in['content']["uid"][0].".png") ){	
				$obj_in['icon'] = $obj_in['content']["uid"][0].".png";
			}
			else if( file_exists("../icos/".$obj_in['content']["uid"][0].".jpg") ){	
				$obj_in['icon'] = $obj_in['content']["uid"][0].".jpg";
			}
			else{
				$obj_in['icon'] = "usr_plh.png";
			}
			
		//---------------------
			
			$json_out = json_encode( $obj_in, JSON_PRETTY_PRINT);
			print_r( $json_out );
			
		//---------------------
	}

//-----------------------------------------------------------------------------


	

//--------LDAP User Add-------------------------------------------------------
	
	function ldap_usr_add( $POST ){
		
		print_r( $POST);
		
		//---------------------
		
			$ldap_base_dn 	= $GLOBALS['ldap_base_dn'];
			
			$uid = $POST['uid'];
			
			$usr_attr_obj  = json_decode( $POST['usr_data'] , true);
			
		//---------------------
		
			$usr_dn = "ou=people," . $ldap_base_dn;
			$new_dn = "uid=" . $uid . "," . $usr_dn;
			
			$attr_ary = array();
			$attr_ary["objectclass"][0]   = "inetOrgPerson";
			$attr_ary["objectclass"][1]   = "person";
			$attr_ary["objectclass"][2]   = "top";
			$attr_ary["cn"]   = $uid;
			
			foreach( $usr_attr_obj as $key => $value ){
			
				$attr_ary[$key]   = $value;	
			}
			
			print_r($attr_ary);
			
		//---------------------
		
			$ldap_con = ldap_con_do();
			
			ldap_add($ldap_con, $new_dn, $attr_ary); 
			
			ldap_close($ldap_con);
			
		//---------------------
	}

//-----------------------------------------------------------------------------


//--------LDAP Call Users Memberships------------------------------------------

	function ldap_usr_memberships_call($POST){
		
		//---------------------
			
			$ldap_base_dn = $GLOBALS['ldap_base_dn'];
			$usr_dn = $POST['usr_dn'];
			
			$obj_out = array();
			$obj_out['dn'] = $usr_dn;
			$obj_out['function'] = $POST['function'];
			
		//---------------------
			
			$grp_list = array();
			$membership_list = array();
			
			$REST['output'] = 'return_obj';
			$obj_in = ldap_srvgroups_call( $REST );
			
			//print_r(obj_in);
			
			$attr_ary = array( "cn" , "descshort" , "servicestatus" );
			
			foreach( $obj_in as $is_grp ){
				
				foreach( $attr_ary as $is_attr ){
					
					if( isset( $is_grp[$is_attr][0] ) ){
						
						$grp_list[ $is_grp['cn'][0] ] [$is_attr] = $is_grp[$is_attr][0];
					}
				}
			
				$grp_list[ $is_grp['cn'][0] ] ["dn"] = $is_grp["dn"];
				
				if( in_array( $usr_dn , $is_grp['member'] ) ){
					
					array_push( $membership_list , $is_grp["dn"] );
				}
			}
				
			$obj_out['grp_list'] = $grp_list;
			$obj_out['membership_list'] = $membership_list;
			
		//---------------------
			
			$json_out = json_encode( $obj_out, JSON_PRETTY_PRINT);
			print_r( $json_out );
			
		//---------------------
	}
	
//-----------------------------------------------------------------------------



//--------LDAP User Password Change--------------------------------------------

	function ldap_usrpwd_reset( $POST ){
		
		//---------------------
			
			$mode 	= $POST['mode'];
			$obj_in = array();
			
		//---------------------
		
			if( $mode == 'user' ){
				
				$pwd_cur = $POST['pwd_cur'];
				
				$ldap_con_chk = ldap_con_chk( $_SESSION['uid'] , $pwd_cur );

				if( $ldap_con_chk == FALSE ){
					
					$obj_in['status'] = "false";
					
					$json_out = json_encode( $obj_in, JSON_PRETTY_PRINT);
					print_r( $json_out );
					
					exit();
				}
				
				ldap_close($ldap_con_chk);
				
				$usr_dn  = 'uid='. $_SESSION['uid'] . ',ou=people,' . $GLOBALS['ldap_base_dn']; 
			}
			if( $mode == 'admin' ){
				
				if( !isset( $_SESSION['adm'] ) ){ exit(); }
				
				$usr_dn  = $POST['usr_dn'];
			}
		
		//---------------------
			
			$pwd_new = $POST['pwd_new'];
			
			$pwd_md5 = "{MD5}".base64_encode(pack("H*",md5($pwd_new))); // Oviss1234!
			
			
			$REST['dn']   = $usr_dn;
			$REST['key']  = 'userPassword';
			$REST['val']  = $pwd_md5;
			$REST['mode'] = 'quiet';
			
			ldap_entry_change( $REST );
			
			$obj_in['status'] = "true";
			
		//---------------------
			
			$json_out = json_encode( $obj_in, JSON_PRETTY_PRINT);
			print_r( $json_out );
			
		//---------------------
	
	}
	
//-----------------------------------------------------------------------------




//--------LDAP User Password Change--------------------------------------------

	function services_call( $POST ){
		
		//---------------------
			
			//$obj_in = array();
			
		//---------------------
	
			$ldap_base_dn 		= $GLOBALS['ldap_base_dn'];
			$ldap_grp_base_dn 	= "OU=groups," . $ldap_base_dn;
			$usr_dn				= 'uid=' . $_SESSION['uid'] . ',ou=people,' . $ldap_base_dn;
			
			$ldap_con = ldap_con_do();
				
			$search_filter = '(&(objectClass=groupOfNames)(member='.$usr_dn.'))';
			$justthese = array( "cn", "description", "descShort", "descLong", "serviceCosts" , "servicestatus" , "member" );
				
			$result  = ldap_search($ldap_con, $ldap_grp_base_dn, $search_filter , $justthese);				
			$entries = ldap_get_entries($ldap_con, $result);
		
		//---------------------
		
			recursive_unset($entries, 'count');
			
			$i = 0;
			$admin_dn = 'cn=admin,'.$GLOBALS['ldap_base_dn'];
			//$admin_dn = 'cn=admin,dc=app-scape,dc=lab';
			
			foreach( $entries as $is_entry ){
				
				if( file_exists("../icos/".$is_entry["cn"][0].".png") ){	
					$entries[$i]['objecticon'] = $is_entry["cn"][0].".png";
				}
				else if( file_exists("../icos/".$is_entry["cn"][0].".jpg") ){	
					$entries[$i]['objecticon'] = $is_entry["cn"][0].".jpg";
				}
				else{
					$entries[$i]['objecticon'] = "grp_plh.png";
				}
				
				$i ++;
			}
		
		//---------------------
			
			if( isset( $POST['output'] ) && $POST['output'] == 'print' ){
				echo '<pre>';
			}
			
			$json_out = json_encode( $entries, JSON_PRETTY_PRINT);
			print_r( $json_out );
		
		//---------------------
	
	}
	
//-----------------------------------------------------------------------------

	
	
	
	

?>