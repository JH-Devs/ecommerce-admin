
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {formatter} from "@/lib/utils";
import { CreditCard, Package  } from "lucide-react";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { Overview } from "@/components/overview";
import { getGraphRevenue } from "@/actions/get-graph-revenue";

interface DashboardPageProps {
    params: { storeId: string}
};

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {
    const totalRevenue = await getTotalRevenue(params.storeId);
    const salesCount = await getSalesCount(params.storeId);
    const stockCount = await getStockCount(params.storeId);
    const graphRevenue = await getGraphRevenue(params.storeId);
    return (
        <div className="flex-col">
           <div className="flex-1 space-y-4 p-8 pt-6">
            <Heading title="Nástěnka" description="Přehled vašeho obchodu" />
            <Separator />
            <div className="grid gap-4 grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Celkové příjmy
                        </CardTitle>
                        <span className="text-sm text-muted-foreground"> Kč</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatter.format(totalRevenue)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Prodeje
                        </CardTitle>
                        <CreditCard className="text-sm text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            +{salesCount}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Produkty skladem
                        </CardTitle>
                        <Package className="text-sm text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stockCount}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card className="col-span-4">
                <CardHeader>
                <CardTitle>Přehled</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <Overview data={graphRevenue} />
                </CardContent>
            </Card>
           </div>
        </div>
    )
}
export default DashboardPage;