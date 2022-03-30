#### 按钮状态

1. 普通状态
2. hover 鼠标悬停状态
3. active 点击状态
4. focus 获取焦点状态
5. 忙碌/等待状态
6. 禁用状态
​```scss
button {  
background: orange;
&:hover {

    }
    &:active {
        
    }
    &:focus {
        
    }
    &.busy {
        
    }
    &:disabled {
        
    }
}
​```

<slot name="footer"></slot>

::: warning
注意：
:::

::: danger
警告：
:::

::: tip
提示：这是一段提示
:::

```md
{{ 1 + 1 }}