#### 常用方法，demo，笔记


##### 1.在typescript中定义一个对象的里key和value的类型：
```
const demo = {
    test: "1232",
    test2: '1111',
    test3: '2222',
    ...,
    tww: 'test'
}
```
定义demo的类型：
```
interface Options {
    // 未知键
    [key: string]: string | number | boolean;
    // 已知键
    tww: string
}
```
使用：
```
const demo: Options = {
    ....
}
```

##### 如何判断一个数据的类型是不是某个interface?

```
interface AProps {
    name: string
    code: string
}
interface BProps {
    age: number
    code: string
}
const data = AProps | BProps

if ( "age" in data ) {
    // BProps 的逻辑
} else {
    // AProps 的逻辑
}
```