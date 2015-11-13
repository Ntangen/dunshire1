royale = function(x){
	clear();
	signpost("THE BATTLE ROYALE<br>------------------------------------------------");
	if (x === "a") { output(1, "After closing the unmarked wooden door, you descend a steep stone staircase. The low hum of men shouting and cheering below grows into a din as you draw closer.<br>");
		}
	output(2, "The raucous crowd surrounds a sunken pit, shouting and shaking pouches of gold while men in the middle brawl.<br><br>" +
		"The air tastes vaguely sour. Like blood.<br>");
	output(3, "Press (<span id=letter>F</span>) to seek out the fightmaster, or (<span id=letter>B</span>) to return to the bailey yard.");
	thread = 3;	
}

rrouter = function(x){
	clear();
	if (x==="f") {
		output(3, "Tox, the Battle Royale fightmaster, presides over the pit from a table stacked with gold, flanked by large men with swords.<br>");
		if (userInfo.level <= 2){
			output(4, "Tox looks up at you and snorts.<br><br>" +
			"\"You? I don't care to turn this place into a mortuary, kid. Challengers or higher only. Come back after you learn to fight.\"<br>");	
			output(5, "(You are currently a " + levels[userInfo.level] + ".)<br>")
			output(6, "Press <span id=letter>Any</span> key to leave the Battle Royale.");
			thread = 3.5;
			return;
		}
		output(5, "This is where future battle royale action will happen.");
	}
	// else if (x==="f") { output(2, "Lord Charlie chuckles. \"Feeling the need for speed, eh? It's like I tell everyone - speed is so important. It'll help you hit your enemies faster, and more often, and outrun them if necessary.\"<br>") ;
	// 	output(3, "\"My speed program will help you get faster. But you'll have to work on it. Do you want to begin?\"<br><br>");
	// 	output(4, "Press <span id=letter>A</span>ny key to begin speed training, or (<span id=letter>B</span>) to change your mind.<br>" +
	// 		"(Each round of speed training will require 1 turn.)");
	// 	thread = 2.2;
	// }
	else if (x==="b") { output(2, "You tire of bloodsport, and turn back to return to Lord Charlie's bailey."); setTimeout(function(){ bailey() }, 1500) }
	else { output(2, "Come again?"); 
		setTimeout(function(){ royale() }, 1500) 
	}
}