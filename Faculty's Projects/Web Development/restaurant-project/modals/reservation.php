<div class="modal fade" id="myModal" role="dialog">
		<div class="modal-dialog">
    	<!-- Modal content-->
		<div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Reservation</h4>
        </div>
        <div class="modal-body">
		<form name="myForm" method="post" id="myform" action="text-php/ReservationDB.php">
			<h4>Branch</h4>
				<select id="SB" name="Thebranch">
  					<option value="" selected></option>
					<option value="Egypt-Dokki">Egypt-Dokki</option>
					<option value="Egypt-Maadi">Egypt-Maadi</option>
					<option value="Egypt-Mohandeseen">Egypt-Mohandeseen</option>
  					<option value="Dubai">Dubai</option>
  					<option value="Bahrain">Bahrain</option>
  					<option value="Kuwait">Kuwait</option>
				</select>
			<h4>Date</h4>
				<input type="date" id="DATE" name="Thedate">
			<h4>Time</h4>
				from
				<select id="T1" name="FromTime">
	  				<option value="" selected></option>
  					<option value="17">5 PM</option>
					<option value="18">6 PM</option>
					<option value="19">7 PM</option>
					<option value="20">8 PM</option>
					<option value="21">9 PM</option>
  					<option value="22">10 PM</option>
  					<option value="23">11 PM</option>
					<option value="24">12 AM</option>
					<option value="25">01 AM</option>
				</select>
				to
				<select id="T2" name="ToTime">
					<option value="" selected></option>
					<option value="18">6 PM</option>
					<option value="19">7 PM</option>
					<option value="20">8 PM</option>
					<option value="21">9 PM</option>
  					<option value="22">10 PM</option>
  					<option value="23">11 PM</option>
  					<option value="24">12 AM</option>
					<option value="25">01 AM</option>
					<option value="26">02 AM</option>
				</select>
			<h4>Number of persons</h4>
				<select id="NOP" name="Persons">
  					<option value="" selected></option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
				</select>
			<h4>Table</h4>
				<select id="T" name="TheTable">
	  				<option value="" selected></option>
					<?php
						include ('text-php/dbConn.php');
						include ('text-php/Tables.php');
						echo Tables::ListTables();
					?>
				</select>
			<div><br><button type="submit" >Reserve a table</button><br></div>



		</form>
			<p align="right">
				<form action="text-php/userHistory.php" method="get">
					<?php $_SESSION['ID']; ?>
			    	<button type="submit" > History of Reservation </button>
        		</form>
			</p>
		</div>
		</div>    
		</div>
		</div>
	