import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// @ts-ignore
import { db } from '../firebase/config'; 
import { LiveKitRoom, useRoomContext, useParticipants, useLocalParticipant } from '@livekit/react-native';

// ВСТАВЛЯЕМ ВАШИ ДАННЫЕ И ТОКЕН
const LIVEKIT_URL = "wss://orbit-5k96zdbe.livekit.cloud"; 
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4OTM0NTYwMDAsImlzcyI6IkFQSTU3Q1huYlFkYk1RdSIsInN1YiI6InVzZXIxIiwibmJmIjoxNjAwMDAwMDAwLCJ2aWRlbyI6eyJyb29tIjoidGVzdC1yb29tIiwicm9vbUpvaW4iOnRydWV9fQ.PkM9tl5siDnfe491Z0j-afEEmaucyT0C1YJUb-3qNlo";

export default function CallScreen() {
  const router = useRouter();
  const { targetId } = useLocalSearchParams(); 
  
  const [targetUser, setTargetUser] = useState<any>(null);
  
  const auth = getAuth();
  const myUserId = auth.currentUser?.uid || "unknown";
  const roomId = `call_${myUserId}_${targetId}`; 

  // Загружаем данные собеседника из базы
  useEffect(() => {
    if (!targetId) return;
    const fetchUser = async () => {
      const docRef = doc(db, 'users', targetId as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTargetUser({
          name: data.name || data['Имя_записи'] || 'Пользователь',
          avatar: (data.name || data['Имя_записи'] || '??').substring(0, 2).toUpperCase(),
          photo: data.photoURL || null
        });
      }
    };
    fetchUser();
  }, [targetId]);

  // Создаем комнату в базе
  useEffect(() => {
    if (!myUserId || !targetId) return;
    
    const roomRef = doc(db, 'calls', roomId);
    setDoc(roomRef, {
      status: 'active',
      initiatorId: myUserId,
      receiverId: targetId,
      startedAt: new Date().toISOString(),
    }, { merge: true });

    return () => {
      deleteDoc(roomRef).catch(() => {});
    };
  }, [roomId, myUserId, targetId]);

  return (
    <SafeAreaView style={styles.container}>
      <LiveKitRoom
        serverUrl={LIVEKIT_URL}
        token={TOKEN}
        connect={true}
        audio={true}
        video={false}
        onDisconnected={() => router.back()}
      >
        <CallUI 
          targetUser={targetUser} 
          onEndCall={() => router.back()} 
        />
      </LiveKitRoom>
    </SafeAreaView>
  );
}

// Выносим интерфейс отдельно, чтобы он мог использовать хуки LiveKit
function CallUI({ targetUser, onEndCall }: { targetUser: any, onEndCall: () => void }) {
  const [seconds, setSeconds] = useState(0);
  const participants = useParticipants();
  const { localParticipant } = useLocalParticipant();

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMic = async () => {
    if (localParticipant) {
      await localParticipant.setMicrophoneEnabled(!localParticipant.isMicrophoneEnabled);
    }
  };

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.logoText}>ORBIT CALL</Text>
        <Text style={styles.timer}>{formatTime()}</Text>
      </View>

      <View style={styles.center}>
        <View style={styles.avatarContainer}>
          {targetUser?.photo ? (
            <Image source={{ uri: targetUser.photo }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>{targetUser?.avatar || '??'}</Text>
          )}
        </View>
        
        <Text style={styles.userName}>{targetUser?.name || 'Загрузка...'}</Text>
        <Text style={styles.statusText}>
          {participants.length > 1 ? 'Разговор идет' : 'Ожидание собеседника...'}
        </Text>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.controlBtn} onPress={toggleMic}>
          <View style={[styles.iconCircle, !localParticipant?.isMicrophoneEnabled && styles.mutedCircle]}>
             <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
               <Path d="M12 1a4 4 0 00-4 4v7a4 4 0 008 0V5a4 4 0 00-4-4z" fill="#FFF" />
               <Path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke="#FFF" strokeWidth={2} strokeLinecap="round" />
               {!localParticipant?.isMicrophoneEnabled && <Path d="M3 3l18 18" stroke="#FF3B30" strokeWidth={2} strokeLinecap="round" />}
             </Svg>
          </View>
          <Text style={styles.btnLabel}>{!localParticipant?.isMicrophoneEnabled ? 'Вкл. микро' : 'Микрофон'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlBtn} onPress={onEndCall}>
          <View style={[styles.iconCircle, styles.declineCircle]}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path d="M10.68 13.31a16 16 0 003.48 3.48M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.42 19.42 0 01-3.33-2.67m-2.67-3.34a19.79 19.79 0 01-3.07-8.63A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91M23 1L1 23" stroke="#FFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </View>
          <Text style={styles.btnLabel}>Завершить</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0E13' },
  header: { alignItems: 'center', marginTop: 20 },
  logoText: { color: '#8A56FF', fontSize: 16, fontWeight: 'bold', letterSpacing: 2 },
  timer: { color: '#A3A2A8', fontSize: 18, marginTop: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  avatarContainer: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#232229', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 3, borderColor: '#8A56FF', position: 'relative', overflow: 'hidden' },
  avatarImage: { width: 140, height: 140, borderRadius: 70 },
  avatarText: { color: '#FFF', fontSize: 40, fontWeight: 'bold' },
  userName: { color: '#FFF', fontSize: 26, fontWeight: 'bold' },
  statusText: { color: '#00C853', fontSize: 16, marginTop: 8, fontWeight: '500' },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 50, paddingHorizontal: 40 },
  controlBtn: { alignItems: 'center' },
  iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#1C1B22', justifyContent: 'center', alignItems: 'center' },
  mutedCircle: { backgroundColor: '#5A1A1A' },
  declineCircle: { backgroundColor: '#FF3B30' },
  btnLabel: { color: '#A3A2A8', fontSize: 12, marginTop: 10 },
});