import React, {useState} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import {Block, Button, CustomButton, Input, Text} from '../../../components';
import Header from '../../../components/common/header';
import {light} from '../../../components/theme/colors';
import {t1, w4} from '../../../components/theme/fontsize';

import {Alerts} from '../../../utils/commonUtils';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {config} from '../../../utils/config';
import {useNavigation} from '@react-navigation/core';
import {useSelector} from 'react-redux';
const Forgot = () => {
  const [loader, setloader] = useState(false);
  const {goBack} = useNavigation();
  const languageMode = useSelector((state) => state.languageReducer.language);

  const {
    SentResetEmail,
    EmailAddress,
    ResetInstructions,
    EmailSent,
    EnterEmail,
    ForgotPassword,
    EmailInbox,
    ErrorHeader,
    CorrectEmail,
  } = languageMode;
  const onSubmit = async (values) => {
    setloader(true);
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axios({
      method: 'post',
      url: `${config.Api_Url}/forgot-password`,
      headers,
      data: {
        email: values.email,
      },
    });
    if (response.data.status === 1) {
      setloader(false);
      Alerts(EmailSent, EmailInbox, light.success);
      goBack();
    } else {
      setloader(false);
      Alerts(ErrorHeader, CorrectEmail, light.danger);
    }
  };
  return (
    <Block primary>
      <Header centerText={ForgotPassword} />
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          email: yup.string().email().required(),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          handleSubmit,
          isValid,
          dirty,
        }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flexGrow: 1}}>
            <CustomButton onPress={Keyboard.dismiss} flex={0.7} primary />
            <Block padding={[0, w4]} flex={0.2}>
              <Text size={20} height={30} semibold>
                {EnterEmail}
              </Text>
              <Text margin={[t1, 0]} grey size={14}>
                {ResetInstructions}
              </Text>
              <Input
                label={EmailAddress}
                placeholder={EnterEmail}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                error={touched.email && errors.email}
              />
              <Button
                isLoading={loader}
                disabled={!isValid || !dirty}
                onPress={handleSubmit}
                color="secondary">
                {SentResetEmail}
              </Button>
            </Block>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </Block>
  );
};

export default Forgot;
