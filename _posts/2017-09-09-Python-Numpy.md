---
layout: post
title:  "Python-Numpy"
categories: jekyll update
---

### Base Function

**np.array()**

**np.shape**

**np.dtype**

**np.item()**

**np.itemsize**

**np.nbytes**


```python
import numpy as np
x = np.array([[[1,2],[3,4]],[[5,6],[7,8]]])
print(x)
print(x.shape)
print("data type: ", x.dtype)
print("dim: ", x.ndim)
print("item(0): ", x.item(0))
print("itemsize: ", x.itemsize)
print("nbytes: ", x.nbytes)
```

    [[[1 2]
      [3 4]]
    
     [[5 6]
      [7 8]]]
    (2, 2, 2)
    data type:  int64
    dim:  3
    item(0):  1
    itemsize:  8
    nbytes:  64


### transpose Matrix
**np.T** - (n.dim <= 2)


```python
y = np.array([[1,2],[3,4]])
print(y.T)

```

    [[1 3]
     [2 4]]


### shape Manipulation

**np.reshape()** - have to assign to a left variable, or the change will be saved

**np.resize()** - it seems to automatically change multi-dimension array to one-dimension

**np.flatten()** - copy 

**np.ravel()** - no copy, it means that any manipulation on it will be saved


```python
z = np.array([[1, 2], [3, 4]])
print(z)
print(z.reshape(1,4))
print(z)
z.resize(6)
print(z)
print(z.reshape(2,3))
z = z.reshape(2,3)
print(z)
z.flatten()[4] = 99
z.ravel()[5] = 100
print(z)

```

    [[1 2]
     [3 4]]
    [[1 2 3 4]]
    [[1 2]
     [3 4]]
    [1 2 3 4 0 0]
    [[1 2 3]
     [4 0 0]]
    [[1 2 3]
     [4 0 0]]
    [[  1   2   3]
     [  4   0 100]]


### item manipulation and selection

**np.take(index)**

**np.put(index)** - could only replace existed entry

**np.repeat(, axis=)**


```python
a = np.array([[1,2],[3,4]])
print(a)
print(a.take(2))
a.put(2, 22)
print(a)
print(a.repeat(2))
print(a.repeat(2, axis=0))
print(a.repeat(2, axis=1))
```

    [[1 2]
     [3 4]]
    3
    [[ 1  2]
     [22  4]]
    [ 1  1  2  2 22 22  4  4]
    [[ 1  2]
     [ 1  2]
     [22  4]
     [22  4]]
    [[ 1  1  2  2]
     [22 22  4  4]]

