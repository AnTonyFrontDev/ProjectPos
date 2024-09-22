import { useNavigate } from 'react-router-dom';
import { AppIcon } from '../ui/AppIcon';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <button
            onClick={handleBack}
            className="flex items-center justify-center p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all"
            aria-label="Volver atrás"
        >
            <AppIcon type="arrowLeft" width={20} />
        </button>
    );
};

export default BackButton;
