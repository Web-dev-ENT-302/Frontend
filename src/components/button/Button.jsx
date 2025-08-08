import React from 'react'

const Button = ({ value }) => {
    return (
        <>
            <button type="submit" className="bg-[--primary] w-full rounded-[.5rem] py-[.7rem] text-white text-[.8rem] md:text-[.9rem] font-semibold">{value}</button>
        </>
    )
}

export default Button