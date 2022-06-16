import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { BigQuery } from '@google-cloud/bigquery';

import { Product } from './product.entity';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  // Product Entity가 트리거 대상
  constructor(connection: Connection) {
    connection.subscribers.push(this); //this는 ProductSubscriber
  }
  listenTo() {
    return Product;
  }

  afterInsert(event: InsertEvent<Product>): void | Promise<any> {
    console.log(event);

    const bigQuery = new BigQuery({
      keyFilename: 'gcp-bigquery.json',
      projectId: 'codecamp-main-project',
    });

    bigQuery
      .dataset('mybigquery03')
      .table('productlog')
      .insert([
        {
          id: event.entity.id,
          name: event.entity.name,
          description: event.entity.description,
          price: event.entity.price,
          isSoldout: event.entity.isSoldout,
        },
      ]);
  }
}
