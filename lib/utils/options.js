`
config

hexo.config.auto_association.enable 是否启用
hexo.config.auto_association.key 匹配关键字 默认为association，如果有需要可以修改其他配置
hexo.config.auto_association.url 如果为true 则为默认url 如果是false 则为关闭url 追加 默认为 “/” 当然可以追加任意url 在 post.path 前
hexo.config.auto_association.priority 用户决定优先级默认为10
hexo.config.auto_association.self 是否关联自己，默认关闭，我们不建议关联自己，但你依然可以通过启动这个选项关联自己
hexo.config.auto_association.mode 你可以通过这个选项决定，是只关联第一次出现，还是全部关联，默认是全部关联

post
association 关联词 通常是 string 或者 []
一个文章通常具有一个或者多个关联词，“auto-association”通过这些关联词将这些文章关联在一起，如果不设置关联词则不关联，没有默认关联词。

`
// 导出模块使用comm
module.exports = function initFunc() {
  const { config } = this;
  config.auto_associations = {
    enable: true,
    key: "association",
    url: '/',
    priority: 10,
    self: false,
    mode: "all", // single | all
    class_name: "auto-association",
    log: true, // true | false
    is_clear_cache: false // true | false
  }
}
