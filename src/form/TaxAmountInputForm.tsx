import { Input } from "../components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { taxCalculator } from "../utils/taxCalculator";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import TaxationBreakdown from "../components/TaxationBreakdown";
import LabelWithInfo from "./LabelWithInfo";
interface ComputationTaxBreakdownProps {
  taxRate: number;
  taxAmount: number;
  amountTaxed: number;
}

interface YourComponentStateProps {
  incomeTax: number;
  ssnit: number;
  netIncome: number;
  computationTaxBreakdown: ComputationTaxBreakdownProps[];
}
const TaxAmountInputForm = () => {
  const [inputFields, setInputFields] = useState({
    grossIncome: "",
    monthlyAllowance: "",
    taxRelief: "",
    isAnnual: false,
  });
  const [taxComputation, setTaxComputation] = useState<YourComponentStateProps>(
    {
      computationTaxBreakdown: [],
      incomeTax: 0,
      netIncome: 0,
      ssnit: 0,
    }
  );

  const hasValidValue = (value: string): number => {
    return value ? +value : 0;
  };
  const handleInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    const numericValue = parseFloat(value);
    if (value !== "" && isNaN(numericValue)) {
      return;
    }
    setInputFields((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSwitchChanged = (value: boolean) => {
    setInputFields((prev) => {
      return {
        ...prev,
        isAnnual: value,
      };
    });
  };
  useEffect(() => {
    const { grossIncome, isAnnual, monthlyAllowance, taxRelief } = inputFields;
    const computedTaxation = taxCalculator.calculatePaye({
      allowancesInput: hasValidValue(monthlyAllowance),
      grossInput: hasValidValue(grossIncome),
      taxReliefInput: hasValidValue(taxRelief),
      isAnnual,
    });
    setTaxComputation(computedTaxation);
  }, [inputFields]);
  return (
    <div className="form-container lg:max-w-[500px] md:max-w-[500px] w-[95%] m-auto">
      <div className="mb-10">
        <h1 className="font-bold text-2xl mb-5 text-center">
          CALCULATE YOUR PAYE
        </h1>
        <div className="form-control mb-3 flex flex-col gap-y-2">
          <LabelWithInfo
            htmlFor="grossIncome"
            content="Monthly Gross Income"
            tooltipText="Raw salary paid"
          />
          <Input
            value={inputFields.grossIncome}
            onChange={handleInputValueChanged}
            name="grossIncome"
            id="grossIncome"
          />
        </div>
        <div className="form-control mb-4 flex flex-col gap-y-2">
          <LabelWithInfo
            htmlFor="monthlyAllowance"
            content="Monthly Allowance"
            tooltipText="Eg: Allowance for food or transport"
          />
          <Input
            value={inputFields.monthlyAllowance}
            onChange={handleInputValueChanged}
            name="monthlyAllowance"
            id="monthlyAllowance"
          />
        </div>
        <div className="form-control mb-4 flex flex-col gap-y-2">
          <LabelWithInfo
            htmlFor="taxRelief"
            content="Tax Relief"
            tooltipText="Eg: Like mortgage free tax"
          />
          <Input
            value={inputFields.taxRelief}
            onChange={handleInputValueChanged}
            name="taxRelief"
            id="taxRelief"
          />
        </div>
        <div className="form-control flex items-center  gap-10 my-5">
          <Switch id="airplane-mode" onCheckedChange={handleSwitchChanged} />
          <Label htmlFor="airplane-mode">
            Check if gross salary is an annual salary
          </Label>
        </div>
      </div>
      <div className="text-center">
        <h1 className="font-bold text-2xl">NET INCOME:</h1>
        <p className="text-sm mb-5">Expected salary (Take home salary)</p>
        <h1 className="font-bold text-xl">
          GH&#8373;{" "}
          {taxComputation.netIncome ? taxComputation.netIncome : "0.00"}
        </h1>
      </div>
      <div className="mt-10">
        <h1 className="font-bold text-xl text-center mb-2">
          Breakdown of the entire taxable amounts
        </h1>
        <TaxationBreakdown
          taxBreakDown={taxComputation.computationTaxBreakdown}
        />
      </div>
    </div>
  );
};

export default TaxAmountInputForm;
