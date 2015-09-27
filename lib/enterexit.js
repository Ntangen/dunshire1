hello = function(x){
	if (x.includes("hello")) {
		output (1, "Hello yourself.");
		setTimeout(function(){enter()},1000);
	} else { output(1, "What, you can't say hello first?") 
	}
}

enter = function (){
		thread = 0.1;
		clear();
		output(1, "You're walking down a dirt path. It's nighttime, and cool out. The crickets are chirping around you.<br>" +
		"There's a soft light up ahead. As you get a little closer, the yellow light of a small country inn beckons.<br>" +
		"You open the small metal gate and walk into the inn's yard. There are torches about lighting the way, and the sound of a few voices talking and laughing inside.<br>" +
		"(Hit <span id=enter>Enter</span> to continue)<br><br>" )
}

enterpath = function(){
	output(2, "You go in.<br>" +
		"Bartender looks up from his wanted ads.<br>" +
		"What's your name, stranger?<br><br>");
	thread = 0.2;
}

greeting = function(x){
	userInfo.username = x;
	clear();
	output(3, "\"Well then,\" says the bartender, putting down the glass he's polishing. \"Hello there " + x + ".\"<br>" +
		"\"I'm Giles. I own this place.\" He looks you up and down. \"Haven't seen you passing through before... do you want to hear how things work here?\"<br>" +
		"Press (<span id=letter>Y</span>) for yes, or (<span id=letter>N</span>) to continue without instructions.");
	thread = 0.3;
}

greeting2 = function (x){
	clear();
	if (x === "y"){
		output(2, "Giles nods his head. \"Okay then.\"<br>" +
			"\"This here's a waystation. A place to get started before you head down the road to The Hill. That's the town you're headed for.\"<br>" +
			"((explain more about the game))<br>" +
// name; gender; armament and characteristics; can become what you want
			"When you get to town, make sure to go say hi to my brother Dean. He runs the tavern in town.<br>" + 
			"(Hit <span id=enter>Enter</span> to continue)" );
		thread = 0.4;
	} else if (x === "n"){
		output(2, "Ah, well then. Let's get on with it.<br>" + 
			"(Hit <span id=enter>Enter</span> to continue)");
		thread = 0.4;
	}
	else {output(2, "Say again, chief?<br>" +
		"Press (<span id=letter>Y</span>) for yes, or (<span id=letter>N</span>) to continue without instructions.");
	}
}

departure = function(x){
	clear();
	output(1, "You exit the inn. Leaving its warm light behind, you continue down the path to the town up ahead.")
	setTimeout(function(){townarrival()},1000);
	var townarrival = function (){
		output(2, "You come upon the town of The Hill.<br>" +
			"(Hit <span id=enter>Enter</span> to continue)");
		thread = 0.5
	}
}

death = function(x){
	clear();
	output(1, "<span id=death>**************************************</span><br><br>" + 
		"You are dead. But you don't need to stay that way. Come back tomorrow, and maybe you'll have better luck, wanderer.<br>" + 
		"(Hit <span id=enter>Enter</span> to continue)");
	thread = 99;   // will need to add a "turns today" thing
}

giles = function(x){
	clear();
	signpost("THE COUNTRY INN<br>------------------------------------------------");
	output(1, "When you come to, you are back at the country inn outside of town. Everything is a bit hazy.<br>" +
		"You go inside. Giles is there, and he beckons you over.<br><br>");
	output(2, "\"Looks like you had a bad encounter with that forest beast! No shame, wanderer. It's happened to all of us.<br>" +
		"You'll be back in the action tomorrow. For now, sit a spell. Have a drink.\" He plops an ale down in front of you, and you get comfortable.<br><br>");
	output(3, "<span id=death>Better luck tomorrow.</span>");
	// need to lock it for the rest of the day here
}