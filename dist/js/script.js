"use strict";
// ? All Card Opener btns
const purpleDivOpener = document.getElementById('purpleDivOpener');
const greenDivOpener = document.getElementById('greenDivOpener');
const whiteDivOpener = document.getElementById('whiteDivOpener');
const yelloDivOpener = document.getElementById('yelloDivOpener');
// ? notes lists showing div
const noteList = document.querySelector('.noteList');
// ? all card types 
const cardTypes = [purpleDivOpener, greenDivOpener, whiteDivOpener, yelloDivOpener];
// ? Gettting card type and rendering it in dom
let cardType;
cardTypes.forEach((e) => {
    e.addEventListener('click', () => {
        displayEditDiv(e);
    });
});
// ? displaying editor div of cardType
const displayEditDiv = (e) => {
    let card_Type = e.attributes[1].value;
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
};
// ! Array of all values that to keep save in localstorage
let notes = JSON.parse(localStorage.getItem('notes') || '[]'); // All Text/Notes
let notesTime = JSON.parse(localStorage.getItem('notesTime') || '[]'); // Last Editing Time
let notesCardType = JSON.parse(localStorage.getItem('notesCardType') || '[]'); // Notes Type
const addNote = (elem) => {
    var _a, _b, _c;
    const timeNow = new Date();
    // ? getting all data which to keep save
    let note = elem.parentNode.parentNode.querySelector('p').innerText; // Text entered by the user
    let noteTime = timeNow.toLocaleTimeString(); // current time
    let cardType = (_c = (_b = (_a = elem.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.classList[1]; // card type
    // ? pushing all values in seprate arrays 
    notes.push(note);
    notesTime.push(noteTime);
    notesCardType.push(cardType);
    // ? updating the localstorage
    updateLocalStorage();
    // ? displaying the new added notes in DOM
    displayNotes();
};
const replaceNote = (e) => {
    var _a, _b, _c;
    const timeNow = new Date();
    // ? getting all data which to keep save
    let note = e.parentNode.parentNode.querySelector('p').innerText; // Text entered by the user
    let noteTime = timeNow.toLocaleTimeString(); // current time
    let cardType = (_c = (_b = (_a = e.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.classList[1]; // card type
    const noteToReplace = note;
    // ! first save the older note and find it in notes array then 
    // const ith_to_replace: number = 1;
    // replace notes.replace()
    console.log(ith_to_replace);
    // ? updating the localstorage
    // updateLocalStorage();
    // // ? displaying the new added notes in DOM
    // displayNotes();
};
const updateLocalStorage = () => {
    // ? saving the new values after converting then into string :
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('notesTime', JSON.stringify(notesTime));
    localStorage.setItem('notesCardType', JSON.stringify(notesCardType));
};
const displayNotes = () => {
    // ? deleting all cards 
    noteList.innerHTML = '';
    // ? getting same value for one note and rendering it in DOM
    notes.forEach((note, i) => {
        let text = note;
        let time = notesTime[i];
        let cardColor = notesCardType[i];
        let currCard = `
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
    });
};
const editDivOpen = (t) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    // ? hiding the editBox
    (_b = (_a = t.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.style.display = 'none';
    // ? getting info about card
    let card_html = (_d = (_c = t.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement;
    let card_type = (_g = (_f = (_e = t.parentElement) === null || _e === void 0 ? void 0 : _e.parentElement) === null || _f === void 0 ? void 0 : _f.parentElement) === null || _g === void 0 ? void 0 : _g.classList[1];
    let card_text = (_k = (_j = (_h = t.parentElement) === null || _h === void 0 ? void 0 : _h.parentElement) === null || _j === void 0 ? void 0 : _j.parentElement) === null || _k === void 0 ? void 0 : _k.children[0].children[0].children[0].textContent;
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
};
// ! delete the note
const deleteNote = (t) => {
    var _a, _b, _c, _d, _e;
    // ? find the note to delete
    const noteToDelete = (_c = (_b = (_a = t.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.children[0].children[0].children[0].textContent;
    // ? finding the index number which to delete
    const ith_to_delete = know_ith_element(notes, noteToDelete);
    // ? delete that element from the given index number
    notes.splice(ith_to_delete, 1);
    notesTime.splice(ith_to_delete, 1);
    notesCardType.splice(ith_to_delete, 1);
    updateLocalStorage();
    // ? removing the card from dom
    const card = (_e = (_d = t.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.parentElement;
    card.style.display = 'none';
};
const know_ith_element = (arr, text_to_find) => {
    let ith;
    for (let j = 0; j < notes.length; j++) {
        if (notes[j] == text_to_find) {
            ith = j;
        }
    }
    return ith;
};
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
const noteAdderBtns = document.getElementById('noteAdderBtns');
const noteBoxAniBtn = document.getElementById('noteBoxAniBtn');
noteBoxAniBtn.addEventListener('click', () => {
    noteAdderBtns.classList.toggle('active');
});
// ? showing the settings div aniamation
const showEditBox = (t) => {
    var _a, _b, _c;
    const eb = (_c = (_b = (_a = t.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.children[1];
    eb.style.display = 'grid';
};
// ? hiding the settings div aniamation
const hideEditBox = (t) => {
    const eb = t === null || t === void 0 ? void 0 : t.parentElement;
    eb.style.display = 'none';
};
