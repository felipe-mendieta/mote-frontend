export interface Room {
  _id:       string;
  name:      string;
  users:     any[];
  code:      string;
  status:    boolean;
  endedAt?:  null;
  createdAt: Date;
  __v:       number;
}
export interface JoinRoom{
  roomCode: string | undefined;
  token: string | undefined;
  userId: string | null;  //for save the userId into room table
}
//interface for exists room
export interface RoomExists {
  ok:     boolean;
  token: string;
  error?: string;
  roomId:  string;
  userId:  string;

}

