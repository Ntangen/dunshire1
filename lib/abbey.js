abbey = function(x){
	clear();
	signpost("THE VILLAGE ABBEY<br>------------------------------------------------");
	if (userInfo.xp < 102) {
		output(1, "The Abbey's door hangs a single hinge. Inside, broken benches are strewn about in disarray. The altar in the front of the room is smashed.<br>");
		output(2, "An old man in a simple wool frock is sweeping debris on one side of the room. You can tell he has been weeping.<br>");
		output(3, "He looks up as you enter the room, but shakes his head. \"You can't help us yet! No one can...\"<br>");	
		output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to leave.</span><br>");
		thread = 5.01;	
		return;
	} else if (userInfo.xp >=102 && CheckAbbey() && !missioncomplete){
		output(1, "The Abbey's door hangs a single hinge. Inside, broken benches are strewn about in disarray. The altar in the front of the room is smashed.<br>");
		output(2, "An old Cleric in a simple wool frock is sweeping debris on one side of the room. You can tell he has been weeping.<br>");
		output(3, "He looks up as you enter the room, and his eyes light up. \"Greetings, wanderer. You... you aren't here to loot us, are you? As you can see, we have nothing else of value here...\"<br>");
		output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to ask the old man what happened, or (<span id=letter>Q</span>) to leave.</span><br>");
		thread = 5;
	} else if (userInfo.xp>=102 && userInfo.mission === "abbey" && !missioncomplete){
		output(1, "The Abbey's door hangs a single hinge. Inside, broken benches are strewn about in disarray. The altar in the front of the room is smashed.<br>");
		output(3, "The old Cleric looks up from his cleaning as you enter the room, and his eyes brighten. \"Greetings, wanderer. Our congregation cannot wait for the safe return of our precious censer... truly, you are most noble in taking on this dangerous task!\"<br>");
		output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to return to town.</span><br>");
		thread = 1.9;
	} else if (userInfo.xp>=102 && CheckAbbey() && missioncomplete) {
		output(1, "The Abbey's door hangs a single hinge. Inside, broken benches are strewn about in disarray. The altar in the front of the room is smashed.<br>");
		output(2, "The old Cleric lights up as you enter the Abbey. You did it! You really did it! Verily, you were sent to us by the Great Father!<br>");
		output(3, "Our order will gratefully pray for your health and vitality. But in addition, please accept these most modest of tokens of our deepest thanks.<br>" + 
			"<span id=gold>You receive 200 gold and 50 experience!</span><br>");
		output(4, "<span=quest>You have returned the Cleric's censer!</span><br><br>");
		output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
		levelup(2);
		userInfo.gold += 200;
		userInfo.xp += 50;
		thread = 5.6;
	} else if (!CheckAbbey()){
		output(1, "The Abbey's new oak double doors gleam in the afternoon light. The new altar at the front is spit polished and gives a warm, inviting glow.<br>");
		output(2, "The old Cleric, resplendent in soft robes, greets you with a smile. \"Welcome again, child. What brings you back to our humble house?\"<br>");
		output(3, "<span id=menu>Press (<span id=letter>F</span>) to inquire about The Faith, (<span id=letter>R</span>) to rest and reflect in the nave, or (<span id=letter>any</span>) other key to leave.</span><br>");
		thread = 5;
	}
}

abbeyup = function(x,y){
	if (x===2){
		if (y==="s"){
			userInfo.attributes.speed += 1;
			output(4, "1 point has been added to your speed. This will make you quicker and more agile!<br>");
			output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
			thread = 5.4;
		} else if (y==="t"){
			userInfo.attributes.strength += 1;
			output(4, "1 point has been added to your strength. This will make you more powerful in combat!<br>");
			output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
			thread = 5.4;
		} else if (y==="c"){
			userInfo.attributes.charisma += 1;
			output(4, "1 point has been added to your charisma. This will make you wittier, funnier, and more charming!<br>");
			output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
			thread = 5.4;
		} else if (y==="u"){
			userInfo.attributes.cunning += 1;
			output(4, "1 point has been added to your cunning. But you already knew that, didn't you?<br>");
			output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
			thread = 5.4;
		} else {
			abbeyup();
		}
	} else {
		clear();
		output(1, "<span id=gold>You have advanced to Level 2: Apprentice.</span><br>");
		output(2, "Your maximum hitpoints have increased, and new areas of town are now open to you.<br>");
		output(3, "In addition, you may add 1 point to any one of your following attributes: <span id=letter>S</span>peed, s<span id=letter>T</span>rength, <span id=letter>C</span>harisma or c<span id=letter>U</span>nning.<br>");
		output(4, "<span id=menu>Which attribute would you like to add this point to?</span><br>");
		thread = 5.61;
	}
}

abbeyrouter = function(x){
	clear();
	if (CheckAbbey()){
		if (x==="q"){
			output(1, "You decide not to get involved, and return to the street.");
			thread = 0.5;
			setTimeout(function(){ townsquare() }, 1000);
		} else {
			output(4, "Well...\" he begins, pausing his sweeping for a rest on one of the few benches left intact, \"as you can see, wanderer, we are but a humble village abbey here. As Cleric, I lead the people here in our observance of The Faith, as the Great Father requires.<br>");
			output(5, "The other day, this holy sanctuary was desecrated by marauders. They came in the night, stole our precious censer, and gave me quite a bump on the head in the process...<br>");
			output(6, "I see you do not wear the hood of a Keeper of our Faith. Even so, perhaps you would be willing to help catch these bandits and recover our lost censer? This Abbey would be greatly in your debt.<br>");
			output(7, "<span id=menu>Respond (<span id=letter>Y</span>)es or (<span id=letter>N</span>)o to the Cleric's request.</span><br>");
			thread = 5.1;
		}
	}
	else {
		if (x==="f"){
			output(1, "The Cleric clasps his hands before him. \"I would be happy to tell you more about our ancient and noble Faith.\"<br>");
			output(2, "\"In the old times, the people of our land worshiped many false gods. Many centuries ago, however, following years of tumult, The Faith won their hearts, for it gave them lightness and hope in the midst of much misery and death.\"<br>");
			output (3, "\"Our true followers - The Faithful - today identify themselves by taking the Cowl, which we wear around the neck. You will often see them in Town.\"<br>");
			output(4, "\"Our order enjoys the righteous sanction of the Governor himself in the Capital, Oak Town. His Honor permits us certain... privileges... for the comfort we bring his people.\"<br>");
			output (5,"<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
			thread = 5.5;
		} else if (x==="r"){
			output(3, "You quietly take a seat in the Abbey's nave. You are contemplative.<br>");
			output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
			thread = 5.4;
		} else {
			townsquare();
		}
	}
}

abbey1 = function(x){
	clear();
	if (x==="y"){
		output(1, "The old Cleric's face brightens and he claps his hands with quiet gratitude.<br>");
		output(2, "\"Truly, the Great Father sent you to us! Thank you, my child! With your formidable skills and the Great Father's guiding hand, how can you not succeed?\"<br>");
		output(3, "\"All I know is that the thieves fled into the Dark Woods. They were last seen by a farmer heading east. Be vigilant - they are armed, and do not likely fear meeting the Great Father in the world beyond!\"<br>");
		output(4, "<span id=quest>You have accepted the Cleric's mission!</span><br>")
		output(3, "<span id=menu>Press (<span id=letter>Any</span>) key to leave the Abbey.</span>");
		userInfo.mission = "abbey"
		thread = 5.01;
	} else {
		output(1, "The old Cleric's face falls in disappointment.<br>");
		output(2, "\"Well... perhaps another time, then. Go with the Father, child.\" He stands up and goes back to sweeping the floor.");
		output(3, "<span id=menu>Press (<span id=letter>Any</span>) key to leave the Abbey.</span>");
		thread = 1.9;
	}
}

CheckAbbey = function(){
	if (userInfo.level.level === 1){
		return true;
	}
	else return false;
}

// Abbey mission functions

aturns = 0;

abwoods = function(x){
	clear();
	output(1, "Following the Cleric's tip, you head east in the woods, hoping to find some sign of the thieves who stole the Abbey's censer.<br>");
	if (aturns ===1){
		output(2, "You've found the thieves' trail! Their camp can't be far ahead.");
	} else if (aturns===2){
		adiscover();
		return;
	}
	monster = beasts.lev1[Math.round((Math.random()*3)+7)];
	console.log("abbey monster: " + monster);
	mhp = monster.hp;
	output(3, "As you pursue the trail, a " + monster.name + " approaches! What do you do?<br><br>");
	output(4, "Your hitpoints: " + userInfo.hp + "<br><br>" +
		monster.name +"'s hitpoints: " + mhp + "<br>" +
		"------------------------------------------------<br><br>"+
		"<span id=menu>Press (<span id=letter>A</span>)ny key to Attack, (<span id=letter>R</span>) to attempt to run away.</span>");
	thread = 5.2;
}

awoodsfight = function(x){
	if (x==="a"){
		woodsfight("a");
		if(thread===1.2){
			console.log("checkpoint");
			// killed it, go to reward
			if(aturns===2){
				console.log("checkpoint 2");
				areward();
				return
			} else {
			aturns++;
			reward();
			}
		} else {
			// didn't kill it, go to monster turn
			thread=5.24;
		}
	}
	else if (x==="m"){
		woodsfight("m");
		if(thread===1.22){
			// hit you, did not kill, go to counterattack
			thread=5.2;
		}
	}
}

awoodsrun = function(x){
	woodsrun()
	if (thread===1.24){
		// failed, goes back to monster turn
		thread = 5.24;
	}
}

areward = function(x){
	clear();
	output(1, "The two thieves lay dead before you. They will never burlarize the Abbey ever again.<br>");
	output(2, "You should return the thieves' bag to the Cleric right away!<br>");
	output(3, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
	missioncomplete = true;
	thread = 1.23;
	userInfo.turnsToday -= turns;
	turns = 0;
}

adiscover = function(x){
	output(2, "You round a corner, and there they are! The two common-looking thieves have been expecting you - and their shortswords are already unsheathed. You see the Cleric's censer behind them in a bag!<br>");
	output(3, "The bandits rush towards you!<br>");
	monster = beasts.lev1b;
	mhp = beasts.lev1b.hp;
	if (Math.random() < 0.7){
		// player gets first shot
		var result = userfight(monster);
		output(4, "You ready your " + userInfo.items.weapon.name + " in time to strike first!<br>");
		output(5, "You strike at the " + monster.name + " with your " + userInfo.items.weapon.name + " and inflict " + result + " damage!<br><br>");
			output(6, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
			thread = 5.24
	} else {
		// monster gets first shot
		output(4, "The " + monster.name + " are too fast for you, and manage to strike first!");
		setTimeout(function(){ awoodsfight("m") }, 1500);
	}
}

afaith = function(x){
	if (x===1){
		clear();
		output(1, "\"The Faithful are an order devoted to righteousness and the True Path. We also help our brothers and sisters in Faith however we can.\"<br>");
		output(2, "\"Are you, my child, interested in one day taking the Cowl of our Faith?\"<br>");
		output(3, "<span id=menu>Press <span id=enter>Y</span> for yes, or <span id=enter>any</span> other key for no.</span><br>");
		thread = 5.51;
	}
	else if (x===2){
		if (userInfo.level <=2){
			output(3, "The Cleric smiles warmly and grasps your arm. \"Truly, you honor us, child.\"<br>")	
			output(4, "\"But you are as yet inexperienced. Ask again when you achieve the level of Challenger - and we will consider your worthiness for the community of The Faithful.\"<br>");
			output(5, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span><br>");	
			thread = 5.4;
		}
		else {
			// join The Faithful here
		}
	}
}