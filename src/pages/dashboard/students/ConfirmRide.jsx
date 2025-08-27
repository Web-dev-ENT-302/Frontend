import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";


// components
import Spinner from "../../../components/Spinner";

// Icons
import { IoArrowBack } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaClock, FaRoad } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";



const ConfirmRide = () => {
    const { token } = useContext(AuthContext)
    const [showSpinner, setShowSpinner] = useState(false);

    const navigate = useNavigate()
    const location = useLocation();
    const { studentId, from, to, distance, duration, price } = location.state || {}


    /* Stimulated Confirm Ride Request */
    const confirmRideRequest = async () => {
        setShowSpinner(true)

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rides/request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    pickup: from,
                    destination: to,
                    distanceKm: distance,
                    durationMins: duration,
                    priceNaira: price,
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
            Notification("success", "Ride requested successfully!");

            // navigate back to dashboard
            navigate("/student")

        } catch (err) {
            Notification("failed", err.message)
        } finally {
            setShowSpinner(false);
        }
    }


    const handleBackNavigate = () => {
        navigate(-1)
    }
    return (
        <>
            <div>
                {/* Top bar */}
                <div className="w-full bg-white z-[10] py-5 px-3 sm:px-8 fixed top-0 left-0 border-b border-b-[#D5D5D5]">
                    <div className="absolute cursor-pointer" onClick={handleBackNavigate}>
                        <IoArrowBack className="text-[1.1rem] sm:text-[1.2rem]" />
                    </div>
                    <div className="flex justify-center">
                        <h4 className="leading-none text-[14px] sm:text-[16px]">Confirm Request</h4>
                    </div>
                </div>


                <div className="mt-[6rem]">
                    <div className="container">
                        {/* Pickup  */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            <span className="bg-[#1A46EA] text-white p-1 rounded-full">
                                <FaCircle className="text-[.7rem]" />
                            </span>
                            <div>
                                <p className="uppercase leading-none text-[.7rem] text-[#787878]">pickup</p>
                                <h4 className="leading-none mt-1 text-[.9rem] font-medium">{from}</h4>
                            </div>
                        </div>

                        {/* vertical rule immediately after pickup */}
                        <div className="bg-[#D5D5D5] w-[.1rem] h-[2rem] relative left-[.5rem] bottom-[.2rem]"></div>

                        {/* Destination */}
                        <div className="flex items-center gap-2 sm:gap-4 mt-1 border-b border-b-[#D5D5D5] pb-6">
                            <span className="bg-[#DD0000] text-white p-1 rounded-full">
                                <IoLocationSharp className="text-[.8rem]" />
                            </span>
                            <div>
                                <p className="uppercase leading-none text-[.7rem] text-[#787878]">DESTINATION</p>
                                <h4 className="leading-none mt-1 text-[.9rem] font-medium">{to}</h4>
                            </div>
                        </div>
                    </div>
                </div>



                {/* Confirm request */}
                <section className="fixed bottom-0 left-0  w-full bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.05)] mt-12  pt-3 pb-8">
                    <div className="border-b border-b-[#D5D5D5] pb-2">
                        <div className="container">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[.8rem] sm:text-[1rem] font-medium">Ride Details</h4>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-[.8rem] text-[#787878]">Estimated Duration</span>
                            <div className="flex items-center gap-1">
                                <FaClock className="text-[.8rem] md:text-[.9rem]" />
                                <span className=" text-[.8rem] sm:text-[.9rem]">{duration} mins</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-[.8rem] text-[#787878]">Estimated Distance</span>
                            <div className="flex items-center gap-1">
                                <FaRoad className="text-[.8rem] md:text-[.9rem]" />
                                <span className="text-[.8rem] sm:text-[.9rem]">{distance} km</span>
                            </div>
                        </div>


                        <div className="flex items-center justify-between mt-4">
                            <span className="text-[.8rem] text-[#787878]">Estimated Price</span>
                            <div className="flex items-center ">
                                <TbCurrencyNaira className="text-[1.1rem] md:text-[1.2rem]" />
                                <span className="font-bold text-[.8rem] sm:text-[1rem]">{price}.00</span>
                            </div>
                        </div>

                        {/* confirm ride btn */}
                        <div className="mt-8">
                            {
                                showSpinner ?
                                    <>
                                        <button className="bg-[--primary] w-full rounded-[.5rem] py-[.7rem] text-white text-[.7rem] sm:text-[.8rem] md:text-[.9rem] font-semibold shadow-[0px_0px_10px_rgba(212,113,0,.4)] hover:scale-[.99] transition-all ease-linear flex  items-center justify-center gap-2 disabled:cursor-not-allowed" disabled>
                                            <Spinner />
                                            Confirming request...
                                        </button>
                                    </> :
                                    <>
                                        <button className="bg-[--primary] w-full rounded-[.5rem] py-[.7rem] text-white text-[.7rem] sm:text-[.8rem] md:text-[.9rem] font-semibold shadow-[0px_0px_10px_rgba(212,113,0,.4)] hover:scale-[.99] transition-all ease-linear" onClick={() => confirmRideRequest()}>
                                            Confirm Ride Request
                                        </button>
                                    </>
                            }
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ConfirmRide