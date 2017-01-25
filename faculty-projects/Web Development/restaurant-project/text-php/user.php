<?php

/**
 * Created by PhpStorm.
 * User: iBelal
 * Date: 5/10/2016
 * Time: 12:08 AM
 */

include('dbConn.php');
include('tableViewer.php');

class user
{
    private $fname;
    private $lname;
    private $email;
    private $pass;
    private $address;
    private $mobile;
    private $db;
    private $ADDRESS;


    function __construct($FirstName, $LastName, $Email, $Pass, $Address, $Mobile)
    {
        $this->fname = $FirstName;
        $this->lname = $LastName;
        $this->email = $Email;
        $this->pass = $Pass;
        $this->address = $Address;
        $this->mobile = $Mobile;
        $this->db = $GLOBALS['db'];
    }


    function addUser(){
        $sql = "INSERT INTO user (FirstName ,LastName , Email, password, Address_ID_Address_PK, Mobile) VALUES ('$this->fname', '$this->lname', '$this->email', '$this->pass', '$this->address', '$this->mobile');";
        mysqli_query($this->db, $sql);
    }

    function ListIDS()
    {
        $sql = "SELECT User_ID FROM user";
        $result = mysqli_query($this->db, $sql);

        $lastId = 0;
        while ($row = mysqli_fetch_array($result)) {
            $lastId = $row['User_ID'];//. " " . $row['FirstName'] . " " . $row['LastName'] . $row['Email'] . " "

        }

        return $lastId;
    }

    function setUserPrivilege($page_id , $user_id){
        $sql = "INSERT INTO user_type_page (idUser_Type, Page_ID, User_User_ID) VALUES (NULL, '$page_id', '$user_id')";
        return $sql;
    }

    static function getSpecificUser($id, $email){
        $sql = "SELECT * FROM user WHERE User_ID = " . $id . "AND isDeleted = '0'";
        $sql1 = "SELECT * FROM user WHERE Email LIKE '%".$email."%' AND isDeleted = '0'";
        $db = mysqli_connect("localhost", "root" , "" , "restaurant");

        $table = new table();

        $resultq;

        if($email == "" && $id != "") {
            $resultq = mysqli_query($db, $sql);

        } else if($id == "" && $email != "") {
            $resultq = mysqli_query($db, $sql1);

        }

        error_reporting(0);

        if(empty($resultq)){
            echo "<p style='color: red'>Please Fill in any of the 2 inputs</p>";
        }

        $myTable = $table->generateUserTable();

        while($result = mysqli_fetch_array($resultq)) {
            $r1 = $result['User_ID'];
            $r2 = $result['Address_ID_Address_PK'];
            $myTable .= '<tr> <td>' . $result['User_ID'] . '</td>' .
                '<td>' . $result['FirstName'] . '</td>' .
                '<td>' . $result['LastName'] . '</td>' .
                '<td>' . $result['Mobile'] . '</td>' .
                '<td>' . $table->showAddress($r2, $db) . '</td>' .
                '<td>' . $result['Email'] . '</td>' .
                '<td>' . $result['Password'] . '</td>' .
                "<td><a href=../user/deleteUser.php?id=$r1>&#10007;</a></td>" .
                "<td><a href=../user/updateUser.php?id=$r1>&#9997;</a></td>" . '</tr>';
        }

        return $myTable;

    }

    static function SelectAllUsers(){
        $db = mysqli_connect("localhost", "root", "" , "restaurant");
        $sql = "SELECT * FROM user WHERE isDeleted = '0' ORDER BY User_ID ;";
        $result = mysqli_query($db, $sql);
        $table = new table();
        $myTable = $table->generateUserTable();

        while($row = mysqli_fetch_array($result)){
            $r1 = $row['User_ID'];
            $r2 = $row['Address_ID_Address_PK'];
            $myTable .= '<tr> <td>' . $row['User_ID'] . '</td>' .
                '<td>' . $row['FirstName'] . '</td>' .
                '<td>' . $row['LastName'] . '</td>' .
                '<td>' . $row['Mobile'] . '</td>' .
                '<td>' . $table->showAddress($r2, $db) . '</td>' .
                '<td>' . $row['Email'] . '</td>' .
                '<td>' . $row['Password'] . '</td>' .
                "<td><a href=../user/deleteUser.php?id=$r1>&#10007;</a></td>" .
                "<td><a href=../user/updateUser.php?id=$r1>&#9997;</a></td>" . '</tr>';
        }


        $myTable .= '</table>';
        return $myTable;
    }
    
    static function DeleteUser($id){
        $sql = "UPDATE user SET isDeleted = '1' WHERE User_ID = '" . $id . "'";
//        $sql = "DELETE FROM user WHERE User_ID = " . $id;
        $db = mysqli_connect("localhost", "root", "", "restaurant");
        $result = mysqli_query($db, $sql);
    }

    static function editPrivilege(){
        $db = mysqli_connect("localhost", "root", "" , "restaurant");
        $sql = "SELECT * FROM user ORDER BY User_ID;";
        $result = mysqli_query($db, $sql);
        $table = new table();
        $myTable = $table->generateUserPrivilege();



        $sql3 = "SELECT user.User_ID, page.Page_ID FROM user_type_page, user, page WHERE user.User_ID = user_type_page.User_User_ID AND user_type_page.Page_ID = page.Page_ID";
        $result3 = mysqli_query($db, $sql3);

        $ArrayID = Array();
        $ArrayPage = Array();
        $arr_counter = 0;

        while($row3 = mysqli_fetch_array($result3)){
            $ArrayID[$arr_counter] = $row3['User_ID'];
            $ArrayPage[$arr_counter] = $row3['Page_ID'];
            $arr_counter++;
        }


        $counter = 1;
        while($row = mysqli_fetch_array($result)){
            $r1 = $row['User_ID'];
            $r2 = $row['Address_ID_Address_PK'];
            $myTable .= '<tr> <td id>' . $row['User_ID'] . '</td>' .
            '<td>' . $row['FirstName'] . '</td>' .
            '<td>' . $row['LastName'] . '</td>' .
            '<td>' . $row['Mobile'] . '</td>' .
            '<td>' . $table->showAddress($r2, $db) . '</td>' .
            '<td>' . $row['Email'] . '</td>' .
            '<td>' . $row['Password'] . '</td>';

            $sql2 = "SELECT * FROM page";
            $result2 = mysqli_query($db, $sql2);



            while($row2 = mysqli_fetch_array($result2)){

                $myTable .= '<td>' . '<input type="radio" onclick="changePrivilege(this.value, this.name);" name="' . $r1 . '"' . ' value="' . $row2['Page_ID'] . '"';
                for($i = 0; $i < $arr_counter; $i++){
                    if($ArrayPage[$i] == $row2['Page_ID'] && $ArrayID[$i] == $row['User_ID'])
                        $myTable .=  'checked';
                }
                $myTable .=  '>';
                $myTable .= $row2['Friendly_Name'] . "</td>";
            }
            $counter++;
                $myTable .= '</tr>';
        }



        $myTable .= '</table>';
        return $myTable;
    }

    static function getUsersByNameAndID(){
        $db = mysqli_connect("localhost", "root", "" , "restaurant");
        $sql = "SELECT User_ID, Email FROM user WHERE isDeleted = '0' ORDER BY User_ID ;";
        $result = mysqli_query($db, $sql);

        return $result;
    }
}
?>