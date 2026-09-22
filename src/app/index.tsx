import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const events = [
  {
    id: "1",
    title: "Pickup Soccer",
    descriptions: "Saturday at 5:00 PM",
    latitude: 32.8328,
    longitude: -117.2713,
    attending: 7,
  },
  {
    id: "2",
    title: "Casual Pickleball",
    description: "Sunday at 4:00 PM",
    latitude: 32.838,
    longitude: -117.276,
    attending: 3,
  },

]

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 32.8328,
          longitude: -117.2713,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        }}
      >
        {events.map((event) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.latitude,
              longitude: event.longitude,
            }}
            title={event.title}
            description={event.description}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>{event.attending}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },

  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  marker: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D99BE8",
    borderWidth: 3,
    borderColor: "#222222",
  },

  markerText: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "bold",
  },
});