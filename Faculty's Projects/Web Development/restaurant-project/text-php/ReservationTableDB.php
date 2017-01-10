<?php

include('dbConn.php');
include('tableViewer.php');

class reserve_table
{
    private $TimeFrom;
    private $TimeTo;
    private $date;
    private $NOP; //number of persons
    private $branch;
    private $TableNumber;
    private $ID;
    private $db;

    function __construct($timefrom,$timeto,$Date,$NoP,$Branch,$tablenumber,$ID)
    {
        $this->TimeFrom = $timefrom;
        $this->TimeTo = $timeto;
        $this->date = $Date;
        $this->NOP = $NoP;
        $this->branch=$Branch;
        $this->TableNumber = $tablenumber;
        $this->ID = $ID;
        $this->db = $GLOBALS['db'];
    }

    function addReservation()
    {
        $sql = "INSERT INTO reservation (Time_From, Time_To , Date_Reservation, Num_Users, Branch, Table_Table_id , User_User_ID) VALUES ('$this->TimeFrom','$this->TimeTo', '$this->date', '$this->NOP','$this->branch' , '$this->TableNumber' , '$this->ID');";
        mysqli_query($this->db, $sql);

        $sql1 = "UPDATE `table` SET `status` = '1' WHERE `id` = '" . $this->TableNumber . "'";
        mysqli_query($this->db, $sql1);
    }

    static function SelectAllReservations(){
        $db = mysqli_connect("localhost", "root", "" , "restaurant");
        $sql = "SELECT * FROM reservation WHERE reservation_isDeleted = '0' ORDER BY User_User_ID;";
        $result = mysqli_query($db, $sql);
        $table = new table();
        $myTable = $table->generateReservationTable();

        while($row = mysqli_fetch_array($result)){
            $r1 = $row['User_User_ID'];
            $myTable .= '<tr> <td>' . $row['Table_Table_id'] . '</td>' .
                '<td>' . $row['User_User_ID'] . '</td>' .
                '<td>' . $row['Time_From'] . '</td>' .
                '<td>' . $row['Time_To'] . '</td>' .
                '<td>' . $row['Date_Reservation'] . '</td>' .
                '<td>' . $row['Num_Users'] . '</td>' .
                '<td>' . $row['Branch'] . '</td>' .
                "<td><a href=../reservation/deleteReservation.php?id=$r1>&#10007;</a></td>" .
                "<td><a href=../reservation/updateReservationDB.php?id=$r1>&#9997;</a></td>" . '</tr>';
        }
        $myTable .= '</table>';
        return $myTable;
    }

    static function DeleteReservation($id)
    {
        $sql = "UPDATE reservation SET reservation_isDeleted = '1' WHERE User_User_ID = '" . $id . "'";
        //$sql = "DELETE FROM reservation WHERE User_User_ID = " . $id;
        $db = mysqli_connect("localhost", "root", "", "restaurant");
        $result = mysqli_query($db, $sql);
    }


    static function SelectAllDeletedReservations(){
        $db = mysqli_connect("localhost", "root", "" , "restaurant");
        $sql = "SELECT * FROM reservation WHERE reservation_isDeleted = '1' ORDER BY User_User_ID;";
        $result = mysqli_query($db, $sql);
        $table = new table();
        $myTable = $table->generateDeletedReservationTable();

        while($row = mysqli_fetch_array($result)){
            $r1 = $row['User_User_ID'];
            $myTable .= '<tr> <td>' . $row['Table_Table_id'] . '</td>' .
                '<td>' . $row['User_User_ID'] . '</td>' .
                '<td>' . $row['Time_From'] . '</td>' .
                '<td>' . $row['Time_To'] . '</td>' .
                '<td>' . $row['Date_Reservation'] . '</td>' .
                '<td>' . $row['Num_Users'] . '</td>' .
                '<td>' . $row['Branch'] . '</td>' . '</tr>';
        }
        $myTable .= '</table>';
        return $myTable;
    }

    static function user_HistoryOfReservations($id)
    {
        $db = mysqli_connect("localhost", "root", "", "restaurant");
        $sql = "SELECT `Date_Reservation`, `Branch`, `Table_Table_id`, `Time_From`, `Time_To`, `Num_Users` FROM `reservation` WHERE reservation_isDeleted = '0' AND User_User_ID='" . $id . "' ORDER BY Date_Reservation;";
        $result = mysqli_query($db, $sql);
        $table = new table();
        $myTable = $table->user_HistoryOfReservations();

        while ($row = mysqli_fetch_array($result)) {
            $myTable .=
                '<tr> <td>' . $row['Date_Reservation'] . '</td>' .
                '<td>' . $row['Branch'] . '</td>' .
                '<td>' . $row['Table_Table_id'] . '</td>' .
                '<td>' . $row['Time_From'] . '</td>' .
                '<td>' . $row['Time_To'] . '</td>' .
                '<td>' . $row['Num_Users'] . '</td>' . '</tr>';
        }
        $myTable .= '</table>';

        return $myTable;
    }

}
?>