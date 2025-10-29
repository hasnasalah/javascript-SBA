const addTaskBtn = document.getElementById("addTaskBtn");
const addTaskForm = document.getElementById("addTaskForm");
const submitBtn = document.getElementById("submit");
const taskList = document.getElementsByClassName("task-list")[0];
let deleteTask=document.getElementById("deleteTaskBtn");
let tasksArr=[];

addTaskBtn.addEventListener("click", function() {
    addTaskForm.style.display = "block"; 
});
function displayTask(task) {
    let parentLi = document.createElement("li");
    parentLi.className="task-item"
    parentLi.textContent = task.Name;  

    let nestedUl = document.createElement("ul");
    parentLi.appendChild(nestedUl);

    const entries = Object.entries(task);
    for (const [key, value] of entries) {
        let nestedLi = document.createElement("li");
        nestedLi.textContent = `${key}: ${value}`;
        nestedUl.appendChild(nestedLi);
    }

    taskList.appendChild(parentLi);
}
function displayTasks(tasksArray) {
    taskList.innerHTML = "";

    tasksArray.forEach(task => {
        displayTask(task); 
    });
}
function clearInputField(){
     document.getElementById("taskName").value = "";
    document.getElementById("taskCategory").selectedIndex = 0;
    document.getElementById("taskStatus").selectedIndex = 0;
    document.getElementById("taskDate").value = "";
}


function addTask(taskName,taskCategory,taskStatus,taskDate){
    let tasks={
    Name:taskName,
    Category:taskCategory,
    Status:taskStatus,
    deadline:taskDate
}
tasksArr.push(tasks)
localStorage.setItem("tasks", JSON.stringify(tasksArr));
displayTasks(tasksArr)
}

function filterByStatus(tasksArr,status) {
    return tasksArr.filter(task => task.Status === status);
}

function filterByCategory(tasksArr,category) {
    return tasksArr.filter(task => task.Category === category);
}
submitBtn.addEventListener("click", function() {
    const taskName = document.getElementById("taskName").value;
    const taskCategory = document.getElementById("taskCategory").value;
    const taskStatus = document.getElementById("taskStatus").value;
    const taskDate = document.getElementById("taskDate").value;

    addTask(taskName, taskCategory, taskStatus, taskDate);
    addTaskForm.style.display = "none";
    clearInputField();

   
});

let categorySelect=document.getElementById("Category");

categorySelect.addEventListener("change", function() {
    let selectedCategory=categorySelect.value;

let filtredArray=filterByCategory(tasksArr,selectedCategory);
displayTasks(filtredArray);
});

let statusSelect=document.getElementById("Status");
statusSelect.addEventListener("change", function() {
    let selectedStatus=statusSelect.value;
let filtredArray=filterByStatus(tasksArr,selectedStatus);
displayTasks(filtredArray);
  
});
taskList.addEventListener("click", function(event) {
    if (event.target.tagName === "LI" && event.target.classList.contains("task-item")) {
        const clickedLi = event.target;

        if (clickedLi.querySelector("input")) return;

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter new status";
        input.style.marginLeft = "10px";

        clickedLi.appendChild(input);
        input.focus();

        input.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                const newStatus = input.value.trim();
                if (newStatus) {
                    const taskName = clickedLi.firstChild.textContent;
                    const taskObj = tasksArr.find(task => task.Name === taskName);
                    if (taskObj) {
                        taskObj.Status = newStatus;
                        localStorage.setItem("tasks", JSON.stringify(tasksArr));
                        displayTasks(tasksArr); 
                    }
                }
                input.remove(); 
            }
        });
    }
});
 deleteTask.addEventListener("click", function() {
     let taskNameToDelete = prompt("Enter the name of the task you want to delete:");

    if (taskNameToDelete) {
        const index = tasksArr.findIndex(task => task.Name === taskNameToDelete.trim());

        if (index !== -1) {
            if (confirm(`Are you sure you want to delete task "${tasksArr[index].Name}"?`)) {
                tasksArr.splice(index, 1); 
                localStorage.setItem("tasks", JSON.stringify(tasksArr)); 
                displayTasks(tasksArr); 
            }
        } else {
            alert("Task not found!");
        }
    }
});

function updateOverdueTasks() {
    const today = new Date();

    tasksArr.forEach(task => {
        if (task.Status !== "Completed" && task.deadline) {
            const taskDate = new Date(task.deadline);
            if (taskDate < today) {
                task.Status = "Overdue";
            }
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasksArr));
    displayTasks(tasksArr); 
}

updateOverdueTasks();