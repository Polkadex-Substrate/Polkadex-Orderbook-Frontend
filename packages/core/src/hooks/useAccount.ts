import { useProfile } from "@/providers/user/profile";
import { useAuth } from "@/providers/user/auth";

export function useAccount() {
  const { email, userConfirmed, onLogout } = useAuth();
  const {
    authInfo: { isAuthenticated: isSignedIn },
  } = useProfile();
  const isVerified = userConfirmed;

  return {
    userEmail: email,
    isSignedIn,
    isVerified,
    logout: () => onLogout(),
  };
}
