<?php
	require_once('tools.php');
	require_once('constants.php');
	
	#if the data object is null or is an empty string, go to else
	#the object data is a JSON object
	#the ordering of the values expected are as follows: username, new password
	if(isset($_POST["data"]) && $_POST["data"] != "")
	{
		$data = $_POST["data"];
		$arr = createCon();
		
		if(!$arr[0])
		{
			echo $arr[1];
			exit();
		}
		
		$con = $arr[1];
		$newData = extractValues($con, $data);
		
		if(!checkValidity($newData[1], $password_regex))
		{
			echo createMessage("The password you have provided is invalid! 
			It must only consist of letters, digits, white space characters, and special characters, 
			and is 8 to 32 characters in length", $WARNING);
			exit();
		}
		
		#creates hashed password for admins
		$password = createAdminHash($newData[1]);
		
		$updatePassword = mysqli_query($con, "UPDATE admin_login SET password = '$password' WHERE username = '$newData[0]'");
		
		if(!$updatePassword)
		{
			echo createMessage($INT_DAT_ERR, $INT_DAT);
			exit();
		}
		
		echo createMessage("The password was successfully reset!");
		exit();
	}
	else
	{
		echo createMessage($INV_OBJ_ERR, $WARNING);
	}
?>