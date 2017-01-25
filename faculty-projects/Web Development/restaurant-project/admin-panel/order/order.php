<?php

include_once ('../../text-php/dbConn.php');

class order{

    private $date;
    private $time;
    
    function __construct($Date,$Time){
        $this->date =$Date;
        $this->time =$Time;
        
    }
    
    function addOrderTimeStamp(){
        $sql=" INSERT INTO `order` (`Date`,`Time`) VALUES ('$this->date','$this->time');";
        mysqli_query($GLOBALS['db'], $sql);
    }

    static function getLastOrderID(){
        $sql = "SELECT idOrder FROM `order` ORDER BY idOrder DESC LIMIT 1;";
        $lastID = mysqli_fetch_array(mysqli_query($GLOBALS['db'], $sql));
        return $lastID['idOrder'];
    }
}
