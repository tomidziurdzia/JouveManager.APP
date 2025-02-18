import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Table } from "@tanstack/react-table";

export function exportTableToPdf<T>(
  table: Table<T>,
  filename: string = "Export",
  columns: { header: string; dataKey: keyof T }[]
) {
  const doc = new jsPDF();
  const today = new Date().toISOString().split("T")[0];

  const rows = table.getRowModel().rows.map((row) => row.original);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (doc as any).autoTable({
    theme: "grid",
    headStyles: {
      fillColor: [211, 211, 211],
      textColor: 0,
      halign: "center",
    },
    bodyStyles: {
      halign: "center",
    },
    columns,
    body: rows,
  });

  doc.save(`${filename}_${today}.pdf`);
}
