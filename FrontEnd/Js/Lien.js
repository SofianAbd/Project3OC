fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
        const categories = data.map(id => id.name);
        console.log(categories);});

const projetsPromise = fetch('http://localhost:5678/api/works')
.then(response => response.json());
      
projetsPromise.then(projetsPromise => projets.json);

function genererProjets(projets) {
    for (let i = 0; i < projets.length; i++) {
        console.log(i);
        const projetElement = document.createElement("figure");
        const titleElement = document.createElement('figcaption');
        const imageElement = document.createElement('img');
        const galleryElement = document.querySelector('.gallery');
        imageElement.src = projets[i].imageurl;
        titleElement.textContent = projets[i].title;
        projetElement.appendChild(imageElement);
        projetElement.appendChild(titleElement);
        galleryElement.appendChild(projetElement);
        console.log(titleElement.textContent);
        document.body.appendChild(galleryElement);
    }
}

genererProjets(projets);