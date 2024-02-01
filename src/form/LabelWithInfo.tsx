import TooltipWrapper from "../components/Tooltip";
import { Label } from "../components/ui/label";
import { Info } from "lucide-react";

const LabelWithInfo = ({
  content,
  tooltipText,
  htmlFor
}: {
  content: string;
  tooltipText?: string;
  htmlFor?: string;
}) => {
  return (
    <Label
      htmlFor={htmlFor && htmlFor}
      className="flex items-center gap-2 cursor-pointer"
    >
      <span>{content}</span>
      <TooltipWrapper text={tooltipText || ""}>
        <Info size={14} />
      </TooltipWrapper>
    </Label>
  );
};

export default LabelWithInfo;
