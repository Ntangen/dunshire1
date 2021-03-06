gran = true;

farm = function(x){
	// farm output - go fight a spirit, discover mage's cave
	clear();
	signpost("GRANNON'S FARM<br>------------------------------------------------");
	Meteor.call("acts",x,"events","farm");
	if (userInfo.level.level<2){
		output(1, "Thick mist sits atop the field of barley surrounding Old Grannon's Farm on the outskirts of town.<br>" + 
			"Somewhere, a dog whimpers, as if running from something. Not you.<br>");
		output(2, "The farm is quiet. Nothing grows here...<br><br>");	
		output(3, "<span id=menu>Press (<span id=letter>Any</span>) key to return to town.</span><br>");
		thread = 1.9;
	} else if (userInfo.level.level===2){
		if (userInfo.mission==="grannon"){
			farm2();
		} else {
			output(1, "Thick mist sits atop the field of barley surrounding Old Grannon's Farm on the outskirts of town.<br>" + 
				"Somewhere, a dog whimpers, as if running from something. Not you.<br>");
			output(2, "The farm is not as abandoned as it seems. A slight figure staggers out of the barn door, clutching a crude spear and quavering in his speech.<br>");
			output(3, "<span id=quote>\"Be on guard, stranger! I won't hesitate to gut ye wheres ye stand! State yer business here!\"</span><br>");
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
		output(2, "<span id=quote>\"You seen the Geist yet out there in the Dark Woods? It's a ghastly thing... black as smoke it is. No mortal form like you or me. Gives me the shivers.\"</span><br><br>" +
			"<span id=quote>\"Go visit the Mage in the forest. Tell him I sent you. Maybe he'll agree to help you... if he doesn't decide to kill you instead. Ha!\"</span><br><br>" +
			"<span id=quote>\"I appreciate your help, stranger.\"</span><br>");
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
		if (userInfo.granflag){
			// grannon is still alive
			output(1, "The farm is verdant and pungent with the smell of freshly tilled soil and manure. The barley surrounding the farm rustles in the breeze.<br>");
			output(2, "Old Grannon himself emerges from his shed with a hoe slung over his shoulder. <span id=quote>Well howdy there, <span id=menu>" + userInfo.username + "</span>! Good to see you again! You're always welcome here.</span><br>");
			output(3, "<span id=menu>Press (<span id=letter>Any</span>) key to return to town.</span><br>");
			thread = 1.9;
		} else {
			// grannon is dead
			output(1, "The farm is overgrown and eerily quiet. Thieves have looted most of Old Grannon's equipment and his house, and his body is now no where to be seen.<br>");
			output(2, "You wonder if the lock to his barn is still intact.<br>");
			output(3, "<span id=menu>Press (<span id=letter>Any</span>) key to return to town.</span><br>");
			thread = 1.9;
		}
	}
}

farmrouter = function(x){
	clear();
	if (x==="t"){
		// talk to Grannon
		output(1, "Old Grannon narrows his eyes. <span id=quote>\"You... you haven't come to kill my sheep too?\"</span> His spear wavers between you two.<br>");
		output(2, "<span id=menu>Press (<span id=letter>N</span>) to assure Old Grannon you don't want his sheep, or (<span id=letter>Y</span>) to change your mind and say you're here to steal them.</span><br>");
		thread = 6.1;
	} else if (x==="b"){
		// cut a bitch
		output(1, "<span id=quote>\"Aye,\"</span> growls the old man as he sees you draw out your weapons, <span id=quote>\"that's what I thought! Came to kill more of my sheep, did ye? I'll mount your head in my kitchen, I will!\"</span><br>");
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
		output(1, "Old Grannon looks confused for a moment before the relief becomes obvious on his face. <span id=quote>\"Oh... thank goodness... well, if it's not you, then I suppose the Geist must still be out there.\"</span><br>");
		output(2, "<span id=menu>Press (<span id=letter>Any</span>) key to hear more.</span><br>");
		thread = 6.12
	} else if (x==="y"){
		// gimmie those sheep
		output(1, "<span id=quote>\"I knew it! Sheep thief!\"</span> He shrieks at you as he raises his spear again.<br>");
		output(2, "<span id=menu>Press (<span id=letter>Any</span>) key to attack, or (<span id=letter>R</span>) to run back to town.</span><br>");
		thread = 6.14;
	} else if (y===2){
		// hear about the geist
		clear();
		output(1, "<span id=quote>\"Well, you see,\"</span> the old man says, dropping his spear and looking defeated, <span id=quote>\"it all started a few weeks ago. I would come out to feed me sheep in the morning, see, and one would always be missing.\"</span><br>");
		output(2, "<span id=quote>\"It was me dogs what found 'em, though. What remained of 'em, anyway. Whatever was picking off my flock, one at a time, was tearin' them apart and leaving their heads in the barley field. They was all chewed up, too.\"</span><br>");
		output(3, "<span id=quote>\"This here is dark sorcery... not just that Mage coming out of his cave to cause mischief again. There's a bad creature out there. The Geist. I seen him. And I... I just ain't strong enough to kill it. Not no more.\"</span><br>");
		output(4, "<span id=quote>If'n you'd be willing to hunt down that Geist for me... well, I'd be awful grateful, stranger. It's killing my farm. I... I don't have much, but I'd reward you with whatever I have.</span><br>");
		output(5, "<span id=quest>Hunt down the Geist from Grannon's Farm!</span><br>")
		output(6, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>")
		userInfo.mission = "grannon";
		userInfo.granflag = true;
		thread = 6.13;
	} else if (y===3){
		clear();
		output(1, "<span id=quote>\"To aid you in your hunt,\"</span> the old man continues, <span id=quote>\"you should go visit that damned old Mage in his cave. I'll tell you how to get there.\"</span><br>");
		output(2, "<span id=quote>\"I don't trust in sorcery... but the Geist isn't like men. It's otherworldly. Black as smoke, without form. Maybe the Mage can help you fight back.\"</span><br>");
		output(3, "<span id=quote>\"I appreciate your help, stranger.\"</span><br>");
		output(4, "<span id=gold>For not slaughtering Old Grannon, you gain 1 point of Mysticism!</span><br>");
		output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>")
		userInfo.attributes.myst += 1;
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
		if (y==="l"){
			userInfo.attributes.luck += 1;
			output(4, "1 point has been added to your luck.<br>");
			output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
			thread = 6.6;
		} else if (y==="s"){
			userInfo.attributes.strength += 1;
			output(4, "1 point has been added to your strength.<br>");
			output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
			thread = 6.6;
		} else if (y==="c"){
			userInfo.attributes.charisma += 1;
			output(4, "1 point has been added to your charisma.<br>");
			output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
			thread = 6.6;
		} else if (y==="m"){
			userInfo.attributes.myst += 1;
			output(4, "1 point has been added to your mysticism.<br>");
			output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
			thread = 6.6;
		} else {
			farmlevel();
		}
	} else if (userInfo.granflag) {
		// grannon is alive
		output(1, "As you walk on to the farm, you see Old Grannon at work repairing the calving shed. He grins as he sees you approach, shuffling quickly down to meet you.<br>");
		output(2, "<span id=quote>You did it, " + userInfo.username + "! The Geist is gone, and my flock is recovering!</span><br>");
		output(3, "<span id=quote>Allow me to help you on your journey. What would you like to be better at? <span id=letter>L</span>uck, <span id=letter>S</span>trength, <span id=letter>C</span>harisma or <span id=letter>M</span>ysticism?</span><br>");
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
		output(3, "You ready your " + userInfo.items.weapon.name + " in time to strike first!<br>");
		output(4, "You strike at the " + monster.name + " with your " + userInfo.items.weapon.name + " and inflict " + result + " damage!<br><br>");
		output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
		thread = 6.26;
	} else {
		// monster gets first shot
		output(3, "The " + monster.name + " is too fast for you, and manages to strike first!");
		setTimeout(function(){ gfight(0,"m") }, 2000);
	}
}

gfight = function(x,y){
	if (y==="m"){
		woodsfight(0,"m");
		if(thread===1.22){
			// hit you, did not kill, go to counterattack
			thread=6.25;
		}
	} else if (x==="m"){
		woodsfight("m");
		if (thread===1.22){
			thread=6.25;
		} else { thread===6.27 }
	} else if (x==="r"){
		gwoodsrun();
	} else {
		woodsfight(x);
		if(thread===1.2){
			// killed it, go to reward
			greward();
		} else if (thread==1.22){
			// magic
			thread=6.25;
		} else {
			// didn't kill it, go to monster turn
			thread=6.26;
		}
	}
}

gmagick = function(x){
	if (x==="n") gfight();
	else if (typeof(parseInt(x))==="number"){
		var temp = Number(x)-1;
		// if (userInfo.items.other[temp]===undefined){
		// 	output(5, "Come again?"); setTimeout(function(){ gfight("m") }, 1000)
		// } else {
			// use the magick
		var result = lancemagic(temp);
		if (result === "k"){
			greward();
		} else if (thread===1.27){
			thread=6.24;
		} else if (thread===1.24){
			thread=6.26;
		} else if (thread===1.22){
			thread=6.25;
		}
	} else {
		// user entered some random shit
		output(5, "Come again?"); setTimeout(function(){ gfight("m") }, 1000)
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
