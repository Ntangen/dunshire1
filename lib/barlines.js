barlines = function(x){
	chooseclear(4);
	chooseclear(5);
	chooseclear(6);
	chooseclear(7);
	if (x === "q") { tavern() }
	output(3, newline() );
	setTimeout(function(){ output(4, newline() ) }, 1000);
	setTimeout(function(){ output(5, newline() ) }, 2000);
	setTimeout(function(){ output(6, newline() ) }, 3000);
	setTimeout(function(){ output(7, "(Hit <span id=enter>Enter</span> to keep listening, or <span id=enter>Q</span> to stop.)"); }, 4000);
}

newline = function (){
	line = barliners[Math.round(Math.random()*20)];
	return "<p>\"" + line + "\"</p>";
}

barliners = [
	barline0 = "What did Jony say?",
	barline1 = "Did you hear about Frank?",
	barline2 = "I swear, that governor of ours...",
	barline3 = "What did that idiot Barzek do now?",
	barline4 = "Humbug! He was never more than a Padawan!",
	barline5 = "The Corsair over yonder had his eye on the maiden, but she was too taken with the Knight...",
	barline6 = "Did you hear about the Bloody Bruce attack the other night? Killed that poor farmer and his family...",
	barline7 = "... the Mage's Cave? Bugger if I know. No one who goes looking ever seems to find it...",
	barline8 = "-that serving wench? I bet she hears all the latest gossip.... well I don't know, go ask!",
	barline9 = "The smithy's been busy lately. I think he's working on some new armor.",
	barline10 = "You say there are some new Oldar Steel swords in? Them's the best, you know. Strong. Oldar knows his alchemy.",
	barline11 = "Never been there. The Capitol is too far away for my taste. I hear them's some amazin' sights there, though.",
	barline12 = "Lived here all my life, never stepped foot in the Graveyard. Never will. Gives me the creepers.",
	barline13 = "I did. I saw a Sensei fighter battle a dragon, I did! Say what you will. He'd never say what treasure the beast yielded up...",
	barline14 = "You hear about that Apprentice who challenged the Journeyman the other day? Bloody mess, that was.",
	barline15 = "C'mere. No, c'mere... quiet about it... that Dean's not all he says he is. I'd keep my eye on him, t'were I you, lad.",
	barline16 = "Occasionally, you go looking for beasts in the forest, you wind up tripping over something special. Dead man's stuff? I don't know.",
	barline17 = "I'm a keeper of The Faith. Not ashamed, no! In my day, it kept us safe.",
	barline18 = "Remember that wolfhound the Rogue came back from the forest with that one time? He was a cute pup, wasn't he?",
	barline19 = "The trick about going from a sword to a mace is having the strength to wield it properly, if you ask me.",
	barline20 = "There's more here than you see, you know. Always is."
	];

drinks = "<ul><li><span id=letter>T</span>op's White Whiskey (25 Gold)<br>" +
		"<li><span id=letter>B</span>urt's Beer (15 Gold)<br>" +
		"<li><span id=letter>A</span>emon's Ale (10 Gold)<br>" +
		"<li><span id=letter>G</span>reb's Grog (5 Gold)<br></ul>" +
		"------------------------------------------------";
