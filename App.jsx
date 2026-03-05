import { useState } from "react";

const DIMENSIONS = [
  {
    id: "authority",
    label: "Authority & Power",
    icon: "⚡",
    questions: [
      {
        id: "a1",
        type: "mc",
        text: "When you make a decision that your team questions, your most common response is:",
        options: [
          { label: "Explain your reasoning and stand firm", score: 1 },
          { label: "Listen, then decide — sometimes you adjust", score: 3 },
          { label: "Genuinely reconsider based on their input", score: 4 },
          { label: "Feel frustrated they're not just trusting you", score: 0 },
        ],
      },
      {
        id: "a2",
        type: "reflect",
        text: "Describe a recent moment where you used your authority. What was the outcome — for you, and for your team?",
        placeholder: "Take your time with this one. There's no right answer.",
      },
    ],
  },
  {
    id: "pushback",
    label: "Responding to Pushback",
    icon: "🔄",
    questions: [
      {
        id: "p1",
        type: "mc",
        text: "When a team member openly disagrees with you in a meeting, you typically feel:",
        options: [
          { label: "Challenged — and determined to hold your ground", score: 0 },
          { label: "Curious about where they're coming from", score: 4 },
          { label: "Slightly defensive, but you hear them out", score: 2 },
          { label: "Uncertain — conflict is uncomfortable for you", score: 1 },
        ],
      },
      {
        id: "p2",
        type: "reflect",
        text: "Think of the last time someone on your team pushed back on you. How did you respond — and how do you think they experienced that moment?",
        placeholder: "Be honest. This reflection is for you.",
      },
    ],
  },
  {
    id: "selfawareness",
    label: "Leadership Self-Awareness",
    icon: "🪞",
    questions: [
      {
        id: "s1",
        type: "mc",
        text: "How clearly do you understand the impact your leadership style has on your team's day-to-day experience?",
        options: [
          { label: "Very clearly — I actively seek feedback", score: 4 },
          { label: "Fairly well — I notice signals but don't always ask", score: 3 },
          { label: "Somewhat — I focus more on results than dynamics", score: 1 },
          { label: "Honestly, not much — that's not my priority", score: 0 },
        ],
      },
      {
        id: "s2",
        type: "reflect",
        text: "If your team described your leadership style in three words — what do you think they'd say? What would you *want* them to say?",
        placeholder: "Notice the gap between the two.",
      },
    ],
  },
  {
    id: "accountability",
    label: "Accountability",
    icon: "⚖️",
    questions: [
      {
        id: "ac1",
        type: "mc",
        text: "When your team underperforms, your first instinct is to look at:",
        options: [
          { label: "The team — their skills, effort, or attitude", score: 0 },
          { label: "The systems — processes, tools, or clarity of direction", score: 2 },
          { label: "Yourself — what you might have done differently", score: 4 },
          { label: "A mix of all three simultaneously", score: 3 },
        ],
      },
      {
        id: "ac2",
        type: "reflect",
        text: "When was the last time you took visible accountability for something that went wrong on your team — and what did that look like in practice?",
        placeholder: "Specific examples matter more than principles here.",
      },
    ],
  },
  {
    id: "communication",
    label: "Communication & Feedback",
    icon: "💬",
    questions: [
      {
        id: "c1",
        type: "mc",
        text: "How would you describe your feedback style with your team?",
        options: [
          { label: "Direct and immediate — I say what needs saying", score: 2 },
          { label: "Structured — I prepare feedback carefully", score: 3 },
          { label: "Conversational — feedback happens naturally", score: 3 },
          { label: "Inconsistent — I avoid it when it feels risky", score: 0 },
        ],
      },
      {
        id: "c2",
        type: "reflect",
        text: "When did you last ask your team for feedback on *you*? What happened — and how did it feel?",
        placeholder: "If it's been a while, that tells you something too.",
      },
    ],
  },
  {
    id: "safety",
    label: "Psychological Safety",
    icon: "🛡️",
    questions: [
      {
        id: "ps1",
        type: "mc",
        text: "In your team, how comfortable are people with admitting mistakes or raising concerns?",
        options: [
          { label: "Very — it happens regularly without hesitation", score: 4 },
          { label: "Somewhat — with the right people or topics", score: 2 },
          { label: "Not much — people tend to stay quiet", score: 1 },
          { label: "I'm not sure — I haven't really noticed", score: 0 },
        ],
      },
      {
        id: "ps2",
        type: "reflect",
        text: "What's one thing you currently do — intentionally or not — that might make it harder for your team to speak up?",
        placeholder: "This question takes courage. Trust yourself with it.",
      },
    ],
  },
];

const RESULTS = {
  high: {
    tier: "Leadership Clarity",
    range: "High Score",
    headline: "You're closer than you think.",
    summary:
      "Your responses suggest a leader who has meaningful self-awareness and genuine investment in their team's experience. The friction you're feeling isn't a team problem — it's a growth edge. You're ready for the kind of deep, personalised work that creates lasting change.",
    cta: "You're a strong fit for 1:1 Leadership Coaching.",
    ctaDetail:
      "This is for leaders who are ready to do the inner work — and want a thinking partner to accelerate it.",
    color: "#2D6A4F",
    accent: "#52B788",
    badge: "1:1 Coaching",
  },
  mid: {
    tier: "Leadership in Transition",
    range: "Mid Score",
    headline: "Your team feels the gap. So do you.",
    summary:
      "There's real potential here — and real friction. Your responses reveal a leader who cares about results, but whose approach may be creating invisible barriers for their team. The good news: these patterns shift quickly when the right work is done together.",
    cta: "A Team Workshop is your next right step.",
    ctaDetail:
      "A facilitated session for you and your team that builds connection, trust, and a shared language — fast.",
    color: "#7B5EA7",
    accent: "#B5A0D8",
    badge: "Team Workshop",
  },
  low: {
    tier: "Leadership Foundations",
    range: "Low Score",
    headline: "The team isn't the problem.",
    summary:
      "Your responses point to patterns that, left unexamined, will keep producing the same results. This isn't a judgment — it's an invitation. The leaders who make the biggest shifts often start exactly here: honest enough to see it.",
    cta: "Start with the Self-Paced Leadership Course.",
    ctaDetail:
      "A structured, practical course that addresses the core patterns driving team resistance — at your own pace.",
    color: "#C4622D",
    accent: "#E8956D",
    badge: "Self-Paced Course",
  },
};

function getResult(score, maxScore) {
  const pct = score / maxScore;
  if (pct >= 0.65) return RESULTS.high;
  if (pct >= 0.35) return RESULTS.mid;
  return RESULTS.low;
}

export default function App() {
  const [stage, setStage] = useState("intro"); // intro | quiz | result
  const [dimIndex, setDimIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const currentDim = DIMENSIONS[dimIndex];
  const currentQ = currentDim?.questions[qIndex];
  const totalQuestions = DIMENSIONS.reduce((a, d) => a + d.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const maxScore = DIMENSIONS.reduce((acc, d) => {
    return acc + d.questions.filter((q) => q.type === "mc").length * 4;
  }, 0);
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const result = getResult(totalScore, maxScore);

  function handleMC(option) {
    const key = currentQ.id;
    setAnswers((prev) => ({ ...prev, [key]: option.label }));
    setScores((prev) => ({ ...prev, [key]: option.score }));
    advance();
  }

  function handleReflect() {
    const key = currentQ.id;
    const val = answers[key] || "";
    if (!val.trim()) return;
    advance();
  }

  function advance() {
    const nextQ = qIndex + 1;
    if (nextQ < currentDim.questions.length) {
      setQIndex(nextQ);
    } else {
      const nextDim = dimIndex + 1;
      if (nextDim < DIMENSIONS.length) {
        setDimIndex(nextDim);
        setQIndex(0);
      } else {
        setStage("result");
      }
    }
  }

  function handleSubmitEmail(e) {
    e.preventDefault();
    if (email && name) setSubmitted(true);
  }

  // ─── INTRO ────────────────────────────────────────────────────────────────
  if (stage === "intro") {
    return (
      <div style={styles.shell}>
        <div style={styles.introCard}>
          <div style={styles.pill}>Leadership Diagnostic</div>
          <h1 style={styles.introTitle}>
            Is your leadership style building your team — or breaking it?
          </h1>
          <p style={styles.introSub}>
            This 10-minute diagnostic gives you an honest picture of where your leadership is
            creating connection — and where it may be creating distance. No fluff. No jargon.
            Just clarity.
          </p>
          <div style={styles.dimGrid}>
            {DIMENSIONS.map((d) => (
              <div key={d.id} style={styles.dimPill}>
                <span>{d.icon}</span> {d.label}
              </div>
            ))}
          </div>
          <button style={styles.primaryBtn} onClick={() => setStage("quiz")}>
            Begin the Diagnostic →
          </button>
          <p style={styles.byline}>Developed by Veronica · Takes ~10 minutes</p>
        </div>
      </div>
    );
  }

  // ─── QUIZ ─────────────────────────────────────────────────────────────────
  if (stage === "quiz") {
    return (
      <div style={styles.shell}>
        <div style={styles.quizCard}>
          {/* Progress */}
          <div style={styles.progressWrap}>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressBar, width: `${progress}%` }} />
            </div>
            <div style={styles.progressMeta}>
              <span style={styles.dimLabel}>
                {currentDim.icon} {currentDim.label}
              </span>
              <span style={styles.progressNum}>
                {answeredCount + 1} of {totalQuestions}
              </span>
            </div>
          </div>

          {/* Question */}
          <div style={styles.questionBlock}>
            <p style={styles.questionText}>{currentQ.text}</p>

            {currentQ.type === "mc" && (
              <div style={styles.optionList}>
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    style={{
                      ...styles.optionBtn,
                      ...(answers[currentQ.id] === opt.label ? styles.optionSelected : {}),
                    }}
                    onClick={() => handleMC(opt)}
                  >
                    <span style={styles.optionLetter}>{String.fromCharCode(65 + i)}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {currentQ.type === "reflect" && (
              <div style={styles.reflectBlock}>
                <textarea
                  style={styles.textarea}
                  placeholder={currentQ.placeholder}
                  value={answers[currentQ.id] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, [currentQ.id]: e.target.value }))
                  }
                  rows={5}
                />
                <button
                  style={{
                    ...styles.primaryBtn,
                    opacity: answers[currentQ.id]?.trim() ? 1 : 0.4,
                    marginTop: "1rem",
                  }}
                  onClick={handleReflect}
                >
                  Continue →
                </button>
                <p style={styles.reflectNote}>
                  Your reflections are private. Write honestly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── RESULT ───────────────────────────────────────────────────────────────
  if (stage === "result") {
    return (
      <div style={{ ...styles.shell, background: "#0D0D0D" }}>
        <div style={styles.resultCard}>
          {/* Header band */}
          <div style={{ ...styles.resultBand, background: result.color }}>
            <div style={styles.resultBadge}>{result.badge}</div>
            <h2 style={styles.resultTier}>{result.tier}</h2>
            <p style={styles.resultHeadline}>{result.headline}</p>
          </div>

          {/* Body */}
          <div style={styles.resultBody}>
            <p style={styles.resultSummary}>{result.summary}</p>

            <div style={{ ...styles.ctaBox, borderColor: result.accent }}>
              <p style={{ ...styles.ctaMain, color: result.accent }}>{result.cta}</p>
              <p style={styles.ctaDetail}>{result.ctaDetail}</p>
            </div>

            {/* Email capture */}
            {!submitted ? (
              <div style={styles.emailBlock}>
                <p style={styles.emailIntro}>
                  Enter your details to receive your full diagnostic report and next steps.
                </p>
                <form onSubmit={handleSubmitEmail} style={styles.emailForm}>
                  <input
                    style={styles.input}
                    type="text"
                    placeholder="Your first name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    style={styles.input}
                    type="email"
                    placeholder="Your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" style={{ ...styles.primaryBtn, background: result.color }}>
                    Send My Report →
                  </button>
                </form>
                <p style={styles.privacyNote}>No spam. One email. Your results, clearly explained.</p>
              </div>
            ) : (
              <div style={styles.thankYou}>
                <div style={{ fontSize: "2.5rem" }}>✓</div>
                <p style={styles.thankYouText}>
                  Your report is on its way, {name}. Check your inbox within a few minutes.
                </p>
                <p style={styles.thankYouSub}>
                  In the meantime — sit with what came up for you. The most important answers are
                  already in your reflections.
                </p>
              </div>
            )}

            {/* Dimension breakdown */}
            <div style={styles.breakdown}>
              <p style={styles.breakdownTitle}>Your Leadership Profile</p>
              {DIMENSIONS.map((d) => {
                const dimScore = d.questions
                  .filter((q) => q.type === "mc")
                  .reduce((acc, q) => acc + (scores[q.id] || 0), 0);
                const dimMax = d.questions.filter((q) => q.type === "mc").length * 4;
                const pct = Math.round((dimScore / dimMax) * 100);
                return (
                  <div key={d.id} style={styles.breakdownRow}>
                    <span style={styles.breakdownLabel}>
                      {d.icon} {d.label}
                    </span>
                    <div style={styles.miniTrack}>
                      <div
                        style={{
                          ...styles.miniBar,
                          width: `${pct}%`,
                          background: result.accent,
                        }}
                      />
                    </div>
                    <span style={styles.breakdownPct}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = {
  shell: {
    minHeight: "100vh",
    background: "#F5F1EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },
  introCard: {
    background: "#fff",
    borderRadius: "4px",
    maxWidth: "600px",
    width: "100%",
    padding: "3rem 2.5rem",
    boxShadow: "0 2px 40px rgba(0,0,0,0.08)",
    border: "1px solid #E8E0D5",
  },
  pill: {
    display: "inline-block",
    background: "#2D6A4F",
    color: "#fff",
    fontSize: "0.7rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "0.35rem 0.9rem",
    borderRadius: "2px",
    marginBottom: "1.5rem",
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  introTitle: {
    fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
    color: "#1A1A1A",
    lineHeight: 1.25,
    marginBottom: "1rem",
    fontWeight: "normal",
  },
  introSub: {
    color: "#555",
    fontSize: "1rem",
    lineHeight: 1.7,
    marginBottom: "2rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 300,
  },
  dimGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginBottom: "2rem",
  },
  dimPill: {
    background: "#F5F1EB",
    border: "1px solid #DDD5C8",
    borderRadius: "2px",
    padding: "0.4rem 0.75rem",
    fontSize: "0.78rem",
    color: "#444",
    fontFamily: "'Helvetica Neue', sans-serif",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  primaryBtn: {
    background: "#1A1A1A",
    color: "#fff",
    border: "none",
    borderRadius: "2px",
    padding: "0.9rem 2rem",
    fontSize: "0.9rem",
    cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.04em",
    display: "block",
    width: "100%",
    transition: "opacity 0.2s",
  },
  byline: {
    textAlign: "center",
    fontSize: "0.75rem",
    color: "#AAA",
    marginTop: "1rem",
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  // Quiz
  quizCard: {
    background: "#fff",
    borderRadius: "4px",
    maxWidth: "620px",
    width: "100%",
    padding: "2.5rem 2.5rem",
    boxShadow: "0 2px 40px rgba(0,0,0,0.08)",
    border: "1px solid #E8E0D5",
  },
  progressWrap: { marginBottom: "2rem" },
  progressTrack: {
    height: "3px",
    background: "#EEE8DF",
    borderRadius: "2px",
    marginBottom: "0.75rem",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    background: "#2D6A4F",
    borderRadius: "2px",
    transition: "width 0.4s ease",
  },
  progressMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dimLabel: {
    fontSize: "0.78rem",
    color: "#2D6A4F",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 500,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  progressNum: {
    fontSize: "0.75rem",
    color: "#AAA",
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  questionBlock: {},
  questionText: {
    fontSize: "1.15rem",
    color: "#1A1A1A",
    lineHeight: 1.6,
    marginBottom: "1.75rem",
    fontWeight: "normal",
  },
  optionList: { display: "flex", flexDirection: "column", gap: "0.65rem" },
  optionBtn: {
    background: "#FAFAF8",
    border: "1.5px solid #E0D9CE",
    borderRadius: "3px",
    padding: "0.85rem 1rem",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "#333",
    fontFamily: "'Helvetica Neue', sans-serif",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    transition: "all 0.15s",
    lineHeight: 1.5,
  },
  optionSelected: {
    background: "#EDF5F0",
    border: "1.5px solid #2D6A4F",
    color: "#1A3A2A",
  },
  optionLetter: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    background: "#E8E0D5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.7rem",
    fontWeight: 600,
    flexShrink: 0,
    color: "#666",
  },
  reflectBlock: {},
  textarea: {
    width: "100%",
    border: "1.5px solid #E0D9CE",
    borderRadius: "3px",
    padding: "1rem",
    fontSize: "0.9rem",
    fontFamily: "Georgia, serif",
    color: "#333",
    resize: "vertical",
    background: "#FAFAF8",
    lineHeight: 1.7,
    boxSizing: "border-box",
    outline: "none",
  },
  reflectNote: {
    fontSize: "0.75rem",
    color: "#AAA",
    marginTop: "0.5rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    textAlign: "center",
  },
  // Result
  resultCard: {
    background: "#1A1A1A",
    borderRadius: "4px",
    maxWidth: "620px",
    width: "100%",
    overflow: "hidden",
    boxShadow: "0 4px 60px rgba(0,0,0,0.4)",
  },
  resultBand: {
    padding: "2.5rem 2.5rem 2rem",
    color: "#fff",
  },
  resultBadge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "2px",
    padding: "0.3rem 0.75rem",
    fontSize: "0.7rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontFamily: "'Helvetica Neue', sans-serif",
    marginBottom: "1rem",
  },
  resultTier: {
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "0.5rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 400,
    opacity: 0.8,
  },
  resultHeadline: {
    fontSize: "clamp(1.5rem, 4vw, 2rem)",
    fontWeight: "normal",
    lineHeight: 1.3,
    margin: 0,
    fontFamily: "Georgia, serif",
  },
  resultBody: { padding: "2rem 2.5rem 2.5rem" },
  resultSummary: {
    color: "#CCC",
    fontSize: "0.95rem",
    lineHeight: 1.8,
    marginBottom: "1.5rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 300,
  },
  ctaBox: {
    border: "1px solid",
    borderRadius: "3px",
    padding: "1.25rem",
    marginBottom: "2rem",
  },
  ctaMain: {
    fontFamily: "Georgia, serif",
    fontSize: "1.05rem",
    marginBottom: "0.4rem",
  },
  ctaDetail: {
    color: "#999",
    fontSize: "0.85rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 300,
    margin: 0,
    lineHeight: 1.6,
  },
  emailBlock: { marginBottom: "2rem" },
  emailIntro: {
    color: "#AAA",
    fontSize: "0.85rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    marginBottom: "1rem",
    lineHeight: 1.6,
  },
  emailForm: { display: "flex", flexDirection: "column", gap: "0.65rem" },
  input: {
    background: "#2A2A2A",
    border: "1px solid #3A3A3A",
    borderRadius: "2px",
    padding: "0.8rem 1rem",
    color: "#FFF",
    fontSize: "0.9rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    outline: "none",
  },
  privacyNote: {
    color: "#666",
    fontSize: "0.72rem",
    marginTop: "0.5rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    textAlign: "center",
  },
  thankYou: {
    textAlign: "center",
    padding: "1.5rem",
    border: "1px solid #2A2A2A",
    borderRadius: "3px",
    marginBottom: "2rem",
  },
  thankYouText: {
    color: "#EEE",
    fontSize: "1rem",
    fontFamily: "Georgia, serif",
    marginTop: "0.75rem",
    lineHeight: 1.6,
  },
  thankYouSub: {
    color: "#888",
    fontSize: "0.82rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    marginTop: "0.5rem",
    lineHeight: 1.6,
  },
  breakdown: {
    borderTop: "1px solid #2A2A2A",
    paddingTop: "1.5rem",
  },
  breakdownTitle: {
    color: "#666",
    fontSize: "0.72rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontFamily: "'Helvetica Neue', sans-serif",
    marginBottom: "1rem",
  },
  breakdownRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "0.65rem",
  },
  breakdownLabel: {
    color: "#AAA",
    fontSize: "0.78rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    width: "160px",
    flexShrink: 0,
  },
  miniTrack: {
    flex: 1,
    height: "4px",
    background: "#2A2A2A",
    borderRadius: "2px",
    overflow: "hidden",
  },
  miniBar: {
    height: "100%",
    borderRadius: "2px",
    transition: "width 0.6s ease",
  },
  breakdownPct: {
    color: "#666",
    fontSize: "0.72rem",
    fontFamily: "'Helvetica Neue', sans-serif",
    width: "32px",
    textAlign: "right",
  },
};
