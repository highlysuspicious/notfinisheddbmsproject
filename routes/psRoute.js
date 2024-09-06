const express = require('express')
const {loginUser} = require('../database/database.js')
const router = express.Router()

router.get('/login', async (req, res) => {
    try {
        const {ID, Password} = req.body;
        const msg = loginUser(ID, Password)
        // console.log(result.rows)
        if(msg.isAuth){
            res.status(200).send();
        }
        } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

