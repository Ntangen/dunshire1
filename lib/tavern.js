tavern = function(x){
	clear();
	signpost("THE TAVERN<br>------------------------------------------------");
	var temp = "Well met, " + userInfo.username + "!";
	var temp2 = "The heavy oaken tavern door swings open with a low squeal. Inside, a handful of patrons are quietly nursing their drinks. " +
	"A man with a large, scratchy beard stands behind the bar with a towel.<br>" + temp;
	output(1, temp2);
	output(2, "Press (<span id=letter>T</span>) to talk to Dean, (<span id=letter>D</span>) to order a drink, (<span id=letter>S</span>) to sit and listen to what's going on at the bar, or (<span id=letter>L</span>) to leave.<br><br>")
	thread = 0.7;
}

tavernrouter = function(x){
	clear();
	if (x==="t") {
		output(2, "We'll fill this in later");
		setTimeout(function(){ tavern() }, 1000);
	}
	else if (x==="d") { output(2, "Dean nods slowly, not looking up from the glass he's polishing. \"Here's what we've got...\"<br>") ;
		output(3, drinks);
		output(4, "You have " + userInfo.gold + " gold.");
		thread = 0.71;
	}
	else if (x==="s") { output(2, "Dean shrugs. \"Suit yourself, drifter.\"<br><br>");
		barlines();
		thread = 0.72;
	}
	else if (x==="l") { output(2, "You get up from the bar and saunter out the door."); setTimeout(function(){ townsquare() }, 1000) }
	else { output(2, "Come again?"); 
	setTimeout(function(){ tavern() }, 1000) 
	}
}