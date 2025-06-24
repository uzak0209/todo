import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Check, AlertCircle, Clock } from "lucide-react";
import { Status } from "@/types/types";
import { Badge } from "@/components/ui/badge";

interface RadioUIProps {
  value: Status;
  onValueChange: (value: Status) => void;
  className?: string;
}

const RadioUI=({ value, onValueChange, className = "" }: RadioUIProps)=> {
  const [selectedValue, setSelectedValue] = useState<Status>(value);

  const handleValueChange = (newValue: string) => {
    const statusValue = newValue as unknown as Status;
    setSelectedValue(statusValue);
    onValueChange(statusValue);
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case Status.DONE:
        return <Check className="w-4 h-4 text-green-600" />;
      case Status.IN_PROGRESS:
        return <Clock className="w-4 h-4 text-blue-600" />;
      case Status.TODO:
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <RadioGroup
      value={String(selectedValue)}
      onValueChange={handleValueChange}
      className={`flex gap-2 ${className}`}
    >
      {Object.values(Status).map((status) => (
        <RadioGroupItem
          key={status}
          value={String(status)}
          id={`radio-${status}`}
          className="hidden"
        />
      ))}
      {Object.values(Status).map((status) => (
        <Badge
          key={status}
          variant="outline"
          className={`cursor-pointer flex items-center gap-1 p-2 border rounded ${
            selectedValue === status ? "bg-blue-100 border-blue-300" : "bg-white border-gray-300"
          }`}
          onClick={() => handleValueChange(String(status))}
        >
          {getStatusIcon(status as Status)}
          {status}
        </Badge>
      ))}
    </RadioGroup>
  );
}
export default RadioUI;