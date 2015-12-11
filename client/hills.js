
// OUTPUT FUNCTIONS

signpost = function(x){
	document.getElementById('signpost').innerHTML = x;	
}

output = function(num, x){
	num = num.toString();
	document.getElementById(num).innerHTML = x;
}

clear = function(x){
	document.getElementById('1').innerHTML = "";
	document.getElementById('2').innerHTML = "";
	document.getElementById('3').innerHTML = "";
	document.getElementById('4').innerHTML = "";
	document.getElementById('5').innerHTML = "";
	document.getElementById('6').innerHTML = "";
	document.getElementById('7').innerHTML = "";
}

chooseclear = function(num){
	num = num.toString();
	document.getElementById(num).innerHTML = "";
}

statusupdate = function(x){
	if (thread <0.4){return}
	if (userInfo.turnsToday < 0){userInfo.turnsToday = 0}
	if (x==="dead"){
		document.getElementById('status').innerHTML = "Player: 💀";
		document.getElementById('status2').innerHTML = "HP: 💀" + " <><> " + "Gold: 0";
	} else if (x==="reset"){
		document.getElementById('status').innerHTML = "Player:";
		document.getElementById('status2').innerHTML = "";
	} else {
		Meteor.call('playerUpdate', userInfo.username, userInfo, function(error,result){});
		document.getElementById('status').innerHTML = "Player: " + userInfo.username;
		if (flag==="fester"){
			fester();
			document.getElementById('status2').innerHTML = "HP: " + userInfo.hp + " <span id=defeat>Festering wounds!</span> <><> " + "Gold: " + userInfo.gold;
		} else {
		document.getElementById('status2').innerHTML = "HP: " + userInfo.hp + " <><> " + "Gold: " + userInfo.gold;
		}
	}
}

// ROUTER FUNCTION

Template.hills.onRendered(function(){
	this.$('form').focus();

$('form').submit(function(e){
		e.preventDefault();
		var userinput = $('input').val().toLowerCase();
		$('input[type=text]').val("");
		console.log("input: " + userinput);
		console.log("thread: " + thread);
		statusupdate();
		if (userinput==="return"){
			console.log("return to start");
			townsquare();
			}
		else { switch(thread){
			case 0:
				hello(userinput);
				break;
			case 0.1:
				enterpath();
				break;
			case 0.2:
				login(userinput);
				break;
			case 0.21:
				login1(userinput);
				break;
			case 0.215:
				if (userinput==="n") enterpath()
				else login1(userinput);
				break;
			case 0.22:
				newaccount(userinput,1);
				break;
			case 0.23:
				newaccount(userinput, 2);
				break;
			case 0.3:
				greeting(userinput);
				break;
			case 0.4:
				departure(userinput);
				break;				
			case 0.5:
				townsquare(userinput);
				break;
			case 0.6:
				townrouter(userinput);
				break;
			case 0.7:
				tavernrouter(userinput);
				break;				
			case 0.71:
				tavern();
				break;
			case 0.711:
				if (userinput === "q") tavern();
				else drinkrouter(userinput);
				break;
			case 0.72:
				if (userinput === "q") tavern();
				else barlines();
				break;
			case 0.73:
				drinknote(userinput,2);
				break;				
			case 0.74:
				senddrink(userinput,0,1);
				break;
			case 0.742:
				senddrink(userinput,0,2);
				break;
			case 0.743:
				senddrink(userinput,0,3);
				break;
			case 0.744:
				senddrink(userinput,0,4);
				break;
			case 0.75:
				minstrel(userinput);
				break;
			case 0.8:
				smithrouter(userinput);
				break;
			case 0.81:
				if (userinput === "b") smithy("a");
				else smithconfirm(userinput, "weap");
				break;
			case 0.811:
				purch(userinput, "weap");
				break;
			case 0.812:
				purch(userinput, "arm");
				break;				
			case 0.82:
				if (userinput === "b") smithy("a");
				else smithconfirm(userinput, "arm");
				break;
			case 0.83:
				smithy("a");
				break;
			case 0.9:
				alchemyrouter(userinput);
				break;
			case 0.905:
				alchemist("a");
				break;
			case 0.91:
				alchconfirm(userinput, "heals");
				break;
			case 0.911:
				alchpurch(userinput, "heals");
				break;
			case 0.912:
				alchpurch(userinput, "meds");
				break;
			case 0.92:
				alchconfirm(userinput, "meds");
				break;
			case 1:
				woodsrouter(userinput);
				break;
			case 1.1:
				if (userinput === 'r') woodsrun();
				else woodsfight(userinput);
				break;
			case 1.2:
				reward();
				break;
			case 1.22:
				if (userinput === 'r') woodsrun();
				else woodsfight(userinput);
				break;
			case 1.23:
				woodsstart();
				break;
			case 1.24:
				woodsfight(0,"m");
				break;
			case 1.25:
				if (x==="") woodsstart();
				else usegear(userinput);
				break;
			case 1.251:
				townusegear(userinput);
				break;
			case 1.252:
				rusegear(userinput);
				break;
			case 1.26:
				magickturn(userinput);
				break;
			case 1.27:
				woodsfight("m");
				break;
			case 1.9:
				townsquare();
				break;				
			// case 2:
			// 	baileyrouter(userinput);
			// 	break;
			// case 2.1:
			// 	bstrength(userinput);
			// 	break;
			// case 2.11:
			// 	bstrength1(userinput);
			// 	break;
			// case 2.12:
			// 	bstrength2(userinput);
			// 	break;
			// case 2.2:
			// 	bspeed(userinput);
			// 	break;
			// case 2.21:
			// 	bspeed1(userinput);
			// 	break;
			// case 2.22:
			// 	bspeed2(userinput);
			// 	break;
			case 2.3:
				royale("a");
				break;
			case 2.31:
				royale();
				break;
			case 3:
				rrouter(userinput);
				break;
			case 3.1:
				rchallenge(userinput);
				break;
			case 3.2:
				rrouter("f");
				break;
			case 3.3:
				if(userinput==="n") royale();
				else rrounds(1,1);
				break;
			case 3.41:
				rrounds(2,1);
				break;
			case 3.42:
				rrounds(3,1);
				break;
			case 3.43:
				rrounds(1,2);
				break;
			case 3.44:
				rrounds(2,2);
				break;
			case 3.45:
				rrounds(3,2);
				break;
			case 3.46:
				rrounds(1,3);
				break;
			case 3.47:
				rrounds(2,3);
				break;
			case 3.48:
				rrounds(3,3);
				break;				
			case 3.5:
				rrouter2(userinput);
				break;
			case 3.6:
				rrouter3(userinput);
				break;
			case 3.61:
				rmagic(userinput);
				break;
			case 3.7:
				rwins(1);
				break;
			case 4:
				bankrouter(userinput);
				break;
			case 4.1:
				bdeposit(userinput);
				break;
			case 4.2:
				bank();
				break;
			case 4.3:
				bwithdraw(userinput);
				break;
			case 5:
				abbeyrouter(userinput);
				break;
			case 5.01:
				townsquare();
				break;
			case 5.1:
				abbey1(userinput);
				break;		
			case 5.2:
				if (userinput === 'r') awoodsrun();
				else awoodsfight("a");
				break;
			case 5.24:
				awoodsfight("m");
				break;				
			case 5.3:
				areward();
				break;
			case 5.4:
				abbey();
				break;
			case 5.5:
				afaith(1);
				break;
			case 5.51:
				afaith(2);
				break;
			case 5.6:
				abbeyup();
				break;
			case 5.61:
				abbeyup(2,userinput);
				break;
			case 6:
				farmrouter(userinput);
				break;
			case 6.1:
				frouter1(userinput);
				break;
			case 6.12:
				frouter1(userinput, 2);
				break;
			case 6.13:
				frouter1(userinput, 3);
				break;
			case 6.14:
				frouter1(userinput, 4);
				break;
			case 6.2:
				frouter2(userinput);
				break;
			case 6.24:
				gfight("m");
				break;
			case 6.25:
				if (userinput === 'r') gwoodsrun();
				else gfight(userinput);
				break;
			case 6.26:
				gfight(0,"m");
				break;
			case 6.3:
				farm2(userinput);
				break;
			case 6.4:
				farmlevel(2, userinput);
				break;
			case 6.6:
				farm();
				break;				
			case 7:
				magerouter(userinput);
				break;
			case 7.1:
				mageconfirm(userinput);
				break;
			case 7.2:
				mpurch(userinput);
				break;
			case 7.7:
				mage();
				break;
			case 86:
				death();
				break;			
			case 86.1:
				fester(1);
				break;
			case 99:
				finale();
				break;
			default:
				output("I don't understand.");
				if (thread >= 0.6){ 
					setTimeout(function(){ townsquare() }, 1000);
			}	}
		}
	});
});

// user variables

thread = 0;
userInfo = undefined;
missioncomplete = undefined;
flag = undefined;
flag2 = undefined;
turncounter = undefined;
shieldflag=false;
swordflag=false;
batpoints=undefined;

newUserStats = {
	username: "",
	level: levels.naif,
	hp: 25,
	gold: 25,
	xp: 0,
	items: { 
		weapon: weapons.start.hands,
		armor: armor.start.shirt,
		magic: [],
		other: []
	},
	turnsToday: 20,
	lastPlayed: 0,
	attributes: {
		luck: 0,
		strength: 0,
		charisma: 0,
		myst: 0
	},
	mission: undefined
}

// user FUNCTIONS

CheckTurnsToday = function () {
	var today = new Date();
	var day = today.getDate();
	if (userInfo.lastPlayed === day && userInfo.turnsToday <= 0) {
		clear();
		output(1, "You are fatigued! You must keep inside town until tomorrow.<br><br>");
		thread = 1.9;
		return true;
	}
	userInfo.lastPlayed = day;
}

levelup = function(x){
	if (x===2){
		userInfo.level = levels.apprentice;
		userInfo.hp = levels.apprentice.maxhp;
		userInfo.mission = "";
		missioncomplete = undefined;
	} else if (x===3){
		userInfo.level = levels.challenger;
		userInfo.hp = levels.challenger.maxhp
	} else if (x===4){
		userInfo.level = levels.journeyman;
		userInfo.hp = levels.journeyman.maxhp
	} else if (x===5){
		userInfo.level = levels.ranger;
		userInfo.hp = levels.ranger.maxhp
	}
}

fortune = function(x){
	if (x==="luck"){
		var temp = Math.random();
		if (userInfo.attributes.luck!=0){
			temp += userInfo.attributes.luck * 0.1;
		}
		console.log("luck var: " + temp);
		if (temp>=0.5){
			return true
		} else return false;
	} else {
		// for adding variables in battle
	}
}
