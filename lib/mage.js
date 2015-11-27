
mage = function(){
	clear();
	statusupdate();
	signpost("THE MAGE'S CAVE<br>------------------------------------------------");
	output(1, "The dark cave is barely lit by a torch deep inside...<br>" +
		"Following the torchlight, you soon come to a small hovel built into the cave wall. A low hum emanates from inside.<br>");
	output(2, "A shrouded figure emerges from the shadows.<br>");
	output(3, "\"What brings you here?\" it growls. \"I wish no contact with your people!\"<br>");
	output(4, "<span id=menu>Press <span id=enter>Q</span> to ask the Mage about its sorcery, or <span id=enter>Any</span> other key to return to the Dark Woods.</span>");
	thread = 7;
}

magerouter = function(x){
	if (x==="q"){
		clear();
		output(1, "\"Ah... yes...\" it whispers. \"What sorcery I can teach you is limited only by your capacity to learn! Well, that, and how much gold have brought me.\"<br>");
		output(2, "As you become more cunning, I can teach you new curses to lance upon your enemies - or yourself. Each lesson will cost you in gold, plus one precious gem.<br>" +
			"Here's what you I'm willing to share with you for now...<br>");
		output(3, "<ul><li>(<span id=letter>1</span>) <span id=menu>Thunderous Clap</span> - your opponent won't know what hit them! (<span id=letter>"+spellz.clap.gold+" Gold</span>)" +
			"<li>(<span id=letter>2</span>) <span id=menu>Egregious Shield</span> - double your defensive bonus during your next battle (1 Cunning required) (<span id=letter>"+spellz.shield.gold+" Gold</span>)" +
			"<li>(<span id=letter>3</span>) <span id=menu>Curative Words</span> - restore yourself to full health (once per day) (2 Cunning required) (<span id=letter>"+spellz.heal.gold+" Gold</span>)</ul>");
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
		output(4, "\"You lack the cunning for such advanced sorcery. Come back when you are clever...er.\"<br>");
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
	} else { output(4, "Come again?"); setTimeout(function(){ magerouter() }, 1000) }
}

mpurch = function(x){
	if (x==="n"){
			// no
		output(4, "The Mage sighs. \"Do not dawdle with me, wanderer...\"<br>");
		output(5, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 7.7;
	} else {
		var temp;
		clear();
		if (userInfo.gold >= currentmerch.gold) {
			if (findgems()) {
				// successful buy
				userInfo.gold -= currentmerch.gold;
				userInfo.items.other.splice(temp,1);
				userInfo.items.magic.push(currentmerch);
				console.log("post assign: " + userInfo.items.magic);
				output(1, "The Mage nods solumnly, its shouded head dipping as you hear foreign-sounding chants too low for you to hear. Soon, you feel a spark of inspiration, and the " + currentmerch.name + " magick is suddenly familiar to you!<br>");
				output(2, "\"Wield this magic wisely, young one...\" says the Mage.<br>");
				output(3, "Your gold pouch feels mysteriously lighter.<br>");
				output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
				thread = 7.7;
			} else {
				output(1, "The Mage's head shakes inside his cloak. \"You lack any precious gems. Try again when you find one.\"<br>");
				output(2, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
				thread = 7.7;
			}
		} else {
			// not enough simoleons
			output(1, "The Mage sighs. \"Knowledge is free, but education is not. Come back when you have gold equal to my enchantments.\"");
			output(2, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 7.7;
		}
	}
}

checkCunning = function(x){
	x = Number(x);
	if (x===1){
		if (userInfo.attributes.cunning<spellz.clap.cunningreq){
			return true
		}
	} else if (x===2){
		if (userInfo.attributes.cunning<spellz.shield.cunningreq){
			return true
		}
	} else if (x===3){
		if (userInfo.attributes.cunning<spellz.heal.cunningreq){
			return true
		}
	} else return false;
}

spellz = {
	clap:{
		name:"Thunderous Clap",
		cunningreq: 0,
		turnsreq: 1,
		attack: 10,
		gold: 150
	},
	shield:{
		name:"Egregious Shield",
		cunningreq: 1,
		turnsreq: 3,
		defense: 0,
		gold: 400
	},
	heal:{
		name:"Curative Words",
		cunningreq: 2,
		turnsreq: 8,
		attack: 0,
		gold: 650
	}
}