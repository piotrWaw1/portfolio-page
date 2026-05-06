import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface SelectComponentProps<T extends FieldValues> {
  options: Record<string, string>;
  className?: string;
  label: string;
  placeholder?: string;
  field: ControllerRenderProps<T, Path<T>>;
  id?: string;
}

export default function SelectComponent<T extends FieldValues>({
  options,
  className,
  label,
  placeholder,
  field,
  id = "form-projectType",
}: SelectComponentProps<T>) {
  return (
    <Select onValueChange={field.onChange} value={field.value}>
      <SelectTrigger className={className} id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {Object.entries(options).map(([key, value]) => (
            <SelectItem value={key} key={key}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
