import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

type CreatePurchaseInput = {
  customer_id: string;
  product_id: string;
};

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  async listAllPurchases() {
    return await this.prisma.purchase.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async createPurchase({ product_id, customer_id }: CreatePurchaseInput) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: product_id,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const purchase = await this.prisma.purchase.create({
      data: {
        product_id,
        customer_id,
      },
    });

    return purchase;
  }
}
