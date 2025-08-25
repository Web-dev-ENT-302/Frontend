
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import { AuthContext } from "../../../contexts/AuthContext";

// components
import RecentRides from "../components/ui/RecentRides";

// icons
import { FaLocationDot } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa6";

//
import locationCoordinates from "../../../services/location";

const StudentDashboard = () => {
    const { user } = useContext(AuthContext) // user data
    const [currentLocation, setLocation] = useState("");
    const [destination, setDestination] = useState("")

    const navigate = useNavigate()

    // Function to convert DMS (Degrees, Minutes, Seconds) to decimal degrees
    const dmsToDecimal = (dms) => {
        const parts = dms.match(/(\d+)°(\d+)'(\d+)"([NS]|[EW])/);
        if (!parts) return null;

        let decimal = parseInt(parts[1]) + parseInt(parts[2]) / 60 + parseInt(parts[3]) / 3600;
        if (parts[4] === 'S' || parts[4] === 'W') {
            decimal = -decimal;
        }
        return decimal;
    };

    // Function to calculate distance using Haversine formula
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    };

    // Function to estimate duration (i assume average speed of 15 km/h for campus transportation)
    const calculateDuration = (distance) => {
        const averageSpeed = 15; // 15km/h
        const hours = distance / averageSpeed;
        const minutes = hours * 60;
        return minutes;
    };


    // handle request
    const requestRide = async (e) => {
        e.preventDefault();

        // Input Validation
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

        // Find coordinates for selected locations
        const fromLocation = Object.values(locationCoordinates).find(loc => loc.location === currentLocation);
        const toLocation = Object.values(locationCoordinates).find(loc => loc.location === destination);

        if (fromLocation && toLocation) {
            // Convert DMS to decimal degrees
            const fromLat = dmsToDecimal(fromLocation.latitude);
            const fromLon = dmsToDecimal(fromLocation.longitude);
            const toLat = dmsToDecimal(toLocation.latitude);
            const toLon = dmsToDecimal(toLocation.longitude);

            if (fromLat && fromLon && toLat && toLon) {
                // Calculate distance and duration
                const distance = calculateDistance(fromLat, fromLon, toLat, toLon);
                const duration = calculateDuration(distance);

                // redirect to confirm ride
                navigate('/student/confirm-ride', {
                    state: {
                        studentId: user?.userId,
                        from: currentLocation,
                        to: destination,
                        distance: distance.toFixed(2),
                        duration: Math.round(duration),
                    }
                });
            } else {
                console.error("Error converting coordinates to decimal format");
            }
        } else {
            console.error("Could not find coordinates for selected locations");
        }
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
                                    {Object.values(locationCoordinates).map((loc, index) => (
                                        <option key={index} value={loc.location} className="text-black">
                                            {loc.location}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative mt-3">
                                <FaFlag className="absolute top-[.9rem] left-[.9rem] text-[#486FFF]" />
                                <select name="destination" value={destination} onChange={(e) => setDestination(e.target.value)} className="bg-[#F5F0E9] w-full rounded-full py-3 outline-none px-10 text-sm text-[#787878]">
                                    <option value="">Destination</option>
                                    {Object.values(locationCoordinates).map((loc, index) => (
                                        <option key={index} value={loc.location} className="text-black">
                                            {loc.location}
                                        </option>
                                    ))}
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