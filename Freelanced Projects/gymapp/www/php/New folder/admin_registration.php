<?php
	require_once('tools.php');
	require_once('constants.php');
	
	#if the data object is null or is an empty string, go to else
	#the object data is a JSON object
	#the ordering of the values expected are as follows: username, email, password
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
		$regData = extractValues($con, $data);
		$validity = createValidityReport($regData, $admin_registration_regex);
		
		if(!$validity['valid'])
		{
			echo validityErrorMessage($validity['report']);
			exit();
		}
		
		$check = checkExistence($con, "SELECT email FROM admin_login WHERE email = '$regData[1]'", "The admin you're trying to register already exists.");
		
		if(!$check[0])
		{
			echo $check[1];
			exit();
		}
		
		$password = createAdminHash($regData[2]);
		
		$registerLoginData = mysqli_query($con, "INSERT INTO admin_login (username, password, email) VALUES ('$regData[0]', '$password', '$regData[1])')");
		
		if(!$registerLoginData)
		{
			echo createMessage($INT_DAT_ERR, $INT_DAT);
			exit();
		}
		
		echo createMessage("Registration was successful!");
		exit();
	}
	else
	{
		echo createMessage($INV_OBJ_ERR, $WARNING);
	}
?>