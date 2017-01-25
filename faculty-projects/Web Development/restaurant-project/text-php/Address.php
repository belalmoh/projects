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

            xmlhttp.open("GET", "text-php/Address_Query.php?var=" + text, true);
            xmlhttp.send();
        }
    </script>


<?php
include('dbConn.php');

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
