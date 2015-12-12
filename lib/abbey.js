
abbey = function(x){
	clear();
	signpost("THE VILLAGE ABBEY<br>------------------------------------------------");
	if (userInfo.xp < 102) {
		output(1, "The Abbey's door hangs a single hinge. Inside, broken benches are strewn about in disarray. The altar in the front of the room is smashed.<br>");
		output(2, "An old man in a simple wool frock is sweeping debris on one side of the room. You can tell he has been weeping.<br>");
		output(3, "He looks up as you enter the room, but shakes his head. <span id=quote>\"You can't help us yet! No one can...\"</span><br>");	
		output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to leave.</span><br>");
		thread = 5.01;	
		return;
	} else if (userInfo.xp >=102 && userInfo.level.level<2){
		if (userInfo.mission==="abbey" && missioncomplete){
			// post-mission/level up
			output(1, "The Abbey's door hangs a single hinge. Inside, broken benches are strewn about in disarray. The altar in the front of the room is smashed.<br>");
			output(2, "The old Cleric lights up as you enter the Abbey. <span id=quote>You did it! You really did it! Verily, you were sent to us by the Great Father!</span><br>");
			output(3, "<span id=quote>Our order will gratefully pray for your health and vitality. But in addition, please accept these most modest of tokens of our deepest thanks.</span><br><br>" + 
				"<span id=gold>You receive 200 gold and 50 experience!</span><br>");
			output(4, "<span=quest>You have returned the Cleric's censer!</span><br><br>");
			output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
			levelup(2);
			userInfo.gold += 200;
			userInfo.xp += 50;
			thread = 5.6;
		} else if (userInfo.mission==="abbey"){
			// during mission	
			output(1, "The Abbey's door hangs a single hinge. Inside, broken benches are strewn about in disarray. The altar in the front of the room is smashed.<br>");
			output(2, "The old Cleric looks up from his cleaning as you enter the room, and his wet eyes brighten. <span id=quote>\"Greetings, wanderer. Our congregation cannot wait for the safe return of our precious censer... truly, you are most noble in taking on this dangerous task!\"</span><br>");
			output(3, "<span id=menu>Press (<span id=letter>Any</span>) key to return to town.</span><br>");
			thread = 1.9;
		} else {
			// give mission
			output(1, "The Abbey's door hangs a single hinge. Inside, broken benches are strewn about in disarray. The altar in the front of the room is smashed.<br>");
			output(2, "An old Cleric in a simple wool frock is sweeping debris on one side of the room. You can tell he has been weeping.<br>");
			output(3, "He looks up as you enter the room, and his eyes light up. <span id=quote>\"Greetings, wanderer. You... you aren't here to loot us, are you? As you can see, we have nothing else of value here...\"</span><br>");
			output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to ask the old man what happened, or (<span id=letter>Q</span>) to leave.</span><br>");
			thread = 5;
		}
	} else if (userInfo.level.level<=2){
		// beyond level 1
		output(1, "The Abbey's new oak double doors gleam in the afternoon light. The new altar at the front is spit polished and gives a warm, inviting glow.<br>");
		output(2, "The old Cleric, resplendent in soft robes, greets you with a smile. <span id=quote>\"Welcome again, child. What brings you back to our humble house?\"</span><br>");
		output(3, "<span id=menu>Press (<span id=letter>F</span>) to inquire about The Faith, (<span id=letter>R</span>) to rest and reflect in the nave, or (<span id=letter>any</span>) other key to leave.</span><br>");
		thread = 5;
	}
}

abbeyup = function(x,y){
	if (x===2){
		if (y==="l"){
			userInfo.attributes.luck += 1;
			output(4, "1 point has been added to your luck. This will make fortune smile upon you!<br>");
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
		} else if (y==="m"){
			userInfo.attributes.myst += 1;
			output(4, "1 point has been added to your mysticism. But you already knew that, didn't you?<br>");
			output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
			thread = 5.4;
		} else {
			abbeyup();
		}
	} else {
		clear();
		output(1, "<span id=gold>You have advanced to Level 2: Apprentice.</span><br>");
		output(2, "Your maximum hitpoints have increased, and new areas of town are now open to you.<br>");
		output(3, "In addition, you may add 1 point to any one of your following attributes: <span id=letter>L</span>uck, s<span id=letter>T</span>rength, <span id=letter>C</span>harisma or <span id=letter>M</span>ysticism.<br>");
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
			clear();
			output(1, "<span id=quote>\"Well...\"</span> he begins, pausing his sweeping for a rest on one of the few benches left intact, <span id=quote>\"as you can see, wanderer, we are but a humble village abbey here. As Cleric, I lead the people here in our observance of The Faith, as the Great Father requires.\"</span><br>");
			output(2, "<span id=quote>The other day, this holy sanctuary was desecrated by marauders. They came in the night, stole our precious censer, and gave me quite a bump on the head in the process...</span><br>");
			output(3, "<span id=quote>I see you do not wear the hood of a Keeper of our Faith. Even so, perhaps you would be willing to help catch these bandits and recover our lost censer? This Abbey would be greatly in your debt.</span><br>");
			output(4, "<span id=menu>Respond (<span id=letter>Y</span>)es to the Cleric's request, or (<span id=letter>Any</span>) other key to decline for now.</span><br>");
			thread = 5.1;
		}
	}
	else {
		if (x==="f"){
			output(1, "The Cleric clasps his hands before him. <span id=quote>\"I would be happy to tell you more about our ancient and noble Faith.\"</span><br>");
			output(2, "<span id=quote>In the old times, the people of our land worshiped many false gods. Many centuries ago, however, following years of tumult, The Faith won their hearts, for it gave them lightness and hope in the midst of much misery and death.</span><br>");
			output (3, "<span id=quote>Our true followers - The Faithful - today identify themselves by taking the Cowl, which we wear around the neck. You will often see them in Town.</span><br>");
			output(4, "<span id=quote>Our order enjoys the righteous sanction of the Governor himself in the Capital, Oak Town. His Honor permits us certain... privileges... for the comfort we bring his people.</span><br>");
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
		output(2, "<span id=quote>\"Truly, the Great Father sent you to us! Thank you, my child! With your formidable skills and the Great Father's guiding hand, how can you not succeed?\"</span><br>");
		output(3, "<span id=quote>\"All I know is that the thieves fled into the Dark Woods. They were last seen by a farmer heading east. Be vigilant - they are armed, and do not likely fear meeting the Great Father in the world beyond!\"</span><br>");
		output(4, "<span id=quest>You have accepted the Cleric's mission!</span><br>")
		output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to leave the Abbey.</span>");
		userInfo.mission = "abbey"
		thread = 5.01;
	} else {
		output(1, "The old Cleric's face falls in disappointment.<br>");
		output(2, "<span id=quote>\"Well... perhaps another time, then. Go with the Father, child.\"</span> He stands up and goes back to sweeping the floor.");
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
		woodsfight(0,"m");
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
		output(1, "<span id=quote>\"The Faithful are an order devoted to righteousness and the True Path. We also help our brothers and sisters in Faith however we can.\"</span><br>");
		output(2, "<span id=quote>\"Are you, my child, interested in one day taking the Cowl of our Faith?\"</span><br>");
		output(3, "<span id=menu>Press <span id=enter>Y</span> for yes, or <span id=enter>any</span> other key for no.</span><br>");
		thread = 5.51;
	}
	else if (x===2){
		if (userInfo.level <=3){
			output(3, "The Cleric smiles warmly and grasps your arm. <span id=quote>\"Truly, you honor us, child.\"</span><br>")	
			output(4, "<span id=quote>\"But you are as yet inexperienced. Ask again when you achieve the level of Challenger - and we will consider your worthiness for the community of The Faithful.\"</span><br>");
			output(5, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span><br>");	
			thread = 5.4;
		}
		else {
			// join The Faithful here
		}
	}
}