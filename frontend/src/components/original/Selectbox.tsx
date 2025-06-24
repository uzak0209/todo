import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectProps {
  placeholder: string;
  values: any[];
  onValueChange: (value:any) => void;
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