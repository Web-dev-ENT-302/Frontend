import { useState } from "react";
import {Link} from "react-router-dom"

import mapImage from "../../../assets/images/map-image.svg"

// components
import QuickDestinationCard from "../components/ui/QuickDestinationCard";
import RecentRides from "../components/ui/RecentRides";

// icons
import { FaLocationDot } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa6";
import { FaBook } from "react-icons/fa6";
import { FaHouse } from "react-icons/fa6";
import { GiGate } from "react-icons/gi";
import { MdSportsBasketball } from "react-icons/md";

const StudentDashboard = () => {
    return (
        <>
            <section className="my-28">
                <div>
                    <h3 className="font-semibold text-[1.2rem] md:text-[1.5rem]">Hi, Ayomide</h3>
                    <p className="text-[#787878] text-[.8rem] md:text-sm">Where are you going today?</p>
                </div>

                {/* Location Search box */}
                <div className="w-full p-4 bg-white rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.08)] mt-6">
                    <div>
                        <div className="relative">
                            <FaLocationDot className="absolute top-[.9rem] left-[.9rem] text-[#FFA238]" />
                            <input type="text" className="bg-[#F5F0E9] w-full rounded-full py-3 outline-none px-10 text-sm" placeholder="New Hostel"/>
                        </div>
                        <div className="relative mt-3">
                            <FaFlag className="absolute top-[.9rem] left-[.9rem] text-[#486FFF]" />
                            <input type="text" className="bg-[#F5F0E9] w-full rounded-full py-3 outline-none px-10 text-sm" placeholder="Where to?" />
                        </div>
                    </div>
                </div>

                {/* Live map  */}
                <div className="w-full mt-4 rounded-2xl ">
                    <img src={mapImage} alt="" className="object-cover w-full" />
                </div>

                {/* request a ride btn */}
                <div className="relative mt-8">
                    <Link to="/confirm-ride">
                    <button onClick className="w-full bg-[--primary] py-[.7rem] sm:py-[.9rem] rounded-[10px] text-white shadow-[0px_0px_10px_rgba(212,113,0,.4)] font-medium hover:scale-[.99] transition-all ease-linear text-[.8rem] sm:text-sm">Request a Ride</button>
                    </Link>
                </div>

                {/* quick destination */}
                <div className="mt-10">
                    <h4 className="font-medium text-[.9rem] sm:text-[1rem]">Quick Destinations </h4>
                    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                        <QuickDestinationCard location={"Main Library"} distance="500m away" icon={<FaBook />} iconColor="bg-[#EBEFFF]" iconBgColor="text-[#1A46EA]" />
                        <QuickDestinationCard location={"New Hostel"} distance="1.2km away" icon={<FaHouse />} iconColor="bg-[#E3FFE0]" iconBgColor="text-[#12A704]" />
                        <QuickDestinationCard location={"South Gate"} distance="2.7km away" icon={<GiGate />} iconColor="bg-[#FFEBD7]" iconBgColor="text-[#AE5700]" />
                        <QuickDestinationCard location={"Sport Complex"} distance="1.5km away" icon={<MdSportsBasketball />} iconColor="bg-[#FFEAEA]" iconBgColor="text-[#DD0000]" />
                    </div>
                </div>

                
                {/* recent rides */}
                <div className="mt-10">
                    <h4 className="font-medium text-[.9rem] sm:text-[1rem]">Recent Rides </h4>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        <RecentRides location="3 in 1 LT" price="700.00" distance="2.7km" estimatedTime="12 mins" />
                        <RecentRides location="SOC" price="500.00" distance="1.7km" estimatedTime="4 mins" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default StudentDashboard