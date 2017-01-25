<?php
include ('../../text-php/dbConn.php');
include ('items.php');
$id=$_GET["id"];
$sql = "SELECT * FROM items WHERE Items_id =" . $id;
$result = mysqli_fetch_array(mysqli_query($db, $sql));

if($_SERVER['REQUEST_METHOD'] == 'POST') {

    $name = $_POST['update_name'];
    $currentPrice = $_POST['update_price'];
    $quantity = $_POST['update_quantity'];
    $CATID = $_POST['catname'];

    $sql = "UPDATE items SET Name = '$name', Current_Price = '$currentPrice' , Quantity = '$quantity' , Item_Category_ID_Item_Category='$CATID'  WHERE `items`.`Items_id` = '$id' ;";
    
    $result = items::itemsReference();

    if (mysqli_num_rows($result) == 0)
        mysqli_query($db, $sql);
    else {
        $identical = 0;
        while ($row = mysqli_fetch_array($result)) {
            if (strcasecmp($row['Name'], $name) == 0)
                $identical++;
        }

        if ($identical == 0)
            mysqli_query($db, $sql);
    }


    header('Location: http://localhost/Web/restaurant-project/admin-panel/item/listItems.php');
}

?>
<!--Form of update-->

<form method="post">
  Name : <input type="text" value="<?php echo $result['Name'] ?>" name="update_name"><br>
  Current Price : <input type="text" value="<?php echo $result['Current_Price'] ?>" name="update_price"><br>
  Quantity : <input type="text"  value="<?php echo $result['Quantity'] ?>" name="update_quantity"><br>
   
  <?php 
  echo "<select name='catname' >";
                
  
  $sql = "SELECT * from item_category;";
  $result = mysqli_query($db,$sql);
  $counter = 1;
  while($row = mysqli_fetch_array($result)){
  $catID = $row['ID_Item_Category'];
  echo "<option value='$catID'>" . $row['Category_Name'] . "</option>";
  }
  echo "</select>";
  ?>
   
  <input type=submit>
  </form>