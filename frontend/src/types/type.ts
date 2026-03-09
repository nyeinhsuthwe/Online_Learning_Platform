export interface Card {
  _id: string;
  category_id: string;
  title: string;
  topics: string[];
  price: number;
  description: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  course_id: string;
  chapterCount: number;
  episodeCount: number;
  enrollCount: number;
  completedEpisodes: number;
  progress: number
}

export interface CardApiResponse {
  data: Card[];
}

export interface Review {
  _id: string
  user: {
    id: string
    name: string
    avatar?: string
  }
  courseId: string
  rating: number
  comment: string
  createdAt: string
}


export interface Comment {
  _id: string;
  user_id: { _id: string; name: string,   avatar?: string; };
  episode_id: string;
  content: string;
  parent_comment_id: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  replies: Comment[];

}

export interface Enroll {
  _id: string,
  course_id: string,
  user_id: string,
  paymentStatus: string
}

export interface Course {
  _id: string
  category_id: string,
  title: string,
  topics: string[],
  price: number,
  description: string,
  thumbnailUrl: string,
  chapterCount: number,
  episodeCount: number,
  enrollCount: number,
  createdAt: string,
  updatedAt: string,
  __v: number,
  course_id: string
  completedEpisodes: number;
  progress: number;
}

export interface ChatParticipant {
  _id: string;
  name: string;
  avatar?: string;
  role: "user" | "admin";
}

export interface ChatThread {
  _id: string;
  type: "support";
  student_id: ChatParticipant;
  admin_id: ChatParticipant;
  course_id?: string | null;
  episode_id?: string | null;
  last_message: string;
  last_message_at: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  _id: string;
  thread_id: string;
  sender_id: ChatParticipant;
  content: string;
  createdAt: string;
  updatedAt: string;
}
