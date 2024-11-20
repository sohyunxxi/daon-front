'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import Link from 'next/link';

// 타입 정의
interface Review {
  id: number;
  title: string;
  author: string;
  date: string;
  location: string;
  likes: number;
  content: string;
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
}

// 임시 상세 데이터
const initialReview = {
  id: 1,
  title: "노인복지관에서의 특별한 하루",
  author: "김다온",
  date: "2024-03-28",
  location: "서울시 송파구",
  likes: 15,
  content: "처음에는 걱정이 많았지만, 어르신들과 함께한 시간이 정말 의미있었습니다. 어르신들의 따뜻한 미소와 감사의 말씀에 제가 더 감사한 하루였습니다. 앞으로도 이런 의미있는 활동에 참여하고 싶습니다."
};

export default function ReviewDetailPage() {
  const params = useParams();
  const [review, setReview] = useState<Review>(initialReview);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await api.get<ApiReview>(`/api/reviews/${params.id}`);
        
        if (!response.data) {
          console.log('API 응답이 비어있어 임시 데이터 사용');
          setReview(initialReview);
          return;
        }

        const formattedReview = {
          id: response.data.idx,
          title: response.data.title,
          author: response.data.author,
          date: response.data.date,
          location: response.data.location,
          likes: response.data.likes || 0,
          content: response.data.content,
        };
        
        setReview(formattedReview);
      } catch (error) {
        console.error('API 에러:', error);
        // API 오류시 임시 데이터 유지
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchReview();
    }
  }, [params.id]);

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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 뒤로가기 버튼 */}
        <div className="mb-6">
          <Link href="/reviews" className="text-amber-700 hover:text-amber-900">
            ← 목록으로 돌아가기
          </Link>
        </div>

        {/* 후기 상세 내용 */}
        <article className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-6">{review.title}</h1>
          
          <div className="flex items-center justify-between mb-8 text-amber-800">
            <div className="space-y-2">
              <p>✍️ {review.author}</p>
              <p>📍 {review.location}</p>
              <p>📅 {review.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-rose-500 hover:text-rose-600">
                <span>❤️</span>
                <span>{review.likes}</span>
              </button>
            </div>
          </div>

          <div className="prose prose-amber max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{review.content}</p>
          </div>
        </article>
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