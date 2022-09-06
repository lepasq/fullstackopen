import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0]);

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <VoteButton votes={votes} setVotes={setVotes} selected={selected} />
      <NextButton anecdotes={anecdotes} setSelected={setSelected} />
      <AnecdoteHighScore anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

const NextButton = ({ anecdotes, setSelected }) => {
  const getAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  return <Button text="next anecdote" onClick={getAnecdote} />;
};

const VoteButton = ({ votes, setVotes, selected }) => {
  const vote = () => {
    const voteCopy = [...votes];
    voteCopy[selected] += 1;
    setVotes(voteCopy);
  };

  return <Button text="vote" onClick={vote} />;
};

const Button = ({ text, onClick }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

const AnecdoteHighScore = ({ anecdotes, votes }) => {
  const findMax = () => {
    let idx = 0;
    let vote = 0;

    votes.forEach((element, i) => {
      if (vote < element) {
        vote = element;
        idx = i;
      }
    });
    return {vote, idx};
  };

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[findMax().idx]}</p>
      <p>has {findMax().vote}</p>
    </>
  );
};

export default App;
