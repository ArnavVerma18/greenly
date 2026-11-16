// Get the habit checkboxes and page elements
const checkboxes = document.querySelectorAll(".habit-checkbox");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const resetButton = document.getElementById("reset-button");

// Get the summary card elements
const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");
const remainingCount = document.getElementById("remaining-count");
const percentageCount = document.getElementById("percentage-count");
const progressPercent = document.getElementById("progress-percent");

// Load saved habit information from Local Storage
let savedHabits = JSON.parse(localStorage.getItem("greenStepsHabits"));

if (savedHabits !== null && savedHabits.length === checkboxes.length) {
    checkboxes.forEach(function(checkbox, index) {
        checkbox.checked = savedHabits[index];
    });
}

// Update progress and save the current checkbox values
function updateProgress() {
    let completed = 0;
    let habitStatus = [];

    checkboxes.forEach(function(checkbox) {
        habitStatus.push(checkbox.checked);

        if (checkbox.checked) {
            completed++;
        }
    });

    let total = checkboxes.length;
    let remaining = total - completed;
    let percentage = Math.round((completed / total) * 100);

    progressText.textContent = completed + " out of " + total + " habits completed";
    progressBar.style.width = percentage + "%";

    totalCount.textContent = total;
    completedCount.textContent = completed;
    remainingCount.textContent = remaining;
    percentageCount.textContent = percentage + "%";
    progressPercent.textContent = percentage + "%";

    // Save the habit information as JSON in Local Storage
    localStorage.setItem("greenStepsHabits", JSON.stringify(habitStatus));
}

// Listen for changes to the checkboxes
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", updateProgress);
});

// Reset all habits when the button is clicked
resetButton.addEventListener("click", function() {
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });

    updateProgress();
});

// Display the saved progress when the page opens
updateProgress();
