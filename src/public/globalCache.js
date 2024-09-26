const globalCache = {};

const setCache = (key, data) => {
  globalCache[key] = data;
};

const getCache = (key) => {
  return globalCache[key];
};

const clearCache = (key) => {
  delete globalCache[key];
};

export { setCache, getCache, clearCache };
