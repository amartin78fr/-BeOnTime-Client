import React from 'react';
import {combineReducers} from 'redux';
import login from './login/reducer';
import register from './register/reducer';
import profile from './profile/reducer';
import otp from './otp/reducer';

const user = combineReducers({
  login,
  register,
  profile,
  otp,
});
export default user;
