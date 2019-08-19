import axIos from 'axios';
import { Toast } from 'vant';
axIos.defaults.timeout = 10000;
import * as appApi from '../appApi';
import router from '../router';
import VueCookies from 'vue-cookie';
axIos.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
// axIos.defaults.baseURL = 'http://192.168.102.217:8080/fgold-api/'; /*陈明金*/
// axIos.defaults.baseURL = 'http://192.168.102.29:8080/fgold-api/';  /*Ben*/
// axIos.defaults.baseURL = 'http://172.16.0.247:8080/fgold-api/'; /*测试*/
axIos.defaults.baseURL = 'http://lodev.hsfinance.cn/fgold-api/'; /*测试*/
// axIos.defaults.baseURL = 'https://fj.shangaofangjin.com/fgold-api/'; /*生-产*/

// /*是否有请求正在刷新token*/
// window.isRefreshing = false;
// let _token = '';
// /*被挂起的请求数组*/
// let refreshSubscribers = [];
//
// function subscribeTokenRefresh (cb) {
//   refreshSubscribers.push(cb )
// }
//
// function onRrefreshed (token) {
//   refreshSubscribers.map(cb => cb(token))
// }
//
// axIos.interceptors.request.use(
//   config => {
//     if(VueCookies.get('token')) {
//       if(!window.isRefreshing) {
//         window.isRefreshing = true;
//         appApi.refreshToken({
//           uid: VueCookies.get('uid'),
//           token: VueCookies.get('token'),
//         }).then(res => {
//           window.isRefreshing = false;
//           if(res.code === '1') {
//             if(res.data.token !== '') {
//               _token = res.data.token;
//               if(VueCookies.get('token') !== _token) {
//                 VueCookies.delete('token');
//                 VueCookies.delete('uid');
//                 VueCookies.delete('isAuth');
//                 VueCookies.delete('ewm_path');
//                 VueCookies.delete('userPhone');
//                 VueCookies.delete('inventNum');
//                 router.push({
//                   name: 'homePage'
//                 });
//               } else {
//                 VueCookies.set('token', res.data.token);
//               }
//             }
//             /*执行数组里的函数,重新发起被挂起的请求*/
//             onRrefreshed(res.data.token);
//             /*执行onRefreshed函数后清空数组中保存的请求*/
//             refreshSubscribers = []
//           } else if(res.code === '-4') {
//             VueCookies.delete('token');
//             VueCookies.delete('uid');
//             VueCookies.delete('isAuth');
//             VueCookies.delete('ewm_path');
//             VueCookies.delete('userPhone');
//             VueCookies.delete('inventNum');
//             router.push({
//               name: 'homePage'
//             });
//           }
//         });
//
//         /*把请求(token)=>{....}都push到一个数组中*/
//         let retry = new Promise((resolve, reject) => {
//           subscribeTokenRefresh((token) => {
//             config.headers.token = VueCookies.get('token');
//             /*将请求挂起*/
//             resolve(config)
//           })
//         });
//         return retry
//       }
//
//       return config
//     }else {
//       return config
//     }
//
//   },
//   err => {
//     return Promise.reject(err)
//   }
// );

export default {
  fetchGet(url, params = {}) {
    let fetchGetPromise = new Promise((resolve, reject) => {
      axIos
        .get(url, { params })
        .then(res => {
          if (res.data.code === 1003) {
            window.location.href = '/';
            console.log('用户未登录');
          } else {
            resolve(res.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
    return fetchGetPromise.catch(err => {
      // console.log(err)
      if (err.code === '-1') {
        Toast({
          duration: 2000,
          message: '登录失效，请重新登录'
        });

      } else {
        Toast({
          duration: 2000,
          message: '您的网络好像不太给力，请稍后重试'
        });
      }
      return Promise.reject(err);
    });
  },
  fetchQuickSearch(url) {
    let fetchQuickSearchPromise = new Promise((resolve, reject) => {
      axIos
        .get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
    return fetchQuickSearchPromise.catch(err => {
      // console.log(err)
      if (err.code === '-1') {
        Toast({
          duration: 2000,
          message: '登录失效，请重新登录'
        });
      } else {
        Toast({
          duration: 2000,
          message: '您的网络好像不太给力，请稍后重试'
        });
      }
      return Promise.reject(err);
    });
  },
  fetchPost(url, params = {}, uToken) {
    let fetchPostPromise = new Promise((resolve, reject) => {
      axIos.post(url, params, {
        timeout: 0,
        headers: {'Content-Type': 'application/json; charset=UTF-8', token: uToken ? uToken : ''}
      }).then(res => {
        if(url === '/register') {
          resolve(res.data);
          return;
        }
        if(res.data.code === '0') {
          if(res.data.data && Object.getOwnPropertyNames(res.data.data).length !== 0 && res.data.data['respMsg']) {
            Toast({
              message: res.data.data['respMsg']
            });
          } else {
            Toast({
              duration: 3000,
              message: res.data.msg
            });
          }
        }else if(res.data.code === '-1') {
          VueCookies.delete('token');
          VueCookies.delete('uid');
          VueCookies.delete('isAuth');
          VueCookies.delete('ewm_path');
          VueCookies.delete('userPhone');
          VueCookies.delete('inventNum');
          router.push({
            name: 'homePage'
          });
        }else if(res.data.code === '-9'){
          Toast({
            duration: 2000,
            message: '登录失效，请重新登录'
          });
          VueCookies.delete('token');
          VueCookies.delete('uid');
          VueCookies.delete('isAuth');
          VueCookies.delete('ewm_path');
          VueCookies.delete('userPhone');
          VueCookies.delete('inventNum');
          router.push('loginRegister');
        } else {
          resolve(res.data);
        }
      }).catch(error => {
        reject(error);
      });
    });
    return fetchPostPromise.catch(err => {
      // console.log(err)
      if (err.code === '-9') {
        Toast({
          duration: 2000,
          message: '登录失效，请重新登录'
        });
        VueCookies.delete('token');
        VueCookies.delete('uid');
        VueCookies.delete('isAuth');
        VueCookies.delete('ewm_path');
        VueCookies.delete('userPhone');
        VueCookies.delete('inventNum');
      } else {
        Toast({
          duration: 2000,
          message: '您的网络好像不太给力，请稍后重试'
        });
      }
      return Promise.reject(err);
    });
  },
  fetchPostUpload(url, params = {}, uToken) {
    let fetchPostUploadPromise = new Promise((resolve, reject) => {
      axIos
        .post(url, params, {
          timeout: 0,
          headers: {
            'Content-Type': 'multipart/form-data; charset=UTF-8',
            token: uToken ? uToken : ''
          }
        })
        .then(res => {
          if (res.data.code === '0') {
            Toast({
              duration: 2000,
              message: res.data.msg
            });
          } else {
            resolve(res.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
    return fetchPostUploadPromise.catch(err => {
      // console.log(err)
      if (err.code === '-1') {
        Toast({
          duration: 2000,
          message: '登录失效，请重新登录'
        });
      } else {
        Toast({
          duration: 2000,
          message: '您的网络好像不太给力，请稍后重试'
        });
      }
      return Promise.reject(err);
    });
  },
  request(options) {
    options.method = 'post';
    options.transformRequest = [
      function(data) {
        let ret = '';
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        }
        return ret;
      }
    ];
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      token: options.token || ''
    };

    return axIos(options)
      .then(response => {
        const { statusText, status, data } = response;
        let result = {};
        if (typeof data === 'object') {
          result = data;
          if (Array.isArray(data)) {
            result.list = data;
          }
        } else {
          result.data = data;
        }
        return Promise.resolve({
          success: true,
          message: statusText,
          statusCode: status,
          ...result
        });
      })
      .catch(error => {
        const { response, message, code, config, request } = error;

        if (String(message) === 'timeout of 5000ms exceeded') {
          return Promise.resolve({
            success: false,
            statusCode,
            message: '连接超时'
          });
        }
        let msg;
        let statusCode;

        if (response && response instanceof Object) {
          const { data, statusText } = response;
          statusCode = response.status;
          msg = data.message || statusText;
        } else {
          statusCode = 600;
          msg = error.message || '网络错误';
        }
        /* eslint-disable */
        return Promise.resolve({
          success: false,
          statusCode,
          message: msg
        });
      });
  }
};
