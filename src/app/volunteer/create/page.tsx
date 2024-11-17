'use client';
import Link from "next/link";
import { useState } from "react";

export default function CreateVolunteer() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    date: '',
    maxParticipants: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 연동 시 실제 데이터 전송 로직 구현
    console.log('제출된 데이터:', formData);
    // 제출 후 목록 페이지로 이동
    // router.push('/volunteer/list');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-amber-100">
          <h1 className="text-2xl font-bold text-amber-900 mb-6">봉사활동 등록하기</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 제목 */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-amber-900 mb-1">
                봉사활동 제목
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-amber-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* 카테고리 */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-amber-900 mb-1">
                카테고리
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-amber-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              >
                <option value="">카테고리 선택</option>
                <option value="환경">환경</option>
                <option value="복지">복지</option>
                <option value="교육">교육</option>
                <option value="동물보호">동물보호</option>
                <option value="기타">기타</option>
              </select>
            </div>

            {/* 장소 */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-amber-900 mb-1">
                활동 장소
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-amber-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* 날짜 */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-amber-900 mb-1">
                활동 날짜
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-amber-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* 최대 참가 인원 */}
            <div>
              <label htmlFor="maxParticipants" className="block text-sm font-medium text-amber-900 mb-1">
                최대 참가 인원
              </label>
              <input
                type="number"
                id="maxParticipants"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                min="1"
                className="w-full border border-amber-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* 상세 설명 */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-amber-900 mb-1">
                상세 설명
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full border border-amber-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* 버튼 그룹 */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800 transition-colors"
              >
                등록하기
              </button>
              <Link
                href="/volunteer/list"
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-center"
              >
                취소
              </Link>
            </div>
          </form>
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