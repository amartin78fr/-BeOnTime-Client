import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Block, Text} from '.';
import Button from './Button';
import {t3, w2} from './theme/fontsize';

const AlertCompnent = ({
  visible,
  title,
  description,
  buttonTitle,
  onPress,
  isLoading,
  onRequestClose,
}) => {
  return (
    <Block>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => onRequestClose()}
          style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text semibold style={styles.modalText}>
              {title}
            </Text>
            <Text style={{width: widthPercentageToDP(75)}} center>
              {description}
            </Text>
            <Button
              isLoading={isLoading}
              style={{
                width: widthPercentageToDP(70),
                alignSelf: 'center',
                marginTop: heightPercentageToDP(2),
              }}
              onPress={() => onPress()}
              color="secondary">
              {buttonTitle}
            </Button>
          </View>
        </TouchableOpacity>
      </Modal>
    </Block>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.4)',
  },
  modalView: {
    paddingVertical: t3,
    paddingHorizontal: w2,
    marginHorizontal: widthPercentageToDP(10),
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AlertCompnent;
