import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as yup from 'yup';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {
  Block,
  Button,
  CustomButton,
  ImageComponent,
  Input,
  Text,
} from '../../../components';
import Header from '../../../components/common/header';
import {t1, t2, t4, w4} from '../../../components/theme/fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {changePasswordRequest, loginRequest} from '../../../redux/action';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoad = useSelector((state) => state.user.login.loading);
  const languageMode = useSelector((state) => state.languageReducer.language);
  const {
    CurrentPassword,
    NewPassword,
    ConfirmNewPassword,
    EnterNewPassword,
    EnterConfirmPassword,
    EnterCurrentPassword,
    BothSamePassword,
    ChangePassword,
  } = languageMode;
  const onSubmit = async (values) => {
    const {new_password, current_password, confirm_password} = values;
    dispatch(
      changePasswordRequest({
        current_password,
        new_password,
        confirm_password,
      }),
    );
  };
  return (
    <Block primary>
      <Header centerText={ChangePassword} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={heightPercentageToDP(20)}
        style={{flexGrow: 1}}>
        <Formik
          initialValues={{
            new_password: '',
            current_password: '',
            confirm_password: '',
          }}
          onSubmit={onSubmit}
          validationSchema={yup.object().shape({
            current_password: yup.string().min(8).required(),
            new_password: yup.string().min(8).required(),
            confirm_password: yup
              .string()
              .when('new_password', {
                is: (val) => (val && val.length > 0 ? true : false),
                then: yup
                  .string()
                  .oneOf(
                    [yup.ref('new_password')],
                    'Both password need to be the same',
                  ),
              })
              .required('Required'),
          })}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            setFieldValue,
            handleSubmit,
            isValid,
            dirty,
          }) => (
            <>
              <CustomButton onPress={Keyboard.dismiss} flex={0.5} primary />
              <Block padding={[0, w4]} flex={0.5}>
                <Text size={23} height={30} semibold>
                  {ChangePassword}
                </Text>
                <Input
                  label={CurrentPassword}
                  placeholder={EnterCurrentPassword}
                  value={values.current_password}
                  onChangeText={handleChange('current_password')}
                  onBlur={() => setFieldTouched('current_password')}
                  error={touched.current_password && errors.current_password}
                />
                <Input
                  value={values.new_password}
                  onChangeText={handleChange('new_password')}
                  onBlur={() => setFieldTouched('new_password')}
                  error={touched.new_password && errors.new_password}
                  label={NewPassword}
                  placeholder={EnterNewPassword}
                  secureTextEntry={true}
                />
                <Input
                  value={values.confirm_password}
                  onChangeText={handleChange('confirm_password')}
                  onBlur={() => setFieldTouched('confirm_password')}
                  error={touched.confirm_password && errors.confirm_password}
                  errorText={
                    touched.confirm_password && errors.confirm_password
                  }
                  label={ConfirmNewPassword}
                  placeholder={EnterConfirmPassword}
                  secureTextEntry={true}
                />

                <Button
                  disabled={!dirty || !isValid}
                  isLoading={isLoad}
                  onPress={handleSubmit}
                  color="secondary">
                  {ChangePassword}
                </Button>
              </Block>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </Block>
  );
};

export default ChangePassword;
