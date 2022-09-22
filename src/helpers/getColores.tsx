import ImageColors from "react-native-image-colors";
import { AndroidImageColors, IOSImageColors } from "react-native-image-colors/lib/typescript/types";

export const getColors = async (uri:string) => {

    const colors : any = await ImageColors.getColors(uri,{});
    let primary;
    let secondary;

    switch(colors.platform){
        case "android":
            primary= colors.dominant;
            secondary= colors.average;
            break;
        case "ios":
            primary= colors.primary;
            secondary= colors.secondary;
            break;
        default:
            throw new Error('Unexpected platform');
    }

    return [ primary, secondary];
  }
