'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Heart, Search, BookOpen, ShieldCheck, CheckCircle2, AlertCircle, 
  FileText, Download, RotateCcw, Award, ChevronRight, HelpCircle, 
  Pill, Activity, User, Info, Lock, ArrowRight, ExternalLink, 
  Bookmark, Sparkles, Filter, Check, Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// DATA SCHEMAS & PRE-POPULATED CONTENT
// ==========================================

const SURVEY_INSIGHTS = [
  {
    id: 1,
    stat: '78%',
    category: 'Jargon Gap',
    title: 'Intimidated by Medical Jargon',
    description: '78% of high school students report feeling intimidated or confused by complex medical terminology used during doctor visits.',
    quote: '"My doctor said I had an acute localized edema. I freaked out thinking it was serious—turns out it was just a swollen bug bite."',
    quoteAuthor: 'High School Junior (Age 16)',
    color: 'teal',
    progress: 78
  },
  {
    id: 2,
    stat: '64%',
    category: 'Insurance & Rights',
    title: 'Unaware of Legal Privacy Rights',
    description: '64% of teens do not know their legal confidentiality and healthcare consent rights as minors in medical settings.',
    quote: '"I didn\'t know I was allowed to ask my doctor questions privately without my parent in the room."',
    quoteAuthor: 'High School Senior (Age 17)',
    color: 'amber',
    progress: 64
  },
  {
    id: 3,
    stat: '82%',
    category: 'Insurance & Rights',
    title: 'Confused by Insurance Terms',
    description: '82% cannot accurately explain basic insurance terms like "Deductible", "Co-pay", or "Out-of-Pocket Maximum".',
    quote: '"I got a paper in the mail saying \'Explanation of Benefits\' and thought I owed $400. It turned out insurance paid it all."',
    quoteAuthor: 'High School Sophomore (Age 15)',
    color: 'slate',
    progress: 82
  },
  {
    id: 4,
    stat: '#1',
    category: 'Jargon Gap',
    title: 'Top Requested Learning Topic',
    description: 'Decoding medical jargon and reading prescription pill labels ranked as the #1 topic teens wish was taught in school.',
    quote: '"If someone gave me a quick translation cheat sheet before appointments, I\'d feel 10x more confident."',
    quoteAuthor: 'Peer Survey Participant (N=65)',
    color: 'teal',
    progress: 92
  }
];

const JARGON_DICTIONARY = [
  {
    id: 'term-1',
    term: 'Acute vs. Chronic',
    category: 'Medical Terms',
    badge: 'High Frequency',
    plainEnglish: 'Sudden & short-term (Acute) vs. Long-lasting & ongoing (Chronic).',
    example: 'A broken wrist or a sudden stomach bug is acute. Asthma, diabetes, or seasonal allergies are chronic conditions.',
    tip: 'Tell your doctor whether your pain started suddenly (acute) or has been happening for months (chronic).'
  },
  {
    id: 'term-2',
    term: 'Benign vs. Malignant',
    category: 'Medical Terms',
    badge: 'Critical Concept',
    plainEnglish: 'Harmless/non-cancerous (Benign) vs. Harmful/cancerous (Malignant).',
    example: 'A benign mole or cyst is safe and left alone. A malignant growth requires treatment.',
    tip: 'Hearing "mass" or "growth" is scary, but "benign" means it is safe and not spreading.'
  },
  {
    id: 'term-3',
    term: 'Deductible',
    category: 'Insurance',
    badge: 'Financial',
    plainEnglish: 'The amount of money you must pay yourself for medical care each year before insurance starts paying.',
    example: 'If your plan deductible is $500, you pay the first $500 of medical bills out of your own pocket.',
    tip: 'Preventive checkups are often 100% free even before you meet your deductible!'
  },
  {
    id: 'term-4',
    term: 'Systemic',
    category: 'Medical Terms',
    badge: 'General Health',
    plainEnglish: 'Affecting your entire body as a whole, not just one local spot.',
    example: 'A fever or flu symptom is systemic (feels all over), whereas a scraped knee is localized.',
    tip: 'Systemic oral treatments like pills travel through your bloodstream to work throughout the body.'
  },
  {
    id: 'term-5',
    term: 'OTC vs. Rx',
    category: 'Medications',
    badge: 'Daily Essential',
    plainEnglish: 'Over-The-Counter (buy off store shelves) vs. Prescription (requires doctor written order).',
    example: 'Standard Ibuprofen is OTC. High-strength antibiotics or inhalers require an Rx order.',
    tip: 'Always check active ingredients so you do not accidentally take two OTC meds with the same ingredient!'
  },
  {
    id: 'term-6',
    term: 'HIPAA & Minor Rights',
    category: 'Legal & Rights',
    badge: 'Privacy Law',
    plainEnglish: 'Federal rules protecting medical privacy and controlling who can view your health records.',
    example: 'HIPAA keeps your records confidential. In many states, teens can access certain confidential care.',
    tip: 'You can ask your clinic staff about privacy rights in your state during check-in.'
  },
  {
    id: 'term-7',
    term: 'Co-pay',
    category: 'Insurance',
    badge: 'Financial',
    plainEnglish: 'A flat fee you pay at the clinic front desk or pharmacy counter for a service.',
    example: 'Paying a fixed $20 co-pay every time you visit your doctor or pick up a prescription.',
    tip: 'Co-pays count toward your overall health care costs for the year.'
  },
  {
    id: 'term-8',
    term: 'Inpatient vs. Outpatient',
    category: 'Doctor Visits',
    badge: 'Care Level',
    plainEnglish: 'Inpatient means staying overnight in a hospital bed; Outpatient means going home the same day.',
    example: 'Major surgery with overnight recovery is inpatient. A routine clinic exam or X-ray is outpatient.',
    tip: 'Outpatient visits are generally much less expensive than hospital inpatient stays.'
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'You wake up with a sudden, painful throat infection that started last night and lasts 4 days. How would a doctor classify this condition?',
    options: [
      { text: 'Acute condition', correct: true },
      { text: 'Chronic condition', correct: false },
      { text: 'Systemic benign condition', correct: false },
      { text: 'Inpatient procedure', correct: false }
    ],
    explanation: 'Acute conditions come on suddenly and last a short time (like a cold). Chronic conditions develop slowly and last for months or years (like asthma).'
  },
  {
    id: 2,
    question: 'You walk into a pharmacy and pick up pain medicine straight off the shelf without needing a doctor\'s note. What type of medicine is this?',
    options: [
      { text: 'Rx (Prescription)', correct: false },
      { text: 'OTC (Over-The-Counter)', correct: true },
      { text: 'Deductible Medication', correct: false },
      { text: 'Inpatient Treatment', correct: false }
    ],
    explanation: 'OTC (Over-The-Counter) medicines can be bought off store shelves without a prescription order.'
  },
  {
    id: 3,
    question: 'Under confidentiality laws in many states, can teenagers speak with a healthcare provider privately about certain health concerns?',
    options: [
      { text: 'Yes, confidentiality laws protect private consultations', correct: true },
      { text: 'No, parents must be in the room for 100% of doctor visits', correct: false }
    ],
    explanation: 'Many state laws allow teens confidential time with providers to discuss mental health, personal safety, and sensitive health topics.'
  },
  {
    id: 4,
    question: 'What is a "Deductible" in health insurance?',
    options: [
      { text: 'A monthly subscription fee you pay to keep insurance active', correct: false },
      { text: 'The discount percentage applied when buying generic drugs', correct: false },
      { text: 'The amount of money you must pay yourself before insurance begins covering bills', correct: true },
      { text: 'A gift card provided by your doctor\'s office', correct: false }
    ],
    explanation: 'A deductible is your out-of-pocket spending threshold each year before insurance kicks in to help cover expenses.'
  },
  {
    id: 5,
    question: 'Your prescription pill bottle says: "Refills: 2 before 12/31". What does this mean?',
    options: [
      { text: 'You must swallow 2 pills every single day until Dec 31', correct: false },
      { text: 'You can get the pharmacy to re-dispense this bottle 2 more times before Dec 31 without needing a new doctor visit', correct: true },
      { text: 'The medicine expires in 2 days', correct: false },
      { text: 'You need 2 doctors to sign off before taking any pills', correct: false }
    ],
    explanation: 'Refills tell you how many times your pharmacy can refill your medicine bottle before the doctor order expires.'
  }
];

const PRESCRIPTION_HOTSPOTS = [
  {
    id: 'rx-num',
    title: 'Rx Number (#1234567)',
    shortLabel: 'Rx Number',
    description: 'Unique tracking number for your specific medicine order. Keep this handy when calling the pharmacy for a refill.',
    position: { top: '22%', left: '48%' },
    badgeColor: 'bg-teal-600 text-white'
  },
  {
    id: 'patient-name',
    title: 'Patient Name & Prescriber',
    shortLabel: 'Patient Info',
    description: 'Verifies that this prescription belongs to you. Always double-check your name on the label before taking any medication.',
    position: { top: '38%', left: '48%' },
    badgeColor: 'bg-blue-600 text-white'
  },
  {
    id: 'dosage',
    title: 'Dosage & Directions',
    shortLabel: 'Directions',
    description: 'Tells you exactly how much to take, how often (e.g., "Take 1 pill twice daily with food"), and whether to take it with water.',
    position: { top: '54%', left: '48%' },
    badgeColor: 'bg-amber-600 text-white'
  },
  {
    id: 'refills',
    title: 'Refills & Expiration Date',
    shortLabel: 'Refill Info',
    description: 'Indicates how many times the pharmacy can refill this bottle before you need a new doctor prescription.',
    position: { top: '70%', left: '48%' },
    badgeColor: 'bg-emerald-600 text-white'
  },
  {
    id: 'warnings',
    title: 'Warning Labels',
    shortLabel: 'Warnings',
    description: 'Important notes on potential side effects or warnings (e.g., "May cause drowsiness", "Take with food").',
    position: { top: '84%', left: '48%' },
    badgeColor: 'bg-red-600 text-white'
  }
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function App() {
  const [activeTab, setActiveTab] = useState('survey');
  const [insightFilter, setInsightFilter] = useState('All Insights');
  
  // Dictionary & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [flippedCards, setFlippedCards] = useState({});
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  
  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Hotspot State
  const [activeHotspot, setActiveHotspot] = useState(PRESCRIPTION_HOTSPOTS[0]);

  // Rights Module State
  const [rightsTab, setRightsTab] = useState('doctor');

  // Action Plan State
  const [planGoal, setPlanGoal] = useState('Prepare for an upcoming doctor appointment');
  const [userName, setUserName] = useState('');
  const [checkedPlanItems, setCheckedPlanItems] = useState({});
  const [planGenerated, setPlanGenerated] = useState(false);

  // Load persistent bookmarks on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('teen_health_bookmarks');
      if (saved) setBookmarks(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleBookmark = (id) => {
    const updated = bookmarks.includes(id) 
      ? bookmarks.filter(bId => bId !== id)
      : [...bookmarks, id];
    setBookmarks(updated);
    try {
      localStorage.setItem('teen_health_bookmarks', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter dictionary terms with search
  const filteredTerms = useMemo(() => {
    return JARGON_DICTIONARY.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesBookmark = !showBookmarksOnly || bookmarks.includes(item.id);
      
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory && matchesBookmark;

      const matchesSearch = 
        item.term.toLowerCase().includes(q) ||
        item.plainEnglish.toLowerCase().includes(q) ||
        item.example.toLowerCase().includes(q);

      return matchesCategory && matchesBookmark && matchesSearch;
    });
  }, [searchQuery, selectedCategory, bookmarks, showBookmarksOnly]);

  // Quiz Handling
  const handleOptionSelect = (idx) => {
    if (quizSubmitted) return;
    setSelectedOption(idx);
  };

  const handleQuizSubmit = () => {
    if (selectedOption === null) return;
    const isCorrect = QUIZ_QUESTIONS[quizIndex].options[selectedOption].correct;
    if (isCorrect) setQuizScore(prev => prev + 1);
    setQuizSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setQuizSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizSubmitted(false);
    setQuizFinished(false);
  };

  // Printable Action Plan Trigger
  const handlePrintPlan = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs print:hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20">
                <Heart className="w-5 h-5 fill-white/20" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                  TeenHealth<span className="text-teal-600">Hub</span>
                </span>
                <span className="block text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                  Peer Literacy Initiative
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {[
                { id: 'survey', label: 'Survey Insights' },
                { id: 'decoder', label: 'Jargon Decoder' },
                { id: 'rights', label: 'Healthcare Rights' },
                { id: 'action-plan', label: 'Action Plan' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-teal-50 text-teal-800 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button 
              onClick={() => { setActiveTab('decoder'); }}
              className="bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Decoder</span>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 py-12 lg:py-16 print:hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100 text-teal-900 text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-4 h-4" /> Based on 65-Student Peer Survey
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            Demystifying Medicine & Healthcare for Teens
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Translating intimidating medical jargon, demystifying healthcare consent rights, and giving you confidence at doctor visits.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab('decoder')}
              className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold px-6 py-3.5 rounded-2xl shadow-md shadow-teal-600/20 transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4" /> Translate Jargon Now
            </button>
            <button
              onClick={() => {
                setActiveTab('decoder');
                setTimeout(() => {
                  const quizEl = document.getElementById('quiz-section');
                  if (quizEl) quizEl.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" /> Take 2-Min Health Quiz
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* SECTION 1: SURVEY INSIGHTS DASHBOARD */}
        {activeTab === 'survey' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Peer Survey Insights</h2>
                <p className="text-sm text-slate-600">Real feedback collected from 65 high school students.</p>
              </div>

              {/* Filter Pills */}
              <div className="flex gap-2 bg-slate-200/70 p-1 rounded-xl">
                {['All Insights', 'Jargon Gap', 'Insurance & Rights'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setInsightFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      insightFilter === filter
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SURVEY_INSIGHTS.filter(item => insightFilter === 'All Insights' || item.category === insightFilter).map((stat) => (
                <div key={stat.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        stat.color === 'teal' ? 'bg-teal-100 text-teal-900' :
                        stat.color === 'amber' ? 'bg-amber-100 text-amber-950' : 'bg-slate-200 text-slate-900'
                      }`}>
                        {stat.category}
                      </span>
                      <span className="text-3xl font-extrabold text-slate-900">{stat.stat}</span>
                    </div>
                    
                    <h3 className="font-bold text-slate-900 text-base mb-2">{stat.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{stat.description}</p>
                  </div>

                  {/* Quote */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs italic text-slate-600 mt-2">
                    {stat.quote}
                    <span className="block not-italic font-bold text-[10px] text-slate-700 mt-1">— {stat.quoteAuthor}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* SECTION 2: MEDICAL JARGON TRANSLATOR & QUIZ */}
        {activeTab === 'decoder' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            
            {/* Jargon Search & Cards */}
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Medical Jargon Translator</h2>
                  <p className="text-sm text-slate-600">Click cards to flip between medical terminology and plain English translations.</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                      showBookmarksOnly 
                        ? 'bg-amber-100 text-amber-900 border-amber-300' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                    Bookmarked ({bookmarks.length})
                  </button>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search terms (e.g. Acute, OTC, Deductible, HIPAA)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white shadow-xs"
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                  {['All', 'Medical Terms', 'Insurance', 'Medications', 'Legal & Rights', 'Doctor Visits'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        selectedCategory === cat 
                          ? 'bg-teal-600 text-white shadow-xs' 
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTerms.length === 0 ? (
                  <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200">
                    <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-600 font-semibold text-sm">No medical terms found matching your search filter.</p>
                  </div>
                ) : (
                  filteredTerms.map((item) => {
                    const isFlipped = flippedCards[item.id];
                    const isBookmarked = bookmarks.includes(item.id);

                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between cursor-pointer min-h-[220px]"
                        onClick={() => toggleFlip(item.id)}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-900 uppercase">
                              {item.badge}
                            </span>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(item.id);
                              }}
                              className="text-slate-400 hover:text-amber-500 p-1"
                            >
                              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                            </button>
                          </div>

                          {!isFlipped ? (
                            <div>
                              <h3 className="text-xl font-extrabold text-slate-900 mb-2">{item.term}</h3>
                              <p className="text-xs text-slate-500 font-medium">Click card to reveal plain English translation</p>
                              <div className="mt-4 flex items-center gap-1.5 text-xs text-teal-700 font-bold">
                                <span>Tap to Flip</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </div>
                            </div>
                          ) : (
                            <div className="animate-fadeIn">
                              <h4 className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">Plain English:</h4>
                              <p className="text-sm font-semibold text-slate-900 mb-3">{item.plainEnglish}</p>
                              <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-0.5">Real-World Context:</h4>
                              <p className="text-xs text-slate-600 italic">{item.example}</p>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
                          <span className="font-semibold text-teal-700">{item.category}</span>
                          <span>{isFlipped ? 'Click to close' : 'Click to flip'}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* QUIZ GAME SUB-SECTION */}
            <div id="quiz-section" className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4" /> Interactive Jargon Quiz Game
                </div>
                
                {!quizFinished ? (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg sm:text-xl font-extrabold">Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}</h3>
                      <span className="text-xs font-bold bg-slate-800 px-3 py-1 rounded-full text-slate-300">Score: {quizScore}</span>
                    </div>

                    <p className="text-base sm:text-lg font-medium text-slate-100 mb-6">
                      {QUIZ_QUESTIONS[quizIndex].question}
                    </p>

                    <div className="space-y-3 mb-6">
                      {QUIZ_QUESTIONS[quizIndex].options.map((opt, idx) => {
                        let btnStyle = "border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200";
                        if (selectedOption === idx) btnStyle = "border-teal-500 bg-teal-950/80 text-white font-bold";
                        if (quizSubmitted) {
                          if (opt.correct) btnStyle = "border-emerald-500 bg-emerald-950 text-white font-bold";
                          else if (selectedOption === idx) btnStyle = "border-red-500 bg-red-950 text-white";
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleOptionSelect(idx)}
                            className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt.text}</span>
                            {quizSubmitted && opt.correct && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="bg-slate-800 p-4 rounded-xl mb-6 text-xs sm:text-sm text-slate-300 border border-slate-700">
                        <strong className="text-teal-400 block mb-1">Explanation:</strong>
                        {QUIZ_QUESTIONS[quizIndex].explanation}
                      </div>
                    )}

                    <div className="flex justify-end gap-3">
                      {!quizSubmitted ? (
                        <button
                          onClick={handleQuizSubmit}
                          disabled={selectedOption === null}
                          className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all"
                        >
                          Submit Answer
                        </button>
                      ) : (
                        <button
                          onClick={handleNextQuestion}
                          className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2"
                        >
                          <span>Next Question</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Award className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
                    <p className="text-slate-300 text-base mb-6">You scored <strong className="text-teal-400">{quizScore}</strong> out of {QUIZ_QUESTIONS.length}</p>
                    <button
                      onClick={restartQuiz}
                      className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all inline-flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" /> Retake Quiz
                    </button>
                  </div>
                )}
              </div>
            </div>

          </motion.div>
        )}

        {/* SECTION 3: TEEN HEALTHCARE RIGHTS & RX MODULE */}
        {activeTab === 'rights' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Teen Healthcare Rights & Navigation</h2>
              <p className="text-sm text-slate-600">Practical guides for doctor visits, reading pill bottles, and minor privacy rights.</p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200">
              {[
                { id: 'doctor', label: "At the Doctor's Office" },
                { id: 'rx', label: 'Decoding Prescription Labels' },
                { id: 'privacy', label: 'Consent & Minor Privacy' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setRightsTab(tab.id)}
                  className={`py-3 px-4 text-sm font-bold border-b-2 transition-all ${
                    rightsTab === tab.id
                      ? 'border-teal-600 text-teal-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: Doctor Visit */}
            {rightsTab === 'doctor' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5 text-teal-600" /> How to Ask Questions Without Nerves
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Write down 3 core symptoms or questions on your phone before stepping into the room.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Use the sentence starter: <em>"Can you explain that term in plain English?"</em></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Repeat instructions back: <em>"So I should take 1 pill after breakfast for 7 days, right?"</em></span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-teal-600" /> Teen Patient Checklist
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Know your active medications and any drug or food allergies.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Have a photo of your health insurance card saved on your phone.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Ask if you need a follow-up visit before leaving the checkout counter.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 2: Prescription Label Inspector */}
            {rightsTab === 'rx' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Interactive Pill Bottle Hotspot Inspector</h3>
                <p className="text-xs text-slate-600 mb-6">Click on any section of the prescription label to learn what it means.</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  
                  {/* Visual Hotspot Box */}
                  <div className="bg-amber-50 rounded-2xl border-2 border-amber-200 p-6 flex flex-col items-center justify-center relative min-h-[320px]">
                    <div className="w-56 bg-amber-400 text-slate-950 font-mono text-xs rounded-xl p-4 shadow-lg border-2 border-amber-500 space-y-2">
                      <div className="border-b border-amber-600/30 pb-1 font-bold flex justify-between">
                        <span>RX #1234567</span>
                        <span>QTY: 30</span>
                      </div>
                      <div className="font-bold text-sm">ALEX MORGAN</div>
                      <div className="text-[11px] leading-tight">TAKE 1 TABLET BY MOUTH DAILY WITH FOOD</div>
                      <div className="text-[10px] text-slate-800 pt-1 border-t border-amber-600/30">
                        REFILLS: 2 BEFORE 12/31/2026
                      </div>
                      <div className="text-[9px] bg-red-600 text-white font-bold p-1 rounded text-center uppercase tracking-wider">
                        WARNING: MAY CAUSE DROWSINESS
                      </div>
                    </div>
                  </div>

                  {/* Hotspot Cards */}
                  <div className="space-y-3">
                    {PRESCRIPTION_HOTSPOTS.map(spot => (
                      <button
                        key={spot.id}
                        onClick={() => setActiveHotspot(spot)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all ${
                          activeHotspot.id === spot.id
                            ? 'border-teal-600 bg-teal-50 shadow-xs'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="font-bold text-slate-900 mb-0.5">{spot.title}</div>
                        <div className="text-slate-600 text-xs">{spot.description}</div>
                      </button>
                    ))}
                  </div>

                </div>
              </div>
            )}

            {/* TAB 3: Minor Privacy */}
            {rightsTab === 'privacy' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Consent & Privacy as a Minor</h3>
                  <p className="text-sm text-slate-600">Understanding confidential healthcare rules and your rights as a high school student.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <Lock className="w-5 h-5 text-teal-600 mb-2" />
                    <h4 className="font-bold text-sm text-slate-900 mb-1">Confidential Services</h4>
                    <p className="text-xs text-slate-600">In many states, minors can seek confidential care for reproductive health, mental health, or substance use support.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <FileText className="w-5 h-5 text-teal-600 mb-2" />
                    <h4 className="font-bold text-sm text-slate-900 mb-1">Medical Records</h4>
                    <p className="text-xs text-slate-600">You have the right to request plain-language explanations of your diagnoses and test results from your doctor.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <User className="w-5 h-5 text-teal-600 mb-2" />
                    <h4 className="font-bold text-sm text-slate-900 mb-1">1-on-1 Time</h4>
                    <p className="text-xs text-slate-600">You can politely ask for a few minutes of private 1-on-1 time with your doctor during any standard annual checkup.</p>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        )}

        {/* SECTION 4: TEEN HEALTH ACTION PLAN GENERATOR */}
        {activeTab === 'action-plan' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Personalized Health Action Plan Generator</h2>
              <p className="text-sm text-slate-600">Build your custom 5-step checklist for your next doctor appointment or pharmacy visit.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="max-w-xl space-y-4 mb-8">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Name / Nickname</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Alex M."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Select Primary Health Goal</label>
                  <select
                    value={planGoal}
                    onChange={(e) => setPlanGoal(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white"
                  >
                    <option value="Prepare for an upcoming doctor appointment">Prepare for an upcoming doctor appointment</option>
                    <option value="Learn to read my prescription label accurately">Learn to read my prescription label accurately</option>
                    <option value="Understand my health insurance coverage & costs">Understand my health insurance coverage & costs</option>
                  </select>
                </div>

                <button
                  onClick={() => setPlanGenerated(true)}
                  className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-xs"
                >
                  Generate Custom Action Plan
                </button>
              </div>

              {planGenerated && (
                <div className="border-t border-slate-200 pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-lg">
                      {userName ? `${userName}'s` : 'My'} 5-Step Health Self-Advocacy Checklist
                    </h3>
                    
                    <button
                      onClick={handlePrintPlan}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all print:hidden"
                    >
                      <Download className="w-3.5 h-3.5" /> Print / Save PDF
                    </button>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: 'step-1', text: 'Write down 3 core symptoms or questions on your phone before your visit.' },
                      { id: 'step-2', text: 'Bring your health insurance card photo and photo ID to check-in.' },
                      { id: 'step-3', text: 'Ask your doctor: "Can you explain any unfamiliar terms in plain English?"' },
                      { id: 'step-4', text: 'Double-check prescription label active ingredients and dosage instructions.' },
                      { id: 'step-5', text: 'Ask the clinic desk if a follow-up appointment or lab test is needed.' }
                    ].map((step, idx) => {
                      const isChecked = checkedPlanItems[step.id];
                      return (
                        <div
                          key={step.id}
                          onClick={() => setCheckedPlanItems(prev => ({ ...prev, [step.id]: !prev[step.id] }))}
                          className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                            isChecked ? 'bg-teal-50 border-teal-200 text-teal-900' : 'bg-slate-50 border-slate-200 text-slate-800'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                            isChecked ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-sm font-semibold">{idx + 1}. {step.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-16 print:hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <Heart className="w-4 h-4 text-teal-600 fill-teal-600/20" />
              <span className="font-bold text-slate-900 text-sm">Teen Medical & Health Literacy Hub</span>
            </div>
            <p className="text-xs text-slate-500">
              Medical Disclaimer: Educational peer literacy resource. Not professional medical or legal advice.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-600">
            <a href="https://www.cdc.gov/healthyyouth/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-700 flex items-center gap-1">
              <span>CDC Healthy Youth</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://medlineplus.gov/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-700 flex items-center gap-1">
              <span>MedlinePlus</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
