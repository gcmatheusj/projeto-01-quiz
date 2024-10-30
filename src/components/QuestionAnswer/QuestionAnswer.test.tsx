import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { QuestionAnswer } from '.'

test('question asnwer work as expected', async () => {
  const question = {
    id: 1,
    question: 'Qual é o meu nome?',
    answers: ['Miguel', 'Luis', 'Matheus', 'Ana'],
    correctAnswer: 'Matheus',
  }

  const handleAnswerQuestion = jest.fn()

  render(
    <QuestionAnswer 
      question={question}
      answer='Matheus'
      handleAnswerQuestion={handleAnswerQuestion} 
    />
  )

  expect(screen.getByText('Matheus')).toBeInTheDocument()

  fireEvent.click(screen.getByText('Matheus'))

  expect(handleAnswerQuestion).toHaveBeenCalledTimes(1)
  expect(handleAnswerQuestion).toHaveBeenCalledWith(expect.any(Object), question, 'Matheus')
})