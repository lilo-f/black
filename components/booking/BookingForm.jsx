import '../../styles/BookingForm.css'
import { useState } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';

const BookingForm = ({ initialData, onSubmit, onBack }) => {
  const [formData, setFormData] = useState(initialData);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 5 - formData.referenceImages.length);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
        setFormData(prev => ({
          ...prev,
          referenceImages: [...prev.referenceImages, file]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      referenceImages: prev.referenceImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Tamanho aproximado (cm):</label>
        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleChange}
          placeholder="Ex: 10x15"
          required
        />
      </div>

      <div className="form-group">
        <label>Local no corpo:</label>
        <select
          name="placement"
          value={formData.placement}
          onChange={handleChange}
          required
        >
          <option value="">Selecione...</option>
          <option value="Braço">Braço</option>
          <option value="Perna">Perna</option>
          <option value="Costas">Costas</option>
          <option value="Peito">Peito</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      <div className="form-group">
        <label>Descrição do que você deseja:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          placeholder="Descreva sua ideia em detalhes..."
          required
        />
      </div>

      <div className="form-group">
        <label>Imagens de referência (máx. 5):</label>
        <div className="image-upload-container">
          <label className="upload-button">
            <FaUpload /> Adicionar Imagens
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              disabled={formData.referenceImages.length >= 5}
            />
          </label>
          <span>{formData.referenceImages.length}/5 imagens</span>
        </div>

        <div className="image-previews">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="image-preview">
              <img src={preview} alt={`Referência ${index + 1}`} />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="remove-image"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onBack} className="back-button">
          Voltar
        </button>
        <button type="submit" className="submit-button">
          Continuar
        </button>
      </div>
    </form>
  );
};

export default BookingForm;