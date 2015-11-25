gran = true;

farm = function(x){
	// farm output - go fight a spirit, discover mage's cave
	clear();
	signpost("GRANNON'S FARM<br>------------------------------------------------");
	if (userInfo.level.level<2){
		output(1, "Thick mist sits atop the field of barley surrounding old Grannon's Farm on the outskirts of town.<br>" + 
			"Somewhere, a dog whimpers, as if running from something. Not you.<br>");
		output(2, "The farm is quiet. Nothing grows here...<br><br>");	
		output(3, "<span id=menu>Press (<span id=letter>Any</span>) key to return to town.</span><br>");
		thread = 1.9;
	} else if (userInfo.level.level===2){
		if (userInfo.mission==="grannon"){
			farm2();
		} else {
			output(1, "Thick mist sits atop the field of barley surrounding old Grannon's Farm on the outskirts of town.<br>" + 
				"Somewhere, a dog whimpers, as if running from something. Not you.<br>");
			output(2, "The farm is not as abandoned as it seems. A slight figure staggers out of the barn door, clutching a crude spear and quavering in his speech.<br>");
			output(3, "\"Be on guard, stranger! I won't hesitate to gut ye wheres ye stand! State yer business here!\"<br>");
			output(4, "<span id=menu>Press (<span id=letter>T</span>) to try to explain that you come as a friend, (<span id=letter>B</span>) to ready your " + userInfo.items.weapon.name + " for battle, or (<span id=letter>Any</span>) other key to slink away back to town.</span><br>");
			thread = 6
		}
	} else if (userInfo.level.level>2){
		farm3();
	} 
}

farm2 = function(x){
	if (userInfo.granflag === true){
		// grannons alive
		clear();
		output(1, "Old Grannon leans on his spear, inspecting the latest sheep carcas left in his field.<br>");
		output(2, "\"You seen the Geist yet out there in the Dark Woods? It's a ghastly thing... black as smoke it is. No mortal form like you or me. Gives me the shivers.\"<br><br>" +
			"\"Go visit the Mage in the forest. Tell him I sent you. Maybe he'll agree to help you... if he doesn't decide to kill you instead.\"<br><br>" +
			"\"I appreciate your help, stranger.\"<br>");
		output(3, "<span id=menu>Press (<span id=letter>Any</span>) key to return to town.</span><br>");
		thread = 1.9;
	} else {
		// grannons dead
		clear();
		output(1, "Old Grannon's corpse still lies where you slew him. The dogs - or something else - appear to have begun their work on his body.<br>");
		output(2, "You see the remains of a sheep lying in one of the nearby fields. The Geist that terrorized this farm is still active - who knows what it will attack next?<br>");
		output(3, "<span id=menu>Press (<span id=letter>Any</span>) key to return to town.</span><br>");
		thread = 1.9;
	}
}

farm3 = function(x){
	clear();
	if (userInfo.mission==="grannon"){
		farmlevel();
	} else {
		// all is good in the hood
		
	}
}

farmrouter = function(x){
	clear();
	if (x==="t"){
		// talk to Grannon
		output(1, "Old Grannon narrows his eyes. \"You... you haven't come to kill my sheep too?\" His spear wavers between you two.<br>");
		output(2, "<span id=menu>Press (<span id=letter>N</span>) to assure Old Grannon you don't want his sheep, or (<span id=letter>Y</span>) to change your mind and say you're here to steal them.</span><br>");
		thread = 6.1;
	} else if (x==="b"){
		// cut a bitch
		output(1, "\"Aye,\" growls the old man as he sees you draw out your weapons, \"that's what I thought! Came to kill more of my sheep, did ye? I'll mount your head in my kitchen, I will!\"<br>");
		output(2, "Grannon lunges unexpectedly with his spear, hitting you in the thigh! <span id=defeat>You lose 5 HP!</span><br>");
		output(3, "<span id=menu>Press (<span id=letter>T</span>) to try talking to him again, or (<span id=letter>Any</span>) other key to counterattack.</span><br>");
		userInfo.hp -= 5;
		thread = 6.2;
	} else {
		townsquare();
	}
}

frouter1 = function(x,y){
	clear();
	if (x==="n"){
		// not here for sheep
		output(1, "Old Grannon looks confused for a moment before the relief becomes obvious on his face. \"Oh... thank goodness... well, if it's not you, then I suppose the Geist must still be out there.<br>");
		output(2, "<span id=menu>Press (<span id=letter>Any</span>) key to hear more.</span><br>");
		thread = 6.12
	} else if (x==="y"){
		// gimmie those sheep
		output(1, "\"I knew it! Sheep thief!\" He shrieks at you as he raises his spear again.<br>");
		output(2, "<span id=menu>Press (<span id=letter>Any</span>) key to attack, or (<span id=letter>R</span>) to run back to town.</span><br>");
		thread = 6.14;
	} else if (x==="" && y===2){
		// hear about the geist
		clear();
		output(1, "\"Well, you see,\" the old man says, dropping his spear and looking defeated, \"it all started a few weeks ago. I would come out to feed me sheep in the morning, see, and one would always be missing.\"<br>");
		output(2, "\"It was me dogs what found 'em, though. What remained of 'em, anyway. Whatever was picking off my flock, one at a time, was tearin' them apart and leaving their heads in the barley field. They was all chewed up, too.\"<br>");
		output(3, "\"This here is dark sorcery... not just that Mage coming out of his cave to cause mischief again. There's a bad creature out there. The Geist. I seen him. And I... I just ain't strong enough to kill it. Not no more.\"<br>");
		output(4, "If'n you'd be willing to hunt down that Geist for me... well, I'd be awful grateful, stranger. It's killing my farm. I... I don't have much, but I'd reward you with whatever I have.<br>");
		output(5, "<span id=quest>Hunt down the Geist from Grannon's Farm!</span><br>")
		output(6, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>")
		userInfo.mission = "grannon";
		userInfo.granflag = true;
		thread = 6.13;
	} else if (x==="" && y===3){
		clear();
		output(1, "\"To aid you in your hunt,\" the old man continues, \"you should go visit that damned old Mage in his cave. I'll tell you how to get there.\"<br>");
		output(2, "\"I don't trust in sorcery... but the Geist isn't like men. It's otherworldly. Black as smoke, without form. Maybe the Mage can help you fight back.\"<br>");
		output(3, "\"I appreciate your help, stranger.\"<br>");
		output(4, "<span id=gold>For not slaughtering Old Grannon, you gain 1 point of Cunning!</span><br>");
		output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>")
		userInfo.attributes.cunning += 1;
		thread = 6.3;
	} else if (x==="" && y===4){
		if (x==="r") {
			output(6, "You take mercy on the old man by not slaughtering him for his insane ramblings, and walk back to town.");
			output(7, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>")
			thread = 1.9;
		} else {
			frouter2();
		}
	}
	else {
		farmrouter("t");
	}
}

frouter2 = function(x){
	if (x==="t"){
		farmrouter("t");
		} else {
			clear();
			output(1, "You strike back with your " + userInfo.items.weapon.name + " and the old man crumbles to the ground with a weak whimper. You have killed the scared old man.<br>");
			output(2, "The stench of rotting sheep reminds you that the creature that actually did kill his sheep still roams. You must track it down and kill it... before it moves on.<br>");
			output(3, "<span id=quest>Hunt down the Geist from Grannon's Farm!</span><br>")
			output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue looking around the farm.</span><br>");
			userInfo.granflag = false;
			userInfo.mission = "grannon";
			thread = 6.3;
			// goes to farm2
		}
}

farmlevel = function(x,y){
	if (x===2){
		if (y==="s"){
			userInfo.attributes.speed += 1;
			output(4, "1 point has been added to your speed. This will make you quicker and more agile!<br>");
			output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
			thread = 6.6;
		} else if (y==="t"){
			userInfo.attributes.strength += 1;
			output(4, "1 point has been added to your strength. This will make you more powerful in combat!<br>");
			output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
			thread = 6.6;
		} else if (y==="c"){
			userInfo.attributes.charisma += 1;
			output(4, "1 point has been added to your charisma. This will make you wittier, funnier, and more charming!<br>");
			output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
			thread = 6.6;
		} else if (y==="u"){
			userInfo.attributes.cunning += 1;
			output(4, "1 point has been added to your cunning. But you already knew that, didn't you?<br>");
			output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
			thread = 6.6;
		} else {
			farmlevel();
		}
	} else if (userInfo.granflag) {
		// grannon is alive
		output(1, "As you walk on to the farm, you see Old Grannon at work repairing the calving shed. He grins as he sees you approach, shuffling quickly down to meet you.<br>");
		output(2, "You did it, " + userInfo.username + "! The Geist is gone, and my flock is recovering!<br>");
		output(3, "Allow me to help you on your journey. What would you like to be better at? <span id=letter>S</span>peed, s<span id=letter>T</span>rength, <span id=letter>C</span>harisma or c<span id=letter>U</span>nning?<br>");
		output(4, "<span id=menu>Which attribute would you like to improve?</span><br>");
		userInfo.mission = "";
		missioncomplete = undefined;
		thread = 6.4
	} else {
		// grannon is dead 
		output(1, "Upon your return to the farm, you see signs of life returning. The grass is greener, and flowers grow. But Old Grannon's body - or what remains of it - still lays where you slew him.<br>");
		output(2, "You notice some objects in Old Grannon's pouch. The dead have no use of objects, so you decide to take a look, and discover <span id=gold>two vials of healing potion!</span><br>");
		output(3, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
		userInfo.items.other.push(heals.basic);
		userInfo.items.other.push(heals.basic);
		userInfo.mission = "";
		missioncomplete = undefined;
		thread = 6.6;
	}
}

// Grannon fight functions

granfight = function(x){
	clear();
	output(1, "You stride into a clearing and hear a queer, empty howling from a nearby tree. Turning around, you see a gathering black cloud of smoke pouring out of a gap in the tree's trunk. It's the Geist from Old Grannon's farm!<br>");
	output(2, "The Geist streams towards you! Defend yourself!<br>");
	monster = beasts.lev2b;
	mhp = beasts.lev2b.hp;
	if (Math.random() < 0.7){
		// player gets first shot
		var result = userfight(monster);
		output(4, "You ready your " + userInfo.items.weapon.name + " in time to strike first!<br>");
		output(5, "You strike at the " + monster.name + " with your " + userInfo.items.weapon.name + " and inflict " + result + " damage!<br><br>");
		output(6, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
		thread = 6.24
	} else {
		// monster gets first shot
		output(4, "The " + monster.name + " is too fast for you, and manages to strike first!");
		setTimeout(function(){ gfight("m") }, 1500);
	}
}

gfight = function(x){
	if (x==="m"){
		woodsfight("m");
		if(thread===1.22){
			// hit you, did not kill, go to counterattack
			thread=6.25;
		}
	} else {
		woodsfight();
		if(thread===1.2){
			// killed it, go to reward
			greward();
		} else {
			// didn't kill it, go to monster turn
			thread=6.26;
		}
	}
}

gwoodsrun = function(x){
	woodsrun()
	if (thread===1.24){
		// failed, goes back to monster turn
		thread = 6.26;
	}
}

greward = function(x){
	if (flag2==="dead") {return}
	else { 
		clear();
		// add gloating here
		output(1, "The " + monster.name + ", defeated, slowly disperses into a fine mist, and eventually disappears into the air.<br><br>");
		output(2, "<span id=gold>You discover <span id=letter>" + monster.gold + "</span> gold when the smoke clears, and gain <span id=letter>" + monster.xp + "</span> experience!<br>");
		output(3, "<span id=gold>You have advanced to Level 3: Challenger.</span><br>");
		output(4, "Your maximum hitpoints have increased, and new areas of town are now open to you.<br>");
		output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
		levelup(3);
		thread = 1.23;
		userInfo.turnsToday -= turns;
		missioncomplete=true;
		turns = 0;
	}
}
