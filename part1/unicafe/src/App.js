import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  console.log({ good }, { neutral }, { bad });

  return (
    <div>
      <Title />
      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Title = () => <h1>give feedback</h1>;

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  const total = () => good + neutral + bad;
  const avg = () => good / total() - bad / total();
  const positive = () => (good / total()) * 100;
  const positivePercent = () => parseFloat(positive()).toFixed(2) + "%";

  if (total() === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine text="average" value={avg()} />
          <StatisticLine text="positive" value={positivePercent()} />
        </tbody>
      </table>
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

export default App;
