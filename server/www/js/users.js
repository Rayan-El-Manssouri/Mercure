const inputsearch = document.getElementById("search-user");
let usersData = [];

// Fonction pour afficher la liste des utilisateurs
function displayUserList(users = usersData ) { // Utilise la liste filtrée si elle est fournie, sinon utilise usersData par défaut
    const userList = document.getElementById("users");

    // Efface la liste actuelle d'utilisateurs
    userList.innerHTML = "";

    // Boucle à travers les utilisateurs et les ajoute à la liste
    users.forEach(user => {
        const listItem = document.createElement("li");
        listItem.textContent = `${user.pseudo} - ${user.role}`;
        listItem.addEventListener("click", () => displayUserInfo(user));
        userList.appendChild(listItem);
    });

    // Affichier un message lors que y'a aucun utilisateur sélectionné
    if (users.length === 0) {
        const userInfo = document.getElementById("user-info");
        userInfo.innerHTML = '<p style="text-align: center" >Aucun utilisateur sélectionné.</p>';
    }
}

// Fonction pour rechercher un utilisateur
function searchUser() {
    const searchValue = inputsearch.value.toLowerCase();
    const filteredUsers =  usersData.filter(user => {
        return user.pseudo.toLowerCase().includes(searchValue);
    });

    const userCountMessage = document.getElementById("user-count-message");

    if (filteredUsers.length === 0) {
        // Aucun utilisateur trouvé, affiche le message et cache la liste
        userCountMessage.style.display = "block";
        userCountMessage.textContent = "Aucun utilisateur trouvé.";
        document.getElementById("users").style.display = "none";
    } else {
        // Des utilisateurs ont été trouvés, affiche le nombre d'utilisateurs et la liste
        userCountMessage.style.display = "block";
        userCountMessage.textContent = `Nombre d'utilisateurs trouvés : ${filteredUsers.length}`;
        document.getElementById("users").style.display = "block";
        displayUserList(filteredUsers); // Appelle displayUserList avec la liste filtrée
    }
}


// Fonction pour afficher les détails d'un utilisateur sélectionné
function displayUserInfo(user) {
    const userInfo = document.getElementById("user-info");
    userInfo.innerHTML = `
        <p><strong>Nom :</strong> ${user.pseudo}</p>
        <p><strong>Email :</strong> ${user.email}</p>
        <p><strong>Password :</strong> ${user.password}</p>
        <p><strong>Rôle :</strong> ${user.role}</p>
        <p><strong>Id :</strong> ${user.id}</p>
        <p><strong>Nombre de rapport :</strong> ${user.Nombrederapport}</p>
        <div>
            <button onclick="editUser(${user.id})">Modifier le rôle</button>
            <button onclick="editUser(${user.id})">Bannir</button>
            <button onclick="editUser(${user.id})">Voir tous les messages de l'utilisateur</button>
            <button onclick="editUser(${user.id})">Supprimer l'utilisateur</button>
            <button onclick="editUser(${user.id})">Envoyer un rapport</button>
        </div>
    `;
}

function fetchUsersData() {
    fetch('users_account')
        .then(response => response.json())
        .then(data => {
            // Appelle la fonction pour afficher la liste des utilisateurs avec les données récupérées
            usersData = data;
            displayUserList(data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données des utilisateurs:', error);
        });
}

// Charge la liste des utilisateurs au chargement de la page
window.addEventListener("load", () => {
    displayUserList();
    fetchUsersData();
    // Sélectionne le premier utilisateur par défaut
    if (usersData.length > 0) {
        displayUserInfo(usersData[0]);
    }

    // Ajoute un événement de clic au bouton de recherche
    document.getElementById("search-user").addEventListener("input", searchUser);
});