<a href="../category/addCategory.php"> Add Categories </a> <br> <hr> <br>

<?php

include ('../../text-php/dbConn.php');

?>
    <form method="post">
        Name : <input placeholder="add name" type="text"  name="add_item"><br>
        Current price : <input placeholder="add price" type="text" name="price"><br>
        Quantity : <input placeholder="quantity" type="text" name="quantity"><br>

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

<?php
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    include ('items.php');
    $add_item = $_POST['add_item'];
    $price = $_POST['price'];
    $quantity = $_POST['quantity'];
    $category = $_POST['catname'];
    
    $firstItem = new items($add_item,$price,$quantity,$category);
    $result = items::itemsReference();


    if (mysqli_num_rows($result) == 0)
        $firstItem->additem();
    else {
        $identical = 0;
        while ($row = mysqli_fetch_array($result)) {
            if (strcasecmp($row['Name'], $add_item) == 0)
                $identical++;
        }

        if ($identical == 0)
            $firstItem->additem();
    }

    header('Location: http://localhost/Web/restaurant-project/admin-panel/item/listItems.php');
}

?>



<?php

include ("items.php");

//AJAX
echo items::SelectAllItems();

?>