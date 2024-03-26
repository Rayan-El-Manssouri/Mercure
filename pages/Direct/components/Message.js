import React from 'react';
import { IconUserCircle } from '@tabler/icons-react';

const Message = ({ message, isLastMessage, isCurrentUser }) => {
  const messageClass = isCurrentUser ? 'ml-auto' : '';
  const iconToShow = isLastMessage && !isCurrentUser ? <IconUserCircle className="stroke-1 mr-2 ml-1" /> : null;
  const iconToRight = isLastMessage && isCurrentUser ? <IconUserCircle className="stroke-1 mr-1 ml-1" /> : null;

  // Ajout de la classe de marge si ce n'est pas le dernier message

  // Déterminer la classe de marge en fonction de la position du message et de l'utilisateur
  let messageMarginClass = '';
  if (isCurrentUser) {
    messageMarginClass = isLastMessage ? '' : 'mr-[33px]'; // Pour l'utilisateur courant, pas de marge si c'est le dernier message, sinon mr-8
  } else {
    messageMarginClass = isLastMessage ? '' : 'ml-[36px]'; // Pour les autres participants, pas de marge si c'est le dernier message, sinon ml-8
  }

  return (
    <div className={`w-full flex flex-row items-center justify-${messageClass}`}>
      {iconToShow}
      <div className={`bg-gray-200 text-black flex-end px-2 py-1 rounded-lg text-sm mt-1 ${messageMarginClass} ${messageClass}`}>
        <div className='bg-gray-200 rounded px-1 py-1'>
          <p>{message.content}</p>
        </div>
      </div>
      {iconToRight}
    </div>
  );
};

export default Message;