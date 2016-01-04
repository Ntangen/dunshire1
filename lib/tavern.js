drink=false;
tempdrink=undefined;
stew = false;
minst = false;
list="";

tavern = function(x){
	clear();
	Meteor.call("acts",x,"goings","tavern");
	signpost("THE TAVERN<br>------------------------------------------------");
	output(1, "The heavy oaken tavern door swings open with a low squeal. The crowded tavern's patrons nurse their drinks and carry on while a Minstrel plays in the back. " +
	"A man with a large, scratchy beard stands behind the bar with a towel.<br>");
	output(2, "<span id=quote>Well met, " + userInfo.username + "!</span> Press...<br>");
	output(3, tavmenulist());
	output(4, "What to do?<br>");
	thread = 0.7;
	Meteor.call("listusers", function(error,result){
		list = "<ul id=fourcol>" + result + "</ul>";
		});
	if (userInfo.booze = undefined){
		userInfo.booze = 0;
	}
}

tavernrouter = function(x){
	clear();
	if (x==="t") {
		// advice on moving up levels?
		deantalk();
		output(6, "<span id=menu>(Press <span id=enter>Enter</span> to continue)</span>");
		thread = 0.71;
	}
	else if (x==="d") { output(2, "Dean nods slowly, not looking up from the glass he's polishing. <span id=quote>\"Here's what we've got...\"</span><br>") ;
		output(3, drinklist());
		output(4, "<span id=quote>\"What'll you have, " + userInfo.username + "?\"</span><br>");
		output(5, "<span id=menu>Select your drink, or press <span id=letter>Q</span> if nothing interests you.<br></span>");
		thread = 0.711;
	}
	else if (x==="s") { output(2, "Dean shrugs. <span id=quote>\"Suit yourself, drifter.\"</span><br><br>");
		barlines();
		thread = 0.72;
	}
	else if (x==="a"){
		minstrel();
	}
	else if (x==="l"){
		lookaround();
	}
	else if (x==="x"){
		tavstalk();
	}
	else if (x==="r") { output(2, "You get up from the bar and saunter out the door."); setTimeout(function(){ townsquare() }, 1000); 
	}
	else if ((x.search("brunswick stew")) != -1) { 
		if (stew === false){
			output(2, "Dean narrows his eyes. <span id=quote>\"Who told you abou-\"</span> he says, before trailing off and smirking.<br>" +
				"<span id=quote>\"Let me guess. Me damned brother, up the road! Well. If he sent you, then I guess it's the least I can do. We still have some left. Enjoy.\"</span><br>");
			output(3, "Dean goes back to the kitchen, and returns with a steaming bowl of Brunswick stew.<br><br><br>");
			output(4, "<span id=victory>Eating the stew makes you feel re-energized! 5HP added!</span><br>");
			output(5, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			userInfo.hp += 5;
			statusupdate();
			thread = 0.71;
			stew = true;
		} else {
			output(2, "Dean shrugs. <span id=quote>\"Sorry, friend. We're all out.\"</span>")
			output(3, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			thread = 0.71;
		}
	}
	else if (x==="b" && drink){
		drinknote();
	}
	else if (x==="i" && userInfo.level.level>=3){
		chooseclear(2);
		chooseclear(3);
		if (userInfo.level.level===3){
			output(4, "Dean narrows his eyes. <span id=quote>\"Who told you abou...\"</span> he stops, and then looks around, as if checking for something. <span id=quote>\"Very well... go on. Be safe.\"</span><br>");
		} else {
			output(4, "Dean looks around the bar, checking for unfamiliar faces. <span id=quote>\"Okay - you're fine. Go ahead. Be safe.\"</span><br>");
		}
		output(5, "You proceed to the unmarked door in the back of the Tavern and slip through unnoticed.<br>");
		output(6, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
		thread=2.3;
	}
	else if (x==="k") senddrink(0,0,0);
	else { output(4, "Come again?"); 
	setTimeout(function(){ tavern() }, 1000) 
	}
}

tavmenulist = function(){
	var temp = "<span id=menu><ul><li>(<span id=letter>T</span>) to talk with Dean" +
		"<li>(<span id=letter>D</span>) to order a drink" +
		"<li>(<span id=letter>S</span>) to sit and listen to what's going on at the bar" +
		"<li>(<span id=letter>A</span>)sk the Minstrel to play a song" +
		"<li>(<span id=letter>L</span>)ook around at the other players in the Tavern" +
		"<li>(<span id=letter>X</span>) inquire casually about another player's whereabouts" +
		"<li>(<span id=letter>K</span>) to send a drink to another player";
	if (drink){
		temp += "<li>(<span id=letter>B</span>) <span id=gold>A drink awaits you</span> at the end of the bar!";
	}
	if (userInfo.level.level>=3){
		temp += "<li>(<span id=letter>I</span>)nquire with Dean about the unmarked back door";	
	}
	temp += "<li>(<span id=letter>R</span>) to return to the street</ul></span>";
	return temp;
}

drinkrouter = function(x){
	if (x==="4"){
		if (userInfo.gold < 25){
			clear();
			output(2, "Dean looks at you askance. <span id=quote>\"Afraid this is a cash-only establishment, friend. And you don't seem to have it.\"</span><br>");
			output(3, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
			thread = 0.71;
			return;
		}
		userInfo.gold = userInfo.gold - 25;
		statusupdate();	
		clear()
		output(2, "Dean nods. <span id=quote>\"Glass of our finest Top's White Whiskey, coming up! Enjoy.\"</span><br>" +
			"He slides a glass of smooth, golden liquid towards you.<br><br>" +
			"Press <span id=letter>Any</span> key to continue.");
		thread = 0.71; 
		userInfo.booze += 2;
	} else if (x==="3"){
		if (userInfo.gold < 15){
			clear();
			output(2, "Dean looks at you askance. <span id=quote>\"Afraid this is a cash-only establishment, friend. And you don't seem to have it.\"</span><br>");
			output(3, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
			thread = 0.71;
			return;
		}
		userInfo.gold = userInfo.gold - 15;
		statusupdate();		
		clear();
		output(2, "Dean nods. <span id=quote>\"Tankard of Burt's Beer, coming up! Enjoy.\"</span><br>" +
			"He slides a glass of frothy cold beer towards you.<br><br>" +
			"<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
		thread = 0.71;
		userInfo.booze += 1;
	} else if (x==="2"){
		if (userInfo.gold < 10){
			clear();
			output(2, "Dean looks at you askance. <span id=quote>\"Afraid this is a cash-only establishment, friend. And you don't seem to have it.\"</span><br>");
			output(3, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
			thread = 0.71;
			return;
		}		
		userInfo.gold = userInfo.gold - 10;
		statusupdate();	
		clear();	
		output(2, "Dean nods. <span id=quote>\"Pint of Aemon's Ale, coming up! Enjoy.\"</span><br>" +
			"He slides a glass of opaque brown ale towards you.<br><br>" +
			"<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
		thread = 0.71;
		userInfo.booze += 1;
	} else if (x==="1"){
		if (userInfo.gold < 5){
			clear();
			output(2, "Dean looks at you askance. <span id=quote>\"Afraid this is a cash-only establishment, friend. And you don't seem to have it.\"</span><br>");
			output(3, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
			thread = 0.71;
			return;
		}		
		userInfo.gold = userInfo.gold - 5;
		statusupdate();		
		clear();
		output(2, "Dean grimaces. <span id=quote>\"That kind of day, eh? Well... cup of Greb's Grog... if you insist.\"</span><br>" +
			"He slides a small glass of lukewarm, putrid green liquid towards you.<br><br>" +
			"<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
		thread = 0.71;
		userInfo.booze += 1;
	} else { output(3, "Come again?"); setTimeout(function(){ tavern() }, 1000) }
}

drinklist = function(x){
	var temp = "<ol>";
	for(i=0;i<drinks.length;i++){
		temp += "<li> " + drinks[i].name + " (" + drinks[i].gold + " Gold)<br>";
	}
	temp += "</ol>";
	return temp;
}

deantalk = function(){
	if (userInfo.level.level===1){
		// return output 3-5
		output(3, "<span id=quote>\"As a newcomer, you should explore town a bit. Understand what's here. Venturing into the Dark Forest will help you gain valuable skills, but be prepared to fight.</span><br>");
		output(4, "<span id=quote>After you have learned to use your " + userInfo.items.weapon.name + " in combat, and gained some experience, I would recommend going to visit the Abbey. It's a terrible shame about the robbery there...</span>");
		return;
	} else if(userInfo.level.level===2){
		output(3, "<span id=quote>If you hope to reach the level of Challenger, you'll have to arm yourself with something powerful. You should go see the Smithy about that.</span><br>");
		output(4, "<span id=quote>Some awful strange stories coming out of the goat farm east of town. Grannon, the farmer there, might be losing his mind. You should go and get to the bottom of it.</span>");
		return;
	} else if(userInfo.level.level===3){
		// tipz
	} else if(userInfo.level.level===4){
		
	} else if(userInfo.level.level===5){
		
	} else if(userInfo.level.level===6){
		
	} else if(userInfo.level===6){
		
	} else if(userInfo.level===7){
		
	} else if(userInfo.level===8){
		
	} else if(userInfo.level===9){
		
	} else if(userInfo.level===10){
		
	}
}

minstrel = function(x){
	clear();
	if (x==="a"){
		if (minst===true){
			output(3, "The Minstrel has already played for you today, and now entertains other tavern patrons.<br>");
			output(4, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
			thread=0.71;
			return;
		}
		else {
			var rando = Math.random();
			if (rando <=0.33){
				output(3, "The Minstrel pauses for a moment, gazes wistfully into the distance, and strums his rendition of \"The Mummer's Lament.\"<br>");
			} else if (rando >0.33 && rando <=0.66){
				output(3, "The Minstrel grins and excitedly launches into a rousing version of \"The Red Dragon's Tale.\" The bar goes wild and sings along!<br>");
			} else if (rando >0.66){
				output(3, "The Minstrel thinks for a moment, and then yodles a heartfelt stanza of \"The Knight's Sweetheart.\"<br>");
			}
			if (rando <=0.1){
				userInfo.turnsToday += 3;
				output(4, "<span id=gold>You receive 3 more turns today!</span><br>");
				output(5, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
				thread = 0.71;
			} else if (rando >=0.95) {
				var rando2 = Math.random();
				if (rando2<0.25){
					userInfo.attributes.charisma += 1;
					output(4, "<span id=gold>You suddenly feel witter, funnier, and more charming!</span><br>");
				} else if (rando2>=0.25 && rando2<0.5){
					userInfo.attributes.luck += 1;
					output(4, "<span id=gold>You feel like playing the lottery...</span><br>");
				} else if (rando2>=0.5 && rando2<0.75){
					userInfo.attributes.strength += 1;
					output(4, "<span id=gold>Your muscles bulge beneath your " +  userInfo.items.armor.name + "!</span><br>");
				} else {
					userInfo.attributes.myst += 1;
					output(4, "<span id=gold>You can hear the music of the spheres more clearly now...</span><br>");
				}
				output(5, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
				thread = 0.71;
			} else if (rando>0.1 && rando<0.15) {
				var user = Meteor.user().username;
				var result = Bank.findOne({username:user});
				if (result != undefined){
					Meteor.call('bankUpdate',user,"dep",result.deposit, function(error, result){});
					output(4, "<span id=gold>Somewhere, magic has happened!</span><br>");	
				}
				output(5, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
				thread = 0.71;
			} else {
				output(4, "Your spirit feels refreshed.<br>");
				output(5, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
				thread = 0.71;
			}
			minst = true;
		}
	} else if (x==="t"){
		var temp;
		if (findgems()){
			var temp2 = Math.round((Math.random()*3)+1);
			if (temp2===1){
				userInfo.attributes.luck += 1;
			} else if (temp2===2){
				userInfo.attributes.strength += 1;
			} else if (temp2===3){
				userInfo.attributes.charisma += 1;
			} else if (temp2===4){
				userInfo.attributes.myst += 1;
			}
			userInfo.items.other.splice(temp,1);
			output(2, "You discreetly hand the Minstrel your small pouch of rubies. He bows deeply in receipt.<br>");
			output(3, "<span id=quote>\"Why, dear Patron, you honor me. Allow me to sing this ballad in your honor!\"</span><br><br>" + 
				"The Minstrel sings a great, stirring tale of your bravery and courage!<br>");
			output(4, "You are a patron of the arts. <span id=gold>1 point has been added to one of your attributes!</span><br>");
			output(5, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span><br>");
				thread = 0.71;
		} else {
			output(2, "You have no gems to give him!<br>");
			output(3, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
			thread = 0.71;
		}
	} else if (x==="b"){
		tavern();
	} else {
		output(1, "A bearded Minstrel strums his gittern near the tavern's corner fireplace.<br>" +
			"He bows deeply to you as you approach. <span id=quote>\"Sit, friend, and hear a song of adventure and woe...\"</span><br>");
		output(2, "<span id=menu>Press <span id=letter>A</span> to request a song, <span id=letter>T</span> to tip him with your precious gems, or <span id=letter>B</span> to return to the bar.</span><br>");
			thread = 0.75;
	}
}

findgems = function(){
	if (userInfo.items.other.length === 0){
		return false
	} else {
		for (i=0; i<userInfo.items.other.length;i++){
			if (userInfo.items.other[i].name === "Precious rubies"){
				temp = i;
				return true;
			}
		}
	}
}

lookaround = function(){
	clear();
	output(1, "Glancing at the guest book, you see the following names who have been through recently:<br>");
	output(2, list );
	output(3, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
	thread = 0.71;
}

drinknote = function(x,y){
	if (y===2){
		if (x==="n"){
			tavern();
		} else {
			Meteor.call("checkUser",userInfo.username,"grabdrink",x,function(error,result){
				if (result===false){
					output(2, "Whose drink was that? Try the name again, or enter <span id=letter>N</span> for none of them.<br>");
					thread=0.73;
				} else {
					output(2, "You happily take the " + result.drink.type.name + " and tip it back as you read " + result.drink.sender + "'s message:<br>");
					output(3, "<p>" + result.drink.msg + "</p><br>");
					output(4, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
					thread=0.71;
					userInfo.booze += 1;
					Meteor.call("checkUser",userInfo.username,"movedrink",result.position,function(error,result){
						if (result){
							// still have drinks left
							drink=true;
						} else{
							// no drinks left
							drink=false;
						}
					});
				}
			});
		}
	} else {
		clear();
		Meteor.call("checkUser", userInfo.username, "getdrink", function(error,result){
			output(1, result);
		});
		output(2, "Whose drink shall you quaff first? Type their name below, or enter <span id=letter>N</span> for none of them.<br>");
		thread = 0.73
	}
}

senddrink = function(x,y,z){
	if (x==="n"){
		chooseclear(4);
		output(2, "Dean shrugs. <span id=quote>\"Suit yourself.\"</span> He moves on to other patrons.<br>");
		output(3, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
		thread=0.71;
	} else if (z===0){
		clear();
		output(1, "You wave Dean over, and he asks: <span id=quote>\"Who would you like to send a drink to?\"</span><br>");
		output(2,list);
		output(3, "<span id=menu>Enter the player you wish to send a drink to, or enter <span id=letter>N</span> for none of them.</span>");
		thread=0.74;
	} else if (z===1){
		// which drink
		Meteor.call("finduser",x,function(error,result){
			if (result){
				clear();
				Meteor.call("checkUser",userInfo.username,"checkdupdrink",x,function(err,res){
					if (res){
						output(1, "You have already sent to this person!")
						output(2, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
						thread = 0.71;
					} else {
						tempdrink={to:x,type:undefined,msg:undefined};
						output(1, "<span id=quote>\"Excellent. And which drink would you care to send to " + x + "?\"</span><br>");
						output(2, drinklist() + "<br>");
						output(3, "<span id=menu>Select your drink, or press <span id=letter>N</span> if nothing interests you.<br></span>");
						thread = 0.742;
					}
				}); 
			} else {
				output(4, "<span id=menu>Come again? Try the name again, or enter <span id=letter>N</span> for none of them.</span><br>");
				thread=0.74;
			}
		});
	} else if (z===2){
		// what message
		var temp = x-1;
		if (userInfo.gold<drinks[temp].gold){
			output(3, "Dean looks at you askance. <span id=quote>\"Afraid this is a cash-only establishment, friend. And you don't seem to have it.\"</span><br>");
			output(4, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
			thread = 0.71;
		} else {
			clear();
			tempdrink.type = drinks[temp];
			output(1, "<span id=quote>\"Ah, " + drinks[temp].name + " - I have some right here. You can also leave a short message - no longer than this napkin here, though.</span><br>");
			output(2, "<span id=menu>Enter a message in less than 150 characters below.<br>");
			thread=0.743;
		}
	} else if (z===3){
		// confirm
		if (x.length>150){
			output(3, "Your message is too long. Please try again.");
			thread=0.743;
		} else {
			clear();
			tempdrink.msg = x;
			output(1, "<span id=quote>Very well - so we've got a " + tempdrink.type.name + " going to " + tempdrink.to + " with the message: <p><span id=quest>\"" + tempdrink.msg + "\"</span></p> - that sound all right to you?</span><br>");
			output(4, "<span id=menu>Press <span id=letter>Any</span> key to confirm, or <span id=letter>N</span> to change your mind.</span><br>");
			thread=0.744;
		}
	} else if (z===4){
		clear();
		Meteor.call("checkUser",userInfo.username,"senddrink",tempdrink);
		userInfo.gold -= tempdrink.type.gold;
		output(1, "Dean nods, and takes your message. <span id=quote>\"I'll be sure to pass it on when I see " + tempdrink.to + " pass through here next!\"</span><br>");
		output(2, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
		thread = 0.71;
	}
}

tavstalk = function(x,y){
	if (x===1){
		Meteor.call("finduser",y,function(error,result){
			if (error) { console.log("error: " + error) }
			if (result){
				clear();
				target=y;
				output(1, "As casually as you can, you ask Dean about <span id=menu>" + y + "'s</span> whereabouts.<br>");
				if (userInfo.level.level>=2){
					if (fortune("char")){
						output(2, "Dean barely looks up from his washing. <span id=quote>Oh, sure, I saw <span id=menu>" + y + "</span> here earlier. I think they're sleeping out in the camps outside of town tonight. They're not hard to find.</span><br>");
						output(3, "<span id=menu>Press <span id=letter>Any</span> key to thank Dean and discreetly slip out of the tavern, or <span id=letter>N</span> to forget it and return to your swill.</span>");
						thread=8.2;
					} else {
						// you're shady
						output(2, "Dean stops what he's doing and looks at you suspiciously. <span id=quote>Why are you looking for <span id=menu>" + y + "</span>? Wait... I don't want to know.</span> Dean looks both ways and then leans down to speak quietly.<br><br>" +
							"<span id=quote>If you really want to know, I might try to remember...</span> he says, tapping his finger on the bar.<br>");
						output(3, "<span id=menu>Press <span id=letter>S</span> to slide 25 gold pieces across the bar, or <span id=letter>Any</span> other key to change the subject.</span><br>");
						thread=8.1;
					}
				} else {
					output(2, "Dean narrows his bushy eyes at you. <span id=quote>Have you so much as slain a beast in the dark forest yet, stranger? I'd recommend cutting your teeth on the creatures out there before trying your hand at a human opponent... they're much stronger!</span><br>");
					output(3, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
					thread=0.71;
				}
			} else {
				output(3, "<span id=menu>Come again? Try the name again, or enter <span id=letter>N</span> to change your mind.</span><br>");
				thread=8;
			}
		});
	} else {
		clear();
		output(1, "Which fellow wanderer do you wish to stalk?<br>"); 
		output(2,list);
		output(3, "<span id=menu>Type your target's name below, or or enter <span id=letter>N</span> to change your mind.</span>");
		thread = 8
	}
}

tavstalkrouter = function(x,y){
	if (y===2){
		stalk();
	} else if (y===3){
		stalk();
	} else if (x==="s"){
		chooseclear(3);
		if (userInfo.gold<25){
			output(4, "You fumble in your pockets, but cannot locate find 25 gold pieces. Embarassed, you shrug and tell Dean to forget it, feeling poor.<br>");
			output(5, "<span id=menu>Press <span id=letter>Any</span> key to continue.</span>");
			thread=0.71;
		} else {
			clear();
			output(1, "You slide 25 gold pieces across the bar, and Dean quickly slides them off into his apron.<br>");
			output(2, "Looking around to be sure he's not overheard, Dean leans in close to you again. <span id=quote>I heard that <span id=menu>" + target + "</span> is camping just outside of town tonight. Not far from the Graveyard. But... you never heard that from me.</span><br>");
			output(3, "<span id=menu>Press <span id=letter>Any</span> key to thank Dean and discreetly slip out of the tavern, or <span id=letter>N</span> to forget it and return to your swill.</span>");
			thread=8.3;
			userInfo.gold -= 25;
			statusupdate();
		}
	} else {
		target=undefined;
		tavern();
	}
}
