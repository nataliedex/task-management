document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll(".edit-button").forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            console.log("edit button clicked");

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
        saveButton.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("save button clicked");

            const task = saveButton.closest(".task");
            const form = task.closest("form");
            const taskInput = task.querySelector(".task-input");
            const taskDescription = task.querySelector(".task-description");

            const exitButton = task.querySelector(".exit-button");
            const editButton = task.querySelector(".edit-button");

            taskDescription.textContent = taskInput.value;

            task.style.display = "none";
            exitButton.style.display = "none";
            taskInput.style.display = "none";
            taskDescription.style.display = "block";
            editButton.style.display = "block";

            form.submit();  
        });
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

