"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object (({
    name: z.string().min(1),
}));

export const StoreModal = () => {
    const storeModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
    })

    return (
    <Modal
        title="Vytvořit obchod"
        description = "Přidat nový obchod pro správu produktů a kategorií"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
    >
        Budoucí vytvoření formuláře pro obchod
    </Modal>
    );
};