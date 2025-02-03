module.exports = {
    getSchedule: async(req, res) => {
        try{
            res.render('schedule.ejs');
        } catch(err){
            console.log(err);
            res.status(500).send('Server Error');
        }
    }
}