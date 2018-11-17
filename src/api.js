import fetch from 'isomorphic-fetch';
import * as R from 'ramda';

// Look for API on the same host but at port :8081


const API = {
  fetchJSON: (url, body, options) => {
    let opts = {...options, method: "POST", accept: 'application/json', credentials: 'include'};
    if (!R.isEmpty(body)) {
      opts.body = JSON.stringify(body);
    }

    let apiCall = fetch(url, opts);
    return apiCall.then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Request rejected was:", url, opts);
      }
    });
  }
};

export default API;
