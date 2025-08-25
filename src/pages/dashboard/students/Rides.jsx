import React from 'react'
import defaultProfileImage from "../../../assets/images/profileImages/defaultProfile.png"
import { IoIosStar } from 'react-icons/io'
import { GoDotFill } from 'react-icons/go'
import { RiEBike2Fill } from 'react-icons/ri'
import { IoCall } from 'react-icons/io5'

const Rides = () => {
    return (
        <div className="container lg:px-[1.5rem]">
            <section className="mt-20">
                {/* Live Map */}
                <div className='w-full bg-gray-200 h-[400px] rounded-md'>
                </div>


                {/* ride details */}
                <div className="px-3 pt-3 sm:px-8 sm:pt-6 pb-2 sm:pb-6 mt-10 bg-white w-full rounded-[.375rem_.375rem_0_0] shadow-[0px_0px_02px_#0000002e]">
                    {/* Ride status */}
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium text-[.8rem] md:text-[1rem]">Your ride is on the way</h4>
                        <span className="bg-[#DBFFF3] text-[#04A76E] text-[.6rem] md:text-[.7rem] md:py-[.1rem] px-1 md:px-2 rounded-full">Arriving in 3 mins</span>
                    </div>

                    {/* Driver Profile */}
                    <div className="flex items-center justify-between mt-4 md:mt-5">
                        <div className="flex items-center gap-2 md:gap-3">

                            <div className="w-[2.5rem] h-[2.5rem] md:w-[4rem] md:h-[4rem] rounded-full overflow-hidden">
                                <img src={defaultProfileImage} alt="profile" className="object-cover w-full" />
                            </div>

                            <div>
                                {/* driver's name */}
                                <h4 className="font-medium text-[.8rem] md:text-[.9rem]">Samson James</h4>

                                {/* star rating and total trips */}
                                <div className="flex items-center gap-1 md:gap-2">
                                    <div className="flex items-center gap-[.2rem]">
                                        <IoIosStar className="text-[#FFC13C] relative top-[-.08rem]" />
                                        <span className="text-[#696969] text-[.7rem] md:text-[.8rem] leading-none ">4.8</span>
                                    </div>

                                    <span><GoDotFill className="text-[#787878] text-[.6rem]" /></span>

                                    <span className="text-[#696969] text-[.7rem] md:text-[.8rem] leading-none ">50+ trips</span>
                                </div>

                                {/* Tricycle ID number */}
                                <div className="flex items-center gap-1 md:gap-2 mt-[.1rem]">
                                    <div className="flex items-center text-[#696969] gap-1">
                                        <span className="border border-[#696969] p-[.1rem] rounded-full">
                                            <RiEBike2Fill className="text-[.4rem] md:text-[.5rem]" />
                                        </span>
                                        <span className="text-[.7rem] md:text-[.8rem] ">Tricycle</span>
                                    </div>

                                    <span><GoDotFill className="text-[#787878] text-[.6rem]" /></span>

                                    <span className="text-[#696969] text-[.7rem] md:text-[.8rem] font-semibold">KKN 234 XY</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <a href="tel:+234 1234567890">
                                <div className="bg-[#FFF4E8] p-2 md:p-3 rounded-full">
                                    <IoCall className="text-[#D47100] text-[1rem] md:text-[1.2rem]" />
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-6 mb-4 md:mt-9">
                        <div className="flex justify-center w-full">
                            <button className="w-full border border-[#C2C2C2] rounded-[7px] md:rounded-[10px] py-[.5rem] md:py-[.7rem] text-[#929292] text-[.8rem] md:text-[.9rem]" >Cancel Ride</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Rides