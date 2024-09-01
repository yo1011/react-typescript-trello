import { useEffect, useState } from 'react';
import { BsChatFill } from 'react-icons/bs';
import logo from '../Assets/logo.png';
import AddListBoard from './AddListBoard';
import Icon from './Icon';
import { FiList } from 'react-icons/fi';
import UserHeaderProfile from './UserHeaderProfile';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import { useNavigate } from 'react-router-dom';
import { BE_signOut } from '../Backend/Queries';
import Spinner from './Spinner';

function Header() {
    const [logoutLoading, setLogoutLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector((state: RootState) => state.user.currentUser);

    useEffect(() => {
        if (!currentUser?.id) navigate("/auth");
    }, [navigate, currentUser])

    useEffect(() => {
        const page = getCurrentPage();
        navigate(`/dashboard/${page}`);
    }, [navigate])

    const handleGoToPage = (page: string) => {
        navigate(page === "list" ? `/dashboard` : `/dashboard/${page}`);
        setCurrentPage(page);
    }

    const handleSignOut = () => {
        BE_signOut(dispatch, navigate, setLogoutLoading)
    }

    const setCurrentPage = (page: string) => {
        localStorage.setItem("current-page", page);
    }

    const getCurrentPage = () => {
        return localStorage.getItem("current-page");
    }

    return (
        <div className='flex flex-wrap sm:flex-row gap-5 items-center justify-between drop-shadow-md bg-gradient-to-r from-myBlue to-myPink px-5 py-5 md:py-2 text-white'>
            <img
                className='w-[70px] drop-shadow-md cursor-pointer'
                src={logo}
                alt='logo'
            />
            <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap">
                {getCurrentPage() === "chat" ? (
                    <>
                        <Icon
                            IconName={FiList}
                            onClick={() => handleGoToPage("list")}
                        />
                    </>
                ) : getCurrentPage() === "profile" ? (
                    <>
                        <Icon
                            IconName={FiList}
                            onClick={() => handleGoToPage("list")}
                        />
                        <Icon
                            IconName={BsChatFill}
                            ping={true}
                            onClick={() => handleGoToPage("chat")}
                        />
                    </>
                ) : (
                    <>
                        <AddListBoard />
                        <Icon
                            IconName={BsChatFill}
                            ping={true}
                            onClick={() => handleGoToPage("chat")}
                        />
                    </>
                )}
                <div className="group relative">
                    <UserHeaderProfile user={currentUser} />
                    <div className="absolute pt-5 hidden group-hover:block w-full min-w-max">
                        <ul className="w-full bg-white overflow-hidden shadow-md rounded-md text-gray-700 pt-1">
                            <p
                                onClick={() => handleGoToPage("profile")}
                                className='hover:bg-gray-200 py-2 px-4 block cursor-pointer'
                            >
                                Profile
                            </p>
                            <p
                                onClick={() => !logoutLoading && handleSignOut()}
                                className={`hover:bg-gray-200 py-2 px-4 cursor-pointer flex items-center gap-4 ${logoutLoading && "cursor-wait"}`}
                            >
                                Logout
                                {logoutLoading && <Spinner />}
                            </p>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header