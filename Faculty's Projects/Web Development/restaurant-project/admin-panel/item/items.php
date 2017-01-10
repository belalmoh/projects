<?php

include('../../text-php/dbConn.php');
include('../../text-php/tableViewer.php');

class items
{
    private $name;
    private $currentPrice;
    private $Quantity;
    private $CATID;
    private $db;
    
    function __construct($Name, $Current_Price, $Quantity , $Item_Category_ID_Item_Category)
    {
        $this->name = $Name;
        $this->currentPrice = $Current_Price;
        $this->Quantity = $Quantity;
        $this->CATID = $Item_Category_ID_Item_Category;
        $this->db = $GLOBALS['db'];
    }
    
      function additem()
      {
        $sql = "INSERT INTO items (Name ,Current_Price , Quantity,	Item_Category_ID_Item_Category) VALUES ('$this->name', '$this->currentPrice', '$this->Quantity', '$this->CATID');";
        mysqli_query($this->db, $sql);
      }
    
    function ListIDS()
    {
        $sql = "SELECT Items_id FROM items";
        $result = mysqli_query($this->db, $sql);

        $lastId = 0;
        while ($row = mysqli_fetch_array($result)) {
            $lastId = $row['Items_id'];//. " " . $row['FirstName'] . " " . $row['LastName'] . $row['Email'] . " "

        }

        return $lastId;
    }
    
     static function getSpecificItem($id, $name)
     {
        $sql = "SELECT * FROM items WHERE Items_id = " . $id;
        $sql1 = "SELECT * FROM items WHERE Name LIKE '%".$name."%'";
        $db = mysqli_connect("localhost", "root" , "" , "restaurant");

        $table = new table();

        $resultq;

        if($name == "" && $id != "") {
            $resultq = mysqli_query($db, $sql);

        } else if($id == "" && $name != "") {
            $resultq = mysqli_query($db, $sql1);

        }

        $myTable = $table->generateItemsTable();

        while($result = mysqli_fetch_array($resultq)) {
            $r1 = $result['Items_id'];
            $r2 = $result['Item_Category_ID_Item_Category'];
            $myTable .= '<tr> <td>' . $result['Items_id'] . '</td>' .
                '<td>' . $result['Name'] . '</td>' .
                '<td>' . $result['Current_Price'] . '</td>' .
                '<td>' . $result['Quantity'] . '</td>' .
                "<td><a href=deleteItem.php?id=$r1>&#10007;</a></td>" .
                "<td><a href=updateItem.php?id=$r1>&#9997;</a></td>" . '</tr>';
        }

        return $myTable;

    }
    
      static function SelectAllItems(){
        $db = mysqli_connect("localhost", "root", "" , "restaurant");
        $sql = "SELECT * FROM items WHERE Item_isDeleted = '0' ORDER BY Items_id;";
        $result = mysqli_query($db, $sql);
        $table = new table();
        $myTable = $table->generateItemsTable();

        while($row = mysqli_fetch_array($result)){
            $r1 = $row['Items_id'];
            $r2 = $row['Item_Category_ID_Item_Category'];
            $myTable .= '<tr> <td>' . $row['Items_id'] . '</td>' .
                '<td>' . $row['Name'] . '</td>' .
                '<td>' . $row['Current_Price'] . '</td>' .
                '<td>' . $row['Quantity'] . '</td>' .  
                "<td><a href=deleteItem.php?id=$r1>&#10007;</a></td>" .
                "<td><a href=updateItem.php?id=$r1>&#9997;</a></td>" . '</tr>';
        }


        $myTable .= '</table>';
        return $myTable;
    }


    static function SelectItemsForOrder(){
        $db = mysqli_connect("localhost", "root", "" , "restaurant");
        $sql = "SELECT * FROM items WHERE Item_isDeleted = '0' ORDER BY Items_id;";
        $result = mysqli_query($db, $sql);
        $table = new table();
        $myTable = $table->generateItemsTableForOrders();

        while($row = mysqli_fetch_array($result)){
            $r1 = $row['Items_id'];
//            $r2 = $row['Name'];
            $myTable .= '<tr> <td>' . $row['Items_id'] . '</td>' .
                '<td>' . $row['Name'] . '</td>' .
                '<td>' . $row['Current_Price'] . '</td>' .
                '<td>' . '<input type="number" name="quantity[]">' . '</td>' .

                "<td> <input type='checkbox' name='items[]' value='$r1'> </td>" . '</tr>';
        }


        $myTable .= '</table>';
        return $myTable;
    }


    static function itemsReference(){
        $sql = "SELECT * FROM items;";
        $db = mysqli_connect("localhost", "root", "" , "restaurant");
        return mysqli_query($db, $sql);
    }

    
      static function DeleteItem($id){
        $sql = "UPDATE items SET Item_isDeleted = '1' WHERE Items_id = " . $id;
        $db = mysqli_connect("localhost", "root", "", "restaurant");
        $result = mysqli_query($db, $sql);
    }
    
    
}


?>