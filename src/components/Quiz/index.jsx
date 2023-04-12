import { useState } from 'react'
import { QuestionAnswer } from '../QuestionAnswer'

import { Button } from '../Button'

import S from './styles.module.css'
import { Result } from '../Result'

const QUESTIONS = [
  {
    id: 1,
    question: 'Qual é o meu nome?',
    answers: ['Miguel', 'Luis', 'Matheus', 'Ana'],
    correctAnswer: 'Matheus',
  },
  {
    id: 2,
    question: 'Qual é a minha idade?',
    answers: ['12', '2', '26', '32'],
    correctAnswer: '26'
  },
  {
    id: 3,
    question: 'O que eu sou?',
    answers: ['Desenvolvedor', 'Médico', 'Eletricista', 'Jogador de Futebol'],
    correctAnswer: 'Desenvolvedor'
  },
  {
    id: 4,
    question: 'Quem é Daniel?',
    answers: ['Homem de ferro', 'Super man', 'Homem aranha', 'Homem formiga'],
    correctAnswer: 'Homem formiga'
  },
]

export function Quiz () {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false)
  const [isTakingQuiz, setIsTakingQuiz] = useState(true)

  const handleAnswerQuestion = (event, question, answer) => {
    if (isCurrentQuestionAnswered) {
      return
    }

    const isCorrectAnswer = question.correctAnswer === answer

    const resultClassName = isCorrectAnswer ? S.correct : S.incorrect
    event.currentTarget.classList.toggle(resultClassName)

    if (isCorrectAnswer) {
      setCorrectAnswersCount(correctAnswersCount + 1)
    }

    setIsCurrentQuestionAnswered(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < QUESTIONS.length) {
      setCurrentQuestionIndex(index => index + 1)
    } else {
      setIsTakingQuiz(false)
    }

    setIsCurrentQuestionAnswered(false)
  }

  const handleTryAgain = () => {
    setIsTakingQuiz(true)
    setCorrectAnswersCount(0)
    setCurrentQuestionIndex(0)
  }

  const quizSize = QUESTIONS.length
  const currentQuestion = QUESTIONS[currentQuestionIndex]
  const navigationButtonText = currentQuestionIndex + 1 === quizSize ? 'Ver Resultado' : 'Próxima Pergunta'

  return (
    <div className={S.container}>
      <div className={S.card}>
        {isTakingQuiz ? (
          <div className={S.quiz}>
            <header className={S.quizHeader}>
              <span className={S.questionCount}>PERGUNTA 1/3</span>
              <p className={S.question}>
                {currentQuestion.question}
              </p>
            </header>

            <ul className={S.answers}>
              {currentQuestion.answers.map(answer => (
                <li key={answer} className={S.answerItem}>
                  <QuestionAnswer 
                    answer={answer} 
                    question={currentQuestion}
                    handleAnswerQuestion={handleAnswerQuestion}
                  />
                </li>
              ))}
            </ul>

            {isCurrentQuestionAnswered && (
              <Button onClick={handleNextQuestion}>
                {navigationButtonText}
              </Button>
            )}
          </div>
        ) : (
          <Result 
            correctAnswersCount={correctAnswersCount} 
            quizSize={quizSize} 
            handleTryAgain={handleTryAgain} 
          />
        )}
      </div>
    </div>
  )
}