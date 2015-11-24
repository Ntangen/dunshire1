stew = false;
minst = false;

tavern = function(x){
	clear();
	signpost("THE TAVERN<br>------------------------------------------------");
	output(1, "The heavy oaken tavern door swings open with a low squeal. The crowded tavern's patrons nurse their drinks and carry on while a Minstrel plays in the back. " +
	"A man with a large, scratchy beard stands behind the bar with a towel.<br>");
	output(2, "Well met, " + userInfo.username + "! Press...<br><br>");
	output(3, "<span id=menu><ul><li>(<span id=letter>T</span>) to talk with Dean" +
		"<li>(<span id=letter>D</span>) to order a drink" +
		"<li>(<span id=letter>S</span>) to sit and listen to what's going on at the bar" +
		"<li>(<span id=letter>A</span>)sk the Minstrel to play a song" +
		"<li>(<span id=letter>L</span>) to return to the street</span></ul><br><br>");
	output(4, "<span id=menu>Make your choice.</span>");
	thread = 0.7;
}

tavernrouter = function(x){
	clear();
	if (x==="t") {
		// advice on moving up levels?
		deantalk();
		output(6, "<span id=menu>(Press <span id=enter>Enter</span> to continue)</span>");
		thread = 0.71;
	}
	else if (x==="d") { output(2, "Dean nods slowly, not looking up from the glass he's polishing. \"Here's what we've got...\"<br>") ;
		output(3, drinks);
		output(4, "\"What'll you have, " + userInfo.username + "?\"<br>");
		output(5, "<span id=menu>Select your drink, or press <span id=letter>Q</span> if nothing interests you.<br></span>");
		thread = 0.711;
	}
	else if (x==="s") { output(2, "Dean shrugs. \"Suit yourself, drifter.\"<br><br>");
		barlines();
		thread = 0.72;
	}
	else if (x==="a"){
		minstrel();
	}
	else if (x==="l") { output(2, "You get up from the bar and saunter out the door."); setTimeout(function(){ townsquare() }, 1000); 
	}
	else if ((x.search("brunswick stew")) != -1) { 
		if (stew === false){
			output(2, "Dean narrows his eyes. \"Who told you abou-\" he says, before trailing off and smirking.<br>" +
				"\"Let me guess. My brother, up the road. Well. If he sent you, then I guess it's the least I can do. We still have some left. Enjoy.\"<br>");
			output(3, "Dean goes back to the kitchen, and returns with a steaming bowl of Brunswick stew.<br><br><br>");
			output(4, "<span id=victory>Eating the stew makes you feel re-energized! 5HP added!</span><br>");
			output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			userInfo.hp += 5;
			statusupdate();
			thread = 0.71;
			stew = true;
		} else {
			output(2, "Dean shrugs. Sorry, friend. We're all out.")
			output(3, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			thread = 0.71;
		}
	}
	else { output(2, "Come again?"); 
	setTimeout(function(){ tavern() }, 1000) 
	}
}

drinkrouter = function(x){
	if (x==="t"){
		if (userInfo.gold < 25){
			clear();
			output(2, "Dean looks at you askance. \"Afraid this is a cash-only establishment, friend. And you don't seem to have it.\"<br>");
			output(3, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
			thread = 0.71;
			return;
		}
		userInfo.gold = userInfo.gold - 25;
		statusupdate();	
		clear()
		output(2, "Dean nods. \"Glass of Top's White Whiskey, coming up! Enjoy.\"<br>" +
			"He slides a glass of golden liquid towards you.<br><br>" +
			"Press <span id=letter>Any</span> key to continue.");
		thread = 0.71;  // have to add this to the parts below
	} else if (x==="b"){
		if (userInfo.gold < 15){
			clear();
			output(2, "Dean looks at you askance. \"Afraid this is a cash-only establishment, friend. And you don't seem to have it.\"<br>");
			output(3, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
			thread = 0.71;
			return;
		}
		userInfo.gold = userInfo.gold - 15;
		statusupdate();		
		clear();
		output(2, "Dean nods. \"Tankard of Burt's Beer, coming up! Enjoy.\"<br>" +
			"He slides a glass of frothy cold beer towards you.<br><br>" +
			"<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
		thread = 0.71;
	} else if (x==="a"){
		if (userInfo.gold < 10){
			clear();
			output(2, "Dean looks at you askance. \"Afraid this is a cash-only establishment, friend. And you don't seem to have it.\"<br>");
			output(3, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
			thread = 0.71;
			return;
		}		
		userInfo.gold = userInfo.gold - 10;
		statusupdate();	
		clear();	
		output(2, "Dean nods. \"Pint of Aemon's Ale, coming up! Enjoy.\"<br>" +
			"He slides a glass of opaque brown ale towards you.<br><br>" +
			"<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
		thread = 0.71;
	} else if (x==="g"){
		if (userInfo.gold < 5){
			clear();
			output(2, "Dean looks at you askance. \"Afraid this is a cash-only establishment, friend. And you don't seem to have it.\"<br>");
			output(3, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
			thread = 0.71;
			return;
		}		
		userInfo.gold = userInfo.gold - 5;
		statusupdate();		
		clear();
		output(2, "Dean grimaces. \"That kind of day, eh? Well... cup of Greb's Grog... if you insist.\"<br>" +
			"He slides a small glass of lukewarm, bubbling green liquid towards you.<br><br>" +
			"<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
		thread = 0.71;
	} else { output(3, "Come again?"); setTimeout(function(){ tavern() }, 1000) }
}

deantalk = function(){
	if (userInfo.level.level===1){
		// return output 3-5
		output(3, "As a newcomer, you should explore town a bit. Understand what's here. Venturing into the Dark Forest will help you gain valuable skills, but be prepared to fight.<br>");
		output(4, "After you have learned to use your " + userInfo.items.weapon.name + " in combat, and gained some experience, I would recommend going to visit the Abbey. It's a terrible shame about the robbery there...");
		return;
	} else if(userInfo.level.level===2){
		output(3, "If you hope to reach the level of Challenger, you'll have to arm yourself with something powerful. You should go see the Smithy about that.<br>");
		output(4, "Some strange stories coming out of the goat farm east of town. Grannon, the farmer there, might be losing his mind. You should go and get to the bottom of it.");
		return;
	} else if(userInfo.level.level===3){
		// tipz
	} else if(userInfo.level.level===4){
		
	} else if(userInfo.level.level===5){
		
	} else if(userInfo.level.level===6){
		
	} else if(userInfo.level===6){
		
	} else if(userInfo.level===7){
		
	} else if(userInfo.level===8){
		
	} else if(userInfo.level===9){
		
	} else if(userInfo.level===10){
		
	}
}

minstrel = function(x){
	clear();
	if (x==="a"){
		if (minst===true){
			output(3, "The Minstrel has already played for you today, and now entertains other tavern patrons.<br>");
			output(4, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
			thread=0.71;
			return;
		}
		else {
			var rando = Math.random();
			if (rando <=0.33){
				output(3, "The Minstrel pauses for a moment, gazes wistfully into the distance, and strums his rendition of \"The Mummer's Lament.\"<br>");
			} else if (rando >0.33 && rando <=0.66){
				output(3, "The Minstrel grins and excitedly launches into a rousing version of \"The Red Dragon's Tale.\" The bar goes wild and sings along!<br>");
			} else if (rando >0.66){
				output(3, "The Minstrel thinks for a moment, and then yodles a heartfelt stanza of \"The Knight's Sweetheart.\"<br>");
			}
			if (rando <=0.1){
				userInfo.turnsToday += 3;
				output(4, "<span id=gold>You receive 3 more turns today!</span><br>");
				output(5, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
				thread = 0.71;
			} else if (rando >=0.9) {
				userInfo.attributes.charisma += 1;
				output(4, "<span id=gold>You suddenly feel witter, funnier, and more charming!</span><br>");
				output(5, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
				thread = 0.71;
			} else if (rando>0.1 && rando<0.15) {
				var user = Meteor.user().username;
				var result = Bank.findOne({username:user});
				if (result != undefined){
					Meteor.call('bankUpdate',user,"dep",result.deposit, function(error, result){});
					output(4, "<span id=gold>Somewhere, magic has happened!</span><br>");	
				}
				output(5, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
				thread = 0.71;
			} else {
				output(4, "Your spirit feels refreshed.<br>");
				output(5, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
				thread = 0.71;
			}
			minst = true;
		}
	} else if (x==="t"){
		var temp;
		if (findgems()){
			userInfo.attributes.strength += 1;
			userInfo.items.other.splice(temp,1);
			output(2, "You discreetly hand the Minstrel your small pouch of rubies. He bows deeply in receipt.<br>");
			output(3, "\"Why, dear Patron, you honor me. Allow me to sing this ballad in your honor!\"<br><br>" + 
				"The Minstrel sings a great, stirring tale of your bravery and courage!<br>");
			output(4, "You are a patron of the arts. <span id=gold>1 point has been added to your strength!</span><br>");
			output(5, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span><br>");
				thread = 0.71;
		} else {
			output(2, "You have no gems to give him!<br>");
			output(3, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
			thread = 0.71;
		}
	} else if (x==="b"){
		tavern();
	} else {
		output(1, "A bearded Minstrel strums his gittern near the tavern's corner fireplace.<br>" +
			"He bows deeply to you as you approach. \"Sit, friend, and hear a song of adventure and woe...\"<br>");
		output(2, "<span id=menu>Press <span id=letter>A</span> to request a song, <span id=letter>T</span> to tip him with your precious gems, or <span id=letter>B</span> to return to the bar.</span><br>");
			thread = 0.75;
	}
}

findgems = function(){
	if (userInfo.items.other.length === 0){
		return false
	} else {
		for (i=0; i<userInfo.items.other.length;i++){
			if (userInfo.items.other[i].name === "Precious rubies"){
				temp = i;
				return true;
			}
		}
	}
}
