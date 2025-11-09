import React from 'react'
import img from "../../assets/Logo/Mentorme.png"
import deleteImg from "../../assets/Logo/delete.png"
const GridCard = () => {
    return (
    <>
        <div className="gridCard gap-10px mt-2 bg-[#7D70BA] w-[270px] h-[130px] p-[10px] cursor-pointer hover:bg-white rounded-lg shadow-lg shadow-black/50">
            <img className='w-[90px]' src={img} alt="" />
            <h3 className='text-[20px] w-[90%] line-clamp-1'>My First Project</h3>
            <div className='flex items-center justify-between'>
                <p className='text-[14px] text-[black]'>Created In 9 Mon 2023</p>
                <img className='w-[25px] cursor-pointer' src={deleteImg} alt="" />
            </div>
        </div>
    </>
    )
}

export default GridCard
