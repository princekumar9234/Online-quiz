import React, { useState, useEffect } from 'react';
import { initialQuestions } from './questions';
import QuestionCard from './components/QuestionCard';
import ResultScreen from './components/ResultScreen';
import AddQuestionForm from './components/AddQuestionForm';

function App() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // New Interactive States
  const [timeLeft, setTimeLeft] = useState(30);
  const [lifelinesUsed, setLifelinesUsed] = useState({ fiftyFifty: false });
  const [hiddenOptions, setHiddenOptions] = useState([]);

  // Timer logic
  useEffect(() => {
    if (showResult || showAddForm || isLocked) return;

    if (timeLeft === 0) {
      handleOptionSelect(-1); // Auto-lock if time runs out
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResult, showAddForm, isLocked]);

  // Handle option selection
  const handleOptionSelect = (index) => {
    if (isLocked) return;
    
    setSelectedOption(index);
    setIsLocked(true);

    const isCorrect = index === questions[currentIndex].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentIndex] = index;
    setUserAnswers(newUserAnswers);
  };

  // Move to next question
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsLocked(false);
      setTimeLeft(30);
      setHiddenOptions([]);
    } else {
      setShowResult(true);
    }
  };

  // Lifeline Logic: Hide 2 random wrong answers
  const handleLifeline = () => {
    if (lifelinesUsed.fiftyFifty || isLocked) return;
    
    const currentQ = questions[currentIndex];
    const wrongOptions = currentQ.options
      .map((_, i) => i)
      .filter(i => i !== currentQ.correctAnswer);
    
    // Sort randomly and pick 2
    const toHide = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2);
    
    setHiddenOptions(toHide);
    setLifelinesUsed(prev => ({ ...prev, fiftyFifty: true }));
  };

  const handleQuit = () => {
    if (window.confirm("Are you sure you want to quit?")) {
      resetQuiz();
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsLocked(false);
    setShowResult(false);
    setUserAnswers([]);
    setTimeLeft(30);
    setLifelinesUsed({ fiftyFifty: false });
    setHiddenOptions([]);
  };

  const handleAddQuestion = (newQuestion) => {
    setQuestions(prev => [...prev, newQuestion]);
  };

  const progress = ((currentIndex + (isLocked ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="quiz-container fade-in">
      {!showResult && !showAddForm && (
        <>
          <div className="timer-container">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span className="timer-text">{timeLeft}s</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>
              SCORE: <span style={{ color: 'var(--primary)', fontWeight: '800' }}>{score * 1000} XP</span>
            </div>
            <button 
              className="btn-secondary" 
              style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '8px' }}
              onClick={() => setShowAddForm(true)}
            >
              + CUSTOM Q
            </button>
          </div>

          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>

          <QuestionCard
            question={questions[currentIndex]}
            currentNumber={currentIndex + 1}
            totalQuestions={questions.length}
            selectedOption={selectedOption}
            isLocked={isLocked}
            onOptionSelect={handleOptionSelect}
            hiddenOptions={hiddenOptions}
          />

          <div className="quiz-footer">
            <button className="btn-secondary" onClick={handleQuit}>Quit</button>
            <button 
              className="btn-secondary" 
              onClick={handleLifeline} 
              disabled={lifelinesUsed.fiftyFifty || isLocked}
              style={{ border: lifelinesUsed.fiftyFifty ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--secondary)' }}
            >
              {lifelinesUsed.fiftyFifty ? "50:50 USED" : "50:50 LIFELINE"}
            </button>
            <button 
              className="btn-primary" 
              onClick={handleNext} 
              disabled={selectedOption === null && timeLeft > 0}
            >
              {currentIndex === questions.length - 1 ? "FINISH" : "NEXT"}
            </button>
          </div>
        </>
      )}

      {showResult && (
        <ResultScreen
          score={score}
          totalQuestions={questions.length}
          userAnswers={userAnswers}
          questions={questions}
          onRestart={resetQuiz}
        />
      )}

      {showAddForm && (
        <AddQuestionForm
          onAdd={handleAddQuestion}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}

export default App;
