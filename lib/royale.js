royale = function(x){
	clear();
	signpost("THE BATTLE ROYALE<br>------------------------------------------------");
	if (x === "a") { output(1, "After closing the unmarked wooden door, you descend a steep stone staircase. The low hum of men shouting and cheering below grows into a din as you draw closer.<br>");
		}
	output(2, "The raucous crowd surrounds a sunken pit, shouting and shaking pouches of gold while men in the middle brawl.<br><br>" +
		"The air tastes vaguely sour. Like blood.<br>");
	if (userInfo.mission==="royale"){
		output(3, "Press (<span id=letter>F</span>) to <span id=quest>seek out the fightmaster</span>, (<span id=letter>C</span>) to Challenge another player, (<span id=letter>B</span>) to bet on the bloodsport, or (<span id=letter>R</span>) to return to the Tavern.<br>");
	} else {
		output(3, "Press (<span id=letter>F</span>) to seek out the fightmaster, (<span id=letter>C</span>) to Challenge another player, (<span id=letter>B</span>) to bet on the bloodsport, or (<span id=letter>R</span>) to return to the Tavern.<br>");
	}
	thread = 3;	
}

rrouter = function(x){
	clear();
	if (x==="f") {
		clear();
		output(1, "Tox, the Battle Royale fightmaster, presides over the pit from a table stacked with gold, flanked by large men with fearsome swords.<br>");
		if (userInfo.level.level===3 && userInfo.mission!="royale"){
			output(2, "Tox looks up at you and snorts.<br><br>" +
			"\"You? I don't care to turn this place into a mortuary, stranger. You look weak.\"<br>");
			output(3, "\"But then again... the boys always enjoy cutting down fresh meat. Are you ready to prove yourself in our house?\"<br>");
			output(4, "Press (<span id=letter>Y</span>) to accept the Battle Royale's challenge, or (<span id=letter>Any</span>) other key to remain on the sidelines, like a coward.<br>");
			thread=3.1;
		} else if (userInfo.mission==="royale"){
			output(2, "Tox looks you over again. \"So, you're ready to fight our contenders, eh? They're ready for you!\"<br>");
			output(3, "Press (<span id=letter>Any</span>) key to descend into the fighting pit and meet your first challenge, or (<span id=letter>N</span>) to change your mind and remain on the sidelines - like a coward.<br>");
			thread=3.3;
		} else {
			// level 4 content goes here
		}
	}
	else if (x==="c"){
		//challenge
	}
	else if (x==="b"){
		//betting
	}
	else if (x==="r") { output(3, "You tire of bloodsport, and turn back to return to the safety of the Tavern."); setTimeout(function(){ tavern() }, 1500) }
	else { output(3, "Come again?"); 
		setTimeout(function(){ royale() }, 1500) 
	}
}

rchallenge = function(x){
	if (x==="y"){
		output(4, "Tox looks surprised. \"So... you fancy yourself a fighter, then?\" He slams his table. \"I like the sound of that!\"<br>");
		output(5, "You shall face three opponents, stranger. Each more formidable than the last. Prove your worth, and we will accept you in this house.\"<br>");
		output(6, "<span id=quest>You have accepted the ordeal of the Battle Royale!</span><br>");
		output(7, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
		userInfo.mission="royale";
		thread=3.2;
	} else {
		output(4, "Tox sniffs. \"That's what I thought.\"");
		setTimeout(function(){ royale() }, 1000); 
	}
}

rrounds = function(x,y){
	if (y===1){
		// round one
		if(x===1){
			clear();
			output(1, "Grubby hands push you through the crowd until you stumble out into the fighting ring, and the pen door is locked behind you.<br>");
			output(2, "Before you, a strange loincloth-wearing man is lifting an ivory javelin...");
			output(3, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			thread=3.41;
		} else if (x===2){
			// fightin the javelin man

		}
	} else if (y===2){
		// round two
	} else if (y===3){
		// round three
	}
}