import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, ImageBackground, StatusBar, SafeAreaView, Image } from 'react-native';
import axios from 'axios';
export default class MeteorScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            meteors : {}
        }
    }

    componentDidMount(){
        this.getMeteors();
    }

    getMeteors = ()=>{
        axios.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=tEFnbbPxKYdV8HHwYrFQKiBkzauqun1qUWtAVDo4")
        .then(response =>{
            this.setState ({ meteors : response.data})
        })
        .catch(error =>{
            Alert.alert(error.message)
        })
    }


    render() {
        if(Object.keys(this.state.meteors).length === 0){
            return (
                <View>
                <Text>Loading.</Text>
                <Text>Loading..</Text>
                <Text>Loading...</Text>
                </View>
            )
        }
        else{

        let meteorArray = Object.keys(this.state.meteors).map(meteorDate=>{
            return (
                this.state.meteors[meteorDate]
            )
        })

            let meteors = [].concat.apply([], meteorArray);
//threat score = diameter/distance by which the meteor misses earth
            // diameter = (min + max) /2
            meteors.forEach(function(element) {
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max ) / 2;
                let threatScore = (diameter / close_approach_data[0].miss_distance.kilometers) * 1000000000;
                element.threat_Score = threatScore
                
            })
            

          
            

        return (
            <View
                style = {styles.container}>
                <Text style = {styles.title}>Meteor Screen!</Text>
            </View>
        )
    }
}

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    title: {
        marginTop: 20,
    }
  });

  
  