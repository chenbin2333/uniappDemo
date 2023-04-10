
## 使用说明

### 1、最基本用法

- 视图文件

```html
<zm-tabs v-model="current" :tabs="tabs" @change="changeTab"></zm-tabs>
```

- 脚本文件

```js
export default {
  data() {
    return {
      current: 0,
      tabs: ['军事', '国内', '新闻新闻', '军事', '国内', '新闻', '军事', '国内', '新闻']
    }
  },
  methods: {
    changeTab(index) {
      console.log('当前选中的项：' + index)
    }
  }
}
```

### 2、平铺整个屏幕

- 视图文件

```html
<zm-tabs v-model="activeTab" :scroll="false" :tabs="['全部', '进行中', '已完成']"></zm-tabs>
```

- 脚本文件

```js
export default {
  data() {
    return {
      activeTab: 0
    }
  }
}
```

### 3、胶囊用法

- 视图文件

```html
<zm-tabs v-model="current" :tabs="tabs" :pills="true" line-height="0" activeColor="#fff" @change="changeTab"></zm-tabs>
```

- 脚本文件

```js
data() {
  return {
    current: 2,
    tabs: [
        '军事',
        '国内',
        '新闻新闻',
        '军事',
        '国内',
        '新闻',
        '军事',
        '国内',
        '新闻',
      ],
  },
  methods: {
    changeTab(index) {
      console.log('当前选中索引：' + index)
    }
  }
}
```

## 文档说明

### 1、属性说明

|       参数        |  类型   |  默认值   |                                   说明                                    |
| :---------------: | :-----: | :-------: | :-----------------------------------------------------------------------: |
|       tabs        |  Array  |    []     |                              控制 tab 的列表                              |
|       value       | Number  |     0     |                            必传(双向绑定的值)                             |
|       color       | String  |  '#333'   |                               默认文字颜色                                |
|    activeColor    | String  | '#2979ff' |                              选中文字的颜色                               |
|     fontSize      | String  |  '28rpx'  |                      默认文字大小(rpx 或 px)（弃用）                      |
|       bold        | Boolean |   true    |                              是否加粗选中项                               |
|      scroll       | Boolean |   true    |                      是否显示滚动条，平铺设置 false                       |
|      height       | String  |  '70rpx'  |                            tab 高度(rpx 或 px)                            |
|    lineHeight     | String  |  '10rpx'  |                            滑块高度(rpx 或 px)                            |
|     lineColor     | String  | '#2979ff' |                                滑块的颜色                                 |
|     lineScale     | Number  |    0.5    |                              滑块宽度缩放值                               |
|    lineRadius     | String  |  '10rpx'  |                          滑块圆角宽度(rpx 或 px)                          |
|       pills       | Boolean |   false   |                               是否开启胶囊                                |
|    pillsColor     | String  | '#2979ff' |                          胶囊背景颜色(rpx 或 px)                          |
| pillsBorderRadius | String  |  '10rpx'  |                          胶囊圆角宽度(rpx 或 px)                          |
|       field       | String  |    ''     |                 如果 tabs 子项是对象，输入需要展示的键名                  |
|      bgColor      | String  |  '#fff'   |                     背景色，支持 linear-gradient 渐变                     |
|      padding      | String  |    '0'    |                           整个 tab padding 属性                           |
|       fixed       | Boolean |   false   |                              是否固定在顶部                               |
|    paddingItem    | String  | '0 22rpx' |                选项的边距（设置上下不生效，需要设置高度）                 |
|   lineAnimation   | Boolean |   true    | 是否需要 line 和 pills 的动画，在隐藏页面后默认移动到第一个的时候比较实用 |

### 1.1 `tabs`参数展开说明

#### 1.1。1 当`tabs`仅仅是单纯的数组时候，没有什么特别的地方

```js
export default {
  data() {
    return {
      tabs: ['全部', '待付款', '待消费', '已完成', '已评价', '已过期', '已退款']
    }
  }
}
```

#### 1.1.2 当`tabs`使用的数组对象的方式，特定参数需要注意一下

- `disabled` 参数，可以控制按钮是否可以点击

```js
export default {
  data() {
    return {
      tabs: [
        { id: 1, name: '待付款', disabled: false },
        { id: 2, name: '待收货', disabled: false },
        { id: 3, name: '待评价', disabled: false },
        { id: 4, name: '退款/售后', disabled: true },
        { id: 5, name: '我的订单', disabled: false }
      ]
    }
  }
}
```

### 2、事件说明

|  名称  | 参数  |                说明                |
| :----: | :---: | :--------------------------------: |
| change | index | 改变选中项触发, index 选中项的下标 |

