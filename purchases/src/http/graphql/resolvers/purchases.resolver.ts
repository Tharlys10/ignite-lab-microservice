import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProductsService } from '../../../services/products.service';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { PurchasesService } from '../../../services/purchases.service';
import { Product } from '../models/product';

import { Purchase } from '../models/purchases';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { CurrentUser, IAuthUser } from '../../../http/auth/current-user';
import { CustomersService } from 'src/services/customers.service';
import { Customer } from '@prisma/client';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private customersService: CustomersService,
  ) {}

  @Query(() => [Purchase])
  // @UseGuards(AuthorizationGuard)
  async purchases() {
    return await this.purchasesService.listAllPurchases();
  }

  @ResolveField()
  async product(@Parent() purchase: Purchase) {
    return await this.productsService.getProductById(purchase.product_id);
  }

  @ResolveField()
  async customer(@Parent() purchase: Purchase) {
    return await this.customersService.getCustomerById(purchase.customer_id);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @CurrentUser() user: IAuthUser,
    @Args('data') data: CreatePurchaseInput,
  ) {
    let customer = await this.customersService.getCustomerByAuthUserId(
      user.sub,
    );

    if (!customer) {
      customer = await this.customersService.createCustomer({
        auth_user_id: user.sub,
      });
    }

    return this.purchasesService.createPurchase({
      product_id: data.product_id,
      customer_id: customer.id,
    });
  }
}
