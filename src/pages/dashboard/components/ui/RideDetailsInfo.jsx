import React from 'react'

const RideDetailsInfo = ({icon, text, detail, detailColor}) => {
    return (
        <div className="flex items-center justify-between mt-4 sm:mt-6">
            <div className="flex items-center gap-2 text-[.8rem] sm:text-[.9rem] ">
                {icon}
                <span className="text-[#3A3A3A] leading-none">{text}</span>
            </div>

            <span className={`text-[.8rem] ${detailColor} font-medium`}>
                {detail}
            </span>
        </div>
    )
}

export default RideDetailsInfo