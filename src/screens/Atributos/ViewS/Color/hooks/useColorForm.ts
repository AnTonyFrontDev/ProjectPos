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
    // Additional actions before sending the color data to the database
    GenericRequest(formData, SaveColor, "Color data submitted successfully");
    window.location.reload();
  };

  return { formData, setFormData, handleInputChange, handleColorChange, handleSubmit };
};
