import {images} from '../assets/index';
import {
  Alerts,
  strictValidNumber,
  strictValidObjectWithKeys,
} from './commonUtils';
import RNFS from 'react-native-fs';
import {light} from '../components/theme/colors';
import FileViewer from 'react-native-file-viewer';
import moment from 'moment';
import {Alert, BackHandler, Linking, Platform} from 'react-native';
import {config} from './config';
import RNFetchBlob from 'rn-fetch-blob';
import {showMessage} from 'react-native-flash-message';
import {navigationRef} from '../routes/NavigationService';

export const cc_format = (value) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(' ');
  }
  return value;
};

export const getCardColor = (card) => {
  switch (card.toString().toLowerCase()) {
    case 'jcb':
      return images.jcb;
    case 'discover':
      return images.discover;
    case 'diners':
      return images.diner;
    case 'amex':
      return images.amex;
    case 'diners - carte blanche':
      return images.diner;
    case 'visa':
      return images.visa;
    case 'mastercard':
      return images.mastercard;
    default:
      return '';
  }
};

export const cc_expires_format = (string) => {
  return string
    .replace(
      /[^0-9]/g,
      '', // To allow only numbers
    )
    .replace(
      /^([2-9])$/g,
      '0$1', // To handle 3 > 03
    )
    .replace(
      /^(1{1})([3-9]{1})$/g,
      '0$1/$2', // 13 > 01/3
    )
    .replace(
      /^0{1,}/g,
      '0', // To handle 00 > 0
    )
    .replace(
      /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
      '$1/$2', // To handle 113 > 11/3
    );
};

export const getCardType = (number) => {
  // visa
  let re = new RegExp('^4');
  if (number.match(re) != null) {
    return 'Visa';
  }

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      number,
    )
  ) {
    return 'mastercard';
  }

  // AMEX
  re = new RegExp('^3[47]');
  if (number.match(re) != null) {
    return 'AMEX';
  }

  // Discover
  re = new RegExp(
    '^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)',
  );
  if (number.match(re) != null) {
    return 'Discover';
  }

  // Diners
  re = new RegExp('^36');
  if (number.match(re) != null) {
    return 'Diners';
  }

  // Diners - Carte Blanche
  re = new RegExp('^30[0-5]');
  if (number.match(re) != null) {
    return 'Diners - Carte Blanche';
  }

  // JCB
  re = new RegExp('^35(2[89]|[3-8][0-9])');
  if (number.match(re) != null) {
    return 'JCB';
  }

  // Visa Electron
  re = new RegExp('^(4026|417500|4508|4844|491(3|7))');
  if (number.match(re) != null) {
    return 'Visa Electron';
  }

  return '';
};

export const formatPrice = (price) => {
  if (!strictValidNumber(price)) {
    return 'Price is invalid number';
  }
  return price === 0 ? 'Free' : `$${price}`;
};
export const viewFile = (url, name) => {
  const localFile = `${RNFS.DocumentDirectoryPath}/${name}`;
  Alerts('Downloading', ' ', light.success, 3000);
  const options = {
    fromUrl: `${config.Api_Url}/${url}`,
    toFile: localFile,
  };
  RNFS.downloadFile(options)
    .promise.then(() => FileViewer.open(localFile))
    .then(() => {
      Alerts('success', ' ', light.success);
    })
    .catch((error) => {
      Alerts('failed to open file', ' ', light.danger);
    });
};
export const formatTime = (d) => {
  return moment(d).format('HH:mm');
};
export const UPLOAD = async (
  api,
  fileName,
  filePath,
  filetype,
  uploadType,
  mission_id,
) => {
  const date = new Date();
  const tempPath =
    RNFS.DocumentDirectoryPath + '/' + date.getMilliseconds() + date.getHours();

  await RNFS.copyFile(filePath, tempPath);

  const fileExist = await RNFS.exists(tempPath);

  if (!fileExist) {
    Alert.alert('does not exist!');
    return false;
  }
  const _headers = {
    'Content-Type': 'multipart/form-data',
    name: uploadType,
    // mission_id: mission_id,
  };
  let res = {};

  res = await RNFetchBlob.fetch(
    'POST',
    `${config.Api_Url}/customer/upload-media`,
    _headers,
    [
      {
        name: 'image',
        filename: fileName,
        type: filetype,
        data: RNFetchBlob.wrap(tempPath),
      },
    ],
  );
  return res;
};
export const UPLOADATTACHMENT = async (
  fileName,
  filePath,
  filetype,
  mission_id,
) => {
  const date = new Date();
  const tempPath =
    RNFS.DocumentDirectoryPath + '/' + date.getMilliseconds() + date.getHours();

  await RNFS.copyFile(filePath, tempPath);

  const fileExist = await RNFS.exists(tempPath);

  if (!fileExist) {
    Alert.alert('does not exist!');
    return false;
  }
  const _headers = {
    'Content-Type': 'multipart/form-data',
  };
  let res = {};

  res = await RNFetchBlob.fetch(
    'POST',
    `${config.Api_Url}/customer/upload-media/${mission_id}`,
    _headers,
    [
      {
        name: 'image',
        filename: fileName,
        type: filetype,
        data: RNFetchBlob.wrap(tempPath),
      },
    ],
  );
  return res;
};

export const onDisplayNotification = async (obj) => {
  if (strictValidObjectWithKeys(obj)) {
    showMessage({
      message: obj.type,
      description: obj.message,
      type: 'default',
      backgroundColor: '#000', // background color
      color: '#fff', // text color
      onPress: () => {
        navigationRef.current?.navigate('Notifications');
      },
    });
  } else {
    return null;
  }
};
let currentCount = 0;
export const useDoubleBackPressExit = () => {
  if (Platform.OS === 'ios') {
    return;
  }
  const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
    if (currentCount === 1) {
      BackHandler.exitApp();
      subscription.remove();
      return true;
    }
    backPressHandler();
    return true;
  });
};

const backPressHandler = () => {
  if (currentCount < 1) {
    currentCount += 1;
    Alerts('', 'Press again to close!', light.subtitleColor);
  }
  setTimeout(() => {
    currentCount = 0;
  }, 2000);
};
export const openUrl = async (url) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL(url);
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};
