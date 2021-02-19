 u-icon 有一点小问题  
需要去修改 u-icon 组件的源代码  
 将 uview-ui/iconfont.css 复制为 iconfont.scss,  
然后 uview-ui/components/u-icon/u-icon.vue 中:   
`@import '../../iconfont.css'; `  
		变为   
`import '../../uicinfot.scss';`


## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

