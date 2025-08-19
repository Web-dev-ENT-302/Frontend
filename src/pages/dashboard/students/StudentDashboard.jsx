
import { useContext, useState } from "react";
import mapImage from "../../../assets/images/svg/map-image.svg"
import { AuthContext } from "../../../contexts/AuthContext";

// components
import RecentRides from "../components/ui/RecentRides";

// icons
import { FaLocationDot } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa6";
import Spinner from "../../../components/Spinner";

const StudentDashboard = () => {
    const { user, token } = useContext(AuthContext) // user data
    const [currentLocation, setLocation] = useState("");
    const [destination, setDestination] = useState("")
    const [loading, setLoading] = useState(false)


    // handle request
    const requestRide = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (currentLocation === "") {
            Notification("failed", "Select current location");
            setLoading(false);
            return
        } else if (destination === "") {
            Notification("failed", "Select your destination")
            setLoading(false);
            return
        } else if (currentLocation === destination) {
            Notification("failed", "Same location")
            setLoading(false);
            return
        }


        // request ride
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rides/request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    pickup: currentLocation,
                    destination: destination,
                }),
                credentials: 'include'
            })

            const data = await res.json();

            if (!res.ok) {
                // Handle Failed Response
                Notification("failed", data.error)
                console.log(token)
                return;
            }

            // handle suucess response
            Notification("success", "Ride requested successfully");
        } catch (err) {
            Notification("failed", err.message)
        } finally {
            setLoading(false);
        }

    }


    return (
        <>
            <section className="my-28">
                <div>
                    <h3 className="font-semibold text-[1.2rem] md:text-[1.5rem]">Hi, {user?.name}</h3>
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

                {/* Live map  */}
                <div className="w-full mt-4 rounded-2xl ">
                    <img src={mapImage} alt="" className="object-cover w-full" />
                </div>

                {/* request a ride btn */}
                <div className="relative mt-8">
                    {
                        loading ?
                            <>
                                <button className="w-full bg-[--primary] py-[.7rem] sm:py-[.9rem] rounded-[10px] text-white shadow-[0px_0px_10px_rgba(212,113,0,.4)] font-medium hover:scale-[.99] transition-all ease-linear text-[.8rem] sm:text-sm flex  items-center justify-center gap-2 disabled:cursor-not-allowed" disabled>
                                    <Spinner />
                                    Requesting ride...
                                </button>
                            </>
                            :
                            <>
                                <button form="requestRideForm" className="w-full bg-[--primary] py-[.7rem] sm:py-[.9rem] rounded-[10px] text-white shadow-[0px_0px_10px_rgba(212,113,0,.4)] font-medium hover:scale-[.99] transition-all ease-linear text-[.8rem] sm:text-sm">Request a Ride</button>
                            </>
                    }

                </div>


                {/* rides */}
                <div className="mt-10">
                    <h4 className="font-medium text-[.9rem] sm:text-[1rem]">My Rides </h4>
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