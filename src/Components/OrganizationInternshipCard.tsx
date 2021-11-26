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
import PopUpMenu from '../Menu/OrganizationInternshipCardPopUpMenu';
import {GREY_IMAGE, PROFILE_IMAGE} from '../Constants/sample';
// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import {commaSeperator} from '../Utils/Numbers';
import {useStateValue} from '../Store/StateProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Cash, Clock, ForwardArrow, People, Tag} from './Icons';
import CustomButton from './CustomButton';
const ICON_SIZE = Width * 0.07;

type cardProps = {
  name: string;
  label: string | number;
  cash?: boolean;
  duration?: boolean;
};
const InternshipCardIcons: FC<cardProps> = ({name, label, cash, duration}) => {
  const {theme} = useStateValue()[0];

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      {cash ? (
        <Cash size={1} color={theme.GREEN_COLOR} />
      ) : duration ? (
        <MaterialCommunityIcons
          name={name}
          size={ICON_SIZE}
          color={theme.GREEN_COLOR}
        />
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
const OrganizationInternshipCard: FC<props> = ({
  navigation,
  internshipDetail,
}) => {
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
      <View style={styles.container}>
        {/* content  */}
        <View style={[styles.nameContainer, styles.center]}>
          {/* name of the project  */}
          <View style={styles.nameTextContainer}>
            <Text style={[styles.nameText, {color: theme.TEXT_COLOR}]}>
              Looking for {internshipDetail.name}
            </Text>
          </View>

          {/* menu icon  */}
          <View style={styles.popUpIconContainer}>
            <PopUpMenu
              navigation={navigation}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              editable={internshipDetail.status !== 'Ended'}
            />
          </View>
        </View>

        <View style={[styles.descriptionContainer, styles.center]}>
          {/* description of the project  */}
          <Text style={[styles.descriptionText, {color: theme.TEXT_COLOR}]}>
            {internshipDetail.description}
          </Text>
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
              label={`Stipend Rs ${commaSeperator(internshipDetail.stipend)}`}
            />
          </View>
        ) : (
          <View style={styles.iconContainer}>
            <InternshipCardIcons cash name={'cash-outline'} label={`Free`} />
          </View>
        )}
        {/* if the intenrship is open to apply  */}
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
          <InternshipCardIcons
            name={'briefcase-clock-outline'}
            duration
            label={`Duration ${internshipDetail.duration} Months`}
          />
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
            navigation.navigate('InternshipScreens', {
              screen: 'InternshipTab',
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

export default OrganizationInternshipCard;

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.03,
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
  container: {
    marginVertical: 10,
  },
  popUpIconContainer: {
    flex: 0.08,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  nameTextContainer: {
    flex: 0.92,
    alignItems: 'center',
    marginLeft: Width * 0.1,
  },
  nameText: {
    fontSize: Sizes.normal * 1.2,
    flexShrink: 1,
    textAlign: 'center',
  },
  descriptionContainer: {
    marginTop: 10,
    marginHorizontal: Width * 0.04,
  },
  descriptionText: {
    fontSize: Sizes.normal * 0.8,
    lineHeight: 20,
    textAlign: 'center',
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
