import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  Block,
  Button,
  CustomButton,
  ImageComponent,
  Input,
  Text,
} from '../../components';
import Header from '../../components/common/header';
import {t1, t2, t3, t4, w1, w2, w3, w4} from '../../components/theme/fontsize';
import * as yup from 'yup';
import {Modalize} from 'react-native-modalize';
import MissionType from './components/mission-type';
import AgentType from './components/agent-type';
import NumberOfHours from './components/hours';
import ChooseDateTime from './components/choosedatetime';
import {useDispatch, useSelector} from 'react-redux';
import {searchAgentsRequest} from '../../redux/action';
import moment from 'moment';
import GooglePlacesTextInput from '../../components/googlePlaces';
import {Keyboard, View, StyleSheet} from 'react-native';
import MissionFinishHours from './components/missionHours';
import RepetitiveType from './components/repetitive';
import {count72, count24} from '../../utils/data';
import NumberOfAgents from './components/num-agents';
import AgentDetails from './components/agent-details';
import MissionDetails from './components/mission-details';
import Modal from 'react-native-modal';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {config} from '../../utils/config';
import {useNavigation} from '@react-navigation/native';
import {Alerts} from '../../utils/commonUtils';
import {light} from '../../components/theme/colors';

const CreateMission = () => {
  const formikRef = useRef();
  const modalizeRef = useRef();
  const dispatch = useDispatch();
  const [action, setAction] = useState('');
  const [modal, setmodal] = useState(false);
  const isLoad = useSelector((state) => state.agents.searchAgentList.loading);
  const navigation = useNavigation();
  const [modalAction, setModalAction] = useState('');
  const [loading, setloading] = useState(false);
  var CurrentDate = moment().format('YYYY-MM-DD HH:mm:ss');

  const callCustomRequest = async (data) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    };
    const res = await axios({
      method: 'post',
      url: `${config.Api_Url}/customer/mission-request`,
      headers,
      data: data,
    });
    if (res.data.status === 1) {
      openModal('success');
      setloading(false);
    } else {
      Alerts('Error', res.data.message, light.danger);
      setloading(false);
    }
  };
  const onSubmit = (values) => {
    let checkType =
      values.custom_request_duration || values.custom_request_agent;
    const data = {
      title: values.title,
      location: values.location,
      latitude: values.lat,
      longitude: values.lng,
      intervention: values.mission_type.value,
      agent_type: values.agent_type.value,
      total_hours: values.total_hours || 8,
      quick_book: values.type === 'now' ? 1 : 0,
      start_date_time: values.start_date
        ? `${values.start_date}${values.start_time + ':00'}`
        : `${CurrentDate}`,
      description: values.description,
      vehicle_required: values.preferVehicle ? 1 : 2,
      mission_finish_time: values.mission_finish_time,
      time_intervel: values.time_interval,
      repetitive_mission: values.repetitive_mission.value,
      // agent_count: values.numberOfAgents,
    };
    const customData = {
      title: values.title,
      location: values.location,
      latitude: values.lat,
      longitude: values.lng,
      intervention: values.mission_type.value,
      agent_type: values.agent_type.value,
      total_hours: values.total_hours || 8,
      quick_book: values.type === 'now' ? 1 : 0,
      start_date_time: values.start_date
        ? `${values.start_date}${values.start_time + ':00'}`
        : `${CurrentDate}`,
      description: values.description,
      vehicle_required: values.preferVehicle ? 1 : 2,
      agent_count: values.numberOfAgents,
    };
    if (checkType) {
      setloading(true);
      callCustomRequest(customData);
    } else {
      dispatch(searchAgentsRequest(data));
    }
  };

  const onOpen = (type) => {
    modalizeRef.current?.open();
    setAction(type);
  };
  const onClose = (type) => {
    modalizeRef.current?.close();
    setAction('');
  };

  const openModal = (type) => {
    setmodal(true);
    setModalAction(type);
  };
  const closeModal = () => {
    setmodal(false);
    setModalAction('');
  };

  const renderType = (label, description, onPress, value, disabled) => {
    return (
      <CustomButton
        color={disabled ? '#dddddd' : 'transparent'}
        disabled={disabled}
        onPress={() => {
          onPress();
          Keyboard.dismiss();
        }}
        margin={[t1, 0]}
        borderWidth={1}
        borderColor={'#F5F7FA'}
        flex={false}
        space={'between'}
        padding={[t1]}
        center
        row>
        <Block flex={false}>
          <Text color="#8A8E99" caption>
            {label}
          </Text>
          <Text bold color="#8A8E99" margin={[t1, 0, 0, 0]} size={16}>
            {value || description}
          </Text>
        </Block>
        <ImageComponent name="down_arrow_icon" height="8" width="14" />
      </CustomButton>
    );
  };
  const languageMode = useSelector((state) => state.languageReducer.language);

  const {
    CreateMissionHeader,
    WhenMissionStart,
    Now,
    Later,
    DateTime,
    MissionDateTime,
    MissionTitle,
    Title,
    LocationHeader,
    MissionLocation,
    Description,
    EnterMissionDesc,
    MissionTypeHeader,
    SelectMissionType,
    AgentTypeHeader,
    SelectAgentType,
    MissionDuration,
    SelectNumbHours,
    RepetitiveMission,
    SelectRepetitive,
    MissionFinishedTime,
    SelectFinishTime,
    TimeInterval,
    SelectTimeInterval,
    NoteHowMany,
    PreferAgent,
    SearchForAgent,
    Yes,
    No,
    NumberOfAgentsLanguage,
    SelectNumberAgent,
    Success,
    MissionRequestSent,
    CheckMissions,
    CustomRequestMessage,
    CustomMissionRequest,
    Ok,
    CreateCustomMissionRequest,
  } = languageMode;
  return (
    <>
      <Block safearea primary>
        <Header centerText={CreateMissionHeader} />
        <Formik
          innerRef={formikRef}
          enableReinitialize
          initialValues={{
            type: 'now',
            start_date: '',
            start_time: '',
            title: null,
            location: null,
            description: null,
            mission_type: {
              name: null,
              value: null,
            },
            agent_type: {
              name: null,
              value: null,
            },
            total_hours: null,
            total_hours_dis: null,
            numberOfAgents: 1,
            preferVehicle: true,
            lat: null,
            lng: null,
            mission_finish_time: null,
            time_interval: null,
            repetitive_mission: {
              name: null,
              value: null,
            },
            custom_request_duration: false,
            custom_request_agent: false,
          }}
          onSubmit={onSubmit}
          validationSchema={yup.object().shape({
            title: yup.string().min(2).required(),
            agent_type: yup.object().shape({
              name: yup.string().required(),
            }),
            mission_type: yup.object().shape({
              name: yup.string().required(),
            }),
            description: yup.string().min(2).required(),
            location: yup.string().min(2).required(),
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
            const agentType = values.agent_type.name;
            const missionType = values.mission_type.name;
            const totalHours = values.total_hours;
            const missionFinishTime = values.mission_finish_time;
            const repetitiveMission = values.repetitive_mission.name;
            const timeInterval = values.time_interval;
            let checkType =
              values.custom_request_duration || values.custom_request_agent;
            return (
              <>
                <KeyboardAwareScrollView
                  keyboardShouldPersistTaps="always"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{flexGrow: 1}}>
                  <Block padding={[0, w4]}>
                    <Block
                      // space={'between'}
                      center
                      margin={[t1, w3]}
                      // row
                      flex={false}>
                      <Text
                        size={16}
                        // style={{width: widthPercentageToDP(45)}}
                        regular>
                        {WhenMissionStart}
                      </Text>

                      <Block
                        primary
                        margin={[t2, w4, 0, 0]}
                        color={'#F7F8FA'}
                        borderRadius={30}
                        row
                        flex={false}>
                        <CustomButton
                          onPress={() => setFieldValue('type', 'now')}
                          center
                          middle
                          borderRadius={30}
                          padding={
                            values.type === 'now'
                              ? [
                                  heightPercentageToDP(1.5),
                                  widthPercentageToDP(8),
                                ]
                              : [0, widthPercentageToDP(6)]
                          }
                          color={values.type === 'now' ? '#FFFFFF' : '#F7F8FA'}
                          shadow={values.type === 'now'}
                          margin={[0, w1]}>
                          <Text size={14} semibold>
                            {Now}
                          </Text>
                        </CustomButton>
                        <CustomButton
                          onPress={() => setFieldValue('type', 'later')}
                          center
                          middle
                          borderRadius={20}
                          padding={
                            values.type === 'later'
                              ? [
                                  heightPercentageToDP(1.5),
                                  widthPercentageToDP(8),
                                ]
                              : [0, widthPercentageToDP(6)]
                          }
                          color={
                            values.type === 'later' ? '#FFFFFF' : '#F7F8FA'
                          }
                          shadow={values.type === 'later'}>
                          <Text size={14} semibold>
                            {Later}
                          </Text>
                        </CustomButton>
                      </Block>
                    </Block>
                    {values.type === 'later' && (
                      <>
                        {renderType(
                          DateTime,
                          MissionDateTime,
                          () => onOpen('date_time'),
                          `${values.start_date}${values.start_time}`,
                        )}
                      </>
                    )}
                    <Input
                      label={Title}
                      placeholder={MissionTitle}
                      value={values.title}
                      onChangeText={handleChange('title')}
                      onBlur={() => setFieldTouched('title')}
                      error={touched.title && errors.title}
                    />
                    <GooglePlacesTextInput
                      placeholder={MissionLocation}
                      value={values.location}
                      onPress={(data, details) => {
                        const latlng = details.geometry.location;
                        const description = data.description;
                        setFieldValue('location', description);
                        setFieldValue('lat', latlng.lat);
                        setFieldValue('lng', latlng.lng);
                      }}
                      error={touched.location && errors.location}
                      label={LocationHeader}
                      textInputProps={{
                        placeholderTextColor: '#8A8E99',
                        onblur: () => setFieldTouched('location'),
                        value: values.location,
                        onChangeText: handleChange('location'),
                      }}
                    />
                    <Input
                      label={Description}
                      placeholder={EnterMissionDesc}
                      value={values.description}
                      onChangeText={handleChange('description')}
                      onBlur={() => setFieldTouched('description')}
                      error={touched.description && errors.description}
                      numberOfLines={3}
                    />
                    {renderType(
                      MissionTypeHeader,
                      SelectMissionType,
                      () => onOpen('mission'),
                      missionType,
                    )}
                    {renderType(
                      AgentTypeHeader,
                      SelectAgentType,
                      () => onOpen('agent'),
                      agentType,
                      missionType === 'Intervention',
                    )}
                    {renderType(
                      MissionDuration,
                      SelectNumbHours,
                      () => onOpen('duration'),
                      values.total_hours_dis,
                      missionType === 'Intervention',
                    )}
                    {renderType(
                      NumberOfAgentsLanguage,
                      SelectNumberAgent,
                      () => onOpen('number_of_agent'),
                      values.numberOfAgents,
                    )}
                    {values.mission_type.name === 'Security Patrol' && (
                      <>
                        {renderType(
                          RepetitiveMission,
                          SelectRepetitive,
                          () => onOpen('repetitive_mission'),
                          repetitiveMission,
                        )}
                        {renderType(
                          MissionFinishedTime,
                          SelectFinishTime,
                          () => onOpen('mission_finish_time'),
                          missionFinishTime,
                        )}
                        {renderType(
                          TimeInterval,
                          SelectTimeInterval,
                          () => onOpen('time_interval'),
                          timeInterval,
                        )}
                      </>
                    )}
                    <Block margin={[t1, w3]} flex={false} row>
                      <ImageComponent
                        name="warning_icon"
                        height="20"
                        width="20"
                      />
                      <Text
                        style={{width: widthPercentageToDP(70)}}
                        margin={[0, w3]}
                        color="#8A8E99"
                        size={12}>
                        {NoteHowMany}
                      </Text>
                    </Block>

                    <Block
                      // space={'between'}
                      center
                      margin={[t1, w3]}
                      row
                      flex={false}>
                      <Text
                        size={16}
                        style={{width: widthPercentageToDP(40)}}
                        regular>
                        {PreferAgent}
                      </Text>

                      <Block
                        primary
                        // padding={[t1]}
                        margin={[0, w4, 0, w4]}
                        color={'#F7F8FA'}
                        borderRadius={30}
                        row
                        flex={false}>
                        <CustomButton
                          onPress={() => setFieldValue('preferVehicle', true)}
                          center
                          middle
                          borderRadius={30}
                          padding={
                            values.preferVehicle
                              ? [
                                  heightPercentageToDP(1.5),
                                  widthPercentageToDP(8),
                                ]
                              : [0, widthPercentageToDP(8)]
                          }
                          color={values.preferVehicle ? '#FFFFFF' : '#F7F8FA'}
                          shadow={values.preferVehicle}
                          margin={[0, w1]}>
                          <Text size={14} semibold>
                            {Yes}
                          </Text>
                        </CustomButton>
                        <CustomButton
                          onPress={() => setFieldValue('preferVehicle', false)}
                          disabled={missionType === 'Intervention'}
                          center
                          middle
                          borderRadius={20}
                          padding={
                            !values.preferVehicle
                              ? [
                                  heightPercentageToDP(1.5),
                                  widthPercentageToDP(8),
                                ]
                              : [0, widthPercentageToDP(8)]
                          }
                          color={!values.preferVehicle ? '#FFFFFF' : '#F7F8FA'}
                          shadow={!values.preferVehicle}>
                          <Text size={14} semibold>
                            {No}
                          </Text>
                        </CustomButton>
                      </Block>
                    </Block>
                    <Button
                      isLoading={isLoad || loading}
                      disabled={!dirty}
                      onPress={handleSubmit}
                      style={{marginVertical: t4}}
                      color="secondary">
                      {checkType ? CreateCustomMissionRequest : SearchForAgent}
                    </Button>
                  </Block>
                </KeyboardAwareScrollView>
                <Modalize
                  adjustToContentHeight={true}
                  handlePosition="inside"
                  ref={modalizeRef}>
                  {action === 'mission' && (
                    <MissionType
                      state={values.mission_type}
                      setValues={(v) => {
                        if (v.value === 'NotSure') {
                          setTimeout(() => {
                            onOpen('open_mission_type');
                          }, 1000);
                        } else if (
                          v.name === 'Intervention' ||
                          v.name === 'Security Patrol'
                        ) {
                          setFieldValue('mission_type', v);
                          setFieldValue('agent_type', {
                            name: 'ADS',
                            value: 4,
                          });
                          setFieldValue('total_hours', '1:00');
                          setFieldValue('total_hours_dis', '1 hour');
                          setFieldValue('preferVehicle', true);
                        } else {
                          setFieldValue('mission_type', v);
                          setFieldValue('agent_type', {
                            name: '',
                            value: null,
                          });
                          setFieldValue('total_hours', null);
                          setFieldValue('total_hours_dis', null);
                        }
                      }}
                      closeModal={() => {
                        onClose();
                      }}
                    />
                  )}
                  {action === 'agent' && (
                    <AgentType
                      state={values.agent_type}
                      setValues={(v) => {
                        if (v.value === 8) {
                          setTimeout(() => {
                            onOpen('open_agent_type');
                          }, 1000);
                        } else {
                          setFieldValue('agent_type', v);
                        }
                      }}
                      closeModal={() => {
                        onClose();
                      }}
                    />
                  )}
                  {action === 'duration' && (
                    <NumberOfHours
                      data={count72}
                      state={values.total_hours}
                      setValues={(v, a) => {
                        setFieldValue('total_hours', `${v}:${a}`);
                        if (a > 0) {
                          setFieldValue(
                            'total_hours_dis',
                            `${v} hours : ${a} minutes`,
                          );
                        } else {
                          setFieldValue('total_hours_dis', `${v} hours`);
                        }
                        if (v > 14 && !values.custom_request_duration) {
                          openModal('custom');
                          setFieldValue('custom_request_duration', true);
                        } else {
                          setFieldValue('custom_request_duration', false);
                        }
                      }}
                      closeModal={() => {
                        onClose();
                      }}
                    />
                  )}
                  {action === 'date_time' && (
                    <ChooseDateTime
                      dateState={values.start_date}
                      setDateValues={(v) => setFieldValue('start_date', v)}
                      timeState={values.start_time}
                      setTimeValues={(v) =>
                        setFieldValue('start_time', ` ${v}`)
                      }
                      closeModal={() => {
                        onClose();
                      }}
                    />
                  )}
                  {action === 'mission_finish_time' && (
                    <MissionFinishHours
                      state={values.mission_finish_time}
                      setValues={(v) =>
                        setFieldValue('mission_finish_time', `${v}`)
                      }
                      closeModal={() => {
                        onClose();
                      }}
                    />
                  )}
                  {action === 'number_of_agent' && (
                    <NumberOfAgents
                      data={count24}
                      state={values.numberOfAgents}
                      setValues={(v) => {
                        if (v > 1 && !values.custom_request_agent) {
                          setFieldValue('numberOfAgents', `${v}`);
                          openModal('custom');
                          setFieldValue('custom_request_agent', true);
                        } else {
                          setFieldValue('numberOfAgents', `${v}`);
                          setFieldValue('custom_request_agent', false);
                        }
                      }}
                      closeModal={() => {
                        onClose();
                      }}
                    />
                  )}
                  {action === 'repetitive_mission' && (
                    <RepetitiveType
                      state={values.repetitive_mission}
                      setValues={(v) => setFieldValue('repetitive_mission', v)}
                      closeModal={() => {
                        onClose();
                      }}
                    />
                  )}
                  {action === 'time_interval' && (
                    <NumberOfHours
                      data={count24}
                      state={values.time_interval}
                      setValues={(v, m) => {
                        setFieldValue('time_interval', `${v}`);
                      }}
                      closeModal={() => {
                        onClose();
                      }}
                    />
                  )}
                  {action === 'open_agent_type' && <AgentDetails />}
                  {action === 'open_mission_type' && <MissionDetails />}
                </Modalize>
              </>
            );
          }}
        </Formik>
        <Modal
          style={styles.modalStyle}
          isVisible={modal}
          onBackdropPress={() => closeModal(false)}>
          {modalAction === 'custom' && (
            <View style={styles.modalView}>
              <Text semibold style={styles.modalText}>
                {CustomMissionRequest}
              </Text>
              <Text style={styles.textStyle} center>
                {CustomRequestMessage}
              </Text>
              <Button
                isLoading={isLoad}
                style={styles.button}
                onPress={() => closeModal(false)}
                color="secondary">
                {Ok}
              </Button>
            </View>
          )}
          {modalAction === 'success' && (
            <View style={styles.modalView}>
              <Text semibold style={styles.modalText}>
                {Success}
              </Text>
              <Text style={styles.textStyle} center>
                {MissionRequestSent}
              </Text>
              <Button
                isLoading={isLoad}
                style={styles.button}
                onPress={() => {
                  navigation.navigate('Missions');
                  setmodal(false);
                }}
                color="secondary">
                {CheckMissions}
              </Button>
            </View>
          )}
        </Modal>
      </Block>
    </>
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
export default CreateMission;
