u = "", p="";

hello = function(x){
	clear();
	signpost("HELLO<br>------------------------------------------------");
	statusupdate("reset");
	if (x.includes("hello") || x.includes("hi") || x.includes("howdy") || x.includes("bonjour") ) {
		output (1, "Hello yourself.");
		setTimeout(function(){enter()},1000);
	} else { output(1, "What, you can't say 'hello' first?") 
	}
}

enter = function (){
		thread = 0.1;
		clear();
		output(1, "You're walking down a dirt path. It's nighttime, and cool out. The crickets are chirping around you.<br><br>" +
		"There's a soft light up ahead. As you get a little closer, the yellow light of a small country inn beckons.<br><br>" +
		"You open the small metal gate and walk into the inn's yard. There are torches about lighting the way, and the sound of voices talking and laughing inside.<br><br>");
		output(2, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
}

enterpath = function(){
	clear();
	output(2, "As you enter, The Innkeeper looks up from where he's clearing a table.<br>" +
		"<span id=quote>\"Greetings! What's your name, stranger?\"</span><br><br>");
	thread = 0.2;
}

login = function(x){
	if (x===""){
		output(2, "You didn't enter anything. Try again?<br>");
		output(3, "<span id=menu>Press <span id=letter>Any</span> key to continue, and then enter your username in the input window below.</span><br>");
		thread = 0.1;		
	} else {
		Meteor.call('finduser', x, function(err, res){
			u=x;
			if (res) {
				console.log("user found!");
				output(2, "The Innkeeper nods a bit skeptically. <span id=quote>\"Ah, I see. I know <span id=menu>" + u +"</span>. What's <span id=menu>" +u+"</span>'s password?</span><br>");
				output(3, "<span id=menu>(Enter password and press <span id=enter>Enter</span> to continue)</span><br>");
				thread = 0.21
				return;
			} else { 
				console.log("user not found!");
				output(2,"The Innkeeper grunts. <span id=quote>\"Well met, <span id=menu>"+u+"</span>. Haven't seen you around before. You mean to introduce yourself?\"</span><br><br>");
				output(3, "<span id=menu>Press <span id=enter>Any</span> key to confirm new player, or <span id=enter>N</span> to try again.</span>");
				thread = 0.22;
			}
		});
	}
}

login1 = function(x){
	if (x===""){
		output(2, "You didn't enter anything. Try again?<br>");
		output(3, "<span id=menu>Enter a password below, or simply \"<span id=letter>N</span>\" to use a different username.</span><br>");
		thread = 0.215;
	} else {
		p = x;
		Meteor.loginWithPassword(u,p,function(err){
			if (err){
				console.log("error: " + err);
				output(3, "Are you sure? Mind trying again? (Press Enter to continue.)");
				thread = 0.1;
				return;
			}
		Meteor.call('grabRecord',u, function(error, result){
			if (error) { console.log ("error: " + error) }
			userInfo = result;
			var temp = dailyreboot();
			if (temp===1){
				clear();
				console.log("user login: " + u);
				output(1, "The Innkeeper's eyes light up in recognition. <span id=quote>\"Of course, <span id=menu>" + u + "</span>! I'm sorry I didn't recognize you. Welcome back!\"</span><br>");
				output (2,"<span id=menu>Press <span id=enter>H</span> to hear instructions, or <span id=enter>Any</span> other key to continue on to town.</span>");
				thread = 0.3
				Meteor.call('checkUser',u,"start",0,function(error,result){
					if (result.duel===true){
						flag2="duel";
						ghost=result.duelghost
					}
					if (result.drink===true){
						drink=true;
					}
				});
			} else if (temp===2){
				thread = 0;
			}
		});
	});
}
}

dailyreboot = function(){
	Meteor.subscribe("bank",Meteor.user().username);
	var date = new Date();
	var today = date.getDate(); 
	if(userInfo.lastPlayed != today){
		// user did not play today, so get 'em going with full hp & turns again
		userInfo.hp = userInfo.level.maxhp;
		userInfo.turnsToday = 20;
		// if (userInfo.level.level===1){
		// 	userInfo.turnsToday = 20;
		// } else if (userInfo.level.level===2){
		// 	userInfo.turnsToday = 20;
		// } else if (userInfo.level.level===3){
		// 	userInfo.turnsToday = 20;
		// } else if (userInfo.level.level===4){
		// 	userInfo.turnsToday = 20;
		// } else if (userInfo.level.level===5){
		// 	userInfo.turnsToday = 20;
		// }
		return 1; 
	} else if (userInfo.hp <= 0) {
		// user is dead
		statusupdate("dead");
		clear();
		output(1, "You remain dead. But don't worry - try back tomorrow!");
		output(2, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
		Meteor.logout();
		userInfo = undefined;
		return 2;
	} else {
		// user played today, isn't dead yet, may/may not have turns left
		return 1;
	}
}

newaccount = function(x, y){
	if (x==="n"){
		chooseclear(5);
		output(4, "As you say.");
		setTimeout(function(){ 
			enterpath() }, 1500)
		return;
	} 
	else if (y===2){
		if (x===""){
			output(4, "You didn't enter anything. Try again?<br>");
			output(5, "<span id=menu>Enter a password below, or simply \"<span id=letter>N</span>\" to use a different username.</span><br>");
			thread = 0.23;
		} else {
			p = x;
			var date = new Date();
			var day = date.getDate();
			newUserStats.username = u;
			Accounts.createUser({username: u, password:p, profile: newUserStats}, function(err){
					if (err) { console.log(err) }
					Meteor.call('playerSetup', u);
					userInfo = newUserStats;
					userInfo.username = u;
					drink=true;
					Meteor.subscribe("bank",Meteor.user().username);
					console.log("new user: " + u);
					output(4, "<span id=quote>\"Very well. Henceforth, friend, you'll be known as \"<span id=menu>" + Meteor.user().username + "</span>\".</span><br>");
					output(5, "Your password is: '<strong><span id=menu>" + p + "</strong></span>'. Don't forget it.<br>");
					output(6, "Would you care to hear some instructions? Or might you prefer to just continue on to town?\"<br>" +
						"<span id=menu>Press <span id=enter>H</span> to hear instructions, or <span id=enter>Any</span> other key to continue on to town.</span>");
					thread = 0.3
					});
		} 
	} else {
		output(3, "The Innkeeper smacks the long bench with his palm. <span id=quote>\"Excellent! You must choose a password, though... it's hard for me to remember all of the drifters who come through here by sight.\"</span><br>");
		output(4, "<span id=menu>(Input a password and press <span id=enter>Enter</span> to continue, or simply \"<span id=letter>N</span>\" to use a different username.</span>");
		thread = 0.23;
	}
}

greeting = function (x){
	if (x==="h"){
		// instructions
		clear();
		output(1, "The Innkeeper nods his head. <span id=quote>\"Okay then.\"</span><br><br>" +
			"<span id=quote>\"This here's a waystation. A place to get started before you head down the road to the village of Dunshire.</span><br>" +
			"<span id=quote>Once in town, go explore. Talk to people. Help rid the forest of some of those ghastly creatures lurking about in there - they'll reward you with gold, experience, and occasionally some other valuable items.</span><br>");
		output(2, "<span id=quote>Of course, you won't always have to tromp into the forest for those things. As time goes on, you're like to discover that there are more ways than one to get ahead in Dunshire...</span><br>")
		output(3, "<span id=quote>A word of advice... remember that all of your actions there will have consequences. Whether you choose to be honorable or black-hearted... bloodthirsty or acquisitive... faithful or heretical, all of these matter. You'll see.</span><br>");
		output (4, "<span id=quote>Oh,\"</span> he says, <span id=quote>\"just one more thing! When you get to town, make sure to go say hi to my brother Dean. He runs the tavern in town. Here's a free hint: ask him if he has any Brunswick stew to spare. I think you might like it.\"</span><br><br>" + 
			"<span id=menu>Press <span id=enter>Any</span> key to continue.</span>" );
		thread = 0.4;
	} else departure();
}

departure = function(x){
	clear();
	output(1, "You exit the inn. Leaving its warm light behind, you continue down the dirt path, the first shoots of sunlight beginning to break through the trees.<br>")
	output(2, "Soon, you come upon the village of Dunshire.<br>");
	// add spirits here
	output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 0.5
}

// spiritsgen = function(){
// 	var temp = Math.random();
// 	if (temp<0.25){
// 		// crappy mood
// 	} else if (temp>=0.25 && temp<0.5){
// 		// meh mood
// 	} else if (temp>=0.5 && temp<0.75){
// 		// good mood
// 	} else {
// 		// great mood
// 	}
// }

// end of game functions

quit = function(x){
	clear();
	signpost("QUIT TO CAMP<br>------------------------------------------------");
	statusupdate("reset");
	userInfo = undefined;
	Meteor.logout();
	Meteor.subscribe("bank").stop();
	output(1, "You make camp for the night and settle in.")
	thread = 0;
}

fester = function(x){
	if (userInfo.turnsToday!=turncounter){
		userInfo.hp -= (turncounter-userInfo.turnsToday);
		turncounter = userInfo.turnsToday;
		if (userInfo.hp<=0){
			thread = 86.1;
		}
	}
	else if (x===1){
		output(2, "<span id=defeat>Oh no! You have succumbed to your festering wounds and died.</span><br>" +
		"------------------------------------------------<br><br><br><br>");
		output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 99;
		statusupdate("dead");
		flag2 = "dead";
		return;
	}
}

death = function(x){
	clear();
	statusupdate("dead");
	output(1, "<span id=death>**************************************</span><br><br>" + 
		"You are dead.<br><br>");
	output(2, "Don't worry. It won't last long.<br>");
	output(3, "Try again tomorrow.<br><br>" + 
		"<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
	thread = 99;
}

finale = function(x){
	clear();
	statusupdate("dead");
	signpost("THE COUNTRY INN<br>------------------------------------------------");
	output(1, "When you come to, you are back at the country inn outside of town. Everything is a bit hazy.<br>" +
		"You go inside. The Innkeeper is there, and as he sees you stagger in, he beckons you over and helps you down on to a bench. Your muscles ache. Your head throbs.<br>");
	output(2, "<span id=quote>\"Looks like you had a bad encounter with that forest beast!\"</span> he says. <span id=quote>\"No shame in that, " + Meteor.user().username + ". It's happened to all of us. You'll be back in the action tomorrow. For now, sit a spell. Have a drink.\"</span><br><br>" +
		"He plops a tankard of frothy ale down in front of you, and the pounding in your head begins to subside. You decide to get comfortable.<br><br>");
	output(3, "<span id=death>Better luck tomorrow.</span>");
	Meteor.logout();
	Meteor.subscribe
	userInfo = undefined;
	statusupdate("reset");
	thread = 0;
	swordflag=false;
	shieldflag=false;
	minst=false;
}
