import React, { useState, useEffect } from 'react';

import API from './utils/Api.js';
import utils from './utils/utils.js';
import Login from './component/Login.jsx';
import Register from './component/Register.jsx';
import QuizSetup from './component/QuizSetup.jsx';
import QuizScreen from './component/QuizScreen.jsx';
import ResultsScreen from './component/ResultsScreen.jsx';
import HistoryScreen from './component/HistoryScreen.jsx';


function QuizApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authScreen, setAuthScreen] = useState('login');
  const [screen, setScreen] = useState('auth');
  const [categories, setCategories] = useState([]);
  const [quizSettings, setQuizSettings] = useState({
    category: '',
    difficulty: 'any',
    amount: 10
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timer, setTimer] = useState(null);


  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setScreen('setup');
    }
  }, []);


  useEffect(() => {
    if (screen === 'setup') {
      const loadCategories = async () => {
        const cats = await API.fetchCategories();
        setCategories(cats);
      };
      loadCategories();


      const savedHistory = localStorage.getItem('quizHistory');
      if (savedHistory) {
        setQuizHistory(JSON.parse(savedHistory));
      }
    }
  }, [screen]);


  useEffect(() => {
    if (screen === 'quiz' && !timer) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      setTimer(interval);
    } else if (screen !== 'quiz' && timer) {
      clearInterval(timer);
      setTimer(null);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [screen]);


  const handleLogin = (user) => {
    setCurrentUser(user);
    setScreen('setup');
  };

  const handleRegister = (user) => {
    setCurrentUser(user);
    setScreen('setup');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setScreen('auth');
    setAuthScreen('login');
  };

  const switchToRegister = () => {
    setAuthScreen('register');
  };

  const switchToLogin = () => {
    setAuthScreen('login');
  };

  const startQuiz = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const questions = await API.fetchQuestions(
        quizSettings.amount,
        quizSettings.category,
        quizSettings.difficulty
      );

      if (questions.length === 0) {
        throw new Error('No questions found with these settings. Please try different options.');
      }


      const processedQuestions = questions.map(q => ({
        ...q,
        question: utils.decodeHtml(q.question),
        correct_answer: utils.decodeHtml(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(a => utils.decodeHtml(a)),
        options: utils.shuffleArray([q.correct_answer, ...q.incorrect_answers].map(a => utils.decodeHtml(a)))
      }));

      setQuestions(processedQuestions);
      setScreen('quiz');
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setAnsweredQuestions([]);
      setTimeElapsed(0);
    } catch (err) {
      setError(err.message || 'Failed to load questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;


    if (isCorrect) {
      setScore(prev => prev + 1);
    }


    setAnsweredQuestions(prev => [
      ...prev,
      {
        question: currentQuestion,
        selectedAnswer,
        isCorrect
      }
    ]);


    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {

      const finalScore = isCorrect ? score + 1 : score;
      const historyEntry = {
        userId: currentUser.id,
        category: quizSettings.category,
        categoryName: categories.find(c => c.id == quizSettings.category)?.name || 'Mixed',
        difficulty: quizSettings.difficulty,
        score: finalScore,
        total: questions.length,
        date: new Date().toLocaleDateString(),
        time: timeElapsed
      };

      const updatedHistory = [historyEntry, ...quizHistory.slice(0, 9)];
      setQuizHistory(updatedHistory);
      localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));

      setScreen('results');
    }
  };

  const restartQuiz = () => {
    setScreen('setup');
  };

  const retryQuiz = () => {
    startQuiz();
  };

  const viewHistory = () => {
    setScreen('history');
  };

  const viewSetup = () => {
    setScreen('setup');
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;


  if (screen === 'auth') {
    return authScreen === 'login' ? (
      <Login onLogin={handleLogin} onSwitchToRegister={switchToRegister} />
    ) : (
      <Register onRegister={handleRegister} onSwitchToLogin={switchToLogin} />
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Navigation Header */}
      <nav className="bg-black bg-opacity-20 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Quiz App</h1>
          <div className="flex items-center space-x-6">
            <span className="text-blue-200">
              Welcome, {currentUser?.firstName || 'User'}!
            </span>
            <button
              onClick={handleLogout}
              className="text-white hover:text-blue-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {screen === 'setup' && (
          <QuizSetup
            categories={categories}
            quizSettings={quizSettings}
            setQuizSettings={setQuizSettings}
            startQuiz={startQuiz}
            isLoading={isLoading}
            error={error}
            viewHistory={viewHistory}
          />
        )}

        {screen === 'quiz' && currentQuestion && (
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 mx-auto">
            <QuizScreen
              currentQuestion={currentQuestion}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              selectedAnswer={selectedAnswer}
              handleAnswerSelect={handleAnswerSelect}
              handleNextQuestion={handleNextQuestion}
              progress={progress}
              timeElapsed={timeElapsed}
            />
          </div>
        )}

        {screen === 'results' && (
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 mx-auto">
            <ResultsScreen
              score={score}
              totalQuestions={questions.length}
              answeredQuestions={answeredQuestions}
              restartQuiz={restartQuiz}
              retryQuiz={retryQuiz}
              timeElapsed={timeElapsed}
            />
          </div>
        )}

        {screen === 'history' && (
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 mx-auto">
            <HistoryScreen
              quizHistory={quizHistory.filter(h => h.userId === currentUser?.id)}
              viewSetup={viewSetup}
              categories={categories}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizApp;