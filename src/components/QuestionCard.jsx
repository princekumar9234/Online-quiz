import React from 'react';
import OptionButton from './OptionButton';

const QuestionCard = ({ 
  question, 
  currentNumber, 
  totalQuestions, 
  selectedOption, 
  isLocked, 
  onOptionSelect,
  hiddenOptions = []
}) => {
  if (!question) return null;

  return (
    <div className="slide-in">
      <div className="question-header">
        <span className="question-number">Question {currentNumber} of {totalQuestions}</span>
        <h2 className="question-text">{question.question}</h2>
      </div>

      <div className="options-grid">
        {question.options.map((option, index) => {
          if (hiddenOptions.includes(index)) {
            return <div key={index} style={{ visibility: 'hidden' }} className="option-btn"></div>;
          }
          return (
            <OptionButton
              key={index}
              label={option}
              index={index}
              isSelected={selectedOption === index}
              isCorrect={index === question.correctAnswer}
              isWrong={selectedOption === index && index !== question.correctAnswer}
              showResult={isLocked}
              onClick={onOptionSelect}
              disabled={isLocked}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
