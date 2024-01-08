import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST (
    req: Request,
    { params }: { params: {storeId: string}}

) {
    try {
        const  { userId } = auth();
        const body = await req.json();

        const { 
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived
        } = body;

        if (!userId) {
            return new NextResponse ("Neověřený přístup", { status: 401 });
        }
        
        if (!name) {
            return new NextResponse ("Název je povinný", { status: 400 });
        }
        if (!price) {
            return new NextResponse ("Cena je povinná", { status: 400 });
        }
        if (!categoryId) {
            return new NextResponse ("Id kategorie je povinné", { status: 400 });
        }
        if (!colorId) {
            return new NextResponse ("Id barvy je povinné", { status: 400 });
        }
        if (!sizeId) {
            return new NextResponse ("Id velikosti je povinné", { status: 400 });
        }
        
        if (!params.storeId) {
            return new NextResponse ("ID obchodu je povinné", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Neoprávnění přístup", { status: 403 });
        }

        const billboard = await prismadb.billboard.create({
           data: {
            label,
            imageUrl,
            storeId: params.storeId
           } 
        });

        return NextResponse.json(billboard);

    } catch (error) {
        console.log('[BILLBOARDS_POST]', error);
        return new NextResponse("Interní chyba", { status: 500 });
    }
};

export async function GET (
    req: Request,
    { params }: { params: {storeId: string}}

) {
    try {
        if (!params.storeId) {
            return new NextResponse ("ID obchodu je povinné", { status: 400 });
        }


        const billboards = await prismadb.billboard.findMany({
          where: {
            storeId: params.storeId,
          },
        });

        return NextResponse.json(billboards);

    } catch (error) {
        console.log('[BILLBOARDS_GET]', error);
        return new NextResponse("Interní chyba", { status: 500 });
    }
};