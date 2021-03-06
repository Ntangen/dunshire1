
Meteor.methods({
	finduser: function(x){
		if (Meteor.isServer){
			if (Accounts.findUserByUsername(x)){
				console.log("Server found: " + Accounts.findUserByUsername(x).username);
				return true;
			} else {
				return false;
			}	
		}
	},
	playerSetup: function(user){
		if (Meteor.isServer){
			console.log("playerSetup checkin");
			var temp = shadowprofile;
			temp.profileStarted = monthday;
			Meteor.users.update({username: user},{$set: {shadow: temp}});
			Meteor.users.update({username: user},{$set: {"bank.deposit": 0}});
			console.log("NEW USER: " + Meteor.user().username);
			logging(user);
		}
	},
	listusers: function(){
		// returns all except user
		if (Meteor.isServer){
			var templist = "";
	 		function listbuild (x,y,z) {
		 		if (x.username!=Meteor.user().username){
		 			templist += "<li>" + x.username + "<br>";
		 		}
		 	}
			Meteor.users.find().fetch().forEach(listbuild);
			return templist;
		}
	},
	bankUpdate: function(user,action,amt){
		if (Meteor.isServer){
			if (action==="dep"){
				var result = Meteor.users.update({username: user}, {$inc: {"bank.deposit": amt}});
				// var result = Bank.update({username: user}, {$inc: {deposit: amt}});
				console.log(user + " deposited " + amt);
				console.log("deposit update result: " + result);
				return result;
			} else if (action==="with"){
				var result = Meteor.users.update({username: user}, {$inc: {"bank.deposit": -amt}});
				// var result = Bank.update({username: user}, {$inc: {deposit: -amt}});
				console.log(user + " withdrew " + amt);
				return result;
			} 
		}
	},
	playerUpdate: function(user, x){
		if (Meteor.isServer){
			var result = Meteor.users.update({username: user}, {$set: {profile: x}});
			return result;
		}
	},
	grabRecord: function(user){
		if (Meteor.isServer){
			var result = Meteor.users.find({username: user}).fetch()[0].profile;
			console.log("server grabbed user record: " + user);
			// if (Meteor.users.find({username:user}).fetch()[0].shadow.duel.new.length===0){
			// 	flag2="duel";  // what does this do
			// }
			return result;
		}
	},
	shadowReboot: function(user){
		if (Meteor.isServer){
			console.log("Monthday test: " + monthday + "(shadowreboot");
			var result = Meteor.users.find({username: user}).fetch()[0].shadow;
			result.loginsWeb++;
			var result2 = Meteor.users.update({username: user}, {$set: {shadow: result}});
			console.log("shadowreboot success");
		}
	},

	checkUser: function(user,job,input){
		if (Meteor.isServer){
			var stub = Meteor.users.find({username: user}).fetch()[0].shadow
			if (job==="start"){
				var result={duel:false,duelghost:[],drink:false}
				if (stub.duelflag===true){
					console.log(user + " was in a duel");
					result.duel=true;
					for (i=0;i<stub.duel.new.length;i++){
						// if user has been in more than one duel, this pushes their challengers' names & W/L in array
						result.duelghost.push(stub.duel.new[i]);
					}
				}
				if (stub.tavernflag===true){
					result.drink=true;
				}
				logging(user);
				return result;
			} else if (job==="getdrink"){
				var temp="";
				for(i=0;i<stub.drinks.recd.length;i++){
					temp += stub.drinks.recd[i].type.name + " from " + stub.drinks.recd[i].sender + "<br>";
				}
				if (stub.drinks.recd.length>1){
					var out = "You have " + stub.drinks.recd.length + " drinks awaiting you:<br>" + temp;
				} else {
					var out = "You have a drink awaiting you:<br>" + "<ul>" + temp + "</ul>";
				}
				return out;
			} else if (job==="grabdrink"){
				var temp = {drink:undefined,position:undefined};
				var res;
				function findsender(element,index,array){
					if (element.sender.toLowerCase()===input){
						res=index;
					}
				}
				stub.drinks.recd.forEach(findsender);
				if (typeof(res)==="number"){
					temp.position=res;
					temp.drink=stub.drinks.recd[res];
					return temp;
				}
				else return false;
			} else if (job==="movedrink"){
				var recd = Meteor.users.find({username:user}).fetch()[0].shadow.drinks.recd[input];
				Meteor.users.update({username:user},{$push:{"shadow.drinks.sent":recd}});
				var mover = Meteor.users.find({username:user}).fetch()[0].shadow.drinks.recd
				var spliced = mover.splice(input,1);
				Meteor.users.update({username:user},{$set:{"shadow.drinks.recd":mover}});
				if (Meteor.users.find({username:user}).fetch()[0].shadow.drinks.recd.length===0){
					Meteor.users.update({username:user},{$set:{"shadow.tavernflag":false}});
				return false;
				} else return true;
			} else if (job==="senddrink"){
				var recipient = input.to;
				var topush = {sender:user, type: input.type, msg: input.msg}
				Meteor.users.update({username:recipient},{$push:{"shadow.drinks.recd":topush}});
				Meteor.users.update({username:recipient},{$set:{"shadow.tavernflag":true}});
				Meteor.users.update({username:user},{$push:{"shadow.drinks.sent":topush}});
				console.log(user + " sent a drink to " + recipient);
				// Shadow.update({username:recipient},{$push:{"profile.drinks.recd":topush}});
				// Shadow.update({username:recipient},{$set:{"profile.tavernflag":true}});
				// Shadow.update({username:user},{$push:{"profile.drinks.sent":topush}});
				// returns the # of affected docs, so maybe try consoling that out
			} else if (job==="checkdupdrink"){
				var recipient=input;
				var temp;
				function checkdups(x,y,z){
					if(x.sender===user){
						temp=true;
					}
				}
				Meteor.users.find({username:recipient}).fetch()[0].shadow.drinks.recd.forEach(checkdups)
				// Shadow.find({username:recipient}).fetch()[0].profile.drinks.recd.forEach(checkdups)
				if (temp) return true;
					// true means recipient already has a drink from the sender
				else return false;
					// go for it!
			}

		}
	},
	userduel: function(player,target,type){
		if (Meteor.isServer) {
			if (type==="notify"){
				Meteor.users.update({username:player},{$set:{"shadow.duelflag":false}});
				// Shadow.update({username:player},{$set:{"profile.duelflag":false}});
				var temp = Meteor.users.find({username:player}).fetch()[0].shadow.duel.new;
				for (i=0;i<temp.length;i++){
					Meteor.users.update({username:player},{$push:{"shadow.duel.old":temp[i]}});
					// Shadow.update({username:player},{$push:{"profile.duel.old":temp[i]}});
				}
				Meteor.users.update({username:player},{$set:{"shadow.duel.new":[]}});
				// Shadow.update({username:player},{$set:{"profile.duel.new":[]}});
			} else {
				var name = target.username;
				var pname = player.username;
				duelmodel.opp = pname;
				if (type==="win"){
					// player won, target lost, so push a duelmodel to target's acct with a big fat L
					var temp = Math.round(target.gold*0.5);
					duelmodel.result = "l";
					Meteor.users.update({username: name}, {$set: {"profile.gold": temp}});
					console.log("DUEL: " + pname + " challenged " + name + " and won");
				} else if (type==="lose"){
					var temp = Math.round(player.gold*0.5);
					temp += target.gold;
					duelmodel.result = "w";
					Meteor.users.update({username: name}, {$set: {"profile.gold": temp}});
					console.log("DUEL: " + pname + " challenged " + name + " and lost");
				}
				Meteor.users.update({username:name},{$set:{"shadow.duelflag":true}});
				Meteor.users.update({username:name},{$push:{"shadow.duel.new":duelmodel}});
				// Shadow.update({username:name},{$set:{"profile.duelflag":true}});
				// Shadow.update({username:name},{$push:{"profile.duel.new":duelmodel}});
			}
		}
	},
	loggingout: function(user){
		var temp = new Date();
		var month = temp.getMonth() + 1;
		var day = temp.getDate();
		var date = month + "-" + day;
		date = date.toString();
		var esthrs = temp.getUTCHours() - 5;
		var estmins = temp.getMinutes();
		var time = esthrs + ":" + estmins;
		var log = {username: user, logout_time:time}
		var temp2 = Log.update({date:date},{$push: {"activity":log}});
		console.log(user + " logged out at " + date + " " + time);
	},
	acts: function(user,event,z){
		if (Meteor.isServer){
			if (event==="startcheck"){
				Meteor.users.update({username:user},{$set: {"shadow.lastlogin":monthday}});
				Meteor.users.update({username:user},{$inc:{"shadow.logins":1}});
			} else if (event==="level"){
				console.log(user + " advanced to level " + z);
				var newstuff = Activity.find({date:monthday}).fetch()[0].activity;
				if (z===2){
					newstuff += "<li> <span id=menu>" + Meteor.user().username + "</span> has advanced to the level of " + levels.apprentice.name + "!";
				} else if (z===3){
					newstuff += "<li> <span id=menu>" + Meteor.user().username + "</span> has advanced to the level of " + levels.challenger.name + "!";
				} else if (z===4){
					newstuff += "<li> <span id=menu>" + Meteor.user().username + "</span> has advanced to the level of " + levels.journeyman.name + "!";
				}
				var temp2 = Activity.update({date:monthday},{$set:{activity:newstuff}});
				console.log("activity updated: " + temp2);
			} else if (event==="duel"){
				// user is opponent; z is outcome
				var newstuff = Activity.find({date:monthday}).fetch()[0].activity;
				console.log("newstuff: " + newstuff);
				if (z==="w"){
					newstuff += "<li> <span id=menu>" + Meteor.user().username + "</span> <span id=death>brutally struck down <span id=menu>" + user + "</span> in the camps last night!</span>";
				} else if (z==="l") {
					newstuff += "<li> <span id=menu>" + Meteor.user().username + "</span> <span id=death>attacked <span id=menu>" + user + "</span> in the camps night, but was humiliated in defeat!</span>";
				}
				var temp2 = Activity.update({date:monthday},{$set:{activity:newstuff}});
				console.log("activity updated: " + temp2);
			} else if (event==="events"){
				// user is opponent; z is ??
				console.log(Meteor.user().username + " at the " + z);
			} else if (event==="pubevents"){
				var newstuff = Activity.find({date:monthday}).fetch()[0].activity;
				if (z==="woodsdeath"){
					newstuff += "<li> <span id=menu>" + user + "</span> was cut down while bravely fighting beasts in the Dark Woods!";
				}
				// need to add activity update for someone being dueled
				Activity.update({date:monthday},{$set:{activity:newstuff}});
			}
		}
	},
	activitylog: function(yest,today){
		if (Meteor.isServer){
			var placeholder = "<ul><li> That idiot Barzek tripped over his own feet and slept in the horse trough!" +
						"<li>Strange winds come out of the north, and the countryside is uneasy.";
			var temp = Activity.find({date:today}).fetch()[0];
			if (temp===undefined){
				if (Activity.find({date:yest}).fetch()[0]===undefined){
					var temp2 = Activity.upsert({date:yest},{$set:{activity: placeholder}});
				}
				var lastresults = Activity.find({date:yest}).fetch()[0].activity;
				Activity.update({date:today},{$set:{activity: placeholder}});
				console.log("returning yesterday's activity, set up today's");
				var result = {today:lastresults}
				return result
			} else {
				var temp2 = Activity.find({date:today}).fetch()[0].activity;
				console.log("today's activity: " + temp2);
				var result = {today:temp2}
				return result;
			}
		}
	}
});

logging = function(user){
	// daily activity logging
	var newDate = new Date();
	var month = newDate.getMonth() + 1;
	var day = newDate.getDate();
	var monthday = month + "-" + day;
	var esthrs = newDate.getUTCHours() - 5;
	var estmins = newDate.getMinutes();
	var time = esthrs + ":" + estmins;
	var temp2 = Log.find({date:monthday}).fetch()[0];
	if (temp2===undefined){
		Log.upsert({date:monthday},{$set: {"activity": []}})
	}
	var login = {username: user, time:time}
	var temp3 = Log.update({date:monthday},{$push: {"activity": login }});
	console.log(user + " logged in at " + monthday + " " + time);
}

shadowprofile = {
	drinkflag: true,
	duelflag: false,
	granflag: true,
	drinks:{
		recd:[
			{sender: "Dean",
			type: drinks[1],
			msg: "Greetings, friend. Welcome to Dunshire! You've no doubt seen the other players around the bar. Feel free to say hi, brag, or even cut them down in battle as you like."
			}
		],
		sent: []
	},
	duel:{
		new:[],
		old:[]	
	},
	loginsWeb:0,
	loginsSlack:0,
	profileStarted:"",
    platformStarted:"web"
}

duelmodel = {
	opp:"",
	result:undefined
}

// activity = {activity: [] }

Meteor.users.deny({update: function () { return true; }});

