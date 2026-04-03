---
title: 最大公因数与最小公倍数
description: 使用while循环和break语句实现辗转相除法
---

## 学习目标

- 理解最大公因数（GCD）和最小公倍数（LCM）的概念
- 掌握使用 while 循环 + break 找到答案的方法
- 学会辗转相除法的原理
- 了解欧几里得算法

## 核心概念

- **最大公因数**：两个数共同的最大除数
- **最小公倍数**：两个数共同的最小倍数
- **while + break**：循环直到找到答案，然后跳出

## 算法

### 求最大公因数（GCD）

```python
def gcd(a, b):
    while True:
        if a > b:
            a = a - b
        else:
            b = b - a
        if a == b:
            break
    return a
```

### 求最小公倍数（LCM）

```python
def lcm(a, b):
    return a * b // gcd(a, b)
```
