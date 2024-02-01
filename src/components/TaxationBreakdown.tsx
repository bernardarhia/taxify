import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { FC } from "react";

interface TaxationBreakdownProps {
  taxRate: number;
  taxAmount: number;
  amountTaxed: number;
}

const TaxationBreakdown: FC<{ taxBreakDown: TaxationBreakdownProps[] }> = ({
  taxBreakDown,
}) => {
  const calculateTotalAmountTaxable = () => {
    return taxBreakDown.reduce((a, b) => {
      return a + b.taxAmount;
    }, 0);
  };

  return (
    <Table className="w-full">
      <TableCaption>Breakdown of the entire paye rates.</TableCaption>
      <TableHeader className="w-full">
        <TableRow>
          <TableHead>Taxable Amount(GH&#8373;)</TableHead>
          <TableHead>Tax Rate(%)</TableHead>
          <TableHead>Tax Amount(GH&#8373;)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-center">
        {taxBreakDown.map((breakdown, index) => (
          <TableRow key={index} className="w-full">
            <TableCell className="font-medium">
              GH&#8373; {breakdown.amountTaxed}
            </TableCell>
            <TableCell>{breakdown.taxRate}%</TableCell>
            <TableCell> GH&#8373;{breakdown.taxAmount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="text-center">
        <TableRow>
          <TableCell >Total</TableCell>
          <TableCell ></TableCell>
          <TableCell   className="">
            GH&#8373;{calculateTotalAmountTaxable()}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TaxationBreakdown;
