const updateTaskDescriptionButton = document.getElementById("update-task-description");
const saveButton = document.getElementById("save-button");
const exitButton = document.getElementById("exit-button");

const currentDescription = document.getElementById("current-description");

let originalValues = {};

function createTextarea(name, value) {
    const textarea = document.createElement("textarea");
    textarea.id = `${name}-field`;
    textarea.name = name;
    textarea.value = value || "";  // Pre-fill with value
    textarea.className = "form-control";
    return textarea;
  }

function captureOriginalValues(){
    originalValues = {
        description: currentDescription.textContent.trim(),
    }
}

updateTaskDescriptionButton.addEventListener("click", (event) => {
    event.preventDefault();
    captureOriginalValues();

    currentDescription.replaceWith(createTextarea("description", originalValues.description));
    
    updateTaskDescriptionButton.style.display = "none";
    saveButton.style.display = "block";
    exitButton.style.display = "block";

});

exitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const newDescription = document.getElementById("description-field");

    currentDescription.textContent = originalValues.description;

    newDescription.replaceWith(currentDescription);

    updateTaskDescriptionButton.style.display = "block";
    saveButton.style.display = "none";
    exitButton.style.display = "none";
});

saveButton.addEventListener("click", (event) => {
    event.preventDefault();
    const newDescription = document.getElementById("description-field");


    originalValues.description = newDescription;
    const form = document.getElementById("updated-description-form");
    const formData = new FormData(form);
    formData.set("current-description", newDescription);

    updateTaskDescriptionButton.style.display = "block";
    saveButton.style.display = "none";
    exitButton.style.display = "none";

    form.submit();

});