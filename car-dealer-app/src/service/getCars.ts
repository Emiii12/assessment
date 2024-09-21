import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchVehicleMakes = async () => {
    try {
        const response = await axios.get(`${apiUrl}/GetMakesForVehicleType/car?format=json`);
        console.log(response.data.Results)
        return response.data.Results;
    } catch (error) {
        console.error('Error fetching vehicle makes:', error);
        return [];
    }
};


export const fetchData = async (makeId: number | undefined, year: number) => {
    try {
        const response = await axios.get(`${apiUrl}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
        console.log(response.data.Results)
        return response.data.Results;
    } catch (error) {
        console.error('Error fetching vehicle data:', error);
        return [];
    }
};
