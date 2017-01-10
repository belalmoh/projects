<?php

include_once ('../item/items.php');
include_once ('../order/order.php');
include_once ('../order/order_details.php');
include_once ('../../text-php/dbConn.php');
include_once ('../../text-php/tableViewer.php');

//$myOrder = new order(date(), time());

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $date = $_POST['order_date'];
    $time = $_POST['order_time'];
    $payment_visa = $_POST['payment_visa'];
    $payment_cash = $_POST['payment_cash'];

    $myOrder = new order($date,$time);
    $myOrder->addOrderTimeStamp();

    $itemArray = Array();
    $QuantityArray = Array();
    foreach ($_POST['items'] as $item)
        array_push($itemArray, $item);


    foreach ($_POST['quantity'] as $q)
        array_push($QuantityArray,$q);

    session_start();
    $userID = $_SESSION['ID'];
    for($i = 0; $i < count($itemArray); $i++){
        $itemsOrder = new order_details($myOrder->getLastOrderID(), $itemArray[$i], $QuantityArray[$i], $payment_visa, $payment_cash);
        $itemsOrder->setOrder();
        $itemsOrder->insertOrderWithUser($userID ,$itemsOrder->getLastOrderID());
    }

    $sql = "SELECT * FROM `user` WHERE `user`.`User_ID` IN (SELECT `User_User_ID` FROM `user_has_order` WHERE `User_User_ID` = '$userID');";
    $result = mysqli_query($GLOBALS['db'], $sql);
    while($row = mysqli_fetch_array($result)){
        echo $row['FirstName'] . " " . $row['LastName'] . $row['Mobile'];
    }

    $sql = "SELECT * FROM `order` WHERE idOrder ='" . $itemsOrder->getLastOrderID() . "'";
    $result = mysqli_query($GLOBALS['db'], $sql);
    while($row = mysqli_fetch_array($result)){
        echo $row['idOrder'] . " " . $row['Date'] . $row['Time'];
    }

    foreach ($itemArray as $item)
        echo $item . " ";


//

}

?>

<script>
    function getCurrentDateTime() {
        var currentTime = new Date();

        document.getElementById("myTime").defaultValue = currentTime.getHours()+":"+currentTime.getMinutes()+":"+currentTime.getSeconds();

        var currentMonth = (currentTime.getMonth()+1);
        if(currentMonth < 10){
            document.getElementById("myDate").defaultValue = "" + currentTime.getFullYear() + "-" + "0" +currentMonth + "-" + currentTime.getDate();
        } else
            document.getElementById("myDate").defaultValue = "" + currentTime.getFullYear() + "-" + currentMonth + "-" + currentTime.getDate();
    }
</script>

<form method="post">
    <?php echo items::SelectItemsForOrder(); ?>
    <input type="time" name="order_time" id="myTime" ><br>
    <input type="date" name="order_date" id="myDate" ><br>
    <input type="button" value="Today" onclick="getCurrentDateTime()"> <br>
    <input type="text" name="payment_visa" placeholder="Visa Number"> <br>
    <input type="text" name="payment_cash" placeholder="Cash"> <br>

    <input type="submit">
</form>
