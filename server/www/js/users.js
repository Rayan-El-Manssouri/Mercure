const inputsearch = document.getElementById("search-user");
let usersData = [];

// Fonction pour afficher la liste des utilisateurs
function displayUserList(users = usersData) {
    const userList = document.getElementById("users");

    // Efface la liste actuelle d'utilisateurs
    userList.innerHTML = "";

    // Boucle à travers les utilisateurs et les ajoute à la liste
    users.forEach(user => {
        const listItem = document.createElement("li");
        listItem.textContent = `${user.pseudo} - ${user.role}`;

        // Ajoute un gestionnaire d'événements click à chaque élément <li>
        listItem.addEventListener("click", () => {
            // Supprime la classe "active" de tous les éléments <li>
            const allListItems = document.querySelectorAll("#users li");
            allListItems.forEach(item => {
                item.classList.remove("active_user");
            });

            // Ajoute la classe "active" à l'élément cliqué
            listItem.classList.add("active_user");

            // Affiche les détails de l'utilisateur sélectionné
            displayUserInfo(user);
        });



        userList.appendChild(listItem);
    });

    // Afficher un message lorsqu'aucun utilisateur n'est sélectionné
    if (users.length === 0) {
        const userInfo = document.getElementById("user-info");
        userInfo.innerHTML = '<p style="text-align: center; width: 100%;" >Aucun utilisateur sélectionné.</p>';
    }
}

// Fonction pour rechercher un utilisateur
function searchUser() {
    const searchValue = inputsearch.value.toLowerCase();
    const filteredUsers = usersData.filter(user => {
        return user.pseudo.toLowerCase().includes(searchValue);
    });

    const userCountMessage = document.getElementById("user-count-message");
    const userList = document.getElementById("users");
    // Si le champ de recherche est vide, réinitialise tout
    if (searchValue === "") {
        userCountMessage.style.display = "none";
        userList.style.display = "block";
        displayUserList();
        return;
    }

    if (filteredUsers.length === 0) {
        // Aucun utilisateur trouvé, affiche le message et cache la liste
        userCountMessage.style.display = "block";
        userCountMessage.textContent = "Aucun utilisateur trouvé.";
        userList.style.display = "none";

        // Efface les détails de l'utilisateur
        const userInfo = document.getElementById("user-info");
        userInfo.innerHTML = '<p style="text-align: center; width: 100%;">Aucun utilisateur sélectionné.</p>';
    } else {
        // Des utilisateurs ont été trouvés, affiche le nombre d'utilisateurs et la liste
        userCountMessage.style.display = "block";
        userCountMessage.textContent = `Nombre d'utilisateurs trouvés : ${filteredUsers.length}`;
        userList.style.display = "block";
        displayUserList(filteredUsers); // Appelle displayUserList avec la liste filtrée
    }
}

// Fonction pour afficher les détails d'un utilisateur sélectionné
function displayUserInfo(user) {
    const userInfo = document.getElementById("user-info");
    userInfo.innerHTML = `
    <div class="users-info">
        <div>
                <p><strong>Nom :</strong> ${user.pseudo}</p>
                <p><strong>Email :</strong> ${user.email}</p>
                <p><strong>Password :</strong> ${user.password}</p>
                <p><strong>Rôle :</strong> ${user.role}</p>
                <p><strong>Id :</strong> ${user.id}</p>
                <p><strong>Nombre de rapport :</strong> ${user.Nombrederapport}</p>
            </div>
            <div>
                <button onclick="editUser(${user.id})">Modifier le rôle</button>
                <button onclick="editUser(${user.id})">Supprimer l'utilisateur</button>
                <button onclick="editUser(${user.id})">Bannir</button>
                <button onclick="editUser(${user.id})">Envoyer un rapport</button>
                <button onclick="editUser(${user.id})">Voir tous les messages de l'utilisateur</button>
            </div>
    </div>
    `;

    const editUserButton = document.getElementById("edit-user-button");
    const editUserForm = document.getElementById("edit-user-form");

    editUserButton.addEventListener("click", function () {
        editUserForm.style.display = "block";
    });
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

const addFormUsers = document.getElementById('btn-add-user');
const formUsers = document.getElementById('add-user-form');
const userInfo = document.getElementById('user-info');

addFormUsers.addEventListener('click', (e) => {
    if (formUsers.style.display === 'none') {
        formUsers.style.display = 'block';
        userInfo.style.display = 'none';
    } else {
        formUsers.style.display = 'none';
        userInfo.style.display = 'block';
    }

});