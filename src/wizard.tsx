import React, { useState } from "react";
import { Button } from "antd";

export interface FormField {
  field: string;
  type: string;
  required?: boolean;
}

export interface Item {
  component?: React.FC;
  title: string;
  description: string;
  fields?: FormField[];
}

export interface WizardProps {
  items: Item[];
}

const Wizard: React.FC<any> = ({ sections, onNext }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = async () => {
    try {
      const status = await onNext();
      !!status && setCurrentStep(currentStep + 1);
    } catch {
      console.log("someting went wrong! check console logs.");
    }
  };

  return (
    <div>
      <Button
        disabled={currentStep === 0}
        onClick={() => setCurrentStep(currentStep - 1)}
      >
        Previous
      </Button>
      <Button
        disabled={currentStep === sections.length - 1}
        onClick={handleNext}
      >
        Next
      </Button>
      {sections[currentStep].content}
    </div>
  );
};

export default Wizard;
