#### type 和 interface 比更好用

type 和 interface 有着很多相同的用法，但是很多时候type比interface更好用，下面将举例说明：

#### 1. interface 只能描述一个对象，但type可以描述一个变量

例子：
```
type User = string;

const u: User = 'twy';

type No = number;
const u: No = 100;
```

#### 2.type 还可以表示一个变量的多种定义类型

例子：
```
type User = string | string[];

const u: User = 'twy';
const u2: User = ['twy', 'uuy'];
```

#### 3.type对于复用类型表达更简洁

例子：
```
type UserProps = {
    name: string;
    age: number;
    data: string;
}

type GuestProps = Omit<UserProps, "name"| "age">:
// 上面的GuestProps目前就只有一个data类型

type GuestProps2 = Omit<UserProps, "name">:
// 上面的GuestProps目前就移除了name这个类型


// 如果是interface表示
interface UserProps {
    name: string;
    age: number;
    data: string;
}

interface GuestProps extends Omit<UserProps, "name"|"age"> {}
// 明显更复杂
```
#### 4.type 对于复合类型的表达更简洁
例子：
```
type Address = [number, string];

const address: Address = [1, "two"];

// interface 的表达：
interface Address extends Array<number | string> {
    0: number;
    1: string;
}

// 对比type类型的表达，interface明显更加啰嗦
```
#### 5.type可以直接用一个数据来指定类型
例子：
```
const user = {
  name: "test",
  age: 10,
  data: 'this is test data',
  specaials: {
    pwd: 'tyuw',
    data: "data"
  }
}

type User = typeof user

const user2 : User = {
  name: "test2",
  age: 1,
  data: '233'
}

type Specaials = typeof user["specaials"]

const specaials2 : Specaials = {
  pwd: "123",
  data: '12312'
}
```
