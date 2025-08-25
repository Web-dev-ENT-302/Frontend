import { CgTrack } from "react-icons/cg"
import { FaRoad } from "react-icons/fa6"
import { IoTimeOutline } from "react-icons/io5"
import { MdHistory } from "react-icons/md"
import { RiEBike2Fill } from "react-icons/ri"
import { TbCurrencyNaira } from "react-icons/tb"
import { Link } from "react-router-dom"

const RecentRides = ({ location, price, distance, estimatedTime, status }) => {
    // const viewRide = () => {
    //     Notification("in-progress", "Dev is busy implementing this feature  :)")
    // }
    return (
        <Link to="/student/ride">
            <div className="p-4 bg-white rounded-[10px] shadow-[0px_0px_10px_rgba(0,0,0,0.04)] flex gap-3 items-center cursor-pointer hover:shadow-[0px_0px_10px_rgba(0,0,0,0.1)]  transition-all ease-linear">
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className={`bg-[#EFEFEF] p-[.4rem] text-[1.1rem] rounded-full text-[#3A3A3A]`}>
                                <RiEBike2Fill />
                            </span>
                            <p className="leading-none font-medium text-[14px]">{location}</p>
                        </div>
                        <div>
                            {status === "pending" &&
                                <span className={`bg-blue-100 text-blue-700 text-[.6rem] md:text-[.7rem] md:py-[.1rem] px-1 md:px-3 rounded-[5px] capitalize `}>{status}</span>
                            }
                            {status === "accepted" &&
                                <span className={`bg-yellow-100 text-yellow-700 text-[.6rem] md:text-[.7rem] md:py-[.1rem] px-1 md:px-3 rounded-[5px] capitalize `}>{status}</span>
                            }

                            {status === "completed" &&
                                <span className={`bg-green-100 text-green-700 text-[.6rem] md:text-[.7rem] md:py-[.1rem] px-1 md:px-3 rounded-[5px] capitalize`}>{status}</span>
                            }
                            {status === "rejected" &&
                                <span className={`bg-red-100 text-red-700 text-[.6rem] md:text-[.7rem] md:py-[.1rem] px-1 md:px-3 rounded-[5px] capitalize`}>{status}</span>
                            }

                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-6 mt-4 md:mt-6">
                        <div className="flex items-center gap-6">
                            <span className="flex items-center text-[#787878] gap-1">
                                <TbCurrencyNaira />
                                <p className="text-[.8rem] leading-none">{price}</p>
                            </span>
                            <span className="sm:flex items-center text-[#787878] gap-1 hidden">
                                <IoTimeOutline />
                                <p className="text-[.8rem] leading-none">{estimatedTime}</p>
                            </span>
                            <span className="sm:flex items-center text-[#787878] gap-1 hidden">
                                <FaRoad />
                                <p className="text-[.8rem] leading-none">{distance}</p>
                            </span>
                        </div>
                        <span className="flex items-center gap-1 font-medium text-[#000000]">
                            <CgTrack />
                            <p className="text-[.8rem] leading-none">Track ride</p>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default RecentRides