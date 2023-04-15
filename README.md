## hexo-auto-association

`hexo-auto-association`是一款给将`hexo`生成的静态页做内部关联的工具，在会在`after_post_render`阶段，判断文章`Front-matter`下的指定内容（默认是association选项）进行关联。

[演示展示](https://www.7zmonkey.tech/)

![image-20230415151608032](https://7zmonkey-blog.oss-cn-beijing.aliyuncs.com/blog/iamges/image-20230415151608032.png)

### 配置信息

| 配置项 | 描述             | 默认值             | 选项 |
| -------------- | ---------------- | ------------------ | ------ |
| enable         | 是否启动         | true               | Boolean: true \| false |
| key            | Front-matter标签 | "association"      | String |
| url            | 额外的url 追加   | "/"                | String |
| priority       | 执行优先级       | 10                 |Number: 1-10|
| self           | 是否关联自己     | false              |Boolean: true \| false|
| mode           | 关键模式         | "all"              |String: single \| all|
| class_name     | class名称        | "auto-association" | String |
| log            | 显示日志         | true               | Boolean: true \| false |
| is_clear_cache | 清除缓存         | true               |  Boolean: true \| false  |

