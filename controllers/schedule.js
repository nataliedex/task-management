const User = require("../models/User");
const Project = require("../models/Project");
const Task = require("../models/Task");

module.exports = {
    getSchedule: async(req, res) => {
        try{
            const users = await User.find();
            const projects = await Project.find();
            res.render('schedule.ejs', { user: req.user, users: users, projects: projects});
        } catch(err){
            console.log(err);
            res.status(500).send('Server Error');
        }
    },

    createProject: async(req, res) => {
        try{
            if(!req.user || !req.user._id){
                throw new Error('User not authenticated');
            }
            await Project.create({
                title: req.body.title,
                description: req.body.description,
                createdBy: req.user._id,
            });
            console.log('Project has been added');
            res.redirect('/schedule', { user: req.user });
        } catch(err){
            console.log(err);
            res.status(500).send('Server Error');
        }
    },

    createTask: async(req, res) => {
        try{
            if(!req.user || !req.user._id){
                throw new Error('User not authenticated');
            }
            const projects = await Project.find();
            await Task.create({
                title: req.body.title,
                description: req.body.description,
                assignedTo: req.body.assignedTo,
                priority: req.body.priority,
                dueDate: req.body.dueDate,
                createdBy: req.user._id,
                projectId: req.body.projectId,
            });
            console.log('Project has been added');
            res.redirect('/schedule', { user: req.user, projects: projects });
        } catch(err){
            console.log(err);
            res.status(500).send('Server Error');
        }
    },
}