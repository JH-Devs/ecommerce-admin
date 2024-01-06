"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,  DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { BillboardColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Copy, Trash } from "lucide-react";
import toast from "react-hot-toast";

interface CellActionProps {
    data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("ID zkopírováno do schránky");
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onCopy(data.id)}>
                    <Copy className="mr-2 h-4 w-4" />
                    kopírovat ID
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    upravit
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Trash className="mr-2 h-4 w-4" />
                    smazat
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};