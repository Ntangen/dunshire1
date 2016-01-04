currentmerch = undefined;
warray = undefined;
aarray = undefined;

smithy = function (x){
	clear();
	Meteor.call("acts",x,"goings","smith");
	signpost("THE SMITHER'S SHOP<br>------------------------------------------------");
	output(1, "The smell of burning iron fills your nose.<br>");
	if (x === "a") { 
		output(2, "Rolf the Smithy looks up from his workbench. <span id=quote>What do YOU want?</span><br><br>" +
			smithmenulist());
		output(3, "------------------------------------------------<br>");
		thread = 0.8;		
	} else {
		output(2, "Rolf the Smithy glares at you. <span id=quote>What do YOU want?</span><br><br>" +
				smithmenulist());
		output(3, "------------------------------------------------<br>");
		thread = 0.8;
	}
}

smithmenulist = function(){
	var temp = "<span id=menu><ul><li>(<span id=letter>W</span>) to browse through Rolf's weaponry" +
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
			output(3, "Are you sure you want the " + weapons.club.name + "?<br>");
			currentmerch = weapons.club;
		} else if (x==="2"){
			output(3, "Are you sure you want the " + weapons.sclub.name + "?<br>");
			currentmerch = weapons.sclub;
		} else if (x==="3"){
			output(3, "Are you sure you want the " + weapons.fsword.name + "?<br>");
			currentmerch = weapons.fsword;
		} else if (x==="4" && userInfo.level.level>=2){
			output(3, "Are you sure you want the " + weapons.mace.name + "?<br>");
			currentmerch = weapons.mace;
		} else if (x==="5" && userInfo.level.level>=3){
			output(3, "Are you sure you want the " + weapons.oldsword.name + "?<br>");
			currentmerch = weapons.oldsword;
		} else { output(3, "Come again?"); setTimeout(function(){ smithy() }, 1000) }
		output(4, "<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" + "------------------------------------------------<br>");
		thread = 0.811;
	} else if (type==="arm") {
		if (x==="1"){
			output(3, "Are you sure you want the " + armor.canvas.name + "?<br>");
			currentmerch = armor.canvas;
		} else if (x==="2"){
			output(3, "Are you sure you want the " + armor.leather.name + "?<br>");
			currentmerch = armor.leather;
		} else if (x==="3"){
			output(3, "Are you sure you want the " + armor.stud.name + "?<br>");
			currentmerch = armor.stud;
		} else if (x==="4" && userInfo.level.level>=2){
			output(3, "Are you sure you want the " + armor.rivet.name + "?<br>");
			currentmerch = armor.rivet;
		} else if (x==="5" && userInfo.level.level>=3){
			output(3, "Are you sure you want the " + armor.steel.name + "?<br>");
			currentmerch = armor.steel;
		} else { output(3, "Come again?"); setTimeout(function(){ smithy() }, 1000) }
		output(4, "<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" + "------------------------------------------------<br>");
		thread = 0.812;
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
			userInfo.gold = userInfo.gold - currentmerch.gold;
			userInfo.items.weapon = currentmerch;
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
			userInfo.gold = userInfo.gold - currentmerch.gold;
			userInfo.items.armor = currentmerch;
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
	var temp = "<ul><span id=menu><li>(<span id=letter>1</span>) " + weapons.club.name +" (<span id=gold>" + weapons.club.gold + " Gold</span>)<br>" +
		"<li>(<span id=letter>2</span>) " + weapons.sclub.name +" (<span id=gold>" + weapons.sclub.gold + " Gold</span>)<br>" +
		"<li>(<span id=letter>3</span>) " + weapons.fsword.name +" (<span id=gold>" + weapons.fsword.gold + " Gold</span>)<br>";
	if (userInfo.level.level>=2){
		temp += "<li>(<span id=letter>4</span>) "+ weapons.mace.name +" (<span id=gold>" + weapons.mace.gold + " Gold</span>)<br>";
	}
	if (userInfo.level.level>=3){
		temp += "<li>(<span id=letter>4</span>) "+ weapons.oldsword.name +" (<span id=gold>" + weapons.oldsword.gold + " Gold</span>)<br>";
	}
	temp += "</span></ul>" + 
		"------------------------------------------------<br>";
	return temp;
}

arms = function(){
	var temp = "<ul><span id=menu><li>(<span id=letter>1</span>) " + armor.canvas.name +" (<span id=gold>" + armor.canvas.gold + " Gold</span>)<br>" +
		"<li>(<span id=letter>2</span>) " + armor.leather.name +" (<span id=gold>" + armor.leather.gold + " Gold</span>)<br>" +
		"<li>(<span id=letter>3</span>) " + armor.stud.name +" (<span id=gold>" + armor.stud.gold + " Gold</span>)<br>";
	if (userInfo.level.level>=2){
		temp += "<li>(<span id=letter>4</span>) "+ armor.rivet.name +" (<span id=gold>" + armor.rivet.gold + " Gold</span>)<br>";
	}
	if (userInfo.level.level>=3){
		temp += "<li>(<span id=letter>4</span>) "+ armor.steel.name +" (<span id=gold>" + armor.steel.gold + " Gold</span>)<br>";
	}
	temp += "</span></ul>" + 
		"------------------------------------------------<br>";
	return temp;
}

