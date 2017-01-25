<div class="modal fade" id="loginModal" role="dialog">
                <div class="modal-dialog">
                    
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">Close</button>
                            <h4 class="modal-title"> Login Form</h4>
                            
                        </div>
                        <div id="bodyy" class="modal-body" >
                            <form id="form" action="text-php/loginDB.php" method="post">
                                <b> <p> for admin privileges, username: admin. password: admin. </p> </b>
                                UserName : <br><input id="email" onblur="checkEmail_login();" type="text" name="email" placeholder="Enter Email"><br>
                                Password          : <br><input id="password" onblur="checkPassword_login();" type="password" name="password" ><br>
                                <button onclick="" type="submit">LOGIN</button>
                                <br>
                            </form>
                        </div>
                     </div>
                 </div>
            </div>