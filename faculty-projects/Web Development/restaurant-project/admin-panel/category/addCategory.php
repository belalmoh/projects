<form method="post">
  Name : <input type="text"  name="add_category"><br>
    
  
   
  <input type=submit>
  </form>

<?php

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    include('item_category.php');
    $db = mysqli_connect("localhost", "root", "", "restaurant");
    $categoryName = $_POST['add_category'];

    $newCategory = new item_category($categoryName);
    $result = $newCategory->CategoriesReference();

    if (mysqli_num_rows($result) == 0)
        $newCategory->addCategory();
    else {

        $identical = 0;
        while ($row = mysqli_fetch_array($result)) {
            if (strcasecmp($row['Category_Name'], $categoryName) == 0)
                $identical++;
        }

        if ($identical == 0)
            $newCategory->addCategory();
    }

    header('Location: http://localhost/Web/restaurant-project/admin-panel/category/listCategory.php');
}


?>