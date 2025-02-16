import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function TruckSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-[250px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[250px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[250px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-8 rounded-full" />
      </TableCell>
    </TableRow>
  );
}
