import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import {Height, Sizes, Width} from '../Constants/Size';
import PopUpMenu from '../Menu/OrganizationWorkshopCardPopUpMenu';
import {GREY_IMAGE, PROFILE_IMAGE} from '../Constants/sample';
// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import {commaSeperator} from '../Utils/Numbers';
import {useStateValue} from '../Store/StateProvider';
import Axios from '../Utils/Axios';
import Divider from '../Components/Divider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {Cash, Clock, ForwardArrow, People, Tag} from './Icons';
import CustomButton from './CustomButton';
const ICON_SIZE = Width * 0.07;

type cardProps = {
  name: string;
  label: string | number;
  cash?: boolean;
};
const InternshipCardIcons: FC<cardProps> = ({name, label, cash}) => {
  const {theme} = useStateValue()[0];

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      {cash ? (
        <Cash size={1} color={theme.GREEN_COLOR} />
      ) : (
        <Ionicons name={name} size={ICON_SIZE} color={theme.GREEN_COLOR} />
      )}
      <View style={styles.iconTextContainer}>
        <Text
          style={[
            styles.iconText,
            {
              color: theme.TEXT_COLOR,
            },
          ]}>
          {label}
        </Text>
      </View>
    </View>
  );
};

type props = {
  navigation: any;
  internshipDetail: any;
};
const StudentInternshipCard: FC<props> = ({navigation, internshipDetail}) => {
  const [{theme}, dispatch] = useStateValue();

  const handleDelete = () => {
    console.log('Handling workshop delete');
  };

  const handleEdit = () => {
    navigation.navigate('InternshipScreens', {
      screen: 'Create_Edit_Internship',
      params: {
        ID: internshipDetail.id,
        method: 'edit',
      },
    });
  };

  return (
    <View
      style={[
        styles.parent,
        {
          shadowColor: theme.SHADOW_COLOR,
          backgroundColor: theme.CARD_BACKGROUND_COLOR,
        },
      ]}>
      <View style={[styles.topicContainer, styles.center]}>
        {/* name of the project  */}
        <View style={styles.topicTextContainer}>
          <Text style={[styles.topicText, {color: theme.TEXT_COLOR}]}>
            {internshipDetail.topic}
          </Text>
        </View>
        {/* menu icon  */}
        <View style={styles.popUpIconContainer}>
          <PopUpMenu
            navigation={navigation}
            editable={internshipDetail.status !== 'Ended'}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </View>
      </View>
      {/* workshop poster  */}

      {/* if workshop is paid */}
      <View style={{marginTop: 10}}>
        {internshipDetail.is_paid ? (
          <View style={styles.iconContainer}>
            <InternshipCardIcons
              cash
              name={'cash-outline'}
              label={`Rs ${commaSeperator(internshipDetail.charges)}`}
            />
          </View>
        ) : (
          <View style={styles.iconContainer}>
            <InternshipCardIcons cash name={'cash-outline'} label={`Free`} />
          </View>
        )}
        {/* if the workshop is open to join  */}
        {internshipDetail.status === 'Open' &&
        internshipDetail.days_left !== 0 ? (
          <View style={styles.iconContainer}>
            <InternshipCardIcons
              name={'time-outline'}
              label={`${internshipDetail.days_left}${' '}${
                internshipDetail.days_left !== 1 ? 'days' : 'day'
              } left `}
            />
          </View>
        ) : (
          <View style={styles.iconContainer}>
            <InternshipCardIcons
              name={'information-circle-outline'}
              label={`Closed `}
            />
          </View>
        )}

        <View style={{marginTop: 5, marginHorizontal: Width * 0.04}}>
          <InternshipCardIcons name={'people-sharp'} label={'0 Participants'} />
        </View>
      </View>
      {/* apply now button  */}
      <View style={styles.detailsButtonContainer}>
        <CustomButton
          children={
            <View style={styles.buttonIconContainer}>
              <ForwardArrow size={0.75} />
            </View>
          }
          text={'Details'}
          textSize={Sizes.normal * 0.9}
          onPress={() => {
            navigation.navigate('WorkshopScreens', {
              screen: 'WorkshopTab',
              params: {
                ID: internshipDetail.id,
              },
            });
          }}
          width={Width * 0.3}
          height={Height * 0.055}
        />
      </View>
    </View>
  );
};

export default StudentInternshipCard;

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.03,
    // marginVertical: Width * 0.01,
    // minHeight: Height * 0.35,
    // maxHeight: Height * 0.8,
    borderRadius: 10,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 5,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    minHeight: Height * 0.08,
    maxHeight: Height * 0.15,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 7,
  },
  headerImageContainer: {
    // width: Width * 0.3,
    flex: 0.2,
  },
  headerTextContainer: {
    // width: Width * 0.6,
    flex: 0.7,
    flexDirection: 'column',
  },
  headerIconContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  userImage: {
    height: Height * 0.07,
    width: Width * 0.14,
    borderRadius: 40,
  },
  username: {
    fontSize: Sizes.large * 0.9,
    fontWeight: 'bold',
  },
  date: {
    fontSize: Sizes.normal * 0.75,
  },
  topicContainer: {
    marginBottom: 10,

    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
  },
  topicTextContainer: {
    flex: 0.92,
    alignItems: 'center',
    marginLeft: Width * 0.1,
  },
  popUpIconContainer: {
    flex: 0.08,
  },
  topicText: {
    fontSize: Sizes.normal * 1.2,
    fontFamily: 'OpenSans-Bold',
  },
  descriptionText: {
    fontSize: Sizes.normal,
    lineHeight: 24,
  },
  posterContainer: {
    marginHorizontal: 0,
    marginTop: 10,
  },
  iconContainer: {
    marginVertical: 5,
    marginHorizontal: Width * 0.04,
  },
  iconTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  iconText: {
    fontSize: Sizes.normal * 0.9,
    paddingHorizontal: 5,
  },
  detailsButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonIconContainer: {
    justifyContent: 'center',
    marginHorizontal: 2,
    alignItems: 'center',
  },
});
