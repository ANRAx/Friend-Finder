// DEPENDENCIES 
// =====================================================================
let path = require("path");

// ROUTING
// =====================================================================
module.exports = function(app) {
    // HTML GET requests. Handles when users visit a page, they will be shown an HTML page of content
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });

    // If no matching route is found, default to home 
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });
};
