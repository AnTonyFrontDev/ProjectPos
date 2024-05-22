import axios from "axios";
import { IBankAccountPost } from '@/shared/interfaces/BankAccount/IBankAccountPost';
import { IBankAccountUpdate } from '@/shared/interfaces/BankAccount/IBankAccountUpdate';
import { IBankAccountRemove } from '@/shared/interfaces/BankAccount/IBankAccountRemove';
import { URL } from "@/shared/Common/url";


export const getBankAccounts = async () => {
    try {
        const response = await axios.get(
            `${URL}/BankAccount/GetBankAccounts?Page=1&ItemsPerPage=20`);
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching banks:', error);
        throw error;
    }
};


export const SaveBankAccount = async (formData: IBankAccountPost) => {
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

export const UpdateBankAccount = async (formData: IBankAccountUpdate) => {
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


export const RemoveBankAccount = async (formData: IBankAccountRemove) => {
    try {
        const response = await axios.delete(
            "https://localhost:7065/api/Bank/RemoveBank",
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

