<?php
include ('../../text-php/dbConn.php');

$id=$_GET["id"];
$sql = "SELECT * FROM item_category WHERE ID_Item_Category =" . $id;
$result = mysqli_fetch_array(mysqli_query($db, $sql));

if($_SERVER['REQUEST_METHOD'] == 'POST') {

    $name = $_POST['update_name'];

    $sql = "UPDATE item_category SET Category_Name = '$name' WHERE `item_category`.`ID_Item_Category` = '$id' ;";
    mysqli_query($db, $sql);

    header('Location: http://localhost/Web/restaurant-project/admin-panel/category/listCategory.php');
}

?>
<!--Form of update-->

<form method="post">
  Name : <input type="text" value="<?php echo $result['Category_Name'] ?>" name="update_name"><br>
    
  
   
  <input type=submit>
  </form>