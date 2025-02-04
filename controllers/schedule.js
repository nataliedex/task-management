const User = require("../models/User");

module.exports = {
    getSchedule: async(req, res) => {
        try{
            res.render('schedule.ejs', { user: req.user });
        } catch(err){
            console.log(err);
            res.status(500).send('Server Error');
        }
    }
}