import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async checkInventory(item: any): Promise<{ available: boolean, price: number, product?: any }> {
    const product = await this.prisma.product.findFirst({
      where: {
        name: item.type,
        thickness: item.thickness,
        dimensions: item.dimensions,
      },
    });

    if (!product || product.stock < item.quantity) {
      return { available: false, price: 0, product: null };
    }

    let totalPrice = product.pricePerUnit * item.quantity;

    // Include additional costs for custom dimensions and processing services if any
    if (item.custom_dimensions) {
      // Example additional cost for custom dimensions
      totalPrice += 10 * item.quantity;
    }
    if (item.processing) {
      const services = item.processing.split(', ');
      for (const service of services) {
        const processingService = await this.prisma.processingService.findFirst({ where: { name: service } });
        if (processingService) {
          totalPrice += processingService.pricePerUnit * item.quantity;
        }
      }
    }

    return { available: true, price: totalPrice, product };
  }
}
