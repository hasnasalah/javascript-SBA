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


function deleteTasks(){



}
function editTask(){

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


let editTaskBtn=document.getElementById("editTaskBtn");
editTaskBtn.addEventListener('click', function(){
    let updateBtn = document.createElement("button");
    updateBtn.textContent = "Update Status";

    let statusInput = document.createElement("input");
    statusInput.type = "text";
    statusInput.placeholder = "Enter new status";
    statusInput.style.display = "none"; 

    parentLi.appendChild(updateBtn);
    parentLi.appendChild(statusInput);

    updateBtn.addEventListener("click", function() {
        statusInput.style.display = "inline"; 
        statusInput.focus();
    });
    statusInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            const newStatus = statusInput.value.trim();
            if (newStatus) {
                tasksArr[index].Status = newStatus;
                localStorage.setItem("tasks", JSON.stringify(tasksArr));
                displayTasks(tasksArr); 
            }
        }
    });

    taskList.appendChild(parentLi);
}
);

