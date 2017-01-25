<?php
include ('dbConn.php');
include ('ReservationTableDB.php');

if($_SERVER['REQUEST_METHOD']=='POST')
{
    session_start();
    $ID = $_SESSION['ID'] ;
    $from = $_POST['FromTime'];
    $to = $_POST['ToTime'];
    $date = $_POST['Thedate'];
    $persons = $_POST['Persons'];
    $branch = $_POST['Thebranch'];
    $tableNum = $_POST['TheTable'];
    $table = new reserve_table($from,$to,$date,$persons,$branch,$tableNum,$ID);

    $sql = "SELECT * FROM reservation;";
    $result = mysqli_query($db, $sql);

    if (mysqli_num_rows($result) == 0)
    {
        $table->addReservation();
    }
    else
    {
        $identical = 0;
        while ($row = mysqli_fetch_array($result))
        {
                if (($tableNum == $row['Table_Table_id']) && ($date == $row['Date_Reservation']) && ($branch == $row['Branch']) && $from == $row['Time_From'] && $to == $row['Time_To'])
                {
                    $identical++;
                    echo ('Table Reserved');
                }
               /* else if (($tableNum == $row['Table_Table_id']) && ($date == $row['Date_Reservation']) && ($branch == $row['Branch']) && $from < $row['Time_From'] && $from < $row['Time_To'])
                {
                    $identical++;
                    echo ('Table Reserved');
                }*/
        }
        if ($identical == 0)
            $table->addReservation();
    }
}
?>