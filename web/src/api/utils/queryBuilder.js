export default (apiEndpoint, queryParamsObject)=>{
  const queryString = Object.entries(queryParamsObject)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  const separator = apiEndpoint.includes('?') ? '&' : '?';
  return `${apiEndpoint}${separator}${queryString}`;
}