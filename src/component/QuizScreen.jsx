import React from 'react';
import Utils from '../utils/utils.js';

// QuizScreen Component
function QuizScreen({ 
  currentQuestion, 
  currentQuestionIndex, 
  totalQuestions, 
  selectedAnswer, 
  handleAnswerSelect, 
  handleNextQuestion, 
  progress, 
  timeElapsed 
}) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm font-medium text-gray-600">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
        <div className="text-sm font-medium text-gray-600">
          <i className="fas fa-clock mr-1"></i>
          {Utils.formatTime(timeElapsed)}
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {currentQuestion.question}
      </h2>
      
      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
              selectedAnswer === option
                ? 'border-indigo-500 bg-indigo-50 transform scale-[1.02] shadow-md'
                : 'border-gray-300 hover:border-indigo-300'
            }`}
            onClick={() => handleAnswerSelect(option)}
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                selectedAnswer === option
                  ? 'border-indigo-500 bg-indigo-500 text-white'
                  : 'border-gray-400'
              }`}>
                {selectedAnswer === option && <i className="fas fa-check text-xs"></i>}
              </div>
              <span>{option}</span>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleNextQuestion}
        disabled={!selectedAnswer}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition duration-300"
      >
        {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
      </button>
    </div>
  );
}

export default QuizScreen;