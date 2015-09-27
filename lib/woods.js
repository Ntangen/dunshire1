monster=undefined;
mhp = 0;
turns=0;

woodsstart = function(){
	if (CheckTurnsToday()){
		output(2, "(Hit <span id=enter>Enter</span> to continue)");
		return;
	}
	clear();
	signpost("THE DARK WOODS<br>------------------------------------------------");
	output(1, "The wind rustles through the trees. A darkness settles over the forest as you make your way through...<br>");
	output(2, "Hit <span id=enter>Enter</span> to hunt for beasts, <span id=enter>S</span> to check your status, or <span id=enter>T</span> to return to town.<br><br>");
	thread = 1;
}

woodsstatus = function(){
	output(2, "Current status: <br>");
	output(3, "<ul><li>Hitpoints: " + userInfo.hp + "<br>" +
		"<li>Level: " + userInfo.level + "<br>" + 
		"<li>Experience: " + userInfo.xp + "<br>" +
		"<li>Gold: " + userInfo.gold + "<br>" +		
		"<li>Weapon: " + userInfo.items.weapon.name +  "<br>" +
		"<li>Armor: " + userInfo.items.armor.name +  "<br>" +
		"<li>Turns remaining today: " + (25-userInfo.turnsToday) + "</ul><br>");
	output(4, "(Hit <span id=enter>Enter</span> to continue)");
	thread = 1.23;
}

woodsencounter = function(x){
	clear();
	output(1, "You hear a rustling nearby. Something draws near. You make ready as you turn your head and see...");
	monster = beasts[Math.round(Math.random()*10)];
	mhp = monster.hp;
	console.log("monster choice: " + monster.name);
	output(2, "A " + monster.name + " is approaching! What do you do?<br><br>");
	output(3, "Your hitpoints: " + userInfo.hp + "<br><br>" +
		monster.name +"'s hitpoints: " + mhp + "<br>" +
		"------------------------------------------------<br><br>"+
		"Press (<span id=letter>A</span>)ny key to Attack, (<span id=letter>R</span>) to attempt to run away.");
	thread = 1.1;
}


// may just need to tear this into multiple functions

woodssetting = function(){
	clear();
	output(1, "Your hitpoints: " + userInfo.hp + "<br><br>" +
	monster.name +"'s hitpoints: " + mhp + "<br>" +
	"------------------------------------------------<br><br>");
}

woodsfight = function(x){
	// monster turn
	if (x === "m"){
		clear();
		var result = monsterfight(monster)
		if (result === 1){
			console.log("dead");
			output(2, "<span id=defeat>Oh no! The " + monster.name + " " + monster.strike1 + ", and it kills you!</span><br>" +
				"------------------------------------------------<br><br><br><br>");
			output(3, "(Hit <span id=enter>Enter</span> to continue)");
			thread = 86;
		}
		else {
			output(2, "The " + monster.name + " " + monster.strike1 + ", inflicting " + result + " damage!<br><br>");
			output(3, "Press (<span id=letter>A</span>)ny key to counterattack, (<span id=letter>R</span>) to attempt to run away.");
			thread = 1.22;
		}
	}
	// player attack
	if (x === "a") {
		clear();
		var result = userfight(monster);
		// kill the monster
		if (result === 1) {
			if (turns === 0) {
				console.log("kill single blow");
				output(2, "<span id=victory>You vanquished the " + monster.name + " in a single blow!</span><br><br>" +
				"(Hit <span id=enter>Enter</span> to continue)");
				thread = 1.2;
				}
			else { 
				console.log("kill");
				output(2, "<span id=victory>You vanquished the " + monster.name + "!</span><br><br>" +
				"(Hit <span id=enter>Enter</span> to continue)");
				console.log("2turn: " + turns);
				thread = 1.2;
				}	
		} 
		// strike don't kill
		else { output(2, "You strike at " + monster.name + " with your " + userInfo.items.weapon.name + " and inflict " + result + " damage!<br><br>");
			console.log("3turn: " + turns);
			output(3, "(Hit <span id=enter>Enter</span> to continue)");	
			thread = 1.24
			}
		}
}

userfight = function(monster){
	attackdamage = Math.round((userInfo.items.weapon.attack * (Math.random()+1)) - (monster.speed * Math.random()));
	console.log("user attack: " + attackdamage);
	mhp = mhp - attackdamage;
	turns++;
	if (mhp <= 0) return 1;
	else return attackdamage;
}

monsterfight = function(monster){
	damage = Math.round((monster.attack*((Math.random()+1)) - userInfo.items.armor.armor));
	console.log("monster attack: " + damage);
	userInfo.hp = userInfo.hp - damage;
	if (userInfo.hp <= 0) return 1;
	else return damage;
}

woodsrun = function(){
	clear();
	output(3, "You decide that discretion is the better part of valor, and turn tail in the opposite direction.<br><br>");
	var rando = Math.random();
	console.log("run variable: " + rando);
	if (rando >= 0.75) {
		output(4, "Oh no! You failed to outrun the " + monster.name + ".<br>");
		output(5, "(Hit <span id=enter>Enter</span> to continue)");
		thread = 1.24;
		}
	else { output(3, "Whew - that was close.<br><br>" +
		"(Hit <span id=enter>Enter</span> to continue)");
		userInfo.turnsToday += turns;
		turns = 0;
		thread = 1.23
		}
}

reward = function(){
	clear();
	// add gloating here
	output(1, "The " + monster.name + " lays dead before you.<br><br>");
	output(2, "You receive <span id=xp>" + xp() + "</span> experience from your feat of valor, and find <span id=gold>" + gold() + "</span> pieces of gold in the beast's belly.");
	output(3, "(Hit <span id=enter>Enter</span> to continue)");
	thread = 1.23;
	userInfo.turnsToday += turns;
	turns = 0;
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
	var gelt = (monster.hp * 2) + temp;
	userInfo.gold += gelt;
	return gelt;
}