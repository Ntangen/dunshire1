# Welcome to Dunshire

Dunshire is a text- and turn-based RPG game where players develop a character, slay monsters and level up so they can... slay bigger monsters. **You can check it out [here.](http://dunshire1.herokuapp.com)**

###What is Dunshire?
When I was in middle school, I started a BBS with a buddy of mine in part so we could play and control our own game of [Legend of the Red Dragon](https://en.wikipedia.org/wiki/Legend_of_the_Red_Dragon), which was arguably the most popular RPG [door game](https://en.wikipedia.org/wiki/BBS_door) of its era. "LORD" was... well, amazing, and was a part of what got me fascinated with computers early in life. LORD led to our BBS, which got me into basic programming and design, which I have now managed to make a career from.

LORD, like the BBSes it ran on, is long-gone. You can find it on some niche websites running weird Java applets, but it's mostly been forgotten - except by the uber-nerds who obsessed over it back in the day. In looking for my first big [Meteor](https://www.meteor.com/) project to work on, I decided to write a "LORD for the web era" that I could play with again. Meteor has made this significantly easier than it would be (for me) otherwise, with built-in account management and MongoDB services.

This is very much a WIP. Comments/feedback [are welcome.](https://twitter.com/BlairReeves)

###Why "Dunshire"
Because **[this](https://www.youtube.com/watch?v=XfXfOCIIFcY)** is pretty much my wife's reaction too.

###Most recent additions
* Added gameplay through level 2
* Send/receive drinks at the Tavern, along with short messages
* Improved account setup structure
* Removed autopublish and insecure. Removing the former required some changes, namely adding some Meteor.calls to check some collections serverside for stuff like sending drinks/bank. I'm sure there's a way to just set up the subscriptions differently instead, but this seemed easier.


###To do next
* Adding gameplay levels
* Several ideas for adding player interaction
* Extra gameplay threads