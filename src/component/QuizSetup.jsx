import React from 'react';

// QuizSetup Component
function QuizSetup({ categories, quizSettings, setQuizSettings, startQuiz, isLoading, error, viewHistory }) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Hello, ZumQuiz!</h2>
        <p className="text-xl text-blue-200">Test your skills in different topics</p>
      </div>

      {error && (
        <div className="bg-red-500 bg-opacity-20 border border-red-400 text-red-200 px-4 py-3 rounded-lg mb-6 max-w-md mx-auto">
          <p>{error}</p>
        </div>
      )}

      {/* Topic Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {categories.map(category => (
          <div
            key={category.id}
            className={`p-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${quizSettings.category == category.id
              ? 'ring-4 ring-blue-400 shadow-2xl'
              : 'hover:shadow-xl'
              } ${getCategoryColor(category.name)}`}
            onClick={() => setQuizSettings({ ...quizSettings, category: category.id })}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{getCategoryIcon(category.name)}</div>
              <h3 className="text-lg font-bold mb-2">{category.name}</h3>
              <p className="text-sm opacity-90">{getCategoryDescription(category.name)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quiz Configuration */}
      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-6">Quiz Configuration</h3>

        <div className="space-y-6">
          {/* Difficulty Selection */}
          <div>
            <label className="block text-lg font-semibold mb-3">Select Difficulty Level</label>
            <div className="grid grid-cols-3 gap-4">
              {['easy', 'medium', 'hard'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setQuizSettings({ ...quizSettings, difficulty: diff })}
                  className={`p-4 rounded-lg font-medium transition-all duration-300 ${quizSettings.difficulty === diff
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white bg-opacity-20 text-blue-200 hover:bg-opacity-30'
                    }`}
                >
                  <div className="text-2xl mb-2">{getDifficultyIcon(diff)}</div>
                  <div className="capitalize">{diff}</div>
                  <div className="text-xs opacity-75">
                    {getDifficultyDescription(diff)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div>
            <label className="block text-lg font-semibold mb-3">
              Number of Questions: {quizSettings.amount}
            </label>
            <input
              type="range"
              min="5"
              max="25"
              value={quizSettings.amount}
              onChange={(e) => setQuizSettings({ ...quizSettings, amount: parseInt(e.target.value) })}
              className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-blue-200 mt-2">
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
              <span>25</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={startQuiz}
            disabled={isLoading || !quizSettings.category}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Loading...
              </>
            ) : (
              <>
                <i className="fas fa-play mr-2"></i>
                Start Quiz
              </>
            )}
          </button>

          <button
            onClick={viewHistory}
            className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 border border-white border-opacity-30"
          >
            <i className="fas fa-history mr-2"></i>
            View History
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getCategoryColor(categoryName) {
  const colors = {
    'General Knowledge': 'bg-gradient-to-br from-green-500 to-green-600',
    'Science & Nature': 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    'History': 'bg-gradient-to-br from-red-500 to-red-600',
    'Entertainment: Film': 'bg-gradient-to-br from-purple-500 to-purple-600',
    'Entertainment: Music': 'bg-gradient-to-br from-pink-500 to-pink-600',
    'Entertainment: Video Games': 'bg-gradient-to-br from-indigo-500 to-indigo-600'
  };
  return colors[categoryName] || 'bg-gradient-to-br from-gray-500 to-gray-600';
}

function getCategoryIcon(categoryName) {
  const icons = {
    'General Knowledge': '',
    'Science & Nature': '',
    'History': '',
    'Entertainment: Film': '',
    'Entertainment: Music': '',
    'Entertainment: Video Games': ''
  };
  return icons[categoryName] || '';
}

function getCategoryDescription(categoryName) {
  const descriptions = {
    'General Knowledge': 'Challenge yourself with a variety of surprising facts',
    'Science & Nature': 'Explore the wonders of science and the natural world',
    'History': 'Journey through time and discover historical events',
    'Entertainment: Film': 'Test your knowledge of movies and cinema',
    'Entertainment: Music': 'Rock out with music trivia and facts',
    'Entertainment: Video Games': 'Level up your gaming knowledge'
  };
  return descriptions[categoryName] || 'Test your knowledge in this category';
}

function getDifficultyIcon(difficulty) {
  const icons = {
    'easy': '',
    'medium': '',
    'hard': ''
  };
  return icons[difficulty] || '';
}

function getDifficultyDescription(difficulty) {
  const descriptions = {
    'easy': 'Beginner friendly',
    'medium': 'Moderate challenge',
    'hard': 'Expert level'
  };
  return descriptions[difficulty] || '';
}

export default QuizSetup;