document.addEventListener('DOMContentLoaded', () => {
    let categories;

    async function fetchCategories() {
        const response = await fetch('http://localhost:5678/api/categories');
        const data = await response.json();
        categories = data;
    }





    let projets
    async function fetchProjets() {
        return await fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => { projets = data});
    }

    async function genererProjets() {
        await fetchProjets();
        console.log(fetchProjets());
        const galleryElement = document.querySelector('.gallery');
        for (let i = 0; i < projets.length; i++) {
            console.log(i);
            const projetElement = document.createElement("figure");
            const titleElement = document.createElement('figcaption');
            const imageElement = document.createElement('img');
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


    async function genererBoutons() {
        const galleryElement = document.querySelector('.gallery');
        const filtresElement = document.querySelector('.filtres');
        await fetchCategories();
        // Create "All" button
        const boutonTous = document.createElement('button');
        boutonTous.textContent = 'Tous';
        boutonTous.addEventListener('click', () => {
            galleryElement.innerHTML ="";
            genererProjets();
            console.log('Display all objects');
        });
        filtresElement.appendChild(boutonTous);

        // Create category buttons
        categories.forEach(category => {
            const categoryButton = document.createElement('button');
            categoryButton.textContent = category.name;
            categoryButton.addEventListener('click', () => {
                galleryElement.innerHTML = '';

                const categoryName = category.name;
            
                // Filter the projects by category
                const filteredProjects = projets.filter(projet => projet.category.name === categoryName);
            
                // Generate the filtered projects
                for (let i = 0; i < filteredProjects.length; i++) {
                    const projetElement = document.createElement("figure");
                    const titleElement = document.createElement('figcaption');
                    const imageElement = document.createElement('img');
                    imageElement.src = filteredProjects[i].imageUrl;
                    titleElement.textContent = filteredProjects[i].title;
                    projetElement.appendChild(imageElement);
                    projetElement.appendChild(titleElement);
                    galleryElement.appendChild(projetElement);
                }
                console.log(`Display objects in category: ${category.name}`);
            });
            filtresElement.appendChild(categoryButton);
        });
    }

    fetchCategories();

    genererBoutons();


    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    const logs = {
        email: emailValue,
        password: passwordValue
    };

    console.log(logs);

    let response = await fetch('http://localhost:5678/api/users/login', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(logs)
                    })
        console.log(response)
        let result = await response.json();
        console.log(result.token);

    // Reste du code pour traiter les valeurs du formulaire, comme l'envoi des données au serveur
});
});