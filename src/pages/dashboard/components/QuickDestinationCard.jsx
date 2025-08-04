import React from 'react'

const QuickDestinationCard = ({location, distance, icon, iconColor, iconBgColor}) => {
    return (
        <div className="p-4 bg-white rounded-[10px] shadow-[0px_0px_10px_rgba(0,0,0,0.04)] flex gap-3 items-center cursor-pointer hover:shadow-[0px_0px_10px_rgba(0,0,0,0.1)]  transition-all ease-linear">
            <span className={`p-[.6rem] ${iconColor} ${iconBgColor} rounded-full`}>
                {icon}
            </span>
            <div className='leading-none'>
                <p className='text-[.8rem] font-medium text-black'>{location}</p>
                <span className='text-[--body-text] text-[.7rem] '>{distance}</span>
            </div>
        </div>
    )
}

export default QuickDestinationCard