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
        if (!images || !images.length) {
            return new NextResponse ("Obrázek je povinný", { status: 400 });
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

        const product = await prismadb.product.create({
           data: {
            name,
            price,
            isFeatured,
            isArchived,
            categoryId,
            colorId,
            sizeId,
            storeId: params.storeId,
            images: {
                createMany: {
                    data: [
                        ...images.map((image: {url: string}) => image)
                    ]
                }
            }
           } 
        });

        return NextResponse.json(product);

    } catch (error) {
        console.log('[PRODUCTS_POST]', error);
        return new NextResponse("Interní chyba", { status: 500 });
    }
};

export async function GET (
    req: Request,
    { params }: { params: {storeId: string}}
) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const colorId = searchParams.get("colorId") || undefined;
        const sizeId = searchParams.get("sizeId") || undefined;
        const isFeatured = searchParams.get("isFeatured");

        if (!params.storeId) {
            return new NextResponse ("ID obchodu je povinné", { status: 400 });
        }


        const products = await prismadb.product.findMany({
          where: {
            storeId: params.storeId,
            categoryId,
            colorId,
            sizeId,
            isFeatured: isFeatured ? true : undefined,
            isArchived: false
          },
          include: {
            images: true,
            category: true,
            color: true,
            size: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        });

        return NextResponse.json(products);

    } catch (error) {
        console.log('[PRODUCTS_GET]', error);
        return new NextResponse("Interní chyba", { status: 500 });
    }
};