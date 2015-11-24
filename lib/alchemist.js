alchemist = function(x){
	clear();
	signpost("THE APOTHECARY'S CABIN<br>------------------------------------------------");
	output(1, "Beakers of queer liquid overflowing with vapor surround you.<br>");
	if (x === "a") { output(2, "Morgan the Apothecary decants her latest concoction into a beaker.<br>" +
		"\"Step carefully, friend\" she says. \"We don't need an explosion in here... unless, that is... well, dear, what do you seek?\"<br><br>" +
		"<span id=menu>Press (<span id=letter>H</span>) to peruse Morgan's healing potions, (<span id=letter>M</span>) to browse her medicine list, (<span id=letter>A</span>) to ask what she's working on now, or (<span id=letter>L</span>) to leave.</span><br>");
	thread = 0.9;
	}
}

alchemyrouter = function(x){
	if (x==="h"){
		output(2, "Morgan looks you over quickly, and tisks her tongue. \"Feel a wee bit peckish, eh dear? Don't worry... if you have the gold, I'll have you feeling better soon.\"<br>");
		output(3, "Here's what I have today: <br>");
		output(4, "<ul><li>(<span id=letter>1</span>) " + heals.basic.name + " (" + heals.basic.gold + " Gold)<br>" +
			"<li>(<span id=letter>2</span>) " + heals.potent.name + " (" + heals.potent.gold + " Gold)<br>" +
			"<li>(<span id=letter>3</span>) " + heals.antibiotic.name + " (" + heals.antibiotic.gold + " Gold)</ul><br>");
		output(5, "<span id=menu>Select your item, or press <span id=letter>B</span> if nothing interests you.</span><br>");
		thread = 0.91
	} else if (x==="m"){
		output(2, "Morgan nods her head. \"If you have the gold, I have the medicines you need, my dear.\"<br>");
		output(3, "Here's what I have today: <br><br>");
		output(4, "<ul><li>(<span id=letter>1</span>)" + meds.sober.name + " (" + meds.sober.gold + " Gold)<br>" +
			"<li>(<span id=letter>2</span>)" + meds.kola.name + " (" + meds.kola.gold + " Gold)<br>" +
			"<li>(<span id=letter>3</span>)" + meds.berserk.name + " (" + meds.berserk.gold + " Gold)</ul><br>");
		output(5, "<span id=menu>Select your item, or press <span id=letter>B</span> if nothing interests you.</span>");
		thread = 0.92
	} else if (x==="a"){
		output(2, "whatcha workin on");
		output(5, "<span id=menu>Select your item, or press <span id=letter>B</span> if nothing interests you.</span><br>");
		thread = 0.91
	} else if (x==="l"){ 
		output(2, "You turn and exit back out to the town square."); 
		setTimeout(function(){ townsquare() }, 1500);
	} else {
		output(2, "Come again?"); 
		setTimeout(function(){ alchemist("a") }, 1000);
	}
}

alchconfirm = function(x, type){
	if (x==="b") { alchpurch("n") 
	} else if (type ==="heals"){
		if (x==="1"){
			output(5, "<br>Are you sure you want the " + heals.basic.name + "?<br>" +
				"This is your standard-issue rejuvenating elixir. Restores up to 20 HP.<br>" + 
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = heals.basic;
			thread = 0.911;
		} else if (x==="2"){
			output(5, "Are you sure you want the " + heals.potent.name + "?<br>" +
				"A more potent rejuvenating elixir. Restores up to 40 HP.<br>" + 
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = heals.potent;
			thread = 0.911;
		} else if (x==="3"){
			output(5, "Are you sure you want the " + heals.antibiotic.name + "?<br>" +
				"Have your wounds begun to fester? Quick, before it's too late - take this to stop the spread!<br>" + 
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = heals.antibiotic;
			thread = 0.911;
		} else { output(3, "Come again?"); setTimeout(function(){ alchemyrouter("h") }, 1000) }
	} 
	else if (type==="meds") {
		chooseclear(4);
		chooseclear(5);
		if (x==="1"){
			chooseclear(4);
			chooseclear(5);
			output(3, "Are you sure you want the " + meds.sober.name + "?<br>" +
				"Had a few too many at the Tavern? This elixir will immediately clear your mind and put you back in fighting form.<br>" +
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = meds.sober;
			thread = 0.912;
		} else if (x==="2"){
			output(3, "Are you sure you want the " + meds.kola.name + "?<br>" +
				"Heading into the forest? Need to sharpen your senses? A few kola nuts will heighten your awareness and make you extra-aware of your surroundings.<br>" +
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = meds.kola;
			thread = 0.912;
		} else if (x==="3"){
			output(3, "Are you sure you want the " + meds.berserk.name + "?<br>" +
				"Be wary with this one. The berserker infusion is powerful. It will temporarily make you extra-powerful, super strong and a terrifying battle opponent - but its effects will also linger after the battle ends.<br>" +
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = meds.berserk;
			thread = 0.912;
		} 
		// else if (x==="4"){
		// 	output(3, "Are you sure you want the " + armor.lev0.steelplate.name + "?<br>" +
		// 		"Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.<br>" +
		// 		"------------------------------------------------<br>");
		// 	currentmerch = armor.lev0.steelplate;
		// 	thread = 0.812;
		else { output(3, "Come again?"); setTimeout(function(){ alchemyrouter("m") }, 1000) }
	}
}

alchpurch = function(x, type){
	if (x==="n"){
			// no
			chooseclear(2);
			chooseclear(3);
			chooseclear(5);
			output(3, "Morgan rolls her eyes. \"I haven't got all day, you know.\"<br>");
			output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			thread = 0.905;
	} else if (type === "heals") {
		if (userInfo.gold >= currentmerch.gold) {
			chooseclear(2);
			chooseclear(5);
			// successful buy
			console.log("pre assign: " + userInfo.items);
			userInfo.gold = userInfo.gold - currentmerch.gold;
			for (key in heals){
				if (currentmerch === heals[key])
					userInfo.items.other.push(currentmerch);
				}
			console.log("post assign: " + userInfo.items.other[0].name);
			output(3, "Morgan smiles, handing you the " + currentmerch.name + " and slipping your gold into one of her robe's deep pockets. \"Feel better soon,\" she says.<br>");
			output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			thread = 0.905;
		} else {
			// not enough simoleons
			chooseclear(2);
			chooseclear(5);
			output(3, "Morgan's eyebrow arches up. \"This isn't the tavern, and my medicines aren't cheap swill. Come back when you have enough gold.\"");
			output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			thread = 0.905;
		}
	} else if (type === "meds") {
		if (userInfo.gold >= currentmerch.gold) {
			// successful buy
			chooseclear(2);
			console.log("pre assign: " + userInfo.items);
			userInfo.gold = userInfo.gold - currentmerch.gold;
			for (key in meds){
				if (currentmerch === meds[key])
					userInfo.items.other.push(currentmerch);
				}
			console.log("post assign: " + userInfo.items.other[0].name);
			output(3, "Morgan smiles, handing you the " + currentmerch.name + " and slipping your gold into one of her robe's deep pockets. \"Use it well,\" she says.");
			output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			thread = 0.905;
		} else {
			// not enough simoleons
			chooseclear(2);
			output(3, "Morgan's eyebrow arches up. \"This isn't the tavern, and my medicines aren't cheap swill. Come back when you have enough gold.\"");
			output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			thread = 0.905;
		}
	} 
}

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

meds ={
	sober:{
		name: "Sobriety potion",
		gold: 150
	},
	kola:{
		name: "Kola nuts",
		gold: 200
	},
	berserk:{
		name: "Berserker infusion",
		gold: 250
	}
}
	