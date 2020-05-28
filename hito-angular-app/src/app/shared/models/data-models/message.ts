import { User } from './user.model';

export interface Message {
  sender: User;
  postTime: Date;
  text: string;
}
