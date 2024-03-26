import React from 'react';
import { IconHeart } from "@tabler/icons-react";

const CommentSection = ({ comments }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Commentaires</h3>
            <ul className="space-y-4">
                {comments.map((comment, index) => (
                    <li key={index} className="flex items-start space-x-1">
                        <div className="flex-shrink-0">
                            <img className="w-12 h-12 rounded-full" src="https://via.placeholder.com/50" alt="User profile" />
                        </div>
                        <div className="flex flex-col">
                            <div className="bg-gray-100 rounded-lg p-3">
                                <p className="text-gray-800">{comment}</p>
                            </div>
                            <div className="flex items-center mt-2">
                                <button className="flex items-center text-purple-500 hover:text-purple-700 focus:outline-none focus:text-purple-700">
                                    <IconHeart className="w-5 h-5 mr-1" />
                                    J'aime
                                </button>
                                <button className="text-gray-500 hover:text-gray-700 ml-2">
                                    Signaler
                                </button>
                                <button className="text-gray-500 hover:text-gray-700 ml-2">
                                    Répondre
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentSection;