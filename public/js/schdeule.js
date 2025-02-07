document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const taskElement = event.target.closest('.task');
            const textField = taskElement.querySelector('.task-input');
            const saveButton = taskElement.querySelector('.save-button');
            const exitButton = taskElement.querySelector('.exit-button');
            const currentDescription = taskElement.querySelector('.task');

            console.log("task element", taskElement);
            console.log("current description", currentDescription);

    
            textField.value = currentDescription.textContent.trim();
            textField.style.display = 'block';
    
            currentDescription.style.display = 'none';
            saveButton.style.display = 'block';
            exitButton.style.display = 'block';
            button.style.display = 'none';
    
        });
    });
    
    document.querySelectorAll('.exit-button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const taskElement = event.target.closest('.accordion-body');
            const textField = taskElement.querySelector('.task-input');
            const saveButton = taskElement.querySelector('.save-button');
            const editButton = taskElement.querySelector('.edit-button');
            const exitButton = taskElement.querySelector('.exit-button');
            const currentDescription = taskElement.querySelector('.task');
    
            // Restore the original text
            textField.style.display = 'none';
            currentDescription.style.display = 'block';
            saveButton.style.display = 'none';
            exitButton.style.display = 'none';
            editButton.style.display = 'block';
        });
    });
    
    document.querySelectorAll('.save-button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const taskElement = event.target.closest('.accordion-body');
            const textField = taskElement.querySelector('.task-input');
            const saveButton = taskElement.querySelector('.save-button');
            const editButton = taskElement.querySelector('.edit-button');
            const exitButton = taskElement.querySelector('.exit-button');
            const currentDescription = taskElement.querySelector('.task');
            const form = taskElement.querySelector('#updated-description-form');
    
            // Update the description text
            currentDescription.textContent = textField.value;
            textField.style.display = 'none';
            currentDescription.style.display = 'block';
            saveButton.style.display = 'none';
            exitButton.style.display = 'none';
            editButton.style.display = 'block';
    
            // Submit the form with updated value
            const formData = new FormData(form);
            formData.set("description", textField.value);
            form.submit();
        });
    });
});

