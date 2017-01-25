<?php
	require_once('constants.php');
	
	$username = "root";
	$password = "whatever";
	$database = "power_gym";
	
	/**
	Creates a connection to the MySQL database, returns an array with 2 values
	if connection successful, it returns false as first value and a connection
	object "$con", if connection failed it will return false as the first value,
	and a json encoded array with a boolean value and error message.
	**/
	function createCon()
	{
		$con = mysqli_connect("localhost", $username, $password, $database);
		
		if(mysqli_connect_errno())
		{
			return array(false, errorMessage("Database connection error.", $DAT_CON));
        }
		
		return array(true, $con);
	}
	
	/**
	Creates an error message, wrap it in an array, encode it in JSON format
	and returns it to the user.
	**/
	function createMessage(string $message, $code = 7)
	{
		if($code !== 7)
		{
			$result_data = array(
				'success' => false,
				'code' => $code,
				'message' => $message,
			);
			
			return json_encode($result_data);
		}
		
		$result_data = array(
			'success' => true,
			'message' => $message,
		);
		
		return json_encode($result_data);
	}
	
	/**
	Creates an error message, wrap it in an array, encode it in JSON format
	and returns it to the user. Supports validity reports.
	**/
	function validityErrorMessage($validityReport)
	{
		$result_data = array(
			'success' => false,
			'code' => $VAL_REP,
			'message' => $VAL_ERR,
			'report' => $validityReport,
		);
		
		return json_encode($result_data);
	}
	
	/**
	Takes a MySQL connection and JSON object as arguments, returns non-associative array
	with the values. JSON objects must contain values arranged by the order thwey were inserted
	in by the user, or else errors will occur.
	**/
	function extractValues($con, $data)
	{
		#protect against SQL injection attacks
		$data = mysqli_real_escape_string($con, $data);
		
		#decode the data from the JSON object into non-associative array
		$ext_data = json_decode(stripslashes($data), false);
		
		return $ext_data;
	}
	
	/**
	Validates the emails of both users and admins, returns boolean value,
	true if valid, false if not.
	**/
	function validateEmail($email)
	{
		#according to standards, an email can be 255 bytes of length
		if(!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254)
		{
			return false;
		}
		
		return true;
	}
	
	/**
	Checks the validity of any field being entered to the database with the provided
	regex, return boolean value, true if it matches, false otherwise.
	**/
	function checkValidity($value, $regex)
	{
		if(preg_match($regex, $value) === 1)
		{
			return true;
		}
		
		return false;
	}
	
	/**
	Takes an array of the values to be checked $valuesArray and another of corresponding regex $regexArray,
	returns an array that is an array of boolean value $validity and an array of boolean values $valuesArray,
	the array is to be used on the client side after decoding to highlight the invalid fields to the user, if any.
	The $valuesArray is reused/recycled for efficiency.
	**/
	function createValidityReport($valuesArray, $regexArray)
	{
		$arrayLength = count($valuesArray);
		$validity = true;
		
		for($i = 0; $i<$arrayLength; $i++)
		{
			if($regexArray[$i] == 'email')
			{
				$valuesArray[$i] = validateEmail($valuesArray[$i]);
			}
			else
			{
				$valuesArray[$i] = checkValidity($valuesArray[$i], $regexArray[$i]);
			}
			
			$validity &= $valuesArray[$i];
		}
		
		
		$result_data = array(
			'valid' => $validity,
			'report' => $valuesArray,
		);
		
		return $result_data;
	}
	
	/**
	Checks the existence of a specific entry in the database (e.g.member), takes 
	the SQL query as argument.
	**/
	function checkExistence($con, $query, $ifExist)
	{
		$check = mysqli_query($con, $query);
		
		if(!$check)
		{
			return array(false, errorMessage($INT_DAT_ERR, $INT_DAT));
        }
		
		#if member exists
		if(mysqli_num_rows($check) != 0)
		{
			mysqli_free_result($check);
			return array(false, errorMessage($ifExist, $WARNING));
		}
		
		mysqli_free_result($check);
		
		return array(true);
	}
	
	/**
	Takes a password string as argument, return a hashed password using SHA512 hashing, 
	128 bytes of size.
	**/
	function createAdminHash($password)
	{
		$rounds = '$6$rounds=100000$';
		
		#creates a random string
		$bytes = openssl_random_pseudo_bytes(22, $cstrong);
		
		#if the string is not strong enough, keep creating
		while(!$cstrong)
		{
			$bytes = openssl_random_pseudo_bytes(22, $cstrong);
		}
		
		#creates hash salt
		#the array object is used to change some characters that are not allowed
		$salt = $rounds . strtr(base64_encode($bytes), array('-' => 'i', '_' => '.', '~' => '/', '+' => '5'));
		
		$hashedPassword = crypt($password, $salt);
		
		$part1 = substr($hashedPassword, 17, 16);
		$part2 = substr($hashedPassword, 34);
		$password = $part1 . $part2;
		
		return $password;
	}
?>