import { DateRange } from "react-day-picker";

export interface DataTableFilterField<TData> {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "select" | "date";
  options?: {
    label: string;
    value: string;
  }[];
  value?: Date;
  onChange?: (value: Date | undefined) => void;
}
