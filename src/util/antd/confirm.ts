import { Modal } from "antd";

interface ConfirmOptions {
    title: string;
    content: string;
    onOk?: () => void; 
    onCancel?: () => void; 
}

const showConfirm = ({ title, content, onOk, onCancel }: ConfirmOptions) => {
    Modal.confirm({
        title,
        content,
        onOk,
        onCancel,
    });
};

export default showConfirm;
