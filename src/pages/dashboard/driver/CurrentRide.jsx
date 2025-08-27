import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DriverSidebar from './DriverSidebar'
import { AuthContext } from '../../../contexts/AuthContext'

import defaultProfileImage from "../../../assets/images/profileImages/defaultProfile.png"
import { TbCancel, TbRefresh } from 'react-icons/tb'
import { FaCircle, FaFlagCheckered, FaRegStar, FaStar } from 'react-icons/fa6'
import { IoCall, IoLocationSharp } from 'react-icons/io5'

const CurrentRide = () => {
    const { user, token } = useContext(AuthContext) // user data and token
    const [currentRide, setCurrentRide] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    // Function to get current ride for the driver
    const getCurrentRide = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/driver/rides/current`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (!res.ok) {
                // Handle Failed Response
                Notification("failed", data.error)
                return;
            }


            if (data.message === "No current ride assigned" || data.ride === null) {
                return
            }
            // Handle success response
            setCurrentRide(data)
        } catch (err) {
            Notification("failed", `Error fetching current ride`);
            setError(err.message);

        } finally {
            setLoading(false);
        }
    };

    // Fetch current ride when component mounts or user changes
    useEffect(() => {
        if (user?.id && token) {
            getCurrentRide();
        }
    }, [user?.id, token]);

    const completeRide = async (rideId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rides/${rideId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    status: "COMPLETED",
                }),
                credentials: 'include'
            });

            const data = await res.json();

            if (!res.ok) {
                // Handle Failed Response
                Notification("failed", data.error)
                return;
            }

            // Handle success response
            Notification("success", `Ride Completed!`);

            // navigate to drivers stat
            navigate("/driver/activity")
        } catch (err) {
            Notification("failed", `${err.message}`);

        } finally {
            getCurrentRide();
        }
    }

    const cancelRide = async (rideId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rides/reject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    rideId: rideId,
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
            Notification("success", `Ride Rejected Successfully`);

        } catch (err) {
            Notification("failed", err.message)
        } finally {
            getCurrentRide();
        }

    }
    return (
        <div className='driver-dashboard-container'>
            <div className='flex gap-2'>
                {/* side bar */}
                <DriverSidebar activeTab="current-ride" />

                {/* main content area */}
                <div className='w-[100%] sm:w-[80%] sm:ml-[30%] lg:ml-[20%] mt-[5rem] sm:mt-[4rem]'>
                    <div className='px-4 mt-1 mb-10 sm:mt-0 sm:mb-0 sm:pl-6 sm:pr-6 md:pr-16 sm:py-6 md:py-7'>
                        {/* Top Bar */}
                        <div className='flex items-center justify-between'>
                            <h4 className='font-semibold sm:text-[.9rem] md:text-lg text-[1rem]'>Current Ride</h4>
                            <button
                                onClick={getCurrentRide}
                                className='flex items-center gap-1 text-[--primary] font-medium text-[.9rem] sm:text-md'
                                disabled={loading}
                            >
                                <TbRefresh className={`sm:text-[1.1rem] text-[1rem] ${loading ? 'animate-spin' : ''}`} />
                                {loading ? 'Loading...' : 'Refresh'}
                            </button>
                        </div>


                        <div className='mt-4 sm:mt-4'>

                            {/* Ride details */}
                            {currentRide ?
                                <div className='w-full bg-white rounded-md shadow-[0px_0px_3px_rgba(0,0,0,0.1)] mt-4 px-3 sm:px-4 py-4 sm:py-6'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <div className="w-[2.5rem] h-[2.5rem] sm:w-[3rem] sm:h-[3rem] overflow-hidden rounded-full">
                                                <img src={defaultProfileImage} alt="" className='object-cover w-full' />
                                            </div>
                                            <div>
                                                <h4 className='font-medium capitalize text-[.8rem] sm:text-[1.1rem]'>{currentRide?.ride?.student?.name}</h4>
                                                {/* star ratings */}
                                                <div className='flex items-center gap-1'>
                                                    <div className="text-[#E9A30D] text-[.8rem] flex items-center gap-1">
                                                        <FaStar />
                                                        <FaStar />
                                                        <FaStar />
                                                        <FaStar />
                                                        <FaRegStar />
                                                    </div>
                                                    <span className='text-[.8rem] leading-none text-[#3A3A3A]'>(4.0)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <a href={`tel:${currentRide?.ride?.student?.phone}`}>
                                                <div className="bg-[#FFF4E8] p-2 md:p-3 rounded-full">
                                                    <IoCall className="text-[--primary] text-[1rem] md:text-[1.2rem]" />
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    {/* pick up */}
                                    <div className='flex items-center gap-3 mt-4 sm:mt-5'>
                                        <FaCircle className='text-[#12A704] text-[.7rem] sm:text-[.8rem]' />
                                        <div>
                                            <p className='text-[.75rem] sm:text-sm text-[#787878]'>Pickup</p>
                                            <p className='text-[.8rem] sm:text-[.9rem] font-medium'>{currentRide?.ride?.pickup}</p>
                                        </div>
                                    </div>

                                    {/*drop off */}
                                    <div className='flex items-center gap-3 mt-4'>
                                        <IoLocationSharp className='text-[#DD0000] text-[1rem] sm:text-[1.1rem]' />
                                        <div>
                                            <p className='text-[.75rem] sm:text-sm text-[#787878]'>Dropoff</p>
                                            <p className='text-[.8rem] sm:text-[.9rem] font-medium'>{currentRide?.ride?.destination}</p>
                                        </div>
                                    </div>


                                    <div className='w-full mt-4 rounded-md bg-[#F9F7F4] pl-4 pr-4 md:pr-10 py-3'>
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <small className='text-[#787878] text-[.75rem] sm:text-[.8rem]'>Fare</small>
                                                <p className='font-medium text-[.8rem] sm:text-[1rem]'>₦{currentRide?.ride?.priceNaira}</p>
                                            </div>
                                            <div>
                                                <small className='text-[#787878] text-[.75rem] sm:text-[.8rem]'>Distance</small>
                                                <p className='text-[.8rem] sm:text-[.9rem]'>{currentRide?.ride?.distanceKm} km</p>
                                            </div>
                                            <div>
                                                <small className='text-[#787878] text-[.75rem] sm:text-[.8rem]'>Trip Duration</small>
                                                <p className='text-[.8rem] sm:text-[.9rem]'>{currentRide?.ride?.durationMins} mins</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* action btn */}
                                    <div className='flex gap-2 mt-5 sm:gap-4'>
                                        {/* <button className='bg-[#FD4040] text-white rounded-md w-1/2 py-2 sm:py-3  text-[.8rem] sm:text-[.9rem]' onClick={() => cancelRide(currentRide?.ride?.id)}>
                                            <span className='flex items-center justify-center gap-2'><TbCancel />Cancel Ride
                                            </span>
                                        </button> */}

                                        <button className='bg-[#12A704] text-white rounded-md w-full py-2 sm:py-3  text-[.8rem] sm:text-[.9rem]' onClick={() => completeRide(currentRide?.ride?.id)}>
                                            <span className='flex items-center justify-center gap-2'><FaFlagCheckered />Complete Ride</span>
                                        </button>
                                    </div>
                                </div>
                                :
                                // Empty state
                                <div className="col-span-1 py-12 text-center lg:col-span-2">
                                    <p className="text-[#787878] text-[.9rem]">No active rides right now.</p>
                                    <p className="text-[#787878] text-[.8rem] mt-1">Accept a ride or wait for a new request.</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentRide