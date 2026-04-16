// import React, { useState, useEffect, useMemo, useRef } from "react";
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
//   Alert,
//   TextInput,
// } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";

// // Data awal (Initial State)
// const initialHistory = [
//   {
//     id: "1",
//     course: "Pemrograman Mobile",
//     date: "2026-03-01",
//     status: "Present",
//   },
//   {
//     id: "2",
//     course: "Database System",
//     date: "2026-03-02",
//     status: "Present",
//   },
// ];

// const Home = () => {
//   // 1. STATE UNTUK RIWAYAT PRESENSI
//   const [historyData, setHistoryData] = useState(initialHistory);

//   // 2. STATE UNTUK STATUS TOMBOL CHECK-IN
//   const [isCheckedIn, setIsCheckedIn] = useState(false);

//   // 3. STATE UNTUK JAM DIGITAL
//   const [currentTime, setCurrentTime] = useState("Memuat jam...");

//   // 4. STATE & REF UNTUK CATATAN
//   const [note, setNote] = useState("");
//   const noteInputRef = useRef(null);

//   // 5. OPTIMASI KOMPUTASI DENGAN useMemo
//   const attendanceStats = useMemo(() => {
//     console.log("Menghitung ulang statistik kehadiran...");

//     const presentCount = historyData.filter(
//       (item) => item.status === "Present",
//     ).length;
//     const absentCount = historyData.filter(
//       (item) => item.status === "Absent",
//     ).length;

//     return { totalPresent: presentCount, totalAbsent: absentCount };
//   }, [historyData]);

//   // EFEK SIKLUS HIDUP (Mounting & Unmounting)
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const timeString = new Date().toLocaleTimeString("id-ID", {
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//       });

//       setCurrentTime(timeString);
//     }, 1000);

//     // CLEANUP
//     return () => clearInterval(timer);
//   }, []);

//   // FUNGSI LOGIKA ABSEN
//   const handleCheckIn = () => {
//     if (isCheckedIn) {
//       Alert.alert("Perhatian", "Anda sudah melakukan Check In.");
//       return;
//     }

//     // Validasi catatan menggunakan useRef
//     if (note.trim() === "") {
//       Alert.alert("Peringatan", "Catatan kehadiran wajib diisi!");
//       noteInputRef.current?.focus();
//       return;
//     }

//     const newAttendance = {
//       id: Date.now().toString(),
//       course: "Mobile Programming",
//       date: new Date().toLocaleDateString("id-ID"),
//       status: "Present",
//       note: note,
//     };

//     setHistoryData([newAttendance, ...historyData]);
//     setIsCheckedIn(true);

//     Alert.alert("Sukses", `Berhasil Check In pada pukul ${currentTime}`);
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
//       <View>
//         <Text style={styles.course}>{item.course}</Text>
//         <Text style={styles.date}>{item.date}</Text>
//         {item.note ? (
//           <Text style={styles.noteHistory}>Catatan: {item.note}</Text>
//         ) : null}
//       </View>

//       <View style={styles.statusContainer}>
//         <MaterialIcons
//           name={item.status === "Present" ? "check-circle" : "cancel"}
//           size={20}
//           color={item.status === "Present" ? "green" : "red"}
//         />
//         <Text
//           style={item.status === "Present" ? styles.present : styles.absent}
//         >
//           {" "}
//           {item.status}
//         </Text>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.content}>
//         <View style={styles.headerRow}>
//           <Text style={styles.title}>Attendance App</Text>
//           <Text style={styles.clockText}>{currentTime}</Text>
//         </View>

//         {/* Student Card */}
//         <View style={styles.card}>
//           <View style={styles.icon}>
//             <MaterialIcons name="person" size={40} color="#555" />
//           </View>

//           <View>
//             <Text style={styles.name}>Budi Susanto</Text>
//             <Text>NIM : 0325260031</Text>
//             <Text>Class : Informatika-2B</Text>
//           </View>
//         </View>

//         {/* Today's Class */}
//         <View style={styles.classCard}>
//           <Text style={styles.subtitle}>Today's Class</Text>
//           <Text>Mobile Programming</Text>
//           <Text>08:00 - 10:00</Text>
//           <Text>Lab 3</Text>

//           {!isCheckedIn && (
//             <TextInput
//               ref={noteInputRef}
//               style={styles.inputCatatan}
//               placeholder="Tulis catatan (cth: Hadir lab)"
//               value={note}
//               onChangeText={setNote}
//             />
//           )}

//           <TouchableOpacity
//             style={[
//               styles.button,
//               isCheckedIn ? styles.buttonDisabled : styles.buttonActive,
//             ]}
//             onPress={handleCheckIn}
//             disabled={isCheckedIn}
//           >
//             <Text style={styles.buttonText}>
//               {isCheckedIn ? "CHECKED IN" : "CHECK IN"}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Statistik Kehadiran */}
//         <View style={styles.statsCard}>
//           <View style={styles.statBox}>
//             <Text style={styles.statNumber}>
//               {attendanceStats.totalPresent}
//             </Text>
//             <Text style={styles.statLabel}>Total Present</Text>
//           </View>

//           <View style={styles.statBox}>
//             <Text style={[styles.statNumber, { color: "red" }]}>
//               {attendanceStats.totalAbsent}
//             </Text>
//             <Text style={styles.statLabel}>Total Absent</Text>
//           </View>
//         </View>

//         {/* Attendance History */}
//         <View style={styles.classCard}>
//           <Text style={styles.subtitle}>Attendance History</Text>

//           <FlatList
//             data={historyData}
//             keyExtractor={(item) => item.id}
//             renderItem={renderItem}
//             scrollEnabled={false}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },

//   content: {
//     padding: 20,
//     paddingBottom: 40,
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },

//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },

//   clockText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#007AFF",
//     fontVariant: ["tabular-nums"],
//   },

//   card: {
//     flexDirection: "row",
//     backgroundColor: "white",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20,
//   },

//   icon: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#fee",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 15,
//   },

//   name: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },

//   classCard: {
//     backgroundColor: "white",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20,
//   },

//   subtitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },

//   button: {
//     marginTop: 10,
//     padding: 10,
//     borderRadius: 8,
//     alignItems: "center",
//   },

//   buttonActive: {
//     backgroundColor: "#007AFF",
//   },

//   buttonDisabled: {
//     backgroundColor: "#A0C4FF",
//   },

//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//   },

//   item: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "white",
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 8,
//   },

//   course: {
//     fontSize: 16,
//     fontWeight: "500",
//   },

//   date: {
//     fontSize: 12,
//     color: "gray",
//     marginTop: 2,
//   },

//   noteHistory: {
//     fontSize: 12,
//     color: "#555",
//     marginTop: 4,
//     fontStyle: "italic",
//   },

//   statusContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   present: {
//     color: "green",
//     fontWeight: "bold",
//   },

//   absent: {
//     color: "red",
//     fontWeight: "bold",
//   },

//   inputCatatan: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     marginTop: 15,
//     backgroundColor: "#fafafa",
//   },

//   statsCard: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     backgroundColor: "white",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20,
//   },

//   statBox: {
//     alignItems: "center",
//   },

//   statNumber: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "green",
//   },

//   statLabel: {
//     fontSize: 14,
//     color: "gray",
//   },
// });

// export default Home;
