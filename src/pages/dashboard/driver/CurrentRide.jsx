import DriverSidebar from './DriverSidebar'
import { TbCancel, TbRefresh } from 'react-icons/tb'

import defaultProfileImage from "../../../assets/images/profileImages/defaultProfile.png"
import { FaCircle, FaFlagCheckered, FaRegStar, FaStar } from 'react-icons/fa6'
import { IoCall, IoLocationSharp } from 'react-icons/io5'

const CurrentRide = () => {

    const completeRide = () => {
        Notification("success", "Ride Completed!")
    }

    const cancelRide = () => {
        Notification("failed", "Ride Cancelled!")
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
                            <button className='flex items-center gap-1 text-[--primary] font-medium text-[.9rem] sm:text-md'>
                                <TbRefresh className='sm:text-[1.1rem] text-[1rem]' />
                                Refresh
                            </button>
                        </div>


                        <div className='mt-4 sm:mt-4'>
                            {/* Live Map */}
                            <div className='w-full bg-gray-200 h-[300px] rounded-md'>
                            </div>

                            {/* Ride details */}
                            <div className='w-full bg-white rounded-md shadow-[0px_0px_3px_rgba(0,0,0,0.1)] mt-4 px-3 sm:px-4 py-4 sm:py-6'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <div className="w-[2.5rem] h-[2.5rem] sm:w-[3rem] sm:h-[3rem] overflow-hidden rounded-full">
                                            <img src={defaultProfileImage} alt="" className='object-cover w-full' />
                                        </div>
                                        <div>
                                            <h4 className='font-medium capitalize text-[.8rem] sm:text-[1.1rem]'>Sarah Johnson</h4>
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
                                        <a href="tel:+234 1234567890">
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
                                        <p className='text-[.8rem] sm:text-[.9rem] font-medium'>Faculty of Engineering</p>
                                    </div>
                                </div>

                                {/*drop off */}
                                <div className='flex items-center gap-3 mt-4'>
                                    <IoLocationSharp className='text-[#DD0000] text-[1rem] sm:text-[1.1rem]' />
                                    <div>
                                        <p className='text-[.75rem] sm:text-sm text-[#787878]'>Dropoff</p>
                                        <p className='text-[.8rem] sm:text-[.9rem] font-medium'>Female Hostel Block C</p>
                                    </div>
                                </div>


                                <div className='w-full mt-4 rounded-md bg-[#F9F7F4] pl-4 pr-4 md:pr-10 py-3'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <small className='text-[#787878] text-[.75rem] sm:text-[.8rem]'>Fare</small>
                                            <p className='font-medium text-[.8rem] sm:text-[1rem]'>₦700</p>
                                        </div>
                                        <div>
                                            <small className='text-[#787878] text-[.75rem] sm:text-[.8rem]'>Distance</small>
                                            <p className='text-[.8rem] sm:text-[.9rem]'>2.5 km</p>
                                        </div>
                                        <div>
                                            <small className='text-[#787878] text-[.75rem] sm:text-[.8rem]'>Estimated Time</small>
                                            <p className='text-[.8rem] sm:text-[.9rem]'>12 mins</p>
                                        </div>
                                    </div>
                                </div>

                                {/* action btn */}
                                <div className='flex gap-2 mt-5 sm:gap-4'>
                                    <button className='bg-[#FD4040] text-white rounded-md w-1/2 py-2 sm:py-3  text-[.8rem] sm:text-[.9rem]' onClick={cancelRide}>
                                        <span className='flex items-center justify-center gap-2'><TbCancel />Cancel Ride
                                        </span>
                                    </button>

                                    <button className='bg-[#12A704] text-white rounded-md w-1/2 py-2 sm:py-3  text-[.8rem] sm:text-[.9rem]' onClick={completeRide}>
                                        <span className='flex items-center justify-center gap-2'><FaFlagCheckered />Complete Ride</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentRide