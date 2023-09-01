import React from 'react'
import {Text,View,StyleSheet,TextInput,Image} from 'react-native'
import logo from '../assets/searchicon.png'
import { useRecoilState } from 'recoil'
import { WallpaperInputText } from '../Atoms/WallpaperInputText'


function Navbar() {
  
const [SearchValue,setSearchValue] = useRecoilState(WallpaperInputText)

  onChangeTextinput=(text)=>{
    setSearchValue(text);
   // console.log(SearchValue);
  }
  return (
    <View style={styles.container}>
    
    <View style={styles.searchContainer}>
    <Image source={logo} style={styles.icon}/>
      <TextInput  onChangeText={this.onChangeTextinput} style={styles.TextInputs}
        placeholder='Search Anything....'/>
    </View>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
   width:'100%',
   padding:10,
   alignItems:'center'
  },
  icon :{
    height:17,
    width:17 ,
  },
  searchContainer:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'white',
    elevation:10,
    padding:10,
    borderRadius:10,
    width:'90%'
  },
  TextInputs:{
    width:'90%',
    paddingLeft:10,
    fontSize:16
  }
});
