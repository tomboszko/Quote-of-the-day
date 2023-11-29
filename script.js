document.addEventListener('DOMContentLoaded', function () {
    const quote = document.getElementById('quote');
    const author = document.getElementById('author');
    const photo = document.getElementById('photo');
    const button = document.getElementById('btn');
    const loader = document.getElementById('loader');
    
    let showLoader = () => {
        loader.style.display = 'block'; // Show the loader

        
    };

    let fetchQuote = () => fetch("https://thatsthespir.it/api");

    let updateHTML = (json) => {
        quote.innerHTML = json.quote;
    
        if (json.quote.length < 250) {
            quote.style.fontSize = "2rem";
        }
        else if (json.quote.length > 250 && json.quote.length <= 400) {
            quote.style.fontSize = "1rem";
        }
        else if (json.quote.length > 400) {
            quote.style.fontSize = "0.5rem";
        }
    
        author.innerHTML = `-${json.author}`;
        loader.style.display = 'none'; // Hide the loader
    };

    let loadImage = (src) => {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;

        });

    };

    fetchQuote()
        .then((response) => response.json())
        .then(async (json) => {

            
            let img = await loadImage(json.photo);
            photo.src = img.src;
            updateHTML(json);
            loader.style.display = 'none'; 
            
        })
        .catch((error) => {
            alert("There was an error!", error);
        });

    button.addEventListener('click', () => {

        showLoader()
        fetchQuote()
            .then((response) => response.json())
            .then(async (json) => {
               
                let img = await loadImage(json.photo);
                photo.src = img.src;
                updateHTML(json);
            })
            .catch((error) => {
                alert("Image not found, please try another Quote", error);
            });
    });
});


