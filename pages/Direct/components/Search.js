import React from 'react';
import { IconPlus, IconSearch } from '@tabler/icons-react';
const Search = ({ openNewConversationDialog }) => {
    return (
        <div className="flex w-full">
            <div className="flex w-full m-1">
                <div className="flex flex-row items-center border focus-within:border-purple-400 w-full rounded mr-1">
                    <IconSearch className='w-4 stroke-1 mr-1 ml-1'  />
                    <input className="w-full outline-none caret-purple-500 text-sm" placeholder='Search for a user' />
                </div>

                <div className="border rounded cursor-pointer bg-gray-200 hover:bg-gray-300" onClick={openNewConversationDialog}>
                   <IconPlus />
                </div>

            </div>
        </div>
    );
};

export default Search;