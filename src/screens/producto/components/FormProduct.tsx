import { useEffect } from 'react';
import { useProductForm } from "../hooks/useProductForm";
import { FormProps } from '@/components/Generics/Interface/IForms';
import Select from 'react-select';
import { TableSelectsClasses } from '@/shared/Common/stylesConst/cssComponent';
import { ProductDtoPost, IProductPost } from '@/shared/interfaces/Product/IProductPost';


const ProductForm: React.FC<FormProps> = ({ formData: initialFormData, isUpdate }) => {
    const {
        formData,
        typeProdOptions,
        loadTypeProdOptions,
        setFormData,
        handleInputChange,
        handleSubmit,
        handleUpdate
    } = useProductForm();

    useEffect(() => {
        if (isUpdate && initialFormData) {
            handleSetInitialFormData(initialFormData);
            console.log(initialFormData);
        }
        loadTypeProdOptions();
    }, [isUpdate, initialFormData]);

    const handleSetInitialFormData = (initialData: IProductPost) => {
        const initialFormData = new ProductDtoPost();
        Object.assign(initialFormData, initialData);
        setFormData(initialFormData);
    };

    const onSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        if (isUpdate) {
            await handleUpdate(event);
        } else {
            await handleSubmit(event);
        }
        // window.location.reload();
    };

    return (
        <form onSubmit={onSubmitHandler} className="max-w-md mx-auto mt-8">
            <div className="mb-4">
                <input
                    type="hidden"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Product Name:</label>
                <input
                    type="text"
                    name="name_prod"
                    value={formData.name_prod}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Description:</label>
                <input
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Sale Price:</label>
                <input
                    type="number"
                    name="sale_price"
                    value={formData.sale_price}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Type:</label>
                <Select
                    className={TableSelectsClasses}
                    options={typeProdOptions}
                    value={typeProdOptions.find((option) => option.value === formData.fk_type)}
                    onChange={(selectedOption) => setFormData({ ...formData, fk_type: selectedOption?.value || 0 })}
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                {isUpdate ? "Update" : "Submit"}
            </button>
        </form>
    );
};

export default ProductForm;
