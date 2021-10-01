import React, {FC, useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import HackathonCard from '../../../Components/OrganizationHackathonCard';
import CustomHeader from '../../../Components/CustomHeader';
import CustomSearch from '../../../Components/Search';
import axios from '../../../Utils/Axios';
import {Sizes} from '../../../Constants/Size';
import HackathonSkeleton from '../../../Skeleton/HackathonCardSkeleton';
import {useStateValue} from '../../../Store/StateProvider';

type props = {
  navigation: any;
};

const Hackathons: FC<props> = ({navigation}) => {
  const [Hackathon, setHackathons] = useState([]);
  const [Refreshing, setRefreshing] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);
  const [{theme}, dispatch] = useStateValue();
  const [Searching, setSearching] = useState<{
    isSearching: boolean;
    query: string;
  }>({
    isSearching: false,
    query: '',
  });

  const getData = async () => {
    axios
      .get('/api/hackathon/')
      .then(response => {
        setHackathons(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.log('Error is', error);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getData().then(() => {
      // console.log(Post);
      setRefreshing(false);

      // handle seaching state
      setSearching({
        isSearching: false,
        query: '',
      });
    });
  };

  const handleSearch = (query: string) => {
    // set the searching to true
    setSearching({
      isSearching: true,
      query: query,
    });
    try {
      axios.get(`/api/hackathon/search/?q=${query}`).then(response => {
        setHackathons(response.data);
        setIsLoading(false);
        setSearching(props => {
          return {
            isSearching: false,
            query: props.query,
          };
        });
      });
    } catch (error: any) {
      setSearching(props => {
        return {
          isSearching: false,
          query: props.query,
        };
      });
      ToastAndroid.show(error.data.response.error, 1500);
    }
  };

  useEffect(() => {
    getData();
  }, [IsLoading]);

  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader title={'Hackathons'} navigation={navigation} drawer bell />

      {!IsLoading && (
        <CustomSearch
          placeholder={'Search hackathons'}
          handleSearch={handleSearch}
          showFilterIcon={false}
        />
      )}

      {Searching.isSearching ? (
        <>
          <HackathonSkeleton showSearchSkeleton={!Searching.isSearching} />
        </>
      ) : Hackathon.length > 0 ? (
        <>
          <FlatList
            data={Hackathon}
            // disableVirtualization
            keyExtractor={(item: any, index) => `${item.id}-${index}`}
            renderItem={({item: hackathon, index}: any) => {
              return (
                <HackathonCard
                  key={hackathon?.id}
                  hackathonDetail={hackathon}
                  navigation={navigation}
                />
              );
            }}
            // progressViewOffset={10}
            refreshControl={
              <RefreshControl
                refreshing={Refreshing}
                onRefresh={onRefresh}
                colors={[theme.TEXT_COLOR]}
                progressBackgroundColor={theme.SHADOW_COLOR}
                progressViewOffset={20}
                size={Sizes.large}
              />
            }
            // contentOffset={{y: -300, x: 0}}
          />
          {/* floating action button  */}
          <View
            style={[
              styles.floatingButtonContainer,
              {
                backgroundColor: theme.TOMATO_COLOR,
              },
            ]}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Create_Edit_Post', {
                  screen: 'Create',
                })
              }>
              <Text
                style={[
                  styles.plusText,
                  {
                    color: theme.TEXT_COLOR,
                  },
                ]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : !IsLoading && Hackathon.length === 0 ? (
        <View style={styles.center}>
          <Text style={[styles.noMoreText, {color: theme.TEXT_COLOR}]}>
            {Searching.query !== '' && Hackathon.length === 0
              ? `No result Found for ${Searching.query}`
              : 'No hackathons yet'}
          </Text>
          <TouchableOpacity onPress={() => setIsLoading(true)}>
            <Text style={[styles.refreshText, {color: theme.TOMATO_COLOR}]}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <HackathonSkeleton showSearchSkeleton={!Searching.isSearching} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoreText: {
    fontSize: Sizes.normal,
  },
  refreshText: {
    fontSize: Sizes.normal,
  },
  floatingButtonContainer: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 30,
    bottom: 20,
    right: 12,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: Sizes.large * 1.4,
  },
});

export default Hackathons;
