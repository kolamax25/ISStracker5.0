import React, { Component } from 'react';
import { Text, View , TextInput, StyleSheet ,Alert, ImageBackground,StatusBar,SafeAreaView,Image} from 'react-native';
import axios from 'axios';
import MapView,{Marker} from 'react-native-maps'
import ISSinfo from "../screens/ISSinfo";
export default class IssLocationScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            location : {}
        }
    }

    componentDidMount(){
        this.getIssLocation();
    }

    getIssLocation = ()=>{
        axios.get("https://api.wheretheiss.at/v1/satellites/25544")
        .then(response =>{
            this.setState ({ location : response.data})
        })
        .catch(error =>{
            Alert.alert(error.message)
        })
    }


    render() {
        if(Object.keys(this.state.location).length === 0){
            return (
                <View>
                <Text>Loading.</Text>
                <Text>Loading..</Text>
                <Text>Loading...</Text>
                </View>
            )
        }
        else{

        
        return (
            <View
                style={styles.container}>
                    <ImageBackground source={require("../assets/iss_bg.jpg")} style={styles.bg}>

                    <SafeAreaView style={styles.androidSafeArea}/>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>ISS LOCATION</Text>
                    </View>
               <View style={styles.mapContainer}>
                   <MapView style={styles.map}
                   region={{
                       latitude : this.state.location.latitude,
                       longitude: this.state.location.longitude,
                       latitudeDelta : 100,
                       longitudeDelta : 100
                   }}
                   >
                       <Marker coordinate= {{
                            latitude : this.state.location.latitude,
                            longitude: this.state.location.longitude
                       }}>
                           <Image source={require('../assets/iss_icon.png')} style={{width:40,height:40}}/>
                        </Marker>
                   </MapView>
                   </View>
                  
                   <ISSinfo/>
                  
                   
                </ImageBackground>
            </View>
        )
    }}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      
    },
    bg:{
        flex : 1,
        resizeMode: 'cover'
    },


    androidSafeArea :{
        marginTop: Platform.OS === "android" ?
        StatusBar.currentHeight : 10,
    },
    titleContainer:{
        flex: 0.1,
        justifyContent: "center",
        alignItems : "center"
    },
    titleText:{
        fontSize : 35,
        fontWeight : "bold",
        color : "white"
    },
    mapContainer :{
flex:0.6
    },
    map:{
width: "100%",
height: "100%"
    }
  });
  