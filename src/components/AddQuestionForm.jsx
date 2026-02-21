import React, { useState } from 'react';

const AddQuestionForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswerIndex: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.question || !formData.option1 || !formData.option2) return;

    const newQuestion = {
      id: Date.now(),
      question: formData.question,
      options: [formData.option1, formData.option2, formData.option3, formData.option4],
      correctAnswer: parseInt(formData.correctAnswerIndex)
    };

    onAdd(newQuestion);
    onCancel();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: '24px' }}>Add New Question</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-group">
          <label>Question Text</label>
          <input 
            type="text" 
            name="question" 
            placeholder="Type your question..." 
            value={formData.question} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="options-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '0' }}>
          {[1, 2, 3, 4].map(num => (
            <div key={num} className="form-group">
              <label>Option {num}</label>
              <input 
                type="text" 
                name={`option${num}`} 
                placeholder={`Option ${num}`} 
                value={formData[`option${num}`]} 
                onChange={handleChange} 
                required 
              />
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Correct Answer</label>
          <select 
            name="correctAnswerIndex" 
            value={formData.correctAnswerIndex} 
            onChange={handleChange}
          >
            <option value={0}>Option 1</option>
            <option value={1}>Option 2</option>
            <option value={2}>Option 3</option>
            <option value={3}>Option 4</option>
          </select>
        </div>

        <div className="quiz-footer">
          <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn-primary">Save Question</button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestionForm;
