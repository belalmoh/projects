<?php

include ('../../text-php/dbConn.php');
include('../../text-php/tableViewer.php');

class item_category
{
    private $name;
    private $db;
    
    function __construct($Category_Name)
    {
        $this->name = $Category_Name;
        $this->db = $GLOBALS['db'];
    }
    
      function addCategory()
      {
        $sql = "INSERT INTO item_category (Category_Name) VALUES ('$this->name');";
        mysqli_query($this->db, $sql);
      }

    function CategoriesReference(){
        $sql = "SELECT * FROM item_category;";
        $db = mysqli_connect("localhost", "root", "" , "restaurant");
        return mysqli_query($db, $sql);
    }
    
    
      static function SelectCategory(){
        $db = mysqli_connect("localhost", "root", "" , "restaurant");
        $sql = "SELECT * FROM item_category ORDER BY ID_Item_Category;";
        $result = mysqli_query($db, $sql);
        $table = new table();
        $myTable = $table->generateCategoryTable();

        while($row = mysqli_fetch_array($result)){
            $r1 = $row['ID_Item_Category'];
            $myTable .= '<tr> <td>' . $row['ID_Item_Category'] . '</td>' .
                '<td>' . $row['Category_Name'] . '</td>' . 
                "<td><a href=deleteCategory.php?id=$r1>&#10007;</a></td>" .
                "<td><a href=updateCategory.php?id=$r1>&#9997;</a></td>" . '</tr>';
        }


        $myTable .= '</table>';
        return $myTable;
    }
    
      static function DeleteCategory($id){
        $sql = "DELETE FROM item_category WHERE ID_Item_Category = " . $id;
        $db = mysqli_connect("localhost", "root", "", "restaurant");
        $result = mysqli_query($db, $sql);
    }
    
    
}


?>