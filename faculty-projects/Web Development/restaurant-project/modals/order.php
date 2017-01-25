<script>

function exitModal(){
    document.getElementById('orders').innerHTML = "";
}

    function printIt(){
        var orderList = document.getElementById("orders").innerHTML;
        var list_array = new Array();

        
    }
    
</script>
<div class="modal fade" id="orderModal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" onclick="exitModal()" class="close" data-dismiss="modal">Close</button>
                    <h4 class="modal-title"> You've Choosed the following </h4>
             </div>
        
            <div id="modalbody" class="modal-body">
              
                <p id="orders"></p>

                <button class="btn btn-info" onclick="printIt()">Order it.</button>
                
            </div>
        </div>
    </div>
</div>