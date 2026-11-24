export type ProblemCategory = '전체' | '가격·정량' | '위생·환경' | '동선·운영';

export interface ProblemItem {
  id: string;
  index: string;
  category: Exclude<ProblemCategory, '전체'>;
  title: string;
  summary: string;
  detailNote: string;
}

export interface QuestItem {
  id: string;
  code: string;
  title: string;
  targetCategory: Exclude<ProblemCategory, '전체'>;
  before: string;
  after: string;
  expectedGoal: string;
}

export interface FeedbackEntry {
  id: string;
  author: string;
  category: Exclude<ProblemCategory, '전체'>;
  content: string;
  createdAt: string;
}

/**
 * 아래 내용을 수정하면 웹사이트의 모든 텍스트가 즉시 반영됩니다.
 * 추후 리서치 결과 및 세부 기획안으로 자유롭게 채워 주세요.
 */
export const PROJECT_META = {
  brandWordmark: '막국수용사',
  kicker: '춘천 막국수·닭갈비 축제 문제 개선 프로젝트',
  heroTitle: '막국수용사,\n닭갈비 왕국을 구해라',
  heroDescription:
    '춘천을 대표하는 먹거리 축제가 겪고 있는 가격·위생·운영 문제를 점검하고, 방문객과 상인이 함께 만족할 수 있는 개선안을 정리하는 공간입니다. (세부 내용 추후 업데이트 예정)',
  heroImage: '/src/assets/images/hero_chuncheon_festival_1795493440627.jpg',
  heroImageAlt: '춘천 호수와 축제를 배경으로 한 막국수용사와 닭갈비 철판 일러스트',
  cuisineImage: '/src/assets/images/chuncheon_cuisine_editorial_1795493440770.jpg',
  cuisineImageAlt: '춘천 막국수와 철판 닭갈비 상차림 사진',
  footerSummary: '춘천 막국수·닭갈비 축제 문제 개선 프로젝트 아카이브 · 내용 추후 보완 예정',
};

export const OVERVIEW_POINTS = [
  {
    index: '01',
    label: '프로젝트 배경',
    body: '축제 방문객 감소 및 지역 이미지 저하 요인 정리 (세부 자료 입력 예정)',
  },
  {
    index: '02',
    label: '핵심 목표',
    body: '투명한 가격, 쾌적한 식사 환경, 효율적인 현장 동선 구축',
  },
  {
    index: '03',
    label: '진행 방식',
    body: '현장 사례 조사 후 3대 핵심 퀘스트별 개선안 도출',
  },
];

export const PROBLEM_ITEMS: ProblemItem[] = [
  {
    id: 'prob-1',
    index: '01',
    category: '가격·정량',
    title: '가격 대비 부족한 양 및 불투명한 정보',
    summary: '메뉴판 표기만으로는 실제 제공량을 가늠하기 어렵다는 방문객 의견이 반복됩니다.',
    detailNote: '현장 조사 수치 및 사례 추후 추가',
  },
  {
    id: 'prob-2',
    index: '02',
    category: '위생·환경',
    title: '일회용품 과다 사용 및 취식 공간 부족',
    summary: '피크 시간대 쓰레기 적체와 테이블 회전 지연으로 쾌적한 식사가 어렵습니다.',
    detailNote: '다회용기 도입 필요성 및 현황 추후 추가',
  },
  {
    id: 'prob-3',
    index: '03',
    category: '동선·운영',
    title: '주문 대기열 혼잡 및 안내 표지 미흡',
    summary: '인기 부스 앞 긴 줄이 통행을 막아 행사장 전체 이동 흐름이 정체됩니다.',
    detailNote: '행사장 구역별 체류 시간 분석 추후 추가',
  },
  {
    id: 'prob-4',
    index: '04',
    category: '동선·운영',
    title: '지역 상권과의 연계 부족',
    summary: '축제장 외부의 기존 명동 닭갈비 골목·막국수 맛집과 유입이 단절되어 있습니다.',
    detailNote: '연계 프로모션 아이디어 추후 추가',
  },
];

export const QUEST_ITEMS: QuestItem[] = [
  {
    id: 'quest-1',
    code: 'Quest 01',
    title: '정찰제와 표준 용량 공개로 신뢰 회복',
    targetCategory: '가격·정량',
    before: '부스별 임의 가격 책정과 모호한 인분 기준으로 방문객 불만 발생',
    after: '축제 공식 표준 중량(g) 표기 및 실물 모형·사전 가격 고지 의무화',
    expectedGoal: '가격 만족도 지표 (추후 기입)',
  },
  {
    id: 'quest-2',
    code: 'Quest 02',
    title: '다회용기 순환 시스템과 쾌적한 취식존',
    targetCategory: '위생·환경',
    before: '일회용기 쓰레기 산적 및 그늘·좌석 부족으로 인한 서서 먹기 불편',
    after: '보증금 기반 다회용기 반납 부스 운영 및 구역별 공동 취식 테이블 확충',
    expectedGoal: '폐기물 감축 목표율 (추후 기입)',
  },
  {
    id: 'quest-3',
    code: 'Quest 03',
    title: '원격 대기 알림과 지역 상권 스탬프 연계',
    targetCategory: '동선·운영',
    before: '현장 줄서기로 인한 시간 낭비 및 축제장 내외 상권 분리',
    after: 'QR 기반 간편 웨이팅 도입 및 시내 음식점 할인 연계 코스 운영',
    expectedGoal: '평균 대기 단축 시간 (추후 기입)',
  },
];

export const INITIAL_FEEDBACK: FeedbackEntry[] = [
  {
    id: 'fb-1',
    author: '기획 메모',
    category: '가격·정량',
    content: '사전 설문조사 및 현장 인터뷰 내용을 여기에 추가로 정리할 예정입니다.',
    createdAt: '초기 메모',
  },
];
