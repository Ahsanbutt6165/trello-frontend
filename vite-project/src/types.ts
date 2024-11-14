export interface Card {
  _id?: string; 
  title: string;
  description?: string;
}

export interface Task {
  _id: string; 
  title: string;
  description?: string;
  cards?: Card[]; 
}

export interface Board {
  _id?: string; 
  title: string;
  tasks?: Task[]; 
  createdAt?: string
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}
export interface AuthState {
  user: any;
  isAuth: boolean;
  btnLoading: boolean;
  loading: boolean;
  error: string | null;
}

export interface BoardState {
  boards: Board[];
  selectedBoard: Board | null;
  
  loading: boolean;
}
