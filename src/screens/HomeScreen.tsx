import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, StatusBar, Text, View } from 'react-native';
import { useMovies } from '../hooks/useMovies';
import { MoviePoster } from '../components/MoviePoster';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';

const { width: windowWidth } = Dimensions.get('window');

export const HomeScreen = () => {

  const uri = 'https://www.hdimages.pics/images/quotes/english/general/black-pug-in-black-background-52650-310722.jpg';
  const { nowPlaying,popular,topRated,upcoming,isLoading } = useMovies();
  const { top } = useSafeAreaInsets();
  const { _setColors } = useContext(GradientContext)

  const getPosterColors = async (index:number) => {
    const uri = `https://image.tmdb.org/t/p/w500/${nowPlaying[index].poster_path}`;
    const [ primary, secondary ] = await getColors(uri);
    _setColors({ primary, secondary });
  }

  useEffect(() => {
    if(nowPlaying.length > 0){
      getPosterColors(0);
    }
    
  }, [])
  

  if(isLoading){
    return (
      <View style={{ flex:1,justifyContent:'center',alignContent:'center'}}>
        <ActivityIndicator color="red" size={100}/>
      </View>
    )
  }

  StatusBar.setBarStyle('light-content',true);

  return (
    <GradientBackground>
    <ScrollView>
      <View style={{ marginTop: top + 20}}>

        {/* CAROUSEL PRINCIPAL */}
        <View style={{height: 440}}>
          <Carousel 
            onSnapToItem={ index => getPosterColors(index)}
            data={nowPlaying!}
            renderItem={ ({ item }:any) => <MoviePoster  movie={item}/> }
            itemWidth={ 300 }
            sliderWidth={ windowWidth }
          />
        </View>

        {/* Peliculas populares */}
        <HorizontalSlider
          title='Populares'
          movies={popular}
        />

        {/* Peliculas populares */}
        <HorizontalSlider 
          movies={topRated}
          title="Top Rated"
        />

        {/* Peliculas populares */}
        <HorizontalSlider 
          movies={upcoming}
          title="Proximamente"
        />
        

      </View>
    </ScrollView>
    </GradientBackground>
  )
}
