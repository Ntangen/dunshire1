qturns = 0;
// used for quercus request thing


alchemist = function(x){
	clear();
	signpost("THE APOTHECARY'S CABIN<br>------------------------------------------------");
	output(1, "Beakers of queer liquid overflowing with vapor surround you.<br>");
	Meteor.call("acts",x,"events","apothecary");
	output(2, "Morgan the Apothecary decants her latest concoction into a beaker.<br>");
	// if (flag==="drugs"){
	// 	output(3, "<span id=quote>\"Step carefully, fr...</span> she says, before looking up and seeing your tell-tale shaking and pale complexion. A thin, cruel smile spreads across her face. <span id=quote>Been taking a few too many of my remedies, have you?</span> she asks, knowingly.<br>" + 
	// 		"<span id=quote>The addiction you're experiencing now will only get worse. I promise you. And to beat it, you will require my help. Just let me know when.</span>");
	// 	output(4, "<span id=quote>Now, dear... what do you seek today?</span><br><br>" +
	// 		"<span id=menu>Press (<span id=letter>H</span>) to peruse Morgan's potions, (<span id=letter>M</span>) to browse her medicine list, (<span id=letter>A</span>) to ask what she's working on now, (<span id=letter>D</span>) to inquire about curing your addiction, or (<span id=letter>L</span>) to leave.</span><br>");
	// } 
	if (userInfo.level.level===4){
		if (userInfo.mission==="morgan" && !missioncomplete){
			// intra-mission menu
			output(3, "<span id=quote>I do look forward to that Quercus root, " + userInfo.username + "!</span><br>");
			output(4, "<span id=quote>Now, dear... what do you seek today?</span><br><br>" +
			"<span id=menu>Press (<span id=letter>H</span>) to peruse Morgan's potions, (<span id=letter>M</span>) to browse her medicine list, (<span id=letter>A</span>) to ask what she's working on now, (<span id=letter>D</span>) to inquire about curing your addiction, or (<span id=letter>L</span>) to leave.</span><br>");
			thread = 0.9
		} else if (userInfo.mission==="morgan" && missioncomplete){
			// finished mission
			output(3, "Walking into the cabin, you meet Morgan's inquiring look by tossing the small bag containing the Quercus root down on her work table. Morgan removes the root, examining it in her hands with a specialist's eye.<br>");
			output(4, "<span id=quote>This is remarkable... I've never seen such a specimen so well preserved! So fresh! You've done well, " + userInfo.username + " - my thanks to you!</span><br>");
			output(5, "<span id=quote>And... as promised... you shall have your reward. Have a seat for just a moment.</span><br>");
			output(6, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			thread=0.99
		} else {
			// before you've accepted mission
			output(3, "Sitting listlessly at her work bench, Morgan hardly looks up at you, her brow furrowed as she stares into the shimmering liquid before her. Bags hang under her eyes, and her hair is unkempt.<br><br>" +
			"<span id=menu>Press (<span id=letter>H</span>) to peruse Morgan's healing potions, (<span id=letter>M</span>) to browse her medicine list, (<span id=letter>A</span>) to ask what she's working on now, or (<span id=letter>L</span>) to leave.</span><br>");
			thread = 0.9
		}
	} else {
		output(3, "<span id=quote>Step carefully, friend...</span> she says. <span id=quote>\"We don't need an explosion in here... unless, that is... well, dear, what do you seek?\"</span><br><br>" +
		"<span id=menu>Press (<span id=letter>H</span>) to peruse Morgan's potions, (<span id=letter>M</span>) to browse her medicine list, (<span id=letter>A</span>) to ask what she's working on now, or (<span id=letter>L</span>) to leave.</span><br>");
	thread = 0.9;
	}
}

alchemyrouter = function(x,y){
	if (x==="h"){
		if (userInfo.level.level>=5){
			output(2, "Morgan looks you over quickly, and tisks her tongue. <span id=quote>\"Feel a wee bit peckish, eh dear? Don't worry... if you have the gold, I'll have you feeling better soon.\"</span><br>");
			output(3, "<span id=quote>Here's what I have today: </span><br>");
			output(4, "<ul><li>(<span id=letter>1</span>) " + heals.basic.name + " (" + heals.basic.gold + " Gold)<br>" +
				"<li>(<span id=letter>2</span>) " + heals.potent.name + " (" + heals.potent.gold + " Gold)<br>" +
				"<li>(<span id=letter>3</span>) " + heals.antibiotic.name + " (" + heals.antibiotic.gold + " Gold)<br>" +
				"<li>(<span id=letter>4</span>) " + stuff.bang.fire.name + " (" + stuff.bang.fire.gold + " Gold)</ul><br>");
			output(5, "<span id=menu>Select your item, or press <span id=letter>B</span> if nothing interests you.</span><br>");
			thread = 0.91
		} else {
			output(2, "Morgan looks you over quickly, and tisks her tongue. <span id=quote>\"Feel a wee bit peckish, eh dear? Don't worry... if you have the gold, I'll have you feeling better soon.\"</span><br>");
			output(3, "<span id=quote>Here's what I have today: </span><br>");
			output(4, "<ul><li>(<span id=letter>1</span>) " + heals.basic.name + " (" + heals.basic.gold + " Gold)<br>" +
				"<li>(<span id=letter>2</span>) " + heals.potent.name + " (" + heals.potent.gold + " Gold)<br>" +
				"<li>(<span id=letter>3</span>) " + heals.antibiotic.name + " (" + heals.antibiotic.gold + " Gold)</ul><br>");
			output(5, "<span id=menu>Select your item, or press <span id=letter>B</span> if nothing interests you.</span><br>");
			thread = 0.91			
		}
	} else if (x==="m"){
		output(2, "Morgan nods her head. <span id=quote>\"If you have the gold, I have the medicines you need, my dear.\"</span><br>");
		output(3, "<span id=quote>Here's what I have today: </span><br><br>");
		output(4, "<ul><li>(<span id=letter>1</span>)" + meds.sober.name + " (" + meds.sober.gold + " Gold)<br>" +
			"<li>(<span id=letter>2</span>)" + meds.kola.name + " (" + meds.kola.gold + " Gold)<br>" +
			"<li>(<span id=letter>3</span>)" + meds.berserk.name + " (" + meds.berserk.gold + " Gold)</ul><br>");
		output(5, "<span id=menu>Select your item, or press <span id=letter>B</span> if nothing interests you.</span>");
		thread = 0.92
	} else if (x==="a"){
		if (userInfo.level.level===4 && userInfo.mission!="morgan"){
			// give you mission 5
			clear();
			output(2, "Morgan hesitates for a few beats, and then sighs deeply. She puts down the stirrer for the beaker before her. <span id=quote>\"I am working on a new potion for an idea I have, but... \"</span> she trails off, lost in thought.<br><br>");
			output(3, "<span id=menu>Press <span id=letter>Any</span> key to ask her to go on.</span>");
			thread = 0.93
		} else if (userInfo.level.level===4 && userInfo.mission==="morgan"){
			clear();
			output(2, "Morgan rubs her eyes. <span id=quote>\"I do look forward to that Quercus root from the Dark Forest, my dear. When you obtain it, please waste no time in returning here!\"");
			output(3, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			thread = 0.905;
		} else {
			chooseclear(2);
			chooseclear(3);
			chooseclear(4);
			output(2, "<span id=quote>Ask another time, " + userInfo.username + ". You never know what I may have for you.</span><br>");
			setTimeout(function(){ alchemist() }, 1500);
			thread = 0.905
		}
	} else if (x==="a1"){
		// continuation of mission grant
		output(3, "Morgan startles. <span id=quote>\"Oh! I... I'm sorry... this new project has kept me up nights. I think I may have stumbled on a new concoction that's quite... extraordinary... yet I'm missing a critical ingredient. Nothing I try acts as a proper substitute.\"</span><br><br>");
		output(4, "Morgan tilts her head up to you and narrows her eyes. <span id=quote>\"Actually... there IS a way you could help, if you wanted to... I could certainly make it worth your time.<br>" +
			"The ingredient I lack is a cutting of a Quercus tree root. I haven't seen one in a long time - they're very rare. I've heard word of a Quercus deep in a hollow of the Dark Woods, but... I don't dare venture there myself.</span><br>");
		output(5, "<span id=quote>So... are you interested?\"</span><br><br>");
		output(6, "<span id=menu>Press <span id=letter>N</span> to decline for now, or <span id=letter>Any</span> other key to accept.</span>");
		thread = 0.94
	} else if (x==="a2"){
		if (y==="n") {
			// decline the quest
		} else {
			clear();
			output(1, "Morgan's eyes light up. <span id=quote>\"Egads! Thank you! This potion will be like nothing you've ever seen... just you wait!\"</span><br><br>");
			output(2, "<span id=quest>You have accepted Morgan's Request!</span><br><br>");
			output(3, "Morgan draws you a crude map of the eastern quarter of the Dark Forest. You'll begin your search there.<br><br>");
			output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			userInfo.mission = "morgan";
			thread=0.95;
		}
	} else if (x==="a3"){
		clear();
		output(1, "<span id=quote>\"Just one more thing, " + userInfo.username + " - have you ever... ahem... *seen* a Quercus?\" Morgan asks, squinting at you.</span><br><br>");
		output(3, "Seeing you shake your head, Morgan looks nervously around. <span id=quote>\"Ah. I see. Ah. Well... a word to the wise? Make sure you keep that " + userInfo.items.weapon.name + " ready. I hear Quercus trees hate... strangers. Be safe, now. This one's on the house.\"</span><br><br>");
		output(4, "<span id=gold>Morgan slides a healing potion over to you!</span><br><br>");
		output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
		userInfo.items.other.push(heals.basic);
		thread=0.905
	} else if (x==="l"){ 
		chooseclear(3);
		chooseclear(4);
		chooseclear(5);
		output(2, "You turn and exit back out to the town square."); 
		setTimeout(function(){ townsquare() }, 1500)
	} else if (x==="d" && flag==="drugs"){
		addiction();
	} else {
		chooseclear(2); chooseclear(3); chooseclear(4); chooseclear(5);
		output(2, "Come again?"); 
		setTimeout(function(){ alchemist() }, 1000)
	}
}

alchconfirm = function(x, type){
	if (x==="b") { alchpurch("n") 
	} else if (type ==="heals"){
		if (x==="1"){
			output(5, "<br>Are you sure you want the " + heals.basic.name + "?<br><br>" +
				"This is your standard-issue rejuvenating elixir. Restores up to 20 HP.<br>" + 
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = heals.basic;
			thread = 0.911;
		} else if (x==="2"){
			output(5, "Are you sure you want the " + heals.potent.name + "?<br><br>" +
				"A more potent rejuvenating elixir. Restores up to 40 HP.<br>" + 
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = heals.potent;
			thread = 0.911;
		} else if (x==="3"){
			output(5, "Are you sure you want the " + heals.antibiotic.name + "?<br><br>" +
				"Have your wounds begun to fester? Quick, before it's too late - take this to stop the spread!<br>" + 
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = heals.antibiotic;
			thread = 0.911;
		} else if (x==="4" && userInfo.level.level>=5){
			output(5, "Are you sure you want the " + stuff.bang.fire.name + "?<br><br>" +
				"Do you have a problem that you just need... dead? This powerful explosive vial will cover your opponent in liquid fire during battle.<br>" + 
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = stuff.bang.fire;
			thread = 0.911;			
		} else { chooseclear(2); chooseclear(3); chooseclear(4); chooseclear(5); output(3, "Come again?"); setTimeout(function(){ alchemyrouter("h") }, 1000) }
	} 
	else if (type==="meds") {
		chooseclear(4);
		chooseclear(5);
		if (x==="1"){
			chooseclear(4);
			chooseclear(5);
			output(3, "Are you sure you want the " + meds.sober.name + "?<br><br>" +
				"Had a few too many at the Tavern? This elixir will immediately clear your mind and put you back in fighting form.<br>" +
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = meds.sober;
			thread = 0.912;
		} else if (x==="2"){
			output(3, "Are you sure you want the " + meds.kola.name + "?<br><br>" +
				"Heading into the forest? Need to sharpen your senses? A few kola nuts will stimulate your senses, and give you 5 extra turns for the day.<br>" +
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = meds.kola;
			thread = 0.912;
		} else if (x==="3"){
			output(3, "Are you sure you want the " + meds.berserk.name + "?<br><br>" +
				"Be wary with this one. The berserker infusion is powerful. It will temporarily make you extra-powerful, super strong and a terrifying battle opponent - but some of its... effects... will also linger after the battle ends.<br>" +
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = meds.berserk;
			thread = 0.912;
		} else { chooseclear(2); chooseclear(3); chooseclear(4); chooseclear(5); output(3, "Come again?"); setTimeout(function(){ alchemyrouter("m") }, 1000) }
	}
}

alchpurch = function(x, type){
	if (x==="n"){
			// no
		chooseclear(2);
		chooseclear(3);
		chooseclear(5);
		output(3, "Morgan rolls her eyes. <span id=quote>\"I haven't got all day, you know.\"</span><br>");
		output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
		thread = 0.905;
	} else if (type === "heals") {
		if (userInfo.gold >= currentmerch.gold) {
			chooseclear(2);
			chooseclear(5);
			// successful buy
			Meteor.call("acts",x,"events","alch buy");
			console.log("pre assign: " + userInfo.items);
			userInfo.gold = userInfo.gold - currentmerch.gold;
			for (key in heals){
				if (currentmerch === heals[key])
					userInfo.items.other.push(currentmerch);
				}
			console.log("post assign: " + userInfo.items.other[0].name);
			if (currentmerch.name==="Morgan's Fire Chanter"){
				output(3, "Morgan arches her eyebrow, handing you the " + currentmerch.name + " with a knowing look and slipping your gold into one of her robe's deep pockets. <span id=quote>\"Good luck out there, " + userInfo.level.name + ". Use this wisely.\"</span><br>");
				output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
				thread = 0.905
			} else {
				output(3, "Morgan smiles, handing you the " + currentmerch.name + " and slipping your gold into one of her robe's deep pockets. <span id=quote>\"Feel better soon, " + userInfo.level.name + ".\"</span><br>");
				output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
				thread = 0.905;
			}
		} else {
			// not enough simoleons
			chooseclear(2);
			chooseclear(5);
			output(3, "Morgan's eyebrow arches up. <span id=quote>\"This isn't the tavern, and my medicines aren't cheap swill. Come back when you have enough gold.\"</span><br>");
			output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			thread = 0.905;
		}
	} else if (type === "meds") {
		if (userInfo.gold >= currentmerch.gold) {
			// successful buy
			Meteor.call("acts",x,"events","alch buy");
			chooseclear(2);
			console.log("pre assign: " + userInfo.items);
			userInfo.gold = userInfo.gold - currentmerch.gold;
			for (key in meds){
				if (currentmerch === meds[key])
					userInfo.items.other.push(currentmerch);
				}
			console.log("post assign: " + userInfo.items.other[0].name);
			output(3, "Morgan smiles, handing you the " + currentmerch.name + " and slipping your gold into one of her robe's deep pockets. <span id=quote>\"Use it well,\"</span> she says.");
			output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			thread = 0.905;
		} else {
			// not enough simoleons
			chooseclear(2);
			output(3, "Morgan's eyebrow arches up. <span id=quote>\"This isn't the tavern, and my medicines aren't cheap swill. Come back when you have enough gold.\"</span><br>");
			output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			thread = 0.905;
		}
	} 
}

// gear functions

showgear = function(x){
	if (userInfo.items.other.length ===0){
		return 0
	} else {
		var returnvar = "Your current supplies:<br><br>";
	 	var templist = "";
	 	function listbuild (x,y,z) {
			templist += "<li>" + x.name + "<br>";
			}
		userInfo.items.other.forEach(listbuild);
		returnvar += "<ol>" + templist + "</ol><br><br><span id=menu>Press the <span id=enter>Number</span> of any item you wish to use, or <span id=enter>Any</span> other key to change your mind.</span><br>";
		return returnvar;
	}
}

usegear = function(x){
	var temp2;
	if (userInfo.drugs === undefined){
		userInfo.drugs = 0;
	} 
	if (userInfo.items.other[x]===undefined){
		temp2 = "na";
	} else if (userInfo.items.other[x].name === "Healing elixir"){
		if (userInfo.hp + heals.basic.potency > userInfo.level.maxhp){
			userInfo.hp = userInfo.level.maxhp;
		} else {
			userInfo.hp += heals.basic.potency;
		}
		userInfo.items.other.splice(x,1);
		temp2 = "You uncork Morgan's " + heals.basic.name + " and swill it all.<br><br>You feel stronger already!<br>";
	} else if (userInfo.items.other[x].name === "Extra potent healing elixir"){
		if (userInfo.hp + heals.potent.potency > userInfo.level.maxhp){
			userInfo.hp = userInfo.level.maxhp;
		} else {
			userInfo.hp += heals.potent.potency;
		}
		userInfo.items.other.splice(x,1);
		temp2 = "You uncork Morgan's " + heals.potent.name + " and swill it all.<br><br>You feel stronger already!<br>";
	} else if (userInfo.items.other[x].name === "Antifester"){
		flag = undefined;
		userInfo.items.other.splice(x,1);
		temp2 = "You uncork Morgan's " + heals.antibiotic.name + " and swill it all.<br><br>Your battle wounds regain a healthy pink color!<br>";
	} else if (userInfo.items.other[x].name === "Precious rubies"){
		temp2 = "You can't use that here.<br>";
	} else if (userInfo.items.other[x].name === "Innoculated kola nuts"){
		userInfo.turnsToday += 5;
		userInfo.drugs += 1;
		temp2 = "You take a handful of Morgan's special kola nuts and crunch down on them. The bitterness almost makes you gag.<br><br><span id=gold>You are energized! Five turns are added to your daily limit!</span><br>";
	} else if (userInfo.items.other[x].name === "Berserker infusion"){
		batpoints = 5;
		userInfo.drugs += 2;
		temp2 = "Steadying yourself, you gulp down the vial of Morgan's Berserker infusion. It burns going down.<br><br><span id=gold>You feel the strength of ten men, and crave battle!</span><br>";
	} else if (x==="fire"){
		for (i=0;i<userInfo.items.other.length;i++){
			if (userInfo.items.other[i].name==="Morgan's Fire Chanter"){
				userInfo.items.other.splice(i,1);
				break
			}
		}
		temp2 = "Gingerly, but with haste, you wrest the cool glass vial of Morgan's Fire Chanter from its pouch, take aim, and heave it at the " + monster.name + ".<br>As it shatters, a great fireball explodes, completely enveloping the " + monster.name + " in greenish flame! Its shrieks of pain echo all around you!<br>";
	}
	// if (userInfo.drugs>=6){
	// 	temp2 += "<span id=death>Oh no! You have developed an addiction to Morgan's exotic medications.</span><br><br>You exhaust easily, and will lose your daily turns at <span id=death>twice the normal rate</span> until your addiction is cured. You must return to Morgan's Apothecary for the cure!<br>";
	// 	flag = "drugs";
	// }
	return temp2;
}

istherefire = function(){
	for (i=0;i<userInfo.items.other.length;i++){
		if (userInfo.items.other[i].name==="Morgan's Fire Chanter"){
			return true;
			break
		}
	}
	return false;
}

// addiction = function(){
// 	// this is coming
// }

quercus = function(){
	clear();
	monster=beasts.lev4b;
	mhp = monster.hp;
	output(1, "The ground trembles beneath your feet as you hear a low boom behind you. You spin around and unsheath your " + userInfo.items.weapon.name + ", but see only leaves falling from the trees around you. An empty forest surrounds you. And yet...<br>");
	setTimeout(function(){ output(2, "A giant tree branch swings your way! You manage to duck and roll away, and it misses your head by inches. But looking up, you see a great, hulking, living tree trunk lumber your way, supported by a churning knot of roots, big and small. The great tree has no face, but its branches are streaked in blood.<br>") }, 500);
	output(3, "The Quercus tree bears down on you! Defend yourself!<br><br>");
	output(4, "Your hitpoints: " + userInfo.hp + "<br><br>" +
			monster.name +"'s hitpoints: " + mhp + "<br>"); 
	output(5, "------------------------------------------------<br><br>"+
			"<span id=menu>Press (<span id=letter>R</span>) to attempt to run away, (<span id=letter>M</span>) to invoke magick, or (<span id=letter>Any</span>) other key to attack.<br></span>");
	thread = 0.96;
}

querfight = function(x,y){
	clear();
	if (x==="r"){
		output(1, "You prefer your hide to your pride, and turn to run away!<br>");
		if (Math.random()>0.75){
			// failed
			output (2, "You're not quick enough to avoid the Quercus root that shoots out and grabs your foot, dragging you back to face its wrath!<br>");
			output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 0.97
		} else {
			output (2, "You manage to outrun the fearsome Quercus. You resolve to not tell anyone about this...<br>" +
				"<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			userInfo.turnsToday -= turns;
			turns = 0;
			thread = 1.23
		}
	} else if (y==="q"){
		clear();
		var result = monsterfight(monster);
		statusupdate();
		if (result === "dead"){
			console.log("dead");
			output(1, "<span id=defeat>Zounds! The Quercus crushes you between two thick branches! You feel your chest crunching between its limbs. As the world fades, you feel roots beginning to envelop you to become the living tree's next meal...</span><br>" +
				"------------------------------------------------<br><br><br>");
			output(2, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 86
		} else if (result==="zip"){
			output(1, "The Quercus glances you with a thrusting root, but your armor protects you! You sustain 0 damage!<br>" +
				"------------------------------------------------<br>");
			output(2, "Your hitpoints: " + userInfo.hp + "<br>" +
				monster.name +"'s hitpoints: " + mhp + "<br>");
			output(3, "<span id=menu>Press (<span id=letter>R</span>) to attempt to run away, (<span id=letter>M</span>) to invoke magick, or (<span id=letter>Any</span>) other key to counterattack.<br></span>");
			thread = 0.96
		} else {
			// monster strikes with damage, no kill
			if (shieldflag){
				output(1, "The " + monster.name + " " + monster.strike1 + ", inflicting " + result + " damage! Your Egregious Shield absorbs part of the blow.<br>" +
				"------------------------------------------------<br>");
			} else {
				output(1, "The " + monster.name + " " + monster.strike1 + ", inflicting " + result + " damage!<br>" +
				"------------------------------------------------<br>");
			}
			output(2, "Your hitpoints: " + userInfo.hp + "<br>" +
				monster.name +"'s hitpoints: " + mhp + "<br>");
			output(3, "<span id=menu>Press (<span id=letter>R</span>) to attempt to run away, (<span id=letter>M</span>) to invoke magick, or (<span id=letter>Any</span>) other key to counterattack.<br></span>");
			thread = 0.96
		}
	} else if (x==="m"){
		// magick
		clear();
		output(1, "Your hitpoints: " + userInfo.hp + "<br>" +
			monster.name +"'s hitpoints: " + mhp + "<br>" + 
			"------------------------------------------------<br><br>");
		if (userInfo.items.magic[0]===undefined){
			output(2, "You have no knowledge of magicks!<br>" + 
				"<span id=menu>Press (<span id=letter>R</span>) to attempt to run away or (<span id=letter>Any</span>) other key to counterattack.</span>");
			thread = 0.96
		} else {
			output(1, listmagick()); 
			thread = 0.971
		}
	} else {
		// default option - player attack
		clear();
		output(1, "Readying your weapon, you steel yourself for battle.");
		var result = userfight(monster);
		statusupdate();
		// kill the monster
		if (result === "k") {
			if (turns === 0) {
				console.log("kill single blow");
				output(2, "<span id=victory>With a mighty yell, you cut down the Quercus in a single, reverberating blow!</span><br><br>" +
				"<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
				thread = 0.98;
				}
			else { 
				console.log("kill");
				output(2, "<span id=victory>With a mighty yell, you cut down the Quercus in a final, reverberating blow! Chips of wood spray across the forest floor as the giant killer tree reels and crashes to the ground, dead.</span><br><br>" +
				"<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
				thread = 0.98;
				}	
		} else if (result==="zip"){
			// strike, 0 damage
			output(2, "You uselessly strike at the Quercus tree with your " + userInfo.items.weapon.name + " but hilariously inflict no damage!<br><br>");
			output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 0.97
		} else { 
			// strike don't kill
			output(2, "You strike the Quercus with your " + userInfo.items.weapon.name + ", inflicting " + result + " in a damage! The great tree stumbles and roars back in wrath!<br><br>");
			output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 0.97
		}		
	}
}

qmagick = function(x){
	if (x==="n") woodsfight();
	else if (typeof(parseInt(x))==="number"){
		var temp = Number(x)-1;
		if (userInfo.items.magic[temp]===undefined){
			output(5, "Come again?"); setTimeout(function(){ querfight("m") }, 1000)
		} else {
			// use the magick
			var result = lancemagic(temp);
			if (result === "k"){
				console.log("kill");
				output(4, "<span id=victory>With an ear-piercing sqeual, chips of wood spray across the forest floor as the giant killer tree reels and crashes to the ground, dead.</span><br><br>" +
				"<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
				thread = 0.98
			} else if (thread===1.27){
				// magick doesn't work
				thread=0.972
			} else if (thread===1.24){
				// successful hit
				thread = 0.97
			} else if (thread==1.22){
				// run/magick/attack
				thread=0.96
			}
		}
	} else {
		// user entered some random shit
		output(5, "Come again?"); setTimeout(function(){ woodsfight("m") }, 1000)
	}
}

quervictory = function(){
	// winning
	clear();
	output(1, "Leaves flutter all around you as the branches of the Quercus settle on the ground. Its writhing roots lay still now, slowly sinking into the soil.<br>" + 
		"Thinking quickly, you rush over and slice off a large section of root. It trembles a bit in your hand and then goes limp.<br>");
	output(2, "You should return the root to Morgan the Apothecary right away!<br><br>");
	output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
	missioncomplete=true;
	thread = 1.23
}

quervictory1 = function(){
	clear();
	output(1, "Morgan disappears into the dark laboratory room separated by a thick shroud. You think you see something moving in there...<br>" +
		"She emerges a few minutes later and hands you a small, hard object inside a leather pouch. <span id=quote>This is a vial of my newest creation, " + userInfo.username + ". I call it, my <span id=quote>Fire Chanter.</span> You may use it in combat - but beware. It will engulf whatever you throw it at in a... really quite beautiful... fireball. It should vanquish all but extremely formidable enemies.</span><br>");
	output(2, "<span id=quote>With this root sample you've given me, I will be able to synthesize more of this potion from now on, too. For... a reasonable price, of course.</span> She grins wanly and goes back to her experiments.<br><br>");
	output(3, "<span=quest>You have fulfilled Morgan's Request!</span><br>" +
		"<span id=gold>You advance to Level 5: Ranger.</span><br>" +
		"Your maximum hitpoints have increased, and <span id=gold>You receive an additional 100 experience!</span><br><br>");
	output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span><br>");
	levelup(5);
	userInfo.xp += 100;
}

// meds

heals = {
	basic:{
		name: "Healing elixir",
		potency: 20,
		gold: 50
	},
	potent:{
		name: "Extra potent healing elixir",
		potency: 40,
		gold: 100
	},
	antibiotic:{
		name: "Antifester",
		gold: 250
	}
}

meds = {
	sober:{
		name: "Sobriety potion",
		gold: 75
	},
	kola:{
		name: "Innoculated kola nuts",
		gold: 100
	},
	berserk:{
		name: "Berserker infusion",
		gold: 150
	}
}


