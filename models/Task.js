const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      status: {
        type: String,
        enum: ["To Do", "In Progress", "Completed"],
        default: "To Do",
      },
      priority: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        default: "Medium",
      },
      dueDate: {
        type: Date,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
      },
      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
      },
      projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project", 
      },
      comments: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          text: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      isRecurring: {
        type: Boolean,
        default: false,
      },
      recurrencePattern: {
        type: String, 
      },
      dependencies: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Task", 
        },
      ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);