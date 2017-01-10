<?php
	require_once('tools.php');
	require_once('constants.php');
	
	#if the data object is null or is an empty string, go to else
	#the object data is a JSON object
	#the ordering of the values expected are as follows: username, password
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
		$loginData = extractValues($con, $data);
		
		$account = mysqli_query($con, "SELECT username, password FROM admin_login WHERE username = '$loginData[0]'");
		
		if(!$account)
		{
			echo createMessage($INT_DAT_ERR, $INT_DAT);
            exit();
        }
		
		#if account exists
		if(mysqli_num_rows($account) != 0)
		{
			$row = mysqli_fetch_array($account);
			
			#the number of hashing rounds
			$rounds = '$6$rounds=100000$';
			$hashed = $rounds . substr($row[1], 0, 16) . '$' . substr($row[1], 16);
			
			#check if hashed password is equal to stored hashed password
			if($hashed == crypt($loginData[1], $hashed))
			{
				echo createMessage("Login successful!");
				mysqli_free_result($account);
				exit();
			}
			
			echo createMessage("Incorrect credentials, please check your username and password.", $WARNING);
			mysqli_free_result($account);
			exit();
		}
		
		echo createMessage("Incorrect credentials, please check your username and password.", $WARNING);
		mysqli_free_result($account);
		exit();
	}
	else
	{
		echo createMessage($INV_OBJ_ERR, $WARNING);
	}
?>