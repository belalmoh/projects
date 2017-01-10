<?php

include('../../text-php/dbConn.php');
include('../../text-php/tableViewer.php');

class report
{
   
     static function SelectAllReportOrder(){
         
        $db = mysqli_connect("localhost", "root", "" , "restaurant");
        $sql4 = "SELECT * FROM report_order;";
        $result4 = mysqli_query($db, $sql4);
        $table = new table();
        $myTable = $table->generateReportOrderTable();

        while($row = mysqli_fetch_array($result4)){
            
            $r1 = $row['Report_Order_ID'];
    
            $myTable .= '<tr> <td>' . $row['Report_Order_ID'] . '</td>' .
                '<td>' . $row['SQL_Statement'] . '</td>' .
                '<td>' . $row['Total_Price'] . '</td>' .
                '<td>' . $row['order_details_id_OrderDetails'] . '</td>' .  
                '</tr>';
        }
        $myTable .= '</table>';
        return $myTable;
     }
         
        static function SelectAllReportReservation(){ 
         
        $db = mysqli_connect("localhost", "root", "" , "restaurant");
        $sql5 = "SELECT * FROM report_reservations;";
        $result5 = mysqli_query($db, $sql5);
        $table1 = new table();
        $myTable1 = $table1->generateReportReservationTable();

        while($row1 = mysqli_fetch_array($result5)){
            
            $r2 = $row1['Report_Reservations_ID'];
    
            $myTable1 .= '<tr> <td>' . $row1['Report_Reservations_ID'] . '</td>' .
                '<td>' . $row1['SQL_Statement'] . '</td>' .
                
                '<td>' . $row1['reservation_id_Reservation'] . '</td>' .  
                '</tr>';
        }
        $myTable1 .= '</table>';
         
        
        return $myTable1;
         
    }
    
 
    







}


    echo report::SelectAllReportOrder(); 
    echo report::SelectAllReportReservation();

?>