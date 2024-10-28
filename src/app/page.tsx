"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/ui/CardComponents';
import { Button } from './components/ui/Button';
import { RadioGroup, RadioGroupItem } from './components/ui/RadioPage';
import { VolumeX, Volume2, ChevronRight, Trophy, Medal } from 'lucide-react';

export default function NSMQQuiz() {
  const questions = {
    easy: [
      {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Cu"],
        correctAnswer: "Au",
        explanation: "Au is the chemical symbol for gold, derived from its Latin name 'aurum'."
      },
      {
        question: "What is the value of π (pi) to two decimal places?",
        options: ["3.14", "3.16", "3.12", "3.18"],
        correctAnswer: "3.14",
        explanation: "Pi (π) is approximately equal to 3.14159, so to two decimal places it's 3.14."
      },
      {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Mars", "Saturn"],
        correctAnswer: "Jupiter",
        explanation: "Jupiter is the largest planet in our solar system."
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Earth", "Mars", "Jupiter"],
        correctAnswer: "Mars",
        explanation: "Mars is often called the Red Planet due to its reddish appearance."
      },
      {
        question: "What is the freezing point of water?",
        options: ["0°C", "32°F", "100°C", "212°F"],
        correctAnswer: "0°C",
        explanation: "Water freezes at 0 degrees Celsius (32 degrees Fahrenheit)."
      }
    ],
    medium: [
      {
        question: "Which of the following is not a type of chemical bond?",
        options: ["Ionic", "Covalent", "Metallic", "Magnetic"],
        correctAnswer: "Magnetic",
        explanation: "Ionic, covalent, and metallic are types of chemical bonds. Magnetic is not a type of chemical bond."
      },
      {
        question: "What is the square root of 144?",
        options: ["10", "12", "14", "16"],
        correctAnswer: "12",
        explanation: "The square root of 144 is 12, because 12 × 12 = 144."
      },
      {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correctAnswer: "Paris",
        explanation: "Paris is the capital city of France."
      },
      {
        question: "What is the chemical formula for water?",
        options: ["H2O", "CO2", "O2", "NaCl"],
        correctAnswer: "H2O",
        explanation: "Water is chemically represented as H2O, meaning it has two hydrogen atoms and one oxygen atom."
      },
      {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
        correctAnswer: "Mitochondria",
        explanation: "Mitochondria are known as the powerhouse of the cell as they produce energy."
      }
    ],
    hard: [
      {
        question: "What is the half-life of Carbon-14?",
        options: ["2,730 years", "5,730 years", "7,730 years", "9,730 years"],
        correctAnswer: "5,730 years",
        explanation: "The half-life of Carbon-14 is approximately 5,730 years."
      },
      {
        question: "Which of the following is not a fundamental force of nature?",
        options: ["Gravity", "Electromagnetic", "Strong Nuclear", "Centrifugal"],
        correctAnswer: "Centrifugal",
        explanation: "The four fundamental forces are gravity, electromagnetic, strong nuclear, and weak nuclear. Centrifugal force is a fictitious force in a rotating frame of reference."
      },
      {
        question: "What is the main gas found in the air we breathe?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correctAnswer: "Nitrogen",
        explanation: "Nitrogen makes up about 78% of the Earth's atmosphere."
      },
      {
        question: "What is the most abundant element in the universe?",
        options: ["Oxygen", "Hydrogen", "Carbon", "Helium"],
        correctAnswer: "Hydrogen",
        explanation: "Hydrogen is the most abundant element in the universe."
      },
      {
        question: "Which scientist developed the theory of general relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
        correctAnswer: "Albert Einstein",
        explanation: "Albert Einstein developed the theory of general relativity, which describes gravitation as a curvature of spacetime."
      }
    ]
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Added mute state

  const handleNext = () => {
    if (showAnswer) {
      if (selectedAnswer === questions.easy[currentQuestion].correctAnswer) {
        setScore((prev) => prev + 1);
      }
      if (currentQuestion < questions.easy.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer('');
        setShowAnswer(false);
      } else {
        setQuizEnded(true);
      }
    } else {
      setShowAnswer(true);
    }
  };
  

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowAnswer(false);
    setScore(0);
    setQuizEnded(false);
  };


const backgroundMusic = new Audio('/audio/song.mp3');

useEffect(() => {
  if (!isMuted) {
    backgroundMusic.loop = true; 
    backgroundMusic.play().catch(error => {
      console.error("Error playing background music:", error);
    });
  }


  return () => {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0; // Reset to start
  };
}, [isMuted, backgroundMusic]); 

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col items-center justify-center p-6 relative">
      <header className="w-full max-w-3xl mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/images/nsmq.jpg"
            alt="NSMQ Logo"
            width={60}
            height={60}
            className="mr-4 rounded-full shadow-md"
          />
          <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">NSMQ Ghana Quiz</h1>
        </div>
        <Button 
          variant="outline" 
          onClick={toggleMute} 
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="bg-white hover:bg-blue-50"
        >
          {isMuted ? <VolumeX className="h-6 w-6 text-blue-600" /> : <Volume2 className="h-6 w-6 text-blue-600" />}
        </Button>
      </header>

      <Card className="w-full max-w-3xl shadow-xl rounded-xl overflow-hidden bg-white border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-t-xl p-6">
          <CardTitle className="text-3xl font-bold text-center">
            {quizEnded ? "Quiz Completed!" : `Round ${currentQuestion + 1} of ${questions.easy.length}`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {!quizEnded ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-semibold text-blue-800 mb-6">{questions.easy[currentQuestion].question}</h2>
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-4">
  {questions.easy[currentQuestion].options.map((option, index) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <button
        className={`w-full flex items-center space-x-3 p-4 rounded-lg transition-all ${
          showAnswer
            ? option === questions.easy[currentQuestion].correctAnswer
              ? 'bg-green-100 border-2 border-green-500 text-green-700'
              : selectedAnswer === option
              ? 'bg-red-100 border-2 border-red-500 text-red-700'
              : 'bg-gray-100 text-gray-700'
            : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
        }`}
        onClick={() => setSelectedAnswer(option)}
      >
         <RadioGroupItem 
      key={index} 
      value={option} 
      id={`option-${index}`} 
      checked={selectedAnswer === option} // Pass checked state
      onChange={setSelectedAnswer} // Pass the onChange handler
      className={`${showAnswer && option === questions.easy[currentQuestion].correctAnswer ? 'bg-green-100' : ''}`} // Example conditional class
    />
  )){'}'}

        <div className={`flex-shrink-0 w-6 h-6 border-2 rounded-full ${showAnswer && option === questions.easy[currentQuestion].correctAnswer ? 'border-green-500 bg-green-500' : showAnswer && selectedAnswer === option ? 'border-red-500 bg-red-500' : 'border-blue-400'}`}></div>
        <span className="flex-grow text-left">{option}</span>
      </button>
    </motion.div>
  ))}
</RadioGroup>
                {showAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <p className="text-blue-800 font-medium">{questions.easy[currentQuestion].explanation}</p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <Trophy className="w-24 h-24 text-yellow-500 mx-auto" />
              <h2 className="text-4xl font-bold text-blue-800">Congratulations!</h2>
              <p className="text-2xl text-blue-600">
                Your final score: <strong>{score} out of {questions.easy.length}</strong>
              </p>
              <p className="text-xl text-blue-600">
                Accuracy: <strong>{((score / questions.easy.length) * 100).toFixed(2)}%</strong>
              </p>
              <div className="flex justify-center space-x-4">
                <Medal className="w-12 h-12 text-yellow-500" />
                <Medal className="w-12 h-12 text-gray-400" />
                <Medal className="w-12 h-12 text-orange-500" />
              </div>
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center bg-gray-50 rounded-b-xl p-6">
          {!quizEnded ? (
            <Button
              onClick={handleNext}
              disabled={!selectedAnswer && !showAnswer}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              {currentQuestion === questions.easy.length - 1 ? "Finish Quiz" : "Next Question"}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={restartQuiz} 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg transition-colors duration-300"
            >
              Restart Quiz
            </Button>
          )}
        </CardFooter>
      </Card>

      <footer className="mt-8 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} NSMQ Ghana. All rights reserved. Developed by Aristocrat Jnr
      </footer>

 
    </div>
  );
}