import config from '../appConfig.js';

const proxiedFetch = (url, options) => {
  const proxiedURL = config.apiDomain + url;
  return fetch(proxiedURL, options);
}

export default proxiedFetch;