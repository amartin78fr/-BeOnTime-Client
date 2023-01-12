import {Formik} from 'formik';
import React, {useState, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {images} from '../../../assets';
import {
  Block,
  CustomButton,
  Input,
  Text,
  ImageComponent,
  Checkbox,
  Button,
} from '../../../components';
import Header from '../../../components/common/header';
import {
  t1,
  t2,
  t3,
  t4,
  w1,
  w2,
  w3,
  w4,
} from '../../../components/theme/fontsize';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {
  loginRequest,
  registerFlush,
  registerRequest,
} from '../../../redux/action';
import GooglePlacesTextInput from '../../../components/googlePlaces';
import Modal from 'react-native-modal';
import {openUrl, UPLOAD} from '../../../utils/site-specific-common-utils';
import {strictValidObjectWithKeys} from '../../../utils/commonUtils';

const Signup = () => {
  const formikRef = useRef(null);
  const loading = useSelector((state) => state.user.register.loading);
  const isLoad = useSelector((state) => state.user.login.loading);
  const isSuccess = useSelector((state) => state.user.register.isSuccess);
  const dispatch = useDispatch();
  const [imageVal, setimage] = useState({});
  const [ProfileImage, setProfileImage] = useState(null);

  const languageMode = useSelector((state) => state.languageReducer.language);
  const {
    MandatoryFields,
    EmailAddress,
    PhoneNumber,
    FirstName,
    LastName,
    EnterFirstName,
    EnterPhoneNumber,
    EnterLastName,
    Getstarted,
    UploadDocument,
    EnterEmail,
    AgentTypeHeader,
    SelectAgentType,
    IdentityCard,
    cvv,
    SocialSecurityNumber,
    IBANInfo,
    CNAPSNum,
    EnterIBANInfo,
    EnterCNAPSNum,
    HomeAddress,
    PossessVehicle,
    WorkLocation,
    EnterHomeAddress,
    Ok,
    WelcomeBeOnTime,
    RegistrationSuccess,
    Yes,
    No,
    SubContractor,
    FinishRegistration,
    Iaccept,
    PrivacyPolicy,
    TermsConditions,
    CompanyName,
    EnterCompanyName,
    PleaseUploadACV,
    PleaseUploadICV,
    PleaseUploadSSN,
    PleaseEnterFirstName,
    PleaseEnterLastName,
    EnterValidEmail,
    PleaseEnterEmail,
    PleaseEnterPhoneNumber,
    PleaseAcceptTerms,
    PleaseAcceptPrivacy,
    PleaseEnterCompanyName,
    SearchForAgent,
    WelcomeToBeOnTime,
    Password,
    EnterPassword,
    ConfirmPassword,
    AreYouIndCom,
    Company,
    Individual,
    type,
  } = languageMode;
  const languageValue = type;
  const [modal, setmodal] = useState(false);
  const [userProfileDetails, setUserDetails] = useState({
    profileImage: '',
    uploading: false,
    profileData: '',
  });
  const {uploading} = userProfileDetails;

  useEffect(() => {
    if (isSuccess) {
      setmodal(true);
    }
  }, [isSuccess]);

  const uploadPhoto = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async (image) => {
      setUserDetails({
        ...userProfileDetails,
        uploading: true,
      });
      const uri = image.path;
      const uriParts = uri.split('.');
      const filename = uriParts[uriParts.length - 1];
      setUserDetails({
        ...userProfileDetails,
        uploading: true,
      });
      setProfileImage(Platform.OS === 'ios' ? image.sourceURL : image.path);

      const res = await UPLOAD(
        '',
        image.filename ? image.filename : `photo.${filename}`,
        Platform.OS === 'ios'
          ? image.sourceURL
          : image.path.replace('file://', ''),
        image.mime,
        '',
      );
      if (res) {
        setUserDetails({
          ...userProfileDetails,
          uploading: false,
        });
        setimage(JSON.parse(res.data));
      }
    });
  };
  const renderProfileImagePath = () => {
    if (ProfileImage) {
      return {uri: ProfileImage};
    }

    return images.default_profile_icon;
  };
  const renderProfileImage = () => {
    if (uploading) {
      return (
        <ActivityIndicator size="large" color="#000" style={LoaderStyle} />
      );
    }
    if (!uploading) {
      return (
        <>
          <ImageBackground
            source={renderProfileImagePath()}
            imageStyle={{borderRadius: 80}}
            style={BackgroundStyle}>
            <TouchableOpacity onPress={() => uploadPhoto()}>
              <ImageComponent name="plus_icon" height="55" width="55" />
            </TouchableOpacity>
          </ImageBackground>
        </>
      );
    }
  };
  const onLogin = async () => {
    // setmodal(true);
    if (formikRef.current) {
      const {email, password} = formikRef.current.values;
      await dispatch(
        loginRequest({
          email: email,
          password: password,
          role_id: 1,
          language: type,
        }),
      );
      dispatch(registerFlush());
      setmodal(false);
    }
  };
  const onSubmit = (values) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      type,
      password,
      company,
      terms,
      privacy,
    } = values;
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      home_address: address,
      customer_type: type === 'company' ? 2 : 1,
      password: password,
      company_name: company,
      terms_conditions: terms === true ? 1 : 0,
      privacy_policy: privacy === true ? 1 : 0,
      image: strictValidObjectWithKeys(imageVal) ? imageVal.value : '',
      language: languageValue,
    };

    dispatch(registerRequest(data));
  };
  return (
    <Block primary>
      <Header centerText="Get Started" />
      <Block padding={[t1, 0]} flex={false} color="#000">
        <Text uppercase white size={14} semibold center>
          {MandatoryFields}
        </Text>
      </Block>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{paddingBottom: t4}}>
        {renderProfileImage()}
        <Formik
          innerRef={formikRef}
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirm_password: '',
            address: '',
            company: '',
            type: 'individual',
            privacy: false,
            terms: false,
          }}
          onSubmit={onSubmit}
          validationSchema={yup.object().shape({
            firstName: yup.string().min(1).required(),
            lastName: yup.string().min(1).required(),
            email: yup.string().email().required(),
            phone: yup.string().min(10).required(),
            password: yup.string().min(8).required(),
            address: yup.string().min(3).required(),
            terms: yup.bool().oneOf([true], PleaseAcceptTerms),
            privacy: yup.bool().oneOf([true], PleaseAcceptPrivacy),
            confirm_password: yup
              .string()
              .when('password', {
                is: (val) => (val && val.length > 0 ? true : false),
                then: yup
                  .string()
                  .oneOf(
                    [yup.ref('password')],
                    'Both password need to be the same',
                  ),
              })
              .required(),
          })}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            setFieldValue,
            handleSubmit,
            dirty,
            isValid,
          }) => (
            <>
              <Block flex={false} padding={[0, w3]}>
                <Input
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={() => setFieldTouched('firstName')}
                  error={touched.firstName && errors.firstName}
                  label={FirstName}
                  placeholder={EnterFirstName}
                />
                <Input
                  label={LastName}
                  placeholder={EnterLastName}
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={() => setFieldTouched('lastName')}
                  error={touched.lastName && errors.lastName}
                />
                <Input
                  label={EmailAddress}
                  placeholder={EnterEmail}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  error={touched.email && errors.email}
                  email
                />
                <Input
                  label={PhoneNumber}
                  placeholder={EnterPhoneNumber}
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={() => setFieldTouched('phone')}
                  error={touched.phone && errors.phone}
                  number
                />
                <Input
                  label={Password}
                  placeholder={EnterPassword}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  error={touched.password && errors.password}
                  secureTextEntry={true}
                />
                <Input
                  label={ConfirmPassword}
                  placeholder={ConfirmPassword}
                  value={values.confirm_password}
                  onChangeText={handleChange('confirm_password')}
                  onBlur={() => setFieldTouched('confirm_password')}
                  error={touched.confirm_password && errors.confirm_password}
                  secureTextEntry={true}
                />
                <View style={{marginTop: t1}}>
                  <GooglePlacesTextInput
                    placeholder={EnterHomeAddress}
                    label={HomeAddress}
                    value={values.address}
                    onPress={(data, details) => {
                      const latlng = details.geometry.location;
                      const description = data.description;
                      setFieldValue('address', description);
                    }}
                    error={touched.address && errors.address}
                    textInputProps={{
                      placeholderTextColor: '#8A8E99',
                      onblur: () => setFieldTouched('address'),
                      value: values.address,
                      onChangeText: handleChange('address'),
                    }}
                  />
                </View>
              </Block>
              <Block
                center
                margin={[heightPercentageToDP(2), w3, heightPercentageToDP(1)]}
                row
                flex={false}>
                <Text
                  size={16}
                  style={{width: widthPercentageToDP(45)}}
                  regular>
                  {AreYouIndCom}
                </Text>

                <Block
                  primary
                  padding={[t1]}
                  margin={[0, w4]}
                  color={'#F7F8FA'}
                  borderRadius={30}
                  row
                  flex={false}>
                  <CustomButton
                    onPress={() => setFieldValue('type', 'individual')}
                    center
                    middle
                    borderRadius={30}
                    padding={
                      values.type === 'individual'
                        ? [heightPercentageToDP(1.5)]
                        : [0, heightPercentageToDP(1.5)]
                    }
                    color={values.type === 'individual' ? '#FFFFFF' : '#F7F8FA'}
                    shadow={values.type === 'individual'}
                    margin={[0, w1]}>
                    <Text size={14} semibold>
                      {Individual}
                    </Text>
                  </CustomButton>
                  <CustomButton
                    onPress={() => setFieldValue('type', 'company')}
                    center
                    middle
                    borderRadius={20}
                    padding={
                      values.type === 'company'
                        ? [heightPercentageToDP(1.5)]
                        : [
                            0,
                            widthPercentageToDP(1.5),
                            0,
                            widthPercentageToDP(1.5),
                          ]
                    }
                    color={values.type === 'company' ? '#FFFFFF' : '#F7F8FA'}
                    shadow={values.type === 'company'}>
                    <Text size={14} semibold>
                      {Company}
                    </Text>
                  </CustomButton>
                </Block>
              </Block>
              <Block flex={false} padding={[0, w3]}>
                {values.type === 'company' && (
                  <Input
                    label={CompanyName}
                    placeholder={EnterCompanyName}
                    value={values.company}
                    onChangeText={handleChange('company')}
                    onBlur={() => setFieldTouched('company')}
                    error={touched.company && errors.company}
                  />
                )}
                <Block row center>
                  <Checkbox
                    onChange={() => setFieldValue('privacy', !values.privacy)}
                    checkboxStyle={{height: 25, width: 25}}
                    label=""
                    checked={values.privacy}
                  />
                  <Text size={16}>
                    {Iaccept}{' '}
                    <Text
                      onPress={() =>
                        openUrl('https://beontime.io/privacy-policy')
                      }
                      style={{textDecorationLine: 'underline'}}
                      size={16}>
                      {PrivacyPolicy}
                    </Text>
                  </Text>
                </Block>
                <Block margin={[t1, 0]} row center>
                  <Checkbox
                    onChange={() => setFieldValue('terms', !values.terms)}
                    checkboxStyle={{height: 25, width: 25}}
                    label=""
                    checked={values.terms}
                  />
                  <Text size={16}>
                    {Iaccept}{' '}
                    <Text
                      onPress={() =>
                        openUrl(
                          'https://beontime.io/general-terms-and-conditions',
                        )
                      }
                      style={{textDecorationLine: 'underline'}}
                      size={16}>
                      {TermsConditions}
                    </Text>
                  </Text>
                </Block>
                <Button
                  disabled={!isValid || !dirty}
                  isLoading={loading}
                  onPress={handleSubmit}
                  style={{marginTop: t2}}
                  color="secondary">
                  {FinishRegistration}
                </Button>
              </Block>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      <Modal
        style={styles.modalStyle}
        isVisible={modal}
        onBackdropPress={() => setmodal(false)}>
        <View style={styles.modalView}>
          <Text semibold style={styles.modalText}>
            {RegistrationSuccess}
          </Text>
          <Text style={styles.textStyle} center>
            {WelcomeToBeOnTime}
          </Text>
          <Button
            isLoading={isLoad}
            style={styles.button}
            onPress={() => onLogin()}
            color="secondary">
            {SearchForAgent}
          </Button>
        </View>
      </Modal>
    </Block>
  );
};
const BackgroundStyle = {
  height: 120,
  width: 120,
  alignSelf: 'center',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  marginVertical: heightPercentageToDP(2),
};
const LoaderStyle = {
  height: 120,
  width: 120,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: heightPercentageToDP(2),
};
const styles = StyleSheet.create({
  modalView: {
    paddingVertical: t3,
    paddingHorizontal: w2,
    marginHorizontal: widthPercentageToDP(10),
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    width: widthPercentageToDP(70),
    alignSelf: 'center',
    marginTop: heightPercentageToDP(2),
  },
  textStyle: {
    width: widthPercentageToDP(75),
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalStyle: {margin: 0, paddingVertical: heightPercentageToDP(2)},
});
export default Signup;
