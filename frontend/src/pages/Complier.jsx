import React, { useState } from 'react';
import GridCard from '../components/Complier/GridCard';
import ListCard from '../components/Complier/ListCard';

const Complier = () => {
  const [isGridLayout, setIsGridLayout] = useState(false);
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateModelShow = () => {
    setIsCreateModelShow(true);
    setIsModalOpen(true);
  };

  const handleCreateModelClose = () => {
    setIsCreateModelShow(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between px-8 md:px-16 my-10">
        <h2 className="text-3xl font-semibold text-white">Hi, Geetansh</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-[250px] md:w-[300px]">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-4 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <button 
            onClick={handleCreateModelShow} 
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gray-900 hover:bg-blue-600 focus:ring-2 focus:ring-yellow-400"
          >
            +
          </button>
        </div>
      </div>

      <div className="cards">
        {
          isGridLayout ? 
            <div className="px-4 md:px-16">
              <GridCard />
            </div> : 
            <div>
              <ListCard />
              <ListCard />
              <ListCard />
              <ListCard />
            </div>
        }
      </div>

      {isCreateModelShow && (
        <div className={`createModel fixed top-0 left-0 w-screen h-screen ${isModalOpen ? 'backdrop-blur-sm' : ''} bg-[rgba(0,0,0,0.5)] flex items-center justify-center`}>
          <div className="createModel w-[80vw] md:w-[25vw] h-[30vh] shadow-lg shadow-black/50 bg-[#141414] rounded-[10px] p-6">
            <h3 className="text-2xl text-white">Create New Project</h3>
            <div className="inputBox bg-[#202020] mt-4">
              <input 
                type="text" 
                placeholder="Project Title" 
                className="w-full p-3 rounded-lg bg-[#3A3A3A] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" 
              />
            </div>
            <div className="flex items-center gap-4 w-full mt-4">
              <button className="btnBlue bg-yellow-600 text-black rounded-md py-2 px-4 hover:bg-yellow-500 transition">Create</button>
              <button onClick={handleCreateModelClose} className="btnBlue bg-[#1A1919] text-white rounded-md py-2 px-4 hover:bg-[#333] transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Complier;
