import React, { useEffect , useState } from 'react'
import { View ,Text,StyleSheet, FlatList , Image,TouchableOpacity} from 'react-native'
import { WallpaperInputText } from '../Atoms/WallpaperInputText'
import { useRecoilState } from 'recoil'
import Navbar from './Navbar'


function Screen({navigation}) {

  const accesskey='g0DJwcrry3n-TktCLc3MGXM2U-jIqj37pJbc4cyLfqI';
  const [SearchValue,setSearchValue] = useRecoilState(WallpaperInputText)

  const [ImageCollection, SetImageCollection] = useState({ results: [] });

  useEffect(() => {
    const getimageCollection =async () => {
      let data= await fetch(`https://api.unsplash.com/search/collections?page=1&per_page=30&query=${SearchValue}&client_id=${accesskey}`)
   
   let jsonData = await data.json();
   SetImageCollection(jsonData);
    }

    getimageCollection();
  }, [SearchValue]);

  ImageCollection.total == 0 && setSearchValue('all');

  
  const showWallpaper = (item) => {
   navigation.navigate('S2' ,{clickedImage: `${JSON.stringify(item)}`});
  }
  return (
    <View style={styles.container}>
    <Navbar />
    <Text>Showing result for {SearchValue}</Text>
      <FlatList  
        numColumns={2}   
        data={ImageCollection.results}
        renderItem={({ item }) => 
       <TouchableOpacity  onPress={() => showWallpaper(item)} >

<View style={styles.Imagecontainer}>
        
        <Image source={{ uri: item.cover_photo.urls.regular}} style={styles.image} />
        </View>
       </TouchableOpacity>
        }
      />
    </View>
  )
}

export default Screen


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
   width:'100%',
   height:'100%',
   marginTop:20,
  },
  Imagecontainer:{
    width:170,
    height:400,
    backgroundColor:'white',
    padding:4,
    
  },
  image:{
    width:'100%',
    height:'100%',
    borderRadius:10,
  }
});