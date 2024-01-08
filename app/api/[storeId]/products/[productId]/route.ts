import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { productId: string }} 
    ) {
        try {

            if (!params.productId) {
                return new NextResponse("Id produktu je povinné", { status: 400});
            }

            const product = await prismadb.product.findUnique({
               where: {
                id: params.productId,
               },
               include: {
                images: true,
                category: true,
                size: true,
                color: true
               }
            });

            return NextResponse.json(product);

        } catch (error) {
            console.log('[PRODUCT_GET]', error);
            return new NextResponse("Interní chyba", { status: 500 });
        }
};

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string, productId: string }} 
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

            const storeByUserId = await prismadb.store.findFirst({
                where:{
                    id: params.storeId,
                    userId
                }
            });
    
            if (!storeByUserId) {
                return new NextResponse("Neoprávnění přístup", { status: 403 });
            }

            await prismadb.product.update({
               where: {
                id: params.productId,
               },
               data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                images: {
                    deleteMany: {},
                },
                isFeatured,
                isArchived,
               } 
            });

            const product = await prismadb.product.update({
                where: {
                    id: params.productId
                },
                data: {
                    images: {
                        createMany: {
                            data: [
                                ...images.map((image: { url: string }) => image),
                            ]
                        }
                    }
                }
            })

            return NextResponse.json(product);

        } catch (error) {
            console.log('[PRODUCT_PATCH]', error);
            return new NextResponse("Interní chyba", { status: 500 });
        }
};

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, productId: string }} 
    ) {
        try {
            const  { userId } = auth();

            if(!userId) {
                return new NextResponse("Neoprávněný přístup", { status: 401 });
            }


            if (!params.productId) {
                return new NextResponse("Id produktu je povinné", { status: 400});
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

            const product = await prismadb.product.deleteMany({
               where: {
                id: params.productId,
               }
            });

            return NextResponse.json(product);

        } catch (error) {
            console.log('[PRODUCT_DELETE]', error);
            return new NextResponse("Interní chyba", { status: 500 });
        }
};
