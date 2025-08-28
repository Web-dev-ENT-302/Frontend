import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext'

import DriverSidebar from './DriverSidebar'

import { TbRefresh } from 'react-icons/tb'
import defaultProfileImage from "../../../assets/images/profileImages/defaultProfile.png"
import RideRequestCards from '../components/ui/RideRequestCards'
import Spinner from '../../../components/Spinner'
import getRelativeTime from '../../../services/getTime';
import { useNavigate } from 'react-router-dom';


const DriverDashboard = () => {
    const { user, token } = useContext(AuthContext) // user data and token
    const [rideRequests, setRideRequests] = useState([]);
    const [requestsLoading, setRequestsLoading] = useState(false);
    const [requestsError, setRequestsError] = useState(null);

    const navigate = useNavigate()

    // Function to get all ride requests for the driver
    const getRideRequest = async () => {
        setRequestsLoading(true);
        setRequestsError(null);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/driver/rides/available`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (!res.ok) {
                Notification("failed", data.error);
            }

            // handle success response
            setRideRequests(data.rides || []);

        } catch (err) {
            Notification("failed", "Error fetching ride requests:");
            setRequestsError(err.message);
        } finally {
            setRequestsLoading(false);
        }
    };

    // Fetch ride requests when component mounts or user changes
    useEffect(() => {
        if (user?.id && token) {
            getRideRequest();
        }
    }, [user?.id, token]);



    /* handler to accept ride */
    const acceptRideRequest = async (rideId) => {
        const acceptedRide = rideRequests.find(ride => ride.id === rideId);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rides/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    rideId: acceptedRide.id,
                }),
                credentials: 'include'
            })

            const data = await res.json();

            if (!res.ok) {
                // Handle Failed Response
                Notification("failed", data.error)
                return;
            }

            // handle suucess response
            Notification("success", `Ride Request Accepted`);
            navigate("/driver/current-ride")

        } catch (err) {
            Notification("failed", err.message)
        } finally {
            getRideRequest();
        }
    }

    /* stimulated reject ride */
    const rejectRideRequest = async (rideId) => {
        const rejectedRideId = rideRequests.find(ride => ride.id === rideId);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rides/reject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    rideId: rejectedRideId.id,
                }),
                credentials: 'include'
            })

            const data = await res.json();

            if (!res.ok) {
                // Handle Failed Response
                Notification("failed", data.error)
                return;
            }

            // handle suucess response
            Notification("success", `Ride Request Rejected`);

        } catch (err) {
            Notification("failed", err.message)
        } finally {
            getRideRequest();
        }

    }

    return (
        <div className='driver-dashboard-container'>
            <div className='flex gap-2'>
                {/* side bar */}
                <DriverSidebar activeTab="driver" />

                {/* main content area */}
                <div className='w-[100%] sm:w-[80%] sm:ml-[30%] lg:ml-[20%] mt-[5rem] sm:mt-[4rem]'>
                    <div className='px-4 mt-1 mb-10 sm:mt-0 sm:mb-0 sm:pl-6 sm:pr-6 md:pr-16 sm:py-6 md:py-7'>
                        {/* Top Bar */}
                        <div className='flex items-center justify-between'>
                            <h4 className='font-semibold sm:text-[.9rem] md:text-lg text-[1rem]'>Ride Requests</h4>
                            <button
                                onClick={getRideRequest}
                                className='flex items-center gap-1 text-[--primary] font-medium text-[.9rem] sm:text-md'
                                disabled={requestsLoading}
                            >
                                <TbRefresh className={`sm:text-[1.1rem] text-[1rem] ${requestsLoading ? 'animate-spin' : ''}`} />
                                {requestsLoading ? 'Loading...' : 'Refresh'}
                            </button>
                        </div>

                        {/* Main section */}
                        <div className='mt-4 sm:mt-4'>
                            {/* ride request card wrapper */}
                            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                                {requestsLoading ? (
                                    // Loading state
                                    <div className="flex items-center justify-center col-span-1 py-12 lg:col-span-2">
                                        <Spinner />
                                        <span className="ml-2 text-[#787878]">Loading ride requests...</span>
                                    </div>
                                ) : requestsError && rideRequests.length === 0 ? (
                                    // Error state 
                                    <div className="col-span-1 py-12 text-center lg:col-span-2">
                                        <p className="text-red-500 text-[.9rem] mb-2">Failed to load ride requests</p>
                                        <button
                                            onClick={getRideRequest}
                                            className="text-[--primary] text-[.8rem] hover:underline"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                ) : rideRequests.length === 0 ? (
                                    // Empty state
                                    <div className="col-span-1 py-12 text-center lg:col-span-2">
                                        <p className="text-[#787878] text-[.9rem]">No ride requests available</p>
                                        <p className="text-[#787878] text-[.8rem] mt-1">New ride requests will appear here</p>
                                    </div>
                                ) : (
                                    // Display ride requests
                                    rideRequests.slice().reverse().map((data) => (
                                        <RideRequestCards
                                            key={data.id}
                                            profileImage={defaultProfileImage}
                                            name={data.student?.name}
                                            time={getRelativeTime(data.createdAt)}
                                            price={data.priceNaira}
                                            pickup={data.pickup || "N/A"}
                                            dropoff={data.destination || "N/A"}
                                            distance={data.distanceKm || "N/A"}
                                            ETA={`${data.durationMins} mins`}
                                            onAccept={() => acceptRideRequest(data.id)}
                                            // onReject={() => rejectRideRequest(data.id)}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DriverDashboard