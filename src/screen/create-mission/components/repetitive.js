import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {Block, Button, CustomButton, Text} from '../../../components';
import {t1, t3, w5} from '../../../components/theme/fontsize';

const RepetitiveType = ({state, setValues, closeModal}) => {
  const [agent, setAgent] = useState({
    name: state.name,
    value: state.value,
  });
  const languageMode = useSelector((v) => v.languageReducer.language);
  const {SameDay, Done, SelectRepetiveMission, Week} = languageMode;

  const _renderItem = ({item}) => {
    return (
      <CustomButton
        margin={[t1, 0]}
        onPress={() => setAgent(item)}
        center
        borderRadius={10}
        middle
        color={item.name === agent.name ? '#000' : '#F5F7FA'}
        padding={[t1 * 1.5]}>
        <Text color={item.name === agent.name ? '#fff' : '#8A8E99'} size={16}>
          {item.name}
        </Text>
      </CustomButton>
    );
  };
  return (
    <Block padding={[t3, w5]}>
      <Text margin={[t1]} semibold center size={22}>
        {SelectRepetiveMission}
      </Text>
      <FlatList
        data={[
          {
            name: SameDay,
            value: 'same day',
          },
          {
            name: Week,
            value: 'week',
          },
        ]}
        renderItem={_renderItem}
      />
      <Button
        disabled={!agent.name}
        onPress={() => {
          setValues(agent);
          closeModal();
        }}
        color="secondary">
        {Done}
      </Button>
    </Block>
  );
};

export default RepetitiveType;
