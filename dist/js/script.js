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
    var _a, _b, _c, _d, _e;
    const timeNow = new Date();
    // ? getting all data which to keep save
    let note = (_b = (_a = elem === null || elem === void 0 ? void 0 : elem.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.querySelector('p'); // Text entered by the user
    let noteTime = timeNow.toLocaleTimeString(); // current time
    let cardType = (_e = (_d = (_c = elem.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.classList[1]; // card type
    // ? pushing all values in seprate arrays 
    notes.push(note.innerText);
    notesTime.push(noteTime);
    notesCardType.push(cardType);
    // ? updating the localstorage
    updateLocalStorage();
    // ? displaying the new added notes in DOM
    displayNotes();
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
// * index number to replace
let card_i;
const editDivOpen = (t) => {
    var _a, _b, _c, _d, _e, _f;
    // ? hiding the editBox
    const ebox = (_a = t.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
    ebox.style.display = 'none';
    // ? getting info about card
    let card_html = (_c = (_b = t.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement;
    let card_text = (_f = (_e = (_d = t.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.parentElement) === null || _f === void 0 ? void 0 : _f.children[0].children[0].children[0].textContent;
    card_i = get_i_by_text(card_text, notes);
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
const replaceNote = (e) => {
    var _a, _b, _c;
    const timeNow = new Date();
    // ? getting all data which to keep save
    let note = e.parentNode.parentNode.querySelector('p').innerText; // Text entered by the user
    let noteTime = timeNow.toLocaleTimeString(); // current time
    let cardType = (_c = (_b = (_a = e.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.classList[1]; // card type
    // ? saving the index number which has to replace
    const ith_to_replace = card_i;
    // ? replacing the values
    notes.splice(ith_to_replace, 1, note);
    notesTime.splice(ith_to_replace, 1, noteTime);
    notesCardType.splice(ith_to_replace, 1, cardType);
    // ? updating the localstorage
    updateLocalStorage();
    // ? displaying the new added notes in DOM
    displayNotes();
};
// ! delete the note
const deleteNote = (t) => {
    var _a, _b, _c, _d, _e;
    // ? find the note to delete
    const noteToDelete = (_c = (_b = (_a = t.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.children[0].children[0].children[0].textContent;
    // ? finding the index number which to delete
    const ith_to_delete = get_i_by_text(noteToDelete, notes);
    // ? delete that element from the given index number
    notes.splice(ith_to_delete, 1);
    notesTime.splice(ith_to_delete, 1);
    notesCardType.splice(ith_to_delete, 1);
    updateLocalStorage();
    // ? removing the card from dom
    const card = (_e = (_d = t.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.parentElement;
    card.style.display = 'none';
};
const get_i_by_text = (t, arr) => {
    const ith = arr.findIndex((e) => {
        return e == t;
    });
    return ith;
};
displayNotes();
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
// ? searching for notes
const search = (t) => {
    var _a, _b;
    let searchQuery = t.value;
    let notes_text = document.getElementsByTagName('p');
    for (const n of notes_text) {
        let note_text = n.innerText.toLowerCase();
        let curr_Card = (_b = (_a = n.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
        console.log(curr_Card);
        if (note_text.includes(searchQuery)) {
            curr_Card.style.display = 'flex';
        }
        else {
            curr_Card.style.display = 'none';
        }
    }
};
// ? Showing used size in DOM
const sizeShower = document.getElementById('size');
// Copied from stack overflow
let _lsTotal = 0, _xLen, _x;
for (_x in localStorage) {
    if (!localStorage.hasOwnProperty(_x)) {
        continue;
    }
    _xLen = ((localStorage[_x].length + _x.length) * 2);
    _lsTotal += _xLen;
    // for each item of localstorage
    // console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
}
;
let used = `${(_lsTotal / 1024).toFixed(2)}KB`;
sizeShower.innerText = used;
