bank = function(x){
	clear();
	Meteor.call("acts",x,"goings","bank");
	signpost("BANK OF DOWORTH<br>------------------------------------------------");
	output(1, "Inside the Bank's heavy iron doors, a hushed silence prevails. Chairs scrape on the stone floor.<br>");
		if (x === "a") { output(2, "The bespecled manager looks up disdainfully as you walk in. He sighs.<br>" +
		"<span id=quote>Can I... help you, sir?</span><br><br>");	
		}
	output(3, "<span id=menu>Press (<span id=letter>D</span>) to deposit your gold with the Bank, (<span id=letter>W</span>) to make a withdrawal, (<span id=letter>I</span>) to ask for Information on the Bank, (<span id=letter>F</span>)ind your account balance, or (<span id=letter>L</span>) to leave.</span>");
	thread = 4;	
}

bankrouter = function(x){
	clear();
	if (x==="d"){
		output(1, "The teller sniffs.<br>");
		output(2, "<span id=quote>\"Very well. How much will you be depositing today?\"</span><br><br>");
		output(3, "<span id=menu>(Input the amount of gold you wish to deposit and hit (<span id=letter>Enter</span>).</span>");
		thread = 4.1
	} else if (x==="w"){
		output(1, "The teller sniffs.<br>");
		output(2, "<span id=quote>\"Very well. How much will you be withdrawing today?\"</span><br><br>");
		output(3, "<span id=menu>(Input the amount of gold you wish to withdraw and hit (<span id=letter>Enter</span>).</span>");
		thread = 4.3
	} else if (x==="i"){
		output(1, "<span id=quote>\"We here at the Bank of Doworth keep your gold secure. Should you perish in battle, or out in the Dark Woods, the gold on your person could be lost, or even... looted.\"</span> The teller wrinkles his nose at the thought.<br>");
		output(2, "<span id=quote>\"Your funds here at the Bank, however, are kept safe, and you can withdraw them yourself at any time.</span>\"<br>");
		output(3, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
		thread = 4.2;
	} else if (x==="f"){
		var user = Meteor.user().username;
		var result = Bank.findOne({username:user});
		if (result === undefined){
			output(1, "<span id=quote>I'm sorry - you don't have an account here yet. If you'd like to open one, please make a deposit.</span><br>");
			output(2, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			thread = 4.2;
		} else {
			output(1, "Your bank balance is currently " + result.deposit + " gold.<br>");
			output(2, "<span id=menu>Press <span id=enter>Any</span> key to continue.</span>");
			thread = 4.2;
		}
	} else if (x==="l") { output(2, "Your business concluded, you nod curtly to the Bank staff and make your way to the door."); setTimeout(function(){ townsquare() }, 1000) 
	} else { output(2, "Come again?"); 
		setTimeout(function(){ bank() }, 1000) 
	}
}

bdeposit = function(x){
	if(!/\D/.test(x) && x>=1) {
		if (x>userInfo.gold){
			output(3, "The clerk rolls his eyes. <span id=quote>\"Ahem - you do not appear to have enough gold for a deposit of that size.\"</span>");
			output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			thread=4.2;
		} else {
			var y = Math.floor(x);
			var user = Meteor.user().username;
			var result = Meteor.call('bankUpdate',user,"dep",y, function(error, result){
				if (error){console.log("err: " + error)}
				else console.log("res: " + result.numberAffected);
				userInfo.gold -= y;
				statusupdate();
				var record = Bank.find({username: Meteor.user().username});
				var acct = record.fetch()[0].deposit;
				output(3, "You have deposited " + y + " gold in your account.<br><br>" +
					"You currently have " + acct + " gold in your account.<br>");
				output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
				thread = 4.2;
				});
			}
	} else {
		output(3, "The teller narrows his eyes. <span id=quote>\"Come again?\"</span>");
		output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
		thread = 4.2;
	}
}

bwithdraw = function(x){
	var user = Meteor.user().username;
	var record = Bank.find({username: user});
	if (!record.fetch()[0]){
		output(3, "The teller rolls his eyes. <span id=quote>\"It appears you do not have an account here to withdraw from.\"</span>");
		output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
		thread = 4.2;
		return;
	} else {
		var deposit = record.fetch()[0].deposit;
		if(!/\D/.test(x) && x>=1) {
			if (x>deposit){
				output(3, "The clerk rolls his eyes. <span id=quote>\"I'm afraid you appear to have insufficient funds available.\"</span><br>" +
					"You currently have " + deposit + " gold in your bank account.<br>");
				output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
				thread=4.2;
			} else {
				var y = Math.floor(x);
				var result = Meteor.call('bankUpdate',user,"with",y, function(error, result){
					if (error){return console.log("err: " + error)}
					else userInfo.gold += y;
					statusupdate();
					output(3, "Very well - you have withdrawn " + y + " gold from your account.<br>" +
						"You currently have " + (deposit-y) + " gold in your account.<br>");
					output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
					thread = 4.2;
					});
			}
		} else {
			output(3, "The teller narrows his eyes. <span id=quote>\"Come again?\"</span>");
			output(4, "<span id=menu>Press (<span id=letter>Any</span>) key to continue.</span>");
			thread = 4.2;
		}
	}
}

