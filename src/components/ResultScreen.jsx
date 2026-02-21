import React from 'react';

const ResultScreen = ({ score, totalQuestions, userAnswers, questions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="result-screen fade-in">
      <h2 style={{ marginBottom: '20px' }}>Quiz Completed!</h2>
      
      <div className="score-circle">
        <span className="big">{score}</span>
        <span className="small">out of {totalQuestions}</span>
      </div>

      <p style={{ fontSize: '1.2rem', fontWeight: '600', color: percentage >= 50 ? 'var(--success)' : 'var(--error)' }}>
        {percentage}% Score
      </p>

      <div className="summary-list">
        {questions.map((q, idx) => {
          const userAnswer = userAnswers[idx];
          const isCorrect = userAnswer === q.correctAnswer;
          
          return (
            <div key={idx} className={`summary-item ${isCorrect ? 'correct' : 'wrong'}`}>
              <p className="summary-q">{idx + 1}. {q.question}</p>
              <p className="summary-a">
                Your answer: <span style={{ color: isCorrect ? 'var(--success)' : 'var(--error)' }}>
                  {q.options[userAnswer] || "Not answered"}
                </span>
              </p>
              {!isCorrect && (
                <p className="summary-a">
                  Correct answer: <span style={{ color: 'var(--success)' }}>{q.options[q.correctAnswer]}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button className="btn-primary" onClick={onRestart}>
        Try Again
      </button>
    </div>
  );
};

export default ResultScreen;
