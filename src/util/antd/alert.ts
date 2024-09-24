import { Modal } from "antd";

interface AlertOptions {
    title: string;
    content: string;
    onOk?: () => void;
    onCancel?: () => void;
}

const showAlert = ({ title, content, onOk, onCancel }: AlertOptions) => {
    Modal.info({
        title,
        content,
        onOk,
        onCancel
    });
};

export default showAlert;
