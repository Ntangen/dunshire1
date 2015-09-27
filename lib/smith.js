currentmerch = undefined;

smithy = function (x){
	clear();
	signpost("THE SMITHER'S SHOP<br>------------------------------------------------");
	output(1, "The smell of burning iron fills your nose.<br>");
	if (x === "a") { output(2, "Rolf the Smithy looks up from his workbench.<br>" +
		"Well? What is it, stranger? Are you buyin' or repairin'? I've got work to do here!<br><br>" +
		"Press (<span id=letter>W</span>) to browse Rolf's weaponry, (<span id=letter>A</span>) to examine his armor, (<span id=letter>R</span>) to have repairs made to your gear, or (<span id=letter>L</span>) to leave.");
	thread = 0.8;		
	}
}

smithrouter = function(x){
	if (x === "w") { output(2, "Rolf scowls. \"Well, all right then... here's what I got today:\"<br>" + "<p>" + weaps);
			thread = 0.81;
	}
	else if (x === "a") { output(2, "Rolf scowls. \"Well, all right then... here's what I got today:\"<br>" + "<p>" + arms);
			thread = 0.82;
	} 
	else if (x === "r") { output(2, "We'll have a look at what you have to be repaired later.<br>"+ 
		"Press enter");
			thread = 0.83;
	} 
	else if (x === "l") { output(2, "You turn and exit back out to the town square."); 
			setTimeout(function(){ townsquare() }, 1500);
	} 
	else { output(2, "Come again?"); setTimeout(function(){ smithy("a") }, 1000) }
}

smithconfirm = function(x, type){
	if (type ==="weap"){
		if (x==="1"){
			output(3, "Are you sure you want the " + weapons.lev0.woodclub.name + "?<br>" +
				"Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.<br>" +
				"------------------------------------------------<br>");
			currentmerch = weapons.lev0.woodclub;
			thread = 0.811;
		} else if (x==="2"){
			output(3, "Are you sure you want the " + weapons.lev0.stsword.name + "?<br>" +
				"Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.<br>" +
				"------------------------------------------------<br>");
			currentmerch = weapons.lev0.stsword;		
			thread = 0.811;
		} else if (x==="3"){
			output(3, "Are you sure you want the " + weapons.lev0.mace.name + "?<br>" +
				"Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.<br>" +
				"------------------------------------------------<br>");
			currentmerch = weapons.lev0.mace;		
			thread = 0.811;
		} else if (x==="4"){
			output(3, "Are you sure you want the " + weapons.lev0.oldsword.name + "?<br>" +
				"Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.<br>" +
				"------------------------------------------------<br>");
			currentmerch = weapons.lev0.oldsword;		
			thread = 0.811;
		} else { output(3, "Come again?"); setTimeout(function(){ smithrouter("w") }, 1000) }
	} else if (type==="arm") {
		if (x==="1"){
			output(3, "Are you sure you want the " + armor.lev0.canvas.name + "?<br>" +
				"Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.<br>" +
				"------------------------------------------------<br>");
			currentmerch = armor.lev0.canvas;
			thread = 0.812;
		} else if (x==="2"){
			output(3, "Are you sure you want the " + armor.lev0.leather.name + "?<br>" +
				"Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.<br>" +
				"------------------------------------------------<br>");
			currentmerch = armor.lev0.leather;
			thread = 0.812;
		} else if (x==="3"){
			output(3, "Are you sure you want the " + armor.lev0.chainmail.name + "?<br>" +
				"Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.<br>" +
				"------------------------------------------------<br>");
			currentmerch = armor.lev0.chainmail;
			thread = 0.812;
		} else if (x==="4"){
			output(3, "Are you sure you want the " + armor.lev0.steelplate.name + "?<br>" +
				"Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.<br>" +
				"------------------------------------------------<br>");
			currentmerch = armor.lev0.steelplate;
			thread = 0.812;
		} else { output(3, "Come again?"); setTimeout(function(){ smithrouter("w") }, 1000) }
	}
}

purch = function(x, type){
	if (x==="n"){
			// no
			output(4, "Rolf grunts. \"Fickle lil fella, ain't ya?\"<br>");
			output(5, "(Hit <span id=enter>Any</span> key to continue.)");
			thread = 0.83;
	} else if (type === "weap") {
		if (userInfo.gold >= currentmerch.gold) {
			// successful buy
			console.log("pre assign: " + userInfo.items.weapon.name);
			userInfo.gold = userInfo.gold - currentmerch.gold;
			for (key in weapons.lev0){
				if (currentmerch === weapons.lev0[key])
					userInfo.items.weapon = weapons.lev0[key]
				}
			console.log("post assign: " + userInfo.items.weapon.name);
			output(4, "Rolf grunts, handing over the " + currentmerch.name + " and putting your pouch of gold under the counter. \"Wield it well\", stranger.");
			output(5, "(Hit <span id=enter>Any</span> key to continue.)");
			thread = 0.83;
		} else {
			// not enough simoleons
			output(4, "Rolf snorts. \"This here ain't a charity! Come back when you have enough gold!\"");
			output(5, "(Hit <span id=enter>Any</span> key to continue.)");
			thread = 0.83;
		}
	} else if (type === "arm") {
		if (userInfo.gold >= currentmerch.gold) {
			// successful buy
			console.log("pre assign: " + userInfo.items.armor.name);
			userInfo.gold = userInfo.gold - currentmerch.gold;
			for (key in armor.lev0){
				if (currentmerch === armor.lev0[key])
					userInfo.items.armor = armor.lev0[key]
				}
			console.log("post assign: " + userInfo.items.armor.name);
			output(4, "Rolf grunts, handing over the " + currentmerch.name + " and putting your pouch of gold under the counter. \"Wear it well, stranger.\"");
			output(5, "(Hit <span id=enter>Any</span> key to continue.)");
			thread = 0.83;
		} else {
			output(4, "Rolf snorts. \"This here ain't a charity! Come back when you have enough gold!\"");
			output(5, "(Hit <span id=enter>Any</span> key to continue.)");
			thread = 0.83;
		}
	}
}

smithrepair = function(x){
	output(3, "Decide what item you want to repair.");
	output(4, "Are you sure you want to repair it?");
	output(5, "Press (<span id=letter>A</span>)ny letter to confirm, (<span id=letter>N</span>) to change your mind.)");
}

weaps = "<ul><li>(<span id=menu>1</span>) " + weapons.lev0.woodclub.name +" (" + weapons.lev0.woodclub.gold + " Gold)<br>" +
		"<li>(<span id=menu>2</span>) " + weapons.lev0.stsword.name +" (" + weapons.lev0.stsword.gold + " Gold)<br>" +
		"<li>(<span id=menu>3</span>) " + weapons.lev0.mace.name +" (" + weapons.lev0.mace.gold + " Gold)<br>" +
		"<li>(<span id=menu>4</span>) "+ weapons.lev0.oldsword.name + " (" + weapons.lev0.oldsword.gold + " Gold)<br></ul>" +
		"------------------------------------------------<br>" +
		"Select your item, or press <span id=letter>B</span> if nothing interests you.<br>"	;

arms = "<ul><li>(<span id=menu>1</span>) " + armor.lev0.canvas.name + " (" + armor.lev0.canvas.gold + " Gold)<br>" +
		"<li>(<span id=menu>2</span>) " + armor.lev0.leather.name + " (" + armor.lev0.leather.gold + " Gold)<br>" +
		"<li>(<span id=menu>3</span>) " + armor.lev0.chainmail.name + " (" + armor.lev0.chainmail.gold + " Gold)<br>" +
		"<li>(<span id=menu>4</span>) " + armor.lev0.steelplate.name + " (" + armor.lev0.steelplate.gold + " Gold)<br></ul>" +
		"------------------------------------------------<br>" +
		"Select your item, or press <span id=letter>B</span> if nothing interests you.<br>";



