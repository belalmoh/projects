<?php
/**
 * Created by PhpStorm.
 * User: iBelal
 * Date: 5/18/2016
 * Time: 6:44 PM
 */

include ('../../text-php/dbConn.php');

class order_details{
    private $orderID;
    private $itemID;
    private $Quantity;
    private $Payment_Visa;
    private $Payment_Cash;

    function __construct($ID_Order, $ID_Items, $Quantity, $Payment_Visa, $Payment_Cash){
        $this->orderID = $ID_Order;
        $this->itemID = $ID_Items;
        $this->Quantity = $Quantity;
        $this->Payment_Visa = $Payment_Visa;
        $this->Payment_Cash = $Payment_Cash;
    }

    function setOrder(){
        $sql = "INSERT INTO `order_details` (`Order_idOrder`, `Items_Items_id`, `Quantity`, `Payment_Visa`, `Payment_Cash`) VALUES ( '$this->orderID', '$this->itemID', '$this->Quantity', '$this->Payment_Visa', '$this->Payment_Cash');";
        mysqli_query($GLOBALS['db'], $sql);
    }

    function getItems($Items){
        foreach ($Items as $val) {
            $sql = "SELECT * FROM items WHERE Items_id = '" . $val . "'";
            $result = mysqli_query($GLOBALS['db'], $sql);

            while ($row = mysqli_fetch_array($result)) {
                echo $row['Name'];
            }
        }
    }

    function getLastOrderID(){
        $sql = "SELECT id_OrderDetails FROM `order_details` ORDER BY id_OrderDetails DESC LIMIT 1;";
        $lastID = mysqli_fetch_array(mysqli_query($GLOBALS['db'], $sql));
        return $lastID['id_OrderDetails'];
    }


    function insertOrderWithUser($userID, $orderID){
        $sql = "INSERT INTO `user_has_order` (`User_User_ID`, `Order_idOrder`) VALUES ('$userID', '$orderID')";
        mysqli_query($GLOBALS['db'], $sql);
    }



}