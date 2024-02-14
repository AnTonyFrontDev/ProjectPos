import { IColorPost } from "@/shared/interfaces/Color/IColorPost";
import { IColorUpdate } from "@/shared/interfaces/Color/IColorUpdate";
import axios from "axios";


export const getColors = async () => {
  try {
    const response = await axios.get('https://localhost:7065/api/Color/GetColors?Page=1&ItemsPerPage=10');
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching colors:', error);
    throw error;
  }
};


export const SaveColor = async (formData: IColorPost) => {
    try {
      const formattedData = formData 
        const response = await axios.post('https://localhost:7065/api/Color/SaveColor', formattedData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error saving client:', error);
        throw error;
    }
};

export const UpdateColor = async (formData: IColorUpdate) => {
    try {
      const formattedData = formData 
        const response = await axios.post('https://localhost:7065/api/Color/UpdateColor', formattedData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error saving client:', error);
        throw error;
    }
};

// export const RemoveColor = async (formData: IColorRemove) => {
//     try {
//       const formattedData = formData 
//         const response = await axios.post('https://localhost:7065/api/Client/UpdateColor', formattedData, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         return response.data;
//     } catch (error) {
//         console.error('Error saving client:', error);
//         throw error;
//     }
// };