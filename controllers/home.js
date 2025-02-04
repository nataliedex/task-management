module.exports = {
    getIndex: async(req, res) => {
        try{
            res.render('index.ejs', { user: req.user || null });
        } catch(err){
            console.log(err);
            res.status(500).send('Server Error.');
        }
    },
}