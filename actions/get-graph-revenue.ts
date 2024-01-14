import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async (storeId: string): Promise<GraphData[]> => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  //Seskupování objednávek podle měsíců a sečtení tržeb
  for (const order of paidOrders) {
    const month = order.createdAt.getMonth(); 
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber();
    }

    // Přičtení tržeb za tuto objednávku k příslušnému měsíci
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  // Převod seskupených dat do formátu očekávaného grafem
  const graphData: GraphData[] = [
    { name: "Led", total: 0 },
    { name: "Úno", total: 0 },
    { name: "Bře", total: 0 },
    { name: "Dub", total: 0 },
    { name: "Kvě", total: 0 },
    { name: "Čvn", total: 0 },
    { name: "Čvc", total: 0 },
    { name: "Srp", total: 0 },
    { name: "Zář", total: 0 },
    { name: "Říj", total: 0 },
    { name: "Lis", total: 0 },
    { name: "Pro", total: 0 },
  ];

  // Vyplnění údajů o příjmech
  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};