"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type SizeColumn = {
  id: string
  name: string
  value: string
  createdAt: string;
}

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Název",
  },
  {
    accessorKey: "value",
    header: "Hodnota",
  },
  
  {
    accessorKey: "createdAt",
    header: "Datum",
  },
  {
    id: "actions",
    header: "Akce",
    cell: ({ row }) => <CellAction data={row.original} />   
  },
]
