import axios from "axios";
// import { IPaymentTypePost, IPaymentTypeUpdate, IPaymentTypeRemove } from '@/shared/interfaces/PaymentType/IPaymentType';


export const getPaymentTypes = async () => {
    try {
      const response = await axios.get('https://localhost:7065/api/PaymentType/GetPaymentTypes?Page=1&ItemsPerPage=11');
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching payment types:', error);
      throw error;
    }
  };


// const url = 'https://localhost:7065/api';  // Ajusta la URL según la estructura de tu API

// export const SavePaymentType = async (formData: IPaymentTypePost) => {
//   try {
//     const formattedData = formData;
//     const response = await axios.post(
//       `${url}/PaymentType/AddPaymentType`,
//       formattedData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error saving payment type:", error);
//     throw error;
//   }
// };

// export const UpdatePaymentType = async (formData: IPaymentTypeUpdate) => {
//   try {
//     const formattedData = formData;
//     const response = await axios.post(
//       `${url}/PaymentType/UpdatePaymentType`,
//       formattedData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error updating payment type:", error);
//     throw error;
//   }
// };

// export const RemovePaymentType = async (formData: IPaymentTypeRemove) => {
//   try {
//     const formattedData = formData;
//     const response = await axios.post(
//       `${url}/PaymentType/RemovePaymentType`,
//       formattedData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error removing payment type:", error);
//     throw error;
//   }
// };