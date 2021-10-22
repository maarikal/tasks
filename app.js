const form = document.querySelector("form");
// kirjuta document.querySelector(" --- ja nüüd vajuta Tab-i, siis võtab selectori käsu automaatselt.
// kirjuta ...querySelectorAll, kui tahad mitut formi valida

const taskList = document.querySelector(".collection");

form.addEventListener("submit", addTask);
// element jälgib sündmust, läheb submit ning tuleb panna ka, kuhu ta läheb (st tegevuse nime), addTask on Anna enda väljamõeldud nimi

taskList.addEventListener("click", deleteTask);

/* function deleteTask(event) {
    if(event.target.textContent) == "X" {
        console.log(event.target.parentElement);  // et näeks brauseris, kust see pärineb, kes on parent
    }
} */

function deleteTask(event) {
    if(event.target.textContent === "X" ) {
        if (confirm("Do you want to delete this task?")) {
            event.target.parentElement.remove();
        }
    }
}


//console.log(form) -- trükib brauseri konsooli, et mis real on form olemas

// JS ja Javas võib olla koodi järjekord sassis, st nt sündmuse defineerid üleval ja all on alles käsk, ta ei loe koodi ainult ülalt alla

/* function addTask(event) {
    console.log(event);  // saab kirjutada veel console.log'i (event.type ja event.target)
    event.preventDefault(); //see käsk peatab tegevust, et oleks näha üritust brauseri konsoolis
}
*/

function addTask(event) {
    const taskInput = document.querySelector("#task");
    let task = taskInput.value;
    // create <li> element
    const li = document.createElement("li");
    // lisame nüüd css klassi
    li.className = "collection-item";    // kui on mitu klassi, siis paneme classList; kui üks, siis li.class
    // create text element
    const text = document.createTextNode(task);
    // add text to list items (<li>
    li.appendChild(text);

    // create <a> element
    const link = document.createElement("a");
    // add css class
    link.className = "secondary-content";
    // set href attribute to <a>
    link.setAttribute("href", "#");

    // add text content to <a>
    link.appendChild(document.createTextNode("X"));
    // add <a> to <li>
    li.appendChild(link);

    // add li to ul
    const ul = document.querySelector(".collection");
    ul.appendChild(li);

    event.preventDefault();
}  // koodi muutmiseks parem hiirklikk nime peal, sealt Reactor, sealt Rename
