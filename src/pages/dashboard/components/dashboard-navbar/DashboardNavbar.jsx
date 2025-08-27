import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';

/* assets */
import logo from "../../../../assets/images/svg/logo.svg"
import defaulProfileImage from "../../../../assets/images/profileImages/defaultProfile.png"

/* icons */
import { FaRegQuestionCircle } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { RiLogoutBoxRLine } from 'react-icons/ri';


const DashboardNavbar = () => {
    const { user, logout } = useContext(AuthContext);

    const [showOverlay, setShowOverlay] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);
    const [role, setRole] = useState("")
    const [activeNavTab, setActiveNavTab] = useState("")
    const [status, setStatus] = useState(true)

    const { pathname } = useLocation()
    const navigate = useNavigate()


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
                setActiveNavTab("profile")
                //
                console.log("/profile")
                break;

            case "logout":
                removeSidebar() /* closes the side bar */
                //
                logout()
                break;

            /* Driver Dashboard routes */
            case "ride-requests":
                removeSidebar() /* closes the side bar */
                setActiveNavTab("ride-requests")
                //
                navigate("/driver")
                break;

            case "current-ride":
                removeSidebar() /* closes the side bar */
                setActiveNavTab("current-ride")
                //
                navigate("/driver/current-ride")
                break;

            case "activity":
                removeSidebar() /* closes the side bar */
                setActiveNavTab("activity")
                //
                navigate("/driver/activity")
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        if (pathname.startsWith('/driver')) {
            setRole("DRIVER")
        } else {
            setRole("STUDENT")
        }
    }, [pathname]) // This re-runs only when `pathname` changes.

    return (
        <>
            <nav className={`bg-[--primary] ${role === "STUDENT" ? 'py-4' : 'py-[1rem] sm:py-[.6rem]'} fixed top-0 left-0 w-full z-[100]`} >
                <div className="container">
                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <Link to={`${role === "STUDENT" ? "/student" : "/driver"}`}>
                            <div className="sm:w-[90%] w-[75%] ">
                                <img src={logo} alt="logo" className='object-cover w-full' />
                            </div>
                        </Link>

                        {/* Nav Links: visible on larger screen */}
                        {role === "STUDENT" ?
                            <>
                                <div className="hidden sm:block">
                                    <ul className='flex items-center gap-[2rem] text-white'>
                                        {/* Nav Links */}
                                        <Link to="">
                                            <li className='figcaption'>
                                                <span className='px-4 py-[.4rem] text-black bg-white rounded-[2rem] shadow-md capitalize'>
                                                    {user?.name}
                                                </span>
                                            </li>
                                        </Link>

                                        {
                                            user ?
                                                <>
                                                    <button onClick={logout}>
                                                        <li className='figcaption'>
                                                            <span className='flex items-center gap-1'>
                                                                <RiLogoutBoxRLine className='text-[1rem]' /> Logout
                                                            </span>
                                                        </li>
                                                    </button>
                                                </>
                                                :
                                                <>
                                                    <Link to="/help">
                                                        <li className='figcaption'>
                                                            <span className='flex items-center gap-1'>
                                                                <FaRegQuestionCircle /> Help
                                                            </span>
                                                        </li>
                                                    </Link>
                                                </>
                                        }
                                    </ul>
                                </div>
                            </>
                            :
                            <>
                                <div className="hidden sm:block">
                                    <ul className='flex items-center gap-[1.5rem] text-white'>
                                        {/* Nav Links */}
                                        <li>
                                            <div className='flex items-center gap-3'>
                                                <div>
                                                    <h4 className='capitalize md:text-[1rem] font-medium sm:text-[.8rem]'>{user?.name}</h4>
                                                    <p className='flex justify-end sm:text-[.7rem] md:text-sm'>{user?.plateNumber}</p>
                                                </div>
                                                <Link to="">
                                                    <div className='relative'>
                                                        <div className={`sm:w-[2.5rem] sm:h-[2.5rem] md:w-[3rem]  md:h-[3rem] cursor-pointer rounded-full relative overflow-hidden ${status ? 'border border-[#12A704]' : 'border border-[#787878]'}`}>
                                                            <img src={defaulProfileImage} alt="profile image" className='object-cover w-full' />
                                                            {/* status indictor */}
                                                        </div>
                                                        <div className={`sm:w-2 sm:h-2 md:w-3 md:h-3 ${status ? 'bg-[#12A704]' : 'bg-[#787878]'} absolute rounded-full sm:right-[.3rem] sm:top-[2rem] md:right-[.1rem] md:top-[2.1rem]`}></div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </li>

                                        {
                                            user ?
                                                <>
                                                    <button onClick={logout}>
                                                        <li className='figcaption'>
                                                            <span className='flex items-center gap-1'>
                                                                <RiLogoutBoxRLine className='text-[1.3rem]' />
                                                            </span>
                                                        </li>
                                                    </button>
                                                </>
                                                :
                                                null
                                        }
                                    </ul>
                                </div>
                            </>}


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
                            {role === "STUDENT" ?
                                <>
                                    <ul className='flex flex-col gap-6 px-6 py-8 mt-8 text-[#787878]'>
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
                                </>
                                :
                                <>
                                    <ul className='flex flex-col gap-6 px-6 py-8 mt-8'>
                                        {/* Nav Links */}
                                        <button className={`${activeNavTab === "ride-requests" ? "text-black" : "text-[#787878]"}`} onClick={() => handleSidebarBtn("ride-requests")}>
                                            <li className='flex figcaption'>Ride Requests</li>
                                        </button>
                                        <button className={`${activeNavTab === "current-ride" ? "text-black" : "text-[#787878]"}`} onClick={() => handleSidebarBtn("current-ride")}>
                                            <li className='flex figcaption'>Current Ride</li>
                                        </button>
                                        <button className={`${activeNavTab === "activity" ? "text-black" : "text-[#787878]"}`} onClick={() => handleSidebarBtn("activity")}>
                                            <li className='flex figcaption'>Activity</li>
                                        </button>

                                        <button onClick={() => handleSidebarBtn("logout")}>
                                            <li className='flex text-red-500 figcaption'>
                                                Log out
                                            </li>
                                        </button>
                                    </ul>
                                </>
                            }

                        </div>
                    </div>
                </div >
            </nav >
        </>
    )
}

export default DashboardNavbar