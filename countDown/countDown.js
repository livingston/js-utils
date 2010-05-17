var mins, secs, paused = false, active = false;

function cd() {
	active = true;
 	mins = 1 * m("5"); // change minutes here
 	secs = 0 + s(":01"); // change seconds here (always add an additional second to your total)
 	redo();
}

function m(obj) {
 	for(var i = 0; i < obj.length; i++) {
  		if(obj.substring(i, i + 1) == ":")
  		break;
 	}
 	return(obj.substring(0, i));
}

function s(obj) {
 	for(var i = 0; i < obj.length; i++) {
  		if(obj.substring(i, i + 1) == ":")
  		break;
 	}
 	return(obj.substring(i + 1, obj.length));
}

function dis(mins,secs) {
 	var disp;
 	if(mins <= 9) {
  		disp = " 0";
 	} else {
  		disp = " ";
 	}
 	disp += mins + ":";
 	if(secs <= 9) {
  		disp += "0" + secs;
 	} else {
  		disp += secs;
 	}
 	return(disp);
}

function redo() {
	if(paused === false) {
		secs--;
		
		if(secs == -1) {
			secs = 59;
			mins--;
		}
		
		$("#timer").html(dis(mins,secs));
	}
	if(mins == 0 && secs == 59) {
		$("#timer").addClass("lastMinute");
	}
	
 	if((mins == 0) && (secs == 0)) {
		active = false;
		$("#timer").addClass("text").html("TIME IS UP");
 	} else {
		timer = setTimeout("redo()",1000);
 	}
}

function init() {
	controls();
  //cd();
}

var controls = function() {
	document.onkeydown = function(e) {
          if (e == null) { // ie
            keycode = event.keyCode;
          } else { // mozilla
            keycode = e.which;
          }
		  
		  console.log(keycode);

          if(keycode == 27) { // close
			if(active) {
				active = false;
				clearTimeout(timer);
				$("#timer").removeClass("lastMinute").html("00:00");
			} else {
				$("#timer").removeClass("text lastMinute");
				cd();
			}
          } else if(keycode == 32) { // pause
            paused = !paused
          }
    };
};

$(document).ready(function(){
	init();
});