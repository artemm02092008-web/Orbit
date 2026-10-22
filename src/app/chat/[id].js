import { useLocalSearchParams, useRouter } from "expo-router";
import { useApp } from "../../context/AppContext";
import ChatScreen from "../../screens/ChatScreen";

export default function ChatPage() {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  const { userData } = useApp();

  const channelName = name ? decodeURIComponent(name) : "Канал";

  const channelData = {
    id: id,
    name: channelName,
    username: "channel",
  };

  return (
    <ChatScreen
      visible={true}
      chatId={id}
      recipient={channelData}
      currentUserId={userData?.uid || userData?.id || "me"}
      onClose={() => router.back()}
    />
  );
}
