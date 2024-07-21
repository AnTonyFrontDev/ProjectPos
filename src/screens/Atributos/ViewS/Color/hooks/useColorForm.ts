import { useState } from 'react';
import { ColorPostDto, IColorPost } from '@/shared/interfaces/Color/IColorPost';
import { SaveColor } from '@/shared/Api/Color/ColorApi';
import { GenericRequest } from '@/shared/RequestsApi/GenericRequest';
// import { useNavigate } from 'react-router-dom';

export const useColorForm = () => {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState<IColorPost>(new ColorPostDto());
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleColorChange = (color: { color: string }) => {
    // Assuming color is a string representing the selected color
    setFormData((prevData) => ({ ...prevData, code: color.color }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Color Data:', formData);
  
    GenericRequest(formData, SaveColor, "Color data submitted successfully")
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error submitting color data:", error);
      });
  };

  return { formData, setFormData, handleInputChange, handleColorChange, handleSubmit };
};
