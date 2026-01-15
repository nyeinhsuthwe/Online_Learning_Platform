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
  course_id: string
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

