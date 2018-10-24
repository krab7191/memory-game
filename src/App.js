import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import "./app.css";
import guitarists from "./guitarists.json";
import Row from "./components/row/Row";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: guitarists,
      score: 0,
      topScore: 0,
      clicked: Array(12).fill(false)
    };
  }

  // Fisher-Yates shuffle on cards, update state
  shuffle = () => {
    let c = this.state.cards;
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    this.setState({
      cards: [...c]
    })
  }
  // Check the clicked array for an id
  findId = id => {
    let yep = this.state.clicked.find(elem => {
      return elem === id && true;
    });
    console.log(`yep: ${yep}`);
    return yep;
  }
  // Return the index of where the first null is found
  returnFirstNull = () => {
    let i = this.state.clicked.indexOf(false);
    console.log(`Index: ${i}`);
    return i;
  }
  // Insert id into clicked array
  insertId = (id, index) => {
    console.log(`Insert ${id} at index: ${index}`);
    let a = this.state.clicked.map((elem, i) => {
      return i === index ? id : elem;
    });
    console.log(a);
    this.setState({
      clicked: this.state.clicked.filter((elem, i) =>
        i === index && id
      )
    });
  }
  // Clear clicked array
  emptyClicked = () => {
    this.setState({
      clicked: Array(12).fill(null)
    });
  }
  // Reset the score
  resetScoreZero = () => {
    this.setState({
      score: 0
    });
  }
  // If the score is 12, you win!
  checkWin = () => {
    if (this.state.score === 12) {
      return true;
    }
    return false;
  }
  // Increment both the scores (setState is async...)
  incrementBothScores = () => {
    this.setState({
      score: this.state.score + 1,
      topScore: this.state.topScore + 1
    });
  }
  // increment just the score
  incrementScore = () => {
    this.setState({
      score: this.state.score + 1
    });
  }
  // Main game logic here
  handleClick = event => {
    console.log(this.state);
    const id = event.target.id;
    if (this.findId(id)) {
      // It has already been clicked!
      alert("You lose");
      // Reset the counters...
      this.emptyClicked();
      this.resetScoreZero();
    }
    else {
      // Not already clicked...
      // Put the id in the clicked array
      this.insertId(id, this.returnFirstNull());
      // Is the top score bigger than the score?
      if (this.state.topScore > this.state.score) {
        // Update only the score
        this.incrementScore();
      }
      else {
        this.incrementBothScores();
      }
      // Check for win
      if (this.checkWin()) {
        // You win! Reset stuff
        alert("You win!");
        this.emptyClicked();
        this.resetScoreZero();
      }
      this.shuffle();
      // Shuffle the array
    }

  }

  render() {

    return (
      <>
        <AppBar position="fixed" color="secondary">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Typography variant="h4" color="primary" className="navbar-brand">
                  Heavy-Metal Memory Game {this.state.clicked}
                </Typography>
              </div>

              <ul className="nav navbar-nav">
                <li>
                  Score: {this.state.score}
                </li>
                <li>
                  Best: {this.state.topScore}
                </li>
              </ul>
            </div>
          </nav>
        </AppBar>
        <div id="main-content" className="container">
          <div className="row">
            {
              this.state.cards.map((card, i) => (
                i < 4 && <Row {...card} handleClick={this.handleClick} key={i} />
              ))
            }
          </div>
          <div className="row">
            {
              this.state.cards.map((card, i) => (
                i > 3 && i < 8 && <Row {...card} handleClick={this.handleClick} key={i} />
              ))
            }
          </div>
          <div className="row">
            {
              this.state.cards.map((card, i) => (
                i > 7 && <Row {...card} handleClick={this.handleClick} key={i} />
              ))
            }
          </div>
        </div>
      </>
    );
  }

}

export default App;
