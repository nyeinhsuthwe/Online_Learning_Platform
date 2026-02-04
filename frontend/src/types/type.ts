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
  enrollCount : number
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
  courseId : string
  rating: number
  comment: string
  createdAt: string
}


export interface Comment {
  _id: string;
  user_id: { _id: string; name: string };
  episode_id: string;
  content: string;
  parent_comment_id: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  replies: Comment[]; 
  avatar?: string;
}

export interface Enroll {
  _id: string,
  course_id: string,
  user_id: string,
  paymentStatus : string
}




