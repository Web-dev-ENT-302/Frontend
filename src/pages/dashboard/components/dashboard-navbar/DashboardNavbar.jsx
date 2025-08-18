import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';

/* assets */
import logo from "../../../../assets/images/svg/logo.svg"

/* icons */
import { FaRegQuestionCircle } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { AuthContext } from '../../../../contexts/AuthContext';


const DashboardNavbar = () => {
    const { user, logout } = useContext(AuthContext);

    const [showOverlay, setShowOverlay] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);


    // Handler to open the side bar
    function openSideBar() {
        setShowOverlay(true)
        setShowSideBar(true)
    }

    // hander to close the side bar
    function closeSidebar(e) {
        if (e.target === e.currentTarget) {
            setShowOverlay(false)
            setShowSideBar(false)
        }
    }


    // closes the side bar when user navigates from the sidebar
    function removeSidebar() {
        setShowOverlay(false)
        setShowSideBar(false)
    }

    // handler to switch case and perform funtion based on user request
    function handleSidebarBtn(route) {
        switch (route) {
            case "profile":
                removeSidebar() /* closes the side bar */
                //
                console.log("profile")
                break;

            case "logout":
                removeSidebar() /* closes the side bar */
                //
                console.log("logout")
                break;

            default:
                break;
        }
    }

    return (
        <>
            <nav className="bg-[--primary] py-4 fixed top-0 left-0 w-full z-[100]" >
                <div className="container">
                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <Link to="/">
                            <div className="sm:w-[90%] w-[75%] ">
                                <img src={logo} alt="logo" className='object-cover w-full' />
                            </div>
                        </Link>

                        {/* Nav Links: visible on larger screen */}
                        <div className="hidden sm:block">
                            <ul className='flex items-center gap-[2rem] text-white'>
                                {/* Nav Links */}
                                <Link to="/help">
                                    <li className='figcaption'>
                                        <span className='flex items-center gap-1'>
                                            {user ?
                                                <>
                                                    <button onClick={logout}>logout</button>
                                                </> : <>
                                                    <FaRegQuestionCircle /> Help
                                                </>}
                                        </span>
                                    </li>
                                </Link>

                                <Link to="/profile">
                                    <li className='figcaption'>
                                        <span className='px-4 py-2 text-black bg-white rounded-[2rem] shadow-md'>
                                            {user?.name}
                                        </span>
                                    </li>
                                </Link>
                            </ul>
                        </div>

                        {/* Hamburger Icon: only visible on smaller screens */}
                        {/* when clicked, open the side bar */}
                        <button onClick={() => openSideBar()} className="sm:hidden">
                            <div className="text-white ">
                                <LuMenu className='text-[1.6rem]' />
                            </div>
                        </button>
                    </div>

                    {/* Mobile nav links */}
                    {/* when clicked, close the side bar */}
                    <div className={`mobile-nav-links-overlay sm:hidden fixed inset-0 z-[10] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px] ${showOverlay ? 'active' : ''}`} onClick={closeSidebar}>
                        <div className={` mobile-nav-links bg-[#f3f4f6]  w-[80%] h-full shadow-[1px_3px_5px_rgba(0,0,0,0.10)] ${showSideBar ? 'open' : ''}`}>
                            <ul className='flex flex-col gap-10 px-6 py-8 mt-16'>
                                {/* Nav Links */}

                                <button onClick={() => handleSidebarBtn("profile")}>
                                    <li className='flex figcaption'>My Profile</li>
                                </button>

                                <button onClick={() => handleSidebarBtn("logout")}>
                                    <li className='flex text-red-500 figcaption'>
                                        Log out
                                    </li>
                                </button>
                            </ul>
                        </div>
                    </div>
                </div >
            </nav >
        </>
    )
}

export default DashboardNavbar