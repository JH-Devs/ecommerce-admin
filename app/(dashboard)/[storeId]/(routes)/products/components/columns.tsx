"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type ProductColumn = {
  id: string
  name: string
  price: string
  size: string
  category: string
  color: string
  isFeatured: boolean
  isArchived: boolean
  createdAt: string
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Název",
  },
  {
    accessorKey: "isArchived",
    header: "Archivováno",
  },
  {
    accessorKey: "isFeatured",
    header: "Zobrazeno",
  },
  {
    accessorKey: "price",
    header: "Cena",
  },
  {
    accessorKey: "category",
    header: "Kategorie",
  },
  {
    accessorKey: "size",
    header: "Velikost",
  },
  {
    accessorKey: "color",
    header: "Barva",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.color }} />
      </div>
    )
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
