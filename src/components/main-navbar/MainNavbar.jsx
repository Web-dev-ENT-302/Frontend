import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';

/* assets */
import logo from "../../assets/images/logo.svg"

/* icons */
import { FaRegQuestionCircle } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";



const MainNavbar = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);

    const navigate = useNavigate();

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
            case "help":
                removeSidebar() /* closes the sidebar */
                //
                navigate("/help")
                break;
            case "login":
                removeSidebar() /* closes the sidebar */
                //
                navigate("/login")
                break;
            case "register":
                removeSidebar() /* closes the sidebar */
                //
                navigate("/register")
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
                                            <FaRegQuestionCircle /> Help
                                        </span>
                                    </li>
                                </Link>

                                <Link to="/login">
                                    <li className='figcaption'>Log in</li>
                                </Link>

                                <Link to="/register">
                                    <li className='figcaption'>
                                        <span className='px-4 py-2 text-black bg-white rounded-[2rem] shadow-md'>
                                            Sign Up
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
                            <ul className='flex flex-col gap-10 px-6 py-8 mt-10'>
                                {/* Nav Links */}
                                <button onClick={() => handleSidebarBtn("help")}>
                                    <li className='flex figcaption'>
                                        Help
                                    </li>
                                </button>

                                <button onClick={() => handleSidebarBtn("login")}>
                                    <li className='flex figcaption'>Log in</li>
                                </button>

                                <button onClick={() => handleSidebarBtn("register")}>
                                    <li className='flex figcaption'>
                                        Sign Up
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

export default MainNavbar