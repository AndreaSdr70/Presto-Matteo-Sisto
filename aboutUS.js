let opener  = document.querySelector('.opener');
let circle = document.querySelector('.circle');


let teachers = array = [
    {name: 'Matteo', description: 'Docente Frontend di Hackademy69', url: './media/Matteo.png'},
    {name: 'Marco', description: 'Docente Frontend e responsabile Hackademy', url: './media/Marco.png'},
    {name: 'Nicola', description: 'Docente Frontend e noto sex-symbol', url: './media/Nicola.png'},
    {name: 'Davide', description: 'Docente Backend e giocatore di ruolo', url: './media/Davide.png'},
];

teachers.forEach((docente)=>{
    let div = document.createElement('div');
    div.classList.add('moved');
    div.style.backgroundImage = `url(${docente.url})`;
    circle.appendChild(div);
})


let movedDivs = document.querySelectorAll('.moved');

let check = false;

let flipCard = document.querySelector('.flip-card');

let cardWrapper = document.querySelector('#cardWrapper');

opener.addEventListener('click', ()=>{
    if(check == false){
        opener.style.transform = 'rotate(45deg)';
        movedDivs.forEach((moved, i)=> {
                let angle = (360 * i) / movedDivs.length;
                moved.style.transform = `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`;
   });
   check = true
    } else {
        check = false;
            opener.style.transform = '';
            movedDivs.forEach((moved, i)=> {
                moved.style.transform = ``;
});
flipCard.classList.add('d-none');
    }
    
});


let cardName = document.querySelector('#cardName');
let cardDescription = document.querySelector('#cardDescription');


movedDivs.forEach((moved, i)=> {
    moved.addEventListener('click', ()=>{
        // flipCard.classList.remove('d-none');
        let docente = teachers[i];
        cardWrapper.innerHTML = '';
        let div = document.createElement('div');
        div.classList.add('flip-card');
        div.innerHTML = `
        <div class="inner">
        <div class="inner-face"></div>
        <div class="inner-back">
            <p id="cardName" class="h4">${docente.name}</p>
            <p id ="cardDescription"class="lead">${docente.description}</p>
            </div>
        </div>
        
        `;
        cardWrapper.appendChild(div);
        let innerFace = document.querySelector('.inner-face');
        innerFace.style.backgroundImage = `url(${docente.url})`;
        

    });
});