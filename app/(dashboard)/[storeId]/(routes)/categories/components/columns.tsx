"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type CategoryColumn = {
  id: string
  name: string
  billboardLabel: string
  createdAt: string;
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Název",
  },
  {
    accessorKey: "billboard",
    header: "Reklama",
    cell: ({ row }) => row.original.billboardLabel,
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
