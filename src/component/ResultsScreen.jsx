import React from 'react';
import Utils from '../utils/utils.js';

// ResultsScreen Component
function ResultsScreen({ score, totalQuestions, answeredQuestions, restartQuiz, retryQuiz, timeElapsed }) {
  const percentage = Math.round((score / totalQuestions) * 100);

  let resultMessage = '';
  let resultColor = '';

  if (percentage >= 80) {
    resultMessage = 'Excellent!';
    resultColor = 'text-green-600';
  } else if (percentage >= 60) {
    resultMessage = 'Good job!';
    resultColor = 'text-blue-600';
  } else if (percentage >= 40) {
    resultMessage = 'Not bad!';
    resultColor = 'text-yellow-600';
  } else {
    resultMessage = 'Keep practicing!';
    resultColor = 'text-red-600';
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-2">Quiz Completed!</h1>
      <p className="text-center text-gray-600 mb-8">You scored {score} out of {totalQuestions}</p>

      <div className="flex justify-center mb-8">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#eee"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="3"
              strokeDasharray={`${percentage}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{percentage}%</span>
            <span className={`text-sm font-medium ${resultColor}`}>{resultMessage}</span>
          </div>
        </div>
      </div>

      <div className="mb-6 text-center text-gray-600">
        <i className="fas fa-clock mr-2"></i>
        Time: {Utils.formatTime(timeElapsed)}
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Review Answers</h3>
        <div className="space-y-4">
          {answeredQuestions.map((item, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg ${item.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}
            >
              <p className="font-medium mb-2">{item.question.question}</p>
              <div className="flex justify-between">
                <span className={item.isCorrect ? 'text-green-700' : 'text-red-700'}>
                  Your answer: {item.selectedAnswer}
                </span>
                {!item.isCorrect && (
                  <span className="text-green-700">
                    Correct: {item.question.correct_answer}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={retryQuiz}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300"
        >
          <i className="fas fa-redo mr-2"></i>
          Retry Quiz
        </button>

        <button
          onClick={restartQuiz}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition duration-300"
        >
          <i className="fas fa-home mr-2"></i>
          New Quiz
        </button>
      </div>
    </div>
  );
}

export default ResultsScreen;