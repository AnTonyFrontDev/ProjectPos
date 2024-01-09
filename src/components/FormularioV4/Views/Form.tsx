import React from 'react'
import { FormProps, Option } from '../Config/interface';
//Form.tsx

const Form: React.FC<FormProps<any>> = ({ formDataFields, formData, setFormData, onSubmit }) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    return (
      <form>
        {formDataFields.map((field) => (
          <React.Fragment key={field.name}>
            <label>
              {field.label}:
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  required={field.required}
                />
              ) : field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  required={field.required}
                >
                  {field.options?.map((option : Option) => (
                    <option key={option.id} value={option.id}>
                      {option.value}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  required={field.required}
                />
              )}
            </label>
            <br />
          </React.Fragment>
        ))}
        <button type="button" onClick={onSubmit}>
          Enviar
        </button>
      </form>
    );
  };
  
  export default Form;