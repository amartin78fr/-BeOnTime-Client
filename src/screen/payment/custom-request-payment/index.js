/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  Block,
  Button,
  Checkbox,
  CustomButton,
  Input,
  Text,
} from '../../../components';
import Header from '../../../components/common/header';
import * as yup from 'yup';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {t1, t2, t3, w1, w2, w3, w4} from '../../../components/theme/fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {
  strictValidObjectWithKeys,
  strictValidString,
  strictValidStringWithMinLength,
} from '../../../utils/commonUtils';
import {
  getCardType,
  cc_format,
  cc_expires_format,
  getCardColor,
} from '../../../utils/site-specific-common-utils';
import {divider} from '../../../utils/commonView';
// import AlertCompnent from '../../components/AlertCompnent';
import {makePaymentRequest} from '../../../redux/action';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  getCardsRequest,
  makePaymentFlush,
} from '../../../redux/payments/action';
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  TextInput,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import {images} from '../../../assets';

const CustomRequestPayment = () => {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const isLoad = useSelector((state) => state.payment.makePayment.loading);
  const isSuccess = useSelector((state) => state.payment.makePayment.isSuccess);
  const bank = useSelector((state) => state.user.profile.user.data.add_bank);
  const cards = useSelector((state) => state.payment.cards.data);

  const [currentCard, setCurrentCard] = useState({});
  const [visible, setvisible] = useState(false);
  const {params} = useRoute();
  const {id, total_mission_amount} = params;
  // const {id, total_mission_amount} =
  //   strictValidObjectWithKeys(mission) && mission;
  const navigation = useNavigation();

  const [cvv, setcvv] = useState('');
  const languageMode = useSelector((state) => state.languageReducer.language);

  const {
    type,
    PleaseChooseCard,
    PleaseEnterCVV,
    SavedCards,
    FinalPayment,
    CardPayment,
    BankTransfer,
    CardDetails,
    CardHolderName,
    EnterFullName,
    CardNumber,
    DateLanguage,
    CVV,
    SavedCardInfo,
    IbanNum,
    ReceiveNotificationFromAgent,
    MissionRequestSent,
    CheckMissions,
    IncludingVat,
    TotalAmount,
    Finish,
    MakePayment,
  } = languageMode;

  const renderType = (header, content) => {
    return (
      <Block
        margin={[heightPercentageToDP(0.5), 0]}
        row
        flex={false}
        space="between">
        <Text size={16}>{header}</Text>
        <Text grey size={16}>
          {content}
        </Text>
      </Block>
    );
  };
  useEffect(() => {
    dispatch(getCardsRequest());
  }, []);
  useEffect(() => {
    if (isSuccess === true) {
      setvisible(true);
    }
  }, [isSuccess]);
  const onSubmit = (values) => {
    const {cc_number, cc_expiry, cc_cvv} = values;
    const splittedExpiry = cc_expiry.split('/');
    const data = {
      card_number: cc_number.toString().split(' ').join(''),
      exp_month: splittedExpiry[0],
      exp_year: splittedExpiry[1],
      cvc: cc_cvv,
      mission_id: id,
      payment_type: 1,
      save_card: values.terms === true ? 1 : 0,
      name: values.cc_holder,
      type: 'custom',
    };
    dispatch(makePaymentRequest(data));
  };
  const addByBank = () => {
    const IbanData = {
      mission_id: id,
      payment_type: 2,
      type: 'custom',
    };
    dispatch(makePaymentRequest(IbanData));
  };

  const payWithSavedCards = () => {
    if (!strictValidObjectWithKeys(currentCard)) {
      Alert.alert(PleaseChooseCard);
    } else if (!cvv) {
      Alert.alert(PleaseEnterCVV);
    } else {
      const data = {
        card_number: currentCard.card_number,
        exp_month: currentCard.expire_month,
        exp_year: currentCard.expire_year,
        cvc: cvv,
        mission_id: id,
        payment_type: 1,
        name: currentCard.name,
        type: 'custom',
      };
      dispatch(makePaymentRequest(data));
    }
  };

  return (
    <Block primary>
      <Header centerText={FinalPayment} />
      <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={{
          type: 'card',
          cc_number: '',
          cc_holder: '',
          cc_expiry: '',
          cc_cvv: '',
          terms: false,
        }}
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          cc_number: yup
            .string()
            .test('wrong card', (value) => {
              const formattedValue =
                (value && value.toString().split(' ').join('')) || '';
              return strictValidString(getCardType(formattedValue));
            })
            .required(),
          cc_holder: yup.string().required(),
          cc_expiry: yup
            .string()
            .max(5)
            .matches(
              /([0-9]{2})\/([0-9]{2})/,
              'Not a valid expiration date. Example: MM/YY',
            )
            .required('Expiration date is required'),
          cc_cvv: yup.string().min(3).max(4).required(),
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
        }) => {
          const formattedValue =
            (strictValidString(values.cc_number) &&
              values.cc_number.toString().split(' ').join('')) ||
            '';
          const cardType = getCardType(formattedValue);
          const cardImage = getCardColor(cardType);
          return (
            <>
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <Block
                  center
                  middle
                  primary
                  margin={[t2, 0]}
                  color={'#F7F8FA'}
                  borderRadius={30}
                  alignSelf="center"
                  row
                  flex={false}>
                  <CustomButton
                    onPress={() => setFieldValue('type', 'saved')}
                    center
                    middle
                    borderRadius={30}
                    padding={
                      values.type === 'saved'
                        ? [heightPercentageToDP(1.5), widthPercentageToDP(4)]
                        : [0, widthPercentageToDP(4)]
                    }
                    color={values.type === 'saved' ? '#FFFFFF' : '#F7F8FA'}
                    shadow={values.type === 'saved'}
                    margin={[0, w1]}>
                    <Text size={14}>{SavedCards}</Text>
                  </CustomButton>
                  <CustomButton
                    onPress={() => setFieldValue('type', 'card')}
                    center
                    middle
                    borderRadius={30}
                    padding={
                      values.type === 'card'
                        ? [heightPercentageToDP(1.5), widthPercentageToDP(4)]
                        : [0, widthPercentageToDP(4)]
                    }
                    color={values.type === 'card' ? '#FFFFFF' : '#F7F8FA'}
                    shadow={values.type === 'card'}
                    margin={[0, w1]}>
                    <Text size={14}>{CardPayment}</Text>
                  </CustomButton>

                  {bank === 1 && (
                    <CustomButton
                      onPress={() => setFieldValue('type', 'bank')}
                      center
                      middle
                      borderRadius={20}
                      padding={
                        values.type === 'bank'
                          ? [heightPercentageToDP(1.5), widthPercentageToDP(4)]
                          : [0, widthPercentageToDP(4)]
                      }
                      color={values.type === 'bank' ? '#FFFFFF' : '#F7F8FA'}
                      shadow={values.type === 'bank'}>
                      <Text size={14} semibold>
                        {BankTransfer}
                      </Text>
                    </CustomButton>
                  )}
                </Block>
                {values.type === 'card' ? (
                  <Block flex={false} padding={[0, w4]}>
                    <Text margin={[t1, 0, 0]}>{CardDetails}</Text>
                    <Input
                      label={CardHolderName}
                      placeholder={EnterFullName}
                      value={values.cc_holder}
                      onChangeText={handleChange('cc_holder')}
                      onBlur={() => setFieldTouched('cc_holder')}
                      error={touched.cc_holder && errors.cc_holder}
                    />
                    <Block row space={'between'} flex={false}>
                      <Input
                        style={{width: widthPercentageToDP(50)}}
                        label={CardNumber}
                        placeholder="0000-0000-0000-0000"
                        value={values.cc_number}
                        number
                        selectTextOnFocus={
                          !strictValidStringWithMinLength(values.id)
                        }
                        onChangeText={(e) => {
                          const CCFormatted = cc_format(e);
                          setFieldValue('cc_number', CCFormatted);
                        }}
                        maxLength={19}
                        onBlur={() => setFieldTouched('cc_number')}
                        error={touched.cc_number && errors.cc_number}
                        rightLabel={cardImage}
                      />
                      <Input
                        style={{width: widthPercentageToDP(15)}}
                        maxLength={5}
                        label={DateLanguage}
                        placeholder="00/00"
                        number
                        value={values.cc_expiry}
                        onChangeText={(e) => {
                          const CCFormatted = cc_expires_format(e);
                          setFieldValue('cc_expiry', CCFormatted);
                        }}
                        onBlur={() => {
                          setFieldTouched('cc_expiry');
                        }}
                        error={touched.cc_expiry && errors.cc_expiry}
                      />
                      <Input
                        style={{width: widthPercentageToDP(12)}}
                        maxLength={3}
                        label={CVV}
                        placeholder="000"
                        type="number"
                        number
                        secureTextEntry
                        value={values.cc_cvv}
                        onChangeText={handleChange('cc_cvv')}
                        onBlur={() => setFieldTouched('cc_cvv')}
                        error={touched.cc_expiry && errors.cc_expiry}
                      />
                    </Block>
                    <Block margin={[t1, 0]} row center>
                      <Checkbox
                        onChange={() => setFieldValue('terms', !values.terms)}
                        checkboxStyle={{height: 25, width: 25}}
                        label=""
                        checked={values.terms}
                      />
                      <Text size={12}>{SavedCardInfo}</Text>
                    </Block>
                  </Block>
                ) : values.type === 'saved' ? (
                  <FlatList
                    data={cards}
                    renderItem={({item}) => {
                      const cardName = getCardType(item.card_number);
                      return (
                        <CustomButton
                          activeOpacity={1}
                          flex={false}
                          border={10}
                          center
                          onPress={() => {
                            setCurrentCard(item);
                            setcvv('');
                          }}
                          color="transparent"
                          margin={[0, widthPercentageToDP(2), 0, 0]}>
                          <ImageBackground
                            imageStyle={{borderRadius: 10}}
                            source={images.defaultCardBg}
                            style={
                              item.id === currentCard.id
                                ? {
                                    transform: [{scale: 1}],
                                    height: heightPercentageToDP(22),
                                    width: widthPercentageToDP(95),
                                    padding: heightPercentageToDP(1.2),
                                    // marginBottom: heightPercentageToDP(1),
                                  }
                                : {
                                    transform: [{scale: 0.95}],
                                    height: heightPercentageToDP(22),
                                    width: widthPercentageToDP(95),
                                    padding: heightPercentageToDP(1.2),
                                  }
                            }>
                            <Block
                              space="between"
                              color="transparent"
                              row
                              style={{height: heightPercentageToDP(8)}}
                              margin={[heightPercentageToDP(1.5), 0, 0, 0]}
                              flex={false}>
                              <Text white bold>
                                {cardName}
                              </Text>
                              <Text white bold>
                                {item.id === currentCard.id ? 'Selected' : ''}
                              </Text>
                            </Block>
                            <Block
                              padding={[heightPercentageToDP(1), 0]}
                              color="transparent">
                              <Block
                                flex={false}
                                color="transparent"
                                space="between"
                                row>
                                <Text white header semibold>
                                  {cc_format(item.card_number).replace(
                                    /\d{4}(?= \d{4})/g,
                                    'xxxx',
                                  )}
                                </Text>
                                <Text white header semibold>
                                  {`${item.expire_month}/${item.expire_year}`}
                                </Text>
                              </Block>
                              <Block
                                margin={[heightPercentageToDP(1), 0, 0, 0]}
                                flex={false}
                                color="transparent"
                                space="between"
                                center
                                row>
                                <Text white header semibold>
                                  {item.name}
                                </Text>
                                <TextInput
                                  // transparent
                                  style={{
                                    width: widthPercentageToDP(12),
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#fff',
                                    padding: heightPercentageToDP(1),
                                    color: '#fff',
                                  }}
                                  maxLength={3}
                                  keyboardType="number-pad"
                                  placeholder="CVV"
                                  secureTextEntry
                                  editable={item.id === currentCard.id}
                                  value={item.id === currentCard.id && cvv}
                                  onChangeText={(e) =>
                                    item.id === currentCard.id && setcvv(e)
                                  }
                                  placeholderTextColor="#fff"
                                />
                              </Block>
                            </Block>
                          </ImageBackground>
                        </CustomButton>
                      );
                    }}
                  />
                ) : (
                  <Block flex={false} padding={[0, w4]}>
                    <Text size={12} grey>
                      {IbanNum}
                    </Text>
                    <Text height={40} semibold size={22}>
                      FR76 1287900 0199 1294 8300 103
                    </Text>
                    <Block flex={false} margin={[t1, 0]}>
                      {renderType('Code BANQUE', '12879')}
                      {renderType('Numero de COMPTE', '99129483001')}
                      {renderType('Code GUICHET', '00001')}
                      {renderType('Code BIC', 'DELUFR22XXXX')}
                      {renderType('Domiciliation', 'FRANCE')}
                    </Block>
                    {divider()}
                    {renderType('Titulare de compte', 'BE ON TIME SAS')}
                    {renderType('', '13 rue Washington')}
                    {renderType('', '75008 Paris')}
                    {renderType('', 'France')}
                  </Block>
                )}
              </KeyboardAwareScrollView>

              <Modal
                style={styles.modalStyle}
                isVisible={visible}
                onBackdropPress={() => setvisible(false)}>
                <View style={styles.modalView}>
                  <Text semibold style={styles.modalText}>
                    {MissionRequestSent}
                  </Text>
                  <Text style={styles.textStyle} center>
                    {ReceiveNotificationFromAgent}
                  </Text>
                  <Button
                    isLoading={isLoad}
                    style={styles.button}
                    onPress={() => {
                      navigation.navigate('Missions');
                      setvisible(false);
                      dispatch(makePaymentFlush());
                    }}
                    color="secondary">
                    {CheckMissions}
                  </Button>
                </View>
              </Modal>
              <Block
                row
                space="between"
                center
                flex={false}
                padding={[t2]}
                borderWidth={[1, 0, 0, 0]}
                borderColorDeafult>
                <Block flex={false}>
                  <Text semibold>{TotalAmount}</Text>
                  <Text margin={[heightPercentageToDP(0.5), 0]} grey size={16}>
                    {IncludingVat}
                  </Text>
                </Block>
                <Text size={40} bold>
                  {type === 'en'
                    ? `€${total_mission_amount}`
                    : `${total_mission_amount}€`}
                </Text>
              </Block>
              <Block flex={false} padding={[0, w4, t2]}>
                <Button
                  isLoading={isLoad}
                  disabled={!dirty}
                  onPress={() => {
                    switch (values.type) {
                      case 'card':
                        return handleSubmit();
                      case 'saved':
                        return payWithSavedCards();
                      case 'bank':
                        return addByBank();
                    }
                  }}
                  color="secondary">
                  {values.type === 'card' || values.type === 'saved'
                    ? MakePayment
                    : Finish}
                </Button>
              </Block>
            </>
          );
        }}
      </Formik>
    </Block>
  );
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

export default CustomRequestPayment;
