// Koduõppe JS ehk siis nn puhtand

const form = document.querySelector("form");
const taskInput = document.querySelector("#task");
const tasksList = document.querySelector(".collection")
const deleteAllTasks = document.querySelector("#delete-tasks");

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
deleteAllTasks.addEventListener("click", deleteTasks);


function addTask(event) {
    const task = taskInput.value;  // annab taskile väärtuse

    // loome listi taskide lisamiseks ning lisame ul'i (listide kogumi) alla
    const li = document.createElement("li");
    li.className ="collection-item";
    const taskText = document.createTextNode(task);
    li.appendChild(taskText);

    // loome lingitava elemendi ja lingi atribuudi
    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.className = "secondary-content";
    link.appendChild(document.createTextNode("X"));  // loome kustutamise nupu (X-i)
    li.appendChild(link);

    const ul = document.querySelector(".collection");
    ul.appendChild(li);

    saveTaskToLocalStorage(task); // salvestame taski brauseri Local Storage

    taskInput.value = ""; // teeme Add taski kasti (ehk input välja) tühjaks pärast iga sisestust
    event.preventDefault(); // kontrollib, kas vorm Submit töötab
}


function deleteTask(event) {
    if(event.target.textContent == "X") {
        if(confirm("Do you want to delete this task?")) {
            event.target.parentElement.remove();
        }
    }
}


// saab kasutada ka tasksList.innterHTML = "", st kirjutab üle kõik sisetatud teksti, kuid see on ajamahukas protsess, removeChild teeb kiiremini
function deleteTasks() {
    if(confirm("Do you want to delete all tasks?")) {
        while(tasksList.firstElementChild) {
            tasksList.removeChild(tasksList.firstChild);
        }
    }
}


function saveTaskToLocalStorage(task) {
    let tasks;
    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    }   else {
            tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    console.log(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
}

