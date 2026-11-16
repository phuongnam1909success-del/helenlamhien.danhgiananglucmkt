import React, { useEffect, useRef, useState } from 'react';
import { LEVELS, QUESTIONS, QuestionOption, SHIFT_DATA } from './data/assessmentData';
import { CheckSymbol, PillarSymbol, SoundSymbol } from './components/Symbols';
import { RadarChart } from './components/RadarChart';
import { submitAssessmentToGAS } from './services/gasApi';

type ViewState = 'hero' | 'test' | 'calculating' | 'results';

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  const [view, setView] = useState<ViewState>('hero');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [shiftFlipped, setShiftFlipped] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState<Record<string, QuestionOption[]>>({});

  const [calcPercent, setCalcPercent] = useState(10);
  const [calcStatus, setCalcStatus] = useState('Đang tổng hợp trải nghiệm thực hành...');
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'saved' | 'offline'>('idle');
  const [copiedToast, setCopiedToast] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const playTone = (freq: number, duration = 0.08, type: OscillatorType = 'sine', vol = 0.08) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new Ctx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(vol, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      osc.start();
      osc.stop(audioCtxRef.current.currentTime + duration);
    } catch {
      // Ignore audio errors
    }
  };

  const playSelectSound = () => {
    playTone(587.33, 0.07, 'sine', 0.07);
    setTimeout(() => playTone(880, 0.09, 'sine', 0.06), 45);
  };

  const playNextSound = () => playTone(659.25, 0.08, 'triangle', 0.07);

  const playLevelUpSound = () => {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
      setTimeout(() => playTone(f, 0.16, 'sine', 0.08), idx * 80);
    });
  };

  const launchConfetti = () => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 120,
      w: 6 + Math.random() * 6,
      h: 4 + Math.random() * 4,
      vy: 2.5 + Math.random() * 3.5,
      vx: (Math.random() - 0.5) * 2.5,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.15,
      color: Math.random() > 0.35 ? '#5ce1e6' : '#ffffff',
    }));

    let frames = 0;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      frames++;
      if (frames < 130) {
        requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    requestAnimationFrame(tick);
  };

  const startNewSession = () => {
    playNextSound();
    const map: Record<string, QuestionOption[]> = {};
    QUESTIONS.forEach((q) => {
      map[q.id] = shuffleArray(q.options);
    });
    setShuffledOptionsMap(map);
    setAnswers({});
    setCurrentIndex(0);
    setSyncStatus('idle');
    setView('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishTest = async (finalAnswers: Record<string, number>) => {
    setView('calculating');
    setCalcPercent(10);
    setCalcStatus('Đang tổng hợp ma trận trải nghiệm thực hành...');

    const scores = QUESTIONS.map((q) => ({ ...q, score: finalAnswers[q.id] || 1 }));
    const total = scores.reduce((sum, item) => sum + item.score, 0);
    const level = LEVELS.find((l) => total >= l.min && total <= l.max) || LEVELS[0];

    const gasPromise = submitAssessmentToGAS({
      customer_thinking: finalAnswers.q1 || 1,
      execution: finalAnswers.q2 || 1,
      data_literacy: finalAnswers.q3 || 1,
      ai_literacy: finalAnswers.q4 || 1,
      learning_agility: finalAnswers.q5 || 1,
      total_score: total,
      level_title: level.title,
      user_agent: navigator.userAgent,
    });

    setTimeout(() => {
      setCalcPercent(42);
      setCalcStatus('Đang đối chiếu với The Talent Framework...');
    }, 450);

    setTimeout(() => {
      setCalcPercent(78);
      setCalcStatus('Đang tạo các task hành động cụ thể để nâng cao năng lực...');
    }, 950);

    const saved = await gasPromise;
    setSyncStatus(saved ? 'saved' : 'offline');

    setTimeout(() => {
      setCalcPercent(100);
      setCalcStatus('Hoàn tất ma trận năng lực!');
      setView('results');
      playLevelUpSound();
      launchConfetti();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  useEffect(() => {
    if (view !== 'results') return;
    const total = QUESTIONS.reduce((sum, q) => sum + (answers[q.id] || 1), 0);
    setAnimatedTotal(0);
    let current = 0;
    const timer = setInterval(() => {
      if (current < total) {
        current++;
        setAnimatedTotal(current);
      } else {
        clearInterval(timer);
      }
    }, 45);
    return () => clearInterval(timer);
  }, [view, answers]);

  const currentQ = QUESTIONS[currentIndex];
  const completedCount = Object.keys(answers).length;
  const resultScores = QUESTIONS.map((q) => ({ ...q, score: answers[q.id] || 1 }));
  const totalScore = resultScores.reduce((sum, item) => sum + item.score, 0);
  const currentLevel = LEVELS.find((l) => totalScore >= l.min && totalScore <= l.max) || LEVELS[0];
  const sortedScores = [...resultScores].sort((a, b) => b.score - a.score);
  const strongest = sortedScores[0];
  const weakest = sortedScores[sortedScores.length - 1];
  const letters = ['A', 'B', 'C', 'D', 'E'];

  const copyMatrixAndActions = async () => {
    const text = [
      'REFLECT – MY TALENT SNAPSHOT',
      'Ma trận năng lực ứng với The Talent Framework — Không phải bài đánh giá năng lực chuẩn hóa hay cấp chứng chỉ.',
      `Tổng điểm tham khảo: ${totalScore} / 25 điểm (${currentLevel.title})`,
      '',
      ...resultScores.map((item) => {
        const step = item.steps[item.score - 1];
        return [
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
          `Trụ cột: ${item.pillarEn} (${item.pillarVi}) - Mức ${item.score}/5`,
          `◈ TASK THỰC HÀNH CỤ THỂ: ${step.do}`,
          `✦ BẮT ĐẦU TRONG 24H: ${step.first}`,
          `● HOẠT ĐỘNG CLB / NHÓM: ${step.club}`,
          `■ ĐẦU RA CẦN NỘP: ${step.proof}`,
          `▲ TIÊU CHÍ KIỂM CHỨNG: ${step.check}`,
        ].join('\n');
      }),
    ].join('\n\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  return (
    <div className="relative min-h-screen font-sans text-white">
      <canvas ref={confettiCanvasRef} className="fixed inset-0 pointer-events-none z-50" />

      {/* Animated Peacock Teal (#0c4348) & Cyan (#5ce1e6) Light Waves */}
      <div className="wave-bg" aria-hidden="true">
        <svg className="wave-svg" viewBox="0 0 1440 520" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0c4348" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#5ce1e6" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#0c4348" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5ce1e6" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#0c4348" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#5ce1e6" stopOpacity="0.24" />
            </linearGradient>
            <filter id="softGlow" x="-10%" y="-20%" width="120%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path className="wave-path-3" d="M0,310 C240,210 480,390 720,285 C960,180 1200,340 1440,250 L1440,520 L0,520 Z" fill="url(#waveGrad2)" />
          <path className="wave-path-2" d="M0,340 C260,420 510,220 760,315 C1010,410 1230,240 1440,320" fill="none" stroke="#5ce1e6" strokeOpacity="0.5" strokeWidth="2.5" filter="url(#softGlow)" />
          <path className="wave-path-1" d="M0,375 C280,280 540,445 810,350 C1080,255 1280,390 1440,335 L1440,520 L0,520 Z" fill="url(#waveGrad1)" />
          <path className="wave-path-1" d="M0,375 C280,280 540,445 810,350 C1080,255 1280,390 1440,335" fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.6" filter="url(#softGlow)" />
        </svg>
      </div>

      {/* Floating Particles */}
      <div className="particle w-2 h-2 top-16 left-8" style={{ animationDelay: '0s' }} />
      <div className="particle w-1.5 h-1.5 top-32 right-12" style={{ animationDelay: '1.8s' }} />
      <div className="particle w-2.5 h-2.5 bottom-36 left-16" style={{ animationDelay: '3.1s' }} />
      <div className="particle w-1.5 h-1.5 bottom-24 right-20" style={{ animationDelay: '4.4s' }} />

      {/* Header */}
      <header className="relative z-20 w-full max-w-md md:max-w-5xl mx-auto px-4 pt-4 md:px-8 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-bold tracking-wide text-[#5ce1e6]">
          <span className="w-2 h-2 rounded-full bg-[#5ce1e6] animate-pulse" />
          <span>READY TO WORK? · THE TALENT FRAMEWORK</span>
        </div>
        <button
          type="button"
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            if (next) playSelectSound();
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-pill text-xs text-white hover:border-[#5ce1e6] transition font-medium"
        >
          <span className="text-[#5ce1e6]">
            <SoundSymbol enabled={soundEnabled} />
          </span>
          <span>{soundEnabled ? 'Âm thanh: Bật' : 'Âm thanh: Tắt'}</span>
        </button>
      </header>

      <main className="relative z-10 w-full max-w-md md:max-w-5xl mx-auto min-h-[calc(100vh-56px)] flex flex-col justify-center px-4 py-4 md:px-8 md:py-8">
        {/* VIEW 1: HERO */}
        {view === 'hero' && (
          <section className="w-full space-y-5 animate-in">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border-2 border-[#5ce1e6]/50 shadow-2xl shimmer-overlay">
                  <img
                    src="/images/banner.jpg"
                    alt="Ready To Work - FPT Polytechnic - Helen Lâm Hiền"
                    className="w-full h-auto object-cover block"
                  />
                </div>

                {/* THE SHIFT Interactive Strip */}
                <div className="glass-card rounded-2xl p-3.5 md:p-4">
                  <div className="flex items-center justify-between mb-2.5 gap-2">
                    <span className="text-xs md:text-sm font-bold tracking-wide text-[#5ce1e6] inline-flex items-center gap-1.5">
                      <span className="text-base text-[#5ce1e6]">✦</span>
                      <span>THE SHIFT — CUỘC CHUYỂN DỊCH CỦA MARKETER</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setShiftFlipped(!shiftFlipped);
                        playSelectSound();
                      }}
                      className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-[#5ce1e6] text-black font-bold hover:bg-white transition shrink-0"
                    >
                      <span className="font-bold text-sm">⇄</span>
                      <span>LẬT THẺ</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {SHIFT_DATA.map((item, idx) => (
                      <div
                        key={idx}
                        className={`rounded-xl p-2.5 border transition-all duration-300 ${
                          shiftFlipped
                            ? 'bg-[#5ce1e6] text-black border-white shadow-[0_0_14px_rgba(92,225,230,0.45)]'
                            : 'bg-black/45 text-white border-white/20'
                        }`}
                      >
                        <div className={`text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1 ${shiftFlipped ? 'text-black/75' : 'text-[#5ce1e6]'}`}>
                          {shiftFlipped ? 'ĐANG CHUYỂN DỊCH' : 'TRƯỚC ĐÂY'}
                        </div>
                        <div className="text-xs md:text-sm leading-tight font-medium">
                          {shiftFlipped ? item.after : item.before}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col gap-4">
                <div className="glass-card rounded-2xl p-4 md:p-6 space-y-3.5">
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-snug text-white">
                    ĐIỀU GÌ KHIẾN DOANH NGHIỆP <span className="text-[#5ce1e6]">CHỌN BẠN</span>?
                  </h1>

                  {/* Notice FrameWork & Practice Disclaimer */}
                  <div className="rounded-xl bg-[#5ce1e6]/10 border border-[#5ce1e6]/40 p-3.5 text-xs md:text-sm leading-relaxed text-white/95 space-y-1.5">
                    <div className="text-xs font-bold text-[#5ce1e6] tracking-wider uppercase flex items-center gap-1.5">
                      <span className="text-[#5ce1e6] text-sm">✦</span>
                      <span>Ý NGHĨA BÀI TỰ PHẢN TƯ</span>
                    </div>
                    <p>
                      <strong>Đây không phải bài kiểm tra hoặc đánh giá năng lực.</strong> Kết quả được thể hiện dưới dạng <strong>ma trận năng lực (Talent Matrix)</strong> ứng với <strong>The Talent Framework</strong>, giúp bạn định vị trải nghiệm thực hành hiện tại và nhận <strong>gợi ý các hoạt động, task cụ thể để nâng cao năng lực</strong>.
                    </p>
                  </div>

                  <div className="pt-1">
                    <div className="flex items-center justify-between text-xs text-[#5ce1e6] font-bold tracking-wider mb-2">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="text-sm">◈</span>
                        <span>5 TRỤ CỘT THE TALENT FRAMEWORK</span>
                      </span>
                      <span>5 CÂU HỎI</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5 text-center">
                      {QUESTIONS.map((q) => (
                        <div key={q.id} className="pillar-chip rounded-xl py-2 px-1" title={q.pillarVi}>
                          <div className="text-[#5ce1e6] mb-1 flex justify-center">
                            <PillarSymbol pillar={q.key} />
                          </div>
                          <div className="text-[10px] font-bold tracking-wide text-white leading-tight">{q.shortLabel}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="glass-pill rounded-xl py-2 px-2 text-center">
                      <div className="text-sm font-bold text-[#5ce1e6]">05 CÂU</div>
                      <div className="text-xs text-white/90">Trải nghiệm</div>
                    </div>
                    <div className="glass-pill rounded-xl py-2 px-2 text-center">
                      <div className="text-sm font-bold text-white">~5 PHÚT</div>
                      <div className="text-xs text-white/90">Tự phản tư</div>
                    </div>
                    <div className="glass-pill rounded-xl py-2 px-2 text-center">
                      <div className="text-sm font-bold text-[#5ce1e6]">MA TRẬN</div>
                      <div className="text-xs text-white/90">Gợi ý task</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-black/50 border border-[#5ce1e6]/40 p-3.5 flex gap-3 items-start backdrop-blur-md">
                  <div className="w-7 h-7 rounded-lg bg-[#5ce1e6] text-black flex items-center justify-center shrink-0 mt-0.5 font-black text-sm">
                    !
                  </div>
                  <div className="text-xs md:text-sm text-white/95 leading-relaxed">
                    <span className="text-xs font-bold text-[#5ce1e6] tracking-wider block mb-0.5">NGUYÊN TẮC THAM GIA:</span>
                    “Hãy chọn điều bạn đã thực sự làm, không phải điều bạn nghĩ mình có thể làm. Mỗi câu chỉ cần chọn 1 mức từ 1–5.”
                  </div>
                </div>

                <div className="pt-1">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-[#5ce1e6]/35 pulse-ring pointer-events-none" />
                    <button
                      type="button"
                      onClick={startNewSession}
                      className="relative w-full btn-primary-glow font-black text-base md:text-lg py-4 px-6 rounded-2xl flex items-center justify-center gap-2 tracking-wide"
                    >
                      <span>BẮT ĐẦU TỰ PHẢN TƯ NGAY</span>
                      <span className="font-bold text-lg">→</span>
                    </button>
                  </div>
                  <p className="text-center text-xs text-white/80 mt-2">
                    Không thu thập họ tên hoặc email • Hoàn toàn bảo mật
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* VIEW 2: QUESTIONNAIRE */}
        {view === 'test' && (
          <section className="w-full max-w-2xl mx-auto flex flex-col justify-between gap-4 animate-in">
            <div className="space-y-4">
              <div className="glass-card rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="font-bold tracking-wider text-[#5ce1e6]">
                    NHIỆM VỤ {String(currentIndex + 1).padStart(2, '0')} / {String(QUESTIONS.length).padStart(2, '0')}
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-[#5ce1e6] text-black font-black text-xs tracking-wider">
                    {completedCount * 20} / 100 XP
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-1.5 text-center">
                  {QUESTIONS.map((item, idx) => {
                    const isDone = Boolean(answers[item.id]);
                    const isCurrent = idx === currentIndex;
                    return (
                      <div
                        key={item.id}
                        className={`pillar-chip rounded-xl py-1.5 px-1 ${isDone ? 'unlocked' : isCurrent ? 'active' : ''}`}
                      >
                        <div className={`mb-0.5 flex justify-center ${isDone ? 'text-black' : 'text-[#5ce1e6]'}`}>
                          {isDone ? <CheckSymbol /> : <PillarSymbol pillar={item.key} />}
                        </div>
                        <div className="text-[10px] font-bold leading-tight">{item.shortLabel}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="w-full h-2.5 rounded-full bg-black/60 overflow-hidden p-0.5 border border-[#5ce1e6]/30">
                  <div
                    className="h-full rounded-full bg-[#5ce1e6] transition-all duration-500 ease-out"
                    style={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <div key={currentQ.id} className="glass-card rounded-2xl p-5 md:p-7 space-y-4 animate-in">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5ce1e6] shadow-[0_0_10px_#5ce1e6]" />
                    <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#5ce1e6]">
                      {currentQ.pillarEn.toUpperCase()} • {currentQ.pillarVi}
                    </span>
                  </div>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full border border-white/25 bg-black/40 text-white font-bold">
                    BÀI TOÁN: {currentQ.bizImpact}
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">
                  {currentQ.question}
                </h2>

                <p className="text-sm text-[#5ce1e6] font-medium">
                  Hãy chọn 1 phương án đúng nhất với trải nghiệm thực tế bạn đã làm:
                </p>

                <div className="space-y-2.5 md:space-y-3">
                  {(shuffledOptionsMap[currentQ.id] || currentQ.options).map((opt, idx) => {
                    const isSelected = answers[currentQ.id] === opt.score;
                    return (
                      <button
                        key={opt.score}
                        type="button"
                        onClick={() => {
                          playSelectSound();
                          setAnswers((prev) => ({ ...prev, [currentQ.id]: opt.score }));
                        }}
                        className={`option-card w-full text-left rounded-xl p-3.5 md:p-4 flex items-start gap-3 ${isSelected ? 'selected' : ''}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${
                            isSelected ? 'bg-[#5ce1e6] text-black' : 'bg-[#0c4348] text-white border border-white/25'
                          }`}
                        >
                          {letters[idx]}
                        </span>
                        <span className={`text-sm md:text-base leading-relaxed ${isSelected ? 'text-white font-semibold' : 'text-white/90'}`}>
                          {opt.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-1 pb-2 flex items-center gap-3">
              {currentIndex > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    playNextSound();
                    setCurrentIndex((i) => i - 1);
                  }}
                  className="px-5 py-3.5 rounded-xl border border-[#5ce1e6]/40 bg-black/50 text-white font-bold text-xs md:text-sm hover:bg-[#0c4348] transition"
                >
                  ← QUAY LẠI
                </button>
              )}
              <button
                type="button"
                disabled={!answers[currentQ.id]}
                onClick={() => {
                  if (!answers[currentQ.id]) return;
                  playNextSound();
                  if (currentIndex < QUESTIONS.length - 1) {
                    setCurrentIndex((i) => i + 1);
                  } else {
                    handleFinishTest(answers);
                  }
                }}
                className="flex-1 btn-primary-glow font-black text-sm md:text-base py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 tracking-wide"
              >
                <span>{currentIndex === QUESTIONS.length - 1 ? 'HOÀN THÀNH & XEM MA TRẬN NĂNG LỰC' : 'CÂU TIẾP THEO'}</span>
                <span className="font-bold text-lg">→</span>
              </button>
            </div>
          </section>
        )}

        {/* VIEW 3: CALCULATING */}
        {view === 'calculating' && (
          <section className="w-full max-w-md mx-auto flex flex-col items-center justify-center text-center px-4 py-12 animate-in">
            <div className="relative w-36 h-36 flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-[#5ce1e6]/25" />
              <div className="absolute inset-4 rounded-full border border-[#5ce1e6]/40" />
              <div className="absolute inset-8 rounded-full border border-white/40" />
              <div
                className="absolute inset-0 rounded-full radar-sweep"
                style={{ background: 'conic-gradient(from 0deg, rgba(92,225,230,0.55) 0deg, transparent 75deg)' }}
              />
              <div className="relative z-10 w-16 h-16 rounded-full bg-[#0c4348] border-2 border-[#5ce1e6] flex items-center justify-center shadow-[0_0_24px_rgba(92,225,230,0.5)]">
                <span className="text-xl font-black text-white">{calcPercent}%</span>
              </div>
            </div>
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">ĐANG TẠO MA TRẬN NĂNG LỰC</h2>
            <p className="text-sm md:text-base text-[#5ce1e6] font-medium min-h-[28px]">{calcStatus}</p>
            <div className="w-64 h-2 rounded-full bg-black/60 mt-5 overflow-hidden border border-[#5ce1e6]/30">
              <div className="h-full bg-[#5ce1e6] transition-all duration-300" style={{ width: `${calcPercent}%` }} />
            </div>
          </section>
        )}

        {/* VIEW 4: RESULTS */}
        {view === 'results' && (
          <section className="w-full pb-8 animate-in space-y-6">
            {/* Top Disclaimer Banner */}
            <div className="glass-card rounded-2xl p-4 md:p-6 border-[#5ce1e6]/60 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[#5ce1e6] text-lg">✦</span>
                <h2 className="text-xl md:text-2xl font-black text-[#5ce1e6] tracking-tight">
                  YOUR TALENT SNAPSHOT — MA TRẬN NĂNG LỰC CỦA BẠN
                </h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-white/95">
                Đối chiếu 5 trải nghiệm vừa chọn với <strong>The Talent Framework</strong>. <strong>Đây không phải bài đánh giá năng lực kết luận mức năng lực thực tế</strong> của bạn, mà là kết quả dạng <strong>ma trận năng lực</strong> phản ánh mức độ trải nghiệm thực hành do bạn tự báo cáo, đi kèm <strong>gợi ý các hoạt động & task cụ thể</strong> để bạn chủ động nâng cao năng lực.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-start">
              {/* Left Column: Summary Badge & Radar Chart */}
              <div className="md:col-span-5 space-y-4">
                <div className="glass-card rounded-2xl p-5 text-center relative overflow-hidden">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5ce1e6]/15 border border-[#5ce1e6]/50 text-xs font-bold uppercase tracking-wider text-[#5ce1e6] mb-3">
                    <span className="text-[#5ce1e6] text-xs">★</span>
                    <span>MỨC ĐỘ THỰC HÀNH CỦA BẠN</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1.5 mb-1">
                    <span className="text-5xl md:text-6xl font-black text-white">{animatedTotal}</span>
                    <span className="text-xl font-bold text-[#5ce1e6]">/ 25 điểm</span>
                  </div>
                  <div className={`inline-block mt-1 mb-2.5 px-4 py-1.5 rounded-xl font-bold text-sm ${currentLevel.badgeClass}`}>
                    {currentLevel.title}
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed">{currentLevel.desc}</p>
                  {syncStatus === 'saved' && (
                    <p className="text-xs text-[#5ce1e6] font-bold tracking-wider mt-2">✓ ĐÃ GHI NHẬN KẾT QUẢ VÀO GOOGLE SHEET</p>
                  )}
                </div>

                <div className="glass-card rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white tracking-wide">
                      BIỂU ĐỒ MA TRẬN — THE TALENT FRAMEWORK
                    </h3>
                    <span className="text-xs text-[#5ce1e6] font-bold">THANG 1–5</span>
                  </div>
                  <RadarChart items={resultScores} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-card rounded-2xl p-3.5 border-[#5ce1e6]/60">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#5ce1e6] mb-1 inline-flex items-center gap-1">
                      <span>▲</span>
                      <span>ĐIỂM TỰA NỔI BẬT</span>
                    </div>
                    <div className="font-bold text-base text-white">{strongest.pillarVi}</div>
                    <div className="text-xs text-[#5ce1e6] mt-0.5">
                      {strongest.score}/5 điểm ({strongest.pillarEn})
                    </div>
                  </div>
                  <div className="glass-card rounded-2xl p-3.5 border-white/40">
                    <div className="text-xs font-bold uppercase tracking-wider text-white mb-1 inline-flex items-center gap-1">
                      <span>▼</span>
                      <span>ƯU TIÊN BÙ ĐẮP</span>
                    </div>
                    <div className="font-bold text-base text-white">{weakest.pillarVi}</div>
                    <div className="text-xs text-white/80 mt-0.5">
                      {weakest.score}/5 điểm ({weakest.pillarEn})
                    </div>
                  </div>
                </div>

                {/* Quick Copy Action */}
                <button
                  type="button"
                  onClick={copyMatrixAndActions}
                  className="w-full py-3.5 px-4 rounded-xl border border-[#5ce1e6] bg-[#5ce1e6]/20 text-[#5ce1e6] font-bold text-sm tracking-wide hover:bg-[#5ce1e6] hover:text-black transition flex items-center justify-center gap-2"
                >
                  <span className="text-base font-bold">⧉</span>
                  <span>{copiedToast ? '✓ ĐÃ SAO CHÉP MA TRẬN & TASK!' : 'SAO CHÉP MA TRẬN & GỢI Ý HÀNH ĐỘNG'}</span>
                </button>
              </div>

              {/* Right Column: Detailed Practical Tasks / Action Cards */}
              <div className="md:col-span-7 space-y-4">
                <div className="glass-card rounded-2xl p-4 md:p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg md:text-xl font-black text-white tracking-tight">
                        YOUR NEXT MOVE · GỢI Ý THỰC HÀNH CỤ THỂ
                      </h3>
                      <p className="text-xs md:text-sm text-white/80 mt-0.5">
                        Dưới đây là 5 task gợi ý cá nhân hóa theo mức vừa chọn. Mỗi task có bước khởi động 24h, đầu ra minh chứng và tiêu chí kiểm chứng.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {resultScores.map((item) => {
                      const step = item.steps[item.score - 1];
                      const tagLabel = item.score === 5 ? 'Mức 5 · Mở rộng' : `Mức ${item.score} → Mức ${item.score + 1}`;
                      return (
                        <div key={item.id} className="rounded-2xl bg-black/45 border border-[#5ce1e6]/35 p-4 space-y-3">
                          <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-2.5">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[#5ce1e6]">
                                  <PillarSymbol pillar={item.key} />
                                </span>
                                <h4 className="font-bold text-base text-white">
                                  {item.pillarEn.toUpperCase()} — {item.pillarVi}
                                </h4>
                              </div>
                              <span className="text-xs text-[#5ce1e6]">
                                Điểm tự báo cáo: <strong>{item.score}/5</strong>
                              </span>
                            </div>
                            <span className="text-xs px-2.5 py-1 rounded-full bg-[#5ce1e6]/20 border border-[#5ce1e6]/60 text-[#5ce1e6] font-bold shrink-0">
                              {tagLabel}
                            </span>
                          </div>

                          {/* Action Items with Refined Geometric Symbols */}
                          <div className="space-y-2 text-xs md:text-sm leading-relaxed">
                            <div className="bg-[#0c4348]/60 border border-[#5ce1e6]/30 rounded-xl p-3">
                              <div className="flex items-center gap-1.5 font-bold text-xs text-[#5ce1e6] mb-1">
                                <span className="text-sm">◈</span>
                                <span>TASK THỰC HÀNH CỤ THỂ:</span>
                              </div>
                              <p className="text-white/95 font-medium">{step.do}</p>
                            </div>

                            <div className="bg-white/10 border-l-4 border-[#5ce1e6] rounded-xl p-3">
                              <div className="flex items-center gap-1.5 font-bold text-xs text-[#5ce1e6] mb-1">
                                <span className="text-sm">✦</span>
                                <span>BẮT ĐẦU TRONG 24H:</span>
                              </div>
                              <p className="text-white/95">{step.first}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                              <div className="rounded-xl bg-black/40 border border-white/15 p-2.5">
                                <div className="flex items-center gap-1.5 font-bold text-[11px] text-[#5ce1e6] mb-0.5">
                                  <span className="text-xs">●</span>
                                  <span>THAM GIA CLB / NHÓM:</span>
                                </div>
                                <p className="text-white/85 text-xs">{step.club}</p>
                              </div>
                              <div className="rounded-xl bg-black/40 border border-white/15 p-2.5">
                                <div className="flex items-center gap-1.5 font-bold text-[11px] text-[#5ce1e6] mb-0.5">
                                  <span className="text-xs">■</span>
                                  <span>ĐẦU RA CẦN NỘP:</span>
                                </div>
                                <p className="text-white/85 text-xs">{step.proof}</p>
                              </div>
                            </div>

                            <div className="rounded-xl bg-black/40 border border-white/15 p-2.5">
                              <div className="flex items-center gap-1.5 font-bold text-[11px] text-[#5ce1e6] mb-0.5">
                                <span className="text-xs">▲</span>
                                <span>TIÊU CHÍ KIỂM CHỨNG:</span>
                              </div>
                              <p className="text-white/85 text-xs">{step.check}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Self Reflection Prompt Box */}
                <div className="glass-card rounded-2xl p-4 md:p-5 space-y-3 border-[#5ce1e6]/45">
                  <div className="flex items-center gap-2">
                    <span className="text-[#5ce1e6] text-lg">✦</span>
                    <h4 className="font-bold text-base text-[#5ce1e6]">
                      CÂU HỎI TỰ PHẢN TƯ DÀNH CHO BẠN
                    </h4>
                  </div>
                  <p className="text-sm md:text-base text-white/95 leading-relaxed bg-[#0c4348]/70 border border-[#5ce1e6]/30 rounded-xl p-3.5">
                    “Với năng lực bạn muốn phát triển nhất, sản phẩm hoặc phản hồi nào trong <strong>30 ngày tới</strong> sẽ chứng minh rằng bạn đã thực sự thực hành?”
                  </p>
                  <p className="text-xs text-white/75 leading-relaxed">
                    <strong>Lưu ý phương pháp:</strong> Đây là hoạt động tự phản tư nhanh, không phải công cụ đánh giá năng lực chuẩn hóa, chứng nhận kỹ năng hay dự báo tuyển dụng. Hãy chọn 01 task phù hợp nhất với mục tiêu của bạn để bắt đầu ngay!
                  </p>
                </div>

                {/* Actions & Retake */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <a
                    href="https://www.helenlamhien.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-glow font-bold text-sm md:text-base py-4 px-4 rounded-2xl flex items-center justify-center gap-2 no-underline text-center"
                  >
                    <span>TRUY CẬP HELENLAMHIEN.COM</span>
                    <span className="text-lg">↗</span>
                  </a>
                  <button
                    type="button"
                    onClick={startNewSession}
                    className="py-4 px-4 rounded-2xl border border-[#5ce1e6]/50 bg-black/50 text-white font-bold text-sm md:text-base hover:bg-[#0c4348] transition inline-flex items-center justify-center gap-2"
                  >
                    <span className="text-base">↺</span>
                    <span>LÀM LẠI BÀI TỰ PHẢN TƯ</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
