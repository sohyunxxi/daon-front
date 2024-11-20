'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { api } from '@/lib/api';
import { useParams } from 'next/navigation';

// 타입 정의
interface Activity {
  idx: number;
  title: string;
  date: string;
  location: string;
  description: string;
  // API에 없는 필드들은 임시로 추가
  category?: string;
  time?: string;
  participants?: number;
  maxParticipants?: number;
  requirements?: string;
  organizerName?: string;
  organizerContact?: string;
  createdAt?: string;
}

// 타입 정의 부분에 API 응답 타입 추가
type ApiResponse = Activity;

// 임시 데이터는 그대로 두고, 새로운 상태 추가
export default function VolunteerDetail() {
  const params = useParams();
  const id = params.id as string;
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isParticipating, setIsParticipating] = useState(false);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await api.get<ApiResponse>(`/api/volunteers/${id}`);
        setActivity({
          ...response.data,
          // API에 없는 필드들은 임시 데이터로 채우기
          category: "환경",
          time: "10:00 - 12:00",
          participants: 5,
          maxParticipants: 10,
          requirements: "장갑, 편한 복장, 물",
          organizerName: "김다온",
          organizerContact: "010-1234-5678",
          createdAt: "2024-03-15",
        });
      } catch (error) {
        console.error('API 에러:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  if (isLoading) return <div>로딩중...</div>;
  if (!activity) return <div>활동을 찾을 수 없습니다.</div>;

  const handleParticipate = () => {
    // TODO: API 연동 시 실제 참가 로직 구현
    setIsParticipating(!isParticipating);
  };

  return (
    <div className="min-h-screen bg-orange-50">
      {/* 네비게이션 바 */}
      <nav className="bg-warm-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-amber-700">다온</Link>
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
        {/* 상단 네비게이션 */}
        <div className="mb-6">
          <Link href="/volunteer/list" className="text-amber-700 hover:text-amber-900">
            ← 목록으로 돌아가기
          </Link>
        </div>

        {/* 봉사활동 상세 정보 */}
        <div className="bg-white rounded-lg shadow-md p-8 border border-amber-100">
          {/* 헤더 섹션 */}
          <div className="border-b border-amber-100 pb-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-amber-900">{activity.title}</h1>
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                {activity.category}
              </span>
            </div>
            <p className="text-amber-800">
              작성일: {activity.createdAt}
            </p>
          </div>

          {/* 주요 정보 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-amber-900 mb-2">활동 정보</h2>
                <div className="space-y-2 text-amber-800">
                  <p>📍 장소: {activity.location}</p>
                  <p>📅 날짜: {activity.date}</p>
                  <p>🕒 시간: {activity.time}</p>
                  <p>👥 참가 인원: {activity.participants}/{activity.maxParticipants}명</p>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-amber-900 mb-2">준비물</h2>
                <p className="text-amber-800">{activity.requirements}</p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-amber-900 mb-2">주최자 정보</h2>
              <div className="space-y-2 text-amber-800">
                <p>이름: {activity.organizerName}</p>
                <p>연락처: {activity.organizerContact}</p>
              </div>
            </div>
          </div>

          {/* 상세 설명 섹션 */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-amber-900 mb-2">상세 설명</h2>
            <p className="text-amber-800 whitespace-pre-line">
              {activity.description}
            </p>
          </div>

          {/* 참가 신청 섹션 */}
          <div className="border-t border-amber-100 pt-6">
            <div className="flex justify-between items-center">
              <div className="text-amber-800">
                <p>현재 {activity?.maxParticipants && activity?.participants 
                  ? activity.maxParticipants - activity.participants 
                  : 0}자리 남았습니다</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleParticipate}
                  className={`px-6 py-3 rounded-md transition-colors ${
                    isParticipating 
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-amber-700 text-white hover:bg-amber-800'
                  }`}
                >
                  {isParticipating ? '참가 취소하기' : '참가 신청하기'}
                </button>
                <Link
                  href={`/volunteer/${activity.idx}/edit`}
                  className="bg-orange-100 text-orange-700 px-6 py-3 rounded-md hover:bg-orange-200"
                >
                  수정하기
                </Link>
              </div>
            </div>
          </div>
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