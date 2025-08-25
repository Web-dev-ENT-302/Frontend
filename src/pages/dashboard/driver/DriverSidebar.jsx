import { Link } from "react-router-dom"
import { RiEBike2Fill } from "react-icons/ri"
import { TfiMenuAlt } from "react-icons/tfi"
import { LuSquareActivity } from "react-icons/lu"
import { MdOutlineHistory } from "react-icons/md"

const DriverSidebar = ({activeTab}) => {
    // const [activeTab, setActivetab] = useState("ride-request")

    // const handleTabChange = (tab) => {
    //     setActivetab(tab)
    // }
    return (
        <div className="bg-white shadow-[1px_0px_3px_rgba(0,0,0,0.08)] fixed left-0 h-[100%] sm:w-[30%] lg:w-[20%] top-0 hidden sm:block z-20">
            <nav className="sm:mt-[3.7rem] lg:mt-[4.2rem]">
                <Link to="/driver">
                    <li className={`${activeTab === 'driver' ? 'bg-[#FFF2E3] border-[--primary] text-[--primary]' : 'border-[transparent] text-[#787878]'} border-l-4  py-5 px-4 md:px-8 font-medium`} >
                        <div className="flex items-center gap-4">
                            <TfiMenuAlt className="text-[1.1rem]" />
                            <span className="sm:text-[.8rem] md:text-md">Ride Requests</span>
                        </div>
                    </li>
                </Link>

                <Link to="/driver/current-ride">
                    <li className={`${activeTab === 'current-ride' ? 'bg-[#FFF2E3]  border-[--primary] text-[--primary]' : 'border-[transparent] text-[#787878]'} border-l-4 py-5 px-4 md:px-8 font-medium`} >
                        <div className="flex items-center gap-4">
                            <RiEBike2Fill className="text-[1.1rem]" />
                            <span className="sm:text-[.8rem] md:text-md">Current Ride</span>
                        </div>
                    </li>
                </Link>

                <Link to="/driver/activity">
                    <li className={`${activeTab === 'Activity' ? 'bg-[#FFF2E3]  border-[--primary] text-[--primary]' : 'border-[transparent] text-[#787878]'} border-l-4 py-5 px-4 md:px-8 font-medium`} >
                        <div className="flex items-center gap-4">
                            <LuSquareActivity className="text-[1.1rem]" />
                            <span className="sm:text-[.8rem] md:text-md">Activity</span>
                        </div>
                    </li>
                </Link>

                {/* <Link>
                    <li className={`${activeTab === 'history' ? 'bg-[#FFF2E3]  border-[--primary] text-[--primary]' : 'border-[transparent] text-[#787878]'} border-l-4 py-5 px-4 md:px-8 font-medium`} >
                        <div className="flex items-center gap-4">
                            <MdOutlineHistory className="text-[1.1rem]" />
                            <span className="sm:text-[.8rem] md:text-md">Ride History</span>
                        </div>
                    </li>
                </Link> */}
            </nav>
        </div>
    )
}

export default DriverSidebar