"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
 


const formSchema = z.object (({
    name: z.string().min(1, "Název musí obsahovat miniláně 1 znak"),
}));

export const StoreModal = () => {
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues: {
        name: "",
       },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
           setLoading(true); 

           const response = await axios.post('/api/stores', values);
           
           window.location.assign(`/${response.data.id}`);

        } catch (error) {
            toast.error("Něco se pokazilo");
        } finally {
            setLoading(false);
        }
    }

    return (
    <Modal
        title="Vytvořit obchod"
        description = "Přidat nový obchod pro správu produktů a kategorií"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
    >
        <div>
            <div className="space-y-4 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                        control= {form.control}
                        name="name"
                        render= {({ field }) => (
                            <FormItem>
                                <FormLabel>Název eshopu</FormLabel> 
                                <FormControl>
                                    <Input 
                                    disabled={loading} placeholder="Eshop" {...field}/>
                                </FormControl> 
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button
                            disabled={loading}  variant="outline" onClick={storeModal.onClose} >ukončit</Button>
                            <Button 
                            disabled={loading} type="submit">pokračovat</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    </Modal>
    );
};