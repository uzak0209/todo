import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Priority, Status } from "@/types/types";
type Value=Priority|Status
interface SelectProps {
  values: Value[];
  onValueChange: (value:Value) => void;
  placeholder?: string;
}
export function Selector(props: SelectProps) {
  return (
    <Select onValueChange={props.onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {props.values.map((value) => (
          <SelectItem key={value} value={value}>
            {value}
          </SelectItem> 
        ))}
      </SelectContent>
    </Select>
  )
}