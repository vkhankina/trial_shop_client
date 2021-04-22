import axios from "axios";
import decamelizeKeysDeep from "decamelize-keys-deep";
import camelcaseKeysDeep from "camelcase-keys-deep";
import qs from "qs";

const { REACT_APP_TRIAL_SHOP_API_URL } = process.env;

const defaultConfig = () => ({
  baseURL: `${REACT_APP_TRIAL_SHOP_API_URL}/api/v1/`,
  paramsSerializer: (params) =>
    qs.stringify(decamelizeKeysDeep(params), { arrayFormat: "brackets" }),
  transformRequest: [
    function decamelize(data) {
      return decamelizeKeysDeep(data);
    },
    ...axios.defaults.transformRequest,
  ],
  transformResponse: [
    ...axios.defaults.transformResponse,
    function camelcase(data) {
      return camelcaseKeysDeep(data);
    },
  ],
});

function makeRequest(url, method = "get", config = {}) {
  return axios({
    ...defaultConfig(),
    url,
    method,
    ...config,
  });
}

export default makeRequest;
