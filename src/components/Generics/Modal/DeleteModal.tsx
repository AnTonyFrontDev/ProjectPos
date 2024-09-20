import { Modal } from "antd";

interface DeleteButtonProps {
    onRemove: (formData: any) => Promise<void> | undefined;
    formData: any;
    confirmationMessage: string;
    refreshData: () => void;  // New prop for refreshing data
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onRemove, formData, confirmationMessage, refreshData }) => {
    const handleDelete = async () => {
        Modal.confirm({
            title: 'Confirmar',
            content: confirmationMessage,
            okText: 'Sí',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await onRemove(formData);
                    refreshData();  // Refresh the table data after deletion
                } catch (error) {
                    console.error('Error al eliminar el registro', error);
                }
            },
        });
    };

    return (
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>
            Eliminar
        </button>
    );
};

export default DeleteButton;
