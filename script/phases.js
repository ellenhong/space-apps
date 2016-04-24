$(document).ready(function() {

	///////////////////////////////////////////////////
				/* CREATE DROPDOWN */
	///////////////////////////////////////////////////

	var monthtext = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

	function populatedropdown(dayfield, monthfield, yearfield){
    var today = new Date();
	var dayfield = document.getElementById(dayfield);
	var monthfield = document.getElementById(monthfield);
	var yearfield = document.getElementById(yearfield);
	for (var d = 1; d < 31; d++) {
		dayfield.options[d] = new Option(d, d+1);
		dayfield.options[today.getDate()] = new Option(today.getDate(), today.getDate(), true, true); //select today's day
	}

	for (var m = 0; m < 12; m++) {
		monthfield.options[m] = new Option(monthtext[m], monthtext[m]);
		monthfield.options[today.getMonth()] = new Option(monthtext[today.getMonth()], monthtext[today.getMonth()], true, true); //select today's month
	}

	var thisyear = today.getFullYear()
	for (var y = 0; y < 20; y++){
		yearfield.options[y] = new Option(thisyear, thisyear);
		thisyear += 1;
	}

	yearfield.options[0] = new Option(today.getFullYear(), today.getFullYear(), true, true); //select today's year

	}

	populatedropdown("Day", "Month", "Year");


	///////////////////////////////////////////////////
				   /* GET MOON PHASE */
	///////////////////////////////////////////////////

    var moonPhase;

	///////////////////////////////////////////////////
	/* Source: http://www.ben-daglish.net/moon.shtml
	 *
	 * DISCLAIMER: This function is only valid for the 20th
	 *             and 21st centuries.
	 */
	function Conway(year, month, day) {
		var r = year % 100;
		r %= 19;
		if (r > 9){ r -= 19;}
		r = ((r * 11) % 30) + parseInt(month) + parseInt(day);
		if (month < 3){r += 2;}
		r -= ((year < 2000) ? 4 : 8.3);
		r = Math.floor(r + 0.5) % 30;
		return (r < 0) ? r + 30 : r;
	}
	///////////////////////////////////////////////////

    function getDate() {
        var day = document.getElementById('Day');
        var selectedDay = parseInt(day.options[day.selectedIndex].text);
        var month = document.getElementById('Month');
        var selectedMonth = month.selectedIndex + 1;
        var year = document.getElementById('Year');
        var selectedYear = parseInt(year.options[year.selectedIndex].text);
    	moonPhase = Math.floor(Conway(selectedYear, selectedMonth, selectedDay) / 3.75);
        switch (moonPhase) {
    	    case 0:
    	        document.getElementById("phase-container1").style.visibility = 'visible';
                break;
    	    case 1:
    	        document.getElementById("phase-container2").style.visibility = 'visible';
                break;
    	    case 2:
    	        document.getElementById("phase-container3").style.visibility = 'visible';
                break;
    	    case 3:
    	        document.getElementById("phase-container4").style.visibility = 'visible';
                break;
    	    case 4:
    	        document.getElementById("phase-container5").style.visibility = 'visible';
                break;
    	    case 5:
    	        document.getElementById("phase-container6").style.visibility = 'visible';
                break;
    	    case 6:
    	        document.getElementById("phase-container7").style.visibility = 'visible';
                break;
    	    case 7:
    	        document.getElementById("phase-container8").style.visibility = 'visible';
                break;
    	    default:
    	        document.getElementById("default-container").style.visibility = 'visible';
                break;
    	}
        $("#popup").show();
        console.log(selectedDay);
        console.log(selectedYear);
        console.log(selectedMonth);
    }

    function clear() {
        var phaseStr = "phase-container";
        var i = 1;
        for (; i < 9; i++) {
            document.getElementById(phaseStr + i.toString()).style.visibility = 'hidden';
        }
        document.getElementById("default-container").style.visibility = 'hidden';
        $("#popup").hide();
    }

    var button = document.getElementById('button');
    button.onclick = getDate;
    var popupOverlay = document.getElementById('popup-overlay');
    popupOverlay.onclick = clear;

});
