// START OF REGISTRATION'S VALIDATION.
function logout(){
    window.location = "http://localhost/Web/restaurant-project/"
}

function verify1(){
    var fn          = checkFN();
    var ln          = checkLN();
    var mob         = checkMOB();
    var email       = checkInEmail();
    var pass        = checkInPass();
    var conf_pass   = confirmPass();
    // var add         = checkAdd();


    if(fn && ln && mob && email && pass && conf_pass){

        return true;
    } else {
        
        return false;
    }



}

function checkFN(){
    var fName = document.getElementsByName('first_name')[0];
    var patt = new RegExp("[a-zA-Z]{3,}$");

    if(fName.value == undefined || fName.value == ""){
        document.getElementById("helpBlock1").innerHTML = "Please fill in First name field.";
        return false;
    } else {
        if(patt.test(fName.value) == false){
            document.getElementById("helpBlock1").innerHTML = "Enter First name of Alphabets only size > 3.";
            fName.value = "";
            return false;
        } else {
            return true;
        }

    }
}

function checkAdd(){
    var list1 = document.getElementById("list1");
    var list2 = document.getElementById("list2");
    var list3 = document.getElementById("list3");

    if(list1.value && list2.value && list3.value){
        document.getElementById("helpBlockAdd").innerHTML = "Address is required";
        return false;
    } else
        return true;
}

function checkLN(){
    var lName = document.getElementsByName('last_name')[0];
    var patt = new RegExp("[a-zA-Z]{3,}$");

    if(lName.value == undefined || lName.value == ""){
        document.getElementById("helpBlock2").innerHTML = "Please fill in Last name field.";
        return false;
    } else {
        if(patt.test(lName.value) == false){
            document.getElementById("helpBlock2").innerHTML = "Enter Last name of Alphabets only size > 3";
            lName.value = "";
            return false;
        } else {
            return true;
        }

    }
}


function checkMOB(){
    var Mob = document.getElementsByName('mob_num')[0];
    var patt = new RegExp("[0-9]{5,}$");


    if(Mob.value == undefined || Mob.value == ""){
        document.getElementById("helpBlock3").innerHTML = "Please fill in mobile field";
        return false;
    } else {
        if(patt.test(Mob.value) == false){
            document.getElementById("helpBlock3").innerHTML = "Enter numbers only size > 5";
            Mob.value = "";
            return false;
        } else {
            return true;
        }

    }
}

function checkInEmail(){
    var eMail = document.getElementsByName('email_reg')[0];
    var patt = new RegExp("[a-zA-Z0-9]+[-_\.]*@[a-z]{2,6}\.[a-z]{2,7}$");


    if(eMail.value == undefined || eMail.value == ""){
        document.getElementById("helpBlock4").innerHTML = "Please fill in email field";
        return false;
    } else {
        if(patt.test(eMail.value) == false){
            document.getElementById("helpBlock4").innerHTML = "Please enter email in its correct scheme";
            eMail.value = "";
            return false;
        } else {
            return true;
        }

    }
}

function checkInPass(){
    var Pass = document.getElementsByName('password')[0];
    var patt = new RegExp("[^!@#\$%\^\(\)-\. ]{3,20}$");

    if(Pass.value == undefined || Pass.value == ""){
        document.getElementById("helpBlock9").innerHTML = "Please fill in Password field.";
        return false;
    } else {
        if(patt.test(Pass.value) == false){
            document.getElementById("helpBlock9").innerHTML = "Enter password without special characters w/ 5 < size < 20";
            Pass.value = "";
            return false;
        } else {
            return true;
        }

    }
}

function confirmPass(){
    var pass1 = document.getElementsByName('password')[0];
    var pass2 = document.getElementsByName('password_confirm')[0];

    if(pass1.value == undefined || pass1.length == ""){
        document.getElementById("helpBlock10").innerHTML = "Please fill in password field.";
        return false;
    } else {
            if(pass1.value != pass2.value){
                document.getElementById("helpBlock10").innerHTML = "Passwords are not the same";
                pass2.value = "";
                return false;
            } else {
                return true;
            }
        }

    }

// END OF REGISTRATION'S VALIDATION.


// START OF LOGIN VALIDATION.

function checkEmail_login(){
    
    var x = document.getElementById("email");
    var y= new RegExp("[!#$%\^&*\(\) ]");
    
    if(y.test(x.value)==true || x.value==null || x.value==undefined || x.value.length == 0){
        alert("Enter the correct username.");
        return false;
    } else
        return true
    
       
}

function checkPassword_login(){
    
    var x = document.getElementById("password");
    if (x.value.length >=20 || x.value ==" " || x.value ==null){
        alert("Length of password shouldn't exceed 20");
        return false;
    } else
        return true;
}

function verify_login(){
    checkEmail_login();
    checkPassword_login();
}

// END OF LOGIN VALIDATION.


// START OF ORDER VALIDATION.


function validateOrders(){
    
    var sweetsTable = document.getElementById("sweets");
    var juicesTable = document.getElementById("juices");
    var foodTable = document.getElementById("food");
    
    
    for(var i = 1; i < sweetsTable.rows.length; i++){
        if(document.getElementsByName("sw"+i+"")[0].checked){
            document.getElementById('orders').innerHTML += sweetsTable.rows[i].cells[1].innerHTML + "<br>";
        } 
    }
    
    for(var i = 1; i < juicesTable.rows.length; i++){
        if(document.getElementsByName("ju"+i+"")[0].checked){
            document.getElementById('orders').innerHTML += juicesTable.rows[i].cells[1].innerHTML + "<br>";
        } 
    }
    
    for(var i = 1; i < foodTable.rows.length; i++){
        if(document.getElementsByName("fd"+i+"")[0].checked){
            document.getElementById('orders').innerHTML += foodTable.rows[i].cells[1].innerHTML + "<br>";
        } 
    }
    
    
}


// END OF ORDER VALIDATION.

// START OF CONTACT VALIDATION

function validateForm() 
{
    var name = document.forms["ContactUs"]["inName"].value;
    var email = document.forms["ContactUs"]["inEmail"].value;
    var phone = document.forms["ContactUs"]["inPhone"].value;    
    var message = document.forms["ContactUs"]["inMessage"].value;

    var regex = /^[a-zA-Z]{2,30}$/;

    if (name == null || name == "") 
	{
        alert("Name is required with no spaces");
        return false;
    	}
    if (email == null || email == "" || email.indexOf('@') == -1 || email.indexOf(".com") == -1) 
	{
        alert("Email is required");
        return false;
    	}
    if (phone == null || phone == "") 
	{
        alert("Phone is required");
        return false;
    	}
    if (message == null || message == "") 
	{
        alert("A Message is required");
        return false;
    	}
    if (regex.test(name)==false)
	{
	alert("Please enter a valid name!");
        return false;
	}
    if (isNaN(phone)==true || phone.length!=11 )
	{
	alert("Please provide a valid number!");
        return false;
	}
    if (email.includes('@')!= true && email.includes(".com")!= true ) // will be reviewed later.
	{
	alert("Please provide a valid email!");
	return false;
	}
    if (message.length<20)
	{
	alert("Your message should be longer than 10 charachters");
	return false;
	}
    else 
	{
	alert("The Form Is Submitted, Thanks for Contacting Us !");
	}
    
    
}

// END OF CONTACT VALIDATION


// START OF RESERVATION VALIDATION

function myFunction() {
    if (document.getElementById("FNAME").value == "") {
        alert("Enter first name");
	return false;
    }

    
    if (!/^[a-zA-Z]*$/g.test(document.getElementById("FNAME").value)) {
        alert("Invalid characters in first name field");
	return false;
    }

    if(document.getElementById("FNAME").value.length<4){
        alert("ivalid length in first name field (length must be more than 3 character)");
	return false;
    }

    if (document.getElementById("LNAME").value == "") {
        alert("Enter Last name");
	return false;
    }
    if (!/^[a-zA-Z]*$/g.test(document.getElementById("LNAME").value)) {
        alert("Invalid characters in last name field");
	return false;
    }

    if(document.getElementById("LNAME").value.length<4){
        alert("ivalid length in last name field (length must be more than 3 character)");
	return false;
    }

    if (document.getElementById("PHONE").value == "") {
        alert("Enter a phone number");
	return false;
    }
    if (!/^[0-9]+$/g.test(document.getElementById("PHONE").value)) {
        alert("Invalid characters in phone number field");
	return false;
    }

    if(document.getElementById("PHONE").value.length<8){
        alert("ivalid length in phone number field (length must be more than 7 numbers)");
	return false;
    }

    if (document.getElementById("SB").value == "") {
        alert("please select branch");
	return false;
    }

    if (document.getElementById("DATE").value == "") {
        alert("Select Date");
	return false;
    }

    if (document.getElementById("T1").value == "") {
        alert("select time");
	return false;
    }

    if (document.getElementById("T2").value == "") {
        alert("Select time");
	return false;
    }
    if (document.getElementById("T1").value >= document.getElementById("T2").value) {
    	  alert("Please select a correct time");
    	  return false;
    }
    if (document.getElementById("NOP").value == "") {
        alert("select number of persons");
	return false;
    }
    if (document.getElementById("T").value == "") {
        alert("select table");
	return false;
    }
}

