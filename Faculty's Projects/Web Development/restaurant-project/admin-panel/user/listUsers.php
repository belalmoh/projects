<?php

include ('../../text-php/user.php');
include ('../../text-php/dbConn.php');

?>

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
    <b> <p>Add User</p> </b>
    <input type="text" name="new_fname" placeholder="First Name"> <br>
    <input type="text" name="new_lname" placeholder="Last Name"> <br>
    <input type="text" name="new_mobile" placeholder="Mobile"> <br>
    <input type="text" name="new_email" placeholder="Email"> <br>
    <!--  Address Part   -->



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


        <br>
        <input type="password" name="new_pass" placeholder="password"> <br>
        <input type="password" name="new_confpass" placeholder="confirm password"> <br>

        <br> <br>
        <input type="submit" value="Add new user">

</form>

<?php


if($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['new_pass'] == $_POST['new_confpass']) {
    $fname = $_POST['new_fname'];
    $lname = $_POST['new_lname'];
    $mob = $_POST['new_mobile'];
    $email = $_POST['new_email'];
    $pass = $_POST['new_pass'];
    $address = $_POST['address_list'];

    $firstUser = new user($fname, $lname, $email, $pass, $address , $mob);
    $lastId = $firstUser->ListIDS($db);
    $lastId +=1;
    $firstUser->addUser();
    mysqli_query($db, $firstUser->setUserPrivilege(7, $lastId));
}


?>


<?php




echo user::SelectAllUsers();


?>





