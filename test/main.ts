import { ItemApi } from './api/item';
import { OrderApi } from './api/order';

const main = async () => {
  await testNormal();
  await testOptimistic();
  await testPessimistic();
};

const testNormal = async () => {
  console.log(`\n------- TEST NORMAL -------`);
  await ready();
  console.time('costTime');
  const result = await Promise.allSettled(
    [...new Array(200).keys()].map(async () => {
      await OrderApi.order([
        {
          itemId: 1n.toString(),
          count: 10,
          price: 1000,
        },
      ]);
    }),
  );
  console.timeEnd('costTime');
  await report(result);
};

const testOptimistic = async () => {
  console.log(`\n------- TEST OPTIMISTIC -------`);
  await ready();
  console.time('costTime');
  const result = await Promise.allSettled(
    [...new Array(200).keys()].map(async () => {
      await OrderApi.orderOptimistic([
        {
          itemId: 1n.toString(),
          count: 10,
          price: 1000,
        },
      ]);
    }),
  );
  console.timeEnd('costTime');
  await report(result);
};

const testPessimistic = async () => {
  console.log(`\n------- TEST PESSIMISTIC -------`);
  await ready();
  console.time('costTime');
  const result = await Promise.allSettled(
    [...new Array(200).keys()].map(async () => {
      await OrderApi.orderPessimistic([
        {
          itemId: 1n.toString(),
          count: 10,
          price: 1000,
        },
      ]);
    }),
  );
  console.timeEnd('costTime');
  await report(result);
};

const ready = async () => {
  await OrderApi.reset();

  const item = await ItemApi.get(1n);
  console.log('before item stock: ', item.stock);
};

const report = async (result: PromiseSettledResult<void>[]) => {
  console.log(
    'number of success api: ',
    result.filter((r) => r.status === 'fulfilled').length,
  );

  console.log(
    'number of failed api: ',
    result.filter((r) => r.status === 'rejected').length,
  );

  const item2 = await ItemApi.get(1n);
  console.log('after item stock: ', item2.stock);

  const orderList = await OrderApi.getOrderList();
  console.log(
    'number of order item : ',
    orderList
      .flatMap((order) => order.itemList)
      .map((item) => item.count)
      .reduce((acc, cur) => acc + cur, 0),
  );
};

main();
