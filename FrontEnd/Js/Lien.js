fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
        const categories = data.map(id => id.name);
        console.log(categories);})

const projets = fetch('http://localhost:5678/api/works').then(projets => projets.json());

function genererProjets(projets) {
    for (let i = 0; i < projets.length; i++) {
        const projetElement = document.createElement('figure');
        const titleElement = document.createElement('figcaption');
        const imageElement = document.createElement('img');
        imageElement.src = projets[i].imageurl
    }
}

console.log(genererProjets(projets));