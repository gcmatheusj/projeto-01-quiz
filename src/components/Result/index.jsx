import S from './styles.module.css'

import { Button } from "../Button"

export function Result (props) {
  return (
    <div className={S.container}>
      <h1 className={S.title}>Resultado do Quiz</h1>

      <h2 className={S.subtitle}>
        Você acertou {props.correctAnswersCount} de {props.quizSize} perguntas!
      </h2>

      <Button onClick={props.handleTryAgain}>Tente Novamente</Button>
    </div>
  )
}