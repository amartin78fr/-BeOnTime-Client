/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Modal,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
let ScreenHeight = Dimensions.get('window').height;

const ModalList = ({closeModal, data}) => {
  const [listData, setListData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setListData(data);
  }, [data]);

  const selectContact = (item) => {
    closeModal({
      item: item,
    });
  };

  const closeModalAction = () => {
    closeModal({
      ivrListVisible: false,
    });
  };

  const handleSearch = (text) => {
    const newData = listData.filter((item) => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setListData(newData);
  };

  useEffect(() => {
    handleSearch(searchText);
  }, [searchText]);

  return (
    <Modal
      propagateSwipe={50}
      animationType="slide"
      transparent={true}
      visible={true}
      coverScreen={true}
      onRequestClose={() => {}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            margin: 0,
            backgroundColor: '#fff',
            borderRadius: 6,
            padding: 15,
            paddingTop: 40,
            width: '100%',
            height: ScreenHeight,
            flex: 1,
          }}>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              position: 'relative',
              right: 0,
              top: 0,
              zIndex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              textAlign: 'center',
            }}
            onPress={() => {
              closeModalAction(false);
            }}>
            <Image
              source={require('../assets/images/close.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>

          <View
            style={{
              backgroundColor: '#fff',
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              value={searchText}
              onChangeText={(queryText) => {
                setSearchText(queryText);
              }}
              placeholder="Search by Name"
              placeholderTextColor="#000"
              style={{
                color: '#000',
                width: '100%',
                height: 40,
                paddingHorizontal: 20,
                borderRadius: 25,
                borderColor: '#0253B3',
                borderWidth: 1,
                backgroundColor: '#fff',
              }}
            />
          </View>
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{
                marginBottom: 80,
              }}
              data={listData}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      borderRadius: 10,
                      marginTop: 5,
                      marginBottom: 10,
                      backgroundColor: 'grey',
                      shadowColor: '#000',
                      shadowOpacity: 0.23,
                      shadowRadius: 2.62,
                      elevation: 4,
                      shadowOffset: {height: 2, width: 0},
                    }}>
                    <TouchableOpacity
                      style={{
                        width: '100%',
                      }}
                      onPress={() => {
                        selectContact(item);
                      }}>
                      <View
                        style={[
                          {
                            width: '100%',
                          },
                        ]}>
                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            padding: 15,
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#000',
                              marginRight: 25,
                              marginLeft: 4,
                            }}>
                            {item.name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
              numColumns={1}
              keyExtractor={(item, index) => {
                return 'key-' + index.toString();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalList;
