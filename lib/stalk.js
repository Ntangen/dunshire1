target=undefined;

stalk = function (x){
	clear();
	signpost("THE CAMPS<br>------------------------------------------------");
	output(1, "Nightime has fallen over the fields. You can smell the menace in the air.<br>");
	output(2, "You stalk stealthily through the fields where travelers set their camp, searching for " + target + ". You keep your hand close to your weapon.<br>");
	output(3, "Finally, you recognize " + target + " sleeping near a tree!<br>");
	output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to attack " + target + " in their sleep, or (<span id=letter>N</span>) to slink back into the darkness.</span><br>");
	thread=8.4;
}

stalkrouter = function(x){
	if (x==="n"){
		output(4, "Thinking twice, you sheath your weapon and disappear back into the shadows.");
		setTimeout(function(){ townsquare() }, 1000);
	} else {
		// add a condition to limit attacks/day
		Meteor.call("grabRecord",target,function(err,res){
			if (err) console.log("error: " + err);
			if (res) {
				target=res;
				target.hp = target.level.maxhp;
				stalkfirstround();
			}
		});
	}
}

stalkfirstround = function(x){
	clear();
	if (fortunecomp("luck")){
		// target gets first strike
		output(1, "Your opponent sleeps with one eye open, and bolts awake as you draw your " + userInfo.items.weapon.name + "!<br>");
		var temp = dueling("tgt");
		console.log("temp: " + temp);
		if (temp==="k"){
			output(2, "Without batting an eye, " + target.username + " cuts you down with a single blow while you fumble your attack. " + target.username + " laughs heartily as you sink to the ground, mortally wounded.<br>");
			output(3, "<span id=quote>Serves you right, amateur</span> " + target.username + " says, spitting in your direction.<br>");
			output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 8.86
		} else if (temp==="zip"){
			output(2, "Numbed by sleep, " + target.username + "'s meek attack bounces harmlessly off your " + userInfo.armor.name + ". You laugh cruelly as you prepare your counterattack.<br>");
			output(3, "<span id=menu>Press (<span id=letter>M</span>) to use magick, (<span id=letter>R</span>) to run away, or (<span id=letter>Any</span>) other key to counterattack.</span><br>");
			thread = 8.5
		} else {
			output(2, "Jumping to their feet, " + target.username + " attacks you first with their " + target.items.weapon.name + ", inflicting " + temp + " damage.<br>");
			output(3, "<span id=menu>Press (<span id=letter>M</span>) to use magick, (<span id=letter>R</span>) to run away, or (<span id=letter>Any</span>) other key to counterattack.</span><br>");
			thread = 8.5
		}
	} else {
		// player gets first strike
		var temp = dueling("player");
		console.log("temp: " + temp);
		if (temp==="k"){
			output(2, "As they lay asleep dreaming of their mommy, you draw your " + userInfo.items.weapon.name + " and slay " + target.username + " in a single blow!<br>");
			output(3, "You feel very brave.<br>");
			output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 8.85;
		} else if (temp==="zip"){
			output(2, "You fecklessly strike at " + target.username + ", but cause no damage, and only succeed in waking them up!<br>");
			output (3, target.username + " angrily reaches for their weapon...<br>");
			output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 8.6
		} else {
			output(1, "Your stealth pays off, and you strike " + target.username + " with your " + userInfo.items.weapon.name + ", inflicting " + temp + " damage!<br>");
			output (3, "Injured, but mostly angry, " + target.username + " reaches for their weapon...<br>");
			output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 8.6
		}
	}
}

campfight = function(x,y){
	if (y===1){
		// target
		clear();
		var temp = dueling("tgt");
		if (temp==="k"){
			output(1, "With a great heave, " + target.username + " cuts you down with a final mighty blow. As you sink to the ground, and the world dissolves into darkness, you hear chuckling.<br>");
			output(2, "<span id=quote>Serves you right, amateur</span> " + target.username + " says, spitting in your direction.<br>");
			output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 8.86
		} else if (temp==="zip"){
			output(1, "Dazed, " + target.username + "'s meek thrust bounces harmlessly off your " + userInfo.armor.name + ". You laugh cruelly as you prepare your counterattack.<br>");
			output(2, "<span id=menu>Press (<span id=letter>M</span>) to use magick, (<span id=letter>R</span>) to run away, or (<span id=letter>Any</span>) other key to counterattack.</span><br>");
			thread = 8.5
		} else {
			output(1, "Your hitpoints: " + userInfo.hp + "<br>" +
				target.username +"'s hitpoints: " + target.hp + "<br>"); 
			output(2, "------------------------------------------------<br><br>");
			output(3, "Holding their ground, " + target.username + " heaves at you with their " + target.items.weapon.name + ", inflicting " + temp + " damage!<br>");
			output(4, "The other sleeping travelers take bets on who will win.<br>");
			output(5, "<span id=menu>Press (<span id=letter>M</span>) to use magick, (<span id=letter>R</span>) to run away, or (<span id=letter>Any</span>) other key to counterattack.</span><br>");
			thread = 8.5
		}
	} else {
		// player actions
		if (x==="r"){
			output(1, "Hoping to preserve your hide, you turn tail and run in the opposite direction!<br>");
			var rando = Math.random() + (userInfo.attributes.luck * 0.1);
			console.log("run variable: " + rando);
			if (rando >= 0.75) {
				chooseclear(2);
				chooseclear(3);
				output(3, "Oh no! You failed to escape " + target.username + "!<br>");
				output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
				thread = 8.6;
			}
			else { 
				chooseclear(2);
				chooseclear(3);
				output(3, "Leaving " + target.username + " in the dust, you wipe your brow and slink back to town.<br><br>" +
				"<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
				userInfo.turnsToday -= turns;
				turns = 0;
				thread = 1.9;
			}
		} else if (x==="m"){
			// invoke magick
			clear();
			output(1, "Your hitpoints: " + userInfo.hp + "<br>" +
				target.username +"'s hitpoints: " + target.hp + "<br>"); 
			output(2, "------------------------------------------------<br><br>");
			if (userInfo.items.magic[0]===undefined){
				output(3, "You have no knowledge of magicks!<br>");
				output(4, "<span id=menu>Press (<span id=letter>R</span>) to run away, or (<span id=letter>Any</span>) other key to counterattack.</span><br>");
				thread=8.5;
			} else {
				var temp = "";
				for (i=0;i<userInfo.items.magic.length;i++){
					temp += "<li>" + userInfo.items.magic[i].name + ": " + userInfo.items.magic[i].desc + "<br>";
				}
				output(3, "You have knowledge of the following magicks: <br>" +
					"<ol>" + temp + "</ol><br>");
				output(4, "<span id=menu>Enter the number of the magick you wish to lance, or <span id=enter>N</span> to use no magick and attack the old fashioned way.<br>");
				thread = 8.7;
			}
		} else {
			clear();
			var temp = dueling("player");
			if (temp==="k"){
				output(1, "With a final parry, you make a final thrust with your " + userInfo.items.weapon.name + " for a crushing blow against <span id=menu>" + target.username + "</span>!<br>");
				output(2, "You stand, catching your breath, as money changes hands on the sidelines.<br>");
				output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
				thread = 8.85;
			} else if (temp==="zip"){
				output(1, "You fecklessly strike at " + target.username + ", but cause no damage, and only succeed amusing the assembled crowd!<br>");
				output(2, target.username + " laughs at your efforts and reaches for their weapon...<br>");
				output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
				thread = 8.6
			} else {
				output(1, "Your hitpoints: " + userInfo.hp + "<br>" +
					target.username +"'s hitpoints: " + target.hp + "<br>"); 
				output(2, "------------------------------------------------<br><br>");
				output(3, "You lean into the blow, and strike " + target.username + " with your " + userInfo.items.weapon.name + ", inflicting " + temp + " damage!<br>");
				output(4, "Grunting in pain, " + target.username + " moves into position to attack.<br>");
				output(5, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
				thread = 8.6
			}
		}
	}
}

campmagic = function(x){
	if (x==="n") campfight();
	else if (typeof(parseInt(x))==="number"){
		var temp = Number(x)-1;
		if (userInfo.items.other[temp]===undefined){
			output(5, "Come again?"); setTimeout(function(){ woodsfight("m") }, 1000)
		} else {
			// use the magick
			if (userInfo.items.magic[x].name==="Thunderous Clap"){
				attackdamage = Math.round((spellz.clap.attack * (Math.random()+ 1)) + fortune() - target.items.armor.armor - fortunecomp());
				console.log("user attack: " + attackdamage);
				turns++;
				target.hp -= attackdamage;
				output(3, "Summoning up the old words, you lance the Thunderous Clap upon " + target.username + ", bringing down a calamitous din upon their ears, causing " + attackdamage + " damage!<br>");
				if (target.hp <= 0) {
					output(4, "Your adversary wavers and collapses, your magicks having overwhelmed their little brain. The crowd erupts into cheers, and bets are exchanged.<br>");
					output(5, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
					thread=8.85;
					}
				else {
					output(4, "Howling in pain, " + target.username + " stumbles, but appears only more incensed by the blow!<br>");
					output(5, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
					thread=8.6;
				}
			} else {
				lancemagic(temp);
				if (thread===1.27){
					thread=8.71;
				} else {
					thread=8.5
				}
			}
		}
	} else {
		// user entered some random shit
		output(5, "Come again?"); setTimeout(function(){ campfight("m") }, 1000)
	}
}

campwin = function(){
	// player wins
	Meteor.call("userduel",userInfo, target,"win");
	Meteor.call("acts",target.username, "duel","w");
	var temp = Math.round(target.gold * 0.5);
	target.gold = temp;
	userInfo.gold += temp
	var temp2 = Math.round(target.xp * 0.2);
	clear();
	output(1, "While your adversary <span id=menu>" + target.username + "</span> lays at your feet, you catch your breath and before looting their body.<br><br>" + 
		"<span id=gold>You find " + temp + " gold on their body!</span><br>");
	output(2, "<span id=gold>You also gain " + temp2 + " experience!</span><br>");
	output(3, "You hope <span id=menu>" + target.username + "</span> doesn't hold it against you... but you fear you might've made an enemy today.<br>");
	output(4, "<span id=menu>Press <span id=enter>Any</span> key to return to town before you draw a bigger crowd.</span>");
	target=undefined;
	thread=1.9;

}

campdead = function(){
	// player dies
	Meteor.call("userduel",userInfo, target,"lose");
	Meteor.call("acts",target.username, "duel","l");
	var temp = userInfo.gold * 0.5;
	target.gold += temp;
	userInfo.gold = temp;
	chooseclear(3);
	chooseclear(4);
	output(4, "As everything goes black, you see your opponent " + target.username + " looting your goods. <span id=gold>They take " + temp + " gold from your body, and win experience from having struck you down.</span><br>");
	output(5, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
	thread=86;
	target=undefined;
}

fortunecomp = function(x){
	if (x==="luck"){
		var temp = Math.random()+(target.attributes.luck*0.25);
		if (temp>=0.5){
			// target gets first strike
			return true
		} else return false
	} else {
		// for adding variables in battle
		var temp = Math.round((Math.random()+1) * target.attributes.luck);
		console.log("target's fortune points: " + temp);
		return temp;
	}
}

dueling = function(x){
	console.log("dueling checkin");
	if (x==="player"){
		// player attack
		console.log("dueling player");
		attackdamage = Math.round((userInfo.items.weapon.attack * (Math.random()+ 1)) + userInfo.attributes.strength + fortune() - target.items.armor.armor - fortunecomp());
		console.log("player attack: " + attackdamage);
		turns++;
		if (attackdamage<=0){
			return "zip"
		} else {
			target.hp = target.hp - attackdamage;
			if (target.hp <= 0) return "k";
			else return attackdamage;
		}
	} else if (x==="tgt"){
		console.log("dueling tgt");
		attackdamage = Math.round((target.items.weapon.attack * (Math.random()+ 1)) + target.attributes.strength + fortunecomp() - userInfo.items.armor.armor - fortune());
		console.log("target attack: " + attackdamage);
		if (attackdamage<=0){
			return "zip"
		} else {
			userInfo.hp = userInfo.hp - attackdamage;
			if (userInfo.hp <= 0) return "k";
			else return attackdamage;
		}
	}
}
