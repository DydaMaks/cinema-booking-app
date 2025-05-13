import { useState } from 'react';
import { saveBooking } from '../services/BookingService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../components/bookingForm.module.css';

const BookingForm = ({ movieId, selectedSeats, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ім'я обов'язкове";
    if (!formData.phone.trim()) newErrors.phone = "Телефон обов'язковий";
    if (!formData.email.trim()) {
      newErrors.email = "Email обов'язковий";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        const booking = {
          movieId,
          selectedSeats,
          ...formData,
          date: new Date().toISOString()
        };
        const success = await saveBooking(booking);
        if (success) {
          toast.success('Бронювання успішно завершено!');
          onSuccess();
        } else {
          toast.error('Помилка при збереженні бронювання');
        }
      } catch (error) {
        toast.error('Сталася помилка при бронюванні');
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Дані для бронювання</h3>
      <div className={styles.formGroup}>
        <label>Ім'я:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? styles.error : ''}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>
      <div className={styles.formGroup}>
        <label>Телефон:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? styles.error : ''}
        />
        {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
      </div>
      <div className={styles.formGroup}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? styles.error : ''}
        />
        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
      </div>
      <div className={styles.selectedSeats}>
        <p>Вибрані місця: {selectedSeats.join(', ')}</p>
      </div>
      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Обробка...' : 'Підтвердити бронювання'}
      </button>
    </form>
  );
};

export default BookingForm;