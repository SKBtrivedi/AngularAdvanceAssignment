export interface Comment {
    id: number;
    author: string;
    text: string;
    date: Date;
    likes: number;
    replies: Comment[];
    showReplyBox?: boolean; // Tracks visibility of the reply box
    newReply?: string ; // Holds the content of the new reply
  }
  