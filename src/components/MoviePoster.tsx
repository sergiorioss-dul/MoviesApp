import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Movie } from '../interfaces/movieInterface'

interface Props {
    movie: Movie;
    height?:number;
    width?: number;
}


export const MoviePoster = ({ movie, height = 420, width = 300  } : Props) => {
    const { poster_path } = movie;
    const uri = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
        onPress={() => navigation.navigate('DetailScreen',movie)}
        activeOpacity={0.8}
        style={{
            width,
            height,
            marginHorizontal:8,
            paddingBottom: 20,
            paddingHorizontal: 7
        }}
    >
        <Image 
            source={{uri}}
            style={styles.image}
        />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
     image: {
        flex: 1,
        borderRadius: 18,
        shadowOffset: {
            width:0,
            height:2
        },
        shadowOpacity: 0.9,
        shadowRadius:3.84,
        elevation:5
     }
});