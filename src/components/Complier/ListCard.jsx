import React, { useState } from 'react';
import img from "../../assets/Logo/Mentorme.png";
import deleteImg from "../../assets/Logo/delete.png";

const ListCard = () => {
    const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);

    return (
        <>
            <div className='listcard mb-2 w-[full] flex items-center justify-between p-[10px] bg-[#0A0A0A] cursor-pointer rounded-lg hover:bg-[#1A1A1A]'>
                <div className='flex items-center gap-2'>
                    <img className="w-[80px]" src={img} alt="" />
                    <div>
                        <h3 className='text-[20px] text-white'>My First Project</h3>
                        <p className='text-gray-400 -mt-1'>Created On Somedate</p>
                    </div>
                </div>
                <div>
                    <img onClick={() => setIsDeleteModelShow(true)} className='w-[30px] cursor-pointer mr-4' src={deleteImg} alt="" />
                </div>
            </div>

            {isDeleteModelShow && (
                <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.7)] backdrop-blur-sm flex justify-center items-center">
                    <div className="mainModel w-[25vw] h-[25vh] bg-[#141414] rounded-lg p-[20px] shadow-lg">
                        <h3 className="text-2xl text-white">Do you want to delete this project?</h3>
                        <div className="flex w-full mt-5 items-center gap-[10px]">
                            <button className="p-[10px] rounded-lg bg-[#FFB300] text-black cursor-pointer min-w-[49%] hover:bg-[#FF9E00] transition">Delete</button>
                            <button onClick={() => setIsDeleteModelShow(false)} className="p-[10px] rounded-lg bg-[#333] text-white cursor-pointer min-w-[49%] hover:bg-[#444] transition">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ListCard;
