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
            saveButton.style.display = "inline-block";
            exitButton.style.display = "inline-block";

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

    document.querySelectorAll(".drag-text").forEach(task => {
        task.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("taskId", e.target.getAttribute("data-task-id"));
            e.dataTransfer.setData("oldUserId", e.target.getAttribute("data-user-id"));
            console.log("dragging task: ", e.target.innerText);
        });
    });

    document.querySelectorAll(".drop-zone").forEach(zone => {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault();
        });
        zone.addEventListener("drop", async (e) => {
            e.preventDefault();
            const taskId = e.dataTransfer.getData("taskId");
            const oldUserId = e.dataTransfer.getData("oldUserId");
            const newUserId = e.target.closest(".drop-zone").getAttribute("data-user-id");

            if(!taskId || !newUserId || oldUserId === newUserId) return;

            console.log(`Moving task ${taskId} from user ${oldUserId} to user ${newUserId}`);
            
            const taskRow = document.querySelector(`[data-task-id='${taskId}']`);
            console.log(taskRow);
            console.log(e.target.closest(".drop-zone"));
            e.target.closest(".drop-zone").appendChild(taskRow);

            try {
                const response = await fetch(`/schedule/updateTaskAssignment/${taskId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ newUserId }),
                });

                const result = await response.json();
                console.log(result.message);

            } catch(error) {
                console.error("Error updating task: ", error);
            }
        
        });
    });

});