export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  type: 'paper' | 'notes' | 'mock-test';
  downloadUrl: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  replies: number;
}