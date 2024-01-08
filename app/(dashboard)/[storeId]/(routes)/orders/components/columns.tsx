"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type OrderColumn = {
  id: string;
  phone: string;
  email: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Produkty",
  },
  {
    accessorKey: "phone",
    header: "Telefon",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Adresa",
  },
  {
    accessorKey: "totalPrice",
    header: "Celková cena",
  },
  {
    accessorKey: "isPaid",
    header: "Zaplaceno",
  },
  {
    accessorKey: "createdAt",
    header: "Vytvořeno",
  },
]
