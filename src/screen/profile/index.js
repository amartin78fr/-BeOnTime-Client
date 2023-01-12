import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {BackHandler, FlatList, ScrollView} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {
  Block,
  Button,
  CustomButton,
  ImageComponent,
  Text,
} from '../../components';
import Header from '../../components/common/header';
import {t1, t2, w3} from '../../components/theme/fontsize';
import {resetStore} from '../../redux/action';
import {
  strictValidObjectWithKeys,
  strictValidString,
} from '../../utils/commonUtils';
import {config} from '../../utils/config';
import {useDoubleBackPressExit} from '../../utils/site-specific-common-utils';
import messaging from '@react-native-firebase/messaging';

const Profile = () => {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const profile = useSelector((state) => state.user.profile.user.data);
  const dispatch = useDispatch();
  const languageMode = useSelector((state) => state.languageReducer.language);

  const {
    ProfileLanguage,
    Customer,
    EditProfileLanguage,
    Email,
    HomeAddress,
    PhoneNumber,
    BillingLanguage,
    ChangeLanguage,
    ChangePassword,
    Logout,
  } = languageMode;

  const ProfileData = [
    {
      name: BillingLanguage,
      nav: 'Billing',
    },
    {
      name: EditProfileLanguage,
      nav: 'EditProfile',
    },
    {
      name: ChangeLanguage,
      nav: 'Language',
    },
    {
      name: ChangePassword,
      nav: 'ChangePassword',
    },
  ];

  useEffect(() => {
    const BackButton = BackHandler.addEventListener(
      'hardwareBackPress',
      useDoubleBackPressExit,
    );
    return () => BackButton.remove();
  }, []);

  const onLogout = async () => {
    setloading(true);
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };
    await messaging().deleteToken(undefined, '*');
    const response = await axios({
      method: 'get',
      url: `${config.Api_Url}/log-out`,
      headers,
    });
    if (response.data.status === 1) {
      const keys = await AsyncStorage.getAllKeys();
      dispatch(resetStore());
      await AsyncStorage.multiRemove(keys);
      navigation.reset({
        routes: [{name: 'Auth'}],
      });
      setloading(false);
    }
  };

  const _renderItem = ({item}) => {
    return (
      <CustomButton
        onPress={() => navigation.navigate(item.nav)}
        flex={false}
        row
        space="between"
        padding={[t1]}
        borderWidth={1}
        borderColorDeafult>
        <Text semibold size={16}>
          {item.name}
        </Text>
        <ImageComponent name="arrow_right_2_icon" height="20" width="20" />
      </CustomButton>
    );
  };
  return (
    <Block white>
      <Header leftIcon={true} menu centerText={ProfileLanguage} />
      <ScrollView>
        <>
          <Block margin={[t2, 0]} flex={false} center>
            {strictValidObjectWithKeys(profile) &&
            strictValidString(profile.image) ? (
              <ImageComponent
                isURL
                name={`${config.Api_Url}/${profile.image}`}
                height="150"
                width="150"
                radius={150}
              />
            ) : (
              <ImageComponent
                name="default_profile_icon"
                height="150"
                width="150"
              />
            )}
            {strictValidObjectWithKeys(profile) && (
              <Text uppercase semibold margin={[t1, 0]}>
                {profile.first_name} {profile.last_name}
              </Text>
            )}
            <Text size={16} grey>
              {Customer}
            </Text>
          </Block>
          <Block
            flex={false}
            row
            space={'between'}
            margin={[t1, 0]}
            padding={[0, w3]}
            center>
            <Text size={16}>{Email}</Text>
            {strictValidObjectWithKeys(profile) && (
              <Text grey size={16}>
                {profile.email}
              </Text>
            )}
          </Block>
          <Block
            flex={false}
            row
            space={'between'}
            margin={[t1, 0]}
            padding={[0, w3]}
            center>
            <Text size={16}>{PhoneNumber}</Text>
            {strictValidObjectWithKeys(profile) && (
              <Text grey size={16}>
                {profile.phone}
              </Text>
            )}
          </Block>
          <Block
            flex={false}
            row
            space={'between'}
            margin={[t1, 0]}
            padding={[0, w3]}
            center>
            <Text size={16}>{HomeAddress}</Text>
            {strictValidObjectWithKeys(profile) && (
              <Text grey size={16}>
                {profile.home_address}
              </Text>
            )}
          </Block>
          <Block
            flex={false}
            padding={[0, w3]}
            margin={[heightPercentageToDP(10), 0, 0]}>
            <FlatList
              scrollEnabled={false}
              data={ProfileData}
              renderItem={_renderItem}
            />
            <Button
              isLoading={loading}
              onPress={() => onLogout()}
              color="secondary">
              {Logout}
            </Button>
          </Block>
        </>
      </ScrollView>
    </Block>
  );
};

export default Profile;
