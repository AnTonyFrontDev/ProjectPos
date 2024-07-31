import { notification } from "antd";

interface NotificationOptions {
    isSuccess: boolean;
    title: string;
    message: string;
}


const showGenericNotification = ({ isSuccess, title, message }: NotificationOptions) => {
    const type = isSuccess ? 'success' : 'error';
    notification[type]({
        message: title,
        description: message,
    });
};

export default showGenericNotification;