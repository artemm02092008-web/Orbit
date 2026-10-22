import { useRouter } from "expo-router";
import MembersScreen from "../screens/MembersScreen";

export default function MembersPage() {
  const router = useRouter();

  return (
    <MembersScreen
      onBack={() => router.back()}
      onOpenChat={(userId: string) => {
        // Приводим путь к any, чтобы TS не ругался на динамический ID
        router.push(`/chat/${userId}` as any);
      }}
      onStartCall={(userId: string) => {
        router.push(`/call/${userId}` as any);
      }}
    />
  );
}
