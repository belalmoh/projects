<!DOCTYPE html>
<html>
<head>
    <title>Your Restaurant</title>
    <meta charset="UTF-8">
    <!-- CDN to use bootstrap instead of downloading it -->
    <!-- start of cdn -->
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <!-- end of cdn -->
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="assets/js/script.js" type="text/javascript"></script>
</head>
<!--This is to tell the body that what is your scrollable area and its target-->
<body data-spy="scroll" data-target=".navbar" data-offset="50">

<!--  definition of the navbar using bootstrap classes  -->
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <!-- resize the page and you'll see 3 lines -->
                <span class="icon-bar"></span> <!-- first line -->
                <span class="icon-bar"></span> <!-- second line -->
                <span class="icon-bar"></span>  <!-- third line -->
            </button>
            <!-- Hena ba2olo law dost 3la website name, scroll to the top of the page -->
            <a class="navbar-brand" href="#" onclick="window.scrollTo(0,0);">Logo of Restaurant</a>
        </div>
        <div>
            <!-- definition of the items elly gowa el list -->
            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav">
                    <li><a href="#section1">History &amp; About</a></li>
                    <li><a href="#section3">Menu</a></li>
                    <li><a href="#section4">Contact Us</a></li>
                    <li><a href="#Reserve" data-toggle="modal" data-target="#myModal">Reserve A Table</a></li>
                    <li><a href="#Notifications" data-toggle="modal" data-target="#notificationModal">Notifications</a></li>


                </ul> <!-- end of list items defintion -->


                <!--Definition of the Login & Signup buttons-->
                <ul class="nav navbar-nav navbar-right">
                    <li> <p id="login_use_name" style="color: white; margin-right: 50px; margin-top: 15px;"> Hello :
                            <?php session_start(); echo $_SESSION['Name']; ?> </p> </li>
                    <li><a href="#" id="logoutBtn" onclick="logout();"><span class="glyphicon glyphicon-log-out"></span> Logout </a></li>
                </ul><!--End of Definition of the Login & Signup buttons-->

            </div>
        </div>
    </div>
</nav>

<?php include('modals/Registration.php'); ?>
<?php include('modals/login.php'); ?>
<?php include('modals/reservation.php'); ?>
<?php include('modals/notifications.php'); ?>



<div id="section1" class="container-fluid">
    <h1 style="font-family: Georgia">Get to know us!</h1>

    <h2><br><i><img src="assets/img/businessman-xxl.png" width="70" height="80"> Owner:James McAdams</i></h2>
    <h3><br><i><img src="assets/img/chef_318-61372.png" width="70" height="80"> Chef:Ramerez Nouzuka</i></h3>
    <br>
    <br>
    <p>[Restaurant Name] first opened its doors in 2000 in the United States.After 5 years , we hosted a grand opening for our first international branch in Dubai. A couple of years later , we expanded globally and we currrently have 50 branches.<br>
        [Restaurant Name] is most famous for its middle-eastern cuisine , as well as its authentic , vintage design.<br>
        What makes us standout from other restaurants , is that our menu provides a wide range of cuisines to statisfy each and every customer that dines in .Also , we offer our regular customers with discounts , free meals and many more.
    </p>

</div>



<div id="section3" class="container-fluid">
    <h2>Main Menu</h2>
    <form id="items" action="admin-panel/order/addOrder.php">
        <?php $_SESSION['ID']; ?>
        <input type="submit" class="btn btn-info" value="Order">
    </form>

    <br> <br>

</div>





<div id="section4" class="container-fluid">
    <h1 style="font-family:Georgia">Contact US</h1>

    <br>
    <h2 style="color:black; text-align:left ;font-size:30px ;font-family:Georgia">Find us in Egypt:</h2>
    <p><b>
            Dokki-(+20)1050069
            <br>
            Maadi-(+20)11113456
            <br>
            Mohandeseen-(+20)111456788
        </b></p>
    <h3 style="color:black; text-align:left ;font-size:30px ;font-family:Georgia">Find us internationally too! </h3>

    <p><b>
            Dubai-(+971)556789923
            <br>
            Bahrain(+973)3987654
            <br>
            Kuwait(+965)44467885
        </b></p>

    <p>For any complaints or suggestions please fill in
        <a href="#" id="contactUs" data-toggle="modal" data-target="#contactModal">this</a> form.</p>
    <p>Leave us a message</p>



    <p>
        <a href="http://facebook.com"><img src="assets/img/facebook.png" alt="facebook" width="60" height="40"></a>
        <a href="http://instagram.com"><img src="assets/img/instagram.jpg" alt="instagram" width="60" height="40"></a>
        <a href="http://twitter.com"><img src="assets/img/twitter.gif" alt="twitter" width="60" height="40"></a>

    </p>



</div>
<?php include('modals/order.php'); ?>
<?php include('modals/contact.php'); ?>


</body>
</html>
<!-- At the end bec it's the last nav item of navbar -->


