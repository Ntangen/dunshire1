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
	listusers: function(x){
		if (Meteor.isServer){
			var templist = "";
			function listbuild (x,y,z) {
				templist += "<li>" + x.username + "<br>";
			}
			Accounts.users.find().fetch().forEach(listbuild);
			return templist;
		}
	},
	listusers2: function(x){
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
				var result = Bank.upsert({username: user}, {$inc: {deposit: amt}});
				console.log(user + " deposited " + amt);
				return result;
			} else if (action==="with"){
				var result = Bank.upsert({username: user}, {$inc: {deposit: -amt}});
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
	playerSetup: function(user){
		if (Meteor.isServer){
			var result = Meteor.users.upsert({username: user}, {$set: {profile: undefined}});
			var result2 = Shadow.upsert({username: user},{$set: {profile: shadowprofile}});
			var result3 = Bank.upsert({username: user},{$set: {deposit: 0}});
			console.log("user created: " + Meteor.user().username);
			return result;
		}
	},
	grabRecord: function(user){
		var result = Meteor.users.find({username: user}).fetch()[0].profile;
		console.log("server grabbed user record: " + user);
		return result;
	},
	checkUser: function(user,job,input){
		if (Meteor.isServer){
			var stub = Shadow.find({username: user}).fetch()[0].profile
			if (job==="start"){
				if (stub.tavernflag===true){
					return true
				}
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
				var recd = Shadow.find({username:user}).fetch()[0].profile.drinks.recd[input];
				Shadow.update({username:user},{$push:{"profile.drinks.sent":recd}});
				var mover = Shadow.find({username:user}).fetch()[0].profile.drinks.recd
				var spliced = mover.splice(input,1);
				Shadow.update({username:user},{$set:{"profile.drinks.recd":mover}});
				if (Shadow.find({username:user}).fetch()[0].profile.drinks.recd.length===0){
					Shadow.update({username:user},{$set:{"profile.tavernflag":false}});
					return false;
				} else return true;
			} else if (job==="senddrink"){
				var recipient = input.to;
				var topush = {sender:user, type: input.type, msg: input.msg}
				Shadow.update({username:recipient},{$push:{"profile.drinks.recd":topush}});
				Shadow.update({username:recipient},{$set:{"profile.tavernflag":true}});
				Shadow.update({username:user},{$push:{"profile.drinks.sent":topush}});
				// returns the # of affected docs, so maybe try consoling that out
			} else if (job==="checkdupdrink"){
				var recipient=input;
				var temp;
				function checkdups(x,y,z){
					if(x.sender===user){
						temp=true;
					}
				}
				Shadow.find({username:recipient}).fetch()[0].profile.drinks.recd.forEach(checkdups)
				if (temp) return true;
					// true means recipient already has a drink from the sender
				else return false;
					// go for it!
			}

		}
	}
});

shadowprofile = {
	tavernflag: true,
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
	luck:0
}

Meteor.users.deny({update: function () { return true; }});