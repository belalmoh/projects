<?php
	require_once('tools.php');
	require_once('constants.php');
	
	#if the data object is null or is an empty string, go to else
	#the object data is a JSON object
	#the ordering of the values expected are as follows: locker number, member ID
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
		$lockerData = extractValues($con, $data);
		
		$validity = createValidityReport($lockerData, $locker_registration_regex);
		
		if(!$validity['valid'])
		{
			echo validityErrorMessage($validity['report']);
			exit();
		}
		
		$checkMember = checkExistence($con, "SELECT ID FROM members_data WHERE ID = '$lockerData[1]'", "The member does not exist.");
		
		if(!$check[0])
		{
			echo $check[1];
			exit();
		}
		
		$checkLocker = checkExistence($con, "SELECT locker_no FROM lockers_data WHERE locker_no = '$lockerData[0]'", "This locker is already assigned.");
		
		if(!$check[0])
		{
			echo $check[1];
			exit();
		}
		
		$assignLocker = mysqli_query($con, "INSERT INTO lockers_data (locker_no, member_id) VALUES ('$lockerData[0]', '$lockerData[1]')");
		
		if(!$assignLocker)
		{
			echo createMessage($INT_DAT_ERR, $INT_DAT);
			exit();
		}
		
		echo createMessage("locker assignment was successful!");
		exit();
	}
	else
	{
		echo createMessage($INV_OBJ_ERR, $WARNING);
	}
?>