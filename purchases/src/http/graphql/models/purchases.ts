import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Customer } from './customer';
import { Product } from './product';

enum PurchaseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED',
}

registerEnumType(PurchaseStatus, {
  name: 'PurchaseStatus',
  description: 'Available purchase status',
});

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field(() => PurchaseStatus)
  status: PurchaseStatus;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Product)
  product: Product;

  product_id: string;

  @Field(() => Customer)
  customer: Customer;

  customer_id: string;
}
