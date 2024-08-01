import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

interface DeleteButtonProps {
    onRemove: (formData: any) => Promise<void> | undefined;
    formData: any;
    confirmationMessage: string;
    navigatePath: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onRemove, formData, confirmationMessage, navigatePath }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        Modal.confirm({
            title: 'Confirmar',
            content: confirmationMessage,
            okText: 'Sí',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await onRemove(formData); // Llama a la función de eliminación
                    navigate(navigatePath); // Redirige al usuario
                } catch (error) {
                    console.error('Error al eliminar el registro', error);
                }
            },
        });
    };

    return (
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDelete}
        >
            Eliminar
        </button>

    );
};

export default DeleteButton;
