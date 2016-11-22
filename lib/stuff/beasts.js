
chooseBeastLevel = function(){
	var level = userInfo.level.level;
	if (level === 1) return beasts.lev1[Math.round(Math.random()*10)];
	else if (level === 2) return beasts.lev2[Math.round(Math.random()*10)];
	else if (level === 3) return beasts.lev3[Math.round(Math.random()*10)];
	else if (level === 4) return beasts.lev4[Math.round(Math.random()*11)];
}

beasts = {
	lev1: [
	{	name: "Screeching Squirrel",
		hp: 5,
		attack: 3,
		defense: 1,
		strike1: "jumps at you with a bloodcurdling scream and scratches your arms",
		xp: 10,
		gold: 8
		},
	{	name: "Possessed Bunny",
		hp: 6,
		attack: 3,
		defense: 1,
		strike1: "leaps at your face and bites your nose",
		xp: 12,
		gold: 9
		},
	{	name: "Bloody Groundhog",
		hp: 7,
		attack: 3,
		defense: 1,
		strike1: "grabs your ankles and bites",
		xp: 13,
		gold: 10
		},		
	{ 	name: "Wizened Grumpus",
		hp: 8,
		attack: 3,
		defense: 1,
		strike1: "flings feces at you, stinging your eyes",
		xp: 14,
		gold: 11
		},
	{	name: "Rabid Deer",
		hp: 9,
		attack: 4,
		defense: 1,
		strike1: "rears back and kicks you with its front legs",
		xp: 15,
		gold: 12
		},
	{	name: "Young Tree Goblin",
		hp: 10,
		attack: 4,
		defense: 1,
		strike1: "flings sharpened sticks at you",
		xp: 16,
		gold: 13
		},
	{	name: "Brute",
		hp: 11,
		attack: 4,
		defense: 1,
		strike1: "throws rocks at you",
		xp: 17,
		gold: 14
		},
	{	name: "Jalum Kok",
		hp: 12,
		attack: 5,
		defense: 1,
		strike1: "whips its tail around and slams your head",
		xp: 18,
		gold: 15
		},
	{	name: "Landshark",
		hp: 13,
		attack: 5,
		defense: 1,
		strike1: "cruises over and bites your arm",
		xp: 19,
		gold: 16
		},		
	{	name: "Highwayman",
		hp: 14,
		attack: 5,
		defense: 2,
		strike1: "flips open his blade and lunges at your chest",
		xp: 20,
		gold: 17
		},		
	{	name: "Bloody Bruce",
		hp: 18,
		attack: 6,
		defense: 2,
		strike1: "takes a swing at you with his nailed bat",
		xp: 23,
		gold: 20
		}
	],
	lev1b: {
		name:"Twin Robbers",
		hp: 18,
		attack: 6,
		defense: 3,
		strike1: "strike at you with two pairs of swords",
		xp:30,
		gold:50
	},

	//
	// LEVEL 2
	//

	lev2: [
	{	name: "Young Tree Goblin",
		hp: 12,
		attack: 5,
		defense: 1,
		strike1: "flings sharpened sticks at you",
		xp: 18,
		gold: 15
	},
	{	name: "Brute",
		hp: 13,
		attack: 5,
		defense: 1,
		strike1: "throws sharpened rocks at you",
		xp: 19,
		gold: 16
	},
	{	name: "Jalum Kok",
		hp: 13,
		attack: 5,
		defense: 1,
		strike1: "whips its tail around and slams your head",
		xp: 20,
		gold: 17
	},
	{	name: "Landshark",
		hp: 14,
		attack: 5,
		defense: 2,
		strike1: "cruises over and bites your arm",
		xp: 21,
		gold: 18
	},	
	{	name: "Highwayman",
		hp: 15,
		attack: 6,
		defense: 2,
		strike1: "flips open his blade and lunges at your chest",
		xp: 22,
		gold: 19
	},
	{	name: "Bloody Bruce",
		hp: 16,
		attack: 6,
		defense: 3,
		strike1: "takes a swing at you with his nailed bat",
		xp: 23,
		gold: 20
	},
	{	name: "Rude Boy",
		hp: 17,
		attack: 6,
		defense: 3,
		strike1: "runs up and doesn't say please",
		xp: 25,
		gold: 21
	},
	{	name: "Slobbering Wolf",
		hp: 18,
		attack: 7,
		defense: 3,
		strike1: "snarls and snaps at your leg",
		xp: 25,
		gold: 22
	},
	{	name: "Harron",
		hp: 19,
		attack: 7,
		defense: 3,
		strike1: "rears back and slashes you with his nails",
		xp: 26,
		gold: 23
	},
	{	name: "Local Politician",
		hp: 20,
		attack: 7,
		defense: 4,
		speed: 4,
		strike1: "turns his back and sells you out",
		xp: 27,
		gold: 24
	},
	{	name: "Drumpf",
		hp: 24,
		attack: 9,
		defense: 3,
		strike1: "stomps his feet and casts stones",
		xp: 38,
		gold: 35
	}
	],
	lev2b: {
		name:"Geist",
		hp: 28,
		attack: 8,
		defense: 3,
		strike1: "envelops you in darkness and curdles your mortal soul",
		xp:50,
		gold:80
	},

	//
	// LEVEL 3
	//

	lev3: [
	{	name: "Rude Boy",
		hp: 18,
		attack: 6,
		defense: 3,
		strike1: "runs up and doesn't say please",
		xp: 18,
		gold: 28
	},
	{	name: "Slobbering Wolf",
		hp: 19,
		attack: 7,
		defense: 2,
		strike1: "snarls and snaps at your leg",
		xp: 26,
		gold: 23
	},
	{	name: "Harron",
		hp: 20,
		attack: 7,
		defense: 2,
		strike1: "rears back and slashes you with his nails",
		xp: 27,
		gold: 24
		},
	{	name: "Local Politician",
		hp: 21,
		attack: 8,
		defense: 3,
		strike1: "turns his back and sells you out",
		xp: 28,
		gold: 25
	},
	{	name: "Drumpf",
		hp: 22,
		attack: 8,
		defense: 3,
		strike1: "stomps his feet and casts stones",
		xp: 29,
		gold: 26
	},	
	{ 	name: "Nimrod",
		hp: 23,
		attack: 9,
		defense: 3,
		strike1: "lifts his spear and stabs at you",
		xp: 30,
		gold: 27
		},
	{	name: "Juggernaut",
		hp: 28,
		attack: 6,
		defense: 8,
		strike1: "lets out a bellowing howl, ducks his head and charges you",
		xp: 33,
		gold: 30
		},
	{	name: "Horned Gremlin",
		hp: 25,
		attack: 9,
		defense: 3,
		strike1: "belches in your general direction",
		xp: 32,
		gold: 29
		},
	{	name: "Feral Cat",
		hp: 26,
		attack: 10,
		defense: 3,
		strike1: "hisses and swipes at you with its diseased claws",
		xp: 33,
		gold: 30
		},
	{	name: "Small Bear",
		hp: 27,
		attack: 10,
		defense: 4,
		strike1: "roars adorably and then swipes at your face",
		xp: 34,
		gold: 31
		},
	{	name: "Shady Drifter",
		hp: 33,
		attack: 11,
		defense: 4,
		strike1: "flicks open double switchblades and lunges at you",
		xp: 39,
		gold: 36
		}
	],
	lev3bs: [
		{ 	name:"Brezlev",
			hp: 30,
			attack: 10,
			defense: 2,
			strike1: "hurls a sharpened javelin at you"
			},
		{	name:"the Dagger Fighter",
			hp: 30,
			attack: 12,
			defense: 4,
			strike1: "stalks you around the pit before leaping at you with bared daggers"
			},
		{	name:"the Magus",
			hp: 45,
			attack: 15,
			defense: 1,
			strike1: "stands motionless, hands hidden within the sleeves of his cloak. Suddenly, you feel a wave of crushing, ineffable agony descend upon you",
			xp:100,
			gold:125
		}
	],

	//
	// LEVEL 4
	//
	
	lev4: [
	{	name: "Nimrod",
		hp: 26,
		attack: 8,
		defense: 4,
		strike1: "lifts his spear and stabs at you",
		xp: 32,
		gold: 29
	},
	{	name: "Juggernaut",
		hp: 27,
		attack: 8,
		defense: 4,
		strike1: "lets out a bellowing howl, ducks his head and charges you",
		xp: 33,
		gold: 30
	},
	{	name: "Horned Gremlin",
		hp: 28,
		attack: 9,
		defense: 4,
		strike1: "belches in your general direction",
		xp: 34,
		gold: 31
	},
	{	name: "Feral Cat",
		hp: 29,
		attack: 10,
		defense: 5,
		strike1: "hisses and swipes at you with its diseased claws",
		xp: 35,
		gold: 32
	},	
	{	name: "Small Bear",
		hp: 30,
		attack: 11,
		defense: 5,
		strike1: "roars adorably and then swipes at your face",
		xp: 36,
		gold: 33
	},
	{	name: "Shady Drifter",
		hp: 31,
		attack: 11,
		defense: 5,
		strike1: "flicks open double switchblades and lunges at you",
		xp: 37,
		gold: 34
	},
	{	name: "Polecat",
		hp: 32,
		attack: 12,
		defense: 5,
		strike1: "XXXX",
		xp: 38,
		gold: 35
	},
	{	name: "Bad Egghead",
		hp: 33,
		attack: 12,
		defense: 5,
		strike1: "XXXX",
		xp: 39,
		gold: 36
	},
	{	name: "Mean Girl",
		hp: 34,
		attack: 13,
		defense: 5,
		strike1: "smiles sweetly and then stabs you in the back",
		xp: 40,
		gold: 37
	},
	{	name: "Siren",
		hp: 35,
		attack: 13,
		defense: 6,
		strike1: "XXXX",
		xp: 41,
		gold: 38
	},
	{	name: "Loud Vamp",
		hp: 39,
		attack: 16,
		defense: 6,
		strike1: "XXXX",
		xp: 46,
		gold: 43
	}
	],
	lev4b: {
		name:"Quercus",
		hp: 36,
		attack: 17,
		defense: 6,
		strike1: "swings a hefty thorny branch towards your head",
		xp:100,
		gold:150
	}
}

