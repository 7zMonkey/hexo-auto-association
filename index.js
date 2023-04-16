(function () {
  const setOptions = require('./lib/utils/options')

  hexo.config.auto_associations = setOptions(hexo.config.auto_associations);
  let { auto_associations } = hexo.config;

  const { enable, is_clear_cache, priority } = auto_associations;


  if (!enable) {
    console.log("[hexo-auto-association]: Not enabled, skip.")
    return
  }

  hexo.extend.filter.register('after_post_render', require('./lib/index'), priority);
})()