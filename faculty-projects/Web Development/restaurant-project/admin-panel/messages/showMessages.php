<?php
/**
 * Created by PhpStorm.
 * User: iBelal
 * Date: 5/17/2016
 * Time: 11:14 PM
 */

include('../../text-php/dbConn.php');

$sql = "SELECT * FROM contactmessages ORDER BY idContactMessages;";
$result = mysqli_query($db, $sql);

echo '<table border="1">' . '<th>ID</th> <th>Name</th> <th>Phone</th> <th>Email</th> <th>Message</th>';
while($row = mysqli_fetch_array($result)){
    echo '<tr>' . '<td>' . $row['idContactMessages'] . '</td>';
    echo '<td>' . $row['Name'] . '</td>';
    echo '<td>' . $row['Phone'] . '</td>';
    echo '<td>' . $row['Email'] . '</td>';
    echo '<td>' . $row['Message'] . '</td>' . '</tr>';
}

echo '</table>';

?>