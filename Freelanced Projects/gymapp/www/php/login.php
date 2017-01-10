<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

include 'dbconn.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);


if($connection){
    $result = mysqli_query($connection, sprintf("
    SELECT users.users_type_pk AS user_type
    FROM powergym.users
    WHERE users.name = '%s' AND users.password = '%s'
    LIMIT 1
    ", $request->params->name, $request->params->password));
    
    $result = mysqli_fetch_array($result, MYSQLI_ASSOC);
    
    echo json_encode($result);
    
    
} else {
    echo "404";
}


?>