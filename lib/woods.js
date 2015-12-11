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
		"<li>Magicks: " + ifmagic() + "<br>" +
		"<li>Attributes: <br>" +
			"<ul><li>Charisma: " + userInfo.attributes.charisma + "<br>" +
			"<li>Mysticism: " + userInfo.attributes.myst + "<br>" +
			"<li>Luck: " + userInfo.attributes.luck + "<br>" +
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
	var temp = showgear();
	if (temp === 0){
		output(2, "You have no items!<br>");
		output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 1.23;
	} else {
		output (2, temp);
		thread = 1.25;
	}
}

woodsusegear = function(x){
	if (typeof(parseInt(x))==="number"){
		var temp = Number(x)-1;
		var temp2 = usegear(temp)
		output(4, temp2);
		output(5, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 1.23;
	} else {
		woodsstart();
	}
}

woodsencounter = function(x){
	if (userInfo.mission==="grannon" && Math.random()>0.9){
		granfight();
	} else {
		clear();
		output(1, "You hear a rustling nearby. Something draws near. You make ready as you turn your head and see...");
		monster = chooseBeastLevel();
		mhp = monster.hp;
		console.log("monster choice: " + monster.name);
		output(2, "A " + monster.name + " is approaching! What do you do?<br><br>");
		output(3, "Your hitpoints: " + userInfo.hp + "<br><br>" +
			monster.name +"'s hitpoints: " + mhp + "<br>"); 
		output(4, "------------------------------------------------<br><br>"+
			"<span id=menu>Press (<span id=letter>R</span>) to attempt to run away, (<span id=letter>M</span>) to invoke magick, or (<span id=letter>Any</span>) other key to attack.<br></span>");
		thread = 1.1;
	}
}

woodsfight = function(x,y){
	// monster turn
	if (y === "m"){
		clear();
		var result = monsterfight(monster)
		statusupdate();
		if (result === "dead"){
			console.log("dead");
			output(2, "<span id=defeat>Oh no! The " + monster.name + " " + monster.strike1 + ", and it kills you!</span><br>" +
				"------------------------------------------------<br><br><br>");
			output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 86;
		}
		else if (result==="zip"){
			output(2, "The " + monster.name + " " + monster.strike1 + ", but your armor protects you! You sustain 0 damage!<br>" +
				"------------------------------------------------<br>");
			output(3, "Your hitpoints: " + userInfo.hp + "<br>" +
				monster.name +"'s hitpoints: " + mhp + "<br>");
			output(4, "<span id=menu>Press (<span id=letter>R</span>) to attempt to run away, (<span id=letter>M</span>) to invoke magick, or (<span id=letter>Any</span>) other key to counterattack.<br></span>");
			thread = 1.22;
		} else {
			// monster strikes with damage, no kill
			if (shieldflag){
				output(2, "The " + monster.name + " " + monster.strike1 + ", inflicting " + result + " damage! Your Egregious Shield absorbs part of the blow.<br>" +
				"------------------------------------------------<br>");
			} else {
				output(2, "The " + monster.name + " " + monster.strike1 + ", inflicting " + result + " damage!<br>" +
				"------------------------------------------------<br>");
			}
			output(3, "Your hitpoints: " + userInfo.hp + "<br>" +
				monster.name +"'s hitpoints: " + mhp + "<br>");
			output(4, "<span id=menu>Press (<span id=letter>R</span>) to attempt to run away, (<span id=letter>M</span>) to invoke magick, or (<span id=letter>Any</span>) other key to counterattack.<br></span>");
			thread = 1.22;
		}
	} else if (x==="m"){
		// invoke magick
		clear();
		output(1, "Your hitpoints: " + userInfo.hp + "<br>" +
			monster.name +"'s hitpoints: " + mhp + "<br>"); 
		output(2, "------------------------------------------------<br><br>");
		if (userInfo.items.magic[0]===undefined){
			output(3, "You have no knowledge of magicks!<br>");
			output(4, "<span id=menu>Press (<span id=letter>R</span>) to attempt to run away or (<span id=letter>Any</span>) other key to counterattack.</span>");
			thread=1.22;
		} else {
			var temp = "";
			for (i=0;i<userInfo.items.magic.length;i++){
				temp += "<li>" + userInfo.items.magic[i].name + ": " + userInfo.items.magic[i].desc + "<br>";
				}
			output(3, "You have knowledge of the following magicks: <br>" +
				"<ol>" + temp + "</ol><br>");
			output(4, "<span id=menu>Enter the number of the magick you wish to lance, or <span id=enter>N</span> to use no magick and attack the old fashioned way.<br>");
			thread = 1.26;
		}
	} else {
	// player fight turn
		clear();
		var result = userfight(monster);
		statusupdate();
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
		} else if (result==="zip"){
		// strike, 0 damage
			output(2, "You uselessly strike at " + monster.name + " with your " + userInfo.items.weapon.name + " but hilariously inflict no damage!<br><br>");
			output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 1.24
		}
		// strike don't kill
		else { output(2, "You strike at " + monster.name + " with your " + userInfo.items.weapon.name + " and inflict " + result + " damage!<br><br>");
			output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 1.24
			}
		}
}

magickturn = function(x){
	if (x==="n") woodsfight();
	else if (typeof(parseInt(x))==="number"){
		var temp = Number(x)-1;
		if (userInfo.items.other[temp]===undefined){
			output(5, "Come again?"); setTimeout(function(){ woodsfight("m") }, 1000)
		} else {
			// use the magick
			var result = lancemagic(temp);
			if (result === "k"){
				console.log("kill");
				output(4, "<span id=victory>You vanquished the " + monster.name + "!</span><br><br>" +
				"<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
				thread = 1.2;
			}
		}
	} else {
		// user entered some random shit
		output(5, "Come again?"); setTimeout(function(){ woodsfight("m") }, 1000)
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
	} else if (rando>=0.7 && rando<=0.74){
		// find magic stuff
		console.log("rubies event!");
		userInfo.items.other.push(stuff.gems.rubies);
		output(3, "<span id=gold>You discover precious rubies with the creature!</span>");
		output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
	}
}

userfight = function(monster){
	if (swordflag){
		attackdamage = Math.round((userInfo.items.weapon.attack * (Math.random()+ 1)) + userInfo.attributes.strength - monster.defense);
	} else {
		attackdamage = Math.round((userInfo.items.weapon.attack * (Math.random()+ 1)) + userInfo.attributes.strength + fortune() - monster.defense);
	}
	console.log("user attack: " + attackdamage);
	turns++;
	if (attackdamage<=0){
		return "zip"
	} else {
		mhp = mhp - attackdamage;
		if (mhp <= 0) return "k";
		else return attackdamage;
	}
}

monsterfight = function(monster){
	if (shieldflag){
		damage = Math.round((monster.attack*((Math.random()+1)) - userInfo.items.armor.armor)*.75);
	} else {
		damage = Math.round((monster.attack*((Math.random()+1)) - fortune() - userInfo.items.armor.armor));
	}
	console.log("monster attack: " + damage);
	if (damage<=0){
		return "zip"
	} else {
		userInfo.hp = userInfo.hp - damage;
		if (userInfo.hp <= 0) return "dead";
		else return damage;
	}
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
		shieldflag=false;
		swordflag=false;
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
		for (i=0;i<userInfo.items.magic.length;i++){
			if (i===0){
				temp += userInfo.items.magic[i].name;
			} else if (i!=0){
				temp += ", " + userInfo.items.magic[i].name;
			}
		}
		return temp;
	} else {
		return "None";
	}
}

lancemagic = function(x){
	// x refers to array position of spell
	if (userInfo.items.magic[x].name==="Thunderous Clap"){
		attackdamage = spellz.clap.attack - monster.defense
		console.log("user attack: " + attackdamage);
		turns++;
		mhp = mhp - attackdamage;
		output(3, "Summoning up the old words, you lance the Thunderous Clap upon the " + monster.name + ", bringing down a calamitous din upon its ears, causing " + attackdamage + " damage!<br>");
		if (mhp <= 0) return "k";
		else output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread=1.24;
	} else if (userInfo.items.magic[x].name==="Egregious Shield"){
		if (shieldflag){
			output(3, "You have already invoked this magick.");
			output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread=1.27;
		}
		else if (userInfo.turnsToday<=spellz.shield.turnsreq) {
			output(3, "You do not have enough turns left today to invoke this magick.")
			output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread=1.27;
		}
		else { 
			shieldflag=true;
			turns += spellz.shield.turnsreq;
			output(3, "Summoning up the old words, you lance the Egregious Shield incantation, cloaking yourself in a blue protective haze of magick.<br>");
			output(5, "<span id=menu>Press (<span id=letter>R</span>) to attempt to run away, (<span id=letter>M</span>) to invoke more magick, or (<span id=letter>Any</span>) other key to attack.<br></span>");
			thread = 1.22;
		}
	} else if (userInfo.items.magic[x].name==="Curative Words") {
		// cures you
		if (userInfo.turnsToday<=spellz.heal.turnsreq){
			output(3, "You do not have enough turns left today to invoke this magick.")
			output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread=1.27;
		} else {
			turns += spellz.heal.turnsreq;
			userInfo.hp = userInfo.level.maxhp;
			statusupdate();
			output(3, "Summoning up the old words, you lance the Curative Words incantation, healing yourself fully.<br>");
			output(4, "Your hitpoints: " + userInfo.hp + "<br><br>" +
			monster.name +"'s hitpoints: " + mhp + "<br>" +
			"------------------------------------------------<br><br>");
			output(5, "<span id=menu>Press (<span id=letter>R</span>) to attempt to run away, (<span id=letter>M</span>) to invoke more magick, or (<span id=letter>Any</span>) other key to attack.<br></span>");
			thread = 1.22;
		}
	} else if (userInfo.items.magic[x].name==="Glowing Sword"){
		// double attack value
	}
}
