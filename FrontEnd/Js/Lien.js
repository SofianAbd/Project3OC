document.addEventListener('DOMContentLoaded', async () => {
    let categories;

    async function fetchCategories() {
        const response = await fetch('http://localhost:5678/api/categories');
        const data = await response.json();
        categories = data;
    }





    
    async function fetchProjets() {
        return await fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => data);
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
    let projets = await fetchProjets();
    

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


    
    // Reste du code pour traiter les valeurs du formulaire, comme l'envoi des données au serveur
    const openModalButton = document.getElementById('openModal');
    const modal = document.getElementById('modal1');
    const projetsModal = document.getElementById('projetsModal')
    
    openModalButton.addEventListener('click', () => {
        // Vérifier si l'utilisateur est authentifié en tant qu'administrateur
        if (isAdminAuthenticated()) {
            modal.style.display = 'flex';
        } else {
            console.log("Accès refusé. Vous devez être un administrateur pour accéder à cette fonctionnalité.");
        }
    });

    function genererProjetsModal() {
        const modalGallery = document.querySelector('.modal-gallery');
        modalGallery.innerHTML = '';
    
        for (let i = 0; i < projets.length; i++) {
            const projet = projets[i];
            console.log(i);
        
            const projetElement = document.createElement('figure');
            const imageElement = document.createElement('img');
            const deleteIcon = document.createElement('i');
            const iconContainer = document.createElement('span');
            iconContainer.classList.add('icon-container');
            deleteIcon.classList.add('delete-icon');
            deleteIcon.classList.add('fas');
            deleteIcon.classList.add('fa-trash-alt');
            deleteIcon.classList.add('delete-icon-overlay');
            deleteIcon.dataset.projetId = projet.id;
            deleteIcon.addEventListener('click', supprimerProjet);

            imageElement.src = projet.imageUrl;
        
            iconContainer.appendChild(deleteIcon);
            projetElement.appendChild(imageElement);
            projetElement.appendChild(iconContainer);
            modalGallery.appendChild(projetElement);
        }
    }
  

    genererProjetsModal(); // Appeler la fonction pour générer les projets dans la modale

    function openModal() {
        const modal = document.getElementById("modal1");
        if (modal.style.display !== "flex") {
          modal.style.display = "flex";
        }
    }
      
      // Fonction pour fermer la modale
    function closeModal() {
        document.getElementById("modal1").style.display = "none";
        }
    
    document.querySelector(".close").addEventListener("click", closeModal);
    document.getElementById("openModal").addEventListener("click", openModal);

    async function supprimerProjet(event) {
        const projetId = event.target.dataset.projetId;
        console.log("${projetId}")
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5678/api/works/${projetId}`, {
            method: 'DELETE',
            headers: {Authorization:"Bearer: " + token}
        });
        if (response.status === 204) {
            // Le projet a été supprimé avec succès
            console.log("Projet supprimé avec succès.");
    
            // Rappeler les fonctions pour générer les projets
            await fetchProjets(); // Mettre à jour les données des projets
            location.reload();
        } else {
            // La suppression du projet a échoué
            console.log("Échec de la suppression du projet.");
        }
    }

const token = localStorage.getItem('token');
if (token) {
  const bouton = document.getElementById('openModal');
  bouton.style.display = 'block';
} else {
  const bouton = document.getElementById('openModal');
  bouton.style.display = 'none';
}

function openModal2(){
    modal = document.querySelector("modalWrapper");
    modal2 = document.querySelector("modalWrapper2");
    modal.style.display = "none";
    modal2.style.display = "flex";
}

document.getElementById("ajouterProjet").addEventListener("click", openModal2);


function submitForm(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    const token = localStorage.getItem('token');
    debugger;
    // Récupère les valeurs des champs
    var image = document.getElementById('image').files[0];
    var texte1 = document.getElementById('title').value;
    var texte2 = document.getElementById('category').value;

    // Crée un objet FormData pour envoyer les données
    var formData = new FormData();
    formData.append('image', image);
    formData.append('title', texte1);
    formData.append('category', texte2);
    console.log(formData)

    // Envoie la requête POST à l'API
    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {Authorization:"Bearer: " + token},
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // Traitez la réponse de l'API ici
      console.log(data);
    })
    .catch(error => {
      // Gérez les erreurs ici
      console.error(error);
    });
  }

  document.getElementById('submitBtn').addEventListener('click', submitForm);

});
