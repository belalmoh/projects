<script>
    function changePrivilege(value, name){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
            }
        };
        xmlhttp.open("GET", "updatePrivilege.php?val=" + value + "&name=" + name, true);
        xmlhttp.send();
    }
</script>

<?php

/**
 * Created by PhpStorm.
 * User: iBelal
 * Date: 5/13/2016
 * Time: 4:07 PM
 */
class table
{
    function showAddress($add, $db){
        $sql = "SELECT * FROM address WHERE ID_Address_PK = " . $add;
        $result = mysqli_fetch_array(mysqli_query($db, $sql));

        $retAdd = $result['City'];

        while($result['Address_ID'] != 0){
            $sql = "SELECT * FROM address WHERE ID_Address_PK = " . $result['Address_ID'];
            $result = mysqli_fetch_array(mysqli_query($db, $sql));

            $retAdd .=  " - " . $result['City'];
        }

        return $retAdd;
    }

    function generateUserTable(){
        $myTable = '<table border="1"> 
                <th>ID</th> 
                <th>First Name</th>
                <th>Last Name</th>
                <th>Mobile Number</th>
                <th>Address</th>
                <th>Email</th>
                <th>Password</th>
                <th>DELETE</th>
                <th>UPDATE</th>';

        return $myTable;
    }

    function generateUserPrivilege(){
        $myTable = '<table border="1"> 
                <th>ID</th> 
                <th>First Name</th>
                <th>Last Name</th>
                <th>Mobile Number</th>
                <th>Address</th>
                <th>Email</th>
                <th>Password</th>
                <th colspan="5">Privilege</th>';

        return $myTable;
    }

    function generateCategoryTable(){
        $myTable = '<table border="1"> 
                    <th>ID</th> 
                    <th>Name</th>
                    <th>DELETE</th>
                    <th>UPDATE</th>';

        return $myTable;

    }

    function generateItemsTable(){
        $myTable = '<table border="1"> 
                <th>ID</th> 
                <th>Name</th>
                <th>Current price</th>
                <th>Quantity</th>
                
                <th>DELETE</th>
                <th>UPDATE</th>';

        return $myTable;
    }

    function generateItemsTableForOrders(){
        $myTable = '<table border="1"> 
                <th>ID</th> 
                <th>Name</th>
                <th>Current price</th>
                <th>Quantity</th>    
                <th>SELECT</th>';

        return $myTable;
    }



    function generateTablesTable()
    {
        $myTable = '<table border="1"> 
                <th>ID</th> 
                <th>Max</th>
                <th>DELETE</th>
                <th>UPDATE</th>';

        return $myTable;
    }

    function generateReservationTable()
    {
        $myTable = '<table border="1"> 
                <th>Table_ID</th>
                <th>User_ID</th>
                <th>from</th>
                <th>to</th>
                <th>Date</th>
                <th>parsons</th>
                <th>Branch</th>
                <th>DELETE</th>
                <th>UPDATE</th>';

        return $myTable;
    }

    function user_HistoryOfReservations()
    {
        $myTable = '<table border="1"> 
                <th>Date</th>
                <th>Branch</th>
                <th>Table Number</th>
                <th>Time from</th>
                <th>Time to</th>
                <th>parsons</th>';

        return $myTable;
    }

    function generateDeletedReservationTable()
    {
        $myTable = '<table border="1"> 
                <th>Table_ID</th>
                <th>User_ID</th>
                <th>from</th>
                <th>to</th>
                <th>Date</th>
                <th>parsons</th>
                <th>Branch</th>';

        return $myTable;
    }


    function generateReportOrderTable(){
        $myTable = '<table border="1"> 
                    <th>ID</th> 
                    <th>SQL</th>
                    <th>Price</th>
                    <th>order details ID</th>';

        return $myTable;

    }
    function generateReportReservationTable(){
        $myTable = '<table border="1"> 
                    <th>ID</th> 
                    <th>SQL</th>
                    <th>Reservation ID</th>';


        return $myTable;

    }



}