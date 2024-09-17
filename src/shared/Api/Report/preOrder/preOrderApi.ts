import { IReportDiffItems } from "@/shared/interfaces/IReportDiffItems";
import axios from "axios";

export const getReportDiffItemsToComplete = async (idPreorder: number) => {
    try {
      const response = await axios.get(`https://localhost:7065/api/ReportInventory/GetReportDiffItemsById?preorderId=${idPreorder}`);
      console.log(response.data.data);
      return response.data.data as IReportDiffItems[];
    } catch (error) {
      console.error('Error fetching colors:', error);
      throw error;
    }
  };