import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = ({ navigation }) => {
  const { userData, logout } = useContext(AuthContext);

  // 2. STATE UNTUK STATUS TOMBOL CHECK-IN
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // 3. STATE UNTUK JAM DIGITAL
  const [currentTime, setCurrentTime] = useState("Memuat jam...");

  // 4. STATE & REF UNTUK CATATAN
  const [note, setNote] = useState("");
  const noteInputRef = useRef(null);

  // Simulasi stats karena data dipindah ke HistoryScreen
  const attendanceStats = useMemo(() => {
    return { totalPresent: 12, totalAbsent: 2 };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("id-ID"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    if (isCheckedIn) return Alert.alert("Perhatian", "Anda sudah Check In.");

    if (note.trim() === "") {
      Alert.alert("Peringatan", "Catatan kehadiran wajib diisi!");
      noteInputRef.current.focus();
      return;
    }

    setIsCheckedIn(true);
    Alert.alert("Sukses", `Berhasil Check In pada pukul ${currentTime}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Attendance App</Text>
          <Text style={styles.clockText}>{currentTime}</Text>

          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Student Card */}
        <View style={styles.card}>
          <View style={styles.icon}>
            <MaterialIcons name="person" size={40} color="#555" />
          </View>
          <View>
            <Text style={styles.name}>
              {userData?.mhsName || "Budi Susanto"}
            </Text>
            <Text>NIM : {userData?.mhsNim || "0325260031"}</Text>
            <Text>Class : {userData?.prodi || "Informatika-2B"}</Text>
          </View>
        </View>

        {/* Today's Class */}
        <View style={styles.classCard}>
          <Text style={styles.subtitle}>Today's Class</Text>
          <Text>Mobile Programming</Text>
          <Text>08:00 - 10:00</Text>
          <Text>Lab 3</Text>

          {!isCheckedIn && (
            <TextInput
              ref={noteInputRef}
              style={styles.inputCatatan}
              placeholder="Tulis catatan (cth: Hadir lab)"
              value={note}
              onChangeText={setNote}
            />
          )}

          <TouchableOpacity
            style={[
              styles.button,
              isCheckedIn ? styles.buttonDisabled : styles.buttonActive,
            ]}
            onPress={handleCheckIn}
            disabled={isCheckedIn}
          >
            <Text style={styles.buttonText}>
              {isCheckedIn ? "CHECKED IN" : "CHECK IN"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Statistik Kehadiran */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {attendanceStats.totalPresent}
            </Text>
            <Text style={styles.statLabel}>Total Present</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: "red" }]}>
              {attendanceStats.totalAbsent}
            </Text>
            <Text style={styles.statLabel}>Total Absent</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  clockText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    fontVariant: ["tabular-nums"],
  },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fee",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  classCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  button: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonActive: {
    backgroundColor: "#007AFF",
  },

  buttonDisabled: {
    backgroundColor: "#A0C4FF",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  course: {
    fontSize: 16,
    fontWeight: "500",
  },

  date: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },

  noteHistory: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
    fontStyle: "italic",
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  present: {
    color: "green",
    fontWeight: "bold",
  },

  absent: {
    color: "red",
    fontWeight: "bold",
  },

  inputCatatan: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
    backgroundColor: "#fafafa",
  },

  statsCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  statBox: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },

  statLabel: {
    fontSize: 14,
    color: "gray",
  },

  logoutButton: {
    marginLeft: 12,
    backgroundColor: "#d9534f",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default HomeScreen;
