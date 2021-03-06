
mage = function(){
	clear();
	Meteor.call("acts",x,"events","mage");
	signpost("THE MAGE'S CAVE<br>------------------------------------------------");
	output(1, "The dark cave is barely lit by a torch deep inside...<br>" +
		"Following the torchlight, you soon come to a small hovel built into the cave wall. A low hum emanates from inside.<br>");
	output(2, "A shrouded figure emerges from the shadows.<br>");
	output(3, "<span id=quote>\"What brings you here?\"</span> it growls. <span id=quote>\"I wish no contact with your people!\"</span><br>");
	output(4, "<span id=menu>Press <span id=enter>Q</span> to ask the Mage about its sorcery, or <span id=enter>Any</span> other key to return to the Dark Woods.</span>");
	thread = 7;
}

magerouter = function(x){
	if (x==="q"){
		clear();
		output(1, "<span id=quote>Ah... yes...</span> it whispers. <span id=quote>\"What sorcery I can teach you is limited only by your capacity to learn! Well, that, and how many shiny things you have brought me.\"</span><br>");
		output(2, "<span id=quote>As your mind becomes stronger, and you gain knowledge of the Mystic arts, I can teach you new curses to lance upon your enemies - or yourself. Each lesson will cost you in gold, <b>plus one precious gem.</span></b><br>" +
			"<span id=quote>Here's what I'm willing to share with you for now...<br></span>");
		output(3, "<ul><li>(<span id=letter>1</span>) <span id=menu>Thunderous Clap</span> - your opponent won't know what hit them! (3 turns required to invoke) (<span id=letter>"+spellz.clap.gold+" Gold</span>)" +
			"<li>(<span id=letter>2</span>) <span id=menu>Egregious Shield</span> - a powerful, temporary shield against enemy attacks in battle (1 Mysticism required, 3 turns required to invoke) (<span id=letter>"+spellz.shield.gold+" Gold</span>)" +
			"<li>(<span id=letter>3</span>) <span id=menu>Curative Words</span> - restore yourself to full health (2 Mysticism required, 5 turns required to invoke) (<span id=letter>"+spellz.heal.gold+" Gold</span>)</ul>");
			// "<li>(<span id=letter>4</span>) <span id=menu>Glowing Sword</span> - double your weapon's attack value in the next battle (2 Mysticism required, 5 turns required to invoke) (<span id=letter>"+spellz.heal.gold+" Gold</span>)</ul>");
		output(4, "<span id=menu>Select a curse, or press <span id=letter>B</span> if none interests you.</span><br>");
		thread = 7.1;
	} else {
		chooseclear(4);
		output(5, "Wanting no more part of this place, you return to the woods.");
		setTimeout(function(){ woodsstart() }, 1000);
	}
}

mageconfirm = function(x){
	if (checkCunning(x)) {
		output(4, "\"You lack the Mysticism required for such advanced sorcery. Come back when you are more... mystical.\"<br>");
		output(5, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 7.7;
		return;
	} else if (x==="1"){
		output(4, "Are you sure you want to learn the " + spellz.clap.name + " curse?<br>" +
			"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" + "------------------------------------------------<br>");
		currentmerch = spellz.clap;
		thread = 7.2;
	} else if (x==="2"){
		output(4, "Are you sure you want to learn the " + spellz.shield.name + " spell?<br>" +
			"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" + "------------------------------------------------<br>");
		currentmerch = spellz.shield;
		thread = 7.2;
	} else if (x==="3"){
		output(4, "Are you sure you want to learn the " + spellz.heal.name + " incantation?<br>" +
			"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" + "------------------------------------------------<br>");
		currentmerch = spellz.heal;
		thread = 7.2;
	// } else if (x==="4"){
	// 	output(4, "Are you sure you want to learn the " + spellz.sword.name + " incantation?<br>" +
	// 		"<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>" + "------------------------------------------------<br>");
	// 	currentmerch = spellz.sword;
	// 	thread = 7.2;
	} else if (x==="b"){
		mage();
	} else { output(4, "Come again?"); setTimeout(function(){ magerouter() }, 1000) }
}

mpurch = function(x){
	function findspell(x,y,z){
		if (x.name===currentmerch.name){
			return true
			}
	}
	if (x==="n"){
			// no
		output(4, "The Mage sighs. <span id=quote>\"Do not dawdle with me, " + userInfo.level.name + "...\"</span><br>");
		output(5, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 7.7;
	} else if (userInfo.items.magic.find(findspell)) {
		output(4, "The Mage sighs. <span id=quote>\"I have already taught you this sorcery, " + userInfo.username + "... have you forgotten so soon?\"</span><br>");
		output(5, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 7.7;
	} else {
		var temp;
		clear();
		if (userInfo.gold >= currentmerch.gold) {
			if (findgems()) {
				// successful buy
				Meteor.call("acts",x,"events","mage buy");
				userInfo.gold -= currentmerch.gold;
				userInfo.items.other.splice(temp,1);
				userInfo.items.magic.push(currentmerch);
				console.log("magic assign: " + userInfo.items.magic);
				output(1, "The Mage nods solumnly, its shouded head dipping as you hear foreign-sounding chants too low for you to hear. Soon, you feel a spark of inspiration, and the " + currentmerch.name + " magick is suddenly familiar to you!<br>");
				output(2, "<span id=quote>\"Wield this magick wisely, young one...\"</span> says the Mage.<br>");
				output(3, "Your gold pouch feels mysteriously lighter.<br>");
				output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
				thread = 7.7;
			} else {
				// no gems
				output(1, "The Mage's head shakes inside his cloak. <span id=quote>\"You lack any precious gems. Try again when you find one.\"</span><br>");
				output(2, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
				thread = 7.7;
			}
		} else {
			// not enough simoleons
			output(1, "The Mage sighs. <span id=quote>\"Knowledge is free, but education is not. Come back when you have gold equal to my enchantments.\"<span><br>");
			output(2, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 7.7;
		}
	}
}

checkCunning = function(x){
	x = Number(x);
	if (x===1){
		if (userInfo.attributes.myst<spellz.clap.cunningreq){
			return true
		}
	} else if (x===2){
		if (userInfo.attributes.myst<spellz.shield.cunningreq){
			return true
		}
	} else if (x===3){
		if (userInfo.attributes.myst<spellz.heal.cunningreq){
			return true
		}
	} else return false;
}

listmagick = function(){
	clear();
	var temp = "";
	var temp2 = "";
	for (i=0;i<userInfo.items.magic.length;i++){
		temp2 += "<li>" + userInfo.items.magic[i].name + ": " + userInfo.items.magic[i].desc + "<br>";
		}
	temp += "You have knowledge of the following magicks: <br>" +
		"<ol>" + temp2 + "</ol><br>" +
	"------------------------------------------------<br><br>";
	"<span id=menu>Enter the number of the magick you wish to lance, or <span id=enter>N</span> to use no magick and attack the old fashioned way.<br>";
	return temp;
}

spellz = {
	clap:{
		name:"Thunderous Clap",
		desc: "A calamitous din befalls your enemy's ears! (Requires 3 turns)",
		cunningreq: 1,
		turnsreq: 3,
		attack: 25,
		gold: 150
	},
	shield:{
		name:"Egregious Shield",
		desc: "A powerful, temporary shield against your enemy's attacks. (Requires 3 turns)",
		cunningreq: 1,
		turnsreq: 3,
		gold: 400
		// decreases enemy's attack by 25% - see woodsfight
	},
	heal:{
		name:"Curative Words",
		desc: "Heal yourself fully during battle. (Requires 5 turns)",
		cunningreq: 2,
		turnsreq: 5,
		attack: 0,
		gold: 650
	},
	sword:{
		name:"Glowing Sword",
		desc: "Double your weapon's attack value in the next battle. (Requires 5 turns)",
		cunningreq: 3,
		turnsreq: 5,
		attack: 0,
		gold: 1000
	}
}