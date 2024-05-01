## code-snippet
面向开发人员，为了实现创建、组织和共享代码片段的功能，并且不依赖于用户自己使用的IDE
>目前只支持windows
## 使用
1. 点击快捷键去往文件夹

    ![alt text](image.png)  
2. 在文件夹里面创建文件（文件夹），其中文件命名格式为[name].md。 
    内容使用`js-yaml`指定格式。下面是一个例子
    ```yaml
    ---
    label:
        phone
    ---
    153****5923
    ```
3. 使用app进行搜索，↑、↓键可以控制选择，按住enter键会将文件内容复制在鼠标聚焦位置（支持vim模式）

## 演示
![alt text](demo.gif)