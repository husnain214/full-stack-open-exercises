import { useState } from 'react'

const Heading = ({text}) => <h1>{text}</h1>

const Buttons = ({goodInc, neutralInc, badInc}) => {
  return (
    <div>
      <button onClick = {goodInc}>good</button>
      <button onClick = {neutralInc}>neutral</button>
      <button onClick = {badInc}>bad</button>
    </div>
  )
}

const StatisticLine = ({text, value, percent}) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
      <td>{percent}</td>
    </>
  )
}

const StatisticsTable = ({good, neutral, bad}) => {
  const all = good + bad + neutral
  const average = (good * 1 + bad * -1) / all
  const positive = (good / all) * 100

  if (all === 0) return "No feedback given"
  
  return (
    <table>
      <tbody>
        <tr><StatisticLine text = "good" value = {good} percent = "" /></tr>
        <tr><StatisticLine text = "neutral" value = {neutral} percent = "" /></tr>
        <tr><StatisticLine text = "bad" value = {bad} percent = "" /></tr>
        <tr><StatisticLine text = "all" value = {all} percent = "" /></tr>
        <tr><StatisticLine text = "average" value = {average} percent = "" /></tr>
        <tr><StatisticLine text = "positive" value = {positive} percent = "%" /></tr>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodInc = () => setGood(good + 1)
  const neutralInc = () => setNeutral(neutral + 1)
  const badInc = () => setBad(bad + 1)

  return (
    <div>
      <Heading text="give feedback" />
      <Buttons goodInc = {goodInc} neutralInc = {neutralInc} badInc = {badInc} />
      <Heading text="statistics" />
      <StatisticsTable good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App;
