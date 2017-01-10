//uses classList, setAttribute, and querySelectorAll
//if you want this to work in IE8/9 youll need to polyfill these
(function(){
	var d = document,
	accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
	setAria,
	setAccordionAria,
	switchAccordion,
  touchSupported = ('ontouchstart' in window),
  pointerSupported = ('pointerdown' in window);
  
  skipClickDelay = function(e){
    e.preventDefault();
    e.target.click();
  }

		setAriaAttr = function(el, ariaType, newProperty){
		el.setAttribute(ariaType, newProperty);
	};
	setAccordionAria = function(el1, el2, expanded){
		switch(expanded) {
      case "true":
      	setAriaAttr(el1, 'aria-expanded', 'true');
      	setAriaAttr(el2, 'aria-hidden', 'false');
      	break;
      case "false":
      	setAriaAttr(el1, 'aria-expanded', 'false');
      	setAriaAttr(el2, 'aria-hidden', 'true');
      	break;
      default:
				break;
		}
	};
//function
switchAccordion = function(e) {
	e.preventDefault();
	var thisAnswer = e.target.parentNode.nextElementSibling;
	var thisQuestion = e.target;
	if(thisAnswer.classList.contains('is-collapsed')) {
		setAccordionAria(thisQuestion, thisAnswer, 'true');
	} else {
		setAccordionAria(thisQuestion, thisAnswer, 'false');
	}
  	thisQuestion.classList.toggle('is-collapsed');
  	thisQuestion.classList.toggle('is-expanded');
		thisAnswer.classList.toggle('is-collapsed');
		thisAnswer.classList.toggle('is-expanded');
 	
  	thisAnswer.classList.toggle('animateIn');
	};
	for (var i=0,len=accordionToggles.length; i<len; i++) {
		if(touchSupported) {
      accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
    }
    if(pointerSupported){
      accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
    }
    accordionToggles[i].addEventListener('click', switchAccordion, false);
  }
})();

$(function(){
        $("#typed").typed({
            strings: [" ","Testing phase is under progress.", "Please be patient."],
            typeSpeed: 30,
            backDelay: 2000,
            loop: true,
            contentType: 'html', // or text
            // defaults to false for infinite loop
            loopCount: false,
            callback: function(){ foo(); },
            resetCallback: function() { newTyped(); }
        });

        $(".reset").click(function(){
            $("#typed").typed('reset');
        });
  function newTyped(){ /* A new typed object */ }

    function foo(){ console.log("Callback"); }

    });
      
$(document).ready(function(){
    $(".accordionTitle").click(function(){
      if($("DD")[0].className[35] == 'c'){
        $(this).css("background-color", "#2980b9");
      } else {
        $(this).css("background-color", "#216796");
      }
    });
  
    $(".myLanes").click(function(){
      $("#mytable").fadeIn(1000, function(){
        $(this).css("display", "grid");
      });
    });
  
  $(".btn").click(function(){
      $("#mytable").fadeOut(1000, function(){
        $(this).css("display", "none");
        $("#busLoc").empty();
      });
    });
    
    $("#myonoffswitch").click(function(){
            if(this.checked){
                $("#form-main").fadeIn(1000, function(){
                $(this).css("display", "grid");
                });
            } else {
                $("#form-main").fadeOut(1000, function(){
                $(this).css("display", "grid");
                });
            }
        });
        
});

function loadXMLDoc()
{
if (window.XMLHttpRequest)
  {
  xhttp=new XMLHttpRequest();
  }
else // code for IE5 and IE6
  {
  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xhttp.open("GET","index.xml",false);
xhttp.send();
return xhttp.responseXML;
}

function show(){
 xmlDoc = loadXMLDoc();
document.write(xmlDoc.getElementsByTagName("driverName")[0].childNodes[0].nodeValue + "<br>");
document.write(xmlDoc.getElementsByTagName("driverNum")[0].childNodes[0].nodeValue + "<br>");
document.write(xmlDoc.getElementsByTagName("busLane")[0].childNodes[0].nodeValue);
}


function details(myid){
 var contentValue = document.getElementById(myid).textContent;
 xmlDoc = loadXMLDoc();
 if(contentValue == "Abbasiya"){
//  document.getElementById("ct").innerHTML = " ";
  document.getElementById("driverName").innerHTML = (xmlDoc.getElementsByTagName("driverName")[0].childNodes[0].nodeValue + "<br>");
  document.getElementById("driverNum").innerHTML = (xmlDoc.getElementsByTagName("driverNum")[0].childNodes[0].nodeValue + "<br>");
  if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
     
     
 } else {
//  document.getElementById("ct").innerHTML = " ";
  document.getElementById("driverName").innerHTML = (xmlDoc.getElementsByTagName("driverName")[1].childNodes[0].nodeValue + "<br>");
  document.getElementById("driverNum").innerHTML = (xmlDoc.getElementsByTagName("driverNum")[1].childNodes[0].nodeValue + "<br>");
  if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
 }
}



function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;

    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false";
    document.getElementById("busLoc").innerHTML = "<img src='"+img_url+"'>";
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
