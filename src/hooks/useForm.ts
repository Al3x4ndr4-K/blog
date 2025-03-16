import { useState, ChangeEvent, FormEvent } from 'react';
import { ValidationErrors, UseFormProps } from '../types/form';

export const useForm = <T extends { [key: string]: any }>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (fieldValues: Partial<T> = values): boolean => {
    const tempErrors: ValidationErrors = {};
    const fieldsToValidate = Object.keys(fieldValues);

    fieldsToValidate.forEach((field) => {
      const value = fieldValues[field] as string;
      const rules = validationRules[field];

      if (rules) {
        if (rules.required && !value) {
          tempErrors[field] = 'This field is required';
        }

        if (rules.pattern && value && !rules.pattern.test(value)) {
          tempErrors[field] = 'Invalid format';
        }

        if (rules.minLength && value && value.length < rules.minLength) {
          tempErrors[field] = `Minimum length is ${rules.minLength}`;
        }

        if (rules.maxLength && value && value.length > rules.maxLength) {
          tempErrors[field] = `Maximum length is ${rules.maxLength}`;
        }

        if (rules.custom && !rules.custom(value)) {
          tempErrors[field] = 'Invalid value';
        }
      }
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (validationRules[name]) {
      validate({ [name]: value } as Partial<T>);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
  };
};
