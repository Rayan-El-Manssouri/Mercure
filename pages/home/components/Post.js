import { IconHeart, IconMessageCancel, IconShadow, IconShare } from "@tabler/icons-react";

const Post = ({
    userProfileImage,
    username,
    postDate,
    content,
    likesCount,
    commentsCount,
    sharesCount,
    isOriginal,
    originalUserProfileImage,
    originalUsername,
    originalPostDate,
}) => {
    return (
        <div
            className={`bg-white rounded-lg border p-4 mb-8 hover:shadow transition duration-300 ease-in-out ${isOriginal ? "border-gray-300" : "border-purple-300"
                }`}
        >
            <div className="flex items-center mb-4">
                <img
                    className="w-12 h-12 rounded-full mr-4"
                    src={userProfileImage}
                    alt="User profile"
                />
                <div>
                    <div className="flex">
                        <p className="font-semibold text-gray-900">{username}</p>
                        <p className="ml-1 text-gray-400">• {postDate}</p>
                    </div>
                    <p className="text-gray-500 text-sm">{postDate}</p>
                </div>
            </div>

            <p className="text-gray-800 mb-4">{content}</p>

            {!isOriginal && (
                <div className="border-t border-gray-200 pt-4 mt-4 flex flex-col">
                    
                    <div className="flex">
                        <img
                            className="w-10 h-10 rounded-full mr-2"
                            src={userProfileImage}
                            alt="Original user profile"
                        />

                        <div className="flex items-center mb-2">
                            <div>
                                <p className="font-semibold">Reposted by</p>
                                <p className="text-gray-500 text-sm">
                                    Original post by {originalUsername}
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-500 text-sm">
                        Original post date: 15h50
                    </p>
                </div>
            )}

            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                    <IconHeart className="text-red-500 cursor-pointer hover:text-red-600 transition duration-300 ease-in-out" />
                    <IconMessageCancel className="text-purple-500 cursor-pointer hover:text-purple-600 transition duration-300 ease-in-out" />
                    <IconShare className="text-green-500 cursor-pointer hover:text-green-600 transition duration-300 ease-in-out" />
                </div>

                <p className="text-gray-500 text-sm">
                    {likesCount} Likes, {commentsCount} Comments, {sharesCount} Shares
                </p>
                
            </div>
        </div>
    );
};

export default Post;