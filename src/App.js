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
      clicked: Array(12).fill(null)
    };
  }

  // Fisher-Yates shuffle
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

  incScore = () => {
    this.setState({
      score: this.state.score + 1
    });
  }

  handleClick = event => {
    const { id } = event.target;
    console.log(id);
    this.incScore();
    const newArr = this.state.clicked.map((elem, i) => {
      return this.gameLogic(elem);
    })
    this.setState({
      clicked: newArr
    });
    this.shuffle();
  }

  gameLogic = item => {
    this.state.clicked.forEach((elem, i) => {
      if (elem === item) {
        // Game over!
      } else if (elem == null) {
        // Empty slot
      } else if (i === this.state.clicked.length -1) {
        // You win!
      }
      return "Shit";
    })
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
                i < 4 && <Row {...card} handleClick={this.handleClick} />
              ))
            }
          </div>
          <div className="row">
            {
              this.state.cards.map((card, i) => (
                i > 3 && i < 8 && <Row {...card} handleClick={this.handleClick} />
              ))
            }
          </div>
          <div className="row">
            {
              this.state.cards.map((card, i) => (
                i > 7 && <Row {...card} handleClick={this.handleClick} />
              ))
            }
          </div>
        </div>
      </>
    );
  }

}

export default App;
