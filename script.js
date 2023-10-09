document.addEventListener('DOMContentLoaded', function () {
    const quote = document.getElementById('quote');
    const author = document.getElementById('author');
    const photo = document.getElementById('photo');
    const button = document.getElementById('btn');
    const loader = document.getElementById('loader');
    const showLoader = () => {
        loader.style.display = 'block'; // Show the loader
    };

    const fetchQuote = () => fetch("https://thatsthespir.it/api");

    const updateHTML = (json) => {
        quote.innerHTML = json.quote;
        author.innerHTML = `-${json.author}`;
        loader.style.display = 'none'; // Hide the loader
    };

    

    
    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    };

    fetchQuote()
        .then((response) => response.json())
        .then(async (json) => {

            
            const img = await loadImage(json.photo);
            photo.src = img.src;
            updateHTML(json);
            loader.style.display = 'none'; 
        })
        .catch((error) => {
            console.log("There was an error!", error);
        });

       

    button.addEventListener('click', () => {

        showLoader()
        fetchQuote()
            .then((response) => response.json())
            .then(async (json) => {
               
                const img = await loadImage(json.photo);
                photo.src = img.src;
                updateHTML(json);
            })
            .catch((error) => {
                console.log("There was an error!", error);
            });
    });
});

