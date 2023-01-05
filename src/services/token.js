const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;

module.exports = {
    sign (data) {
        return jwt.sign(data, TOKEN_KEY, {expiresIn: "72h"});
    },
    getData (token) {
        try { return jwt.verify(token, TOKEN_KEY); } 
        catch (e) { return null; }
    }
};