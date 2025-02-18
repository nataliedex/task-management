document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll(".task-description").forEach(desc => {
        desc.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("description clicked");
            desc.style.display = "none";

            const row = e.target.closest(".update-task"); // Get the closest row
            const editText = row.querySelector(".task-input"); // Get textarea in this row
            const saveButton = row.querySelector(".save-button");
            const exitButton = row.querySelector(".exit-button");
            const form = row.closest("form");

            desc.style.display = "none";
            editText.style.display = "block";
            editText.value = desc.innerText;
            saveButton.style.display = "block";
            exitButton.style.display = "block";

            exitButton.addEventListener("click", (e) => {
                e.preventDefault();
                console.log("Exit button clicked");
    
                // Revert to original state
                editText.style.display = "none";
                saveButton.style.display = "none";
                exitButton.style.display = "none";
                desc.style.display = "block";
            });
    
            saveButton.addEventListener("click", () => {
                console.log("Save button clicked");

                desc.innerText = editText.value; 

                form.submit();
            });
        
        });
    });

});