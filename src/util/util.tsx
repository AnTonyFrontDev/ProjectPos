import showGenericNotification from "./antd/notification";
// Utility function for handling errors

export const handleErrorNotification = (error: any, defaultMessage: string) => {
    console.error(error);
    showGenericNotification({ isSuccess: false, title: 'Error', message: defaultMessage });
  };
  
  // Utility function for handling successful operations
export const handleSuccessNotification = (message: string) => {
    showGenericNotification({ isSuccess: true, title: 'Éxito', message });
  };
  
  // Utility function for fetching options and setting state
 export const fetchOptions = async (apiCall: () => Promise<any>, setState: React.Dispatch<any>, mapCallback: (item: any) => any) => {
    try {
      const response = await apiCall();
      const options = response.map(mapCallback);
      setState(options);
    } catch (error) {
        handleErrorNotification(error, 'Error al obtener los datos.');
    }
  };
  