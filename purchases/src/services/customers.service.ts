import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

type CreateCustomerInput = {
  auth_user_id: string;
};

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async getCustomerById(id: string) {
    return await this.prisma.customer.findUnique({
      where: {
        id,
      },
    });
  }

  async getCustomerByAuthUserId(auth_user_id: string) {
    return await this.prisma.customer.findUnique({
      where: {
        auth_user_id,
      },
    });
  }

  async createCustomer({ auth_user_id }: CreateCustomerInput) {
    const customer = await this.prisma.customer.create({
      data: {
        auth_user_id,
      },
    });

    return customer;
  }
}
