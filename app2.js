// Koduõppe JS ehk siis nn puhtand

// sündmuste elemendid
const form = document.querySelector("form");
const taskInput = document.querySelector("#task");
const tasksList = document.querySelector(".collection")
const deleteAllTasks = document.querySelector("#delete-tasks");

// sündmused
form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
deleteAllTasks.addEventListener("click", deleteTasks);
document.addEventListener("DOMContentLoaded", getTasksFromLocalStorage);


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
    if(event.target.textContent === "X") {
        if(confirm("Do you want to delete this task?")) {
            event.target.parentElement.remove();
            task = event.target.parentElement.firstChild.textContent;
            deleteTaskFromLocalStorage(task);
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
    deleteAllTasksFromLocalStorage();
}


function saveTaskToLocalStorage(task) {
    let tasks;
    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    }   else {
            tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
}


function deleteTaskFromLocalStorage(task) {
    let tasks;
    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    }   else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    // kasutame forEach meetodit, et välja lugeda massiivi elemendi väärtust ja indeksit ning splice meetodi abil kustutame selle massiivi elemendi (on olemas ka delete meetod, kuid see jätab elemendi kohale undefined koha)
    tasks.forEach(function (tasksValue, index) {
        if(tasksValue === task) {
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
}


function deleteAllTasksFromLocalStorage() {
    // lihtne lahendus: localStorage.clear(); ehk teeb sama, kui vajutad ise LocalStorages Clear nuppu, kuid kui LocalStorages on olemas mitu massiivi, siis clear kustutab kõik. Kui LocalStorages on olemas ainult üks massiiv või eesmärk ongi kustutada kogu LocalStorage sisu, siis sobib clear() meetod hästi
    let tasks;
    if(localStorage.getItem("tasks") === null) {
        tasks = [];
        localStorage.setItem("tasks", JSON.stringify(tasks)); // lisame juurde, et ka tühja massiivi korral saaks kustutada (oleks nn sisu massiivil olemas)
        // else lahendust pole vaja, kuna massiivi olemasolul nagunii see kustutatakse
    }
    localStorage.removeItem("tasks");
}

// võtab varem salvestatud ülesanded LocalStorage'st
function getTasksFromLocalStorage() {
    let tasks;
    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    }   else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function (tasksValue) {
        const li = document.createElement("li");
        li.className ="collection-item";
        const taskText = document.createTextNode(tasksValue);
        li.appendChild(taskText);
        // loome lingitava elemendi ja lingi atribuudi
        const link = document.createElement("a");
        link.setAttribute("href", "#");
        link.className = "secondary-content";
        link.appendChild(document.createTextNode("X"));  // loome kustutamise nupu (X-i)
        li.appendChild(link);
        const ul = document.querySelector(".collection");
        ul.appendChild(li);
    });
}