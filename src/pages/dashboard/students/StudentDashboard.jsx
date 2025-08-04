import { FaLocationDot } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa6";
import mapImage from "../../../assets/images/map-image.svg"
import { FaBook } from "react-icons/fa6";
import { FaHouse } from "react-icons/fa6";
import { GiGate } from "react-icons/gi";
import { MdSportsBasketball } from "react-icons/md";
import QuickDestinationCard from "../components/QuickDestinationCard";
import { MdHistory } from "react-icons/md";

const StudentDashboard = () => {
    return (
        <>
            <section className="my-28">
                {/*  */}
                <div>
                    <h3 className="font-semibold">Hi, Ayomide</h3>
                    <p className="figcaption text-[#787878]">Where are you going today?</p>
                </div>

                {/* Location Search box */}
                <div className="w-full p-4 bg-white rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.08)] mt-6">
                    <div>
                        <div className="relative">
                            <FaLocationDot className="absolute top-[.9rem] left-[.9rem] text-[#FFA238]" />
                            <input type="text" className="bg-[#F5F0E9] w-full rounded-full py-3 outline-none px-10 text-sm" placeholder="New Hostel" />
                        </div>
                        <div className="relative mt-3">
                            <FaFlag className="absolute top-[.9rem] left-[.9rem] text-[#486FFF]" />
                            <input type="text" className="bg-[#F5F0E9] w-full rounded-full py-3 outline-none px-10 text-sm" placeholder="Where to?" />
                        </div>
                    </div>
                </div>

                {/* Live map container */}
                <div className="w-full mt-4 rounded-2xl ">
                    <img src={mapImage} alt="" className="object-cover w-full" />
                </div>

                {/* request a ride btn */}
                <div className="relative mt-8">
                    <button className="w-full bg-[--primary] py-[.9rem] rounded-[10px] text-white text-sm shadow-[0px_0px_10px_rgba(212,113,0,.4)] font-medium hover:scale-[.99] transition-all ease-linear">Request a Ride</button>
                </div>

                {/* quick destination */}
                <div className="mt-10">
                    <h4 className="font-medium">Quick Destinations </h4>
                    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                        <QuickDestinationCard location={"Main Library"} distance="500m away" icon={<FaBook />} iconColor="bg-[#EBEFFF]" iconBgColor="text-[#1A46EA]" />
                        <QuickDestinationCard location={"New Hostel"} distance="1.2km away" icon={<FaHouse />} iconColor="bg-[#E3FFE0]" iconBgColor="text-[#12A704]" />
                        <QuickDestinationCard location={"South Gate"} distance="2.7km away" icon={<GiGate />} iconColor="bg-[#FFEBD7]" iconBgColor="text-[#AE5700]" />
                        <QuickDestinationCard location={"Sport Complex"} distance="1.5km away" icon={<MdSportsBasketball />} iconColor="bg-[#FFEAEA]" iconBgColor="text-[#DD0000]" />
                    </div>
                </div>


                {/* recent rides */}
                {/* <div className="mt-10">
                    <h4 className="font-medium">Recent Rides </h4>
                    <div className="grid grid-cols-1 mt-4">
                        <div className="p-4 bg-white rounded-[10px] shadow-[0px_0px_10px_rgba(0,0,0,0.04)] flex gap-3 items-center cursor-pointer hover:shadow-[0px_0px_10px_rgba(0,0,0,0.1)]  transition-all ease-linear">
                            <div>
                                <div>
                                    <span className={` text-[#3A3A3A] bg-[#ff0000] `}>
                                        <MdHistory />
                                    </span>
                                    <p>3 in 1 LT</p>
                                </div>
                                <p>Yesterday</p>
                            </div>

                        </div>

                    </div>
                </div> */}
            </section>
        </>
    )
}

export default StudentDashboard