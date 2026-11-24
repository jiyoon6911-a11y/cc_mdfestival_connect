import { FormEvent, useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Trash2 } from 'lucide-react';
import { ResilientImage } from './components/ResilientImage';
import {
  FeedbackEntry,
  INITIAL_FEEDBACK,
  OVERVIEW_POINTS,
  PROBLEM_ITEMS,
  PROJECT_META,
  ProblemCategory,
  QUEST_ITEMS,
} from './data/projectContent';

const CATEGORIES: ProblemCategory[] = ['전체', '가격·정량', '위생·환경', '동선·운영'];
const FEEDBACK_CATEGORIES: Exclude<ProblemCategory, '전체'>[] = [
  '가격·정량',
  '위생·환경',
  '동선·운영',
];
const STORAGE_KEY = 'makguksu_project_feedback_v1';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProblemCategory>('전체');
  const [selectedQuestId, setSelectedQuestId] = useState<string>(QUEST_ITEMS[0].id);

  const [feedbackList, setFeedbackList] = useState<FeedbackEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore storage parsing errors
    }
    return INITIAL_FEEDBACK;
  });

  const [author, setAuthor] = useState('');
  const [feedbackCategory, setFeedbackCategory] =
    useState<Exclude<ProblemCategory, '전체'>>('가격·정량');
  const [content, setContent] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackList));
    } catch {
      // Ignore storage write errors
    }
  }, [feedbackList]);

  const filteredProblems =
    selectedCategory === '전체'
      ? PROBLEM_ITEMS
      : PROBLEM_ITEMS.filter((item) => item.category === selectedCategory);

  const activeQuest = QUEST_ITEMS.find((q) => q.id === selectedQuestId) ?? QUEST_ITEMS[0];

  const handleFeedbackSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedAuthor = author.trim();
    const trimmedContent = content.trim();

    if (!trimmedAuthor || !trimmedContent) {
      setFormError('작성자와 내용을 모두 입력해 주세요.');
      return;
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(
      2,
      '0',
    )}.${String(now.getDate()).padStart(2, '0')}`;

    const newEntry: FeedbackEntry = {
      id: `fb-${Date.now()}`,
      author: trimmedAuthor,
      category: feedbackCategory,
      content: trimmedContent,
      createdAt: formattedDate,
    };

    setFeedbackList((prev) => [newEntry, ...prev]);
    setAuthor('');
    setContent('');
    setFormError('');
    setSubmittedNotice(true);
    window.setTimeout(() => setSubmittedNotice(false), 3000);
  };

  const handleDeleteFeedback = (id: string) => {
    setFeedbackList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
      {/* Top Bar: strict 3-zone contract */}
      <header className="sticky top-0 z-30 bg-zinc-50/95 backdrop-blur-sm border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-zinc-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
          >
            {PROJECT_META.brandWordmark}
          </a>

          <nav
            aria-label="주요 섹션 이동"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600"
          >
            <a
              href="#overview"
              className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
            >
              프로젝트 소개
            </a>
            <a
              href="#problems"
              className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
            >
              문제 진단
            </a>
            <a
              href="#quests"
              className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
            >
              개선 퀘스트
            </a>
            <a
              href="#feedback"
              className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
            >
              의견 메모
            </a>
          </nav>

          <a
            href="#feedback"
            className="px-4 py-2.5 text-sm font-medium text-white bg-red-700 rounded-lg hover:bg-red-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          >
            의견 남기기
          </a>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-zinc-200 bg-white">
          <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-between gap-8">
                <div className="space-y-5">
                  <p className="text-sm font-medium text-red-700">{PROJECT_META.kicker}</p>
                  <h1
                    className="font-bold tracking-tight text-zinc-900 whitespace-pre-line leading-[1.15]"
                    style={{
                      fontSize: 'clamp(2.25rem, 4vw, 3.35rem)',
                      textWrap: 'balance',
                    }}
                  >
                    {PROJECT_META.heroTitle}
                  </h1>
                  <p className="text-base leading-relaxed text-zinc-600 max-w-xl">
                    {PROJECT_META.heroDescription}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#quests"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
                  >
                    개선 퀘스트 보기
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#problems"
                    className="inline-flex items-center px-4 py-3 text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0"
                  >
                    문제 진단 살펴보기
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="h-full min-h-[260px] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                  <ResilientImage
                    src={PROJECT_META.heroImage}
                    alt={PROJECT_META.heroImageAlt}
                    aspectClassName="aspect-video lg:h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Strip */}
        <section id="overview" className="border-b border-zinc-200 bg-zinc-50">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {OVERVIEW_POINTS.map((point) => (
                <div key={point.index} className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="font-mono-tabular font-medium text-red-700">
                      {point.index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-zinc-900 text-sm">{point.label}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-600">{point.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1: Problem Diagnosis */}
        <section id="problems" className="border-b border-zinc-200 bg-white">
          <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <h2
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900"
                  style={{ textWrap: 'balance' }}
                >
                  01. 축제 주요 문제 진단
                </h2>
                <p className="text-sm sm:text-base text-zinc-600">
                  분야별 핵심 문제점을 간단히 분류한 초안입니다. 추후 조사 자료를 채워 넣을 수 있습니다.
                </p>
              </div>

              <div
                role="tablist"
                aria-label="문제 분야 필터"
                className="inline-flex items-center gap-1 p-1 bg-zinc-100 rounded-lg self-start md:self-auto"
              >
                {CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-white text-zinc-900 shadow-sm'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProblems.map((item) => (
                <article
                  key={item.id}
                  className="p-6 rounded-xl border border-zinc-200 bg-zinc-50/50 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <span className="font-mono-tabular font-medium text-zinc-900">
                        {item.index}.
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{item.category}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-600">{item.summary}</p>
                  </div>
                  <p className="text-xs text-zinc-500 pt-3 border-t border-zinc-200">
                    {item.detailNote}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Quest-Based Improvement Plan */}
        <section id="quests" className="border-b border-zinc-200 bg-zinc-50">
          <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20 space-y-10">
            <div className="space-y-2 max-w-2xl">
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900"
                style={{ textWrap: 'balance' }}
              >
                02. 닭갈비 왕국 구출 퀘스트
              </h2>
              <p className="text-sm sm:text-base text-zinc-600">
                항목을 선택해 개선 전후 비교와 목표를 확인할 수 있습니다. 세부 수치와 실행안은 나중에 채워 주세요.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Quest Selector List */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                {QUEST_ITEMS.map((quest) => {
                  const isSelected = quest.id === activeQuest.id;
                  return (
                    <button
                      key={quest.id}
                      type="button"
                      onClick={() => setSelectedQuestId(quest.id)}
                      className={`w-full text-left p-5 rounded-xl border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-white border-red-700 text-zinc-900'
                          : 'bg-zinc-100/70 border-zinc-200 text-zinc-700 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <span
                          className={`font-mono-tabular text-xs font-medium ${
                            isSelected ? 'text-red-700' : 'text-zinc-500'
                          }`}
                        >
                          {quest.code}
                        </span>
                        <span className="text-xs text-zinc-500">{quest.targetCategory}</span>
                      </div>
                      <p className="text-base font-semibold leading-snug">{quest.title}</p>
                    </button>
                  );
                })}

                <div className="mt-2 rounded-xl overflow-hidden border border-zinc-200 bg-white">
                  <ResilientImage
                    src={PROJECT_META.cuisineImage}
                    alt={PROJECT_META.cuisineImageAlt}
                    aspectClassName="aspect-[4/3]"
                  />
                </div>
              </div>

              {/* Active Quest Detail Panel */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl border border-zinc-200 bg-white space-y-6">
                <div className="space-y-2 pb-5 border-b border-zinc-200">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="font-mono-tabular font-medium text-red-700">
                      {activeQuest.code}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{activeQuest.targetCategory}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900">
                    {activeQuest.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2 p-5 rounded-lg bg-zinc-50 border border-zinc-200">
                    <p className="text-xs font-semibold text-zinc-500">현재 상태 (Before)</p>
                    <p className="text-sm leading-relaxed text-zinc-700">{activeQuest.before}</p>
                  </div>

                  <div className="space-y-2 p-5 rounded-lg bg-zinc-50 border border-zinc-200">
                    <p className="text-xs font-semibold text-red-700">개선 방향 (After)</p>
                    <p className="text-sm leading-relaxed text-zinc-900">{activeQuest.after}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-medium text-zinc-500">기대 효과 및 지표</span>
                  <span className="font-mono-tabular text-sm font-semibold text-zinc-900">
                    {activeQuest.expectedGoal}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Feedback & Project Notes */}
        <section id="feedback" className="bg-white">
          <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
                    03. 아이디어 및 메모 남기기
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-600">
                    내용을 채우기 전에 팀원 의견이나 추가할 아이디어를 간단히 기록해 둘 수 있습니다.
                  </p>
                </div>

                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="author-input"
                      className="block text-xs font-semibold text-zinc-700"
                    >
                      작성자 또는 팀명
                    </label>
                    <input
                      id="author-input"
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="예: 홍길동 / 1조"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="category-select"
                      className="block text-xs font-semibold text-zinc-700"
                    >
                      관련 분야
                    </label>
                    <select
                      id="category-select"
                      value={feedbackCategory}
                      onChange={(e) =>
                        setFeedbackCategory(e.target.value as Exclude<ProblemCategory, '전체'>)
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 bg-white text-zinc-900 focus:outline-none focus:border-zinc-900"
                    >
                      {FEEDBACK_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="content-input"
                      className="block text-xs font-semibold text-zinc-700"
                    >
                      메모 내용
                    </label>
                    <textarea
                      id="content-input"
                      rows={3}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="추가할 사례나 개선 아이디어를 적어 주세요."
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900"
                    />
                  </div>

                  {formError && (
                    <p className="text-xs font-medium text-red-700" role="alert">
                      {formError}
                    </p>
                  )}

                  {submittedNotice && (
                    <p className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-800">
                      <CheckCircle2 className="w-4 h-4 text-red-700" aria-hidden="true" />
                      메모가 목록에 저장되었습니다.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    메모 추가하기
                  </button>
                </form>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                  <h3 className="text-sm font-semibold text-zinc-900">기록된 메모</h3>
                  <span className="font-mono-tabular text-xs text-zinc-500">
                    총 {feedbackList.length}건
                  </span>
                </div>

                {feedbackList.length === 0 ? (
                  <div className="p-8 rounded-xl border border-zinc-200 bg-zinc-50 text-center text-sm text-zinc-500">
                    아직 등록된 메모가 없습니다. 왼쪽 입력창에서 새 메모를 추가해 보세요.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {feedbackList.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-5 rounded-xl border border-zinc-200 bg-zinc-50/60 flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <span className="font-semibold text-zinc-900">{entry.author}</span>
                            <span aria-hidden="true">·</span>
                            <span>{entry.category}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono-tabular">{entry.createdAt}</span>
                          </div>
                          <p className="text-sm leading-relaxed text-zinc-700">{entry.content}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteFeedback(entry.id)}
                          aria-label={`${entry.author} 메모 삭제`}
                          className="p-2 text-zinc-400 hover:text-red-700 transition-colors rounded-md cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-bold text-zinc-900">
              막국수용사 닭갈비 왕국을 구해라
            </p>
            <p className="text-xs text-zinc-500">{PROJECT_META.footerSummary}</p>
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-600">
            <a href="#overview" className="hover:text-zinc-900 transition-colors whitespace-nowrap">
              소개
            </a>
            <a href="#problems" className="hover:text-zinc-900 transition-colors whitespace-nowrap">
              문제 진단
            </a>
            <a href="#quests" className="hover:text-zinc-900 transition-colors whitespace-nowrap">
              개선 퀘스트
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
