// import React from 'react';
// import {View, Text} from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
// const UploadImage = ({imagePath, setImagePath}) => {
//   const uploadPhoto = async () => {
//     // const token = await AsyncStorage.getItem('token');
//     // const parsedToken = JSON.parse(token);
//     ImagePicker.openPicker({
//       width: 300,
//       height: 200,
//       cropping: true,
//     }).then(async (image) => {
//       setImagePath({
//         ...userProfileDetails,
//         uploading: true,
//       });
//     });
//     //    const uri = image.path;
//     //    const uriParts = uri.split('.');
//     //    const filename = uriParts[uriParts.length - 1];
//     //    const res = await RNFS.uploadFiles({
//     //      toUrl: `${config.apiHost}/asset`,
//     //      files: [
//     //        {
//     //          name: image.filename ? image.filename : `photo.${filename}`,
//     //          filename: image.filename ? image.filename : `photo.${filename}`,
//     //          filepath:
//     //            Platform.OS === 'ios'
//     //              ? image.path
//     //              : image.path.replace('file://', ''),
//     //        },
//     //      ],
//     //      method: 'POST',
//     //      headers: {
//     //        'x-access-token': `${parsedToken}`,
//     //      },
//     //    }).promise;

//     //    const parsedData = JSON.parse(res.body);
//     //    if (strictValidObjectWithKeys(parsedData.data)) {
//     //      setUserDetails({
//     //        ...userProfileDetails,
//     //        uploading: false,
//     //        profile: parsedData.data._id,
//     //        profileImage: Platform.OS === 'ios' ? image.sourceURL : image.path,
//     //      });
//     //    }
//     //  });
//   };
//   return (
//     <View>
//       <Text />
//     </View>
//   );
// };

// export default UploadImage;
