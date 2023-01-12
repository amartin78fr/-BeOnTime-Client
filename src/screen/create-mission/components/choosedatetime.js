import React, {useRef, useState} from 'react';
import {
  Block,
  Button,
  CustomButton,
  Text,
  ImageComponent,
} from '../../../components';
import {
  RobotoMedium,
  RobotoBold,
  t3,
  w5,
  t1,
} from '../../../components/theme/fontsize';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Dimensions, FlatList} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
const dataNum = [
  '1:00',
  '2:00',
  '3:00',
  '4:00',
  '5:00',
  '6:00',
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '24:00',
];

const ChooseDateTime = ({
  dateState,
  timeState,
  setTimeValues,
  setDateValues,
  closeModal,
}) => {
  const {width} = Dimensions.get('window');
  const flatlistRef = useRef();
  const [day, setday] = useState(new Date());
  const [time, settime] = useState();
  const [markedDates, setMarkedDates] = useState({});
  LocaleConfig.locales[LocaleConfig.defaultLocale].dayNamesShort = [
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S',
  ];

  const _renderItem = ({item, index}) => {
    return (
      <CustomButton
        onPress={() => {
          settime(item);

          flatlistRef.current &&
            flatlistRef.current.scrollToIndex({
              animated: true,
              index,
              viewOffset: Dimensions.get('window').width / 2.7,
            });
        }}
        margin={[t1, 0]}
        center
        middle
        padding={[t1 * 1.5]}>
        <Text
          semibold={time === item && '#000'}
          color={time === item && '#000'}
          grey
          size={20}>
          {item}
        </Text>
      </CustomButton>
    );
  };
  return (
    <Block padding={[t3, w5]}>
      <Calendar
        theme={{
          backgroundColor: '#000',
          calendarBackground: '#ffffff',
          todayTextColor: '#000',
          dayTextColor: '#000',
          textDisabledColor: '#d9e1e8',
          monthTextColor: '#000',
          textMonthFontFamily: RobotoMedium,
          textDayHeaderFontFamily: RobotoMedium,
          textDayFontSize: 16,
          textMonthFontSize: 18,
          selectedDayBackgroundColor: '#57B9BB',
          selectedDayTextColor: '#000',
          textDayHeaderFontSize: 12,
          textDayStyle: {
            color: '#000',
          },
          'stylesheet.calendar.header': {
            week: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderColor: '#E9EBF3',
              paddingTop: 20,
              paddingBottom: 20,
              color: '#000',
              marginTop: 10,
              alignItems: 'center',
              marginLeft: 20,
              fontFamily: RobotoBold,
            },
            monthText: {
              fontFamily: RobotoMedium,
              fontSize: 20,
            },
            dayHeader: {
              color: '#000',
            },
          },
          'stylesheet.day.basic': {
            text: {
              marginTop: 15,
              color: '#000',
            },
            selectedText: {
              marginTop: 5,
            },
            base: {
              height: 48,
            },
          },
        }}
        current={day}
        minDate={new Date()}
        maxDate={'2030-01-01'}
        monthFormat={'MMMM, yyyy'}
        markingType={'custom'}
        markedDates={{
          [markedDates]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: '#000',
            selectedTextColor: '#fff',
            customStyles: {
              container: {
                color: '#fff',
                height: 48,
                width: 48,
                alignItems: 'center',
                justifyContent: 'center',
              },
              text: {
                color: '#fff',
              },
            },
          },
        }}
        onDayPress={(day) => {
          setMarkedDates(day.dateString);
        }}
        renderArrow={(direction) => {
          return direction === 'right' ? (
            <ImageComponent name="arrow_right_icon" height="20" width="20" />
          ) : (
            <ImageComponent name="arrow_left_icon" height="20" width="20" />
          );
        }}
        firstDay={1}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        enableSwipeMonths={true}
      />
      <Block margin={[t1, 0, 0]} flex={false} center middle>
        <ImageComponent name="selected_icon" height="15" width="15" />
      </Block>
      <FlatList
        ref={flatlistRef}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        data={dataNum}
        renderItem={_renderItem}
        decelerationRate={0}
        snapToInterval={
          widthPercentageToDP(90) -
          (widthPercentageToDP(40) + widthPercentageToDP(40))
        }
        snapToAlignment={'center'}
        // contentInset={{
        //   top: 0,
        //   left: widthPercentageToDP(45),
        //   bottom: 0,
        //   right: widthPercentageToDP(45),
        // }}
      />
      <Button
        onPress={() => {
          setDateValues(markedDates);
          setTimeValues(time);
          closeModal();
        }}
        disabled={!markedDates || !time}
        color="secondary">
        Done
      </Button>
    </Block>
  );
};

export default ChooseDateTime;
