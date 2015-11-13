monster=undefined;
mhp = 0;
turns=0;

// <span id=menu>Press <span id=enter>Any</span> key to continue.</span>

woodsstart = function(){
	if (CheckTurnsToday()){
		output(2, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		return;
	}
	clear();
	statusupdate();
	signpost("THE DARK WOODS<br>------------------------------------------------");
	output(1, "The wind rustles through the trees. A darkness settles over the forest as you make your way through...<br>");
	output(2, "<span id=menu>Press <span id=enter>Enter</span> to hunt for beasts, <span id=enter>S</span> to check your status, <span id=enter>K</span> to review your supplies, or <span id=enter>T</span> to return to town.</span><br>");
		if(userInfo.mission ==='abbey'){
			if (missioncomplete){
				output(3, "<span id=quest>Don't forget to return the Cleric's censer at the Abbey!</span><br>")
			} else {
			output(3, "<span id=quest>Press </span><span id=enter>R</span><span id=quest> to hunt for the bandits who stole the Cleric's censer.</span><br>");
			}
		} else if (userInfo.mission ==="grannon"){
			output(3, "<span id=quest>Press </span><span id=enter>M</span><span id=quest> to follow Grannon's directions to the Mage's Cave.</span><br>");
		}
	thread = 1;
}

woodsrouter = function(x){
	if (x === 't') townsquare();
	else if (x === "heal") {
		userInfo.hp = 25;
		woodsstart();
	}
	else if (x === "s") woodsstatus();
	else if (x==="r" && userInfo.mission==="abbey"){
		abwoods();
	} else if (x==="m" && userInfo.mission==="grannon"){
		mage();
	} else if (x==="k"){
		woodsgear();
	}
	else woodsencounter();
}

woodsstatus = function(){
	clear();
	output(1, "Current status: <br>");
	output(2, "<ul><li>Hitpoints: " + userInfo.hp + "<br>" +
		"<li>Level: " + userInfo.level.name + "<br>" + 
		"<li>Experience: " + userInfo.xp + "<br>" +
		"<li>Gold: " + userInfo.gold + "<br>" +		
		"<li>Weapon: " + userInfo.items.weapon.name +  "<br>" +
		"<li>Armor: " + userInfo.items.armor.name +  "<br>" +
		"<li>Spells: " + ifmagic() + "<br>" +
		"<li>Attributes: <br>" +
			"<ul><li>Charisma: " + userInfo.attributes.charisma + "<br>" +
			"<li>Cunning: " + userInfo.attributes.cunning + "<br>" +
			"<li>Speed: " + userInfo.attributes.speed + "<br>" +
			"<li>Strength: " + userInfo.attributes.strength + "</ul>" + 
		"<li>Turns remaining today: " + userInfo.turnsToday + "</ul>");
	if (flag==="fester"){
		output (3, "<span id=defeat>Your wounds are festering! You lose 1HP each turn until you locate a dose of Antifester.</span><br>")
		output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
	} else {
		output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
	}
	thread = 1.23;
}

woodsgear = function(){
	if (userInfo.items.other.length ===0){
		output(2, "You have no items!<br>");
		output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 1.23;
	} else {
	output(2, "Your current supplies:");
 	var templist = "";
 	function listbuild (x,y,z) {
		templist += "<li>" + x.name + "<br>";
	}
	userInfo.items.other.forEach(listbuild);
	output(3,"<ol>" + templist + "</ol><br>");
	output(4, "<span id=menu>Press the <span id=enter>Number</span> of any item you wish to use, or <span id=enter>Any</span> other key to continue.</span><br>");
	thread = 1.25;
	}
}

usegear = function(x,y){
	if (x==="" && y!=1){
		woodsstart();
	} else if (typeof(parseInt(x))==="number"){
		var temp = x-1;
		if (userInfo.items.other[temp].name === "Healing elixir"){
			if (userInfo.hp + heals.basic.potency > userInfo.level.maxhp){
				userInfo.hp = userInfo.level.maxhp;
			} else {
				userInfo.hp += heals.basic.potency;
			}
			userInfo.items.other.splice(temp,1);
			output(4, "You uncork Morgan's " + heals.basic.name + " and swill it all.<br>");
			output(5, "You feel stronger already!<br>");
			output(6, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 1.23;
		} else if (userInfo.items.other[temp].name === "Extra potent healing elixir"){
			if (userInfo.hp + heals.potent.potency > userInfo.level.maxhp){
				userInfo.hp = userInfo.level.maxhp;
			} else {
				userInfo.hp += heals.potent.potency;
			}
			userInfo.items.other.splice(temp,1);
			output(4, "You uncork Morgan's " + heals.potent.name + " and swill it all.<br>");
			output(5, "You feel stronger already!<br>");
			output(6, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 1.23;
		} else if (userInfo.items.other[temp].name === "Antifester"){
			flag = undefined;
			userInfo.items.other.splice(temp,1);
			output(4, "You uncork Morgan's " + heals.antibiotic.name + " and swill it all.<br>");
			output(5, "Your battle wounds regain a healthy pink color!<br>");
			output(6, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 1.23;
		}
	} if (y===1){
			output(6, "------------------------------------------------<br>" +
				"Your hitpoints: " + userInfo.hp + "<br>" +
				monster.name +"'s hitpoints: " + mhp + "<br>");
			output(7, "<span id=menu>Press (<span id=letter>G</span>) to use items, (<span id=letter>R</span>) to attempt to run away, or (<span id=letter>Any</span>) other key to counterattack.</span>");
			thread = 1.22
	} else {
		woodsstart();
	}
}

woodsencounter = function(x){
	clear();
	output(1, "You hear a rustling nearby. Something draws near. You make ready as you turn your head and see...");
	monster = chooseBeastLevel();
	mhp = monster.hp;
	console.log("monster choice: " + monster.name);
	output(2, "A " + monster.name + " is approaching! What do you do?<br><br>");
	output(3, "Your hitpoints: " + userInfo.hp + "<br><br>" +
		monster.name +"'s hitpoints: " + mhp + "<br>" +
		"------------------------------------------------<br><br>"+
		"<span id=menu>Press (<span id=letter>R</span>) to attempt to run away, or (<span id=letter>Any</span>) other key to Attack. </span>");
	thread = 1.1;
}

woodsfight = function(x){
	// monster turn
	if (x === "m"){
		clear();
		var result = monsterfight(monster)
		if (result === "dead"){
			console.log("dead");
			output(2, "<span id=defeat>Oh no! The " + monster.name + " " + monster.strike1 + ", and it kills you!</span><br>" +
				"------------------------------------------------<br><br><br>");
			output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 86;
		}
		else {
			output(2, "The " + monster.name + " " + monster.strike1 + ", inflicting " + result + " damage!<br>" +
				"------------------------------------------------<br>");
			output(3, "Your hitpoints: " + userInfo.hp + "<br>" +
				monster.name +"'s hitpoints: " + mhp + "<br>");
			output(4, "<span id=menu>Press (<span id=letter>R</span>) to attempt to run away, or (<span id=letter>Any</span>) other key to counterattack.</span>");
			thread = 1.22;
		}
	} 
	// else if (x==="g"){
	// 	clear();
	// 	woodsgear();
	// 	if (thread===1.23){
	// 		output(3, "<span id=menu>Press (<span id=letter>G</span>) to use other items, (<span id=letter>R</span>) to attempt to run away, or (<span id=letter>Any</span>) other key to counterattack.</span>");
	// 		thread = 1.22;
	// 	} else if (thread===1.25){
	// 		thread = 1.251;
	// 	}
	// } 
	else {
		clear();
		var result = userfight(monster);
		// kill the monster
		if (result === "k") {
			if (turns === 0) {
				console.log("kill single blow");
				output(2, "<span id=victory>You vanquished the " + monster.name + " in a single blow!</span><br><br>" +
				"<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
				thread = 1.2;
				}
			else { 
				console.log("kill");
				output(2, "<span id=victory>You vanquished the " + monster.name + "!</span><br><br>" +
				"<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
				thread = 1.2;
				}	
		} 
		// strike don't kill
		else { output(2, "You strike at " + monster.name + " with your " + userInfo.items.weapon.name + " and inflict " + result + " damage!<br><br>");
			output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 1.24
			}
		}
}

events = function(x){
	// test to see if random events will happen
	var rando = Math.random();
	if (rando>=0.98 && flag!="fester"){
		// wounds fester
		console.log("festering wounds");
		flag = "fester";
		turncounter = userInfo.turnsToday;
		output(4, "<br><span id=death>Your battle wounds have festered!<br>" + 
			"You will lose 1 hitpoint <strong>per turn</strong> until you cleanse the wound with Antifester.</span><br>");
	} else if (rando>=0.7 && rando<=0.78){
		// find magic stuff
		console.log("rando event");
		userInfo.items.other.push(stuff.gems.rubies);
		output(3, "<span id=gold>You discover precious rubies with the creature!</span>");
		output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
	}
}

userfight = function(monster){
	attackdamage = Math.round((userInfo.items.weapon.attack * (Math.random()*(1 + userInfo.attributes.strength)+1) - monster.defense));
	console.log("user attack: " + attackdamage);
	mhp = mhp - attackdamage;
	turns++;
	if (mhp <= 0) return "k";
	else return attackdamage;
}

monsterfight = function(monster){
	damage = Math.round((monster.attack*((Math.random()+1)) - userInfo.items.armor.armor));
	console.log("monster attack: " + damage);
	userInfo.hp = userInfo.hp - damage;
	if (userInfo.hp <= 0) return "dead";
	else return damage;
}

woodsrun = function(){
	clear();
	output(3, "You decide that discretion is the better part of valor, and turn tail in the opposite direction.<br><br>");
	var rando = Math.random();
	console.log("run variable: " + rando);
	if (rando >= 0.75) {
		output(4, "Oh no! You failed to outrun the " + monster.name + ".<br>");
		output(5, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 1.24;
		}
	else { output(3, "Whew - that was close.<br><br>" +
		"<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		userInfo.turnsToday -= turns;
		turns = 0;
		thread = 1.23
		}
}

reward = function(){
	if (flag2==="dead") {return}
	else { 
		clear();
		// add gloating here
		output(1, "The " + monster.name + " lays dead before you.<br><br>");
		output(2, "You receive <span id=xp>" + xp() + "</span> experience from your feat of valor, and find <span id=gold>" + gold() + "</span> pieces of gold in the beast's belly.<br>");
		output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		userInfo.turnsToday -= turns;
		events();
		turns = 0;
		thread = 1.23;
	}
}

xp = function(){
	if (Math.random() >= 0.5){
		var x = Math.round((Math.random()*(monster.hp / 3))) // for exp
	}
	else {
		var x = -1*(Math.round((Math.random()*(monster.hp / 3)))); // for exp
	}
	var temp = monster.xp + x;
	userInfo.xp += temp;
	return temp;
}

gold = function(){
	if (Math.random() >= 0.5){
 		var temp = Math.round((Math.random()+1)*monster.attack); // for gold
	}
	else {
		var temp = -1*(Math.round((Math.random()+1)*monster.attack)); // for gold
	}
	var gelt = monster.gold + temp;
	userInfo.gold += gelt;
	return gelt;
}

ifmagic = function(){
	if (userInfo.items.magic != []){
		var temp = "";
		console.log("ifmagic checkin!");
		for (i=0;i<userInfo.items.magic.length;i++){
			if (i===0){
				temp += userInfo.items.magic[i].name;
				console.log("ifmagic checkin2");
			} else if (i!=0){
				temp += ", " + userInfo.items.magic[i].name;
				console.log("ifmagic checkin3");
			}
		}
		return temp;
	} else {
		return "None";
	}
}