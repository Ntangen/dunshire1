u = "", p="";
date = new Date();
month = date.getMonth() + 1;
day = date.getDate();
monthday = month + "-" + day;


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
	Meteor.call("acts",userInfo.username, "startcheck");
	var date = new Date();
	var today = date.getDate(); 
	if(userInfo.lastPlayed != today){
		// user did not play today, so get 'em going with full hp & turns again
		userInfo.hp = userInfo.level.maxhp;
		userInfo.turnsToday = 20;
		userInfo.lastPlayed = today;
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
					Meteor.call("playerSetup", u);
					userInfo.username = u;
					drink=true;
					Meteor.subscribe("bank",Meteor.user().username);
					Meteor.call("acts",userInfo.username, "startcheck");
					console.log("new user: " + u);
					output(4, "<span id=quote>\"Very well. Henceforth, friend, you'll be known as \"<span id=menu>" + Meteor.user().username + "</span>\".</span><br>");
					output(5, "Your password is: '<strong><span id=menu>" + p + "</strong></span>'. Don't forget it!<br>");
					output(6, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
					thread = 0.24;
					});
		} 
	} else if (y===3){
		clear();
		output(1, "Now - we're almost done! As a last step, you get to choose to add 1 point to any of your four key character attributes. Which do you choose?<br>");
		output(2, "<span id=menu><ul><li>(<span id=letter>C</span>)harisma: this will help you get along with other characters." +
			"<li>(<span id=letter>L</span>)uck: this will grant you good fortune." +
			"<li>(<span id=letter>M</span>)ysticism: this will build your mental fortitude." +
			"<li>(<span id=letter>S</span>)trength: this will make you more powerful in combat." +
			"</ul></span><br>");
		output(3, "<span id=menu>Make your choice.</span>");
		thread = 0.25;
	} else if (y===4){
		if (x==="c"){
			userInfo.attributes.charisma += 1;
			output(3, "Outstanding! You are now wittier, funnier and more fun to be around!");
		} else if (x==="l"){
			userInfo.attributes.luck += 1;
			output(3, "Outstanding! The fates shine upon you!");
		} else if (x==="m"){
			userInfo.attributes.myst += 1;
			output(3, "Outstanding! You can now hear the music of the spheres!");
		} else if (x==="s"){
			userInfo.attributes.strength += 1;
			output(3, "Outstanding! You are now more powerful than before!");
		} else {
			output(3, "You must input an attribute.<br>");
			thread = 0.25;
			return;
		}
		output(4, "Would you care to hear some instructions? Or just continue on to town?<br><br>" +
			"<span id=menu>Press <span id=enter>H</span> to hear instructions, or <span id=enter>Any</span> other key to continue on to town.</span>");
		thread = 0.3
	} else {
		output(3, "The Innkeeper smacks the long bench with his palm. <span id=quote>Excellent! You must choose a password, though... it's hard for me to remember all of the drifters who come through here by sight.</span><br>");
		output(4, "<span id=menu>(Input a password and press <span id=enter>Enter</span> to continue, or simply <span id=letter>N</span> to use a different username.</span>");
		thread = 0.23;
	}
}

greeting = function (x){
	if (x==="h"){
		// instructions
		clear();
		output(1, "The Innkeeper nods his head. <span id=quote>\"Okay then.\"</span><br><br>" +
			"<span id=quote>You may have many questions. What topic would you like explained?</span><br>");
		output(2, "<span id=menu><ul><li><span id=letter>1</span> - The Village of Dunshire" +
			"<li><span id=letter>2</span> - Fighting" +
			"<li><span id=letter>3</span> - Buying/using merchandise" +
			"<li><span id=letter>4</span> - Interacting with villagers" +
			"<li><span id=letter>5</span> - Interacting with other wanderers" +
			"<li><span id=letter>6</span> - Magick" +
			"<li><span id=letter>7</span> - Game concepts" +
			"<li><span id=letter>8</span> - <span id=quest>Exit to the Village of Dunshire</span>" +
			"</ul></span>");
		thread = 0.4;
	} else departure();
}

instruct = function(x){
	clear();
	if (x==="1"){
		output(1, "The Village of Dunshire is a peaceful place - mostly. There are several small merchants in town for you to meet, as well as places to explore. As you become more experienced, you will discover some that you hadn't noticed at first.<br>");
		output(2, "The Village is surrounded by the Dark Woods. The Woods are inhabited by a fearsome variety of beasts - from the <span id=menu>" + chooseBeastLevel().name + "</span> to the <span id=menu>" + chooseBeastLevel().name + "</span> and many more. You will need to acquire better weapons, armor and more to defeat them all as time goes on.<br>");
		output(3, "There are other towns beyond the Dark Woods, of course. But you needn't worry about them for now.<br>");
		output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 0.41;
	} else if (x==="2"){
		output(1, "As you make your way through the Village, the Dark Woods and elsewhere, you may be called upon to defend yourself.<br>");
		output(2, "Fighting - whether it be with beasts in the Dark Woods or anywhere else - is straightforward. If you are lucky and/or skilled, you may have an opportunity to make the first strike - or not. You may be able to run away in the middle of a battle if your health runs low (but there's no guarantee you'll succeed). You cannot use your extra gear in the middle of a battle - doing so would require dropping your guard!<br>");
		output(3, "Defeating opponents will earn you gold and experience. The more formidable the opponent, the more gold and experience. You may run around the Dark Woods slaying as many squirrels as you like, but it will not make you rich.<br>");
		output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 0.41;
	} else if (x==="3"){
		output(1, "There is a wide array of merchandise available to buy, both in the Village and... elsewhere. Weapons, armor, healing medications, food and drink, and much more.<br>");
		output(2, "For merchandise that is not consumed immediately, they are available in your supplies, which are accessible whenever you are not actively in battle.<br>");
		output(3, "If you die, your supplies remain with you when you recover the next day. See Game Concepts for more on... death.<br>")
		output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 0.41;
	} else if (x==="4"){
		output(1, "There are many inhabitants of the Village for you to meet. Some are very friendly - like my brother Dean! Others... ahem, may not be.<br>");
		output(2, "Every person in the village may be able to help - or harm - you, often in ways you may not expect. Look for clues as time goes on. In some cases, their responses may change, depending on your level of experience or actions elsewhere.<br>");
		output(3, "Here's a free tip: ask my big brother, Dean, up in the Tavern for a cup of his famous <span id=quest>\"Brunswick stew\"</span>.<br>");
		output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 0.41;
	} else if (x==="5"){
		output(1, "You are not the only wanderer to arrive here, <span id=menu>" + userInfo.username + "</span>. There are others like you here.<br>");
		output(2, "You can find out who else is wandering about the Village by asking at the Tavern. If you wish, you can send your fellow wanderer a drink. Or, if you're so inclined, you can attempt to go stalk another fighter in the fields where most strangers make camp, and murder them in their sleep. You will need to attain at least the rank of Apprentice (Level 2) to do this, however. We don't need a bloodbath on our hands.<br>");
		output(3, "When one fighter defeats another in hand-to-hand combat, <span id=gold>half</span> of the defeated's gold goes to the victor. The victor also receives 20% of the defeated's experience points, though the latter <span id=defeat>does not lose</span> any points.<br>");
		output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 0.41;
	} else if (x==="6"){
		output(1, "There is magick here.<br>");
		output(2, "A person's aptitude for invoking magick is determined by their Mysticism (see Game concepts for more on attributes). Some magicks can only be invoked by a person powerful in Mysticism, while others are easier.<br>");
		output(3, "Some magicks are defensive. Others are offensive. Some are neither. You may invoke magick during battles, except while challenging (ambushing?) other players in the camps.<br>");
		output(4, "Magick is taxing on the humours, and diminishes your stamina. Invoking magick in battle will cost a certain number of your daily turns - the exact amount depends on the magick. Because magick is so demanding, a requisite level of Mysticism is required for each one.<br>")
		output(4, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 0.41;
	} else if (x==="7"){
		output(1, "Should you die here, don't panic. You will recover the next day. While you will not lose any of your supplies, you <span id=menu>may lose</span> some gold that is on your person, and not stored at the Bank. Gold stored at the Bank is safe... mostly.<br>");
		output(2, "In Dunshire, as in life, the ultimate metric of progress is time. You begin with 20 turns in battle each day, which can be used in the Dark Woods, fighting other adventurers or in other places. Just spending time in the Village (for example, at the Tavern or in the Abbey) does not incur turns.If you run out of turns, don't worry - they reset each day.<br>");
		output(3, "You advance in rank by completing missions, which you qualify for by gaining experience (usually in the Dark Woods). As you gain experience, the weaker creatures in the Woods will flee, and the more powerful ones will be attracted to you. Beware.<br>");
		output(4, "Every adventurer has certain attributes that they can develop over the course of their time in Dunshire. They are Strength, Luck, Charisma and Mysticism. Strength is useful during combat. Luck makes you more likely to encounter good fortune. Charisma can trigger more favorable encounters with other characters. Mysticism increases a person's aptitude and stamina in magick.<br>")
		output(5, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 0.41;
	} else if (x==="8"){
		departure();
	}
}

departure = function(x){
	clear();
	output(1, "You exit the inn. Leaving its warm light behind, you continue down the dirt path, the first shoots of sunlight beginning to break through the trees.<br>")
	output(2, "Soon, you come upon the Village of Dunshire.<br>");
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
	Meteor.call("loggingout",userInfo.username);
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
			thread=86.1;
		}
	}
	else if (x===1){
		clear();
		output(1, "<span id=defeat>Oh no! You have succumbed to your festering wounds and died.</span><br>" +
		"------------------------------------------------<br><br>");
		output(2, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread = 99;
		statusupdate("dead");
		//flag2 = "dead";
	}
}

death = function(x){
	clear();
	Meteor.call("acts",x,"goings","death");
	statusupdate("dead");
	output(1, "<span id=death>**************************************</span><br><br>" + 
		"You are dead.<br><br>");
	output(2, "Don't worry. It won't last long.<br>");
	output(3, "Try again tomorrow.<br><br>" + 
		"<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
	thread = 99;
	var temp = Math.random();
	if (temp<0.33){
		userInfo.gold = userInfo.gold * 0.40;
	} else if (temp>0.66){
		userInfo.gold = userInfo.gold * 0.80
	} else {
		userInfo.gold = 0;
	}
	Meteor.call("loggingout",userInfo.username);
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
	Meteor.subscribe("bank").stop();
	userInfo = undefined;
	statusupdate("reset");
	thread = 0;
	swordflag=false;
	shieldflag=false;
	minst=false;
}
