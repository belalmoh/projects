<?php
	$WARNING = 0; #error code for general warnings.
	$INT_DAT = 1; #error code for internal database errors.
	$VAL_REP = 2; #error code for validity reports.
	$DAT_CON = 3; #error code for database connection errors.
	$OK = 7; #universal confirmation code.
	
	$INV_OBJ_ERR = "Invalid object!"; #error message for invalid JSON objects.
	#error message for internal database errors.
	$INT_DAT_ERR = "An internal database error has occurred, please try again soon.";
	#error message for validity checks.
	$VAL_ERR = "Some or all of the fields are invalid, please check the values you've provided and try again.";
	
	$username_regex = '/[a-zA-Z0-9]{6,15}/';
	$password_regex = '/[a-zA-Z0-9\W_]{8,32}/';
	
	$admin_registration_regex = array($username_regex, 'email', $password_regex);
	#contains regular expressions for name, phone, SSN, membership type, period, and ID respectively
	$member_registration_regex = array('/[a-zA-Z ]{4,15}/', '/\d{11}|\d{8}/', '/\d{14}/', '/\d{3}/', '/\d{1,2}/', '/\d{5,10}/');
	#contains regular expressions for locker number, and ID respectively
	$locker_registration_regex = array('/\d{1,3}/', '/\d{5,10}/');
?>