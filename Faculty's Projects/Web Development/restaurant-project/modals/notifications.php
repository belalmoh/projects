<div class="modal fade" id="notificationModal" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Notifications</h4>
            </div>
            <div class="modal-body">

                <?php
                include ('text-php/dbConn.php');

                $sql = "SELECT `FROM`, Body FROM notifications WHERE TO_User_ID ='".$_SESSION['ID'] . "';";
                $result = mysqli_query($db, $sql);

                echo '<table border="1"> <th>FROM</th> <th>Body</th>';
                while($row = mysqli_fetch_array($result)){
                    echo '<tr>';
                    echo '<td>' . $row['FROM'] . '</td>';
                    echo '<td>' . $row['Body'] . '</td>' . '</tr>';
                }
                echo '</table>';

                ?>

            </div>
        </div>
    </div>
</div>
