import { userType } from "../Types";

type props = {
    user: userType,
    handleClick?: () => void,
};

const UserHeaderProfile = ({ user, handleClick }: props) => {
    return (
        <div
            onClick={handleClick}
            className="flex items-center space-x-4 cursor-pointer"
        >
            <div className="relative">
                <img
                    src={user.img}
                    alt="user profile"
                    className="w-11 h-11 rounded-full ring-2 ring-white p-[2px]"
                />
                <span className="-top-1 left-7 rounded-full absolute w-4 h-4 border-2 border-gray-800 bg-green-400"></span>
            </div>
            <div className="hidden md:block">
                <div className="-mb-1">
                    {user.username}
                </div>
                <div className="text-sm text-gray-300">
                    {`Joined in ${user?.creationTime}`}
                </div>
            </div>
        </div>
    )
}

export default UserHeaderProfile;
