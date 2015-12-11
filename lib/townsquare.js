townsquare = function(x){
	clear();
	statusupdate();
	signpost("THE TOWN SQUARE<br>------------------------------------------------");
	output(1, "<><><><><><><><><><><><><><><><><br>" +
		"The town square is calm. Merchants hawk their goods, neighbors greet each other, and a few children go chasing each other through the streets.<br>" +
		"Where shall you go?<br><br>");
	output(2, "<span id=menu><ul>" + townmenulist() + "</span>");
	thread = 0.6
}

townmenulist = function(){
	var temp =  "<li><span id=letter>T</span>avern<br>" +
		"<li><span id=letter>S</span>mither's Shop<br>" +
		"<li><span id=letter>A</span>pothecary's Cabin<br>" +
		"<li><span id=letter>B</span>ank of Doworth<br>" +
		"<li><span id=letter>V</span>illage Abbey<br>" +
		"<li><span id=letter>G</span>rannon's Farm<br>" +
		"<li><span id=letter>D</span>ark Woods<br>";
	// if (userInfo.level.level>=3){
	// 	temp += "<li>(<span id=letter>T</span>)he Bailey<br>";
	// }
	temp += "<li><span id=letter>C</span>heck your status<br>" +
		"<li><span id=letter>K</span> Review your supplies<br>" +
		"<li><span id=letter>Q</span>uit to your campsite</ul><br>";
	return temp;
}

townrouter = function(x){
	console.log(x);
	if (x==="t") tavern();
	else if (x==="s") smithy("a");
	else if (x==="a") alchemist("a");
	else if (x==="b") bank("a");
	// else if (x==="t") bailey();
	// else if (x==="m") market();
	else if (x==="d") woods();
	else if (x==="v") abbey("a");
	else if (x==="g") farm();
	else if (x==="c") townstatus();
	else if (x==="k") towngear();
	else if (x==="q") quit();
	else { output(2, "Come again?"); setTimeout(function(){ townsquare() }, 1000) }
}

// market = function(x){
// 	console.log("get the idea");
// 	clear();
// 	output(1, "The market!")
// }

woods = function(x){
	clear();
	output(1, "You follow the dirt track that leads out of town and into the dark forest that surrounds the town.")
	setTimeout(function(){ woodsstart() }, 1000);
}

townstatus = function(){
	woodsstatus();
	thread = 1.9;
}

towngear = function(){
	clear();
	var temp = showgear();
	if (temp === 0){
		output(2, "You have no items!<br>");
		output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 1.9;
	} else {
		output (2, temp);
		thread = 1.251;
	}
}

townusegear = function(x){
	if (typeof(parseInt(x))==="number"){
		var temp = Number(x)-1;
		var temp2 = usegear(temp)
		output(4, temp2);
		output(5, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 1.23;
	} else {
		townsquare();
	}
}

