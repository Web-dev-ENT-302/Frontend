import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import DriverSidebar from './DriverSidebar'
import { TbRefresh } from 'react-icons/tb'
import { FaMoneyBill } from 'react-icons/fa6'
import { BsInfoCircleFill } from 'react-icons/bs'
import { GiSwapBag } from 'react-icons/gi'

const Earnings = () => {
    const { user, token } = useContext(AuthContext) // user data and token

    // State for driver statistics
    const [stats, setStats] = useState({
        todayEarnings: 0,
        ridesToday: 0,
        completedRides: 0,
        totalDistance: 0,
        weekEarnings: 0
    });
    const [statsLoading, setStatsLoading] = useState(false);
    const [statsError, setStatsError] = useState(null);

    const getRiderStat = async () => {
        setStatsLoading(true);
        setStatsError(null);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/driver/stats`, {
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

            // Update stats with response data
            setStats({
                todayEarnings: data.today.earning || 0,
                ridesToday: data.today.rides || 0,
                completedRides: data.allTime.completedRides || 0,
                totalDistance: data.allTime.totalDistanceKm || 0,
                weekEarnings: data.week.totalBalance || 0
            });

        } catch (err) {
            Notification("failed", data.error);
            setStatsError(err.message);
        } finally {
            setStatsLoading(false);
        }
    };

    // Fetch ride requests when component mounts or user changes
    useEffect(() => {
        if (user?.id && token) {
            getRiderStat();
        }
    }, [user?.id, token]);


    return (
        <div className='driver-dashboard-container'>
            <div className='flex gap-2'>
                {/* side bar */}
                <DriverSidebar activeTab="Activity" />

                {/* main content area */}
                <div className='w-[100%] sm:w-[80%] sm:ml-[30%] lg:ml-[20%] mt-[5rem] sm:mt-[4rem]'>
                    <div className='px-4 mt-1 mb-10 sm:mt-0 sm:mb-0 sm:pl-6 sm:pr-6 md:pr-16 sm:py-6 md:py-7'>
                        {/* Top Bar */}
                        <div className='flex items-center justify-between'>
                            <h4 className='font-semibold sm:text-[.9rem] md:text-lg text-[1rem]'>My Earnings</h4>
                            <button
                                onClick={getRiderStat}
                                disabled={statsLoading}
                                className='flex items-center gap-1 text-[--primary] font-medium text-[.9rem] sm:text-md '
                            >
                                <TbRefresh className={`sm:text-[1.1rem] text-[1rem] ${statsLoading ? 'animate-spin' : ''}`} />
                                {statsLoading ? 'Loading...' : 'Refresh'}
                            </button>
                        </div>

                        <div className="mt-4 sm:mt-4">
                            {statsError && (
                                <div className="w-full bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                                    <p className="text-red-600 text-sm">
                                        Failed to load statistics: {statsError}. Showing sample data.
                                    </p>
                                </div>
                            )}

                            <div className="w-full bg-white rounded-md shadow-[0px_0px_3px_rgba(0,0,0,0.1)] px-3 sm:px-4 py-4 sm:py-4">
                                <div className='w-full bg-[#FFF2E3] rounded-md py-3 px-3 sm:px-6 sm:py-4'>
                                    <span className='text-[#3A3A3A] text-[.8rem] sm:text-[1rem]'>Today's Earnings</span>
                                    <div className='flex items-center gap-2 mt-2'>
                                        <FaMoneyBill className='text-[#787878] text-[1.2rem]' />
                                        <span className='text-[--primary] text-[1rem] sm:text-[1.2rem] font-bold'>
                                            ₦{stats.todayEarnings.toLocaleString()}.00
                                        </span>
                                    </div>
                                </div>

                                <div className='grid grid-cols-2 gap-2 mt-4 sm:gap-4 md:grid-cols-4'>
                                    <div className='bg-[#F9F9F9] rounded-md p-3'>
                                        <span className='text-[#787878] text-[.8rem] sm:text-[.9rem]'>Rides Today</span>
                                        <p className='font-medium text-[1rem] sm:text-[1.2rem] mt-2'>{stats.ridesToday}</p>
                                    </div>
                                    <div className='bg-[#F9F9F9] rounded-md p-3'>
                                        <span className='text-[#787878] text-[.8rem] sm:text-[.9rem]'>Completed rides</span>
                                        <p className='flex items-center gap-2 font-medium text-[1rem] sm:text-[1.2rem] mt-2'>
                                            {/* {stats.completedRides.toFixed(1)} */}
                                            {stats.completedRides}
                                            {/* <FaStar className='text-[#E9A30D]' /> */}
                                        </p>
                                    </div>
                                    <div className='bg-[#F9F9F9] rounded-md p-3'>
                                        <span className='text-[#787878] text-[.8rem] sm:text-[.9rem]'>Total Distance</span>
                                        <p className='font-medium text-[1rem] sm:text-[1.2rem] mt-2'>
                    
                                            {stats.totalDistance.toFixed(2)} km
                                        </p>
                                    </div>
                                    <div className='bg-[#F9F9F9] rounded-md p-3'>
                                        <span className='text-[#787878] text-[.8rem] sm:text-[.9rem]'>This Week</span>
                                        <p className='font-medium text-[1rem] sm:text-[1.2rem] mt-2'>₦{stats.weekEarnings.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* notification */}
                        <div className="mt-10">
                            <div className='flex items-center justify-between'>
                                <h4 className='font-medium text-[1rem]'>Notifications</h4>
                                <span className='bg-[--primary] text-white rounded-full px-[.45rem] py-[.1rem] sm:px-2 sm:py-[.11rem] text-[.7rem] sm:text-[.8rem]'>3</span>
                            </div>

                            {/* Notification Cards */}
                            <div className='flex bg-[#EFF6FF] p-3 sm:p-4 rounded-md border-l-4 border-[#3B82F6] gap-2 sm:gap-3 mt-4'>
                                <div>
                                    <BsInfoCircleFill className='text-[#3B82F6]' />
                                </div>
                                <div>
                                    <h4 className='leading-none text-[.9rem] sm:text-[1rem] font-medium'>System Maintenance</h4>
                                    <p className='text-[#3A3A3A] text-[.8rem] mt-2 mb-2'>The app will be under maintenance tonight from 2 AM to 4 AM.</p>
                                    <span className='text-[#787878] text-[.8rem]'>1 hour ago</span>
                                </div>
                            </div>

                            <div className='flex bg-[#EAFEF0] p-3 sm:p-4 rounded-md border-l-4 border-[#22C55E] gap-2 sm:gap-3 mt-4'>
                                <div>
                                    <GiSwapBag className='text-[#22C55E] text-[1.1rem]' />
                                </div>
                                <div>
                                    <h4 className='leading-none text-[.9rem] sm:text-[1rem] font-medium'>Bonus Unlocked!</h4>
                                    <p className='text-[#3A3A3A] text-[.8rem] mt-2 mb-2'>You've completed 50 rides this month. ₦1,000 bonus added to your account.</p>
                                    <span className='text-[#787878] text-[.8rem]'>Today, 10:30 AM</span>
                                </div>
                            </div>

                            <div className='flex bg-[#FEFCE8] p-3 sm:p-4 rounded-md border-l-4 border-[#EAB308] gap-2 sm:gap-3 mt-4'>
                                <div>
                                    <BsInfoCircleFill className='text-[#EAB308]' />
                                </div>
                                <div>
                                    <h4 className='leading-none text-[.9rem] sm:text-[1rem] font-medium'>New 5-Star Rating!</h4>
                                    <p className='text-[#3A3A3A] text-[.8rem] mt-2 mb-2'>TimmyStroge gave you a 5-star rating and left a positive comment.</p>
                                    <span className='text-[#787878] text-[.8rem]'>Yesterday</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Earnings