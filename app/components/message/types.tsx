export interface MessageProps {
  messageData: MessageType;
}

export interface MessageType {
  content: string;
  role: "user" | "assistant";
  sessionId: string;
}
