# tx_physical_examination

## 注意事项
1. 全局已开启 eslint , 注意控制台语法规范报错 , 同时npm run build前,应该 npm run lint 检验一遍  
[ESLINT规则](http://eslint.cn/docs/rules/)
2. vant 已开启按需加载 , 在需要的用的地方 
```
// 某组件下
import { Button, Switch } from 'vant'

export default {
  ...
  components: {
    /*eslint-disable */
    [Button.name]: Button,
    [Switch.name]: Switch
    /* eslint-enable */
  }
  ...
}
```
3. 对于一些特殊情况, 用下面的方法让 ESLint 忽略某一段规则校验
```
  /* eslint-disable */
    some code ...
  /* eslint-enable */
```  
4. 已采用rem转换插件. 编写样式以设计图上的标记px写即可. 对于不需要转换的. px写成大写PX


## Project setup
```
npm install  
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
