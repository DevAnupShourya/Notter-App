// ? All Card Opener btns
const purpleDivOpener: HTMLElement = document.getElementById('purpleDivOpener')!;
const greenDivOpener: HTMLElement = document.getElementById('greenDivOpener')!;
const whiteDivOpener: HTMLElement = document.getElementById('whiteDivOpener')!;
const yelloDivOpener: HTMLElement = document.getElementById('yelloDivOpener')!;
// ? notes lists showing div
const noteList: HTMLElement = document.querySelector('.noteList')!;
// ? all card types 
const cardTypes: Element[] = [purpleDivOpener, greenDivOpener, whiteDivOpener, yelloDivOpener];
// ? Gettting card type and rendering it in dom
let cardType: string;
cardTypes.forEach((e) => {
    e.addEventListener('click', () => {
        displayEditDiv(e);
    })
})
// ? displaying editor div of cardType
const displayEditDiv = (e: Element) => {
    let card_Type: string = e.attributes[1].value;
    // * Editor div as html 
    noteList.innerHTML = `
    <div class="card ${card_Type}">
        <div class="content">
            <div class="textContent">
                <p contenteditable class="user_input">Write Here </p>
            </div>
            <div class="editContent">
                <h3 class="saveBtn" onclick='addNote(this)'>
                    <i class="fa-regular fa-circle-check"></i>
                </h3>
            </div>
        </div>
    </div>` + noteList.innerHTML;
}

// ! Array of all values that to keep save in localstorage
let notes: string[] = JSON.parse(localStorage.getItem('notes') || '[]'); // All Text/Notes
let notesTime: string[] = JSON.parse(localStorage.getItem('notesTime') || '[]'); // Last Editing Time
let notesCardType: string[] = JSON.parse(localStorage.getItem('notesCardType') || '[]'); // Notes Type

const addNote = (elem: string) => {
    const timeNow: Date = new Date();
    // ? getting all data which to keep save
    let note: string = elem.parentNode.parentNode.querySelector('p').innerText; // Text entered by the user
    let noteTime: string = timeNow.toLocaleTimeString(); // current time
    let cardType: string = elem.parentElement?.parentElement?.parentElement?.classList[1]; // card type
    // ? pushing all values in seprate arrays 
    notes.push(note);
    notesTime.push(noteTime);
    notesCardType.push(cardType);
    // ? updating the localstorage
    updateLocalStorage();
    // ? displaying the new added notes in DOM
    displayNotes();
}

const replaceNote = (e : any) => {
    const timeNow: Date = new Date();
    // ? getting all data which to keep save
    let note: string = e.parentNode.parentNode.querySelector('p').innerText; // Text entered by the user
    let noteTime: string = timeNow.toLocaleTimeString(); // current time
    let cardType: string = e.parentElement?.parentElement?.parentElement?.classList[1]; // card type
    const noteToReplace : string = note;
    // ! first save the older note and find it in notes array then 
    // const ith_to_replace: number = 1;
    // replace notes.replace()
    console.log(ith_to_replace);
    
    // ? updating the localstorage
    // updateLocalStorage();
    // // ? displaying the new added notes in DOM
    // displayNotes();
}

const updateLocalStorage = () => {
    // ? saving the new values after converting then into string :
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('notesTime', JSON.stringify(notesTime));
    localStorage.setItem('notesCardType', JSON.stringify(notesCardType));
}

const displayNotes = () => {
    // ? deleting all cards 
    noteList.innerHTML = '';
    // ? getting same value for one note and rendering it in DOM
    notes.forEach((note, i) => {
        let text: string = note;
        let time: string = notesTime[i];
        let cardColor: string = notesCardType[i];
        let currCard: string = `
        <div class="card ${cardColor}">
        <div class="content">
            <div class="textContent">
                <p>${text}</p>
            </div>
            <div class="editContent">
                <h4 class="date">${time}</h4>
                <h3 class="editBtn" onclick="showEditBox(this)"> <i class="fa-solid fa-sliders"></i> </h3>
            </div>
        </div>
        <div class="editBox">
            <h1 class="moveBack" onclick="hideEditBox(this)"><i class="fa-solid fa-circle-arrow-left"></i></h1>
            <div class="icons">
                <i onclick="editDivOpen(this)"class="fa-regular fa-pen-to-square"></i>
                <i onclick="deleteNote(this)"class="fa-regular fa-trash-can"></i>
            </div>
        </div>
    </div>`;
        noteList.innerHTML = currCard + noteList.innerHTML;
    })
}
const editDivOpen = (t: HTMLElement) => {
    // ? hiding the editBox
    t.parentElement?.parentElement?.style.display = 'none';
    // ? getting info about card
    let card_html: HTMLElement = t.parentElement?.parentElement?.parentElement!;
    let card_type: string = t.parentElement?.parentElement?.parentElement?.classList[1]!;
    let card_text: string = t.parentElement?.parentElement?.parentElement?.children[0].children[0].children[0].textContent!;

    card_html.innerHTML = `
    <div class="content">
        <div class="textContent">
            <p contenteditable class="user_input">${card_text}</p>
        </div>
        <div class="editContent">
            <h3 class="saveBtn" onclick='replaceNote(this)'>
                <i class="fa-regular fa-circle-check"></i>
            </h3>
        </div>
    </div>`;
}

// ! delete the note
const deleteNote = (t: HTMLElement) => {
    // ? find the note to delete
    const noteToDelete: string = t.parentElement?.parentElement?.parentElement?.children[0].children[0].children[0].textContent!;
    // ? finding the index number which to delete
    const ith_to_delete: number = know_ith_element(notes, noteToDelete);
    // ? delete that element from the given index number
    notes.splice(ith_to_delete, 1);
    notesTime.splice(ith_to_delete, 1);
    notesCardType.splice(ith_to_delete, 1);
    updateLocalStorage();
    // ? removing the card from dom
    const card: HTMLElement = t.parentElement?.parentElement?.parentElement!;
    card.style.display = 'none';
}
const know_ith_element = (arr: string[], text_to_find: string) => {
    let ith: number;
    for (let j = 0; j < notes.length; j++) {
        if (notes[j] == text_to_find) {
            ith = j;
        }
    }
    return ith;
}

displayNotes();

// for removing text when clicking on any input
// const u_i = document.querySelectorAll('.user_input')!;
// console.log(u_i);

// u_i.forEach( (e) => {
//     e.addEventListener('focus', (ev) => {
//         // ev.target.innerText = '';
//     })
// }) 

/*
JSON.parse() -> s - o  A common use of JSON is to exchange data to/from a web server.When receiving data from a web server, the data is always a string. Parse the data with JSON.parse(), and the data becomes a JavaScript object.

JSON.stringify() ->  common use of JSON is to exchange data to/from a web server.When sending data to a web server, the data has to be a string.Convert a JavaScript object into a string with JSON.stringify().
*/
/*
<div class="card ${cardName}">
    <div class="content">
        <div class="textContent">
            <p contenteditable>  Write Here </p>
        </div>
        <div class="editContent">
            <h4 class="date"> ${dateNow}</h4>
            <h3 id="${num}-editBtn" class="saveBtn" onclick='saveNote(this)'>
                <i class="fa-regular fa-circle-check"></i>
            </h3>
        </div>
    </div>
</div>
*/

/*
* It is for getting size of localstorage

var _lsTotal = 0,
    _xLen, _x;
for (_x in localStorage) {
    if (!localStorage.hasOwnProperty(_x)) {
        continue;
    }
    _xLen = ((localStorage[_x].length + _x.length) * 2);
    _lsTotal += _xLen;
    console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
};
console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
*/

// ? Card Btn Open Animation 
const noteAdderBtns: HTMLElement = document.getElementById('noteAdderBtns')!;
const noteBoxAniBtn: HTMLElement = document.getElementById('noteBoxAniBtn')!;
noteBoxAniBtn.addEventListener('click', () => {
    noteAdderBtns.classList.toggle('active');
})

// ? showing the settings div aniamation
const showEditBox = (t: Element) => {
    const eb: Element = t.parentElement?.parentElement?.parentElement?.children[1]!;
    eb.style.display = 'grid';
}
// ? hiding the settings div aniamation
const hideEditBox = (t: Element) => {
    const eb: HTMLElement = t?.parentElement!;
    eb.style.display = 'none';
}