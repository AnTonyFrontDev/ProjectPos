import { Modal } from "antd";

interface AlertOptions {
    title: string;
    content: string;
    onOk?: () => void; // Callback opcional para el botón "OK"
}

const showAlert = ({ title, content, onOk }: AlertOptions) => {
    Modal.info({
        title,
        content,
        onOk,
    });
};

export default showAlert;
