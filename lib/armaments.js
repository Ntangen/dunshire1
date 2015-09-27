weapons = {
	start: {
		hands: {
			name: "Hands",
			attack: 5
			}
	},
	lev0: {
		woodclub: {
			name: "Wooden Club",
			displayname: "<span id=letter>W</span>ooden Club",
			gold: 55,
			attack: 7,
			key: 1
			},
		stsword: {
			name: "Farmhand's Sword",
			displayname: "<span id=letter>F</span>armhand's Sword",
			gold: 100,
			attack: 12,
			key: 2
			},
		mace: {
			name: "Spiked Mace",
			displayname: "<span id=letter>S</span>piked Mace",
			gold: 175,
			attack: 16,
			key: 3
			},
		oldsword: {
			name: "Oldar's Steel Sword",
			displayname: "<span id=letter>O</span>ldar's Steel Sword",
			gold: 250,
			attack: 20,
			key: 4
			}
		},
	lev1: {
			spikeclub: {
			name: "Spiked Club",
			displayname: "<span id=letter>S</span>piked Club",
			gold: 180,
			attack: 14
			}
		}
}

armor = {
	start: {
		shirt:{
			name: "Shirt",
			armor: 1
		}
	},
	lev0: {
		canvas:{
			name: "Canvas Tunic",
			displayname: "<span id=letter>C</span>anvas Tunic",
			gold: 30,
			armor: 2
		},
		leather:{
			name: "Leather Jerkin",
			displayname: "<span id=letter>L</span>eather Jerkin",
			gold: 65,			
			armor: 4
		},
		chainmail:{
			name: "Rivet Chainmaille",
			displayname: "<span id=letter>R</span>ivet Chainmail",
			gold: 125,
			armor: 7
		},
		steelplate:{
			name: "Steel Plate",
			displayname: "<span id=letter>S</span>teel Plate",
			gold: 225,
			armor: 10
		}
	}
}

levels = {
	0: "Noob",
	1: "Naif",
	2: "Apprentice",
	3: "Challenger",
	4: "Journeyman",
	5: "Ranger",
	6: "Rogue",
	7: "Corsair",
	8: "Knight",
	9: "Sensei",
	10: "Master Chief"
};

beasts = [
	{	name: "Screeching Squirrel",
		hp: 4,
		attack: 2,
		defense: 1,
		speed: 4,
		strike1: "jumps at you with a bloodcurdling scream and scratches your arms",
		xp: 3,
		gold: 9
		},
	{	name: "Berzerk Bunny",
		hp: 5,
		attack: 3,
		defense: 1,
		speed: 4,
		strike1: "leaps at your face and bites your nose",
		xp: 5,
		gold: 11
		},
	{	name: "Bloody Groundhog",
		hp: 6,
		attack: 3,
		defense: 1,
		speed: 3,
		strike1: "grabs your ankles and bites",
		xp: 5,
		gold: 13
		},		
	{ 	name: "Wizened Grumpus",
		hp: 7,
		attack: 4,
		defense: 1,
		speed: 1,
		strike1: "flings feces at you, stinging your eyes",
		xp: 8,
		gold: 16
		},
	{	name: "Rabid Deer",
		hp: 9,
		attack: 3,
		defense: 1,
		speed: 3,
		strike1: "rears back and kicks you with its front legs",
		xp: 8,
		gold: 19
		},
	{	name: "Young Tree Goblin",
		hp: 9,
		attack: 4,
		defense: 1,
		speed: 2,
		strike1: "flings sharpened sticks at you",
		xp: 8,
		gold: 19
		},
	{	name: "Brute",
		hp: 10,
		attack: 6,
		defense: 2,
		speed: 1,
		strike1: "throws rocks at you",
		xp: 10,
		gold: 20
		},
	{	name: "Jalum Kok",
		hp: 11,
		attack: 6,
		defense: 2,
		speed: 2,
		strike1: "whips its tail around and slams your head",
		xp: 10,
		gold: 20
		},
	{	name: "Landshark",
		hp: 12,
		attack: 4,
		defense: 1,
		speed: 1,
		strike1: "cruises over and bites your arm",
		xp: 11,
		gold: 23
		},		
	{	name: "Highwayman",
		hp: 14,
		attack: 5,
		defense: 2,
		speed: 1,
		strike1: "flips open his blade and lunges at your chest",
		xp: 14,
		gold: 27
		},		
	{	name: "Bloody Bruce",
		hp: 19,
		attack: 6,
		defense: 5,
		speed: 2,
		strike1: "takes a swing at you with his nailed bat",
		xp: 19,
		gold: 30
		},		
]
