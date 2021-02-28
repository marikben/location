import React, { useEffect, useState} from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker} from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('Haaga-Helia');
  const [lat, setLat] = useState(60.200692);
  const [lng, setLng] = useState(24.934302);
  const [loc, setLocation] = useState(null);
  useEffect(() => {
    getLocation();
  }, []);
  
  const getLocation = async ()  => {
    
    const { status } = await Location.requestPermissionsAsync();
    if (status!== 'granted') {Alert.alert('No permission to  access location');
    }
    else{let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setLng(location.coords.longitude)
    setLat(location.coords.latitude)
  }
  };
 

  async function getGeo () {
    const url = 'https://www.mapquestapi.com/geocoding/v1/address?key=sktxN6Y2N6YQm33QCP1JFWxnENA5Q5Op&inFormat=kvp&outFormat=json&location=';
    
    try{
      const response = await fetch(url+address);
      const data = await response.json();
      setTitle(data.results[0].providedLocation.location);
      setLat(data.results[0].locations[0].displayLatLng.lat);
      setLng(data.results[0].locations[0].displayLatLng.lng)
     
    }
    catch (error) {
    setGeo('Error', error);
    };

    
  }

  return (
    <View style={styles.container}>
      <Text>Kartta-APP
      </Text>
      <MapView style={styles.map}
      region={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0322,
        longitudeDelta:0.0221,}} >
        <Marker 
        coordinate={{
        latitude: lat, 
        longitude: lng}}
        title={title}/></MapView>
            <TextInput style={styles.input} value={address} placeholder="Type your address here" onChangeText={address => setAddress(address)}></TextInput>
            <Button style={styles.button} title="SHOW" onPress={getGeo}></Button>
        </ View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  map: {
    width: 400,
    height: 400,
  },
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5,
    height: 40, 
    width: 400
  },
  button: {
    alignSelf: 'stretch'
  }
});
