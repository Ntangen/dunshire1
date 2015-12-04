Inventory = new Mongo.Collection('inventory');

Bank = new Mongo.Collection('bank');

Beasts = new Mongo.Collection('beasts');

Shadow = new Mongo.Collection('shadow');

if (Meteor.isServer){
	Meteor.publish("bank", function(){
		return Bank.find();
	});
}

if (Meteor.isClient){
	Meteor.subscribe('bank');
}
