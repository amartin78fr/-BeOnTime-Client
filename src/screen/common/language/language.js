import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {en, fr} from '.';
import {Block, CustomButton, ImageComponent, Text} from '../../../components';
import Header from '../../../components/common/header';
import {t2, w3} from '../../../components/theme/fontsize';
import {languageSuccess} from '../../../redux/action';
import {Alerts} from '../../../utils/commonUtils';
import {config} from '../../../utils/config';

const Language = () => {
  const dispatch = useDispatch();
  const [language, setlanguage] = useState('');
  const languageMode = useSelector((state) => state.languageReducer.language);
  const {ChooseLanguage} = languageMode;
  useEffect(() => {
    getLanguageValue();
  }, []);

  const getLanguageValue = async () => {
    let value = '';
    try {
      value = (await AsyncStorage.getItem('language')) || 'none';
    } catch (error) {
      // Error retrieving data
    }
    if (value === 'en') {
      setlanguage('English');
    } else {
      setlanguage('French');
    }
  };

  const changeLanguageApi = async (val) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    };
    const res = await axios({
      method: 'post',
      url: `${config.Api_Url}/change-language`,
      headers,
      data: {
        language: val,
      },
    });
    Alerts(res.data.message);
  };

  const change = async (value) => {
    if (value === 'French') {
      await AsyncStorage.setItem('language', 'fr');
      setlanguage('French');
      changeLanguageApi('fr');
      dispatch(languageSuccess(fr));
    } else {
      await AsyncStorage.setItem('language', 'en');
      setlanguage('English');
      changeLanguageApi('en');
      dispatch(languageSuccess(en));
    }
  };

  return (
    <Block primary>
      <Header centerText={ChooseLanguage} />
      <FlatList
        data={['English', 'French']}
        renderItem={({item}) => {
          return (
            <CustomButton
              row
              center
              space="between"
              onPress={() => change(item)}
              borderWidth={[0, 0, 1, 0]}
              borderColorDeafult
              flex={false}
              // margin={[t1, 0, 0]}
              padding={[t2, w3]}
              primary>
              <Text size={18}>{item}</Text>
              {language === item && (
                <ImageComponent name="tick_icon" height={22} width={22} />
              )}
            </CustomButton>
          );
        }}
      />
    </Block>
  );
};

export default Language;
