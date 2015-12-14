currentmerch = undefined;
warray = undefined;
aarray = undefined;

smithy = function (x){
	clear();
	signpost("THE SMITHER'S SHOP<br>------------------------------------------------");
	output(1, "The smell of burning iron fills your nose.<br>");
	if (x === "a") { 
		output(2, "Rolf the Smithy looks up from his workbench. <span id=quote>What do YOU want?</span><br><br>" +
			smithmenulist());
	thread = 0.8;		
	}
}

smithmenulist = function(){
	var temp = "<span id=menu><ul><li>(<span id=letter>W</span>) to browse through Rolf's weaponry," +
		"<li>(<span id=letter>A</span>) to browse Rolf's armor";
	// if (userInfo>=2){
	// 	temp += "<li>(<span id=letter>A</span>)ask about another player's whereabouts";
	// }
	temp += "<li>(<span id=letter>L</span>) to leave</span>";
	return temp;
}


smithrouter = function(x){
	if (x === "w") { output(2, "Rolf scowls. <span id=quote>\"Well, all right then... here's what I got today:\"</span><br>" + "<p>" + weaps());
		output (3, "<span id=menu>Select your item, or press <span id=letter>B</span> if nothing interests you.</span><br>");
		thread = 0.81;
	}
	else if (x === "a") { output(2, "Rolf scowls. <span id=quote>\"Well, all right then... here's what I got today:\"</span><br>" + "<p>" + arms());
		output (3, "<span id=menu>Select your item, or press <span id=letter>B</span> if nothing interests you.</span><br>");
		thread = 0.82;
	} 
	// do we want a repair function?
	// else if (x === "r") { output(2, "We'll have a look at what you have to be repaired later.<br>"+ 
	// 	"Press enter");
	// 		thread = 0.83;
	// } 
	else if (x === "l") { output(2, "You turn and exit back out to the town square."); 
			setTimeout(function(){ townsquare() }, 1000);
	} 
	else { output(2, "Come again?"); setTimeout(function(){ smithy("a") }, 1000) }
}

smithconfirm = function(x, type){
	if (type ==="weap"){
		if (x==="1"){
			output(3, "Are you sure you want the " + warray.eins.name + "?<br>" +
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = warray.eins;
			thread = 0.811;
		} else if (x==="2"){
			output(3, "Are you sure you want the " + warray.zwei.name + "?<br>" +
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = warray.zwei;		
			thread = 0.811;
		} else if (x==="3"){
			output(3, "Are you sure you want the " + warray.drei.name + "?<br>" +
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = warray.drei;
			thread = 0.811;
		} else if (x==="4"){
			output(3, "Are you sure you want the " + warray.vier.name + "?<br>" +
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = warray.vier;
			thread = 0.811;
		} else { output(3, "Come again?"); setTimeout(function(){ smithrouter("w") }, 1000) }
	} else if (type==="arm") {
		if (x==="1"){
			output(3, "Are you sure you want the " + aarray.eins.name + "?<br>" +
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = aarray.eins;
			thread = 0.812;
		} else if (x==="2"){
			output(3, "Are you sure you want the " + aarray.zwei.name + "?<br>" +
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = aarray.zwei;
			thread = 0.812;
		} else if (x==="3"){
			output(3, "Are you sure you want the " + aarray.drei.name + "?<br>" +
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = aarray.drei;
			thread = 0.812;
		} else if (x==="4"){
			output(3, "Are you sure you want the " + aarray.vier.name + "?<br>" +
				"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" +
				"------------------------------------------------<br>");
			currentmerch = aarray.vier;
			thread = 0.812;
		} else { output(3, "Come again?"); setTimeout(function(){ smithrouter("w") }, 1000) }
	}
}

purch = function(x, type){
	if (x==="n"){
			// no
			output(4, "Rolf grunts. <span id=quote>\"Fickle lil fella, ain't ya?\"</span><br>");
			output(5, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 0.83;
	} else if (type === "weap") {
		clear();
		if (userInfo.gold >= currentmerch.gold) {
			// successful buy
			console.log("pre assign: " + userInfo.items.weapon.name);
			userInfo.gold = userInfo.gold - currentmerch.gold;
			for (key in warray){
				if (currentmerch === warray[key])
					userInfo.items.weapon = warray[key]
				}
			console.log("post assign: " + userInfo.items.weapon.name);
			output(1, "Rolf grunts, handing over the " + currentmerch.name + " and putting your pouch of gold under the counter. <span id=quote>\"Wield it well, stranger.\"<span>");
			output(2, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			// warray = undefined;
			thread = 0.83;
		} else {
			// not enough simoleons
			output(1, "Rolf snorts. <span id=quote>\"This here ain't a charity! Come back when you have enough gold!\"</span>");
			output(2, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 0.83;
		}
	} else if (type === "arm") {
		clear();
		if (userInfo.gold >= currentmerch.gold) {
			// successful buy
			console.log("pre assign: " + userInfo.items.armor.name);
			userInfo.gold = userInfo.gold - currentmerch.gold;
			for (key in aarray){
				if (currentmerch === aarray[key])
					userInfo.items.armor = aarray[key]
				}
			console.log("post assign: " + userInfo.items.armor.name);
			output(1, "Rolf grunts, handing over the " + currentmerch.name + " and putting your pouch of gold under the counter. <span id=quote>\"Wear it well, stranger.\"</span>");
			output(2, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			// aarray = undefined;
			thread = 0.83;
		} else {
			output(1, "Rolf snorts. <span id=quote>\"This here ain't a charity! Come back when you have enough gold!\"</span>");
			output(2, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 0.83;
		}
	}
}

// smithrepair = function(x){
// 	output(3, "Decide what item you want to repair.");
// 	output(4, "Are you sure you want to repair it?");
// 	output(5, "Press (<span id=letter>A</span>)ny letter to confirm, (<span id=letter>N</span>) to change your mind.)");
// }

weaps = function(){
	var temp = "weapons.lev" + userInfo.level.level.toString();
	warray = eval(temp);
	return("<ul><li>(<span id=letter>1</span>) " + warray.eins.name +" (" + warray.eins.gold + " Gold)<br>" +
		"<li>(<span id=letter>2</span>) " + warray.zwei.name +" (" + warray.zwei.gold + " Gold)<br>" +
		"<li>(<span id=letter>3</span>) " + warray.drei.name +" (" + warray.drei.gold + " Gold)<br>" +
		"<li>(<span id=letter>4</span>) "+ warray.vier.name +" (" + warray.vier.gold + " Gold)<br></ul>" +
		"------------------------------------------------<br>");
}

arms = function(){
	var temp = "armor.lev" + userInfo.level.level.toString();
	aarray = eval(temp);
	return("<ul><li>(<span id=letter>1</span>) " + aarray.eins.name +" (" + aarray.eins.gold + " Gold)<br>" +
		"<li>(<span id=letter>2</span>) " + aarray.zwei.name +" (" + aarray.zwei.gold + " Gold)<br>" +
		"<li>(<span id=letter>3</span>) " + aarray.drei.name +" (" + aarray.drei.gold + " Gold)<br>" +
		"<li>(<span id=letter>4</span>) "+ aarray.vier.name +" (" + aarray.vier.gold + " Gold)<br></ul>" +
		"------------------------------------------------<br>");
}

