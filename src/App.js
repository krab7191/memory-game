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
      topScore: 0
    };
  }

  render() {

    return (
      <>
        <AppBar position="fixed" color="secondary">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Typography variant="h4" color="primary" className="navbar-brand">
                  Heavy-Metal Memory Game
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
                i < 4 && <Row {...card} />
              ))
            }
          </div>
          <div className="row">
            {
              this.state.cards.map((card, i) => (
                i > 3 && i < 8 && <Row {...card} />
              ))
            }
          </div>
          <div className="row">
            {
              this.state.cards.map((card, i) => (
                i > 7 && <Row {...card} />
              ))
            }
          </div>
        </div>
      </>
    );
  }

}

export default App;
