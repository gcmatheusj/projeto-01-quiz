import { ButtonHTMLAttributes, MouseEvent } from 'react'

import { Question } from '../Quiz'

import S from './styles.module.css'

interface QuestionAnswerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  answer: string
  question: Question,
  handleAnswerQuestion: (event: MouseEvent<HTMLButtonElement>, question: Question, answer: string) => void
}

export function QuestionAnswer (props: QuestionAnswerProps) {
  return (
    <button 
      className={S.container}
      onClick={(event) => props.handleAnswerQuestion(event, props.question, props.answer)}
      disabled={props.disabled}
    >
      {props.answer}
    </button>
  )
}