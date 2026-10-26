import React, { useState } from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text, Modal, TextInput, Alert, ScrollView
} from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();
  const [isCreateServerVisible, setIsCreateServerVisible] = useState(false);
  const [newServerName, setNewServerName] = useState('');
  const [servers, setServers] = useState([
    { id: 'srv_1', name: 'Мастерская', shortName: 'МС' },
    { id: 'srv_2', name: 'Клуб Дизайна', shortName: 'КД' },
    { id: 'srv_3', name: 'Программирование Топ', shortName: 'ПТ' },
  ]);
  const [activeServerId, setActiveServerId] = useState('srv_1');

  const handleCreateServer = () => {
    if (newServerName.trim() === '') return Alert.alert('Ошибка', 'Введите название');
    const shortName = newServerName.trim().substring(0, 2).toUpperCase();
    setServers([...servers, { id: `srv_${Date.now()}`, name: newServerName.trim(), shortName }]);
    setNewServerName('');
    setIsCreateServerVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* САЙДБАР */}
      <View style={styles.leftSidebarContainer}>
        <ScrollView contentContainerStyle={styles.sidebarScroll}>
          {servers.map(server => {
            const isActive = server.id === activeServerId;
            return (
              <TouchableOpacity
                key={server.id}
                style={isActive ? [styles.sidebarIcon, styles.sidebarIconActive] : styles.sidebarIcon}
                onPress={() => setActiveServerId(server.id)}
              >
                {isActive && <View style={styles.activeIndicator} />}
                <Text style={styles.sidebarText}>{server.shortName}</Text>
              </TouchableOpacity>
            );
          })}
          <View style={styles.sidebarDivider} />
          <TouchableOpacity style={styles.sidebarAddButton} onPress={() => setIsCreateServerVisible(true)}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M12 5v14M5 12h14" stroke="#8A56FF" strokeWidth={2.5} strokeLinecap="round" />
            </Svg>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* КОНТЕНТ (Здесь мы просто говорим "Загрузи страницу каналов или участников") */}
      <View style={styles.screenWrapperWithSidebar}>
        {/* Если вы на странице /members, этот App.tsx не должен перекрывать её. 
            Но для работы expo-router, он просто оставляет пустое место или рендерит дефолт. */}
      </View>

      {/* ТАББАР */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/workshop')}>
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#8A56FF" strokeWidth={2} />
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/members')}>
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#8A56FF" strokeWidth={2} />
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => Alert.alert('Уведомления')}>
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#656469" strokeWidth={2} />
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/profile')}>
          <View style={styles.tabAvatar}><Text style={styles.tabAvatarText}>AK</Text></View>
        </TouchableOpacity>
      </View>

      {/* МОДАЛКА */}
      <Modal transparent visible={isCreateServerVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Создать сервер</Text>
            <TextInput style={styles.textInput} value={newServerName} onChangeText={setNewServerName} placeholder="Имя" placeholderTextColor="#656469" />
            <TouchableOpacity style={styles.submitBtn} onPress={handleCreateServer}>
              <Text style={styles.submitBtnText}>Создать</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsCreateServerVisible(false)}>
              <Text style={styles.cancelBtnText}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Стили оставляем ваши
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0E13', flexDirection: 'row' },
  leftSidebarContainer: { width: 60, backgroundColor: '#16151B', borderRightWidth: 1, borderRightColor: '#1A1920', zIndex: 10 },
  sidebarScroll: { alignItems: 'center', paddingTop: 16 },
  sidebarIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#232229', justifyContent: 'center', alignItems: 'center', marginBottom: 12, position: 'relative' },
  sidebarIconActive: { borderRadius: 14, backgroundColor: '#8A56FF' },
  activeIndicator: { position: 'absolute', left: -8, width: 4, height: 24, backgroundColor: '#FFF', borderTopRightRadius: 4, borderBottomRightRadius: 4 },
  sidebarDivider: { width: 32, height: 2, backgroundColor: '#232229', marginBottom: 12 },
  sidebarText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
  sidebarAddButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#232229', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderStyle: 'dashed', borderColor: '#8A56FF' },
  screenWrapperWithSidebar: { flex: 1, paddingBottom: 60 },
  tabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, backgroundColor: '#121118', borderTopWidth: 1, borderTopColor: '#1A1920', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', zIndex: 999 },
  tabItem: { padding: 12 },
  tabAvatar: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#8A56FF', justifyContent: 'center', alignItems: 'center' },
  tabAvatarText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalContent: { width: '100%', backgroundColor: '#16151B', borderRadius: 20, padding: 24, borderWidth: 1, borderColor: '#232229' },
  modalTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  textInput: { backgroundColor: '#1A1920', color: '#FFF', padding: 14, borderRadius: 12, fontSize: 16, marginBottom: 24, borderWidth: 1, borderColor: '#232229' },
  submitBtn: { backgroundColor: '#8A56FF', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  submitBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  cancelBtn: { padding: 12, alignItems: 'center' },
  cancelBtnText: { color: '#656469', fontSize: 15, fontWeight: '500' },
});