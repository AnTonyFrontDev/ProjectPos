import axios from "axios";
import {IBankAccount} from '@/shared/interfaces/IBankAccount';
import {URL} from "@/shared/Common/url";


export const getBankAccounts = async () => {
    try {
        const response = await axios.get(
            `${URL}/BankAccount/GetBankAccounts?Page=1&ItemsPerPage=20`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching banks:', error);
        throw error;
    }
};
export const GetBankAccountsPaginated = async (page:number,itemsPerPage:number) => {
    try {
        return await axios.get(
            `${URL}/BankAccount/GetBankAccounts?Page=${page}&ItemsPerPage=${itemsPerPage}`);
    } catch (error) {
        console.error('Error fetching banks:', error);
    }
};

export const SaveBankAccount = async (formData: IBankAccount) => {
    try {
        const formattedData = formData;
        const response = await axios.post(
            `${URL}/BankAccount/SaveBankAccount`,
            formattedData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error saving Bank:", error);
        throw error;
    }
};

export const UpdateBankAccount = async (formData: IBankAccount) => {
    try {
        const formattedData = formData;
        const response = await axios.put(
            `${URL}/BankAccount/UpdateBankAccount`,
            formattedData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error updating bank:", error);
        throw error;
    }
};

export const RemoveBankAccount = async (formData: IBankAccount) => {
    try {
        const response = await axios.delete(
            `${URL}/Bank/RemoveBank`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                data: formData,
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error removing category size:", error);
        throw error;
    }
};

