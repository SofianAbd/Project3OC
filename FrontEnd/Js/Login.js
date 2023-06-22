document.addEventListener('DOMContentLoaded', async () => {

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
        const token = result.token;
        localStorage.setItem('token', token);
        console.log(token);
        const errorElement = document.getElementById('error-message');

        // ...

        if (response.ok) {
        // ...

        // Rediriger vers la page d'accueil
        window.location.href = 'index.html';
        } else {
        // La combinaison utilisateur-mot de passe est incorrecte
        errorElement.textContent = 'La combinaison utilisateur-mot de passe est incorrecte';
        }
    });
});
