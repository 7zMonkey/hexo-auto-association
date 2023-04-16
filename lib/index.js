// 载入配置文件
module.exports = function (data) {
  const { config, locals } = this;
  const { is_clear_cache } = config.auto_associations;

  if (is_clear_cache) {
    locals.invalidate();
  }

  const posts = locals.get('posts').data;
  data.content = replaceHtmlText(data, posts, config.auto_associations);
  return data;
}

function replaceHtmlText(data, posts, config) {
  const { key, url, self, mode, class_name, log } = config;
  const associations = getAssociations(posts, key);
  if (associations.length === 0) console.log("[hexo-auto-association]: No associations, skip.")
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