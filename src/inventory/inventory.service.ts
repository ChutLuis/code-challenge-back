import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addDays } from 'date-fns'; // Using date-fns for date manipulation

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async checkInventory(item: any, deliveryDate: any): Promise<{ available: boolean, price: number, product?: any, alternatives?: any[], canMeetDeadline?: boolean }> {
    const product = await this.prisma.product.findFirst({
      where: {
        name: item.type,
        thickness: item.thickness,
        dimensions: item.dimensions,
      },
    });

    if (!product || product.stock < item.quantity) {
      const alternatives = await this.findAlternatives(item);
      return { available: false, price: 0, product: null, alternatives, canMeetDeadline: false };
    }

    const totalPrice = await this.calculatePrice(product, item.quantity, item.custom_dimensions, item.processing);

    let canMeetDeadline = true;
    if (deliveryDate !== 'No Constraints') {
      canMeetDeadline = this.canShipInTime(deliveryDate);
    }

    return { available: true, price: totalPrice, product, canMeetDeadline };
  }

  async findAlternatives(item: any): Promise<any[]> {
    // Find products with the same material type but different thickness or dimensions
    return this.prisma.product.findMany({
      where: {
        name: item.type,
        OR: [
          { thickness: item.thickness },
          { dimensions: item.dimensions }
        ]
      },
      take: 5, // Limit to top 5 alternatives
    });
  }

  async calculatePrice(product: any, quantity: number, customDimensions?: string, processing?: string): Promise<number> {
    let totalPrice = product.pricePerUnit * quantity;

    // Include additional costs for custom dimensions and processing services if any
    if (customDimensions) {
      totalPrice += 10 * quantity; // Example additional cost for custom dimensions
    }
    if (processing) {
      const services = processing.split(', ');
      for (const service of services) {
        const processingService = await this.prisma.processingService.findFirst({ where: { name: service } });
        if (processingService) {
          totalPrice += processingService.pricePerUnit * quantity;
        }
      }
    }

    return totalPrice;
  }

  canShipInTime(deliveryDate: Date): boolean {
    // Here we assume 5 days shipping time to any location in the USA
    const shippingTimeDays = 5;
    const currentDate = new Date();
    const shippingDate = addDays(currentDate, shippingTimeDays);
    return (shippingDate <= deliveryDate);
  }
}
