"use client";

import React, { useState, useEffect, useRef } from "react";
import { blogPosts } from "@/data/blog";

/* ═══ Design Tokens ═══ */
const C = {
  bg: "#FAFAF7",
  card: "#FFFFFF",
  forest: "#1A2E1A",
  green: "#3D7A4A",
  greenSoft: "#E8F0E8",
  greenAccent: "#2D5A35",
  gold: "#C49A3C",
  goldSoft: "#FDF6E8",
  warm: "#8C7B6B",
  warmLight: "#B8A99A",
  border: "#EAEAE4",
  muted: "#9B9B90",
  red: "#C44D4D",
  redSoft: "#FDF0F0",
};

const font = "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif";

/* ═══ Data ═══ */
const popularTopics = [
  { id: "ultra-processed", icon: "🚫", label: "초가공식품", desc: "진짜 음식과 가짜 음식 구별법", count: 24 },
  { id: "kids-food", icon: "👶", label: "아이 먹거리", desc: "성장기 아이를 위한 영양 가이드", count: 18 },
  { id: "nutrients", icon: "💊", label: "영양소", desc: "비타민, 미네랄, 단백질 완전정복", count: 22 },
  { id: "recipes", icon: "🥗", label: "레시피", desc: "주연이 검증한 리얼푸드 레시피", count: 48 },
  { id: "label-reading", icon: "🏷️", label: "식품 라벨", desc: "마트에서 살아남는 법", count: 12 },
  { id: "dairy", icon: "🥛", label: "유제품", desc: "A2 우유, 요거트, 치즈의 모든 것", count: 15 },
  { id: "seasonal", icon: "🌿", label: "제철 식재료", desc: "계절마다 달라지는 최고의 선택", count: 16 },
  { id: "most-popular", icon: "⭐", label: "인기 콘텐츠", desc: "가장 많이 본 영상과 아티클", count: 20 },
];

const additionalTopics = [
  { id: "gut-health", icon: "🦠", label: "장 건강", count: 8 },
  { id: "weight", icon: "⚖️", label: "체중 관리", count: 10 },
  { id: "pregnancy", icon: "🤰", label: "임산부 영양", count: 6 },
  { id: "elderly", icon: "👵", label: "노년 영양", count: 5 },
  { id: "diabetes", icon: "🩸", label: "혈당 관리", count: 9 },
  { id: "immune", icon: "🛡️", label: "면역력", count: 7 },
  { id: "bone", icon: "🦴", label: "뼈 건강", count: 4 },
  { id: "skin", icon: "✨", label: "피부·탈모", count: 6 },
  { id: "fatigue", icon: "😴", label: "피로·수면", count: 5 },
  { id: "farm", icon: "🐄", label: "목장 이야기", count: 12 },
  { id: "meal-prep", icon: "📦", label: "식단 준비", count: 8 },
  { id: "food-myth", icon: "❓", label: "건강 상식 Q&A", count: 14 },
];

const featuredEpisodes = [
  {
    id: 1, topic: "초가공식품", topicColor: C.red, topicBg: C.redSoft,
    title: "제가 절대 안 먹는 5가지",
    desc: "마트에서 흔히 보이는 이 식품들, 왜 피해야 하는지 성분표를 하나씩 뜯어봅니다.",
    type: "영상", duration: "12분", date: "2026.04.01",
    videoId: "Iyf5ViY2AbA",
  },
  {
    id: 2, topic: "아이 먹거리", topicColor: C.gold, topicBg: C.goldSoft,
    title: "아이 간식, 이것만 바꿔도 달라집니다",
    desc: "시판 과자 대신 5분이면 만드는 리얼푸드 간식 3가지를 소개합니다.",
    type: "영상", duration: "8분", date: "2026.04.04",
    videoId: "BGwb8_hbzUM",
  },
  {
    id: 3, topic: "영양소", topicColor: C.green, topicBg: C.greenSoft,
    title: "비타민D, 한국인 90%가 부족합니다",
    desc: "비타민D 부족의 증상, 음식, 보충법까지 알려드립니다.",
    type: "영상", duration: "5분", date: "2026.04.07",
    videoId: "Sn7T46fCjLE",
  },
  {
    id: 4, topic: "유제품", topicColor: C.greenAccent, topicBg: C.greenSoft,
    title: "A2 우유 vs 일반 우유, 뭐가 다를까?",
    desc: "해발 1,000m 목장 우유를 직접 비교 분석합니다. 소화가 안 되는 분들 주목.",
    type: "영상", duration: "10분", date: "2026.04.11",
    videoId: "GGR8rRwnhYk",
  },
];

/* ═══ Pages ═══ */
const PAGES = { HOME: "home", TOPICS: "topics", TOPIC_DETAIL: "topic_detail", ABOUT: "about", BLOG: "blog", BLOG_POST: "blog_post" };

/* ═══ Types ═══ */
interface Topic {
  id: string;
  icon: string;
  label: string;
  desc?: string;
  count?: number;
}

interface Episode {
  id: number;
  topic: string;
  topicColor: string;
  topicBg: string;
  title: string;
  desc: string;
  type: string;
  duration: string;
  date: string;
  videoId?: string;
}

/* ═══ Components ═══ */

const TopicCard = ({ topic, onClick, size = "normal" }: { topic: Topic; onClick?: (id: string) => void; size?: string }) => (
  <button onClick={() => onClick?.(topic.id)} style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: size === "large" ? 10 : 6,
    padding: size === "large" ? "24px 12px" : "16px 8px",
    background: C.card, borderRadius: 16,
    border: `1px solid ${C.border}`, cursor: "pointer",
    transition: "all 0.2s ease", fontFamily: font,
    minWidth: 0, width: "100%",
  }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
  >
    <span style={{ fontSize: size === "large" ? 36 : 28 }}>{topic.icon}</span>
    <span style={{ fontSize: size === "large" ? 15 : 13, fontWeight: 700, color: C.forest, textAlign: "center", lineHeight: 1.3 }}>{topic.label}</span>
    {size === "large" && topic.desc && (
      <span style={{ fontSize: 12, color: C.warm, textAlign: "center", lineHeight: 1.4, maxWidth: "90%" }}>{topic.desc}</span>
    )}
  </button>
);

const EpisodeCard = ({ ep, style: extraStyle }: { ep: Episode; style?: React.CSSProperties }) => {
  const [playing, setPlaying] = useState(false);
  return (
  <div style={{
    background: C.card, borderRadius: 16, overflow: "hidden",
    border: `1px solid ${C.border}`,
    transition: "all 0.2s", ...extraStyle,
  }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
  >
    {/* YouTube Video / Thumbnail */}
    <div style={{
      height: 180, background: "#000",
      display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
      cursor: "pointer",
    }}
      onClick={() => !playing && ep.videoId && setPlaying(true)}
    >
      {ep.videoId && playing ? (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${ep.videoId}?autoplay=1&rel=0`}
          title={ep.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        />
      ) : ep.videoId ? (
        <>
          <img
            src={`https://img.youtube.com/vi/${ep.videoId}/hqdefault.jpg`}
            alt={ep.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.25)",
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.95)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }}>
              <span style={{ fontSize: 22, marginLeft: 3, color: C.red }}>▶</span>
            </div>
          </div>
        </>
      ) : (
        <div style={{
          width: "100%", height: "100%",
          background: `linear-gradient(135deg, ${C.greenSoft}, ${C.goldSoft})`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          }}>
            <span style={{ fontSize: 22, marginLeft: 3 }}>▶</span>
          </div>
        </div>
      )}
      <span style={{
        position: "absolute", bottom: 10, right: 10, background: "rgba(0,0,0,0.7)",
        color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4,
        zIndex: 2,
      }}>{ep.duration}</span>
    </div>
    <div style={{ padding: "14px 16px 18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, color: ep.topicColor, background: ep.topicBg,
          padding: "3px 10px", borderRadius: 100,
        }}>{ep.topic}</span>
        <span style={{ fontSize: 11, color: C.muted }}>{ep.date}</span>
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 800, color: C.forest, margin: "0 0 6px", lineHeight: 1.35, letterSpacing: -0.3 }}>
        {ep.title}
      </h3>
      <p style={{
        fontSize: 13, color: C.warm, margin: 0, lineHeight: 1.6,
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
      }}>
        {ep.desc}
      </p>
    </div>
  </div>
  );
};

const SectionHeader = ({ label, title, action, onAction }: { label?: string; title: string; action?: string; onAction?: () => void }) => (
  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16 }}>
    <div>
      {label && <div style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>{label}</div>}
      <h2 style={{ fontSize: 22, fontWeight: 900, color: C.forest, margin: 0, letterSpacing: -0.5 }}>{title}</h2>
    </div>
    {action && (
      <button onClick={onAction} style={{
        fontSize: 13, fontWeight: 600, color: C.green, background: "none",
        border: "none", cursor: "pointer", fontFamily: font, padding: 0,
      }}>{action} →</button>
    )}
  </div>
);

/* ═══ Animated Counter Hook ═══ */
function useCountUp(end: number, duration = 1800, suffix = "") {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return { ref, display: `${count}${suffix}`, started };
}

/* ═══ Circular Progress ═══ */
const CircleProgress = ({ percent, color, size = 80, strokeWidth = 7, children }: {
  percent: number; color: string; size?: number; strokeWidth?: number; children?: React.ReactNode;
}) => {
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.border} strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1)" }} />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column",
      }}>{children}</div>
    </div>
  );
};

/* ═══ Korea Nutrition Stats Section ═══ */
const koreaStats = [
  {
    value: 25, suffix: "%", label: "초가공식품 비율",
    desc: "한국인 전체 섭취 열량 중 초가공식품이 차지하는 비중",
    color: C.red, icon: "🚫",
    trend: "1998년 17% → 현재 25%+",
  },
  {
    value: 64, suffix: "%", label: "당뇨 위험 증가",
    desc: "초가공식품 10% 증가 시 당뇨 전단계 발생 위험",
    color: "#E67E22", icon: "⚠️",
    trend: "혈당 조절 장애 위험 56%↑",
  },
  {
    value: 50, suffix: "%", label: "30~50대 남성 비만",
    desc: "30~50대 한국 남성 절반이 비만 판정",
    color: C.gold, icon: "📊",
    trend: "여성도 4명 중 1명 과체중",
  },
  {
    value: 3075, suffix: "mg", label: "일일 나트륨 섭취",
    desc: "WHO 권고량 2,000mg의 약 1.5배",
    color: C.green, icon: "🧂",
    trend: "50대 이상 소폭 증가 추세",
  },
];

const NutritionStatsSection = () => {
  const stat0 = useCountUp(koreaStats[0].value, 1800, koreaStats[0].suffix);
  const stat1 = useCountUp(koreaStats[1].value, 1800, koreaStats[1].suffix);
  const stat2 = useCountUp(koreaStats[2].value, 1800, koreaStats[2].suffix);
  const stat3 = useCountUp(koreaStats[3].value, 2200, "");
  const stats = [stat0, stat1, stat2, stat3];

  return (
    <section style={{ padding: "0 20px 36px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 10,
          background: C.redSoft, borderRadius: 100, padding: "5px 14px",
          fontSize: 11, fontWeight: 700, color: C.red,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.red, animation: "pulse 2s ease-in-out infinite" }} />
          대한민국 영양 현실
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: C.forest, margin: "0 0 6px", letterSpacing: -0.5 }}>
          우리가 먹는 것이<br />우리를 만듭니다
        </h2>
        <p style={{ fontSize: 13, color: C.warm, margin: 0, lineHeight: 1.6 }}>
          국민건강영양조사 데이터가 말해주는 불편한 진실
        </p>
      </div>

      {/* Big Hero Stat */}
      <div ref={stat0.ref} style={{
        background: "linear-gradient(135deg, #1A2E1A, #2D5A35)",
        borderRadius: 20, padding: "28px 24px", textAlign: "center", marginBottom: 14,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -20, right: -20, width: 120, height: 120,
          borderRadius: "50%", background: "rgba(196,77,77,0.15)",
        }} />
        <div style={{ fontSize: 28, marginBottom: 8 }}>🚫</div>
        <div style={{
          fontSize: 56, fontWeight: 900, color: "#FF6B6B",
          letterSpacing: -2, lineHeight: 1, marginBottom: 4,
          fontFamily: "'Pretendard', monospace",
        }}>
          {stat0.display}
        </div>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 6 }}>
          한국인 칼로리의 1/4이 초가공식품
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 12 }}>
          1998년 17%에서 꾸준히 증가하는 추세
        </div>
        {/* Mini progress bar */}
        <div style={{ maxWidth: 240, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
            <span>1998</span><span>현재</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.15)" }}>
            <div style={{
              height: "100%", borderRadius: 3,
              background: "linear-gradient(90deg, #C49A3C, #FF6B6B)",
              width: stat0.started ? "100%" : "0%",
              transition: "width 2s cubic-bezier(0.22, 1, 0.36, 1)",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
            <span>17%</span><span>25%+</span>
          </div>
        </div>
      </div>

      {/* 3-column stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
        {[1, 2].map((i) => (
          <div key={i} ref={i === 1 ? stat1.ref : stat2.ref} style={{
            background: C.card, borderRadius: 16, padding: "20px 12px",
            border: `1px solid ${C.border}`, textAlign: "center",
            gridColumn: i === 1 ? "1 / 2" : "2 / 3",
          }}>
            <CircleProgress percent={stats[i].started ? koreaStats[i].value : 0} color={koreaStats[i].color} size={72} strokeWidth={6}>
              <span style={{ fontSize: 18, fontWeight: 900, color: koreaStats[i].color, letterSpacing: -1 }}>
                {stats[i].display}
              </span>
            </CircleProgress>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.forest, marginTop: 8, lineHeight: 1.3 }}>
              {koreaStats[i].label}
            </div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 3, lineHeight: 1.4 }}>
              {koreaStats[i].desc}
            </div>
          </div>
        ))}
        {/* Sodium stat */}
        <div ref={stat3.ref} style={{
          background: C.card, borderRadius: 16, padding: "20px 12px",
          border: `1px solid ${C.border}`, textAlign: "center",
        }}>
          <div style={{ fontSize: 24, marginBottom: 6 }}>🧂</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: C.green, letterSpacing: -1 }}>
            {stat3.display} <span style={{ fontSize: 12, fontWeight: 600 }}>mg</span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 800, color: C.forest, marginTop: 6, lineHeight: 1.3 }}>
            일일 나트륨
          </div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 3, lineHeight: 1.4 }}>
            WHO 권고의 1.5배
          </div>
        </div>
      </div>

      {/* CTA banner */}
      <div style={{
        background: C.greenSoft, borderRadius: 14, padding: "16px 20px",
        display: "flex", alignItems: "center", gap: 14, marginBottom: 14,
      }}>
        <span style={{ fontSize: 28, flexShrink: 0 }}>💡</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.forest, marginBottom: 2 }}>
            해답은 진짜 음식에 있습니다
          </div>
          <div style={{ fontSize: 12, color: C.warm, lineHeight: 1.5 }}>
            초가공식품을 줄이고 리얼푸드로 바꾸는 것만으로 만성질환 위험을 크게 낮출 수 있습니다.
          </div>
        </div>
      </div>

      {/* Source citation */}
      <div style={{
        fontSize: 10, color: C.muted, lineHeight: 1.6,
        padding: "10px 14px", background: C.card, borderRadius: 10,
        border: `1px solid ${C.border}`,
      }}>
        <div style={{ fontWeight: 700, marginBottom: 3 }}>📋 출처</div>
        <div>· 질병관리청, 2024 국민건강영양조사</div>
        <div>· 대한당뇨병학회, Diabetes Fact Sheet 2024</div>
        <div>· 한국영양학회지, 초가공식품 섭취 현황 분석 (2016-2019)</div>
        <div>· 정책브리핑, 비만 아동·청소년 초가공식품 섭취 연구</div>
      </div>
    </section>
  );
};

/* ═══ Main App ═══ */
export default function RealFoodJuYeonApp() {
  const [page, setPage] = useState(PAGES.HOME);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [blogSlug, setBlogSlug] = useState<string | null>(null);

  const navigateTopic = (topicId: string) => {
    setSelectedTopic(topicId);
    setPage(PAGES.TOPIC_DETAIL);
  };

  const navigateBlog = (slug: string) => {
    setBlogSlug(slug);
    setPage(PAGES.BLOG_POST);
    window.scrollTo(0, 0);
  };

  const currentBlogPost = blogPosts.find((p) => p.slug === blogSlug);

  const allTopics: Topic[] = [...popularTopics, ...additionalTopics];
  const currentTopic = allTopics.find((t) => t.id === selectedTopic);

  return (
    <div style={{ fontFamily: font, background: C.bg, minHeight: "100vh", color: C.warm, maxWidth: 480, margin: "0 auto", position: "relative", overflowX: "hidden", boxShadow: "0 0 60px rgba(0,0,0,0.06)" }}>

      {/* ═══ Sticky Header ═══ */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(250,250,247,0.97)", backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", padding: "14px 20px", gap: 12 }}>
          {page !== PAGES.HOME ? (
            <button onClick={() => setPage(PAGES.HOME)} style={{
              background: "none", border: "none", fontSize: 18, cursor: "pointer", padding: 0,
              color: C.forest, fontFamily: font,
            }}>←</button>
          ) : null}
          <button onClick={() => { setPage(PAGES.HOME); setSelectedTopic(null); }} style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            display: "flex", alignItems: "center", gap: 8, flex: 1,
          }}>
            <span style={{ fontSize: 20 }}>🥬</span>
            <span style={{ fontWeight: 900, fontSize: 17, color: C.forest, letterSpacing: -0.5 }}>리얼푸드 주연</span>
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none", border: "none", cursor: "pointer", padding: "4px",
            fontSize: 20, color: C.forest,
          }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* ═══ Mobile Menu Overlay ═══ */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 0, bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: "100%", maxWidth: 480,
          zIndex: 45, background: "rgba(250,250,247,0.98)",
          paddingTop: 64, overflowY: "auto",
        }}>
          <nav style={{ padding: "24px 20px" }}>
            {[
              { label: "홈", icon: "🏠", action: () => { setPage(PAGES.HOME); setMenuOpen(false); } },
              { label: "토픽", icon: "📚", action: () => { setPage(PAGES.TOPICS); setMenuOpen(false); } },
              { label: "레시피", icon: "🥗", action: () => { navigateTopic("recipes"); setMenuOpen(false); } },
              { label: "유튜브", icon: "▶️", action: () => setMenuOpen(false) },
              { label: "블로그", icon: "📝", action: () => { setPage(PAGES.BLOG); setMenuOpen(false); } },
              { label: "소개", icon: "👩‍⚕️", action: () => { setPage(PAGES.ABOUT); setMenuOpen(false); } },
              { label: "뉴스레터", icon: "📬", action: () => setMenuOpen(false) },
            ].map((item) => (
              <button key={item.label} onClick={item.action} style={{
                display: "flex", alignItems: "center", gap: 14, width: "100%",
                padding: "18px 0", background: "none", border: "none", borderBottom: `1px solid ${C.border}`,
                fontSize: 17, fontWeight: 700, color: C.forest, cursor: "pointer", fontFamily: font,
              }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}

            <div style={{ marginTop: 32 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 16, letterSpacing: 1 }}>TOPICS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {popularTopics.map((t) => (
                  <button key={t.id} onClick={() => { navigateTopic(t.id); setMenuOpen(false); }} style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
                    background: C.card, borderRadius: 10, border: `1px solid ${C.border}`,
                    cursor: "pointer", fontFamily: font,
                  }}>
                    <span style={{ fontSize: 18 }}>{t.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.forest }}>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 16, marginTop: 40, justifyContent: "center" }}>
              <span style={{ fontSize: 13, color: C.warm, fontWeight: 500 }}>YouTube</span>
              <a href="https://www.instagram.com/_a_little_space" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: C.warm, fontWeight: 500, textDecoration: "none" }}>Instagram</a>
              <span style={{ fontSize: 13, color: C.warm, fontWeight: 500 }}>Blog</span>
            </div>
          </nav>
        </div>
      )}

      {/* ═══ PAGE: HOME ═══ */}
      {page === PAGES.HOME && (
        <main>
          {/* Hero */}
          <section style={{ padding: "36px 20px 28px", textAlign: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16,
              background: C.greenSoft, borderRadius: 100, padding: "6px 16px",
              fontSize: 12, fontWeight: 700, color: C.green,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />
              주연의 리얼푸드 가이드
            </div>
            <h1 style={{ fontSize: 30, fontWeight: 900, color: C.forest, lineHeight: 1.25, letterSpacing: -1, margin: "0 0 12px" }}>
              진짜 음식이<br /><span style={{ color: C.green }}>진짜 건강</span>입니다
            </h1>
            <p style={{ fontSize: 15, color: C.warm, lineHeight: 1.7, margin: "0 0 24px", maxWidth: 320, marginLeft: "auto", marginRight: "auto" }}>
              초가공식품 OUT, 리얼푸드 IN.<br />
              해발 1,000m 목장에서 전하는 이야기.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <a href="https://www.instagram.com/_a_little_space" target="_blank" rel="noopener noreferrer" style={{
                padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 700,
                background: C.forest, color: "#fff", border: "none", cursor: "pointer", fontFamily: font,
                textDecoration: "none", display: "inline-block",
              }}>인스타 팔로우</a>
              <button onClick={() => setPage(PAGES.TOPICS)} style={{
                padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 700,
                background: "transparent", color: C.forest, border: `1.5px solid ${C.border}`,
                cursor: "pointer", fontFamily: font,
              }}>토픽 보기</button>
            </div>
          </section>

          {/* Korea Nutrition Stats */}
          <NutritionStatsSection />

          {/* Popular Topics — Mel Robbins style grid */}
          <section style={{ padding: "0 20px 32px" }}>
            <SectionHeader label="TOPICS" title="주제별 찾아보기" action="전체 보기" onAction={() => setPage(PAGES.TOPICS)} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              {popularTopics.map((t) => (
                <TopicCard key={t.id} topic={t} onClick={navigateTopic} />
              ))}
            </div>
          </section>

          {/* Latest Episodes */}
          <section style={{ padding: "0 20px 32px" }}>
            <SectionHeader label="LATEST" title="최신 콘텐츠" />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {featuredEpisodes.map((ep) => (
                <EpisodeCard key={ep.id} ep={ep} />
              ))}
            </div>
          </section>

          {/* Blog Latest */}
          <section style={{ padding: "0 20px 32px" }}>
            <SectionHeader label="BLOG" title="최신 블로그" action="전체 보기" onAction={() => setPage(PAGES.BLOG)} />
            {blogPosts.slice(0, 1).map((post) => (
              <button key={post.slug} onClick={() => navigateBlog(post.slug)} style={{
                background: C.card, borderRadius: 16, overflow: "hidden", textAlign: "left",
                border: `1px solid ${C.border}`, cursor: "pointer", fontFamily: font, width: "100%",
                transition: "all 0.2s",
              }}>
                <div style={{
                  height: 140, background: `linear-gradient(135deg, ${C.greenSoft}, ${C.goldSoft})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 56 }}>{post.thumbnail}</span>
                </div>
                <div style={{ padding: "14px 16px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.red, background: C.redSoft, padding: "3px 10px", borderRadius: 100 }}>
                      {post.topicIcon} {post.topic}
                    </span>
                    <span style={{ fontSize: 11, color: C.muted }}>{post.date}</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: C.forest, margin: "0 0 4px", lineHeight: 1.35 }}>{post.title}</h3>
                  <p style={{ fontSize: 13, color: C.warm, margin: 0 }}>{post.subtitle}</p>
                </div>
              </button>
            ))}
          </section>

          {/* Newsletter CTA */}
          <section style={{ padding: "0 20px 32px" }}>
            <div style={{
              background: C.forest, borderRadius: 20, padding: "32px 24px", textAlign: "center",
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📬</div>
              <h3 style={{ fontSize: 19, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>리얼푸드 뉴스레터</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: "0 0 20px" }}>
                매주 월요일, 주연이 고른<br />리얼푸드 팁과 제철 레시피를 보내드립니다.
              </p>
              <div style={{
                display: "flex", gap: 6, background: "rgba(255,255,255,0.1)",
                borderRadius: 12, padding: 5,
              }}>
                <input placeholder="이메일 주소" style={{
                  flex: 1, padding: "12px 14px", borderRadius: 8, border: "none",
                  background: "rgba(255,255,255,0.95)", fontSize: 14, fontFamily: font,
                  color: C.forest, outline: "none",
                }} />
                <button style={{
                  padding: "12px 18px", borderRadius: 8, border: "none",
                  background: C.green, color: "#fff", fontWeight: 700, fontSize: 13,
                  cursor: "pointer", fontFamily: font, whiteSpace: "nowrap",
                }}>구독</button>
              </div>
            </div>
          </section>

          {/* About teaser */}
          <section style={{ padding: "0 20px 40px" }}>
            <div style={{
              display: "flex", gap: 16, alignItems: "center",
              background: C.card, borderRadius: 16, padding: 20,
              border: `1px solid ${C.border}`,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 16, flexShrink: 0,
                background: C.greenSoft, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 32,
              }}>👩‍⚕️</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: C.forest, marginBottom: 2 }}>주연</div>
                <div style={{ fontSize: 12, color: C.warm, lineHeight: 1.5 }}>
                  해발 1,000m 삼수령 무무목장에서 A2 저지 젖소를 키우는 가족과 함께합니다.
                </div>
              </div>
              <button onClick={() => setPage(PAGES.ABOUT)} style={{
                fontSize: 18, background: "none", border: "none", cursor: "pointer", color: C.warm, padding: 0,
              }}>→</button>
            </div>
          </section>
        </main>
      )}

      {/* ═══ PAGE: TOPICS (Mel Robbins style) ═══ */}
      {page === PAGES.TOPICS && (
        <main style={{ padding: "28px 20px 40px" }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: C.forest, margin: "0 0 32px", letterSpacing: -0.5 }}>Topics</h1>

          {/* Most Popular — larger cards */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: 1.5, marginBottom: 14 }}>MOST POPULAR</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
              {popularTopics.map((t) => (
                <TopicCard key={t.id} topic={t} onClick={navigateTopic} size="large" />
              ))}
            </div>
          </div>

          {/* Additional Topics — compact */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: 1.5, marginBottom: 14 }}>ADDITIONAL TOPICS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {additionalTopics.map((t) => (
                <TopicCard key={t.id} topic={t} onClick={navigateTopic} />
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ═══ PAGE: TOPIC DETAIL ═══ */}
      {page === PAGES.TOPIC_DETAIL && currentTopic && (
        <main style={{ padding: "28px 20px 40px" }}>
          {/* Topic header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span style={{ fontSize: 48, display: "block", marginBottom: 12 }}>{currentTopic.icon}</span>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: C.forest, margin: "0 0 6px" }}>{currentTopic.label}</h1>
            {currentTopic.desc && <p style={{ fontSize: 14, color: C.warm, margin: 0 }}>{currentTopic.desc}</p>}
            <div style={{ fontSize: 12, color: C.muted, marginTop: 8 }}>{currentTopic.count || "—"}개 콘텐츠</div>
          </div>

          {/* Episodes for this topic */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {featuredEpisodes
              .filter((ep) => ep.topic === currentTopic.label || true) // show all as demo
              .map((ep) => (
                <EpisodeCard key={ep.id} ep={ep} />
              ))}
          </div>

          {/* Related topics */}
          <div style={{ marginTop: 40 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: 1.5, marginBottom: 14 }}>RELATED TOPICS</div>
            <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, WebkitOverflowScrolling: "touch" }}>
              {popularTopics.filter((t) => t.id !== selectedTopic).slice(0, 4).map((t) => (
                <div key={t.id} style={{ flexShrink: 0, width: 100 }}>
                  <TopicCard topic={t} onClick={navigateTopic} />
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ═══ PAGE: ABOUT ═══ */}
      {page === PAGES.ABOUT && (
        <main style={{ padding: "28px 20px 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{
              width: 96, height: 96, borderRadius: 24, margin: "0 auto 16px",
              background: C.greenSoft, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 48,
            }}>👩‍⚕️</div>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: C.forest, margin: "0 0 4px" }}>주연</h1>
            <p style={{ fontSize: 13, color: C.warm, margin: 0 }}>리얼푸드 가이드</p>
          </div>

          <div style={{
            background: C.card, borderRadius: 16, padding: 24,
            border: `1px solid ${C.border}`, marginBottom: 20,
          }}>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: C.forest, margin: "0 0 16px" }}>
              안녕하세요, <strong>주연</strong>입니다.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: C.forest, margin: "0 0 16px" }}>
              세 아이를 키우는 영양사로서 영양상담을 하다보면 매일 같은 질문을 받습니다.
              <em style={{ color: C.green }}> &ldquo;뭘 먹어야 건강해질까요? 다이어트를 어떻게 할까요?&rdquo;</em>
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: C.forest, margin: "0 0 16px" }}>
              답은 생각보다 단순합니다. <strong>진짜 음식을 먹으면 됩니다.</strong>
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: C.forest, margin: 0 }}>
              해발 1,000m 삼수령 무무목장에서 A2 저지 젖소를 키우는 가족과 함께,
              직접 먹고 만들고 검증한 리얼푸드 이야기를 나누겠습니다.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { icon: "🐄", label: "삼수령 무무목장" },
              { icon: "🥛", label: "A2 저지 젖소 사육" },
              { icon: "👨‍👩‍👧‍👦", label: "세 아이의 엄마" },
              { icon: "🌿", label: "리얼푸드 연구가" },
            ].map((item) => (
              <div key={item.label} style={{
                background: C.card, borderRadius: 12, padding: "16px 14px",
                border: `1px solid ${C.border}`, textAlign: "center",
              }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.forest }}>{item.label}</div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ═══ PAGE: BLOG LIST ═══ */}
      {page === PAGES.BLOG && (
        <main style={{ padding: "28px 20px 40px" }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: C.forest, margin: "0 0 8px", letterSpacing: -0.5 }}>블로그</h1>
          <p style={{ fontSize: 14, color: C.warm, margin: "0 0 28px" }}>주연이 직접 쓰는 리얼푸드 칼럼</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {blogPosts.map((post) => (
              <button key={post.slug} onClick={() => navigateBlog(post.slug)} style={{
                background: C.card, borderRadius: 16, overflow: "hidden", textAlign: "left",
                border: `1px solid ${C.border}`, cursor: "pointer", fontFamily: font, width: "100%",
                transition: "all 0.2s",
              }}>
                <div style={{
                  height: 160, background: `linear-gradient(135deg, ${C.greenSoft}, ${C.goldSoft})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 64 }}>{post.thumbnail}</span>
                </div>
                <div style={{ padding: "14px 16px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.red, background: C.redSoft, padding: "3px 10px", borderRadius: 100 }}>
                      {post.topicIcon} {post.topic}
                    </span>
                    <span style={{ fontSize: 11, color: C.muted }}>{post.date}</span>
                    <span style={{ fontSize: 11, color: C.muted }}>{post.readTime} 읽기</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: C.forest, margin: "0 0 4px", lineHeight: 1.35 }}>{post.title}</h3>
                  <p style={{ fontSize: 13, color: C.warm, margin: 0, lineHeight: 1.5 }}>{post.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </main>
      )}

      {/* ═══ PAGE: BLOG POST ═══ */}
      {page === PAGES.BLOG_POST && currentBlogPost && (
        <main style={{ padding: "0 0 40px" }}>
          {/* Hero */}
          <div style={{
            height: 200, background: `linear-gradient(135deg, ${C.greenSoft}, ${C.goldSoft})`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 80 }}>{currentBlogPost.thumbnail}</span>
          </div>

          <div style={{ padding: "20px 20px 0" }}>
            {/* Meta */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.red, background: C.redSoft, padding: "3px 10px", borderRadius: 100 }}>
                {currentBlogPost.topicIcon} {currentBlogPost.topic}
              </span>
              <span style={{ fontSize: 12, color: C.muted }}>{currentBlogPost.date}</span>
              <span style={{ fontSize: 12, color: C.muted }}>{currentBlogPost.readTime} 읽기</span>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: 24, fontWeight: 900, color: C.forest, margin: "0 0 6px", lineHeight: 1.3, letterSpacing: -0.5 }}>
              {currentBlogPost.title}
            </h1>
            <p style={{ fontSize: 15, color: C.warm, margin: "0 0 20px", fontWeight: 500 }}>{currentBlogPost.subtitle}</p>

            {/* Author */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12, padding: "14px 0",
              borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, marginBottom: 24,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, background: C.greenSoft,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
              }}>👩‍⚕️</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.forest }}>주연</div>
                <div style={{ fontSize: 11, color: C.muted }}>리얼푸드 가이드</div>
              </div>
            </div>

            {/* Content */}
            <article style={{ fontSize: 15, lineHeight: 1.9, color: C.forest }}>
              {currentBlogPost.content.split("\n").map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return <div key={i} style={{ height: 12 }} />;
                if (trimmed.startsWith("## ")) {
                  return <h2 key={i} style={{ fontSize: 20, fontWeight: 800, color: C.forest, margin: "32px 0 12px", lineHeight: 1.3 }}>
                    {trimmed.replace("## ", "")}
                  </h2>;
                }
                if (trimmed.startsWith("---")) {
                  return <hr key={i} style={{ border: "none", borderTop: `1px solid ${C.border}`, margin: "28px 0" }} />;
                }
                if (trimmed.startsWith("- **")) {
                  return <div key={i} style={{ padding: "6px 0 6px 16px", borderLeft: `3px solid ${C.green}`, margin: "4px 0", fontSize: 14 }}>
                    <span dangerouslySetInnerHTML={{ __html: trimmed.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                  </div>;
                }
                if (trimmed.startsWith("- ")) {
                  return <div key={i} style={{ padding: "4px 0 4px 16px", fontSize: 14 }}>
                    • {trimmed.replace("- ", "")}
                  </div>;
                }
                return <p key={i} style={{ margin: "0 0 16px" }}
                  dangerouslySetInnerHTML={{
                    __html: trimmed
                      .replace(/\*\*(.*?)\*\*/g, `<strong style="color:${C.forest}">$1</strong>`)
                      .replace(/\*(.*?)\*/g, `<em style="color:${C.green}">$1</em>`)
                  }}
                />;
              })}
            </article>

            {/* CTA */}
            <div style={{
              background: C.greenSoft, borderRadius: 16, padding: 24, marginTop: 32, textAlign: "center",
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.forest, marginBottom: 8 }}>이 글이 도움이 되셨나요?</div>
              <div style={{ fontSize: 13, color: C.warm, marginBottom: 16 }}>인스타그램에서 더 많은 리얼푸드 콘텐츠를 만나보세요</div>
              <a href="https://www.instagram.com/_a_little_space" target="_blank" rel="noopener noreferrer" style={{
                padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 700,
                background: C.forest, color: "#fff", border: "none", cursor: "pointer", fontFamily: font,
                textDecoration: "none", display: "inline-block",
              }}>📷 인스타그램 팔로우</a>
            </div>
          </div>
        </main>
      )}

      {/* ═══ Footer ═══ */}
      <footer style={{ padding: "24px 20px 100px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 16 }}>🥬</span>
            <span style={{ fontWeight: 800, fontSize: 14, color: C.forest }}>리얼푸드 주연</span>
          </div>
          <div style={{ display: "flex", gap: 14, fontSize: 12, color: C.muted }}>
            <span>YouTube</span>
            <a href="https://www.instagram.com/_a_little_space" target="_blank" rel="noopener noreferrer" style={{ color: C.muted, textDecoration: "none" }}>Instagram</a>
            <span>Blog</span>
          </div>
        </div>
        <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
          © 2026 리얼푸드 주연. All rights reserved.<br />
          삼수령 무무목장 · 강원도 태백시
        </div>
      </footer>

      {/* ═══ Bottom Navigation ═══ */}
      <nav style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 480, zIndex: 40,
        background: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)",
        borderTop: `1px solid ${C.border}`,
        display: "flex", justifyContent: "space-around",
        padding: "6px 0 env(safe-area-inset-bottom, 10px)",
      }}>
        {[
          { icon: "🏠", label: "홈", pg: PAGES.HOME },
          { icon: "📚", label: "토픽", pg: PAGES.TOPICS },
          { icon: "📝", label: "블로그", pg: PAGES.BLOG },
          { icon: "🐄", label: "목장", pg: PAGES.TOPIC_DETAIL, topicId: "farm" },
          { icon: "👩‍⚕️", label: "소개", pg: PAGES.ABOUT },
        ].map((item) => {
          const active = item.pg === page && (!item.topicId || item.topicId === selectedTopic);
          return (
            <button key={item.label} onClick={() => {
              if (item.topicId) { navigateTopic(item.topicId); } else { setPage(item.pg); setSelectedTopic(null); }
            }} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
              background: "none", border: "none", cursor: "pointer", padding: "6px 12px",
              fontFamily: font,
            }}>
              <span style={{ fontSize: 20, opacity: active ? 1 : 0.45, transition: "opacity 0.15s" }}>{item.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: active ? C.green : C.muted, transition: "color 0.15s" }}>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
