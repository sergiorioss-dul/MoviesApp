import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Text, Dimensions, StyleSheet, View, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RootStackParams } from '../navigation/Navigation';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { };

export const DetailScreen = ({ route, navigation }: Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const { cast, movieFull, isLoading } = useMovieDetails(movie.id);

  return (
    <ScrollView>
      <View style={styles.backButton}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
        >
          <Icon
            color="white"
            name="arrow-back-outline"
            size={50}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.imageborder}>

          <Image
            source={{ uri }}
            style={styles.posterImage}
          />
        </View>
      </View>
      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
        {
          isLoading ? <ActivityIndicator size={30} color="grey" style={{ marginTop: 20 }} />
            : <MovieDetails movieFull={movieFull!}  {...{ cast }} />
        }

      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
  },
  posterImage: {
    flex: 1,
  },
  imageborder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20
  },
  subTitle: {
    fontSize: 18
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  backButton: {
    flex:0.35,
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    left: 10,
    top:20
  }
});
