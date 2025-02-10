document.addEventListener('DOMContentLoaded', () => {
    
    const editButton = document.querySelectorAll(".edit-button");

    editButton.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            console.log("clicked");

            const task = button.closest(".task");

            const taskDescription = task.querySelector(".task-description");
            const saveButton = task.querySelector(".save-button");
            const exitButton = task.querySelector(".exit-button");
            const taskInput = task.querySelector(".task-input");

            taskDescription.style.display = "none";
            button.style.display = "none";
            saveButton.style.display = "inline-block";
            exitButton.style.display = "inline-block";
            taskInput.style.display = "block";
        });
    });

    // Save Button clicks
    document.querySelectorAll(".save-button").forEach(saveButton => {

    });

// Exit Button clicks
    document.querySelectorAll(".exit-button").forEach(exitButton => {
        exitButton.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("exit button clicked");

            const task = exitButton.closest(".task");
            const taskDescription = task.querySelector(".task-description");
            const editButton = task.querySelector(".edit-button");
            const saveButton = task.querySelector(".save-button");
            const taskInput = task.querySelector(".task-input");
            
            taskDescription.style.display = "block";
            editButton.style.display = "block";
            saveButton.style.display = "none";
            exitButton.style.display = "none";
            taskInput.style.display = "none";

        });
    });
});

