import React,{ createContext, useState } from 'react';
import ImageColors from 'react-native-image-colors';


interface ImageColors {
    primary: string;
    secondary: string;
}

interface ContextProps {
    colors: ImageColors;
    prevColors: ImageColors;
    _setColors: (colors:ImageColors) => void;
    _setPrevColors: (colors:ImageColors) => void
}

export const GradientContext = createContext({} as ContextProps);


export const GradientProvider = ({children} : any) => {

    const [ colors,setColors ] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent'
    });

    const [ prevColors,setPrevColors ] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent'
    });

    const _setColors = (colors: ImageColors) => {
        setColors(colors);
    }

    const _setPrevColors = (colors: ImageColors) => {
        setPrevColors(colors);
    }

    return(
        <GradientContext.Provider
            value={{
                colors,
                prevColors,
                _setColors,
                _setPrevColors
            }}
        >
            { children }
        </GradientContext.Provider>
    );
}
