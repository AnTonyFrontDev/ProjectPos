import { Modal } from "antd";

interface ConfirmOptions {
    title: string;
    content: string;
    onOk?: () => void; // Callback para cuando se confirma la acción
    onCancel?: () => void; // Callback para cuando se cancela la acción
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
