document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = form.querySelector("input[type='text']").value;
        const password = form.querySelector("input[type='password']").value;

        const response = await fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                apikey: "apikey",
                functionName: "connect_admin",  // Nom de la fonction côté serveur
                // Autres données requises pour la connexion
                email: email,
                password: password
            })
        });

        const data = await response.json();
        if (response.ok) {
            // Connexion réussie, redirige vers la page d'administration
            localStorage.setItem("email_admi", email);
            window.location.href = "home";
        } else {
            // Affiche un message d'erreur à l'utilisateur
            document.getElementById("error").innerHTML = data.error;
        }
    });
});