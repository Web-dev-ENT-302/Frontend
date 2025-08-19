import { FaRoad } from "react-icons/fa6"
import { IoTimeOutline } from "react-icons/io5"
import { MdHistory } from "react-icons/md"
import { TbCurrencyNaira } from "react-icons/tb"

const RecentRides = ({ location, price, distance, estimatedTime }) => {
    const viewRide = () => {
        Notification("in-progress", "Dev is busy implementing this feature  :)")
    }
    return (
        <div className="p-4 bg-white rounded-[10px] shadow-[0px_0px_10px_rgba(0,0,0,0.04)] flex gap-3 items-center cursor-pointer hover:shadow-[0px_0px_10px_rgba(0,0,0,0.1)]  transition-all ease-linear" onClick={() => viewRide()}>
            <div className="w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className={`bg-[#EFEFEF] p-[.4rem] text-[1.1rem] rounded-full text-[#3A3A3A]`}>
                            <MdHistory />
                        </span>
                        <p className="leading-none font-medium text-[14px]">{location}</p>
                    </div>
                    <div>
                        <span className="bg-[#efefef] text-[#3a3a3a] text-[.6rem] md:text-[.7rem] md:py-[.1rem] px-1 md:px-2 rounded-full">View details</span>
                    </div>
                </div>

                <div className="flex items-center gap-6 mt-3">
                    <span className="flex items-center text-[#787878] gap-1">
                        <TbCurrencyNaira />
                        <p className="text-[.8rem] leading-none">{price}</p>
                    </span>
                    <span className="flex items-center text-[#787878] gap-1">
                        <FaRoad />
                        <p className="text-[.8rem] leading-none">{distance}</p>
                    </span>
                    <span className="flex items-center text-[#787878] gap-1">
                        <IoTimeOutline />
                        <p className="text-[.8rem] leading-none">{estimatedTime}</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default RecentRides