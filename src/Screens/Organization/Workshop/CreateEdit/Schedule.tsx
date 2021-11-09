import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../../../../Components/CustomButton';
import CustomTextField from '../../../../Components/CustomTextField2';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import CheckBox from '../../../../Components/CheckBox';
import {hackathonThemeTags} from '../../../../Constants/sample';
import HelpText from '../../../../Components/HelpText';
import DateTimePicker from '../../../../Components/DateTimePicker';
import {Calendar, Clock} from '../../../../Components/Icons';

type props = {};
const General: FC<props> = () => {
  const {theme} = useStateValue()[0];

  const [Input, setInput] = useState({
    event_date: {value: new Date().toLocaleDateString(), error: ''},
    start_time: {value: new Date().toLocaleTimeString(), error: ''},
    end_time: {value: new Date().toLocaleTimeString(), error: ''},
  });
  const [loading, setLoading] = useState(false);
  const [modal, setmodal] = useState<{
    isShown: boolean;
    mode: 'date' | 'time' | 'datetime';
    type: 'start' | 'end';
  }>({
    isShown: false,
    mode: 'date',
    type: 'start',
  });

  const handleSave = () => {
    if (!loading) {
      // setLoading(true);
      // check field validations here
      // make api call here
    }
  };
  return (
    <View style={styles.parent}>
      <DateTimePicker
        open={modal.isShown}
        date={new Date()}
        mode={modal.mode}
        setDate={response => {
          // hide modal first
          setmodal(props => {
            return {
              ...props,
              isShown: false,
            };
          });

          //   get type of modal
          const {mode, type} = modal;
          const getDate = new Date(response).toLocaleDateString();
          const getTime = new Date(response).toLocaleTimeString();

          if (mode === 'date') {
            setInput(props => {
              return {
                ...props,
                event_date: {
                  value: getDate,
                  error: '',
                },
              };
            });
          } else {
            if (mode === 'time' && type === 'start') {
              setInput(props => {
                return {
                  ...props,
                  start_time: {
                    value: getTime,
                    error: '',
                  },
                };
              });
            }
            if (mode === 'time' && type === 'end') {
              setInput(props => {
                return {
                  ...props,
                  end_time: {
                    value: getTime,
                    error: '',
                  },
                };
              });
            }
          }
        }}
        cancel={() =>
          setmodal(props => {
            return {
              ...props,
              isShown: false,
            };
          })
        }
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          horizontal={false}>
          {/* event date container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Event Date
              </Text>
            </View>
            <View style={styles.center}>
              <TouchableOpacity
                onPress={() =>
                  setmodal(props => {
                    return {
                      ...props,
                      isShown: true,
                      mode: 'date',
                      type: 'start',
                    };
                  })
                }
                style={[
                  styles.cardContainer,
                  {
                    backgroundColor: theme.CARD_BACKGROUND_COLOR,
                    width: Width * 0.65,
                  },
                ]}>
                <View style={styles.cardTextContainer}>
                  <Text style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
                    {Input.event_date.value}
                  </Text>
                </View>
                <View style={styles.cardIconContainer}>
                  <Calendar size={0.9} color={theme.GREEN_COLOR} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* start time container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Start Time
              </Text>
            </View>
            <View style={styles.center}>
              <TouchableOpacity
                onPress={() =>
                  setmodal(props => {
                    return {
                      ...props,
                      isShown: true,
                      mode: 'time',
                      type: 'start',
                    };
                  })
                }
                style={[
                  styles.cardContainer,
                  {
                    backgroundColor: theme.CARD_BACKGROUND_COLOR,
                    width: Width * 0.65,
                  },
                ]}>
                <View style={styles.cardTextContainer}>
                  <Text style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
                    {Input.start_time.value}
                  </Text>
                </View>
                <View style={styles.cardIconContainer}>
                  <Clock size={0.9} color={theme.GREEN_COLOR} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* end time container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                End Time
              </Text>
            </View>
            <View style={styles.center}>
              <TouchableOpacity
                onPress={() =>
                  setmodal(props => {
                    return {
                      ...props,
                      isShown: true,
                      mode: 'time',
                      type: 'end',
                    };
                  })
                }
                style={[
                  styles.cardContainer,
                  {
                    backgroundColor: theme.CARD_BACKGROUND_COLOR,
                    width: Width * 0.65,
                  },
                ]}>
                <View style={styles.cardTextContainer}>
                  <Text style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
                    {Input.end_time.value}
                  </Text>
                </View>
                <View style={styles.cardIconContainer}>
                  <Clock size={0.9} color={theme.GREEN_COLOR} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomButton
        text={'Save and Continue'}
        onPress={handleSave}
        loading={loading}
      />
    </View>
  );
};

export default General;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    marginHorizontal: Width * 0.04,
    marginTop: Height * 0.025,
  },
  screenName: {
    fontSize: Sizes.large * 1.1,
  },
  scroll: {
    marginTop: Height * 0.003,
  },
  container: {
    marginTop: 10,
  },
  headingContainer: {
    marginVertical: 2,
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  inputContainer: {
    marginTop: 4,
  },
  checkBoxContainer: {
    marginTop: 10,
    marginLeft: 5,
    flexDirection: 'row',
  },
  checkBoxText: {
    fontSize: Sizes.normal * 0.8,
  },
  cardContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
  },
  cardTextContainer: {
    flex: 0.85,
    alignItems: 'center',
  },
  cardIconContainer: {
    flex: 0.15,
    marginLeft: 8,
  },
  cardText: {
    fontSize: Sizes.normal,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});