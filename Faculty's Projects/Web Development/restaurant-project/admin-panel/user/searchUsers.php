<script>
    function getRecord(id,email){
        if(id==null)
            id = ""
        else if(email==null)
            email = ""
        
        var xmlhttp = new XMLHttpRequest() ;
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                document.getElementById("result").innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "sSearch.php?email="+email+"&id="+id, true);
        xmlhttp.send();
    }
</script>

<form method="post">
    <h3>You can search using either ID or Email.</h3>
    <input type="text" name="search_email" placeholder="Email" onkeyup="getRecord(null, this.value)"> <br>
    <input type="text" name="search_id" placeholder="ID" onkeyup="getRecord(this.value, null)"> <br>

    <input type="reset">
</form>

<p id="result"></p>
