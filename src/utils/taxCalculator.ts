import { SSNIT_RATE, MONTHLY_TAX_RATES, NUM_OF_MONTHS } from "../contants"


interface CalculatePayeProps {
    grossInput: number,
    allowancesInput: number,
    taxReliefInput: number,
    isAnnual?: boolean;
}

interface ComputePayeProps {
    grossIncome: number, allowance: number, taxRelief: number, taxRates: number[][]
}

abstract class TaxCalculatorProps {
    abstract calculatePaye(params: CalculatePayeProps): any;
    abstract computePaye(params: ComputePayeProps): any;
}

export class TaxCalculator extends TaxCalculatorProps {
    calculatePaye(
        params: CalculatePayeProps
    ): ReturnType<typeof this.computePaye> {
        const { allowancesInput, grossInput, taxReliefInput, isAnnual } = params;
        const grossIncome = isAnnual ? grossInput / NUM_OF_MONTHS : grossInput;
        const allowance = isAnnual ? allowancesInput / NUM_OF_MONTHS : allowancesInput;
        const taxRelief = isAnnual ? taxReliefInput / NUM_OF_MONTHS : taxReliefInput;

        return this.computePaye({
            grossIncome,
            allowance,
            taxRelief,
            taxRates: MONTHLY_TAX_RATES,
        });
    }

    computePaye(params: ComputePayeProps) {
        const { allowance, grossIncome, taxRates, taxRelief } = params;
        let totalTax = 0;

        const ssnitContribution = (grossIncome * SSNIT_RATE) / 100;

        const totalTaxRelief = ssnitContribution + taxRelief;

        let taxableRemaining = grossIncome - totalTaxRelief + allowance;

        const computationTaxBreakdown = [
            {
                taxRate: 0,
                taxAmount: 0,
                amountTaxed: 0,
            },
        ];

        for (let i = 0; i < taxRates.length; i++) {
            if (taxableRemaining > 0) {
                const [taxRate, taxableAmount] = taxRates[i];
                const actualTaxableAmount =
                    taxableRemaining > taxableAmount ? taxableAmount : taxableRemaining;

                const trancheTax = (taxRate * actualTaxableAmount) / 100;

                totalTax = totalTax + trancheTax;

                computationTaxBreakdown[i] = {
                    taxRate,
                    taxAmount: +trancheTax.toFixed(2),
                    amountTaxed: +actualTaxableAmount.toFixed(2),
                };

                taxableRemaining = taxableRemaining - actualTaxableAmount;
            }
        }

        const netIncome = grossIncome + allowance - totalTax - ssnitContribution;

        return {
            incomeTax: totalTax.toFixed(2),
            ssnit: ssnitContribution.toFixed(2),
            netIncome: netIncome.toFixed(2),
            computationTaxBreakdown,
        };
    }
}

