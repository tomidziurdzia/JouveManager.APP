import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Table } from "@tanstack/react-table";

export function exportTableToPdf<T>(
  table: Table<T>,
  filename: string = "Export",
  columns: { header: string; dataKey: keyof T }[]
) {
  const doc = new jsPDF();

  const today = new Date();
  const formattedToday = `${today.getDate().toString().padStart(2, "0")}-${(
    today.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${today.getFullYear()}`;

  const rows = table.getRowModel().rows.map((row) => {
    const formattedRow = { ...row.original } as Record<string, unknown>;
    // Formatear fechas si la propiedad parece ser una fecha
    Object.keys(formattedRow).forEach((key) => {
      const value = formattedRow[key];
      if (value && typeof value === "string" && value.includes("T")) {
        const date = new Date(value);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        formattedRow[key] = `${day}-${month}-${year}`;
      }
    });
    return formattedRow;
  });

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
    margin: { top: 10, right: 10, bottom: 10, left: 10 },
    columns,
    body: rows,
  });

  doc.save(`${filename}_${formattedToday}.pdf`);
}
