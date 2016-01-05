// Inventory = new Mongo.Collection('inventory');

Bank = new Mongo.Collection('bank');

// Beasts = new Mongo.Collection('beasts');

// Shadow = new Mongo.Collection('shadow');

Log = new Mongo.Collection('log');

Activity = new Mongo.Collection('activity');

if (Meteor.isServer){
	Meteor.publish("bank", function(user){
		// var temp = this.userId;
		return Meteor.users.find({username: user},{fields:{bank:1}});
	});
}

// if (Meteor.isClient){
// 	Meteor.subscribe("bank",Meteor.user().username);
// }
