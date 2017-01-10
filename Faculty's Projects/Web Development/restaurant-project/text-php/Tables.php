<?php

include('dbConn.php');
include('tableViewer.php');

class Tables
{
    private $Max;
    private $db;

    function __construct($max)
    {
        $this->Max = $max;
        $this->db = $GLOBALS['db'];
    }

    static function addtables($max)
    {
        $db = $GLOBALS['db'];
        $sql = "INSERT INTO `table`(`Maximum`) VALUES ('$max');";
        mysqli_query($db, $sql);
    }

    static function SelectAllTables(){
        $db = mysqli_connect("localhost", "root", "" , "restaurant");
        $sql = "SELECT * FROM `table` WHERE table_isDeleted = '0' ORDER BY Table_id;";
        $result = mysqli_query($db, $sql);
        $table = new table();
        $myTable = $table->generateTablesTable();

        while($row = mysqli_fetch_array($result)){
            $r1 = $row['Table_id'];
            $myTable .= '<tr> <td>' . $row['Table_id'] . '</td>' .
                '<td>' . $row['Maximum'] . '</td>' .
                "<td><a href=../Tables/deleteTABLES.php?id=$r1>&#10007;</a></td>" .
                "<td><a href=../Tables/updateTABLES.php?id=$r1>&#9997;</a></td>" . '</tr>';
        }
        $myTable .= '</table>';
        return $myTable;
    }


    static function ListTables()
    {
        $db = mysqli_connect("localhost", "root", "" , "restaurant");
        $sql = "SELECT Table_id FROM `table` WHERE table_isDeleted = '0' ORDER BY Table_id;";
        $result = mysqli_query($db, $sql);
        $list;
        while($row = mysqli_fetch_array($result)){
            $id = $row['Table_id'];
            $list .= "<option value='$id'>" . $id . "</option>";
        }

        return $list;
    }

    static function DeleteTable($id)
    {
        $sql = "UPDATE `table` SET table_isDeleted = '1' WHERE Table_id = '" . $id . "'";
        $db = mysqli_connect("localhost", "root", "", "restaurant");
        $result = mysqli_query($db, $sql);
    }
}
?>