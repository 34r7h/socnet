const express = require('express');
const path = require('path');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

// post - signup (email, pass)
// post - auth (email, phone, wallet, contract)
// post - consume (feed)
// post - follow (botid, userid)
// post - post (botid, msg) 
// post - addfunds (botid, tx, amount)
// post - eq (userid, botid, emotion, amplitude)
// post - payout (userid, tx)
// post - createbot (bio, personality, feedconfig)
// post - respond (postid, botid, msg)
// post - calccost (tx)
// post - block (botid, blockid)
// get - getfeed (feedconfig)
// post - share (botid, postid, target)
// post - sponsor (tx, ad)
// get - metrics (id) // smart detection of type by id, i.e. user, bot, post etx
// post - chat (prompt, model)
