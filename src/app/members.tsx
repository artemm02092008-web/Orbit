import { useRouter } from "expo-router";
import MembersScreen from "../screens/MembersScreen";

export default function MembersPage() {
  const router = useRouter();

  return (
    <MembersScreen
      onBack={() => router.back()}
      onOpenChat={(userId: string) => {
        router.push(`/chat/${userId}` as any);
      }}
      onStartCall={(userId: string) => {
        router.push({
          pathname: "/call",
          params: { targetId: userId }
        } as any);
      }}
    />
  );
}