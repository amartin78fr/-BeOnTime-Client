import React, {useState, useRef, useEffect} from 'react';
import {Block, Button, ImageComponent, Text} from '../../../components';
import Header from '../../../components/common/header';
import CommonMap from '../../common/Map';
import {Modalize} from 'react-native-modalize';
import {t1, t2, w3} from '../../../components/theme/fontsize';
import {AgentType, MissionType, PaymentStatus} from '../../../utils/data';
import Rating from '../../../components/ratings';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {divider} from '../../../utils/commonView';
import moment from 'moment';
import ImageCropPicker from 'react-native-image-crop-picker';
import {strictValidNumber, strictValidString} from '../../../utils/commonUtils';
import {Alert, Platform} from 'react-native';
import {
  UPLOAD,
  UPLOADATTACHMENT,
} from '../../../utils/site-specific-common-utils';
import {useNavigation} from '@react-navigation/core';
import {useSelector} from 'react-redux';
// import SignatureScreen from '../../../components/common/signature';

const MissionDetails = ({
  route: {
    params: {item},
  },
}) => {
  const navigation = useNavigation();
  const [userProfileDetails, setUserDetails] = useState({
    uploading: false,
    profileData: '',
    profileImage: '',
  });
  const {profileData, uploading, profileImage} = userProfileDetails;
  const languageMode = useSelector((state) => state.languageReducer.language);
  const {
    MissionDate,
    StartMission,
    MissionDetails,
    Accept,
    Reject,
    FinishMission,
    MissionTypeHeader,
    AgentTypeHeader,
    LocationHeader,
    Yes,
    type,
    RepetitiveMission,
    Duration,
    VehicleRequired,
    MissionFinishedTime,
    TimeInterval,
    Hours,
    PaymentDetails,
    Amount,
    Status,
    Due,
    UploadProof,
    ApprovalFile,
    MissionEnded,
    AgentMissionStarted,
    MissionAccepted,
    InReview,
    TravelToMission,
    ReachedOnDestination,
    Camera,
    Gallery,
    Cancel,
    ChooseOption,
    NotificationSoon,
  } = languageMode;

  const modalizeRef = useRef(null);
  useEffect(() => {
    modalizeRef.current?.open();
  }, []);
  const {
    id,
    username,
    title,
    location,
    created_at,
    agent_type,
    description,
    vehicle_required,
    total_hours,
    amount,
    payment_status,
    status,
    intervention,
    start_date_time,
    mission_finish_time,
    time_intervel,
    repetitive_mission,
  } = item;

  const openCameraPicker = () => {
    ImageCropPicker.openCamera({
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
        profileImage: Platform.OS === 'ios' ? image.sourceURL : image.path,
      });
      const res = await UPLOADATTACHMENT(
        image.filename ? image.filename : `photo.${filename}`,
        Platform.OS === 'ios'
          ? image.sourceURL
          : image.path.replace('file://', ''),
        image.mime,
        id,
      );
      if (res) {
        setUserDetails({
          ...userProfileDetails,
          uploading: false,
        });
        navigation.goBack();
      }
    });
  };
  const openImagePicker = () => {
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
        profileImage: Platform.OS === 'ios' ? image.sourceURL : image.path,
      });
      const res = await UPLOADATTACHMENT(
        image.filename ? image.filename : `photo.${filename}`,
        Platform.OS === 'ios'
          ? image.sourceURL
          : image.path.replace('file://', ''),
        image.mime,
        id,
      );
      if (res) {
        setUserDetails({
          ...userProfileDetails,
          uploading: false,
        });
        navigation.goBack();
      } else {
        setUserDetails({
          ...userProfileDetails,
          uploading: false,
        });
        Alert.alert('something issue on network issue');
      }
    });
  };

  const openCamera = () => {
    Alert.alert(
      'BeOnTime',
      ChooseOption,
      [
        {
          text: Camera,
          onPress: () => {
            openCameraPicker();
          },
        },
        {
          text: Gallery,
          onPress: () => {
            openImagePicker();
          },
        },
        {
          text: Cancel,
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
  };
  const renderAgentDetails = () => {
    return (
      <Block flex={false}>
        <Block space={'between'} margin={[0, 0, t1]} flex={false} row>
          <Block flex={false} row>
            <ImageComponent name="blurAvatar_icon" height="60" width="60" />
            <Block margin={[0, w3]} flex={false}>
              <Block row center flex={false}>
                <Text semibold size={18} margin={[0, w3, 0, 0]}>
                  {username}
                </Text>
                <ImageComponent name="vehicle_icon" height="25" width="25" />
              </Block>
              <Text margin={[hp(0.5), 0, 0]} size={16} grey>
                {AgentType(agent_type)}
              </Text>
            </Block>
          </Block>
          <Rating rating={0} />
        </Block>
      </Block>
    );
  };
  const renderMissionStatus = () => {
    return (
      <Block margin={[t1, 0]} flex={false} row center>
        <Block
          color={status === 5 ? '#000' : '#F7F8FA'}
          flex={false}
          center
          middle
          style={{height: 50, width: 50}}
          borderRadius={30}>
          {(status === 0 || status === 1 || status === 2 || status === 3) && (
            <Text bold margin={[-t1, 0, 0, 0]}>
              ...
            </Text>
          )}
          {status === 4 && (
            <Text size={12} bold>
              0%
            </Text>
          )}
          {status === 5 && (
            <Text white size={12} bold>
              100%
            </Text>
          )}
        </Block>
        <Block margin={[0, w3]} flex={false}>
          <Block flex={false}>
            {(status === 0 || status === 1 || status === 2 || status === 3) && (
              <>
                <Text semibold size={16} margin={[0, w3, 0, 0]}>
                  {status === 2
                    ? TravelToMission
                    : status === 3
                    ? ReachedOnDestination
                    : InReview}
                </Text>
                {status === 0 && (
                  <Text margin={[hp(0.5), 0, 0]} size={14} grey>
                    {NotificationSoon}
                  </Text>
                )}
              </>
            )}
            {status === 4 && (
              <>
                <Text semibold size={16} margin={[0, w3, 0, 0]}>
                  {AgentMissionStarted}
                </Text>
                {/* <Text margin={[hp(0.5), 0, 0]} size={14} grey>
                  Reaching location in few min.
                </Text> */}
              </>
            )}
            {status === 5 && (
              <>
                <Text semibold size={16} margin={[0, w3, 0, 0]}>
                  {MissionAccepted}
                </Text>
                <Text margin={[hp(0.5), 0, 0]} size={14} grey>
                  {MissionEnded} {PaymentStatus(payment_status)}
                </Text>
              </>
            )}
          </Block>
        </Block>
      </Block>
    );
  };
  const MissionDetail = () => {
    return (
      <Block flex={false}>
        <Text semibold size={18}>
          {MissionDetails}
        </Text>
        <Text margin={[t1, 0, 0]} color="#8A8E99" size={14}>
          {description}
        </Text>
      </Block>
    );
  };
  const renderDetails = (header, content) => {
    return (
      <Block center margin={[hp(0.5), 0]} flex={false} row space={'between'}>
        <Text size={16} regular>
          {header}
        </Text>
        <Text regular grey size={16}>
          {content}
        </Text>
      </Block>
    );
  };

  const formatDateType = (d) => {
    return moment(d).format('DD MMMM YYYY');
  };

  const renderHeader = () => (
    <Block padding={[t2]} flex={false}>
      <Text size={13} grey semibold>
        MISN0{id}
      </Text>
      <Text margin={[t1, 0, t1]} semibold size={20}>
        {title}
      </Text>
      {divider()}
      {renderAgentDetails()}
      {renderMissionStatus()}
      {divider()}
      {MissionDetail()}
      <Block flex={false} margin={[t2, 0, 0]}>
        {renderDetails(MissionDate, formatDateType(created_at))}

        {renderDetails(MissionTypeHeader, MissionType(intervention))}
        {renderDetails(AgentTypeHeader, AgentType(agent_type))}
        {renderDetails(LocationHeader, location)}
        {renderDetails(Duration, `${total_hours} ` + Hours)}
        {renderDetails(VehicleRequired, vehicle_required === 1 ? 'Yes' : 'No')}
        {strictValidString(mission_finish_time) &&
          renderDetails(MissionFinishedTime, mission_finish_time)}
        {strictValidString(time_intervel) ||
          (strictValidNumber(time_intervel) &&
            renderDetails(TimeInterval, time_intervel))}
        {strictValidString(repetitive_mission) &&
          renderDetails(RepetitiveMission, repetitive_mission)}
      </Block>
      {divider()}
      <Text semibold size={18}>
        {PaymentDetails}
      </Text>
      <Block flex={false} margin={[t1, 0, 0]}>
        {renderDetails(Amount, type === 'en' ? `€${amount}` : `${amount}€`)}
        {renderDetails(Status, PaymentStatus(payment_status))}
        {renderDetails(Due, formatDate(start_date_time))}
      </Block>
      {item.payment_status !== 1 && (
        <Button
          isLoading={uploading}
          disabled={
            strictValidString(profileImage) || item.invoice_status === 2
          }
          onPress={() => openCamera()}
          style={{marginTop: hp(2)}}
          color="primary">
          {strictValidString(profileImage) || item.invoice_status === 2
            ? ApprovalFile
            : UploadProof}
        </Button>
      )}
    </Block>
  );
  return (
    <Block primary>
      <Header centerText="Mission-Details" />
      <Block flex={1}>
        <CommonMap agent={item} />
      </Block>
      <Modalize
        ref={modalizeRef}
        // contentRef={contentRef}
        handlePosition="inside"
        alwaysOpen={350}
        snapPoint={350}>
        {renderHeader()}
      </Modalize>
    </Block>
  );
};

export default MissionDetails;
