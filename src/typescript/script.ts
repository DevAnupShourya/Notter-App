// Card Btn Open Animation 
const noteAdderBtns: HTMLElement = document.getElementById('noteAdderBtns')!;
const noteBoxAniBtn: HTMLElement = document.getElementById('noteBoxAniBtn')!;
noteBoxAniBtn.addEventListener('click', () => {
    noteAdderBtns.classList.toggle('active');
})

// All Card 
const purpleDivOpener: HTMLElement = document.getElementById('purpleDivOpener')!;
const greenDivOpener: HTMLElement = document.getElementById('greenDivOpener')!;
const whiteDivOpener: HTMLElement = document.getElementById('whiteDivOpener')!;
const yelloDivOpener: HTMLElement = document.getElementById('yelloDivOpener')!;

// notes list
const noteList: HTMLElement = document.querySelector('.noteList')!;
let num: number = 1;

// all card types 
const card: Element[] = [purpleDivOpener, greenDivOpener, whiteDivOpener, yelloDivOpener];

card.forEach((e) => {
    e.addEventListener('click', () => {
        // getting card type
        const cardName: string = e.attributes[1].value;

        // getting curent date
        const d = new Date;
        let dateNow = d.toLocaleDateString();

        // blank card
        let blankCard: string = `<div id="${num}" class="card ${cardName}"><div class="content"><div class="textContent"><p contenteditable>  Write Here </p></div><div class="editContent"><h4 class="date"> ${dateNow}</h4><h3 id="${num}-editBtn" class="editBtn"> <i class="fa-regular fa-circle-check"></i></h3>
        </div></div><div class="editBox"><h1 class="moveBack"><i class="fa-solid fa-circle-arrow-left"></i></h1><div class="icons"><i class="fa-regular fa-pen-to-square"></i><i class="fa-regular fa-trash-can"></i></div></div></div>`;
        num++;

        let c = blankCard;;
        noteList.innerHTML = c + noteList.innerHTML;

    })
});