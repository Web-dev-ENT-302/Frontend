import DriverSidebar from './DriverSidebar'
import { TbRefresh } from 'react-icons/tb'

import defaultProfileImage from "../../../assets/images/profileImages/defaultProfile.png"
import RideRequestCards from '../components/ui/RideRequestCards'

const DriverDashboard = () => {

    /* stimulated accept ride */
    const acceptRideRequest = () => {
        Notification("success", "Driver Accepted Ride Request")
    }

    /* stimulated accept ride */
    const rejectRideRequest = () => {
        Notification("failed", "Driver Rejected Ride Request")
    }

    return (
        <div className='driver-dashboard-container'>
            <div className='flex gap-2'>
                {/* side bar */}
                <DriverSidebar />

                {/* main content area */}
                <div className='w-[100%] sm:w-[80%] sm:ml-[30%] lg:ml-[20%] mt-[4.2rem]'>
                    <div className='px-4 mt-1 mb-10 sm:mt-0 sm:mb-0 sm:pl-6 sm:pr-6 md:pr-16 sm:py-6 md:py-7'>
                        {/* Top Bar */}
                        <div className='flex items-center justify-between'>
                            <h4 className='font-semibold sm:text-[.9rem] md:text-lg text-[1rem]'>Ride Requests</h4>
                            <button className='flex items-center gap-1 text-[--primary] font-medium text-[.9rem] sm:text-md'>
                                <TbRefresh className='sm:text-[1.1rem] text-[1rem]' />
                                Refresh
                            </button>
                        </div>

                        {/* Main section */}
                        <div className='mt-4 sm:mt-6'>
                            {/* ride request card wrapper */}
                            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                                {/* ride request card */}
                                <RideRequestCards profileImage={defaultProfileImage} name={"Sarah Johnson"} time={"2 mins ago"} price={700} pickup={"Faculty of Engineering"} dropoff={"Female Hostel Block C"} distance={1.2} ETA={"6 mins"} distanceAway={0.4} onAccept={acceptRideRequest} onReject={rejectRideRequest} />

                                <RideRequestCards profileImage={defaultProfileImage} name={"TimmyStroge"} time={"2 mins ago"} price={700} pickup={"Library"} dropoff={"North Gate"} distance={1.2} ETA={"6 mins"} distanceAway={0.4} onAccept={acceptRideRequest} onReject={rejectRideRequest} />

                                <RideRequestCards profileImage={defaultProfileImage} name={"Sarah Johnson"} time={"2 mins ago"} price={700} pickup={"Faculty of Engineering"} dropoff={"Female Hostel Block C"} distance={1.2} ETA={"6 mins"} distanceAway={0.4} onAccept={acceptRideRequest} onReject={rejectRideRequest} />

                                <RideRequestCards profileImage={defaultProfileImage} name={"Sarah Johnson"} time={"2 mins ago"} price={700} pickup={"Faculty of Engineering"} dropoff={"Female Hostel Block C"} distance={1.2} ETA={"6 mins"} distanceAway={0.4} onAccept={acceptRideRequest} onReject={rejectRideRequest} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DriverDashboard