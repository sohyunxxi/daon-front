import Link from "next/link";

// 임시 데이터 (나중에 API로 대체)
const volunteerActivities = [
  {
    id: 1,
    title: "지역 공원 청소 봉사",
    location: "서울시 강남구",
    date: "2024-04-01",
    participants: 5,
    maxParticipants: 10,
    description: "우리 동네 공원을 깨끗하게 만들어요.",
    category: "환경",
  },
  {
    id: 2,
    title: "노인복지관 급식 봉사",
    location: "서울시 송파구",
    date: "2024-04-03",
    participants: 3,
    maxParticipants: 8,
    description: "어르신들을 위한 따뜻한 식사 준비",
    category: "복지",
  },
  {
    id: 3,
    title: "유기동물 보호소 봉사",
    location: "경기도 성남시",
    date: "2024-04-05",
    participants: 2,
    maxParticipants: 6,
    description: "유기동물들의 건강한 생활을 위한 봉사",
    category: "동물보호",
  },
  // 더 많은 데이터...
];

export default function VolunteerList() {
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-amber-900">전체 봉사활동</h1>
          <div className="flex gap-4">
            <select className="border border-amber-200 rounded-md px-3 py-2 bg-white text-amber-900">
              <option>전체 카테고리</option>
              <option>환경</option>
              <option>복지</option>
              <option>동물보호</option>
            </select>
            <Link 
              href="/volunteer/create"
              className="bg-orange-700 text-white px-4 py-2 rounded-md hover:bg-orange-800"
            >
              봉사활동 등록하기
            </Link>
          </div>
        </div>

        {/* 검색 필터 */}
        <div className="bg-warm-gray-100 p-4 rounded-lg mb-8">
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="봉사활동 검색" 
              className="flex-1 border border-amber-200 rounded-md px-4 py-2"
            />
            <button className="bg-amber-700 text-white px-6 py-2 rounded-md hover:bg-amber-800">
              검색
            </button>
          </div>
        </div>

        {/* 봉사활동 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {volunteerActivities.map((activity) => (
            <div 
              key={activity.id} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-amber-100"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-amber-900">{activity.title}</h3>
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm">
                  {activity.category}
                </span>
              </div>
              <div className="text-amber-800 space-y-2 mb-4">
                <p>📍 {activity.location}</p>
                <p>📅 {activity.date}</p>
                <p>👥 {activity.participants}/{activity.maxParticipants}명</p>
                <p className="text-gray-600">{activity.description}</p>
              </div>
              <Link 
                href={`/volunteer/${activity.id}`}
                className="block text-center bg-orange-100 text-orange-700 px-4 py-2 rounded hover:bg-orange-200"
              >
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