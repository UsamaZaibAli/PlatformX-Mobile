import React, {FC, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {Height, Sizes, Width} from '../Constants/Size';
// import {darkColors} from '../Constants/Colors';
import Axios from '../Utils/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStateValue} from '../../src/Store/StateProvider';
import Loading from '..//Components/Loading';

type props = {
  isShow: boolean;
  toggleModal: () => void;
};

const SignOutModal: FC<props> = ({isShow, toggleModal}) => {
  const [{theme}, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    // set the loading to true
    setLoading(true);
    // clear local storage tokens
    AsyncStorage.setItem('access', '')
      .then(() => AsyncStorage.setItem('refresh', ''))
      .then(() => {
        // close the modal
        toggleModal();
        //   set loading to false
        setLoading(false);
        // call the local state
        dispatch({type: 'SET_SIGN_OUT'});
      });
  };
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}>
    <Modal
      isVisible={isShow}
      style={[styles.Modalparent, {backgroundColor: theme.BACKGROUND_COLOR}]}
      animationIn={'slideInUp'}
      animationInTiming={300}
      animationOut={'slideOutDown'}
      animationOutTiming={200}
      backdropColor={'#575959'}
      backdropOpacity={0.3}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}>
      <>
        {/* heading container  */}
        <View
          style={[
            styles.headingContainer,
            {borderBottomColor: theme.SHADOW_COLOR},
          ]}>
          <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
            Sign Out of PlatformX ?{' '}
          </Text>
        </View>
        {/* description container  */}
        <View style={styles.descriptionContainer}>
          <Text style={[styles.descriptionText, {color: theme.TEXT_COLOR}]}>
            Are you sure that you want to sign out?{' '}
          </Text>
        </View>

        {!loading ? (
          <View style={styles.buttonsContainer}>
            {/*  buttons  */}
            <TouchableOpacity
              onPress={toggleModal}
              style={[styles.Button, {backgroundColor: theme.BADGE_COLOR}]}>
              <Text
                style={[styles.buttonText, {color: theme.BACKGROUND_COLOR}]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSignOut()}
              style={[styles.Button, {backgroundColor: theme.BADGE_COLOR}]}>
              <Text
                style={[styles.buttonText, {color: theme.BACKGROUND_COLOR}]}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Loading size={'small'} />
          </View>
        )}
      </>
    </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  Modalparent: {
    // flex: 1,
    maxHeight: Height * 0.3,
    borderRadius: 20,
    borderWidth: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderColor: 'transparent',
    // margin: 0,
    // marginTop: Height * 0.28,
    // marginBottom: Height * 0.28,
    marginVertical: Height * 0.3,
  },
  headingContainer: {
    flex: 0.25,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    borderBottomWidth: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  heading: {
    fontSize: Sizes.large * 1.3,
  },
  descriptionContainer: {
    flex: 0.5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: Sizes.normal,
  },
  scroll: {
    marginHorizontal: 20,
    // marginVertical: 5,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    // backgroundColor: 'grey',
  },

  buttonsContainer: {
    flex: 0.25,
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'center',
  },
  Button: {
    width: Width * 0.35,
    marginHorizontal: 10,
    height: Width * 0.1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: Sizes.normal,
  },
});
export default SignOutModal;
