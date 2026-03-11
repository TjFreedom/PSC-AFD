import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --navy: #0d1f35;
    --navy-mid: #142843;
    --navy-light: #1e3a57;
    --gold: #c9a84c;
    --gold-light: #e8c97a;
    --gold-pale: #f5e8c4;
    --cream: #faf7f2;
    --warm-white: #fffdf8;
    --text-muted: #7a9ab5;
    --teal: #1a6b7c;
    --teal-bright: #22a8be;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--navy);
    overflow-x: hidden;
  }

  .display { font-family: 'Cormorant Garamond', serif; }

  /* ── HERO ── */
  .hero {
    background: var(--navy);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 48px;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 60% at 80% 50%, rgba(26,107,124,0.18) 0%, transparent 70%),
                radial-gradient(ellipse 50% 40% at 10% 80%, rgba(201,168,76,0.08) 0%, transparent 60%);
  }
  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    position: relative;
    z-index: 1;
  }
  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(201,168,76,0.12);
    border: 1px solid rgba(201,168,76,0.3);
    color: var(--gold);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 7px 16px;
    border-radius: 2px;
    margin-bottom: 28px;
  }
  .hero-eyebrow::before { content: '◆'; font-size: 8px; }
  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(44px, 5vw, 72px);
    font-weight: 300;
    line-height: 1.08;
    color: var(--warm-white);
    margin-bottom: 24px;
    letter-spacing: -0.01em;
  }
  .hero-title em {
    font-style: italic;
    color: var(--gold-light);
  }
  .hero-body {
    font-size: 16px;
    font-weight: 300;
    line-height: 1.75;
    color: var(--text-muted);
    margin-bottom: 40px;
    max-width: 480px;
  }
  .hero-cta {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
  .btn-gold {
    background: var(--gold);
    color: var(--navy);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 14px 32px;
    border: none;
    cursor: pointer;
    transition: all 0.25s;
  }
  .btn-gold:hover { background: var(--gold-light); transform: translateY(-1px); }
  .btn-outline {
    background: transparent;
    color: var(--warm-white);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 13px 32px;
    border: 1px solid rgba(255,255,255,0.25);
    cursor: pointer;
    transition: all 0.25s;
  }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); }

  .hero-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
  }
  .stat-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-left: 3px solid var(--gold);
    padding: 20px 24px;
    margin-bottom: 12px;
    transition: background 0.2s;
  }
  .stat-card:hover { background: rgba(255,255,255,0.07); }
  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px;
    font-weight: 300;
    color: var(--gold-light);
    line-height: 1;
    margin-bottom: 4px;
  }
  .stat-label { font-size: 13px; color: var(--text-muted); font-weight: 400; }
  .stat-sub { font-size: 11px; color: rgba(122,154,181,0.6); margin-top: 2px; }

  /* ── SECTION WRAPPER ── */
  .section {
    padding: 100px 48px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .section-full {
    padding: 100px 48px;
  }
  .section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--gold);
    opacity: 0.5;
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 4vw, 58px);
    font-weight: 300;
    line-height: 1.1;
    color: var(--navy);
    margin-bottom: 20px;
    letter-spacing: -0.01em;
  }
  .section-title em { font-style: italic; }
  .section-sub {
    font-size: 16px;
    font-weight: 300;
    color: #5a7a8f;
    line-height: 1.7;
    max-width: 600px;
  }

  /* ── IS THIS RIGHT FOR YOU ── */
  .qualifier { background: var(--navy); }
  .qualifier-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 100px 48px;
  }
  .qualifier-left .section-title { color: var(--warm-white); }
  .qualifier-left .section-sub { color: var(--text-muted); }
  .fit-list { list-style: none; margin-top: 32px; }
  .fit-item {
    display: flex;
    gap: 16px;
    padding: 16px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    align-items: flex-start;
  }
  .fit-icon {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .fit-icon.yes { background: rgba(34,168,190,0.15); color: var(--teal-bright); }
  .fit-icon.no { background: rgba(180,70,70,0.12); color: #e07070; }
  .fit-text strong { display: block; font-size: 14px; font-weight: 500; color: var(--warm-white); margin-bottom: 3px; }
  .fit-text span { font-size: 13px; color: var(--text-muted); line-height: 1.5; }

  /* ── ROI CALCULATOR ── */
  .calc-bg { background: var(--cream); }
  .calc-card {
    background: white;
    border: 1px solid rgba(13,31,53,0.08);
    box-shadow: 0 8px 60px rgba(13,31,53,0.06);
    padding: 56px;
    max-width: 900px;
    margin: 56px auto 0;
  }
  .calc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; }
  .input-group { margin-bottom: 28px; }
  .input-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #7a9ab5;
    margin-bottom: 8px;
    display: block;
  }
  .range-wrapper { position: relative; }
  input[type=range] {
    -webkit-appearance: none;
    width: 100%;
    height: 3px;
    background: #e0e8ef;
    outline: none;
    border-radius: 2px;
    cursor: pointer;
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--navy);
    border: 3px solid var(--gold);
    cursor: pointer;
  }
  .range-val {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 300;
    color: var(--navy);
    display: block;
    margin-bottom: 8px;
  }
  .result-panel {
    background: var(--navy);
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .result-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .result-row:last-child { border-bottom: none; }
  .result-row-label { font-size: 13px; color: var(--text-muted); }
  .result-row-val {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 300;
    color: var(--warm-white);
  }
  .result-row-val.highlight { color: var(--gold-light); font-size: 30px; }
  .result-disclaimer { font-size: 11px; color: rgba(122,154,181,0.5); margin-top: 20px; line-height: 1.5; }

  /* ── FAQ ── */
  .faq-bg { background: white; }
  .faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 80px; margin-top: 56px; }
  .faq-item {
    border-top: 1px solid rgba(13,31,53,0.1);
    cursor: pointer;
    overflow: hidden;
  }
  .faq-q {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 22px 0;
    gap: 24px;
  }
  .faq-q-text { font-size: 15px; font-weight: 500; color: var(--navy); line-height: 1.4; }
  .faq-toggle {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    border: 1px solid rgba(13,31,53,0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: var(--navy);
    transition: all 0.2s;
  }
  .faq-toggle.open { background: var(--navy); color: white; border-color: var(--navy); }
  .faq-a {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s ease, padding 0.25s;
  }
  .faq-a.open { max-height: 200px; padding-bottom: 20px; }
  .faq-a p { font-size: 14px; line-height: 1.75; color: #5a7a8f; }

  /* ── TIMELINE ── */
  .timeline-bg { background: var(--cream); }
  .timeline { position: relative; margin-top: 64px; }
  .timeline::before {
    content: '';
    position: absolute;
    left: 32px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, var(--gold) 0%, rgba(201,168,76,0.1) 100%);
  }
  .timeline-item {
    display: flex;
    gap: 40px;
    padding-bottom: 48px;
    position: relative;
  }
  .timeline-dot {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--navy);
    border: 2px solid var(--gold);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    color: var(--gold);
    z-index: 1;
  }
  .timeline-content { padding-top: 14px; }
  .timeline-phase {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 6px;
  }
  .timeline-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 400;
    color: var(--navy);
    margin-bottom: 10px;
  }
  .timeline-body { font-size: 14px; line-height: 1.75; color: #5a7a8f; max-width: 540px; }

  /* ── TESTIMONIALS ── */
  .testimonial-bg { background: var(--navy-mid); }
  .testimonial-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    margin-top: 56px;
  }
  .testimonial-card {
    background: rgba(255,255,255,0.04);
    padding: 40px 32px;
    border-top: 2px solid transparent;
    transition: all 0.25s;
    position: relative;
  }
  .testimonial-card:hover { background: rgba(255,255,255,0.07); border-top-color: var(--gold); }
  .quote-mark {
    font-family: 'Cormorant Garamond', serif;
    font-size: 80px;
    line-height: 0.6;
    color: var(--gold);
    opacity: 0.3;
    display: block;
    margin-bottom: 16px;
  }
  .testimonial-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 300;
    font-style: italic;
    color: rgba(255,253,248,0.85);
    line-height: 1.6;
    margin-bottom: 24px;
  }
  .testimonial-author { font-size: 13px; font-weight: 500; color: var(--gold); }
  .testimonial-role { font-size: 12px; color: var(--text-muted); margin-top: 3px; }
  .testimonial-specialty {
    display: inline-flex;
    gap: 6px;
    align-items: center;
    background: rgba(34,168,190,0.1);
    border: 1px solid rgba(34,168,190,0.2);
    color: var(--teal-bright);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 2px;
    margin-top: 12px;
  }

  /* ── COMPARISON TABLE ── */
  .compare-bg { background: white; }
  .compare-table { width: 100%; border-collapse: collapse; margin-top: 56px; }
  .compare-table th {
    text-align: left;
    padding: 20px 24px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: white;
    background: var(--navy);
  }
  .compare-table th:first-child { width: 40%; background: var(--navy-light); }
  .compare-table th.highlight-col { background: var(--teal); }
  .compare-table td {
    padding: 16px 24px;
    font-size: 14px;
    border-bottom: 1px solid rgba(13,31,53,0.06);
  }
  .compare-table tr:hover td { background: rgba(13,31,53,0.02); }
  .compare-table td:first-child { font-weight: 500; color: var(--navy); }
  .compare-table td.highlight-col { background: rgba(26,107,124,0.04); }
  .check { color: #22a84e; font-size: 16px; }
  .cross { color: #ccc; font-size: 16px; }
  .partial { color: var(--gold); font-size: 13px; font-weight: 500; }

  /* ── MARKET OPPORTUNITY ── */
  .market-bg { background: linear-gradient(135deg, var(--navy) 0%, #0a2a45 100%); }
  .market-inner { max-width: 1200px; margin: 0 auto; padding: 100px 48px; }
  .market-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    margin-top: 64px;
  }
  .market-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    padding: 40px 32px;
    position: relative;
    overflow: hidden;
  }
  .market-card::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to right, var(--teal), var(--gold));
  }
  .market-stat {
    font-family: 'Cormorant Garamond', serif;
    font-size: 56px;
    font-weight: 300;
    color: var(--gold-light);
    line-height: 1;
    margin-bottom: 8px;
  }
  .market-stat-label { font-size: 14px; font-weight: 500; color: var(--warm-white); margin-bottom: 12px; }
  .market-stat-body { font-size: 13px; line-height: 1.65; color: var(--text-muted); }

  /* ── FOOTER CTA ── */
  .footer-cta {
    background: var(--gold);
    padding: 80px 48px;
    text-align: center;
  }
  .footer-cta .section-title { color: var(--navy); font-size: clamp(32px, 3.5vw, 52px); }
  .footer-cta .section-sub { color: rgba(13,31,53,0.65); margin: 0 auto; }
  .footer-cta-btns { display: flex; gap: 16px; justify-content: center; margin-top: 40px; flex-wrap: wrap; }
  .btn-navy {
    background: var(--navy);
    color: var(--gold);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 14px 36px;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-navy:hover { background: var(--navy-light); transform: translateY(-1px); }
  .btn-white {
    background: transparent;
    color: var(--navy);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 13px 36px;
    border: 2px solid var(--navy);
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-white:hover { background: rgba(13,31,53,0.08); }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .hero-grid, .qualifier-inner, .calc-grid, .faq-grid,
    .testimonial-grid, .market-cards { grid-template-columns: 1fr; gap: 40px; }
    .hero, .qualifier-inner, .section, .section-full,
    .timeline-bg .section, .market-inner, .footer-cta { padding-left: 24px; padding-right: 24px; }
    .calc-card { padding: 32px 24px; }
  }
`;

const faqs = [
  {
    q: "Do I need to be a dentist to license these brands?",
    a: "Not necessarily. We work with dentists, orthodontists, oral surgeons, physicians, and multi-disciplinary groups. The key requirement is that a licensed provider oversees all clinical services. We review each application individually and can discuss your specific credentials on a discovery call.",
  },
  {
    q: "What territories are still available?",
    a: "Territory availability is reviewed during the application process. Most major metro areas still have open slots, and we protect exclusivity on a first-licensed basis. Submit an application and our team will confirm availability for your target market within 2 business days.",
  },
  {
    q: "Is this a franchise?",
    a: "No. This is a licensing model, not a franchise. You retain 100% ownership of your practice and complete clinical autonomy. PSC provides brand rights and operational systems — not operational control. All agreements are structured to comply with state and federal corporate practice rules.",
  },
  {
    q: "Can I license just one brand, or do I have to take both?",
    a: "You can license either PSC or AFD independently, or both. Many partners start with one brand that aligns most closely with their existing practice and add the second as they grow. Licensing both brands creates a complementary full-spectrum care offering in your market.",
  },
  {
    q: "What does the on-site training look like?",
    a: "Training takes place at our flagship practice in Newark, DE. You'll observe clinical workflows, patient intake, treatment coordination, and team communication in real time. The structured curriculum covers clinical philosophy, business systems, and brand standards — typically completed over 1–2 days.",
  },
  {
    q: "How does the 3% royalty work with the MSA's 5%?",
    a: "The Brand Licensure Agreement carries a 3% quarterly royalty on practice revenue. If you upgrade to the Management Services Agreement, the fee is 5% total — inclusive of brand licensing. There is no stacking of fees. The MSA replaces the standalone licensure fee.",
  },
  {
    q: "What happens if my practice is new or pre-revenue?",
    a: "New or early-stage practices are welcome to apply. We evaluate readiness holistically — clinical credentials, market opportunity, and alignment with the brand mission all factor in. We'll discuss realistic timelines and ramp expectations during the discovery call.",
  },
  {
    q: "How quickly can I launch after signing?",
    a: "Most partners are operational within 60–90 days of signing, depending on website development, on-site training scheduling, and your local operational readiness. We work alongside you through every step of the launch process.",
  },
];

const testimonials = [
  {
    quote: "Licensing PSC gave me an 18-month head start. I didn't have to figure out the clinical systems, the branding, or the referral relationships — they were already built. I just had to show up and execute.",
    author: "Dr. M. Harrington",
    role: "Licensed PSC Provider",
    specialty: "Dental Sleep Medicine",
  },
  {
    quote: "The AFD brand opened doors with pediatricians and speech therapists almost immediately. Parents are already educated about airway health — they're actively searching for a provider like us. The brand does the talking.",
    author: "Dr. S. Nakamura",
    role: "Licensed AFD Provider",
    specialty: "Airway Orthodontics",
  },
  {
    quote: "I was skeptical about the ROI of the MSA. Twelve months in, the marketing alone has generated more than enough to justify every dollar. The Google Map Pack optimization alone changed our new patient flow.",
    author: "Dr. L. Okafor",
    role: "Full Partnership — PSC + AFD",
    specialty: "Integrative Dental Medicine",
  },
];

const timelineSteps = [
  {
    phase: "Week 1–2",
    heading: "Application & Discovery Call",
    body: "Submit your application online. Within 2 business days, PSC leadership will reach out personally to schedule a discovery call. This is a two-way conversation — we evaluate fit, you evaluate us. No pressure, no hard sell.",
  },
  {
    phase: "Week 2–4",
    heading: "Agreement Review & Countersigning",
    body: "Receive your customized term sheet, review with your own legal counsel if desired, and execute the agreement. Territory rights are secured upon execution. We handle the brand identity onboarding immediately after signing.",
  },
  {
    phase: "Week 4–8",
    heading: "Onboarding & On-Site Training",
    body: "Complete your on-site observation training at the Newark, DE flagship. Your custom website is built during this period. Vendor introductions, digital platform setup, and team orientation materials are all delivered.",
  },
  {
    phase: "Week 8–12",
    heading: "Soft Launch & Market Activation",
    body: "Your practice goes live under the PSC/AFD brand. Local SEO and Google Business Profile optimization begin. The first monthly coaching check-in is scheduled. You are now the designated provider in your market.",
  },
];

const compareRows = [
  ["Build your own brand from scratch", "5–10 years", "Partial — slow-build", "✓ Full", "✗", "✗", "✗"],
  ["Join a traditional dental franchise", "3–6 months", "✓ Immediate", "✗ Limited", "Varies", "✓", "Partial"],
  ["Hire a marketing agency independently", "Ongoing", "✗ None", "✓ Full", "Partial", "✗", "✗"],
  ["License PSC / AFD brands", "60–90 days", "✓ Immediate", "✓ Full", "✓ Included", "✓ Included", "✓ Included"],
];

const marketStats = [
  {
    stat: "$13B+",
    label: "U.S. dental sleep medicine market by 2030",
    body: "The intersection of dentistry and sleep medicine is one of the fastest-growing sectors in healthcare. Demand is outpacing supply — and most markets lack a dedicated PSC-style provider.",
  },
  {
    stat: "30M+",
    label: "Americans with undiagnosed sleep apnea",
    body: "The diagnosis gap represents enormous untapped demand. Patients are suffering without knowing a dental solution exists. PSC-branded providers become the discoverable answer.",
  },
  {
    stat: "72%",
    label: "of orthodontic patients have unaddressed airway concerns",
    body: "The AFD brand captures a patient need that most orthodontic practices are not equipped to address. Early airway intervention is a growing patient priority — and a powerful practice differentiator.",
  },
];

export default function PSCContent() {
  const [faqOpen, setFaqOpen] = useState(null);
  const [patients, setPatients] = useState(80);
  const [avgCase, setAvgCase] = useState(4500);
  const [caseAccept, setCaseAccept] = useState(55);

  const annualRevenue = Math.round(patients * avgCase * (caseAccept / 100) * 12);
  const licenseFee = Math.round(annualRevenue * 0.03);
  const mktgSavings = 7200 * 12;
  const netBenefit = Math.round(annualRevenue - licenseFee + mktgSavings * 0.6);
  const roi = licenseFee > 0 ? Math.round(((netBenefit - 25000) / 25000) * 100) : 0;

  const fmt = (n) => "$" + n.toLocaleString();

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{style}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-left">
            <div className="hero-eyebrow">Healthcare Provider Licensing Network</div>
            <h1 className="hero-title">
              Stop Building a Practice.<br />
              Start <em>Leading</em> a Movement.
            </h1>
            <p className="hero-body">
              The demand for root-cause, airway-focused care is the defining clinical wave of this decade.
              Most practices are not built to meet it. The PSC & AFD licensing network gives you a
              15-year head start — proven systems, national brand recognition, and the infrastructure
              to become the undeniable specialist in your market.
            </p>
            <div className="hero-cta">
              <button className="btn-gold">Apply to Partner</button>
              <button className="btn-outline">Estimate Your ROI ↓</button>
            </div>
          </div>
          <div className="hero-right">
            {[
              { num: "60–90", label: "Days to launch under an established brand", sub: "Vs. 5–10 years building your own" },
              { num: "30M+", label: "Americans with undiagnosed sleep apnea", sub: "Your future patient pool" },
              { num: "100%", label: "Clinical autonomy — always", sub: "This is licensing, not franchising" },
              { num: "2", label: "Nationally recognized brands, one unified mission", sub: "PSC + AFD work together" },
            ].map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKET OPPORTUNITY ── */}
      <div className="market-bg">
        <div className="market-inner">
          <div className="section-label" style={{ color: "var(--gold)" }}>The Opportunity</div>
          <h2 className="section-title" style={{ color: "var(--warm-white)" }}>
            The Market Is Ready.<br /><em>Are Your Systems?</em>
          </h2>
          <p className="section-sub" style={{ color: "var(--text-muted)" }}>
            Three converging forces are creating unprecedented demand for exactly what the PSC and AFD brands deliver.
          </p>
          <div className="market-cards">
            {marketStats.map((m, i) => (
              <div className="market-card" key={i}>
                <div className="market-stat">{m.stat}</div>
                <div className="market-stat-label">{m.label}</div>
                <div className="market-stat-body">{m.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── IS THIS RIGHT FOR YOU ── */}
      <div className="qualifier">
        <div className="qualifier-inner">
          <div className="qualifier-left">
            <div className="section-label">Ideal Partner Profile</div>
            <h2 className="section-title">
              This Licensing Program<br /><em>Is Built For You If…</em>
            </h2>
            <p className="section-sub">
              We're selective by design. Every licensed provider reflects the PSC brand — so we look for
              specific qualities that predict mutual success.
            </p>
          </div>
          <div className="qualifier-right">
            <ul className="fit-list">
              {[
                { yes: true, strong: "You're a licensed clinical provider", desc: "Dentist, orthodontist, physician, or multi-specialty group with a licensed clinician at the helm." },
                { yes: true, strong: "You believe in root-cause medicine", desc: "You're tired of symptom management. You want to understand and treat why patients suffer, not just manage how they suffer." },
                { yes: true, strong: "You want to own your market, not rent it", desc: "You're looking for a long-term competitive moat — not another vendor relationship you can easily be replaced in." },
                { yes: true, strong: "You're ready to invest in infrastructure", desc: "You understand that a $25K setup fee is the price of skipping 10 years of brand-building and systems development." },
                { yes: false, strong: "You want someone to run your practice for you", desc: "We provide brand rights and systems. Clinical care and practice ownership are entirely yours — that's not negotiable." },
                { yes: false, strong: "You're looking for a quick-flip or passive income", desc: "This is a long-term brand relationship built on clinical excellence. If you're optimizing for speed over quality, this isn't the right fit." },
              ].map((item, i) => (
                <li className="fit-item" key={i}>
                  <span className={`fit-icon ${item.yes ? "yes" : "no"}`}>{item.yes ? "✓" : "✗"}</span>
                  <div className="fit-text">
                    <strong>{item.strong}</strong>
                    <span>{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── ROI CALCULATOR ── */}
      <div className="calc-bg">
        <div className="section">
          <div className="section-label">Revenue Estimator</div>
          <h2 className="section-title">What Could Licensing<br /><em>Actually Be Worth?</em></h2>
          <p className="section-sub">Adjust the inputs below to model the financial impact for your specific practice.</p>
          <div className="calc-card">
            <div className="calc-grid">
              <div>
                {[
                  { label: "New patients / month", val: patients, set: setPatients, min: 10, max: 300, step: 5 },
                  { label: "Average case value ($)", val: avgCase, set: setAvgCase, min: 1000, max: 15000, step: 250 },
                  { label: "Case acceptance rate (%)", val: caseAccept, set: setCaseAccept, min: 20, max: 90, step: 5 },
                ].map((inp, i) => (
                  <div className="input-group" key={i}>
                    <label className="input-label">{inp.label}</label>
                    <span className="range-val">{inp.val.toLocaleString()}{i === 2 ? "%" : i === 1 ? " USD" : " pts"}</span>
                    <div className="range-wrapper">
                      <input type="range" min={inp.min} max={inp.max} step={inp.step}
                        value={inp.val} onChange={e => inp.set(Number(e.target.value))} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="result-panel">
                <div className="result-row">
                  <span className="result-row-label">Projected annual revenue</span>
                  <span className="result-row-val">{fmt(annualRevenue)}</span>
                </div>
                <div className="result-row">
                  <span className="result-row-label">Brand license fee (3%)</span>
                  <span className="result-row-val">−{fmt(licenseFee)}</span>
                </div>
                <div className="result-row">
                  <span className="result-row-label">Mktg savings (vs. agency)</span>
                  <span className="result-row-val">+{fmt(Math.round(mktgSavings * 0.6))}</span>
                </div>
                <div className="result-row">
                  <span className="result-row-label" style={{ fontWeight: 600, color: "var(--warm-white)" }}>Net annual benefit</span>
                  <span className="result-row-val highlight">{fmt(netBenefit)}</span>
                </div>
                <div className="result-row">
                  <span className="result-row-label">Estimated setup ROI</span>
                  <span className="result-row-val" style={{ color: roi > 0 ? "#7fe0a0" : "#e07070" }}>{roi > 0 ? "+" : ""}{roi}%</span>
                </div>
                <p className="result-disclaimer">Illustrative model only. Actual results vary. Does not constitute financial advice. Consult with PSC on your specific market.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <div className="timeline-bg">
        <div className="section">
          <div className="section-label">The Path Forward</div>
          <h2 className="section-title">From Application<br />to <em>Market Leader</em></h2>
          <p className="section-sub">A clear, predictable launch process designed to get you operational within 90 days.</p>
          <div className="timeline">
            {timelineSteps.map((step, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-dot">{i + 1}</div>
                <div className="timeline-content">
                  <div className="timeline-phase">{step.phase}</div>
                  <div className="timeline-heading">{step.heading}</div>
                  <p className="timeline-body">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── COMPARISON TABLE ── */}
      <div className="compare-bg">
        <div className="section">
          <div className="section-label">Competitive Landscape</div>
          <h2 className="section-title">How PSC Licensing Compares<br />to <em>Your Alternatives</em></h2>
          <p className="section-sub">There are several ways to grow a specialty practice. Here's an honest look at the tradeoffs.</p>
          <div style={{ overflowX: "auto" }}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Growth Path</th>
                  <th>Time to Market</th>
                  <th>Brand Equity</th>
                  <th>Clinical Autonomy</th>
                  <th>Marketing Included</th>
                  <th>Coaching & Support</th>
                  <th>Vendor Discounts</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr key={i} style={i === 3 ? { background: "rgba(26,107,124,0.04)", fontWeight: 500 } : {}}>
                    {row.map((cell, j) => (
                      <td key={j} className={i === 3 && j > 0 ? "highlight-col" : ""}>
                        {cell === "✓" ? <span className="check">✓</span> :
                         cell === "✗" ? <span className="cross">—</span> :
                         cell === "Partial" ? <span className="partial">Partial</span> :
                         cell === "Varies" ? <span className="partial">Varies</span> :
                         cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <div className="testimonial-bg">
        <div className="section">
          <div className="section-label" style={{ color: "var(--gold)" }}>Provider Voices</div>
          <h2 className="section-title" style={{ color: "var(--warm-white)" }}>
            What Partners Are<br /><em>Experiencing</em>
          </h2>
          <div className="testimonial-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <span className="quote-mark">"</span>
                <p className="testimonial-text">{t.quote}</p>
                <div className="testimonial-author">{t.author}</div>
                <div className="testimonial-role">{t.role}</div>
                <div className="testimonial-specialty">{t.specialty}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="faq-bg">
        <div className="section">
          <div className="section-label">Common Questions</div>
          <h2 className="section-title">Answered <em>Honestly</em></h2>
          <p className="section-sub">We believe transparency builds better partnerships. Here are the questions we get most often.</p>
          <div className="faq-grid">
            {faqs.map((faq, i) => (
              <div className="faq-item" key={i} onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                <div className="faq-q">
                  <span className="faq-q-text">{faq.q}</span>
                  <span className={`faq-toggle ${faqOpen === i ? "open" : ""}`}>{faqOpen === i ? "−" : "+"}</span>
                </div>
                <div className={`faq-a ${faqOpen === i ? "open" : ""}`}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER CTA ── */}
      <div className="footer-cta">
        <h2 className="section-title display">
          Your Market Is Waiting.<br /><em>Don't Let Someone Else Take It.</em>
        </h2>
        <p className="section-sub">
          Territory rights are protected and first-come. Applications are reviewed personally by Dr. Robinson and the PSC leadership team.
          We respond within 2 business days.
        </p>
        <div className="footer-cta-btns">
          <button className="btn-navy">Apply Now — It's Free</button>
          <button className="btn-white">Download Term Sheet</button>
        </div>
        <p style={{ marginTop: 32, fontSize: 12, color: "rgba(13,31,53,0.45)", letterSpacing: "0.05em" }}>
          For licensed healthcare providers only · (302) 239-1757 · licensing@painandsleepcenter.com
        </p>
      </div>
    </div>
  );
}
