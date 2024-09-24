import showConfirm from "@/util/antd/confirm";

interface DeleteButtonProps {
    onRemove: (formData: any) => Promise<void>;
    formData: any;
    confirmationMessage: string;
    refreshData?: () => void; 
    navigatePath?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onRemove, formData, confirmationMessage, refreshData, navigatePath }) => {
    const handleDelete = async () => {
        showConfirm({
            title: 'Confirmar',
            content: confirmationMessage,
            onOk: async () => {
                if (navigatePath) {
                    window.location.href = navigatePath; 
                } else {
                    try {
                        await onRemove(formData);
                        if (refreshData) {
                            refreshData();  
                        }
                    } catch (error) {
                        console.error('Error al eliminar el registro', error);
                    }
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
