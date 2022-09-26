localStorage.setItem("initialpagination", 0);

let number = 0

//Infinite Scroll
$(window).on("scroll", function() {
    //page height
    let scrollHeight = $(document).height();
    //scroll position
    let scrollPos = $(window).height() + $(window).scrollTop();
    // fire if the scroll position is 300 pixels above the bottom of the page
    if(((scrollHeight - 300) >= scrollPos) / scrollHeight == 0){
             // $('.load-more-days-button').click();
      //       let search = document.getElementById('busqueda').value;
    //console.log(search);
    //console.log('lo que sea');
    let textInput = $('#busqueda').val()
    let pagination = number + 1
    console.log(pagination)
    infiniteScroll(textInput, pagination)
     }
   });
 
//Constantes y variables
const url = 'https://api.giphy.com/v1/gifs/search';
let busqueda = '?q=';
const key = '&api_key=Da8CvTH1nO2zMgOZhqLPDZyrJkjWP0te';
const limite = '&limit=20';
const urlTrading = 'https://api.giphy.com/v1/gifs/trending?api_key=Da8CvTH1nO2zMgOZhqLPDZyrJkjWP0te';

let q = "";

let urlCompleta = "";

const btn = document.getElementById('btn');

// boton de Busqueda 
btn.onclick = () =>{

    document.getElementById("portfolio").innerHTML = "";

    q = document.getElementById('busqueda').value;
    urlCompleta = url + busqueda + q + key + limite;
    getData();
}

//LocalStorage
const getLocal = () => {
    return JSON.parse(localStorage.getItem("lastSearch"));
};

//Busqueda de gifs
const getData = async () => {
    
    await fetch(urlCompleta).then((response) => {
        return response.json();
    }).then((giphy) => {
        let data = giphy.data.length;
        if (data <= 0)
        resultadoBusqueda(giphy.data.length);
        
        
    for(let i = 0; i < giphy.data.length; i++ ){

        const gif = document.createElement('img');
        
        gif.src = giphy.data[i].images["original"].url;
        gif.className = "imagen-creada";
        document.getElementById("portfolio").appendChild(gif);
    
    
    }
    
    
})
}

getData();

//Carga dinamica de trading
const trending = async () => {
    await fetch(urlTrading).then((response) => {
        return response.json();
    }).then((giphy) => {
        for(let i = 0; i < giphy.data.length; i++){

            const gif = document.createElement('img');
            gif.src = giphy.data[i].images["original"].url;
            gif.className = "imagen-creadaa";
            document.getElementById("portfolio").appendChild(gif);
        }
    })
}

//Resultados

let resultadoBusqueda = (data) => {
    document.getElementById("portfolio").innerHTML="Resultado sin informacion, intente con algo mas";
    //console.log(data);
}

//Infinitiititi scroll
const infiniteScroll = async (data, number) => {

    let url= 'https://api.giphy.com/v1/gifs/';
    let key='search?api_key=Da8CvTH1nO2zMgOZhqLPDZyrJkjWP0te';
    let textSearch='&q=';
    let offset = "&offset=";
    let pagination = localStorage.getItem("initialpagination")+2;
    let urlCompleta = `${url}${key}${textSearch}${data}${offset}${pagination}`
    console.log(pagination)

    await fetch(urlCompleta).then((response) => {
        return response.json();
    }).then((giphy) => {
        let data = giphy.data.length;
        if (data <= 0)
        resultadoBusqueda(giphy.data.length);
        

    for(let i = 0; i < giphy.data.length; i++ ){

        const gif = document.createElement('img');

        gif.src = giphy.data[i].images["original"].url;
        gif.className = "imagen-creada";
        document.getElementById("portfolio").appendChild(gif);
    }

})
}