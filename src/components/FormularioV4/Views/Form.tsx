import React from 'react';
import { FormProps, IOption } from '../Config/interface';

// Form.tsx

const Form: React.FC<FormProps<any>> = ({ formDataFields, formData, setFormData, onSubmit }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    console.log('Cambio en', e.target.name, 'Valor:', e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log('formData después del cambio:', formData);
  };

  return (
    <form className="max-w-md mx-auto my-4 p-6 bg-white rounded-md">
      {formDataFields.map((field) => (
        <React.Fragment key={field.name}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}:
            </label>
            {field.type === 'textarea' ? (
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                required={field.required}
              />
            ) : field.type === 'select' ? (
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                required={field.required}
              >
                <option value={0} disabled>
                  Select {field.label}
                </option>
                {field.options?.map((option: IOption) => (
                  <option key={option.id} value={option.id}>
                    {option.value}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                className="w-full p-2 border border-gray-300 rounded-md"
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                required={field.required}
              />
            )}
          </div>
        </React.Fragment>
      ))}
      <button
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
        type="button"
        onClick={onSubmit}
      >
        Enviar
      </button>
    </form>
  );
};

export default Form;
