import React from 'react';

const OptionButton = ({ label, index, isSelected, isCorrect, isWrong, showResult, onClick, disabled }) => {
  let statusClass = '';
  if (showResult) {
    if (isCorrect) statusClass = 'correct';
    else if (isWrong) statusClass = 'wrong';
  } else if (isSelected) {
    statusClass = 'selected';
  }

  return (
    <button
      className={`option-btn ${statusClass}`}
      onClick={() => onClick(index)}
      disabled={disabled}
    >
      <span>{String.fromCharCode(65 + index)}</span>
      {label}
    </button>
  );
};

export default OptionButton;
