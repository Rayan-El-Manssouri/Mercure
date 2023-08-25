const usersData = [];

// Fonction pour afficher la liste des utilisateurs
function displayUserList(users = usersData) {
    const userList = document.getElementById("list_users");

    // Efface la liste existante
    userList.innerHTML = "";

    // Ajoute un gestionnaire d'événements click à chaque élément <li>
    users.forEach((user, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${user.pseudo} - ${user.role}`;

        // Ajoutez un gestionnaire d'événements click à chaque élément <li>
        listItem.addEventListener("click", () => {
            // Supprime la classe "active" de tous les éléments <li>
            const allListItems = document.querySelectorAll("#list_users li");
            allListItems.forEach(item => {
                item.classList.remove("active_user");
            });

            // Ajoute la classe "active" à l'élément cliqué
            listItem.classList.add("active_user");

            // Appelle displayUserMessages avec les données de l'utilisateur
            displayUserMessages(user);
        });

        userList.appendChild(listItem);
    });
}

function createMessageElement(message, currentUserEmail) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    
    const messageType = document.createElement("div");
    messageType.classList.add("message-sender");
    messageType.textContent = message.sender.email === currentUserEmail ? "Utilisateur" : "Administrateur";
    messageElement.appendChild(messageType);

    const messageContent = document.createElement("div");
    messageContent.textContent = message.content;
    messageElement.appendChild(messageContent);

    const messageDate = document.createElement("div");
    messageDate.classList.add("message-time");
    messageDate.textContent = new Date(message.timestamp).toLocaleTimeString();
    messageElement.appendChild(messageDate);

    if (message.sender.email === currentUserEmail) {
        messageElement.classList.add("user-message");
    } else {
        messageElement.classList.add("admin-message");
    }

    return messageElement;
}

function displayUserMessages(data) {
    const messagesContainer = document.querySelector("#messages .message.overflow");
    messagesContainer.innerHTML = ""; // Efface les messages existants
    const email = localStorage.getItem("email_admi")
    fetchMessgeData(email, data.email);
}

function fetchMessgeData(useremail, useremail2) {
    fetch("/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            apikey: "apikey",
            functionName: "fetchUserFilter",
            AdminEmail: localStorage.getItem("email_admi"),
            UserEmail: useremail,
            timestamp: new Date().getTime(),
        })
    })
        .then(response => response.json())
        .then(data => {
            // Filtrer les messages pour ne récupérer que ceux de l'utilisateur sélectionné sous ce format :
            // [{"content":"Hello, this is a test email.","receiver":"admin@gmail.com","sender":{"email":"sender@gmail.com","pseudo":"kirito 1","role":"Membre"},"timestamp":"2019-12-04T15:00:00.000Z"},{"content":"Hello, this is a test email.","receiver":"admin@gmail.com","sender":{"email":"sender@gmail.com","pseudo":"kirito 1","role":"Membre"},"timestamp":"2019-12-04T15:00:00.000Z"},{"content":"Hello, this is a test email.","receiver":"admin@gmail.com","sender":{"email":"dqdqssq@gmail.com","pseudo":"kirito","role":"Membre"},"timestamp":"2019-12-04T15:00:00.000Z"}]
            const messagesCorrespondants = data.filter(message => { 
                return (
                    (message.sender.email === useremail2 && message.receiver === useremail) || 
                    (message.receiver === useremail2 && message.sender.email === useremail) ||
                    (message.sender.email === useremail)
                );
            });
            
            console.log(messagesCorrespondants);

            // Affiche les messages
            const messagesContainer = document.querySelector("#messages .message.overflow");
            messagesContainer.innerHTML = ""; // Efface les messages existants

            // Triez les messages par timestamp avant de les afficher
            messagesCorrespondants.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

            // Affiche les messages triés
            messagesCorrespondants.forEach(message => {
                const messageElement = createMessageElement(message, useremail);
                messagesContainer.appendChild(messageElement);
            });

        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données de l'API:", error);
        });
}

function fetchUsersData() {
    fetch("/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer apiKey"
        },
        body: JSON.stringify({
            apikey: "apikey",
            functionName: "fetchUserUniqueComunity",
            UserEmail: localStorage.getItem("email_admi")
        })
    })
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                // Assurez-vous que les données sont un tableau avant de les ajouter à usersData
                usersData.push(...data);
                displayUserList(usersData);
            } else {
                console.log("Données de l'API non valides.");
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données de l'API:", error);
        });
}

// Charge la liste des utilisateurs au chargement de la page
window.addEventListener("load", () => {
    fetchUsersData();
});