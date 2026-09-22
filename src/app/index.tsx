import { useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";

type SportEvent = {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  attending: number;
};

type Location = {
  latitude: number;
  longitude: number;
};

const initialEvents: SportEvent[] = [
  {
    id: "1",
    title: "Pickup Soccer",
    description: "Saturday at 5:00 PM",
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
  
  const [events, setEvents] = useState<SportEvent[]>(initialEvents); 
  
  const [modalVisible, setModalVisible] = useState(false); 
  const [selectingLocation, setSelectingLocation] = useState(false);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  //function to 
  function openCreateEvent() {
    setTitle("");
    setDescription("");
    setSelectedLocation(null);
    setSelectingLocation(false);
    setModalVisible(true);
  }

  function closeCreateEvent() {
    setModalVisible(false);
    setSelectingLocation(false);
    setSelectedLocation(null);
  }

  function beginLocationSelection() {
    if (!title.trim()) {
      Alert.alert("Missing title", "Please enter an event title first.");
      return;
    }

    setModalVisible(false);
    setSelectingLocation(true);
  }

  function handleMapPress(event: MapPressEvent) {
    if (!selectingLocation) {
      return;
    }

    const coordinate = event.nativeEvent.coordinate;

    setSelectedLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });

    setSelectingLocation(false);
    setModalVisible(true);
  }

  function createEvent() {
    if (!title.trim()) {
      Alert.alert("Missing title", "Please enter an event title.");
      return;
    }

    if (!selectedLocation) {
      Alert.alert(
        "Missing location",
        "Choose a location on the map before creating the event."
      );
      return;
    }

    const newEvent: SportEvent = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim() || "No description provided",
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      attending: 1,
    };

    setEvents((currentEvents) => [...currentEvents, newEvent]);
    setModalVisible(false);
    setSelectedLocation(null);
    setTitle("");
    setDescription("");
  }
  
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
        onPress={handleMapPress}
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

        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            pinColor="#32C7D0"
            title="New event location"
          />
        )}
      </MapView>

      {selectingLocation && (
        <View style={styles.locationBanner}>
          <Text style={styles.locationBannerText}>
            Tap the map to choose an event location
          </Text>

          <Pressable
            style={styles.cancelSelectionButton}
            onPress={() => {
              setSelectingLocation(false);
              setModalVisible(true);
            }}
          >
            <Text style={styles.cancelSelectionText}>Cancel</Text>
          </Pressable>
        </View>
      )}

      {!selectingLocation && (
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={openCreateEvent}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeCreateEvent}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create an Event</Text>

            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Example: Pickup Soccer"
              value={title}
              onChangeText={setTitle}
              maxLength={60}
            />

            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Add a time, skill level, or other details"
              value={description}
              onChangeText={setDescription}
              multiline
              maxLength={250}
              textAlignVertical="top"
            />

            <Pressable
              style={styles.locationButton}
              onPress={beginLocationSelection}
            >
              <Text style={styles.locationButtonText}>
                {selectedLocation
                  ? "Change Map Location"
                  : "Choose Map Location"}
              </Text>
            </Pressable>

            {selectedLocation && (
              <Text style={styles.locationSelectedText}>
                Location selected
              </Text>
            )}

            <View style={styles.modalActions}>
              <Pressable
                style={styles.cancelButton}
                onPress={closeCreateEvent}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.createButton,
                  !selectedLocation && styles.disabledButton,
                ]}
                onPress={createEvent}
              >
                <Text style={styles.createButtonText}>Create Marker</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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

  addButton: {
    position: "absolute",
    right: 24,
    bottom: 24,
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#55D3DC",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },

  addButtonText: {
    color: "#111111",
    fontSize: 42,
    fontWeight: "300",
    lineHeight: 46,
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
  },

  locationBanner: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#222222",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  locationBannerText: {
    flex: 1,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },

  cancelSelectionButton: {
    marginLeft: 12,
    padding: 6,
  },

  cancelSelectionText: {
    color: "#D99BE8",
    fontWeight: "700",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },

  modalContent: {
    padding: 24,
    paddingBottom: 40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#ffffff",
  },

  modalTitle: {
    marginBottom: 22,
    color: "#111111",
    fontSize: 24,
    fontWeight: "700",
  },

  inputLabel: {
    marginBottom: 7,
    color: "#333333",
    fontSize: 14,
    fontWeight: "600",
  },

  input: {
    marginBottom: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 12,
    backgroundColor: "#F8F8F8",
    color: "#111111",
    fontSize: 16,
  },

  descriptionInput: {
    minHeight: 100,
  },

  locationButton: {
    alignItems: "center",
    padding: 14,
    borderWidth: 2,
    borderColor: "#55D3DC",
    borderRadius: 12,
  },

  locationButtonText: {
    color: "#16777E",
    fontSize: 16,
    fontWeight: "700",
  },

  locationSelectedText: {
    marginTop: 9,
    color: "#238B45",
    textAlign: "center",
    fontWeight: "600",
  },

  modalActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },

  cancelButton: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#EEEEEE",
  },

  cancelButtonText: {
    color: "#333333",
    fontWeight: "700",
  },

  createButton: {
    flex: 1.5,
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#D99BE8",
  },

  createButtonText: {
    color: "#111111",
    fontWeight: "700",
  },

  disabledButton: {
    opacity: 0.45,
  },
});