import config from "../../config"

const {baseURL} = config

export default (end_point, data, method, uploadCallback=null)=> {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    const url = `${baseURL}${end_point}`
    xhr.open(method, url, true);
    xhr.upload.onprogress = uploadCallback;
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = function() {
      reject(xhr.statusText);
    };
    xhr.send(data);
  });
}