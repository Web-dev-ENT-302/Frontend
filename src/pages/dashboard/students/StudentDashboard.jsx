
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import { AuthContext } from "../../../contexts/AuthContext";

// components
import RecentRides from "../components/ui/RecentRides";

// icons
import { FaLocationDot } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa6";

const StudentDashboard = () => {
    const { user } = useContext(AuthContext) // user data
    const [currentLocation, setLocation] = useState("");
    const [destination, setDestination] = useState("")

    const navigate = useNavigate()


    // handle request
    const requestRide = async (e) => {
        e.preventDefault();

        if (currentLocation === "") {
            Notification("failed", "Select current location");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return
        } else if (destination === "") {
            Notification("failed", "Select your destination")
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return
        } else if (currentLocation === destination) {
            Notification("failed", "Same location")
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return
        }


        // redirect to confirm ride
        navigate('/student/confirm-ride', {
            state: {
                from: currentLocation,
                to: destination
            }
        });
    }


    return (
        <>
            <div className="container lg:px-[1.5rem]">
                <section className="my-24">
                    <div>
                        <h3 className="font-semibold text-[1.2rem] md:text-[1.5rem] capitalize">Hi, {user?.name}</h3>
                        <p className="text-[#787878] text-[.8rem] md:text-sm">Where are you going today?</p>
                    </div>

                    {/* Location Search box */}
                    <div className="w-full p-4 bg-white rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.08)] mt-6">
                        <form method="POST" onSubmit={requestRide} id="requestRideForm">
                            <div className="relative">
                                <FaLocationDot className="absolute top-[.9rem] left-[.9rem] text-[#FFA238]" />
                                <select name="currentLocation" value={currentLocation} onChange={(e) => setLocation(e.target.value)} className="bg-[#F5F0E9] w-full rounded-full py-3 outline-none px-10 text-sm text-[#787878]">
                                    <option value="">Current Location</option>
                                    <option value="SOC" className="text-black">SOC</option>
                                    <option value="SEET" className="text-black">SEET</option>
                                </select>
                            </div>
                            <div className="relative mt-3">
                                <FaFlag className="absolute top-[.9rem] left-[.9rem] text-[#486FFF]" />
                                <select name="destination" value={destination} onChange={(e) => setDestination(e.target.value)} className="bg-[#F5F0E9] w-full rounded-full py-3 outline-none px-10 text-sm text-[#787878]">
                                    <option value="">Destination</option>
                                    <option value="SOC" className="text-black">SOC</option>
                                    <option value="SEET" className="text-black">SEET</option>
                                </select>
                            </div>
                        </form>
                    </div>


                    {/* request a ride btn */}
                    <div className="relative mt-8">
                        <button form="requestRideForm" className="w-full bg-[--primary] py-[.7rem] sm:py-[.9rem] rounded-[10px] text-white shadow-[0px_0px_10px_rgba(212,113,0,.4)] font-medium hover:scale-[.99] transition-all ease-linear text-[.8rem] sm:text-sm">Request a Ride</button>
                    </div>


                    {/* rides */}
                    <div className="mt-14">
                        <h4 className="font-medium text-[.9rem] sm:text-[1rem]">My Rides </h4>
                        <div className="grid grid-cols-1 gap-4 mt-4">
                            <RecentRides location="3 in 1 LT" price="700.00" distance="2.7km" estimatedTime="12 mins" status="pending" />
                            <RecentRides location="SOC" price="500.00" distance="1.7km" estimatedTime="4 mins" status="completed" />
                            <RecentRides location="SOC" price="500.00" distance="1.7km" estimatedTime="4 mins" status="accepted" />
                            <RecentRides location="SEET" price="500.00" distance="1.7km" estimatedTime="4 mins" status="rejected" />
                            <RecentRides location="SEET" price="500.00" distance="1.7km" estimatedTime="4 mins" status="completed" />
                            <RecentRides location="SEET" price="500.00" distance="1.7km" estimatedTime="4 mins" status="completed" />
                            <RecentRides location="SEET" price="500.00" distance="1.7km" estimatedTime="4 mins" status="rejected" />
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default StudentDashboard