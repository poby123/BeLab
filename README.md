## BE Laboratory

### 동시성 처리

일반 트랜잭션, 비관적 락, 낙관적 락을 비교하여 실험합니다.

```sh
$ git clone https://github.com/poby123/BeLab.git
$ npm i
$ cd test
$ ts-node main.ts
```

```text
------- TEST NORMAL -------
before item stock:  200
costTime: 423.77ms
number of success api:  37
number of failed api:  163
after item stock:  20
number of order item :  370

------- TEST OPTIMISTIC -------
before item stock:  200
costTime: 377.565ms
number of success api:  18
number of failed api:  182
after item stock:  20
number of order item :  180

------- TEST PESSIMISTIC -------
before item stock:  200
costTime: 221.199ms
number of success api:  20
number of failed api:  180
after item stock:  0
number of order item :  200
```
