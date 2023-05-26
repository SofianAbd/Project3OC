fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
        const categories = data.map(id => id.name);
        console.log(categories);});

let projets
async function fetchProjets() {
    return await fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => { projets = data});
}

async function genererProjets() {
    await fetchProjets();
    console.log(fetchProjets());
    for (let i = 0; i < projets.length; i++) {
        console.log(i);
        const projetElement = document.createElement("figure");
        const titleElement = document.createElement('figcaption');
        const imageElement = document.createElement('img');
        const galleryElement = document.querySelector('.gallery');
        imageElement.src = projets[i].imageUrl;
        titleElement.textContent = projets[i].title;
        projetElement.appendChild(imageElement);
        projetElement.appendChild(titleElement);
        galleryElement.appendChild(projetElement);
        document.querySelector('.gallery').appendChild(projetElement);
    }
}
fetchProjets();

genererProjets();

const boutonTous = document.querySelector("#Tous")
const boutonObjets = document.querySelector("#Objets")
const boutonAppartements = document.querySelector("#Appartements")
const boutonHotelRestau = document.querySelector("#HotelRestau")