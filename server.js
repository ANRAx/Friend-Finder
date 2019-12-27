// DEPENDENCIES
// ==================================================================
let express = require("express");

// EXPRESS CONFIG (set up the basic properties for our express server)
// ==================================================================

// Tells node we are creating an "express" server
let app = express();

// Sets an initial port to be listened to later
let PORT = process.env.PORT || 8080;

// express.json and .urlEncoded just make it easy for server to interpret data sent to it 
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// ROUTER 
// (points the server to "route" files that give it a "map" of how to respond when user visits or requests data from diff. URLs)
// ==================================================================
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// LISTENER (what effectively starts our server);
// ==================================================================
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});


