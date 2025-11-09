import React from 'react';
import logo from '../../assets/Logo/Mentorme.png';
import { FiDownload } from 'react-icons/fi';

const EditiorNavbar = () => {
  return (
    <div className="editor-navbar flex items-center justify-between px-10 h-16 bg-gray-800 text-white">
      <div className="logo">
        <img src={logo} alt="Mentorme Logo" className="w-20 h-8" />
      </div>
      <p className="text-sm">
        File / <span className="text-gray-400">My first project</span>
      </p>
      <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
        <FiDownload className="mr-2" />
      </button>
    </div>
  );
};

export default EditiorNavbar;