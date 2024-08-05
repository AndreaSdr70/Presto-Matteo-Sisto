// .json: JavaScript Object Notification

// API

// .fetch(): chiamata asincrona che ci permette di colegarci ad un JSON e da esso estrarne il dato sotto forma di Promise.

// .then(): Questo metodo permette di convertire la Promise nel dato Strutturale e di poterlo utilizzare come tale su JS

// 1. fetc() = collego al json e ne ottengo una promise
// 2. then() = converto la promise in un dato strutturale JS
// 3. then() = utilizzare ilk dato ottenuto

// .json(): metodo delle promise che mi permette di convertirla in Oggetto JS

fetch('./annunci.json').then((response)=>response.json()).then((data)=> {
    data.sort((a, b) => a.price - b.price);

    let radioWrapper = document.querySelector('#radioWrapper');
    let cardWrapper = document.querySelector('#cardWrapper');



    function radioCreate(){
        let categories = data.map((annuncio)=> annuncio.category);

        // let uniqueCategories = [];

        // // !true
        // //!false

        // categories.forEach((category)=>{
        //     if(!uniqueCategories.includes(category)){
        //     }               
        // });

        // Set():
        // Array.from(): mi permette di convertire un array-linke in un array

        let uniqueCategories = Array.from(new Set (categories));
        
        uniqueCategories.forEach((category)=>{

            let div = document.createElement('div'); // passaggio 1
            div.classList.add('form-check'); // passaggio 2
            div.innerHTML = `<input class="form-check-input" type="radio" name="categories" id="${category}">
                  <label class="form-check-label" for="${category}">
                    ${category}
                  </label> 
            `; // passaggio 3

            radioWrapper.appendChild(div); //Passaggio 4
        });

    }
    radioCreate();

    function truncateWord(string){
        if(string.length > 15){
            return string.split(' ')[0] + '...';
        }else{
            return string;
        }
    }

    function showCards(array){
        cardWrapper.innerHTML = '';
         array.forEach((annuncio, i)=> {
            let div = document.createElement('div');
            div.classList.add('card-custom');
            div.innerHTML = `
                <img src="https://picsum.photos/${300 + i}" alt="immagine casuale" class="img-fluid img-card">            
                <p class="h2" title="${annuncio.name}">${truncateWord(annuncio.name)}</p>
                <p class="h4">${annuncio.category}</p>
                <p class="lead">${annuncio.price} €</p>
            `;
            cardWrapper.appendChild(div);
         });
    }

    showCards(data);
// In qusta funzione ho bisogno di ottenere un nuovo array, partendo da data e gli elementi del nuovo array dovranno soddisfare la condizioneper la quale la loro category sia uguale alla categoriache stiamo passando alla funzione
let radioButtons = document.querySelectorAll('.form-check-input');
    function filterByCategory(array){

        // La categoria voglio 
        let categoria = Array.from(radioButtons).find((button)=>button.checked).id;
        // let arrayFromNodeList = Array.from(radioButtons);
        // let button = arrayFromNodeList.find((bottone)=> bottone.checked);
        // let categoria = button.id;
       // console.log(categoria);
        
        if(categoria != 'All'){       
        let filtered = array.filter((annuncio)=> annuncio.category == categoria);
        // console.log(filtered)
        return filtered; //showCards(filtered);
         }else{
            return array;//    showCards(data);
         }
    }
    

    
    radioButtons.forEach((button)=> {
        button.addEventListener('click', ()=>{
            setPriceInput();
            globalFilter();
            //filterByCategory();
           // filterByCategory(button.id);
        })
    });

    let priceInput = document.querySelector('#priceInput');
    let priceValue = document.querySelector('#priceValue');

function setPriceInput(){

    //Dopo aver catturato l'input voglio settare come proprietà max dello stesso il valore più alto tra i price di ogni prodotto di ogni annuncio. Per farlo avrò quindi bisogno di un array che contenga solo i prezzi, a quel punto lo ordino in maniera crescente/decrescente e prendermi l'elemento con il valore più alto. 
    let prices = filterByCategory(data).map((annuncio)=> +annuncio.price);
    prices.sort((a, b)=> a -b );
    let maxPrice = Math.ceil(prices.pop());
    priceInput.max = maxPrice;
    priceInput.value = maxPrice;
    priceValue.innerHTML = maxPrice;

}

setPriceInput();

function filterByPrice(array){
    let filtered = array.filter((annuncio)=> +annuncio.price <= priceInput.value);
   return filtered;
}

priceInput.addEventListener('input', ()=>{
    priceValue.innerHTML = priceInput.value;
    globalFilter();
});

let wordInput = document.querySelector('#wordInput');
function filterByWord(array){
    let filtered = array.filter((annuncio)=> annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()));
   return filtered;
}

wordInput.addEventListener('input', ()=>{
    globalFilter();
});

//Quello di cui abbiamo bisogno è che ad ogni evento scattino tutte e tre le funzioni di filtro ma non sianoapplicate tutte e tre sull'array data, bensi siano concatenate ed ognuna filtri il risultato della funzione di filtro precedente.

function globalFilter(){
    let filteredByCategory = filterByCategory(data); //Undefined no - ma ora un array filtrato per categoria
    let filteredByPrice = filterByPrice(filteredByCategory); // mi ritorna array filtrato sia per categoria che per prezzo
    let filteredByWord = filterByWord(filteredByPrice); // mi ritorna un array filtrato per categoria prezzo e pure parola

    showCards(filteredByWord);
}



});
