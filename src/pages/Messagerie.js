import React, { useState, useEffect, useRef } from 'react';
import HeaderPrivate from '../components/HeaderPrivate';
import '../styles/Private.scss';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import io from 'socket.io-client';
const Messagerie = () => {
  const email = localStorage.getItem('email');

  // État pour stocker les derniers messages de chaque utilisateur
  const [latestMessages, setLatestMessages] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const contenuCorpsRef = useRef(null);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:8000/Message.txt');
        const data = await response.json();

        // Filtrer les messages en fonction de l'utilisateur connecté (email)
        const filteredMessages = data.filter(
          (message) => message.sender === email || message.receiver === email
        );

        // Regrouper les messages par expéditeur (sender) ou destinataire (receiver) tout en conservant les doublons
        const groupedMessages = {};

        filteredMessages.forEach((message) => {
          const otherUser = message.sender === email ? message.receiver : message.sender;
          if (!groupedMessages[otherUser] || new Date(message.timestamp) > new Date(groupedMessages[otherUser].timestamp)) {
            groupedMessages[otherUser] = message;
          }
        });

        // Obtenir les derniers messages de chaque utilisateur (avec les doublons)
        const latestMessagesWithDuplicates = Object.values(groupedMessages);

        // Trier les messages par timestamp, le plus récent d'abord
        latestMessagesWithDuplicates.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Supprimer les doublons basés sur l'ID (conserver uniquement le dernier message de chaque utilisateur)
        const latestMessagesByUser = Array.from(new Map(latestMessagesWithDuplicates.map((message) => [message.id, message])).values());


        setLatestMessages(latestMessagesByUser);
        setAllMessages(filteredMessages); // Stocker tous les messages dans l'état allMessages
      } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
      }
    };

    fetchMessages();
  }, [email]);

  useEffect(() => {
    if (selectedEmail) {
      // Filtrer les messages en fonction de l'email sélectionné
      const filteredMessages = allMessages.filter(
        (message) =>
          (message.sender === selectedEmail && message.receiver === email) ||
          (message.sender === email && message.receiver === selectedEmail)
      );

      // Trier les messages par timestamp, le plus récent d'abord
      filteredMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      // Mettre à jour l'état avec les messages associés à l'email sélectionné
      setSelectedMessages(filteredMessages);
    }
  }, [selectedEmail, allMessages, email]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return format(date, 'HH:mm', { locale: fr }); // Utilise le format 'HH:mm' pour afficher l'heure
  };

  const BoiteReception = ({ message }) => {
    // Utiliser les propriétés du message pour afficher les détails de la boîte de réception
    const { sender, receiver, content, timestamp } = message;
    const otherUser = sender === email ? receiver : sender; // Obtenir l'email de l'autre utilisateur

    const handleClick = () => {
      // Met à jour l'email sélectionné lorsqu'une boîte de réception est cliquée
      setSelectedEmail(otherUser);
    };

    return (
      <div className='boite_reception' onClick={handleClick}>
        <img src="./assets/user_default.png" alt="Avatar" />
        <div className='avatar'>
          <div>{otherUser}</div>
          <div>Vous : {content} • {formatTimestamp(timestamp)} </div>
        </div>
      </div>
    );
  };


  useEffect(() => {
    // Créer une instance socket.io-client et se connecter au serveur
    const socket = io('http://localhost:8000');

    // Écouter l'événement 'new_message' émis par le serveur
    socket.on('new_message', (newMessage) => {
      // Traiter le nouveau message reçu du serveur
      console.log('Nouveau message reçu:', newMessage);
      // Mettre à jour l'état des messages avec le nouveau message
      setAllMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Fermer la connexion socket.io lorsque le composant est démonté pour éviter les fuites de mémoire
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    // Affichier la valeur du scroll top
    console.log('Scroll top:', contenuCorpsRef.current.scrollTop);
    if (newMessage.trim() !== '') {
      // Créer un objet de message avec l'email de l'utilisateur connecté et le contenu du message
      const messageData = {
        sender: localStorage.getItem('email'),
        receiver: selectedEmail,
        timestamp: new Date().toISOString(),
        content: newMessage,
      };

      // Envoyer le message au serveur
      fetch('http://localhost:8000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Le message a été envoyé avec succès, vous pouvez ajouter un retour visuel si nécessaire
          console.log('Message envoyé avec succès:', data.message);
          setAllMessages((prevMessages) => [...prevMessages, newMessage]);
          // Mettre le scroll top à la fin du contenu du corps
          contenuCorpsRef.current.scrollTop = contenuCorpsRef.current.scrollHeight;
        })
        .catch((error) => {
          console.error('Erreur lors de l\'envoi du message:', error);
        });

      // Réinitialiser le champ d'entrée du message
      setNewMessage('');

    }
  };

  return (
    <>
      <HeaderPrivate />
      <div className='message'>
        <h1>{email} <span>⌄</span></h1>
        <ul>
          <li>Principal</li>
          <li>Général</li>
          <li>Invitation</li>
          <li><button className='New'>New</button></li>
        </ul>

        <div className='contenu_corps' ref={contenuCorpsRef}>
          {selectedEmail ? (
            <p></p>
          ) : (
            <p>Sélectionnez un utilisateur pour afficher le contenu du message.</p>
          )}
          {selectedMessages.slice().reverse().map((message, index) => (
            <div key={index} className={message.sender === email ? 'vous' : 'autre'}>
              {message.content}
              <div className='date'>
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='message__content'>
        {/* Afficher les boîtes de réception avec les derniers messages */}
        {latestMessages.map((message) => (
          <BoiteReception key={message.id} message={message} />
        ))}
      </div>
      <div className='input_send_message'>
        <input
          placeholder='Écrire votre message...'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
      </div>
    </>
  );
};

export default Messagerie;