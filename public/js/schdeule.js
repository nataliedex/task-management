document.addEventListener('DOMContentLoaded', () => {
    const taskDescription = document.querySelectorAll(".task-description");
    const editButton = document.querySelectorAll(".edit-button");

    const saveButton = document.querySelectorAll(".save-button");
    const exitButton = document.querySelectorAll(".exit-button");
    const taskInput = document.querySelectorAll(".task-input");
    
    editButton.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            console.log("clicked");

            const task = button.parentElement;
            console.log(task);

            // taskDescription.style.display = "none";
            // editButton.style.display = "none";

            // saveButton.style.display = "block";
            // exitButton.style.display = "block";
            // taskInput.style.display = "block";
        });
    });
    
});

