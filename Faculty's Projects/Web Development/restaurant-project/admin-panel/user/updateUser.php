<?php
include ('../../text-php/dbConn.php');
$id=$_GET["id"];
$sql = "SELECT * FROM user WHERE User_ID =" . $id;
$result = mysqli_fetch_array(mysqli_query($db, $sql));

if($_SERVER['REQUEST_METHOD'] == 'POST') {

    $fname = $_POST['update_fname'];
    $lname = $_POST['update_lname'];
    $mobile = $_POST['update_mob'];
    $pass = $_POST['update_pass'];
    $address = $_POST['address_list'];

    $sql = "UPDATE user SET FirstName = '$fname', LastName = '$lname' , Mobile = '$mobile' , Address_ID_Address_PK = '$address' , Password = '$pass'  WHERE `user`.`User_ID` = '$id' ;";
    mysqli_query($db, $sql);
}

?>
<!--Form of update-->

<script>
    function echoText(text, id){
        var xmlhttp = new XMLHttpRequest() ;
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200 && id == "list1"){
                document.getElementById("list2").innerHTML = xmlhttp.responseText;
            } else if(xmlhttp.readyState == 4 && xmlhttp.status == 200 && id == "list2"){
                document.getElementById("list3").innerHTML = xmlhttp.responseText;
            }
        }

        xmlhttp.open("GET", "../../text-php/Address_Query.php?var=" + text, true);
        xmlhttp.send();
    }
</script>

<form method="post">
    <input type="text" placeholder="First Name" value="<?php echo $result['FirstName'] ?>" name="update_fname"> <br> <br>
    <input type="text" placeholder="Last Name" value="<?php echo $result['LastName'] ?>" name="update_lname"> <br> <br>
    <input type="tel" placeholder="Mobile" value="<?php echo $result['Mobile'] ?>" name="update_mob"> <br> <br>
    <input type="text" placeholder="Email" value="<?php echo $result['Email'] ?>" disabled> <br> <br>
    <input type="password" value="<?php echo $result['Password'] ?>" name="update_pass"> <br> <br>


<?php
$sql = "SELECT * from address WHERE Address_ID = 0";

$result = mysqli_query($db, $sql);

echo "<select id='list1' onchange='echoText(this.value, this.id)' required>";
echo "<option> </option>";

while($row = mysqli_fetch_array($result)){


    $r1 = $row['ID_Address_PK'];
    $r2 = $row['City'];
    $r3 = $row['Address_ID'];
    echo "<option value='$r1' name='$r2'>". $row['City'] ."</option>";

}
echo "</select>";
?>


<?php

echo "<select id='list2' onchange='echoText(this.value, this.id)' required>";
echo "<option> </option>";
echo "</select>";
?>


<select id="list3" onchange="echoText(this.value, this.id)" name="address_list" required>
    <?php
    echo "<option> </option>";
    echo "</select>";
    ?>

    <br> <br>
    <input type="submit" value="Update">

</form>