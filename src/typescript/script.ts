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

const addNote = (elem: HTMLElement) => {
    const timeNow: Date = new Date();
    // ? getting all data which to keep save
    let note: HTMLParagraphElement = elem?.parentNode?.parentNode?.querySelector('p')!; // Text entered by the user
    let noteTime: string = timeNow.toLocaleTimeString(); // current time
    let cardType: string = elem.parentElement?.parentElement?.parentElement?.classList[1]!; // card type
    // ? pushing all values in seprate arrays 
    notes.push(note.innerText);
    notesTime.push(noteTime);
    notesCardType.push(cardType);
    // ? updating the localstorage
    updateLocalStorage();
    // ? displaying the new added notes in DOM
    displayNotes();
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
// * index number to replace
let card_i : number;
const editDivOpen = (t: HTMLElement) => {
    // ? hiding the editBox
    const ebox : HTMLElement = t.parentElement?.parentElement!;
    ebox.style.display = 'none';
    // ? getting info about card
    let card_html: HTMLElement = t.parentElement?.parentElement?.parentElement!;
    let card_text: string = t.parentElement?.parentElement?.parentElement?.children[0].children[0].children[0].textContent!;
    card_i  = get_i_by_text(card_text , notes);

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

const replaceNote = (e: any) => {
    const timeNow: Date = new Date();
    // ? getting all data which to keep save
    let note: string = e.parentNode.parentNode.querySelector('p').innerText; // Text entered by the user
    let noteTime: string = timeNow.toLocaleTimeString(); // current time
    let cardType: string = e.parentElement?.parentElement?.parentElement?.classList[1]; // card type
    
    // ? saving the index number which has to replace
    const ith_to_replace: number = card_i;
    // ? replacing the values
    notes.splice(ith_to_replace, 1, note);
    notesTime.splice(ith_to_replace, 1, noteTime);
    notesCardType.splice(ith_to_replace, 1, cardType);
    // ? updating the localstorage
    updateLocalStorage();
    // ? displaying the new added notes in DOM
    displayNotes();
}

// ! delete the note
const deleteNote = (t: HTMLElement) => {
    // ? find the note to delete
    const noteToDelete: string = t.parentElement?.parentElement?.parentElement?.children[0].children[0].children[0].textContent!;
    // ? finding the index number which to delete
    const ith_to_delete: number = get_i_by_text(noteToDelete , notes);
    // ? delete that element from the given index number
    notes.splice(ith_to_delete, 1);
    notesTime.splice(ith_to_delete, 1);
    notesCardType.splice(ith_to_delete, 1);
    updateLocalStorage();
    // ? removing the card from dom
    const card: HTMLElement = t.parentElement?.parentElement?.parentElement!;
    card.style.display = 'none';
}

const get_i_by_text = (t: string, arr: string[]) => {
    const ith = arr.findIndex((e) => {
        return e == t;
    })
    return ith;
}
displayNotes();

// ? Card Btn Open Animation 
const noteAdderBtns: HTMLElement = document.getElementById('noteAdderBtns')!;
const noteBoxAniBtn: HTMLElement = document.getElementById('noteBoxAniBtn')!;
noteBoxAniBtn.addEventListener('click', () => {
    noteAdderBtns.classList.toggle('active');
})

// ? showing the settings div aniamation
const showEditBox = (t: Element) => {
    const eb = t.parentElement?.parentElement?.parentElement?.children[1]  as HTMLElement;
    eb.style.display = 'grid';
}
// ? hiding the settings div aniamation
const hideEditBox = (t: Element) => {
    const eb: HTMLElement = t?.parentElement!;
    eb.style.display = 'none';
}

// ? searching for notes
const search = (t : HTMLInputElement) => {
    let searchQuery : string = t.value;
    let notes_text : HTMLCollectionOf<HTMLParagraphElement> = document.getElementsByTagName('p');
    
    for(const n of notes_text){
        let note_text = n.innerText.toLowerCase();
        let curr_Card : HTMLElement = n.parentElement?.parentElement?.parentElement!;
        console.log(curr_Card);
        
        if(note_text.includes(searchQuery)){
            curr_Card.style.display = 'flex';
        }
        else{
            curr_Card.style.display = 'none';
        }
    }
}


// ? Showing used size in DOM

const sizeShower : HTMLElement = document.getElementById('size')!;

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
};
let used : string = `${(_lsTotal / 1024).toFixed(2)}KB`;
sizeShower.innerText = used;

