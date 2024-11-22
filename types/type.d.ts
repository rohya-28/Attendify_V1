import { TextInputProps, TouchableOpacityProps } from "react-native";
declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
  width?: string;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  error?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  role: `'ADMIN' | 'STUDENT'`;
}

export interface LectureData {
  subjectName: string;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
}

export interface UserStore {
  token: string;
  role: string;
  userId: string;
  organizationId: string;
  setToken: (token: string) => void;
  setRole: (role: string) => void;
  setUserId: (userId: string) => void;
  setOrganizationId: (organizationId: string) => void;
}

export interface SessionValues {
  teacherId: string;
  lectureId: string;
  isActive: true;
}

export interface Attendance {
  studentId: string;
  lectureId: string;
  attendanceCode: string;
  isPresent: boolean;
}
