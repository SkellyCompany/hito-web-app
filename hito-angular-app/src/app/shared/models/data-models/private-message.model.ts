import { User } from './user.model';

export interface PrivateMessage {
  sender: User;
  postTime: Date;
  text: string;
}
