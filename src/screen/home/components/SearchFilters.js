import {FieldArray, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {
  Block,
  Text,
  ImageComponent,
  Checkbox,
  Button,
  CustomButton,
} from '../../../components';
import {light} from '../../../components/theme/colors';
import {t1, t2, t3, w1} from '../../../components/theme/fontsize';
import {
  strictValidArrayWithLength,
  strictValidString,
} from '../../../utils/commonUtils';
// import {AgentsTypeFilter} from '../../../utils/data';

const SearchFilters = ({state, setState, isvehicle}) => {
  const [type, setType] = useState();
  const [sendData, setData] = useState([]);
  const [isVehicle, setIsVehicle] = useState(isvehicle);
  const [stateAgents, setStateAgents] = useState([]);
  const languageMode = useSelector((v) => v.languageReducer.language);

  const {
    Agents,
    PersonaliseResults,
    SearchFiltersHeader,
    Hostesses,
    Done,
    SelectAtLeastOne,
    HasVehicle,
    BodyguardNoWeapon,
    DogHandler,
  } = languageMode;

  const AgentsTypeFilter = [
    {
      name: 'SSIAP 1',
      value: 1,
      width: 28,
    },
    {
      name: 'SSIAP 2',
      value: 2,
      width: 28,
    },
    {
      name: 'SSIAP 3',
      value: 3,
      width: 28,
    },
    {
      name: 'ADS',
      value: 4,
      width: 28,
    },
    {
      name: BodyguardNoWeapon,
      value: 5,
      width: 50,
    },
    {
      name: DogHandler,
      value: 6,
      width: 40,
    },
  ];
  const onSubmit = (values) => {
    if (type === 'agent') {
      const newRes = values && values.agents.join(',');
      setState({newRes: newRes, isVehicle: isVehicle});
    } else {
      const newRes = sendData && sendData.join(',');
      setState({newRes: newRes, isVehicle: isVehicle});
    }
  };
  useEffect(() => {
    if (state === '7') {
      setType('hostess');
    } else if (strictValidString(state)) {
      setType('agent');
      setStateAgents(state.split`,`.map((x) => +x));
    } else {
      setType('');
    }
  }, [state]);
  return (
    <Block flex={false} padding={[t3]}>
      <Text semibold margin={[t1, 0, 0]}>
        {SearchFiltersHeader}
      </Text>
      <Block margin={[t1, 0, 0, 0]} flex={false} row center>
        <Text size={16} grey>
          {PersonaliseResults}
        </Text>
      </Block>

      <Block flex={false}>
        <Formik
          enableReinitialize
          initialValues={{
            agents: state === '7' ? [] : stateAgents,
          }}
          onSubmit={onSubmit}
          render={({values, handleSubmit, resetForm, setFieldValue}) => {
            return (
              <>
                <CustomButton
                  onPress={() => {
                    if (type === 'hostess') {
                      setType('');
                      setData([]);
                    } else {
                      setType('hostess');
                      setData([7]);
                      setFieldValue('agents', []);
                    }
                  }}
                  margin={[t1, 0, 0, 0]}
                  flex={false}
                  row
                  center>
                  <ImageComponent
                    name={
                      type === 'hostess'
                        ? 'hostess_icon_selected'
                        : 'hostess_icon'
                    }
                    height="40"
                    width="40"
                  />
                  <Text margin={[0, w1]} size={16} grey>
                    {Hostesses}
                  </Text>
                </CustomButton>
                <CustomButton
                  onPress={() => {
                    if (type === 'agent') {
                      setType('');
                    } else {
                      setType('agent');
                    }
                  }}
                  margin={[0, 0, 0, 0]}
                  flex={false}
                  row
                  center>
                  <ImageComponent
                    name={
                      type === 'agent' ? 'agent_icon_selected' : 'agent_icon'
                    }
                    height="40"
                    width="40"
                  />
                  <Text margin={[0, w1]} size={16} grey>
                    {Agents}
                  </Text>
                </CustomButton>
                {type === 'agent' && (
                  <Block flex={false} row wrap>
                    <FieldArray
                      name="agents"
                      render={(arrayHelpers) => {
                        return (
                          <>
                            {AgentsTypeFilter.map((item) => {
                              return (
                                <Checkbox
                                  onChange={(e) => {
                                    if (e.checked) {
                                      arrayHelpers.push(item.value);
                                    } else {
                                      const idx = values.agents.indexOf(
                                        item.value,
                                      );
                                      arrayHelpers.remove(idx);
                                    }
                                  }}
                                  checked={
                                    strictValidArrayWithLength(values.agents) &&
                                    values.agents.indexOf(item.value) > -1
                                  }
                                  containerStyle={[
                                    containerStyle,
                                    {
                                      width: widthPercentageToDP(item.width),
                                      marginLeft: widthPercentageToDP(1),
                                    },
                                  ]}
                                  checkboxStyle={{height: 25, width: 25}}
                                  label={item.name}
                                  numberOfLabelLines={2}
                                />
                              );
                            })}
                          </>
                        );
                      }}
                    />
                  </Block>
                )}
                <Checkbox
                  onChange={(e) => {
                    if (e.checked) {
                      setIsVehicle(1);
                    } else {
                      setIsVehicle(0);
                    }
                  }}
                  checked={isVehicle === 1 ? true : false}
                  containerStyle={[
                    containerStyle,
                    {marginLeft: widthPercentageToDP(1)},
                  ]}
                  checkboxStyle={{height: 25, width: 25}}
                  label={HasVehicle}
                  numberOfLabelLines={2}
                  labelStyle={{fontSize: 16, color: light.subtitleColor}}
                />
                {!strictValidString(type) ? (
                  <Text size={16} grey margin={[t2, 0, 0, 0]} center>
                    {SelectAtLeastOne}
                  </Text>
                ) : (
                  <Button
                    onPress={handleSubmit}
                    style={{marginTop: t2}}
                    color="secondary">
                    {Done}
                  </Button>
                )}
              </>
            );
          }}
        />
      </Block>
    </Block>
  );
};
const containerStyle = {marginTop: t1};
export default SearchFilters;
