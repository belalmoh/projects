<?php
	require_once('tools.php');
	require_once('constants.php');
	
	#if the data object is null or is an empty string, go to else
	#the object data is a JSON object
	#the ordering of the values expected are as follows: name, phone, SSN, type, period -in months-, ID
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
		$memberData = extractValues($con, $data);
		
		$validity = createValidityReport($memberData, $member_registration_regex);
		
		if(!$validity['valid'])
		{
			echo validityErrorMessage($validity['report']);
			exit();
		}
		
		$check = checkExistence($con, "SELECT phone, SSN FROM members_data WHERE phone = '$memberData[1]' OR SSN = '$memberData[2]'", 
		"The member you are trying to register already exists.");
		
		if(!$check[0])
		{
			echo $check[1];
			exit();
		}
		
		$today = date("Y/m/d");
		$regEnd = strtotime("+" . $memberData[4], strtotime($today));
		
		$registerMember = mysqli_query($con, "INSERT INTO members_data (ID, name, phone, SSN, type, reg_date, end_date) 
		VALUES ('$memberData[5]', '$memberData[0]', '$memberData[1]', '$memberData[2]', '$memberData[3]', '$today', '$regEnd')");
		
		if(!$registerMember)
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