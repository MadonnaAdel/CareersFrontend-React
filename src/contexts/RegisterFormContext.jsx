import React, { createContext, useContext, useState } from "react";

export const RegisterFormContext = createContext();

export const RegisterFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <RegisterFormContext.Provider
      value={{ formData, updateFormData, currentStep, nextStep, prevStep }}
    >
      {children}
    </RegisterFormContext.Provider>
  );
};

export const useFormContext = () => useContext(RegisterFormContext);
