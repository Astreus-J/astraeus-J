import { useState, useCallback } from 'react';

// Tipos para o formulário
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

// Validadores
const validators = {
  name: (value: string): string | undefined => {
    if (!value.trim()) return 'Nome é obrigatório';
    if (value.trim().length < 3) return 'Nome deve ter no mínimo 3 caracteres';
    return undefined;
  },

  email: (value: string): string | undefined => {
    if (!value.trim()) return 'Email é obrigatório';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Email inválido';
    return undefined;
  },

  phone: (value: string): string | undefined => {
    // Telefone é opcional
    if (!value) return undefined;
    
    // Remove caracteres não numéricos
    const cleanPhone = value.replace(/\D/g, '');
    
    // Valida se tem 10 ou 11 dígitos (formato brasileiro)
    if (cleanPhone.length !== 10 && cleanPhone.length !== 11) {
      return 'Telefone inválido (use formato: (99) 99999-9999)';
    }
    
    return undefined;
  },

  subject: (value: string): string | undefined => {
    if (!value.trim()) return 'Assunto é obrigatório';
    if (value.trim().length < 3) return 'Assunto deve ter no mínimo 3 caracteres';
    return undefined;
  },

  message: (value: string): string | undefined => {
    if (!value.trim()) return 'Mensagem é obrigatória';
    if (value.trim().length < 10) return 'Mensagem deve ter no mínimo 10 caracteres';
    return undefined;
  },
};

// Formata telefone brasileiro
export const formatPhoneBR = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length === 0) return '';
  if (cleaned.length <= 2) return `(${cleaned}`;
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
};

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Record<keyof ContactFormData, boolean>>({
    name: false,
    email: false,
    phone: false,
    subject: false,
    message: false,
  });

  // Valida um campo específico
  const validateField = useCallback(
    (field: keyof ContactFormData, value: string): string | undefined => {
      return validators[field](value);
    },
    []
  );

  // Valida todos os campos
  const validateForm = useCallback((): boolean => {
    const newErrors: ContactFormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof ContactFormData>).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validateField]);

  // Atualiza valor do campo
  const updateField = useCallback(
    (field: keyof ContactFormData, value: string) => {
      // Aplica máscara de telefone se for o campo phone
      const finalValue = field === 'phone' ? formatPhoneBR(value) : value;

      setFormData((prev) => ({
        ...prev,
        [field]: finalValue,
      }));

      // Valida em tempo real se o campo já foi tocado
      if (touched[field]) {
        const error = validateField(field, finalValue);
        setErrors((prev) => ({
          ...prev,
          [field]: error,
        }));
      }
    },
    [touched, validateField]
  );

  // Marca campo como tocado (blur)
  const handleBlur = useCallback(
    (field: keyof ContactFormData) => {
      setTouched((prev) => ({
        ...prev,
        [field]: true,
      }));

      // Valida o campo ao sair
      const error = validateField(field, formData[field]);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    },
    [formData, validateField]
  );

  // Limpa o formulário
  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setTouched({
      name: false,
      email: false,
      phone: false,
      subject: false,
      message: false,
    });
  }, []);

  return {
    formData,
    errors,
    touched,
    updateField,
    handleBlur,
    validateForm,
    resetForm,
  };
};
