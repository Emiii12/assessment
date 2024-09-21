"use client"
import React, { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { fetchData } from '@/service/getCars';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Model {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

const Loading = () => (
  <div className="text-white text-2xl flex justify-center items-center w-full h-full">Loading models...</div>
);

const Result = () => {
  const params = useParams();
  const makeId = parseInt(params.makeId as string);
  const year = params.year as string;

  const [models, setModels] = useState<Model[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [makeName, setMakeName] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
    const loadModels = async () => {
      if (makeId && year) {
        const fetchedModels = await fetchData(makeId, parseInt(year));
        setModels(fetchedModels);
        const make = fetchedModels[0]?.Make_Name;
        if (make) {
          setMakeName(make);
        }
      }
    };

    loadModels();
  }, [makeId, year]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(5);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(10);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const totalPages = Math.ceil(models.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentModels = models.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <h1 className='text-white font-bold text-2xl max-xl:text-xl max-md:text-lg max-md:text-center'>{makeName} - {year}</h1>
      <div 
        className='w-[70%] h-[90%] flex flex-col justify-center items-center 
          max-xl:w-[85%] max-lg:w-[80%] max-md:w-[90%]'
      >
        {currentModels.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-300 mt-4 text-white text-xl max-xl:text-lg max-md:text-base max-sm:text-sm ">
            <thead>
              <tr className='text-center'>
                <th className="border border-gray-300 px-4 py-2 ">ID</th>
                <th className="border border-gray-300 px-4 py-2 ">Name</th>
                <th className="border border-gray-300 px-4 py-2 ">Model Name</th>
              </tr>
            </thead>
            <tbody>
              {currentModels.map((model) => (
                <tr key={model.Model_ID} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{model.Model_ID}</td>
                  <td className="border border-gray-300 px-4 py-2">{model.Make_Name}</td>
                  <td className="border border-gray-300 px-4 py-2">{model.Model_Name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
        {totalPages > 1 && (
          <div className="pagination mt-6 flex justify-center items-center">
            <button 
              onClick={goToPreviousPage} 
              disabled={currentPage === 1}
              className="bg-cyan-950 hover:bg-cyan-900 text-white px-3 py-2 mr-2 rounded disabled:opacity-20"
            >
              <ChevronLeftIcon className='w-6 h-6 max-md:w-4 max-md:h-4 text-white' />
            </button>
            <span className="text-white max-lg:text-base max-md:text-sm">Page {currentPage} of {totalPages}</span>
            <button 
              onClick={goToNextPage} 
              disabled={currentPage === totalPages}
              className="bg-cyan-950 hover:bg-cyan-900 text-white px-3 py-2 ml-2 rounded disabled:opacity-20"
            >
              <ChevronRightIcon className='w-6 h-6 max-md:w-4 max-md:h-4 text-white' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <Result />
    </Suspense>
  );
}
