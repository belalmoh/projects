<!-- Modal -->
  <div class="modal fade" id="regModal" role="dialog">
    <div class="modal-dialog modal-lg">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Registration</h4>
        </div>
        <div class="modal-body">
          <form method="post" class="form-horizontal" onsubmit="return verify1();" action = "text-php/RegDB.php">
            <div class="panel panel-info">
              <div class="panel-heading">Personal Information</div>
              <div class="panel-body">
                
                    <div class="form-group">
                      <label class="control-label col-sm-2">First Name</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" name="first_name" placeholder="First Name">
                          <span id="helpBlock1" class="help-block" style="color: red"></span>
                      </div>
                    </div>
                    
                    <div class="form-group">
                      <label class="control-label col-sm-2">Last Name</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" name="last_name" placeholder="Last Name">
                          <span id="helpBlock2" class="help-block" style="color: red"></span>
                      </div>
                    </div>
                    
                    <div class="form-group">
                      <label class="control-label col-sm-2">Mobile Number</label>
                      <div class="col-sm-10">
                        <input type="tel" class="form-control" name="mob_num" placeholder="Mobile Number">
                          <span id="helpBlock3" class="help-block" style="color: red"></span>
                      </div>
                    </div>
                  
                </div>
                
                <div class="panel-heading">Address Information</div>
                    <div class="panel-body">

                        <div class="form-group">
                            <label class="control-label col-sm-2">Address</label>
                            <div class="col-sm-10">
                                <?php include('text-php/Address.php'); ?>
                                <span id="helpBlockAdd" class="help-block" style="color: red"></span>
                            </div>
                        </div>
                    </div>
                
                <div class="panel-heading">Account Information</div>
                    <div class="panel-body">

                        <div class="form-group">
                            <label class="control-label col-sm-2">E-mail</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" name="email_reg" placeholder="E-mail">
                                <span id="helpBlock4" class="help-block" style="color: red"></span>
                            </div>
                        </div>      
                            

                            <div class="form-group">
                              <label class="control-label col-sm-2">Password</label>
                              <div class="col-sm-10">
                                <input type="password" class="form-control" name="password" placeholder="Password">
                                  <span id="helpBlock9" class="help-block" style="color: red"></span>
                              </div>
                            </div>

                            <div class="form-group">
                              <label class="control-label col-sm-2">Confirm Password</label>
                              <div class="col-sm-10">
                                <input type="password" class="form-control" name="password_confirm" placeholder="Confirm Password">
                                  <span id="helpBlock10" class="help-block" style="color: red"></span>
                              </div>
                            </div>
                        
                        
                        <div class="form-group" style="text-align: center;">        
                    
                            <input type="submit" class="btn btn-default" id="submit_button" value="Register" onclick="verify1()">
                            <input type="reset" class="btn btn-default" id="reset_button" value="Reset">      
                            
                        </div>      
                </div>
            </div>
                   
            </form>
        </div>
          
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
