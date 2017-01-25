<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

include 'dbconn.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$sqlPlayers =  mysqli_query($connection,
        sprintf("
                INSERT INTO powergym.players
                VALUES (NULL, '%s', '%s', '%s');
        ", $request->params->name, $request->params->mobile, $request->params->ssn));

$sqlSubscription = mysqli_query($connection,
        sprintf("
                INSERT INTO powergym.subscriptions
                VALUES (NULL, 
                        '%d',
                        (SELECT pk FROM powergym.subscriptions_type WHERE type = '%d'),
                        (SELECT MAX(pk) FROM powergym.players),
                        get_id(),
                        CURDATE(),
                        incrementDate(CURDATE(), '%s')
                        );          
", $request->params->subType, $request->params->subType, $request->params->subPeriod));


?>