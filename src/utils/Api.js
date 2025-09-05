// API Helper Functions
const API = {
  async fetchCategories() {
    try {
      // In a real app, you would fetch from the Open Trivia API
      // const response = await fetch('https://opentdb.com/api_category.php');
      // const data = await response.json();
      // return data.trivia_categories;

      // Simulating API response with a delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return [
        { id: 9, name: "General Knowledge" },
        { id: 17, name: "Science & Nature" },
        { id: 23, name: "History" },
        { id: 11, name: "Entertainment: Film" },
        { id: 12, name: "Entertainment: Music" },
        { id: 15, name: "Entertainment: Video Games" }
      ];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  async fetchQuestions(amount, category, difficulty) {
    try {
      // In a real app, you would fetch from the Open Trivia API
      // let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
      // if (category) url += `&category=${category}`;
      // if (difficulty && difficulty !== 'any') url += `&difficulty=${difficulty}`;

      // const response = await fetch(url);
      // const data = await response.json();

      // Simulating API response with a delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Get questions based on difficulty and category
      const questions = this.getQuestionsByDifficulty(amount, category, difficulty);

      return questions.map((q, i) => ({
        ...q,
        id: i + 1
      }));
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  },

  getQuestionsByDifficulty(amount, category, difficulty) {
    const allQuestions = this.getAllQuestions();

    // Filter by category if specified
    let filteredQuestions = category
      ? allQuestions.filter(q => q.categoryId == category)
      : allQuestions;

    // Filter by difficulty
    filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);

    // If not enough questions for the difficulty, add some from other difficulties
    if (filteredQuestions.length < amount) {
      const otherQuestions = allQuestions.filter(q =>
        q.difficulty !== difficulty &&
        (!category || q.categoryId == category)
      );
      filteredQuestions = [...filteredQuestions, ...otherQuestions];
    }

    // Shuffle and return requested amount
    return this.shuffleArray(filteredQuestions).slice(0, amount);
  },

  getAllQuestions() {
    return [
      // General Knowledge - Easy
      {
        question: "What is the capital of France?",
        correct_answer: "Paris",
        incorrect_answers: ["London", "Berlin", "Madrid"],
        category: "General Knowledge",
        categoryId: 9,
        difficulty: "easy"
      },
      {
        question: "How many days are in a week?",
        correct_answer: "7",
        incorrect_answers: ["5", "6", "8"],
        category: "General Knowledge",
        categoryId: 9,
        difficulty: "easy"
      },
      {
        question: "What color is the sky on a clear day?",
        correct_answer: "Blue",
        incorrect_answers: ["Green", "Red", "Yellow"],
        category: "General Knowledge",
        categoryId: 9,
        difficulty: "easy"
      },

      // General Knowledge - Medium
      {
        question: "Which country has the highest life expectancy?",
        correct_answer: "Hong Kong",
        incorrect_answers: ["Turkey", "Switzerland", "Japan"],
        category: "General Knowledge",
        categoryId: 9,
        difficulty: "medium"
      },
      {
        question: "How many minutes are in a full week?",
        correct_answer: "10,080",
        incorrect_answers: ["10,800", "10,900", "10,200"],
        category: "General Knowledge",
        categoryId: 9,
        difficulty: "medium"
      },
      {
        question: "What is the largest ocean on Earth?",
        correct_answer: "Pacific Ocean",
        incorrect_answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
        category: "General Knowledge",
        categoryId: 9,
        difficulty: "medium"
      },

      // General Knowledge - Hard
      {
        question: "Who was the ancient Greek god of the sun?",
        correct_answer: "Apollo",
        incorrect_answers: ["Hercules", "Zeus", "Poseidon"],
        category: "General Knowledge",
        categoryId: 9,
        difficulty: "hard"
      },
      {
        question: "In which country will you find the mountain called Kilimanjaro?",
        correct_answer: "Tanzania",
        incorrect_answers: ["Uganda", "Kenya", "Ethiopia"],
        category: "General Knowledge",
        categoryId: 9,
        difficulty: "hard"
      },
      {
        question: "What year did World War II end?",
        correct_answer: "1945",
        incorrect_answers: ["1943", "1944", "1946"],
        category: "General Knowledge",
        categoryId: 9,
        difficulty: "hard"
      },

      // Science & Nature - Easy
      {
        question: "Which planet is known as the Red Planet?",
        correct_answer: "Mars",
        incorrect_answers: ["Venus", "Jupiter", "Saturn"],
        category: "Science & Nature",
        categoryId: 17,
        difficulty: "easy"
      },
      {
        question: "What is the largest mammal in the world?",
        correct_answer: "Blue Whale",
        incorrect_answers: ["Elephant", "Giraffe", "Hippopotamus"],
        category: "Science & Nature",
        categoryId: 17,
        difficulty: "easy"
      },
      {
        question: "What is the chemical symbol for water?",
        correct_answer: "H2O",
        incorrect_answers: ["CO2", "O2", "N2"],
        category: "Science & Nature",
        categoryId: 17,
        difficulty: "easy"
      },

      // Science & Nature - Medium
      {
        question: "What is the hardest natural substance on Earth?",
        correct_answer: "Diamond",
        incorrect_answers: ["Steel", "Iron", "Rock"],
        category: "Science & Nature",
        categoryId: 17,
        difficulty: "medium"
      },
      {
        question: "How many bones are in the human body?",
        correct_answer: "206",
        incorrect_answers: ["200", "210", "195"],
        category: "Science & Nature",
        categoryId: 17,
        difficulty: "medium"
      },
      {
        question: "What is the speed of light?",
        correct_answer: "299,792,458 m/s",
        incorrect_answers: ["199,792,458 m/s", "399,792,458 m/s", "249,792,458 m/s"],
        category: "Science & Nature",
        categoryId: 17,
        difficulty: "medium"
      },

      // Science & Nature - Hard
      {
        question: "What is the atomic number of carbon?",
        correct_answer: "6",
        incorrect_answers: ["5", "7", "8"],
        category: "Science & Nature",
        categoryId: 17,
        difficulty: "hard"
      },
      {
        question: "What is the largest organ in the human body?",
        correct_answer: "Skin",
        incorrect_answers: ["Heart", "Liver", "Brain"],
        category: "Science & Nature",
        categoryId: 17,
        difficulty: "hard"
      },
      {
        question: "What is the chemical formula for glucose?",
        correct_answer: "C6H12O6",
        incorrect_answers: ["C12H22O11", "CH3COOH", "NaHCO3"],
        category: "Science & Nature",
        categoryId: 17,
        difficulty: "hard"
      },

      // History - Easy
      {
        question: "Who was the first President of the United States?",
        correct_answer: "George Washington",
        incorrect_answers: ["Thomas Jefferson", "John Adams", "Benjamin Franklin"],
        category: "History",
        categoryId: 23,
        difficulty: "easy"
      },
      {
        question: "In which year did Columbus discover America?",
        correct_answer: "1492",
        incorrect_answers: ["1490", "1495", "1500"],
        category: "History",
        categoryId: 23,
        difficulty: "easy"
      },
      {
        question: "What was the name of the ship that sank in 1912?",
        correct_answer: "Titanic",
        incorrect_answers: ["Lusitania", "Britannic", "Olympic"],
        category: "History",
        categoryId: 23,
        difficulty: "easy"
      },

      // History - Medium
      {
        question: "What year did World War I begin?",
        correct_answer: "1914",
        incorrect_answers: ["1912", "1916", "1918"],
        category: "History",
        categoryId: 23,
        difficulty: "medium"
      },
      {
        question: "Who was the first Emperor of Rome?",
        correct_answer: "Augustus",
        incorrect_answers: ["Julius Caesar", "Nero", "Caligula"],
        category: "History",
        categoryId: 23,
        difficulty: "medium"
      },
      {
        question: "What year did the Berlin Wall fall?",
        correct_answer: "1989",
        incorrect_answers: ["1987", "1991", "1985"],
        category: "History",
        categoryId: 23,
        difficulty: "medium"
      },

      // History - Hard
      {
        question: "What was the name of the ancient Egyptian queen who ruled from 51-30 BC?",
        correct_answer: "Cleopatra",
        incorrect_answers: ["Nefertiti", "Hatshepsut", "Isis"],
        category: "History",
        categoryId: 23,
        difficulty: "hard"
      },
      {
        question: "In which year did the French Revolution begin?",
        correct_answer: "1789",
        incorrect_answers: ["1787", "1791", "1785"],
        category: "History",
        categoryId: 23,
        difficulty: "hard"
      },
      {
        question: "Who was the first female Prime Minister of the United Kingdom?",
        correct_answer: "Margaret Thatcher",
        incorrect_answers: ["Theresa May", "Liz Truss", "Helen Clark"],
        category: "History",
        categoryId: 23,
        difficulty: "hard"
      },

      // Entertainment: Film - Easy
      {
        question: "Who played Iron Man in the Marvel movies?",
        correct_answer: "Robert Downey Jr.",
        incorrect_answers: ["Chris Evans", "Chris Hemsworth", "Mark Ruffalo"],
        category: "Entertainment: Film",
        categoryId: 11,
        difficulty: "easy"
      },
      {
        question: "What is the name of the main character in Titanic?",
        correct_answer: "Jack Dawson",
        incorrect_answers: ["John Smith", "James Cameron", "Leo DiCaprio"],
        category: "Entertainment: Film",
        categoryId: 11,
        difficulty: "easy"
      },
      {
        question: "What year was the first Star Wars movie released?",
        correct_answer: "1977",
        incorrect_answers: ["1975", "1980", "1973"],
        category: "Entertainment: Film",
        categoryId: 11,
        difficulty: "easy"
      },

      // Entertainment: Film - Medium
      {
        question: "Who directed the movie 'The Godfather'?",
        correct_answer: "Francis Ford Coppola",
        incorrect_answers: ["Martin Scorsese", "Steven Spielberg", "Quentin Tarantino"],
        category: "Entertainment: Film",
        categoryId: 11,
        difficulty: "medium"
      },
      {
        question: "What is the name of the fictional town where 'Back to the Future' is set?",
        correct_answer: "Hill Valley",
        incorrect_answers: ["Springfield", "Riverdale", "Smallville"],
        category: "Entertainment: Film",
        categoryId: 11,
        difficulty: "medium"
      },
      {
        question: "Who won the Academy Award for Best Actor in 2020?",
        correct_answer: "Joaquin Phoenix",
        incorrect_answers: ["Adam Driver", "Leonardo DiCaprio", "Antonio Banderas"],
        category: "Entertainment: Film",
        categoryId: 11,
        difficulty: "medium"
      },

      // Entertainment: Film - Hard
      {
        question: "What was the first animated feature film to be nominated for Best Picture at the Oscars?",
        correct_answer: "Beauty and the Beast",
        incorrect_answers: ["The Lion King", "Toy Story", "Snow White"],
        category: "Entertainment: Film",
        categoryId: 11,
        difficulty: "hard"
      },
      {
        question: "Who composed the score for 'The Lord of the Rings' trilogy?",
        correct_answer: "Howard Shore",
        incorrect_answers: ["John Williams", "Hans Zimmer", "Danny Elfman"],
        category: "Entertainment: Film",
        categoryId: 11,
        difficulty: "hard"
      },
      {
        question: "What year was the first Academy Awards ceremony held?",
        correct_answer: "1929",
        incorrect_answers: ["1927", "1931", "1925"],
        category: "Entertainment: Film",
        categoryId: 11,
        difficulty: "hard"
      },

      // Entertainment: Music - Easy
      {
        question: "Who is known as the 'King of Pop'?",
        correct_answer: "Michael Jackson",
        incorrect_answers: ["Elvis Presley", "Prince", "David Bowie"],
        category: "Entertainment: Music",
        categoryId: 12,
        difficulty: "easy"
      },
      {
        question: "What is the name of the band that sang 'Bohemian Rhapsody'?",
        correct_answer: "Queen",
        incorrect_answers: ["The Beatles", "Led Zeppelin", "Pink Floyd"],
        category: "Entertainment: Music",
        categoryId: 12,
        difficulty: "easy"
      },
      {
        question: "What year was the first Woodstock festival held?",
        correct_answer: "1969",
        incorrect_answers: ["1967", "1971", "1965"],
        category: "Entertainment: Music",
        categoryId: 12,
        difficulty: "easy"
      },

      // Entertainment: Music - Medium
      {
        question: "Who wrote the song 'Imagine'?",
        correct_answer: "John Lennon",
        incorrect_answers: ["Paul McCartney", "George Harrison", "Ringo Starr"],
        category: "Entertainment: Music",
        categoryId: 12,
        difficulty: "medium"
      },
      {
        question: "What is the name of the band that released 'Dark Side of the Moon'?",
        correct_answer: "Pink Floyd",
        incorrect_answers: ["Led Zeppelin", "The Who", "The Rolling Stones"],
        category: "Entertainment: Music",
        categoryId: 12,
        difficulty: "medium"
      },
      {
        question: "Who is the lead singer of U2?",
        correct_answer: "Bono",
        incorrect_answers: ["The Edge", "Adam Clayton", "Larry Mullen Jr."],
        category: "Entertainment: Music",
        categoryId: 12,
        difficulty: "medium"
      },

      // Entertainment: Music - Hard
      {
        question: "What year was the first Grammy Awards ceremony held?",
        correct_answer: "1959",
        incorrect_answers: ["1957", "1961", "1955"],
        category: "Entertainment: Music",
        categoryId: 12,
        difficulty: "hard"
      },
      {
        question: "Who composed the opera 'The Magic Flute'?",
        correct_answer: "Wolfgang Amadeus Mozart",
        incorrect_answers: ["Ludwig van Beethoven", "Johann Sebastian Bach", "Franz Schubert"],
        category: "Entertainment: Music",
        categoryId: 12,
        difficulty: "hard"
      },
      {
        question: "What is the name of the band that released 'Sgt. Pepper's Lonely Hearts Club Band'?",
        correct_answer: "The Beatles",
        incorrect_answers: ["The Rolling Stones", "The Who", "Led Zeppelin"],
        category: "Entertainment: Music",
        categoryId: 12,
        difficulty: "hard"
      },

      // Entertainment: Video Games - Easy
      {
        question: "What is the name of the main character in Super Mario Bros.?",
        correct_answer: "Mario",
        incorrect_answers: ["Luigi", "Yoshi", "Bowser"],
        category: "Entertainment: Video Games",
        categoryId: 15,
        difficulty: "easy"
      },
      {
        question: "What year was the first PlayStation console released?",
        correct_answer: "1994",
        incorrect_answers: ["1992", "1996", "1990"],
        category: "Entertainment: Video Games",
        categoryId: 15,
        difficulty: "easy"
      },
      {
        question: "What is the name of the company that created Minecraft?",
        correct_answer: "Mojang",
        incorrect_answers: ["Microsoft", "Notch", "EA"],
        category: "Entertainment: Video Games",
        categoryId: 15,
        difficulty: "easy"
      },

      // Entertainment: Video Games - Medium
      {
        question: "What is the name of the protagonist in The Legend of Zelda series?",
        correct_answer: "Link",
        incorrect_answers: ["Zelda", "Ganon", "Epona"],
        category: "Entertainment: Video Games",
        categoryId: 15,
        difficulty: "medium"
      },
      {
        question: "What year was the first Call of Duty game released?",
        correct_answer: "2003",
        incorrect_answers: ["2001", "2005", "1999"],
        category: "Entertainment: Video Games",
        categoryId: 15,
        difficulty: "medium"
      },
      {
        question: "What is the name of the company that created Grand Theft Auto?",
        correct_answer: "Rockstar Games",
        incorrect_answers: ["EA", "Ubisoft", "Activision"],
        category: "Entertainment: Video Games",
        categoryId: 15,
        difficulty: "medium"
      },

      // Entertainment: Video Games - Hard
      {
        question: "What year was the first video game console (Magnavox Odyssey) released?",
        correct_answer: "1972",
        incorrect_answers: ["1970", "1974", "1968"],
        category: "Entertainment: Video Games",
        categoryId: 15,
        difficulty: "hard"
      },
      {
        question: "Who is considered the 'Father of Video Games'?",
        correct_answer: "Ralph Baer",
        incorrect_answers: ["Nolan Bushnell", "Shigeru Miyamoto", "Sid Meier"],
        category: "Entertainment: Video Games",
        categoryId: 15,
        difficulty: "hard"
      },
      {
        question: "What is the name of the first commercially successful arcade video game?",
        correct_answer: "Pong",
        incorrect_answers: ["Space Invaders", "Pac-Man", "Asteroids"],
        category: "Entertainment: Video Games",
        categoryId: 15,
        difficulty: "hard"
      }
    ];
  },

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
};

export default API;