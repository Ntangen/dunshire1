strturns = 0, speedturns = 0;

bailey = function(x){
	clear();
	signpost("LORD CHARLIE'S CALISTHENICS BAILEY<br>------------------------------------------------");
	output(1, "The Bailey is bustling with fighters grunting, yelling, punching bags and lifting heavy things.<br>" +
		"The smell of sweat and old leather pervades everything.");
	if (x === "a") { output(2, "Lord Charlie saunters over, a sweaty cloth draped around his thick neck.<br>" +
		"Feeling punchy, are we? Ready to work? Let's get you into shape!<br><br>");	
		}
	output(3, "Press (<span id=letter>S</span>) to try Lord Charlie's strength training regimen, (<span id=letter>F</span>) to work on your speed, or (<span id=letter>L</span>) to leave.");
	thread = 2;	
}

baileyrouter = function(x){
	clear();
	if (x==="s") {
		output(2, "Lord Charlie grins toothily and punches your arm. \"That's what I like to hear! Strength is the mark of any champion fighter. You'll be able to hit harder, inflict more damage, and even use special weapons.\"<br>");
		output(3, "My strength conditioning program will develop your strength. It will take some time, but if you stick with it, you won't be sorry.<br><br>");
		output(4, "Press <span id=letter>A</span>ny key to begin strength conditioning, or (<span id=letter>B</span>) to change your mind.<br>" +
			"(Each round of strength conditioning will require 1 turn.)");
		thread = 2.1;
	}
	else if (x==="f") { output(2, "Lord Charlie chuckles. \"Feeling the need for speed, eh? It's like I tell everyone - speed is so important. It'll help you hit your enemies faster, and more often, and outrun them if necessary.\"<br>") ;
		output(3, "\"My speed program will help you get faster. But you'll have to work on it. Do you want to begin?\"<br><br>");
		output(4, "Press <span id=letter>A</span>ny key to begin speed training, or (<span id=letter>B</span>) to change your mind.<br>" +
			"(Each round of speed training will require 1 turn.)");
		thread = 2.2;
	}
	else if ((x.search("battle royale")) != -1) { output(2, "Lord Charlie looks you over and grunts. \"Well... the crowd always likes new meat, I guess. Just go through the unmarked door o'er there on the left. Be careful, now.\"<br><br>");
		output(3, "Press <span id=letter>A</span>ny key to continue.");
		thread = 2.3;
	}
	else if (x==="l") { output(2, "Feeling weak, you turn and head back into the street."); setTimeout(function(){ townsquare() }, 1000) }
	else { output(2, "Come again?"); 
		setTimeout(function(){ bailey() }, 1000) 
	}
}

bstrength = function(x){
	if (x==="b"){
		output(4, "A ditherer, eh?");
		setTimeout(function(){ bailey() }, 1000) 
	} 
	output(2, "Zounds! Let us begin!<br>");
	chooseclear(3);
	if (x==="a"){
	output(3,"You follow Lord Charlie to the weights yard. Fighters there are picking up large pieces of metal and putting them down again. He points to a hunk of rusted iron in the corner.<br>");
	}
	output(4, bexercise("str"));
	output(5, "Press <span id=letter>A</span>ny key to do Lord Charlie's drill. Press (<span id=letter>B</span>) to go back.");
	thread = 2.11
}


bstrength1 = function(x){
	if (x==="b"){
		output(5, "A ditherer, eh?");
		setTimeout(function(){ bailey() }, 1000) 
	} else {
		strturns++;
		userInfo.turnsToday += 1;
		clear();
		// might be cool to have a "..." timer function here
		output(1, "You complete the repetition, and groan in exhaustion. Your muscles throb from the strain.<br>");
		output(2, "Lord Charlie nods. \"Well done! Hard work is its own reward - you're already getting stronger! Are you ready for another exercise?\"<br><br>");
		output(3, "Press <span id=letter>A</span>ny key to do another strength conditioning exercise. Press (<span id=letter>B</span>) to go back.");
		thread = 2.12
	}
}

bstrength2 = function(x){
	if (x==="b"){
		output(3, "\"Very well, then,\" Lord Charlie says, clapping you on the back. \"Good work today. Have some rest.\"");
		breward("str");
		setTimeout(function(){ bailey() }, 1000);
	} else bstrength();
}

bspeed = function(x){
	if (x==="b"){
		output(4, "A ditherer, eh?");
		setTimeout(function(){ bailey() }, 1000) 
	}
	output(2, "Zounds! Let us begin!<br>");
	chooseclear(3);
	if (x==="a"){
		output(3,"Charlie leads you to a series of staggered posts and rings leading to the far corner of the bailey. Fighters of all sizes are racing through them, tagging the posts and trying not to fall.<br>");
	}
	output(4, bexercise("speed"));
	output(5, "Press <span id=letter>A</span>ny key to do Lord Charlie's drill. Press (<span id=letter>B</span>) to go back.");
	thread = 2.21
}

bspeed1 = function(){
	if (x==="b"){
		output(5, "A ditherer, eh?");
		setTimeout(function(){ bailey() }, 1500) 
	} else {
		speedturns++;
		userInfo.turnsToday += 1;
		clear();
		// might be cool to have a "..." timer function here
		output(1, "You finish the course gasping for breath. Your legs scream for relief.<br>");
		output(2, "Lord Charlie claps his hands. \"Good job! Hard work is its own reward - you're steadily getting faster! Are you ready for another exercise?\"<br><br>");
		output(3, "Press <span id=letter>A</span>ny key to do another strength conditioning exercise. Press (<span id=letter>B</span>) to go back.");
		thread = 2.22
	}
}

bspeed2 = function(x){
	if (x==="b"){
		output(3, "\"Very well, then,\" Lord Charlie says, clapping you on the back. \"Good work today. Have some rest.\"");
		breward("speed");
		setTimeout(function(){ bailey() }, 1500);
	} else bspeed();
}

breward = function(type){
	if (type==="str"){
		// have to figure this one out
		userInfo.attributes.strength += (strturns/2);
		strturns = 0;
	}
	else if (type==="speed"){
		userInfo.attributes.speed += (speedturns/2);
		speedturns = 0;
	}
}

bexercise = function(x){
	if (x==="str"){
		var temp = exercises.strength[Math.round((Math.random()*3))];
		return temp.line;
	} else if (x==="speed") {
		var temp = exercises.speed[Math.round((Math.random()*3))];
		return temp.line;
	}
}

exercises = {
	strength: [
		{line: "\"You see that anvil over there? I want you to lift it over your head and then set it down ten times.\"<br>"},
		{line: "Lord Charlie points to a large stone mill wheel on the ground. \"Lift that upright. And then set it down again. Do that ten times.\"<br>"},
		{line: "Lord Charlie picks up the end of a length of thick castle portcullis rope attached to a far wall. \"Whip this up and down fifty times, creating a wave along the length of the rope.\"<br>"},
		{line: "\"Go pick up that heavy iron warhammer leaning against the well. Beat the ground with it twenty-five times.\"<br>"}
	],
	speed: [
		{line: "Lord Charlie points to a distant hitching post on the other side of the field. \"Go run to that, as fast as you can. Sprint back too.\"<br>"},
		{line: "Pointing to the staggered colored posts, Lord Charlie says \"Sprint around each of those posts, in sequence.\"<br>"},
		{line: "Lord Charlie directs you to the small rings lying in rows on the ground. \"Run through those and back, ten times.\"<br>"},
		{line: "\"For this drill, sprint to the far bailey wall, pick up the heavy iron bar there, and sprint with it back. Five times. Go!\"<br>"}
	]
}