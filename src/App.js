import React from 'react';
import './App.css';

const potentialAnswers = [
  'Yes.',
  'Maybe.',
  'Not today.',
  'Ask again after coffee.',
  'Absolutely.',
  'The signs point to yes.',
  'Better to wait.',
  'Trust your first instinct.',
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: null,
      history: [],
      error: '',
    };
  }

  getAnswer = () => potentialAnswers[Math.floor(Math.random() * potentialAnswers.length)];

  handleQuestionChange = (event) => {
    this.setState({
      question: event.target.value,
      error: '',
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const question = this.state.question.trim();

    if (!question) {
      this.setState({
        error: 'Ask a question first.',
      });
      return;
    }

    const answer = this.getAnswer();
    const historyItem = {
      id: Date.now(),
      question,
      answer,
    };

    this.setState((prevState) => ({
      answer,
      question: '',
      error: '',
      history: [historyItem, ...prevState.history].slice(0, 5),
    }));
  };

  clearHistory = () => {
    this.setState({
      answer: null,
      history: [],
      error: '',
    });
  };

  render() {
    const { answer, error, history, question } = this.state;

    return (
      <main className="magic-shell">
        <section className="magic-card" aria-labelledby="magic-title">
          <div className="magic-header">
            <p className="eyebrow">Decision helper</p>
            <h1 id="magic-title">Magic 8 Ball</h1>
            <p>Type a question, ask the ball, and keep your latest answers nearby.</p>
          </div>

          <form className="question-form" onSubmit={this.handleSubmit}>
            <label htmlFor="question">Your question</label>
            <div className="question-row">
              <input
                id="question"
                type="text"
                value={question}
                onChange={this.handleQuestionChange}
                placeholder="Should I ship this app today?"
              />
              <button type="submit">Ask</button>
            </div>
            {error && <p className="form-error">{error}</p>}
          </form>

          <div className="ball-stage" aria-live="polite">
            <div className="magic-ball">
              <div className="answer-window">
                <span>{answer || 'Ask me'}</span>
              </div>
            </div>
          </div>

          <aside className="history-panel" aria-label="Question history">
            <div className="history-header">
              <h2>Recent answers</h2>
              <button type="button" onClick={this.clearHistory} disabled={history.length === 0}>
                Clear
              </button>
            </div>

            {history.length === 0 ? (
              <p>No questions yet.</p>
            ) : (
              <ol>
                {history.map((item) => (
                  <li key={item.id}>
                    <span>{item.question}</span>
                    <strong>{item.answer}</strong>
                  </li>
                ))}
              </ol>
            )}
          </aside>
        </section>
      </main>
    );
  }
}

export default App;
