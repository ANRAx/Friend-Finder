// LOAD DATA (linking our routes to a series of "data" sources that hold arrays of info on all possible friends)
// =====================================================================
let friends = require("../data/friends");

// ROUTING
// =====================================================================
module.exports = function(app) {
    // API GET Requests 
    // handles when users visit page. When user visits a link they are shown a JSON of the data in the table
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    // API POST Requests
    // handles when users submits a form (and submits data to server as JSON Object), the JSON is pushed to the appro JS array
    app.post("/api/friends", function(req, res) {
        // Server will respond to user's survey result then compare against every user in DB
        // Difference will be calc between each of the nums and user's nums then choose the user with the least diffs as the match
        // In the case of mult users with same result, first match is chosen
        // After test, user is pushed to DB 
        // bestMatch obj. is continuously updated as we loop thru all options 
        let bestMatch = {
            name: "",
            photo: "",
            friendDifference: Infinity
        };

        // take results of user's survey POST and parse it
        let userData = req.body;
        let userScores = userData.scores;

        // calcs the diff between user's scores and scores of each user in DB 
        let totalDifference;

        // Loop thru all friend possibilities in the DB 
        for (let i = 0; i < friends.length; i++) {
            let currentFriend = friends[i];
            totalDifference = 0;

            console.log(currentFriend.name);
            
            // loop through all the scores of each friend 
            for (let j = 0; j < currentFriend.scores.length; j++) {
                let currentFriendScore = currentFriend.scores[j];
                let currentUserScore = userScores[j];

                // calc the diff between the scores and sum them into totalDifference variable
                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }

            // If the sum of diffs is less than the diffs of the current "best match", reset the bestMatch obj to be the new friend 
            if (totalDifference <= bestMatch.friendDifference) {
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDifference = totalDifference;
            }
        }

        // Save user data to the DB (happens AFTER the check), otherwise the DB will always return that user is the user's bestfriend
        friends.push(userData);

        // return JSON with user's bestMatch to be used by the HTML
        res.json(bestMatch);
    });
};
