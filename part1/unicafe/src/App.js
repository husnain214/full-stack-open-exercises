import { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1>
const Button = (props) => <button onClick = {props.eventFunction}>{props.text}</button>
const Paragraph = (props) => <p>{props.text} {props.count}</p> 

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)

  const goodInc = () => {
    setGood(good + 1)
    setTotal(total + 1)
    console.log((good / total) * 100)
  }

  const neutralInc = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
    console.log((good / total) * 100)
  }
  
  const badInc = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    console.log((good / total) * 100)
  }

  return (
    <div>
      <Header text = "give feedback"/>

      <div>
          <Button text = "good" eventFunction = {goodInc} />
          <Button text = "neutral" eventFunction = {neutralInc} />
          <Button text = "bad" eventFunction = {badInc} />
      </div>

      <Header text = "statistics"/>

      <Paragraph text = "good" count = {good} />
      <Paragraph text = "neutral" count = {neutral} />
      <Paragraph text = "bad" count = {bad} />
      <Paragraph text = "all" count = {total} />
      <Paragraph text = "average" count = {average} />
    </div>
  )
}

export default App;
