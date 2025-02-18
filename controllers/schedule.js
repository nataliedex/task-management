const User = require("../models/User");
const Project = require("../models/Project");
const Task = require("../models/Task");
const mongoose = require('mongoose');

module.exports = {
    getSchedule: async(req, res) => {
        try{
            const users = await User.find();
            const projects = await Project.find();
            const allTasks = await Task.find()
                .populate('assignedTo', 'name')
                .populate('projectId', 'title');
            allTasks.sort((a,b) => {
                if(a.projectId?.title < b.projectId?.title) return -1;
                if(a.projectId?.title > b.projectId?.title) return 1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            });
    
            const tasks = await Task.find({ assignedTo: req.user._id })
                .populate('createdBy', 'name')
                .populate('projectId', 'title description');
            res.render('schedule.ejs', { user: req.user, users, projects, tasks, allTasks });
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
            res.redirect('/schedule' );
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
            const { title, description, assignedTo, priority, dueDate, projectId } = req.body
            await Task.create({
                title: title,
                description: description,
                assignedTo: new mongoose.Types.ObjectId(assignedTo),
                priority: priority,
                dueDate: dueDate,
                createdBy: req.user._id,
                projectId: new mongoose.Types.ObjectId(projectId),
            });

            console.log('Project has been added');
            res.redirect('/schedule');
        } catch(err){
            console.log(err);
            res.status(500).send('Server Error');
        }
    },
    updateTaskDesc: async (req, res) => {
        try{
          const { description, taskId } = req.body;
          const objectId = new mongoose.Types.ObjectId(taskId);
        
          const updateTask = await Task.findOneAndUpdate(
            { _id: objectId },
            { $set: { description } },
            { new: true }
          );

          if(!updateTask){
            return res.status(404).send("Task not found");
          }
        
          res.redirect('/schedule');
        } catch (err) {
          console.error("Error updating task", err);
          res.status(500).send("Server Error");
        }
      },

      completeTask: async (req, res) => {
        try {
            const { taskId, status } = req.body;
            const newStatus = status === "on" ? "Completed" : "To Do";
            await Task.findByIdAndUpdate(taskId, { status: newStatus });
            res.redirect('/schedule');

        } catch (err) {
            console.error("Error completing the task", err);
            res.status(500).send("Server Error");
        }
      },

    
}