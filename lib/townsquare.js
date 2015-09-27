townsquare = function(x){
	clear();
	signpost("THE TOWN SQUARE<br>------------------------------------------------");
	output(1, "<><><><><><><><><><><><><><><><><br>" +
		"The town square is calm. Merchants hawk their goods, neighbors greet each other, and a few children go chasing each other through the streets.<br>" +
		"Where shall you go?<br><br><ul>" +
		"<li><span id=letter>T</span>avern<br>" +
		"<li><span id=letter>S</span>mither's Shop<br>" +
		"<li><span id=letter>G</span>reengrocer<br>" +
		"<li>The <span id=letter>B</span>ank<br>" +
		"<li>The Central <span id=letter>M</span>arket<br>" +
		"<li><span id=letter>D</span>ark Woods </ul>");
		thread = 0.6
}

townrouter = function(x){
	console.log(x);
	if (x==="t") tavern();
	else if (x==="s") smithy("a");
	else if (x==="g") grocer();
	else if (x==="b") bank();
	else if (x==="m") market();
	else if (x==="d") woods();
	else { output(2, "Come again?"); setTimeout(function(){ townsquare() }, 1000) }
}

grocer = function(x){
	console.log("grocer output");
	clear();
	output(1, "The grocer!")
}

bank = function(x){
	console.log("bank output");
	clear();
	output(1, "The bank!")
}

market = function(x){
	console.log("get the idea");
	clear();
	output(1, "The market!")
}

woods = function(x){
	clear();
	output(1, "You follow the dirt track that leads out of town and into the dark forest that surrounds the town.")
	setTimeout(function(){ woodsstart() }, 1500);
}