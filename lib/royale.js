round=undefined;

royale = function(x){
	clear();
	Meteor.call("acts",x,"events","royale");
	signpost("THE BATTLE ROYALE<br>------------------------------------------------");
	if (x === "a") { output(1, "After closing the unmarked wooden door, you descend a steep stone staircase. The low hum of men shouting and cheering below grows into a din as you draw closer.<br>");
		}
	output(2, "The raucous crowd surrounds a sunken pit, shouting and shaking pouches of gold while men in the middle brawl.<br><br>" +
		"The air tastes vaguely sour. Like blood.<br>");
	if (userInfo.mission==="royale"){
		output(3, "<span id=menu>Press (<span id=letter>F</span>) to <span id=quest>seek out the fightmaster</span>, (<span id=letter>C</span>) to Challenge another player, (<span id=letter>B</span>) to bet on the bloodsport, or (<span id=letter>R</span>) to return to the Tavern.</span><br>");
	} else {
		output(3, "<span id=menu>Press (<span id=letter>F</span>) to seek out the fightmaster, (<span id=letter>C</span>) to Challenge another player, (<span id=letter>B</span>) to bet on the bloodsport, or (<span id=letter>R</span>) to return to the Tavern.</span><br>");
	}
	thread = 3;	
}

rrouter = function(x){
	clear();
	if (x==="f") {
		clear();
		output(1, "Tox, the Battle Royale fightmaster, presides over the pit from a table stacked with gold, flanked by large men with fearsome swords.<br>");
		if (userInfo.level.level===3 && userInfo.mission!="royale"){
			output(2, "Tox looks up at you and snorts.<br><br>" +
			"<span id=quote>\"You? I don't care to turn this place into a mortuary, stranger. You look weak.\"</span><br>");
			output(3, "<span id=quote>\"But then again... the boys always enjoy cutting down fresh meat. Are you ready to prove yourself in our house?\"</span><br>");
			output(4, "<span id=menu>Press (<span id=letter>Y</span>) to accept the Battle Royale's challenge, or (<span id=letter>Any</span>) other key to remain on the sidelines, like a coward.</span><br>");
			thread=3.1;
		} else if (userInfo.mission==="royale"){
			output(2, "Tox looks you over again. <span id=quote>\"So, you're ready to fight our contenders, eh? They're ready for you!\"</span><br>");
			output(3, "<span id=menu>Press (<span id=letter>Any</span>) key to descend into the fighting pit and meet your first challenge, or (<span id=letter>N</span>) to change your mind and remain on the sidelines - like a coward.</span><br>");
			thread=3.3;
		} else {
			// level 4 content goes here
		}
	}
	else if (x==="c"){
		//challenge
	}
	else if (x==="b"){
		//betting
	}
	else if (x==="r") { output(3, "You tire of bloodsport, and turn back to return to the safety of the Tavern."); setTimeout(function(){ tavern() }, 1500) }
	else { output(3, "Come again?"); 
		setTimeout(function(){ royale() }, 1500) 
	}
}

rchallenge = function(x){
	if (x==="y"){
		output(4, "Tox looks surprised. <span id=quote>\"So... you fancy yourself a fighter, then?\"</span> He slams his table. <span id=quote>\"I like the sound of that!\"</span><br>");
		output(5, "<span id=quote>You shall face three opponents, stranger. Each more formidable than the last. Prove your worth, and we will accept you in this house.\"</span><br>");
		output(6, "<span id=quest>You have accepted the ordeal of the Battle Royale!</span><br>");
		output(7, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
		userInfo.mission="royale";
		thread=3.2;
	} else {
		output(4, "Tox sniffs. \"That's what I thought.\"");
		setTimeout(function(){ royale() }, 1000); 
	}
}

rrounds = function(x, y, z) {
	  if (y === 1) {
	    // round one
	    if (x === 1) {
	      clear();
	      output(1, "Grubby hands push you through the crowd until you stumble out into the fighting ring, and the pen door is locked behind you.<br>");
	      output(2, "Before you, a strange loincloth-wearing man with red stripes painted on his weathered face is lifting an ivory javelin...<br>");
	      if (fortune("luck")) {
	        output(3, "Fortune is yours, and you ready yourself in time to strike first!<br>");
	        output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
	        thread = 3.41;
	        // goes to player turn
	      } else {
	        output(3, "Chance is not on your side - Brezlev the javelin thrower launches into an attack!<br>");
	        output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
	        thread = 3.42;
	        // goes to opp turn
	      }
	      monster = beasts.lev3bs[0];
	      mhp = monster.hp;
	      round = 1;
	    } else if (x === 2) {
	      // player turn
	      clear();
	      var temp = userfight(monster);
	      if (temp === "k") {
	        output(1, "<span id=victory>You cut down " + monster.name + " with a mighty blow, and he yields!</span><br>");
	        rwins();
	      } else if (temp === "zip") {
	        output(1, "You strike at " + monster.name + " with your " + userInfo.items.weapon.name + ", but your amateurish attack inflicts no damage!<br>");
	        output(2, "The crowd bubbles over with guffawing, and " + monster.name + " chortles cruelly as he readies his counterattack.<br>");
	        output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
	        thread = 3.42;
	      } else {
	        output(1, "You strike at " + monster.name + " with your " + userInfo.items.weapon.name + " and inflict " + temp + " damage!<br>");
	        output(2, "The crowd goes wild, and " + monster.name + " snarls as he readies his counterattack.<br>");
	        output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
	        thread = 3.42;
	      }
	    } else {
	      // opp turn
	      clear();
	      var temp = monsterfight(monster);
	      statusupdate();
	      if (temp === "dead") {
	        output(1, "<span id=death>" + monster.name + " cuts you down with his javelin, and you sink to the floor!</span><br>");
	        output(2, "As your consciousness fades, you hear the surrounding crowd cheering in adulation for your adversary.<br>");
	        output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
	        thread = 86;
	      } else if (temp === "zip") {
	        output(1, monster.name + " " + monster.strike1 + ", but your armor protects you! You sustain 0 damage!<br>");
	        output(2, "The crowd jeers, and " + monster.name + " grits his teeth as you brush off his pathetic attack.<br>");
	        output(3, "<span id=menu>Press (<span id=letter>M</span>) to invoke magick, or (<span id=letter>Any</span>) other key to counterattack.<br></span>");
	        thread = 3.6;
	      } else {
	        if (shieldflag) {
	          output(1, monster.name + " " + monster.strike1 + ", inflicting " + temp + " damage! Your Egregious Shield absorbs part of the blow.<br><br>" +
	            "You hear cheers and boos from the crowd at the clever use of your magick!<br>" +
	            "------------------------------------------------<br>");
	        } else {
	          output(1, monster.name + " " + monster.strike1 + ", inflicting " + temp + " damage!<br><br>" +
	            "The crowd oohs and aahs as they witness the blow.<br>" +
	            "------------------------------------------------<br>");
	        }
	        output(2, "Your hitpoints: " + userInfo.hp + "<br>" +
	          monster.name + "'s hitpoints: " + mhp + "<br>");
	        output(3, "<span id=menu>Press (<span id=letter>M</span>) to invoke magick, or (<span id=letter>Any</span>) other key to counterattack.<br></span>");
	        thread = 3.6;
	      }
	    }
	  } else if (y === 2) {
	    // round two - dagger fighter
	    if (x == 1) {
	      // first round
	      clear();
	      output(1, "You stretch your arms and prepare for the next fight, as your adversary is escorted into the pit.<br>");
	      output(2, "A lean, not unattractive young woman steps in, two gleaming daggers clutched in her fists. Several more line her belt.<br>");
	      if (fortune("luck")) {
	        output(3, "Fortune is yours, and you ready yourself in time to strike first!<br>");
	        output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
	        thread = 3.44;
	        // goes to player turn
	      } else {
	        output(3, "Chance is not on your side - the Dagger Fighter launches into her attack!<br>");
	        output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
	        thread = 3.45;
	        // goes to opp turn
	      }
	      monster = beasts.lev3bs[1];
	      mhp = monster.hp;
	    } else if (x === 2) {
	      // player turn
	      clear();
	      var temp = userfight(monster);
	      if (temp === "k") {
	        output(1, "<span id=victory>You cut down " + monster.name + " with a mighty blow, and she yields!</span><br>");
	        rwins();
	      } else if (temp === "zip") {
	        output(1, "You strike at " + monster.name + " with your " + userInfo.items.weapon.name + ", but your amateurish attack inflicts no damage!<br>");
	        output(2, "The crowd bubbles over with guffawing, and " + monster.name + " laughs cruelly at your frailty as she readies her counterattack.<br>");
	        output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
	        thread = 3.45;
	      } else {
	        output(1, "You strike at " + monster.name + " with your " + userInfo.items.weapon.name + " and inflict " + temp + " damage!<br>");
	        output(2, "The crowd goes wild, and " + monster.name + " glares at you she readies her counterattack.<br>");
	        output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
	        thread = 3.45;
	      }
	    } else {
	      // opp turn
	      clear();
	      var temp = monsterfight(monster);
	      if (temp === "dead") {
	        output(1, "<span id=death>The Dagger Fighter's blades are too sharp, and too fast, and you fall to the ground!</span><br>");
	        output(2, "As your consciousness fades, you hear the surrounding crowd shouting in adoration for your adversary.<br>");
	        output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
	        thread = 86;
	      } else if (temp === "zip") {
	        output(1, "The Dagger Fighter " + monster.strike1 + ", but your armor protects you! You sustain 0 damage!<br>");
	        output(2, "The crowd jeers, and " + monster.name + " grits her teeth as you brush off her pathetic attack.<br>");
	        output(3, "<span id=menu>Press (<span id=letter>M</span>) to invoke magick, or (<span id=letter>Any</span>) other key to counterattack.<br></span>");
	        thread = 3.6;
	      } else {
	        if (shieldflag) {
	          output(1, "The Dagger Fighter " + monster.strike1 + ", inflicting " + temp + " damage! Your Egregious Shield absorbs part of the blow.<br>" +
	            "You hear cheers and boos from the crowd at the clever use of your magick!<br><br>" +
	            "------------------------------------------------<br>");
	        } else {
	          output(1, "The Dagger Fighter " + monster.strike1 + ", inflicting " + temp + " damage!<br><br>" +
	            "The crowd oohs and aahs as they witness the blow.<br>" +
	            "------------------------------------------------<br>");
	        }
	        output(2, "Your hitpoints: " + userInfo.hp + "<br>" +
	          monster.name + "'s hitpoints: " + mhp + "<br>");
	        output(3, "<span id=menu>Press (<span id=letter>M</span>) to invoke magick, or (<span id=letter>Any</span>) other key to counterattack.<br></span>");
	        thread = 3.6;
	      }
	    }
	  } else if (y === 3) {
	    // round three
	    if (x === 1) {
			// first round
			clear();
			output(1, "You steel yourself mentally for the third and final champion of the Battle Royale. Soon, your adversary is escorted into the pit.<br>");
			output(2, "A short, stout figure, its visage completely hidden in a dark cloak, strides slowly into view. The champion's handlers give him - her - it - a wide berth. \"The Magus\" stands motionless at the other side of the pit.<br>");
			output(3, "The Magus shows no sign of movement, giving you an opportunity to strike first!<br>");
			output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			thread = 3.47;
		    monster = beasts.lev3bs[2];
		    mhp = monster.hp;
	  	} else if (x === 2) {
	    // player turn
	    clear();
	    var temp = userfight(monster);
	    if (temp === "k") {
	      output(1, "<span id=victory>You cut down " + monster.name + " with a mighty blow, and he yields!</span><br>");
	      rwins();
	    } else if (temp === "zip") {
	      output(1, "You strike at " + monster.name + " with your " + userInfo.items.weapon.name + ", but your amateurish attack inflicts no damage!<br>");
	      output(2, "The crowd bubbles over with guffawing, but " + monster.name + " betrays no reaction, save returning to its full stature.<br>");
	      output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
	      thread = 3.48;
	    } else {
	      output(1, "You strike at " + monster.name + " with your " + userInfo.items.weapon.name + " and inflict " + temp + " damage!<br>");
	      output(2, "The crowd goes wild, but " + monster.name + " simply moves silently into counterattack position... leaving no footsteps in the dirt.<br>");
	      output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
	      thread = 3.48;
	    }
	  } else {
	    // opp turn
	    clear();
	    var temp = monsterfight(monster);
	    if (temp === "dead") {
	      output(1, "<span id=death>" + monster.name + "'s mysterious dark sorcery is too great, and you collapse!</span><br>");
	      output(2, "As your consciousness fades, you hear the surrounding crowd shouting in adoration for your adversary.<br>");
	      output(3, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
	      thread = 86;
	    } else if (temp === "zip") {
	      output(1, "The Magus " + monster.strike1 + ", but your armor protects you! You sustain 0 damage!<br>");
	      output(2, "The crowd jeers, and " + monster.name + " digs deeper into its long sleeves in frustration.<br>");
	      output(3, "<span id=menu>Press (<span id=letter>M</span>) to invoke magick, or (<span id=letter>Any</span>) other key to counterattack.<br></span>");
	      thread = 3.6;
	    } else {
	      if (shieldflag) {
	        output(1, "The Magus " + monster.strike1 + ", inflicting " + temp + " damage! Your Egregious Shield absorbs part of the blow.<br>" +
	          "You hear cheers and boos from the crowd at the clever use of your magick!<br><br>" +
	          "------------------------------------------------<br>");
	      } else {
	        output(1, "The Magus " + monster.strike1 + ", inflicting " + temp + " damage!<br><br>" +
	          "The crowd oohs and aahs as they witness the blow.<br>" +
	          "------------------------------------------------<br>");
	      }
	      output(2, "Your hitpoints: " + userInfo.hp + "<br>" +
	        monster.name + "'s hitpoints: " + mhp + "<br>");
	      output(3, "<span id=menu>Press (<span id=letter>M</span>) to invoke magick, or (<span id=letter>Any</span>) other key to counterattack.<br></span>");
	      thread = 3.6;
	    }
	  }
	}
}

rwins = function(x){
	if (round===1){
		Meteor.call("acts",x,"events","royale win 1");
		output(2, "Tox's voice booms over the pit. <span id=quote>\"We have a victor!\"</span><br>");
		output(3, "The crowd erupts in cheers as Brezlev is helped out of the pit and you dust yourself off. You have just a moment to rest - the second challenger is already being led to the pit...<br>");
		output(4, "<span id=menu>Press (<span id=enter>S</span>) to check your status, (<span id=letter>K</span>) to review your supplies, (<span id=letter>N</span>) to ask Tox to exit the Battle Royale early, or (<span id=letter>Any</span>) other key to take on the second challenger.</span>");
		round=2;
		thread = 3.5;
	} else if (round===2){
		// victory for round 2
		Meteor.call("acts",x,"events","royale win 2");
		output(2, "Tox's voice booms over the pit. <span id=quote>\"We have a victor!\"</span><br>");
		output(3, "The crowd erupts in cheers as the Dagger Fighter is carried out of the pit and you crack your knuckles. You have just a moment to rest - the third and final challenger is already being led to the pit...<br>");
		output(4, "<span id=menu>Press (<span id=enter>S</span>) to check your status, (<span id=letter>K</span>) to review your supplies, (<span id=letter>N</span>) to ask Tox to exit the Battle Royale early, or (<span id=letter>Any</span>) other key to take on the second challenger.</span>");
		round=3;
		thread = 3.5;
	} else if (round===3){
		// victory 3
		Meteor.call("acts",x,"events","royale win 3");
		Meteor.call("acts",userInfo.username, "level",4);
		output(2, "Tox's voice booms over the pit as the crowd explodes with jubilation. <span id=quote>\"The Battle Royale has a new champion!\"</span><br>");
		output(3, "With the crowd cheering around you, the Magus gradually evaporates into thin air, leaving you alone, victorious, in the arena.<br>");
		output(4, "<span id=gold>You have advanced to Level 4: Journeyman.</span><br>");
		output(5, "Your maximum hitpoints have increased, and new areas of town are now open to you.<br>");
		output(6, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		levelup(4);
		round=0;
		thread=3.7;
	} else if (x===1){
		clear();
		output(1, "After toweling off your face, you climb the steps out of the pit to see Tox, who nods as he sees you approach.<br>");
		output(2, "<span id=quote>\"All right, all right...\" he admits, \"you are truly a worthy warrior, " + userInfo.username + ". Here is your share of tonight's fight purse....</span><br>");
		output(3, "<span id=gold>Tox hands you a pouch with <span id=letter>" + monster.gold + "</span> gold, and you gain <span id=letter>" + monster.xp + "</span> experience!<br>");
		output(4, "<span id=quote>\"You are welcome back to fight anytime, champion. Cutting down your fellow town wanderers can be a great way of gaining experience... and you can even steal some of their gold! Not that I, er, know anything of that...\"</span><br>");
		output(5, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
		thread=2.31;
		monster=undefined;
		userInfo.turnsToday -= turns;
		turns=0;
	}
}

rrouter2 = function(x){
	chooseclear(4);
	if (x==="s"){
		// status
		woodsstatus();
		output(3, "<span id=menu>Press (<span id=enter>S</span>) to check your status, (<span id=letter>K</span>) to review your supplies, (<span id=letter>N</span>) to ask Tox to exit the Battle Royale early, or (<span id=letter>Any</span>) other key to take on the second challenger.</span>");
		thread = 3.5;
	} else if (x==="k"){
		// supplies
		clear();
		var temp = showgear();
		if (temp === 0){
			output(1, "You have no items!<br>");
			output(2, "<span id=menu>Press (<span id=enter>S</span>) to check your status, (<span id=letter>K</span>) to review your supplies, (<span id=letter>N</span>) to ask Tox to exit the Battle Royale early, or (<span id=letter>Any</span>) other key to take on the second challenger.</span>");
			thread = 3.5;
		} else {
			output (1, temp);
			thread = 1.252;
		}
	} else if (x==="n"){
		var temp = Math.random();
		temp += userInfo.attributes.charisma*0.1;
		if (temp>0.25){
			output(3, "Tox rolls his eyes and snorts. <span id=quote>\"Can't handle the heat of REAL competition, eh " + userInfo.username + "? Fine - go! Come back when you're ready to fight!\"</span><br>");
			output(4, "The crowd jeers and tosses rotten vegetables as you scurry out of a side entrance, in disgraced retreat.<br>");
			output(5, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 2.31;
		} else {
			output(3, "Tox regards you, and slowly narrows his countenance with a cruel grin. <span id=quote>\"I don't like your look, " + userInfo.username + ". We won't let you get away that easily today. Bring on the next challenger!</span><br>");
			setTimeout(function(){ rrounds(1,2)}, 1000)
		}
	} else {
		if (round===2){
			rrounds(1,2);
		} else if (round===3){
			rrounds(1,3);
		}
	}
}

rrouter3 = function(x){
	if (round===2){
		if (x==="m"){
			// magick
			woodsfight("m");
			if (thread=1.22){
				output(4, "<span id=menu>Press (<span id=letter>Any</span>) other key to counterattack.<br></span>");
				thread=3.44;
			} else {
				// choose magic
				thread=3.61
			}
		} else {
			rrounds(2,2)
		}
	} else if (round===3){
		if (x==="m"){
			// magick
			woodsfight("m");
			if (thread=1.22){
				output(4, "<span id=menu>Press (<span id=letter>Any</span>) other key to counterattack.<br></span>");
				thread=3.47;
			} else {
				// choose magic
				thread=3.61
			}
		} else {
			rrounds(2,3)
		}
	} else {
		if (x==="m"){
			// magick
			woodsfight("m");
			if (thread=1.22){
				output(4, "<span id=menu>Press (<span id=letter>Any</span>) other key to counterattack.<br></span>");
				thread=3.41;
			} else {
				// choose magic
				thread=3.61
			}
		} else {
			rrounds(2,1)
		}
	}
}

rusegear = function(x){
	if (typeof(parseInt(x))==="number"){
		var temp = Number(x)-1;
		var temp2 = usegear(temp)
		output(2, temp2);
		output(3, "<span id=menu>Press (<span id=enter>S</span>) to check your status, (<span id=letter>K</span>) to review your supplies, (<span id=letter>N</span>) to ask Tox to exit the Battle Royale early, or (<span id=letter>Any</span>) other key to take on the second challenger.</span>");
		thread = 3.5;
	} else {
		output(2, "Come again?");
		output(3, "<span id=menu>Press (<span id=enter>S</span>) to check your status, (<span id=letter>K</span>) to review your supplies, (<span id=letter>N</span>) to ask Tox to exit the Battle Royale early, or (<span id=letter>Any</span>) other key to take on the second challenger.</span>");
		thread = 3.5;
	}
}

rmagic = function(x){
	if (x==="n"){
		rrounds(2,round);
	} else if (typeof(parseInt(x))==="number"){ 
		var temp = Number(x)-1;
		if (userInfo.items.other[temp]===undefined){
			output(4, "Come again?"); setTimeout(function(){ 
				output(4, "<span id=menu>Enter the number of the magick you wish to lance, or <span id=enter>N</span> to use no magick and attack the old fashioned way.<br>");
				thread = 3.61;
				}, 1000)
		} else {
			var temp = lancemagic(x);
			if (thread=1.22){
				// player turn
				output(5, "<span id=menu>Press (<span id=letter>Any</span>) other key to counterattack.<br></span>");
				if (round===1){
					thread=3.41;
				} else if (round===2){
					thread=3.44;
				} else {
					thread=3.47;
				}
			} else if (thread=1.24){
				// opp turn
				if (round===1){
					thread=3.42;
				} else if (round===2){
					thread=3.45;
				} else {
					thread=3.48;
				}
			} else if (temp==="k"){
				// kill opp
				output(4, "<span id=victory>Your sorcery vanquishes " + monster.name + ", forcing them to their knees!</span><br><br>");
				setTimeout(function(){ clear(); rwins() },1000);
			} else {
				// no magic
				output(4, "<span id=menu>Press (<span id=letter>Any</span>) other key to counterattack.<br></span>");
				if (round===1){
					thread=3.41;
				} else if (round===2){
					thread=3.44;
				} else {
					thread=3.47;
				}
			}
		}
	} else {
		output(5, "Come again?"); setTimeout(function(){ 
			output(5, "<span id=menu>Enter the number of the magick you wish to lance, or <span id=enter>N</span> to use no magick and attack the old fashioned way.<br>");
			thread = 3.61;
			}, 1000)
	}

}