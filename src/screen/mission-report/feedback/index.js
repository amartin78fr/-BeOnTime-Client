import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Block, Button, Input, Text} from '../../../components';
import {t1, t2, w3} from '../../../components/theme/fontsize';
import StarRating from 'react-native-star-rating';
import CommonApi from '../../../utils/CommonApi';
import {Alerts, strictValidObjectWithKeys} from '../../../utils/commonUtils';
import {light} from '../../../components/theme/colors';
import {useSelector} from 'react-redux';

const Feedback = ({mission, close, feedback}) => {
  const [rating, setRating] = useState(
    strictValidObjectWithKeys(feedback) ? feedback.rating : 1,
  );
  const [message, setMessage] = useState(
    strictValidObjectWithKeys(feedback) ? feedback.message : '',
  );
  const [loader, setloader] = useState(false);
  const languageMode = useSelector((state) => state.languageReducer.language);

  const {ShareConclusion, Submit} = languageMode;
  const submitReport = () => {
    setloader(true);
    const data = {
      mission_id: mission.id,
      rating: rating,
      message: message,
    };
    CommonApi.fetchAppCommon('/customer/feedback', 'post', JSON.stringify(data))
      .then((response) => {
        if (response.status === 1) {
          setloader(false);
          Alerts('Success', response.message, light.success);
          close();
        }
      })
      .catch(() => {});
  };

  return (
    <Block flex={false} padding={[t1, w3]} margin={[t2, 0]}>
      <Text
        transform="capitalize"
        semibold>{`${mission.agent.username} feedback`}</Text>
      <Text margin={[hp(0.8), 0, 0]} grey size={14}>
        {ShareConclusion}
      </Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={rating}
        selectedStar={(v) => setRating(v)}
        fullStarColor={'#000'}
        starSize={50}
        activeOpacity={0.7}
        fullStar={require('../../../assets/icons/starS.png')}
        emptyStar={require('../../../assets/icons/staru.png')}
        containerStyle={{
          width: wp(60),
          marginTop: hp(1),
        }}
      />
      <Input
        placeholder="comment"
        multiline={true}
        onChangeText={(a) => setMessage(a)}
        value={message}
        style={{
          height: hp(15),
        }}
      />
      <Button
        isLoading={loader}
        onPress={() => submitReport()}
        disabled={!message}
        color="secondary">
        {Submit}
      </Button>
    </Block>
  );
};

export default Feedback;
