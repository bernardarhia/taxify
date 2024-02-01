import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { FC, ReactNode } from "react";

interface SheetWrapperProps {
  children: ReactNode;
  openSheet?: boolean;
  handleOpenSheet?: () => void;
}

const SheetWrapper: FC<SheetWrapperProps> = ({
  children,
  openSheet,
  handleOpenSheet,
}) => {
  return (
    <Sheet open={openSheet} onOpenChange={handleOpenSheet}>
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent className="h-full">
        <div className="mt-10 h-full">{children}</div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetWrapper;
