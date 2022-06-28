import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { fetchOpenWeather, getGPSCoords } from '../API/APIgeodirect';
import Icon from '../../react-native-weather-icons/weatherIcon';
import { iconsSet, atmosphere } from '../constant/iconsSet';

const Homescreen = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState('')
  const icon = atmosphere.includes(data.weather[0].main) ? iconsSet["Clouds"] : iconsSet[data.weather[0].main]
  useEffect(() => {
    const asyncBootstrap = async () => {
      try {
        const coords = await getGPSCoords()
        const data = await fetchOpenWeather(coords)
        console.log("data", data);
        setData(data)
      } catch (err) {
        console.log("erreur", err);
      } finally {
        setLoading(false)
      }
    }
    asyncBootstrap()
  }, [])

  const handleSearch = async () => {
    try {
      const coords = await getGPSCoords(city)
      const data = await fetchOpenWeather(coords)
      console.log("data", data);
      setData(data)
    } catch (err) {
      console.log("erreur", err);
    }
  }

  return (
    loading
      ? <ActivityIndicator />
      : (
        <SafeAreaView>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Noyon'
              style={styles.input}
              value={city}
              onChangeText={(text) => {
                setCity(text)
              }}
            />
            <TouchableOpacity style={styles.button}
            onPress={handleSearch}
            >
              <Text style={styles.buttonText}>Chercher ?</Text>
            </TouchableOpacity>

          </View>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.icon}><Icon name={icon} size={40} /></Text>
          <Text style={[styles.title, styles.temp]}>{Math.round(data.main.temp)}°C</Text>
          <Text style={styles.title}>{data.weather[0].description}</Text>
          <View style={styles.details}>
            <View style={styles.item}>
              <Icon name="wi-strong-wind" size={40} />
              <Text>Vent</Text>
              <Text>{data.wind.speed}</Text>
            </View>
            <View style={styles.item}>
              <Icon name="wi-barometer" size={40} />
              <Text>Pression</Text>
              <Text>{data.main.pressure}</Text>
            </View>
            <View style={styles.item}>
              <Icon name="wi-humidity" size={40} />
              <Text>Humidité</Text>
              <Text>{data.main.humidity}</Text>

            </View>
          </View>
        </SafeAreaView>
      )

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold'
  },
  temp: {
    color: 'grey',
    fontSize: 34,

  },
  details: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    borderWidth: .5,
    borderColor: 'grey',
    elevation: 2,
    padding: 10,
    marginVertical: 15
  },
  icon: {
    textAlign: 'center'
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    flex: 1
  },
  inputContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    paddingHorizontal: 15
  },
  button: {
    padding: 10,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bold'
  }
});
export default Homescreen;