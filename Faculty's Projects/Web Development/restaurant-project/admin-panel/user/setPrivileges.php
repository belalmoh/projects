
<?php
    include('../../text-php/user.php');
    
    echo user::editPrivilege();

?>

<p id="txtHint"></p>

<script>
    function changePrivilege(value, name){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "updatePrivilege.php?page="+value+"&user="+name, true);
        xmlhttp.send();
    }


</script>