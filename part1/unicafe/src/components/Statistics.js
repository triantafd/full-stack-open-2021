
import StatisticLine from './StatisticLine'
import Title from './Title'

const Statistics = (props) => {
  const { name, good, neutral, bad } = props
  const all = good + bad + neutral

  if (all === 0) {
    return (
      <div>
        <Title name={name} />
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <Title name={name} />

      <table>
        <tbody>
          <StatisticLine text={'good'} value={good} />
          <StatisticLine text={'neutral'} value={neutral} />
          <StatisticLine text={'bad'} value={bad} />
          <StatisticLine text={'all'} value={all} />
          <StatisticLine text={'average'} value={(good - bad) / all} />
          <StatisticLine text={'positive'} value={String(good / all * 100) + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

export default Statistics