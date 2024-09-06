import { OrderTest } from './order';

const main = async () => {
  // const itemList = await ItemTest.getList();
  // console.log(itemList);

  await OrderTest.order([
    {
      itemId: 1n.toString(),
      count: 5,
      price: 1000,
    },
  ]);

  const orderList = await OrderTest.getOrderList();
  console.log(orderList);
};

main();
