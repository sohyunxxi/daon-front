import Link from "next/link";

// 임시 데이터
const volunteerActivities = [
  {
    id: 1,
    title: "지역 공원 청소 봉사",
    location: "서울시 강남구",
    date: "2024-04-01",
    participants: 5,
    maxParticipants: 10,
  },
  {
    id: 2,
    title: "노인복지관 급식 봉사",
    location: "서울시 송파구",
    date: "2024-04-03",
    participants: 3,
    maxParticipants: 8,
  },
  // ... 더 많은 임시 데이터
];

export default function Home() {
  return (
    <div className="min-h-screen bg-orange-50">
      {/* 네비게이션 바 */}
      <nav className="bg-warm-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-amber-700">다온</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-amber-900 hover:text-amber-700">로그인</Link>
            <Link href="/signup" className="bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800">
              회원가입
            </Link>
          </div>
        </div>
      </nav>

      {/* 메인 섹션 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 히어로 섹션 */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            함께하는 봉사활동의 시작
          </h2>
          <p className="text-xl text-amber-800 mb-8">
            다온과 함께 의미있는 변화를 만들어보세요
          </p>
          <Link href="/volunteer/create" 
            className="bg-orange-700 text-white px-6 py-3 rounded-md hover:bg-orange-800 inline-block">
            봉사활동 등록하기
          </Link>
        </section>

        {/* 봉사활동 목록 */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-amber-900">진행중인 봉사활동</h3>
            <Link href="/volunteer/list" className="text-orange-700 hover:text-orange-800">
              전체보기 →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerActivities.map((activity) => (
              <div key={activity.id} className="bg-warm-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-amber-100">
                <h4 className="text-lg font-semibold text-amber-900 mb-2">{activity.title}</h4>
                <div className="text-amber-800 space-y-2">
                  <p>📍 {activity.location}</p>
                  <p>📅 {activity.date}</p>
                  <p>👥 {activity.participants}/{activity.maxParticipants}명</p>
                </div>
                <Link href={`/volunteer/${activity.id}`}
                  className="mt-4 block text-center bg-orange-100 text-orange-700 px-4 py-2 rounded hover:bg-orange-200">
                  자세히 보기
                </Link>
              </div>
            ))}
          </div>
        </section>
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
