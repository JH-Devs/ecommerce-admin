import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { billboardId: string }} 
    ) {
        try {

            if (!params.billboardId) {
                return new NextResponse("Id obrázku je povinné", { status: 400});
            }

            const billboard = await prismadb.billboard.findUnique({
               where: {
                id: params.billboardId,
               }
            });

            return NextResponse.json(billboard);

        } catch (error) {
            console.log('[BILLBOARD_GET]', error);
            return new NextResponse("Interní chyba", { status: 500 });
        }
};

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string, billboardId: string }} 
    ) {
        try {
            const  { userId } = auth();
            const body = await req.json();

            const { label, imageUrl } = body;

            if(!userId) {
                return new NextResponse("Neoprávněný přístup", { status: 401 });
            }

            if (!label) {
              return new NextResponse("Název je povinný", { status:400 });  
            }
            if (!imageUrl) {
                return new NextResponse("URL obrázku je povinné", { status:400 });  
              }

            if (!params.billboardId) {
                return new NextResponse("Id obchodu je povinné", { status: 400});
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

            const billboard = await prismadb.billboard.updateMany({
               where: {
                id: params.billboardId,
               },
               data: {
                label,
                imageUrl
               } 
            });

            return NextResponse.json(billboard);

        } catch (error) {
            console.log('[BILLBOARD_PATCH]', error);
            return new NextResponse("Interní chyba", { status: 500 });
        }
};

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string }} 
    ) {
        try {
            const  { userId } = auth();

            if(!userId) {
                return new NextResponse("Neoprávněný přístup", { status: 401 });
            }


            if (!params.billboardId) {
                return new NextResponse("Id obrázku je povinné", { status: 400});
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

            const billboard = await prismadb.billboard.deleteMany({
               where: {
                id: params.billboardId,
               }
            });

            return NextResponse.json(billboard);

        } catch (error) {
            console.log('[BILLBOARD_DELETE]', error);
            return new NextResponse("Interní chyba", { status: 500 });
        }
};
