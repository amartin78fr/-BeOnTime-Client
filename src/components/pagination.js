import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Block, Text} from './';
import CustomButton from './CustomButton';

const Pagination = ({data, dataPerPage, setPageSize, pageSize}) => {
  const [pageData, setPageData] = useState([]);
  const [active, setActive] = useState(pageSize);
  const flatlistRef = useRef();

  useEffect(() => {
    setActive(pageSize);
  }, [pageSize]);
  useEffect(() => {
    const pageNumbers = [];
    for (let i = 1; i <= dataPerPage; i++) {
      pageNumbers.push(i);
      setPageData(pageNumbers);
    }
  }, [dataPerPage]);
  const _renderItem = ({item, index}) => {
    return (
      <CustomButton
        color={active === item ? '#000' : '#fff'}
        onPress={() => {
          setActive(item);
          setPageSize(item);
          flatlistRef.current?.scrollToIndex({
            animated: true,
            index,
            viewOffset: Dimensions.get('window').width / 2.7,
          });
        }}
        flex={false}
        borderWidth={0.6}
        padding={[heightPercentageToDP(0.5), widthPercentageToDP(2)]}
        margin={[0, widthPercentageToDP(2), 0, 0]}>
        <Text semibold size={16} color={active !== item ? '#000' : '#cccccc'}>
          {item}
        </Text>
      </CustomButton>
    );
  };
  return (
    <Block padding={[0, widthPercentageToDP(3)]} middle flex={false}>
      <FlatList
        ref={flatlistRef}
        horizontal
        data={pageData}
        renderItem={_renderItem}
        contentContainerStyle={{paddingBottom: heightPercentageToDP(1)}}
        pagingEnabled
        decelerationRate={0}
        snapToInterval={
          widthPercentageToDP(90) -
          (widthPercentageToDP(40) + widthPercentageToDP(40))
        }
        snapToAlignment={'center'}
        showsHorizontalScrollIndicator={false}
      />
    </Block>
  );
};

Pagination.defaultProps = {
  dataPerPage: 2,
  data: [],
};

export default Pagination;
