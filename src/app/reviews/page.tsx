'use client'
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from "next/link";

// 타입 정의
interface Review {
  id: number;
  title: string;
  author: string;
  date: string;
  location: string;
  likes: number;
  preview: string;
}

// 기존 Review 인터페이스 아래에 추가
interface ApiReview {
  idx: number;
  title: string;
  author: string;
  date: string;
  location: string;
  likes?: number;
  content: string;
  preview?: string;
}

// 임시 데이터
const initialReviews = [
  {
    id: 1,
    title: "노인복지관에서의 특별한 하루",
    author: "김다온",
    date: "2024-03-28",
    location: "서울시 송파구",
    likes: 15,
    preview: "처음에는 걱정이 많았지만, 어르신들과 함께한 시간이 정말 의미있었습니다..."
  },
  {
    id: 2,
    title: "공원 청소 봉사 후기",
    author: "이봄봄",
    date: "2024-03-25",
    location: "서울시 강남구",
    likes: 23,
    preview: "우리 동네 공원을 깨끗하게 만드는데 동참할 수 있어서 뿌듯했습니다..."
  }
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log('API 호출 시작');
        const response = await api.get<ApiReview[]>('/api/reviews');
        console.log('API 응답:', response);
        
        // API 응답이 비어있으면 임시 데이터 사용
        if (!response.data || response.data.length === 0) {
          console.log('API 응답이 비어있어 임시 데이터 사용');
          setReviews(initialReviews);
          return;
        }

        const formattedReviews = response.data.map((review: ApiReview) => ({
          id: review.idx,
          title: review.title,
          author: review.author,
          date: review.date,
          location: review.location,
          likes: review.likes || 0,
          preview: review.preview || review.content,
        }));
        
        setReviews(formattedReviews);
      } catch (error) {
        console.error('API 에러:', error);
        // API 오류시 임시 데이터 유지
        setReviews(initialReviews);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="min-h-screen bg-orange-50">
      {/* 네비게이션 바 */}
      <nav className="bg-warm-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-bold text-amber-700">다온</Link>
            <Link href="/reviews" className="text-amber-900 hover:text-amber-700">봉사후기</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-amber-900 hover:text-amber-700">로그인</Link>
            <Link href="/signup" className="bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800">
              회원가입
            </Link>
          </div>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-amber-900">봉사활동 후기</h1>
          <Link href="/reviews/write" className="bg-orange-700 text-white px-6 py-3 rounded-md hover:bg-orange-800">
            후기 작성하기
          </Link>
        </div>

        {/* 후기 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-amber-900 mb-3">{review.title}</h2>
              <div className="text-amber-800 space-y-2 mb-4">
                <p>✍️ {review.author}</p>
                <p>📍 {review.location}</p>
                <p>📅 {review.date}</p>
                <p>❤️ {review.likes}</p>
              </div>
              <p className="text-gray-600 mb-4">{review.preview}</p>
              <Link href={`/reviews/${review.id}`} className="block text-center bg-orange-100 text-orange-700 px-4 py-2 rounded">
                자세히 보기
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-warm-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div className="text-amber-800">
              <h3 className="font-bold text-lg mb-2">다온</h3>
              <p>함께하는 봉사활동 커뮤니티</p>
            </div>
            <div className="flex gap-6">
              <Link href="/reviews" className="text-amber-700 hover:text-amber-900">봉사후기</Link>
              <Link href="/about" className="text-amber-700 hover:text-amber-900">소개</Link>
              <Link href="/terms" className="text-amber-700 hover:text-amber-900">이용약관</Link>
              <Link href="/privacy" className="text-amber-700 hover:text-amber-900">개인정보처리방침</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 