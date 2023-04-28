async function data() {
    const response = await fetch("./data/data.json");
    return response.json();
}

const theData = data().then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call

    const icons = data[0].icons;
    //const code =  icons[0].icon;
    //const micro =  icons[1].icon;
    //console.log(code);
    //console.log(micro);

    const basicGradient = "linear-gradient(45deg, rgb(156 39 176 / 75%), rgb(244 67 54 / 75%))";

    const cardContainer = document.createElement("div");
    cardContainer.classList = "one-cards-container";

    data[1].forEach( (element,i) => {
        const card = document.createElement("div");
        card.id = "btn-" + i;
        card.classList = "one-course-button";
        card.style.backgroundImage = basicGradient +",url(./img/" + element.img + ")";
        
        const header = document.createElement("h2");
        header.innerText = element.name;
        card.appendChild(header);

        const iconContainer = document.createElement("div");
        iconContainer.classList = "one-course-icons";
        element.icons.forEach(elementIcon => {
            const icon = document.createElement("img");
            icon.src = "./icons/" + icons[elementIcon].icon;
            iconContainer.appendChild(icon);
        });
        card.appendChild(iconContainer);

        const credits = document.createElement("div");
        credits.classList = "one-course-credits";
        credits.innerText = element.credit_description + " : " + element.credits + " " + element.credit_type;
        card.appendChild(credits);

        cardContainer.appendChild(card);
    });
    document.body.appendChild(cardContainer);
});
