import { FaCircle, FaLocationArrow, FaRoad } from 'react-icons/fa6'
import { IoLocationSharp } from 'react-icons/io5'
import { LuClock4 } from 'react-icons/lu'
import { TbCurrencyNaira } from 'react-icons/tb'
import Spinner from '../../../../components/Spinner'

const RideRequestCards = ({ profileImage, name, time, price, pickup, dropoff, distance, ETA, distanceAway, onAccept, onReject }) => {
    return (
        <div className='shadow-[0px_0px_3px_rgba(0,0,0,0.1)] bg-white rounded-md p-3 sm:p-4 cursor-pointer hover:shadow-[0px_0px_3px_rgba(0,0,0,0.2)] transition'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 sm:gap-3'>
                    <div className='w-[2.2rem] h-[2.2rem] sm:w-[2.5rem] sm:h-[2.5rem] overflow-hidden rounded-full relative'>
                        <img src={profileImage} alt="profileImg" className='object-cover w-full' />
                    </div>
                    <div>
                        <h4 className='mb-1 leading-none sm:text-[.9rem] text-[.8rem] capitalize'>{name}</h4>
                        <p className='text-[.7rem] sm:text-sm leading-none text-[#787878]'>{time}</p>
                    </div>
                </div>
                <div>
                    <span className='flex items-center bg-[#FFF2E3] text-[--primary] px-2 rounded-full py-[.1rem] sm:py-1'>
                        <TbCurrencyNaira className='text-[1rem] sm:text-[1.1rem]' />
                        <p className='font-medium text-[.7rem] sm:text-[.9rem]'>{price}</p>
                    </span>
                </div>
            </div>

            {/* pick up */}
            <div className='flex items-center gap-3 mt-4 sm:mt-5'>
                <FaCircle className='text-[#12A704] text-[.7rem] sm:text-[.8rem]' />
                <div>
                    <p className='text-[.75rem] sm:text-sm text-[#787878]'>Pickup</p>
                    <p className='text-[.8rem] sm:text-[.9rem] font-medium'>{pickup}</p>
                </div>
            </div>

            {/*drop off */}
            <div className='flex items-center gap-3 mt-4'>
                <IoLocationSharp className='text-[#DD0000] text-[1rem] sm:text-[1.1rem]' />
                <div>
                    <p className='text-[.75rem] sm:text-sm text-[#787878]'>Dropoff</p>
                    <p className='text-[.8rem] sm:text-[.9rem] font-medium'>{dropoff}</p>
                </div>
            </div>

            {/* Ride distance, km, ETA */}
            <div className='flex justify-between mt-5'>
                <div className='flex items-center gap-1 text-[#787878] '>
                    <FaRoad className='text-[.8rem] sm:text-[1rem]' />
                    <p className='text-[.75rem] sm:text-[.9rem]'>{distance} km</p>
                </div>
                <div className='flex items-center gap-1 text-[#787878] '>
                    <LuClock4 className='text-[.8rem] sm:text-[1rem]' />
                    <p className='text-[.75rem] sm:text-[.9rem]'>{ETA}</p>
                </div>
                {/* <div className='flex items-center gap-1 text-[#12A704] '>
                    <FaLocationArrow className='text-[.8rem] sm:text-[1rem]' />
                    <p className='text-[.75rem] sm:text-[.9rem]'>{distanceAway}km away</p>
                </div> */}
            </div>

            {/* action btn */}
            <div className='flex gap-4 mt-5'>
                  <button className='text-[.8rem] sm:text-[.9rem] bg-[#EAEAEA] rounded-md w-1/2 text-center py-2 sm:py-3' onClick={onReject}>
                            Reject
                  </button>
                 <button className='text-[.8rem] sm:text-[.9rem] bg-[--primary] text-white rounded-md w-1/2 text-center py-2 sm:py-3' onClick={onAccept}>
                        Accept
                    </button>

            </div>
        </div>
    )
}

export default RideRequestCards