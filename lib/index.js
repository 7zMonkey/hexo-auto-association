// 载入配置文件
const initFunc = require('./utils/options')
module.exports = function (data) {
  const { config, locals } = this;
  // 如果不存在配置信息则创建配置信息
  if (!config.auto_associations) {
    console.log("[hexo-auto-association]: Installing...")
    initFunc.call(this);
  }
  const { enable, is_clear_cache } = config.auto_associations;
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
  data.content = replaceHtmlText(data, posts, config.auto_associations);
  return data;
}

function replaceHtmlText(data, posts, config) {
  const { key, url, self, mode, class_name, log } = config;
  const associations = getAssociations(posts, key);
  if (associations.length !== 0) console.log("[hexo-auto-association]: Associations: ", associations.join())
  else console.log("[hexo-auto-association]: No associations, skip.")
  const regex = new RegExp(`(${associations.join('|')})`, 'g');
  const htmlString = data.content;
  const title = data.title;
  const existedOnce = new Set();

  return htmlString.replace(regex, match => {
    if (mode === 'single' && existedOnce.has(match)) return match;
    if (!self && title === match) return match;
    const path = findPath(posts, key, match);
    if (!path) return match;
    existedOnce.add(match);
    if (log) {
      console.log(`[hexo-auto-association]:${title} - ${match}`);
    }
    const link = `<a class="${class_name}" href="${url}${path}">${match}</a>`;
    return path ? link : match;
  });
}

function findPath(posts, key, match) {
  const post = posts.find(post => {
    const association = post[key];
    return Array.isArray(association) ? association.includes(match) : association === match;
  });
  return post ? post.path : false;
}

function getAssociations(posts, key) {
  return posts.flatMap(post => post[key])
    .filter(association => typeof association === 'string');
}