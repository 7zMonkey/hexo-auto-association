// 载入配置文件
const initFunc = require('./utils/options')
module.exports = function (data) {
  const { config, locals } = this;
  console.log('hexo-auto-association:' + config.auto_associations)
  // 如果不存在配置信息则创建配置信息
  if (!config.auto_associations) {
    console.log("[hexo-auto-association]: Installing...")
    initFunc.call(this);
  }
  console.log('hexo-auto-association:' + config.auto_associations)

  const { enable, key, url, self, mode, class_name, log, is_clear_cache } = config.auto_associations;
  if (!enable) {
    console.log("[hexo-auto-association]: Not enabled, skip.")
    return
  }
  // 清除缓存
  if (is_clear_cache) {
    console.log("[hexo-auto-association]: Clearing cache...")
    locals.invalidate();
  }
  const posts = locals.get('posts').data;
  data.content = replaceHtmlText(data, posts);
  return data;
}

function replaceHtmlText(data, posts, config) {
  const { key, url, self, mode, class_name, log } = config;
  // 遍历对象数组，生成正则表达式
  const regex = new RegExp(`(${getAssociation(posts).join('|')})`, 'g');
  // 使用正则表达式替换HTML字符串中的文本
  const htmlString = data.content;
  const existedOnce = new Set();
  const title = data.title;
  return htmlString.replace(regex, match => {
    if (mode === 'single' && existedOnce.has(match)) return match;
    if (self && title === match) return match;
    const path = findPath(posts, key, match);
    if (!path) return match;

    existedOnce.add(match);
    if (log) {
      console.log(`[${match}]: ${title} ${[...existedOnce].join(', ')}`);
    }
    return obj ? `<a class="${class_name}" href="${url}/${path}">${match}</a>` : match;
  });
}

function findPath(posts, key, match) {
  const post = posts.find(post => {
    const association = post[key];
    return Array.isArray(association) ? association.includes(match) : association === match;
  });

  return post ? post.path : false;
}

function getAssociation(posts) {
  return posts.flatMap(post => post.association)
    .filter(association => typeof association === 'string');
}