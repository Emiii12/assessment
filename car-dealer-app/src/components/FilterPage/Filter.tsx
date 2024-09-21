"use client"
import { fetchVehicleMakes } from '@/service/getCars';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface VehicleMake {
  MakeId: number;
  MakeName: string;
}

export const Filter = () => {
  const [makes, setMakes] = useState<VehicleMake[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedMakeId, setSelectedMakeId] = useState<number | null>(null);
  const [selectedMakeName, setSelectedMakeName] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const isNextDisabled = !selectedMakeId || !selectedYear;

  useEffect(() => {
    const loadMakes = async () => {
      const fetchedMakes = await fetchVehicleMakes();
      setMakes(fetchedMakes);
    };

    loadMakes();

    const currentYear = new Date().getFullYear();
    const modelYears = Array.from({ length: currentYear - 2015 + 1 }, (_, k) => k + 2015);
    setYears(modelYears);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selectedMakeId && selectedYear) {
      const selectedMake = makes.find(make => make.MakeId === selectedMakeId);
      setSelectedMakeName(selectedMake?.MakeName || '');
      console.log(`Selected Make ID: ${selectedMakeId}, Selected Year: ${selectedYear}`);
    }
  };

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div 
        className='w-[700px] h-[430px] border-4 border-cyan-950 rounded-2xl flex flex-col justify-center items-center
          max-xl:w-[650px] max-lg:w-[80%] max-md:w-[90%]'
      >
        <h2 className='uppercase text-white font-semibold text-2xl max-lg:text-xl max-sm:text-lg'>choose a vehicle</h2>
        <form onSubmit={handleSubmit} className="p-4 px-6 max-sm:px-2 text-white w-[80%] flex flex-col gap-4 max-md:w-[95%]">
          <div>
            <label htmlFor="makes" className="block text-lg mb-2 max-md:text-base">Vehicle Make:</label>
            <select
              id="makes"
              value={selectedMakeId || ''}
              onChange={(e) => setSelectedMakeId(Number(e.target.value))}
              className="appearance-none w-full  py-2 pl-4 bg-black border-[1px] rounded-md text-txtWhite text-base cursor-pointer "
            >
              <option value="">Choose a make</option>
              {makes.map((make) => (
                <option key={make.MakeId} value={make.MakeId} className='bg-black text-white'>
                  {make.MakeName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="years" className="block text-lg mb-2 max-md:text-base">Model year:</label>
            <select
              id="years"
              value={selectedYear || ''}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="appearance-none w-full  py-2 pl-4 bg-black border-[1px] rounded-md text-txtWhite text-base cursor-pointer "
            >
              <option value="">Choose a year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-center items-center">
            <Link 
              href={`/result/${selectedMakeId}/${selectedYear}`} 
              passHref
            >
              <button
                type="submit"
                className={`uppercase mt-4 rounded-lg bg-cyan-950 text-white py-2 px-10 transition-colors duration-150 ${isNextDisabled ? 'opacity-50 ' : 'hover:bg-cyan-900'}`}
                disabled={isNextDisabled}
              >
                Next
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}