import {
  SEND_YZM,
  LOGIN_DATA,
} from './mutation-type';
import * as registerApi from '../page/LoginRegister/Register/registerApi';

export const actions = {
  [SEND_YZM](context, data) {
    return new Promise((resolve, reject) => {
      registerApi.sendSms(data).then(res => {
        context.commit('sendCodeFormation', res);
        resolve();
      });
    })
  },
  [LOGIN_DATA](context, data) {

  },
};
