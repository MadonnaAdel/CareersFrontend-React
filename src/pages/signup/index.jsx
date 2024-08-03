// src/components/SignUp.js
import React, { useState } from "react";
import SignUpStepOne from "../../component/signupStepOne/index";
import SignUpStepTwo from "../../component/signupStepTwo/index";
import { useFormContext } from "../../contexts/RegisterFormContext";

const SignUp = () => {
  const { currentStep } = useFormContext();
  const steps = [<SignUpStepOne />, <SignUpStepTwo />];
  return <>{steps[currentStep]}</>;
};

export default SignUp;
