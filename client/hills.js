
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

// ROUTER FUNCTION

Template.hills.onRendered(function(){
	this.$('form').focus();

$('form').submit(function(e){
		e.preventDefault();
		var userinput = $('input').val().toLowerCase();
		$('input[type=text]').val("");
		console.log(userinput);
		console.log(thread);
		// console.log(weapons.(UserInfo.item.weapon.name).attack);
		// skip function
		if (userinput === "skip") { townsquare() }
		else if (userinput==="return"){
			console.log("return to start");
			enter();
			}
		else { switch(thread){
			case 0:
				hello(userinput);
				break;
			case 0.1:
				enterpath();
				break;
			case 0.2:
				userInfo.username = userinput;
				greeting(userinput);
				break;
			case 0.3:
				greeting2(userinput);
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
				if (userinput === "q") tavern();
				else barlines();
				break;
			case 0.72:
				if (userinput === "q") tavern();
				else barlines();
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
			case 1:
				if (userinput === 't') townsquare();
				else if (userinput === "heal") {
					userInfo.hp = 25;
					woodsstart();
					}
				else if (userinput === "s") woodsstatus();
				else woodsencounter();
				break;
			case 1.1:
				if (userinput === 'r') woodsrun();
				else woodsfight("a");
				break;
			case 1.2:
				reward();
				break;
			case 1.21:
				if (userinput === 'r') woodsrun();
				else woodsfight("x");
				break;
			case 1.22:
				if (userinput === 'r') woodsrun();
				else woodsfight("a");
				break;
			case 1.23:
				woodsstart();
				break;
			case 1.24:
				woodsfight("m");
				break;
			case 1.9:
				townsquare();
				break;				
			case 86:
				death();
				break;			
			case 99:
				giles();
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

userInfo = {
	username: "",
	login: "",
	level: 0,
	hp: 10,
	gold: 25,
	xp: 0,
	items: { 
		weapon: weapons.start.hands,
		armor: armor.start.shirt
	},
	turnsToday: 0,
	lastPlayed: 24
}

// user FUNCTIONS

CheckTurnsToday = function () {
	var today = new Date();
	var day = today.getDate();
	if (userInfo.lastPlayed === day && userInfo.turnsToday >= 20) {
		clear();
		output(1, "You are fatigued from too much fighting! You must keep inside town until tomorrow.<br><br>");
		thread = 1.9;
		return true;
	}
	userInfo.lastPlayed = day;
}