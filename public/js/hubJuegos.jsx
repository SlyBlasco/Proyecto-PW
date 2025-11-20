const { useState, useEffect } = React;

// DATOS DE LOS JUEGOS

// 1. Preguntas de la Trivia
const TRIVIA_DATA = [
  {
    question: "¿Dónde fue nuestra primera cita?",
    options: ["En el cine", "En un caffenio", "En la playa", "En el gym"],
    answer: "En un caffenio" 
  },
  {
    question: "¿Cuál es mi comida favorita?",
    options: ["Pasta", "Tacos", "Sushi", "Pizza"],
    answer: "Pasta"
  },
  {
    question: "¿En qué mes nos hicimos novios?",
    options: ["Enero", "Febrero", "Noviembre", "Diciembre"],
    answer: "Noviembre"
  },
  {
    question: "¿Cuál es mi cena favorita?",
    options: ["Molletes", "Cereal Cheerios", "Hot Dogs", "Quesadillas"],
    answer: "Molletes"
  },
  {
    question: "¿Cuál es mi desayuno favorito?",
    options: ["Huevito con salchicha", "Hot Cakes", "Waffles", "Chilaquiles"],
    answer: "Chilaquiles"
  },
  {
    question: "¿Cuál es la fecha de nuestro primer beso?",
    options: ["31 de Octubre, 2024", "24 de Octubre, 2024", "27 de Octubre, 2024", "05 de Noviembre, 2024"],
    answer: "24 de Octubre, 2024"
  },
  {
    question: "¿En qué restaurante me enchile el ojo?",
    options: ["Burbanos", "Los Arbolitos", "El Rincon de Cambuston", "Karibbe Roll"],
    answer: "Karibbe Roll"
  },
  {
    question: "¿En qué restaurante fuimos para celebrarte en tu cumpleaños número 21 en Guadalajara?",
    options: ["Olive Garden", "Altezza", "La Trattoria", "Ristorante Angelo"],
    answer: "Olive Garden"
  },
  {
    question: "¿En qué restaurante fuimos para celebrarte tu cumpleaños número 20?",
    options: ["Karibbe Roll", "Buquibichi", "El Mazateño", "Burbanos"],
    answer: "Burbanos"
  },
  {
    question: "¿Quién es mi artista favorito?",
    options: ["Post Malone", "Justin Bieber", "Kid Laroi", "Luis Miguel"],
    answer: "Kid Laroi"
  },
  {
    question: "¿Qué canción de 4, te dedique en San Valentin?",
    options: ["2 Much -  Justin Bieber", "La Gloria eres Tú - Luis Miguel", "Brillas - León Larregui", "Nights Like This - The Kid Laroi"],
    answer: "2 Much -  Justin Bieber"
  },
  {
    question: "¿A qué artista fuimos a ver al mes de novios?",
    options: ["La Maldita Vecindad", "NSQK", "LATIN MAFIA", "JJJJJUMBE"],
    answer: "NSQK"
  },
  {
    question: "¿Cuál es tu apodo que prefiero decirte?",
    options: ["Mi Chiquita", "Mi Amorcito", "Mi Princesa", "Mi Dianita"],
    answer: "Mi Dianita"
  },
  {
    question: "¿Quién dijo 'Te amo' primero?",
    options: ["Tú", "Yo", "Fue mutuo", "No me acuerdo"],
    answer: "Tú"
  },
];

// 2. Cartas para Memoria
const MEMORY_EMOJIS = [
  "❤️", "🌹", "💍", "🧸", "💌", "🎁", 
  "😘", "🍦", "😺", "👨‍💻", "📐", "🏠", 
  "💝", "🍆", "🌅", "💨", "✈️", "💄"
];

// 1: JUEGO DE TRIVIA

const TriviaGame = ({ onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const shuffled = [...TRIVIA_DATA].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    setQuestions(selected);
    setLoading(false);
  }, []);

  const handleAnswerOptionClick = (selectedOption) => {
    // Verificar respuesta
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    // Siguiente pregunta o terminar
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (loading) return <div>Cargando preguntas...</div>;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto text-white p-6 bg-black/50 rounded-xl border border-rojo shadow-lg backdrop-blur-sm">
      {showScore ? (
        <div className="text-center space-y-6 animate-fadeIn">
          <h2 className="text-4xl font-serif text-rojo">¡Juego Terminado!</h2>
          <p className="text-2xl">Acertaste {score} de {questions.length}</p>
          <div className="text-6xl my-4">{score === questions.length ? "🏆" : "💕"}</div>
          <button onClick={onBack} className="bg-rojo text-white py-3 px-8 rounded-full font-bold hover:bg-red-700 transition transform hover:scale-105">
            Volver al Menú
          </button>
        </div>
      ) : (
        <div className="w-full animate-slideIn">
          <div className="mb-8 border-b border-gray-700 pb-4">
            <div className="text-rojo font-bold mb-2 uppercase tracking-widest text-xs">Pregunta {currentQuestion + 1}/{questions.length}</div>
            <h2 className="text-2xl md:text-3xl font-serif leading-tight">{questions[currentQuestion].question}</h2>
          </div>
          <div className="grid gap-4">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerOptionClick(option)}
                className="w-full text-left p-4 bg-gray-800/50 border border-gray-600 rounded-lg hover:bg-rojo hover:border-rojo transition duration-200 text-lg active:scale-95"
              >
                {option}
              </button>
            ))}
          </div>
          <button onClick={onBack} className="mt-8 text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
            <span>←</span> Salir del juego
          </button>
        </div>
      )}
    </div>
  );
};

// 2: JUEGO DE MEMORIA

const MemoryGame = ({ onBack }) => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [difficulty, setDifficulty] = useState(null); 

  // Configuración de Dificultades
  const difficulties = {
    facil: { pairs: 6, cols: 'grid-cols-3 sm:grid-cols-4', label: 'Fácil (4x3)' }, // 12 cartas
    medio: { pairs: 10, cols: 'grid-cols-4 sm:grid-cols-5', label: 'Medio (4x5)' }, // 20 cartas
    dificil: { pairs: 18, cols: 'grid-cols-6', label: 'Difícil (6x6)' } // 36 cartas
  };

  // Iniciar juego con dificultad seleccionada
  const startGame = (level) => {
    setDifficulty(level);
    shuffleCards(level);
  };

  const shuffleCards = (level = difficulty) => {
    const numPairs = difficulties[level].pairs;
    const selectedEmojis = MEMORY_EMOJIS.slice(0, numPairs);
    
    const shuffledCards = [...selectedEmojis, ...selectedEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji) => ({ src: emoji, id: Math.random(), matched: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setDisabled(false);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  // Pantalla de Selección de Dificultad
  if (!difficulty) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto text-white animate-fadeIn">
        <h2 className="text-4xl font-serif text-rojo mb-8">Elige la Dificultad</h2>
        <div className="grid gap-4 w-full max-w-md">
          <button onClick={() => startGame('facil')} className="p-4 bg-green-700 rounded-xl hover:bg-green-600 text-xl font-bold transition transform hover:scale-105">
            Facilito (4x3)
          </button>
          <button onClick={() => startGame('medio')} className="p-4 bg-yellow-600 rounded-xl hover:bg-yellow-500 text-xl font-bold transition transform hover:scale-105">
            Normal (4x5)
          </button>
          <button onClick={() => startGame('dificil')} className="p-4 bg-red-700 rounded-xl hover:bg-red-600 text-xl font-bold transition transform hover:scale-105">
            WOW (6x6)
          </button>
        </div>
        <button onClick={onBack} className="mt-8 text-gray-400 hover:text-white">Volver al Menú</button>
      </div>
    );
  }

  // Pantalla del Tablero
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto animate-fadeIn">
      <div className="flex justify-between items-center w-full mb-4 px-4">
          <h2 className="text-2xl font-serif text-white">Nivel: {difficulty.toUpperCase()}</h2>
          <button onClick={() => setDifficulty(null)} className="text-sm text-gray-400 hover:text-white">Cambiar Nivel</button>
      </div>
      
      <div className={`grid ${difficulties[difficulty].cols} gap-2 md:gap-3 mb-6 p-4 bg-black/30 rounded-xl border border-gray-800 w-fit mx-auto justify-center`}>
        {cards.map(card => (
          <div 
            key={card.id} 
            className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 cursor-pointer perspective-1000"
            onClick={() => !disabled && !card.matched && card !== choiceOne && handleChoice(card)}
          >
            <div className={`w-full h-full transition-transform duration-500 transform preserve-3d ${card === choiceOne || card === choiceTwo || card.matched ? "rotate-y-180" : ""}`} style={{ transformStyle: "preserve-3d" }}>
               
               {/* Cara Frontal */}
               <div className="absolute inset-0 bg-white flex items-center justify-center text-2xl sm:text-3xl md:text-4xl rounded-lg border-2 border-rojo shadow-lg" 
                    style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>
                  {card.src}
               </div>
               
               {/* Cara Trasera */}
               <div className="absolute inset-0 bg-gradient-to-br from-rojo to-red-900 flex items-center justify-center text-xl rounded-lg border border-white/20 shadow-inner"
                    style={{ backfaceVisibility: "hidden" }}>
                  ❓
               </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-6 text-white">
        <p className="text-xl font-bold">Turnos: <span className="text-rojo">{turns}</span></p>
        <button onClick={() => shuffleCards()} className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition">
          Reiniciar Partida
        </button>
      </div>

      <style>{`
        .rotate-y-180 { transform: rotateY(180deg); }
        .preserve-3d { transform-style: preserve-3d; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
};

// 3: MENU PRINCIPAL

const GameMenu = ({ onSelectGame }) => {
  return (
    <div className="flex flex-col items-center space-y-8 animate-fadeIn w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-7xl font-serif text-rojo mb-4 drop-shadow-lg">Arcade del Amor</h1>
        <p className="text-xl text-gris-claro max-w-lg mx-auto">
          Para que te diviertas un ratito pensando en nosotros. ❤️
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4">
        {/* Botón Trivia */}
        <button 
          onClick={() => onSelectGame('trivia')}
          className="group relative h-64 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-rojo transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-rojo/20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-rojo/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
            <span className="text-6xl mb-6 transform group-hover:scale-110 transition duration-300">🧠</span>
            <h3 className="text-3xl font-bold text-white mb-2">Trivia</h3>
            <p className="text-gray-400 group-hover:text-white transition-colors">Preguntas rápidas al azar</p>
          </div>
        </button>

        {/* Botón Memoria */}
        <button 
          onClick={() => onSelectGame('memory')}
          className="group relative h-64 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-rojo transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-rojo/20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-rojo/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
            <span className="text-6xl mb-6 transform group-hover:scale-110 transition duration-300">🃏</span>
            <h3 className="text-3xl font-bold text-white mb-2">Memoria</h3>
            <p className="text-gray-400 group-hover:text-white transition-colors">3 Niveles de Dificultad</p>
          </div>
        </button>
      </div>
    </div>
  );
};

// HUB
const GamesHub = () => {
  const [currentView, setCurrentView] = useState('menu'); 

  const renderContent = () => {
    switch (currentView) {
      case 'menu':
        return <GameMenu onSelectGame={setCurrentView} />;
      case 'trivia':
        return <TriviaGame onBack={() => setCurrentView('menu')} />;
      case 'memory':
        return <MemoryGame onBack={() => setCurrentView('menu')} />;
      default:
        return <GameMenu onSelectGame={setCurrentView} />;
    }
  };

  return (
    <div className="w-full min-h-[600px] flex items-center justify-center">
      {renderContent()}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<GamesHub />);