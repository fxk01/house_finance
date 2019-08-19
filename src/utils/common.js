export const mixin = {
  data() {
    return {
      codeDisabled: false,
      countdown: 120,
      codeMsg: '获取验证码',
      timer: null
    }
  },
  methods: {
    /*
     发送验证码
     */
    sendVerificationCode() {
      this.codeDisabled = true;
      this.timer = setInterval(() => {
        if (this.countdown > 0 && this.countdown <= 120) {
          this.countdown--;
          if (this.countdown !== 0) {
            this.codeMsg = '重新发送(' + this.countdown + ')';
          } else {
            clearInterval(this.timer);
            this.codeMsg = '获取验证码';
            this.countdown = 120;
            this.timer = null;
            this.codeDisabled = false;
          }
        }
      }, 1000)
    },
    deBounce(fn, delay) {
      let args = arguments,
        context = this,
        timer = null;

      return function () {
        if (timer) {
          clearTimeout(timer);
          timer = setTimeout(function () {
            fn.apply(context, args);
          }, delay);
        } else {
          timer = setTimeout(function () {
            fn.apply(context, args);
          }, delay);
        }
      }
    },
    isOwnEmpty(obj) {
      for(let name in obj) {
        if(obj.hasOwnProperty(name)) {
          return false;
        }
      }
      return true;
    },
    parseURL(name, url) {
      // urlParameter, locationUrl
      // let _url = locationUrl ? locationUrl.split('?')[1] : window.location.href.split('?')[1];
      // console.log(window.location.href.split('?'))
      // if(_url.indexOf('from=singlemessage') >= 0 || _url.indexOf('from=groupmessage') >= 0) {
      //   _url = window.location.href.split('?')[2];
      // }
      // if (_url !== undefined) {
      //   let _index;
      //   let _arr = _url.split('&');
      //   for (let i = 0, _len = _arr.length; i < _len; i++) {
      //     if (_arr[i].indexOf(urlParameter + '=') >= 0) {
      //       _index = i;
      //       break;
      //     } else {
      //       _index = -1;
      //     }
      //   }
      //   if (_index >= 0) {
      //     let _key = _arr[_index].split('=')[1];
      //     return _key;
      //   }
      // }
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
      const results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return " ";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    fmtDate(obj) {
      let now = new Date(obj),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
    },
    isPc(dom) {
      let scrollHg;
      if(document.getElementsByClassName('hed-top').length !== 0) {
        scrollHg = window.screen.height - document.getElementsByClassName('hed-top')[0].offsetHeight - document.getElementsByClassName(dom)[0].offsetHeight;
        return scrollHg + 'px'
      } else {
        scrollHg = window.screen.height - document.getElementsByClassName(dom)[0].offsetHeight - 95 - 31;
        return scrollHg + 'px'
      }

      // let nu = navigator.userAgent.toLowerCase();
      // let isWechat = nu.indexOf('micromessenger') != -1;
      // if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) && !isWechat) {
      //   return true;
      // } else if(isWechat) {
      //   return false;
      // } else {
      //   return true;
      // }
    }
  }
};
