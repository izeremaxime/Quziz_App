
import React from 'react';
import Utils from '../utils/utils.js';

// HistoryScreen Component
function HistoryScreen({ quizHistory, viewSetup, categories }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Quiz History</h1>
      
      {quizHistory.length === 0 ? (
        <div className="text-center py-8">
          <i className="fas fa-history text-4xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">No quiz history yet. Complete a quiz to see your results here.</p>
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {quizHistory.map((quiz, index) => {
            const category = categories.find(c => c.id == quiz.category)?.name || quiz.categoryName;
            const percentage = Math.round((quiz.score / quiz.total) * 100);
            
            return (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{category}</h3>
                    <p className="text-sm text-gray-600">
                      Difficulty: {quiz.difficulty} | {quiz.total} questions
                    </p>
                    <p className="text-sm text-gray-600">Date: {quiz.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{quiz.score}/{quiz.total}</div>
                    <div className="text-sm">{percentage}%</div>
                    <div className="text-xs text-gray-500">
                      <i className="fas fa-clock mr-1"></i>
                      {Utils.formatTime(quiz.time)}
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div
                    className="h-2 rounded-full bg-indigo-600 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      <button
        onClick={viewSetup}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300"
      >
        <i className="fas fa-arrow-left mr-2"></i>
        Back to Quiz
      </button>
    </div>
  );
}

export default HistoryScreen;