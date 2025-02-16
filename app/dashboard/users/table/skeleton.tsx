import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function UserSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-8 w-8 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[200px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[200px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[200px]" />
      </TableCell>
    </TableRow>
  );
}
