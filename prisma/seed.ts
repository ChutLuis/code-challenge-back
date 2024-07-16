import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create dummy products
  await prisma.product.createMany({
    data: [
      { name: 'Aluminum Sheet 6061-T6', thickness: '1/4 inch', dimensions: '4 feet x 8 feet', stock: 200, pricePerUnit: 150 },
      { name: 'Aluminum Sheet 6061-T6', thickness: '1/8 inch', dimensions: '4 feet x 8 feet', stock: 300, pricePerUnit: 100 },
      { name: 'Aluminum Sheet 5052-H32', thickness: '1/4 inch', dimensions: '4 feet x 8 feet', stock: 150, pricePerUnit: 140 },
      { name: 'Aluminum Sheet 5052-H32', thickness: '1/8 inch', dimensions: '4 feet x 8 feet', stock: 250, pricePerUnit: 90 },
      { name: 'Aluminum Sheet 3003-H14', thickness: '1/4 inch', dimensions: '4 feet x 8 feet', stock: 180, pricePerUnit: 130 },
      { name: 'Aluminum Sheet 3003-H14', thickness: '1/8 inch', dimensions: '4 feet x 8 feet', stock: 220, pricePerUnit: 80 },
      { name: 'Aluminum Sheet 7075-T6', thickness: '1/4 inch', dimensions: '4 feet x 8 feet', stock: 100, pricePerUnit: 200 },
      { name: 'Aluminum Sheet 7075-T6', thickness: '1/8 inch', dimensions: '4 feet x 8 feet', stock: 120, pricePerUnit: 150 },
      { name: 'Stainless Steel Plate 304', thickness: '3/8 inch', dimensions: '5 feet x 10 feet', stock: 50, pricePerUnit: 300 },
      { name: 'Stainless Steel Plate 316', thickness: '1/2 inch', dimensions: '4 feet x 8 feet', stock: 60, pricePerUnit: 350 },
      { name: 'Stainless Steel Plate 430', thickness: '1/4 inch', dimensions: '6 feet x 12 feet', stock: 40, pricePerUnit: 250 },
      { name: 'Copper Sheet C110', thickness: '1/4 inch', dimensions: '4 feet x 8 feet', stock: 90, pricePerUnit: 500 },
      { name: 'Copper Sheet C110', thickness: '1/8 inch', dimensions: '4 feet x 8 feet', stock: 100, pricePerUnit: 450 },
      { name: 'Brass Sheet 260', thickness: '1/4 inch', dimensions: '4 feet x 8 feet', stock: 70, pricePerUnit: 600 },
      { name: 'Brass Sheet 260', thickness: '1/8 inch', dimensions: '4 feet x 8 feet', stock: 80, pricePerUnit: 550 },
    ],
  });

  // Create dummy processing services
  await prisma.processingService.createMany({
    data: [
      { name: 'Cutting', pricePerUnit: 10 },
      { name: 'Anodizing', pricePerUnit: 20 },
      { name: 'Polishing', pricePerUnit: 15 },
      { name: 'Laser Cutting', pricePerUnit: 25 },
      { name: 'Welding', pricePerUnit: 30 },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
