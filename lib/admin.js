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
			// else if (action==="balance"){
			// 	var result = Bank.find({username: user});
			// 	console.log("user balance: ");
			// 	console.log(result.deposit);
			// 	return result
			// }
			}
		},
	playerUpdate: function(user, x){
		if (Meteor.isServer){
			var result = Meteor.users.update({username: user}, {$set: {profile: {pubProfile:x}}});
			return result;
		}
	},
	playerSetup: function(user){
		if (Meteor.isServer){
			var result = Meteor.users.upsert({username: user},{$set: {profile: {serverProfile:{secretNum:0123, secretString:"stringz"}}}});
			console.log("serverProfile insertion: " + result);
			return result;	
		}
	},
	grabRecord: function(user){
		var result = Meteor.users.find({username: user}).fetch()[0].profile.pubProfile;
		console.log("server grabbed user record: " + user);
		return result;
	}
});

Meteor.users.deny({update: function () { return true; }});