
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { AuthContext } from "../../../contexts/AuthContext";

// components
import RecentRides from "../components/ui/RecentRides";
import RideConfirmationModal from "../components/ui/RideConfirmationModal";

// icons
import { FaLocationDot } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa6";

//
import locationCoordinates from "../../../services/location";
import Spinner from "../../../components/Spinner";


const StudentDashboard = () => {
    const { user, token } = useContext(AuthContext) // user data and token
    const [loading, setLoading] = useState(false);
    const [ridesLoading, setRidesLoading] = useState(false);
    const [rides, setRides] = useState([]);
    const [ridesError, setRidesError] = useState(null);
    const [currentLocation, setLocation] = useState("");
    const [destination, setDestination] = useState("");
    const [rideDetailsModal, setRideDetailsModal] = useState(false);
    const [selectedRide, setSelectedRide] = useState(null);

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


    // Function to get all rides for the user
    const getRides = async () => {
        setRidesLoading(true);
        setRidesError(null);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rides/history?page=1&limit=20`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (!res.ok) {
                Notification("failed", data.error);
                return;
            }
            // handle success response
            setRides(data.rides);
        } catch (err) {
            Notification("failed", "Error fetching rides");
            setRidesError("Error fetching rides");
        } finally {
            setRidesLoading(false);
        }
    };

    // Fetch rides when component mounts or user changes
    useEffect(() => {
        if (user?.id && token) {
            getRides();
        }
    }, [user?.id]);


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

        // display the loading spinner
        setLoading(true)

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

                // stimulate a delay of 3 seconds
                setTimeout(() => {
                    // redirect to confirm ride
                    navigate('/student/confirm-ride', {
                        state: {
                            studentId: user?.userId,
                            from: currentLocation,
                            to: destination,
                            distance: parseFloat(distance.toFixed(2)),
                            duration: Math.round(duration),
                            price: 1000.00, // currently set to a fixed price. 1k
                        }
                    });

                    // 
                    setLoading(false)
                }, 2000)
            } else {
                console.error("Error converting coordinates to decimal format");
                setLoading(false)
            }
        } else {
            console.error("Could not find coordinates for selected locations");
            setLoading(false)
        }
    }




    // View ride details
    const viewRideDetails = (rideId) => {
        // Find the specific ride in the rides array that matches the rideId
        const foundRide = rides.find(ride => ride.id === rideId);

        if (foundRide) {
            // Check if the ride has not been accepted
            if (foundRide.driver === null) {
                if (foundRide.status === "PENDING") {
                    Notification("failed", "No driver has accepted this ride yet");
                } else if (foundRide.status === "PENDING") {
                    Notification("success", "This ride has been completed");
                } else if (foundRide.status === "CANCELLED") {
                    Notification("success", "This ride was Rejected");
                }
                else {
                    return;
                }
                return;
            }


            // Set the selected ride data
            setSelectedRide(foundRide);

            // Display the modal
            setRideDetailsModal(true);

            // Return the ride data
            return foundRide;
        } else {
            // Handle case where ride is not found
            Notification("failed", `Ride with ID #${rideId} not found`);
            return null;
        }
    }

    // Cancel ride function to pass to modal
    const cancelRide = async (rideId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rides/${rideId}/cancel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include'
            })

            const data = await res.json();

            if (!res.ok) {
                Notification("failed", data.error)
                return;
            }

            Notification("success", `Ride Cancelled`);

            // Optionally refresh rides list
            getRides();
        } catch (err) {
            Notification("failed", err.message)
        } finally {
            onClose();
        }
    }

    // close the modal
    const onClose = () => {
        setRideDetailsModal(false);
        setSelectedRide(null); // Clear selected ride when closing modal
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
                        {loading ?
                            <button form="requestRideForm" className="w-full bg-[--primary] py-[.7rem] sm:py-[.9rem] rounded-[10px] text-white shadow-[0px_0px_10px_rgba(212,113,0,.4)] font-medium hover:scale-[.99] transition-all ease-linear text-[.8rem] sm:text-sm flex items-center justify-center gap-2" disabled>
                                <Spinner />
                                Requesting ride...
                            </button>
                            :
                            <button form="requestRideForm" className="w-full bg-[--primary] py-[.7rem] sm:py-[.9rem] rounded-[10px] text-white shadow-[0px_0px_10px_rgba(212,113,0,.4)] font-medium hover:scale-[.99] transition-all ease-linear text-[.8rem] sm:text-sm">Request a Ride</button>
                        }
                    </div>


                    {/* rides */}
                    <div className="mt-14">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium text-[.9rem] sm:text-[1rem]">My Rides</h4>
                            <button
                                onClick={getRides}
                                className="text-[--primary] text-[.8rem] hover:underline"
                                disabled={ridesLoading}
                            >
                                {ridesLoading ? "Loading..." : "Refresh"}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 mt-4">
                            {ridesLoading ? (
                                // Loading state
                                <div className="flex items-center justify-center py-8">
                                    <Spinner />
                                    <span className="ml-2 text-[#787878]">Loading your rides...</span>
                                </div>
                            ) : ridesError && rides.length === 0 ? (
                                // Error state
                                <div className="py-8 text-center">
                                    <p className="text-red-500 text-[.9rem]">Failed to load rides</p>
                                    <button
                                        onClick={getRides}
                                        className="text-[--primary] text-[.8rem] hover:underline mt-2"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            ) : rides.length === 0 ? (
                                // Empty state
                                <div className="py-8 text-center">
                                    <p className="text-[#787878] text-[.9rem]">No rides found</p>
                                    <p className="text-[#787878] text-[.8rem] mt-1">Your ride history will appear here</p>
                                </div>
                            ) : (
                                // Display rides
                                rides.map((ride) => (
                                    <RecentRides
                                        key={ride.id}
                                        id={ride.id}
                                        location={ride.destination}
                                        price={ride.priceNaira}
                                        distance={`${ride.distanceKm} km` || "N/A"}
                                        estimatedTime={`${ride.durationMins} mins` || "N/A"}
                                        status={ride.status}
                                        viewRideDetails={() => viewRideDetails(ride.id)}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </div>

            {/* Check ride  */}
            <RideConfirmationModal
                open={rideDetailsModal}
                onClose={onClose}
                rideData={selectedRide}
                cancelRide={cancelRide}
            />
        </>
    )
}

export default StudentDashboard