import React, { useState, useEffect } from 'react';
import HeaderPrivate from '../components/HeaderPrivate';
import '../styles/Private.scss';

const Messagerie = () => {
  const email = localStorage.getItem('email');

  // État pour stocker les derniers messages de chaque utilisateur
  const [latestMessages, setLatestMessages] = useState([]);

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
  
        // Afficher le contenu des derniers messages pour vérifier s'ils sont corrects
        console.log(latestMessagesWithDuplicates);
  
        // Supprimer les doublons basés sur l'ID (conserver uniquement le dernier message de chaque utilisateur)
        const latestMessagesByUser = Array.from(new Map(latestMessagesWithDuplicates.map((message) => [message.id, message])).values());
  
        // Afficher le contenu des derniers messages sans doublons
        console.log(latestMessagesByUser);
  
        setLatestMessages(latestMessagesByUser);
      } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
      }
    };
  
    fetchMessages();
  }, [email]);
  
  
  const BoiteReception = ({ message }) => {
    // Utiliser les propriétés du message pour afficher les détails de la boîte de réception
    const { sender, content, timestamp } = message;

    return (
      <div className='boite_reception'>
        <img src="./assets/user_default.png" alt="Avatar" />
        <p>{sender}</p>
        <p>Vous : {content} • {timestamp} </p>
      </div>
    );
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
        </ul>
      </div>
      <div className='message__content'>
        {/* Afficher les boîtes de réception avec les derniers messages */}
        {latestMessages.map((message) => (
          <BoiteReception key={message.id} message={message} />
        ))}
      </div>
    </>
  );
};

export default Messagerie;
