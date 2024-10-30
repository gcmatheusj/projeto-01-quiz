import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('Quiz App', () => {
  it('loads the quiz in the first question', async () => {
    render(<App />)
  
    expect(screen.getByRole('heading')).toHaveTextContent('Qual é o meu nome?')
    expect(screen.queryByText('Próxima Pergunta')).not.toBeInTheDocument()
  })
  
  it('can answer any question', async () => {
    render(<App />)
  
    fireEvent.click(screen.getByText('Matheus'))
  
    expect(screen.getByText('Próxima Pergunta')).toBeInTheDocument()
  })
  
  it('show if the answer is correct', async () => {
    render(<App />)
  
    expect(screen.getByRole('heading')).toHaveTextContent('Qual é o meu nome?')
  
    fireEvent.click(screen.getByText('Matheus'))
  
    expect(screen.queryByText('Resposta Correta!')).toBeInTheDocument()
    expect(screen.queryByText('Resposta Incorreta!')).not.toBeInTheDocument()
  })
  
  it('show if the answer is incorrect', async () => {
    render(<App />)
  
    expect(screen.getByRole('heading')).toHaveTextContent('Qual é o meu nome?')
  
    fireEvent.click(screen.getByText('Luis'))
  
    expect(screen.queryByText('Resposta Incorreta!')).toBeInTheDocument()
    expect(screen.queryByText('Resposta Correta!')).not.toBeInTheDocument()
  })
  
  it('cannot asnwer the same question twice', async () => {
    render(<App />)
  
    fireEvent.click(screen.getByText('Luis'))
  
    expect(screen.queryByText('Resposta Incorreta!')).toBeInTheDocument()
  
    expect(screen.getByText('Luis').closest('button')).toHaveAttribute('disabled')
    expect(screen.getByText('Matheus').closest('button')).toHaveAttribute('disabled')
    expect(screen.getByText('Miguel').closest('button')).toHaveAttribute('disabled')
    expect(screen.getByText('Ana').closest('button')).toHaveAttribute('disabled')
  })
  
  it('can go to the next question', async () => {
    render(<App />)
  
    expect(screen.getByRole('heading')).toHaveTextContent('Qual é o meu nome?')
  
    fireEvent.click(screen.getByText('Matheus'))
    fireEvent.click(screen.getByText('Próxima Pergunta'))
  
    expect(screen.getByRole('heading')).toHaveTextContent('Qual é a minha idade?')
  })
  
  it('can show the result of the quiz', async () => {
    render(<App />)
  
    fireEvent.click(screen.getByText('Matheus'))
    fireEvent.click(screen.getByText('Próxima Pergunta'))
  
    fireEvent.click(screen.getByText('26'))
    fireEvent.click(screen.getByText('Próxima Pergunta'))
  
    fireEvent.click(screen.getByText('Desenvolvedor'))
    fireEvent.click(screen.getByText('Ver Resultado'))
  
    expect(screen.getByText(/Você acertou 3 de 3 perguntas!/i)).toBeInTheDocument()
  })
  
  it('can restart the quiz', async () => {
    render(<App />)
  
    fireEvent.click(screen.getByText('Matheus'))
    fireEvent.click(screen.getByText('Próxima Pergunta'))
  
    fireEvent.click(screen.getByText('26'))
    fireEvent.click(screen.getByText('Próxima Pergunta'))
  
    fireEvent.click(screen.getByText('Desenvolvedor'))
    fireEvent.click(screen.getByText('Ver Resultado'))
  
    fireEvent.click(screen.getByText('Tente Novamente'))
  
    expect(screen.getByRole('heading')).toHaveTextContent('Qual é o meu nome?')
  })
})