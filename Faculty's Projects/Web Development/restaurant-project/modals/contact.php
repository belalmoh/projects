<div id="contactModal" class="modal fade" role="dialog">
  
<div class="modal-dialog modal-lg">

    
<!-- Modal content-->		
    
<div class="modal-content">
      
<div class="modal-header">
        
<button type="button" class="close" data-dismiss="modal">&times;</button>
        
<h2 class="modal-title">Get In Touch</h2>
</div>
      
<div class="modal-body">
        	
<div id="p1"><p><h4>If you have any comments or an inquiry don't hesitate to leave a message by filling out this form. Please note that you will receive a reply within 48 hours.</h4></p></div>

			
<div id="p2">
		
<form name="ContactUs" onsubmit="return validateForm();" method = "post" action = "admin-panel/messages/addMessage.php">
					
<div><p>
				
					
<input id="inName" name = "name" placeholder="Name:" type = "text">
				
			
</p></div>

			
<div><p>
				
					
<input id="inEmail" name = "email" placeholder= "Email:" type = "text" >
				
			
</p></div>

			
<div><p>
				
					
<input id="inPhone" name = "number" placeholder= "Phone:" type = "text" >
				
			
</p></div>
			
			
<div><p>
				
					
<textarea id="inMessage" name = "message" placeholder="Message:" rows="5" cols="27"></textarea>		
				
			
</p></div>

			
<div><p>
				
<button type="submit" onclick="validateForm()">Send Message</button>
				
<input type = "reset" value = "Clear">
			
</p>
		
</div>
		
</div>
		
</form>
      
      
<div class="modal-footer">
        
<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      
</div>
      
</div>
      
   
</div>