export type SignInProps = {
  isLoading?: boolean;
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
  isFormValid: () => void;
  refreshError: () => void;
  changePassword: (value: string) => void;
  changeEmail: (value: string) => void;
  onSignIn?: () => void;
};
