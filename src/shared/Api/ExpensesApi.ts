import axios from "axios";
import { URL } from "../Common/url";
import { IExpenses } from "@/shared/interfaces/IExpenses";
import { IPaymentExpenses, IPaymentExpenseSave } from "@/shared/interfaces/IPaymentExpense.ts";


export const getExpenses = async () => {
  try {
    const response = await axios.get(
      `${URL}/Expenses/GetExpenses?Page=1&ItemsPerPage=30`
    );

    return response.data.data;
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    throw error;
  }
};

export const GetExpensesPaginated = async (page: number, itemsPerPage: number) => {
  try {
    return await axios.get(
      `${URL}/Expenses/GetExpenses?Page=${page}&ItemsPerPage=${itemsPerPage}`
    );

  } catch (error) {
    console.error("Error retrieving expenses:", error);
  }
};

export const getExpensesPending = async () => {
  try {
    const response = await axios.get(
      `${URL}/Expenses/GetExpensesPending`
    );

    return response.data.data;
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    throw error;
  }
};

export const GetExpensesBuyPaginated = async (page: number, itemsPerPage: number) => {
  try {
    return await axios.get(
      `${URL}/Expenses/GetExpensesPendingWithBuyPaginated?Page=${page}&ItemsPerPage=${itemsPerPage}`
    );

  } catch (error) {
    console.error("Error retrieving expenses:", error);
  }
};

export const GetExpensesSpentPaginated = async (page: number, itemsPerPage: number) => {
  try {
    return await axios.get(
      `${URL}/Expenses/GetExpensesPendingWithoutBuyPaginated?Page=${page}&ItemsPerPage=${itemsPerPage}`
    );

  } catch (error) {
    console.error("Error retrieving expenses:", error);
  }
};

export const GetPaymentExpenses = async (page: number, itemsPerPage: number) => {
  try {
    return await axios.get(
      // `${URL}/Expenses/GetExpenses?Page=${page}&ItemsPerPage=${itemsPerPage}`
      `${URL}/PaymentExpenses/GetPaymentsExpenses?Page=${page}&ItemsPerPage=${itemsPerPage}`
    );

  } catch (error) {
    console.error("Error retrieving expenses:", error);
  }
}
export const GetAccountsPayable = async () => {
  try {
    const response = await axios.get(
      // `${URL}/Expenses/GetExpenses?Page=${page}&ItemsPerPage=${itemsPerPage}`
      `${URL}/ReportsBalance/GetAccountsPayable`

    );

    return response.data.data;
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    throw error;
  }
}

export const CompleteExpense = async (id: number) => {
  try {
    await axios.patch(`${URL}/Expenses/ConfirmExpenses?id=${id}`)
      .then((data) => {
        console.log(data.status);
        if (data.status == 204) {
          //en caso de que retorne un 204 debe retornar un mensaje
          return 'Completado con exito';
        }
        return "Error al intentar completar dicha operacion"
      });
  } catch (error) {
    console.log("Error " + error);
    return "Error " + error
  }

}

export const SaveExpenses = async (formData: IExpenses) => {
  try {
    const formattedData = formData;
    const response = await axios.post(
      `${URL}/Expenses/SaveExpense`,
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error saving expenses:", error);
    throw error;
  }
};

export const SavePaymentExpenses = async (formData: IPaymentExpenseSave) => {
  try {
    const formattedData = formData;
    const response = await axios.post(
      `${URL}/PaymentExpenses/SavePaymentExpense`,
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error saving expenses:", error);
  }
}


export const UpdatePaymentExpenses = async (formData: IPaymentExpenseSave) => {
  try {
    const formattedData = formData;
    const response = await axios.put(
      `${URL}/PaymentExpenses/UpdatePaymentExpense`,
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating expenses:", error);
    throw error;
  }
};

export const UpdateExpenses = async (formData: IExpenses) => {
  try {
    const formattedData = formData;
    const response = await axios.put(
      `${URL}/Expenses/UpdateExpenses`,
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating expenses:", error);
    throw error;
  }
};

export const RemoveExpenses = async (formData: IExpenses) => {
  try {
    const response = await axios.post(
      `${URL}/Expenses/RemoveExpense?id=${formData.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error removing expenses:", error);
    throw error;
  }
};

export const RemovePaymentExpenses = async (formData: IPaymentExpenses) => {
  try {
    const formattedData = formData;
    const response = await axios.post(
      `${URL}/Expenses/RemoveExpense`,
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error removing expenses:", error);
    throw error;
  }
};