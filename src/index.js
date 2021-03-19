import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import "semantic-ui-css/semantic.min.css";
import Spinner from "./Spinner";

class App extends React.Component {
  //IMP - state is always an object with K-V
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        //STATE UPDATE uses this.setState(JS obj with KV)
        this.setState({ lat: position.coords.latitude });
      },
      (err) => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  renderContent() {
    //state reference always done as this.state.property
    if (this.state.lat && !this.state.errorMessage) {
      return (
        <div>
          <SeasonDisplay lat={this.state.lat} />
        </div>
      );
    }
    if (!this.state.lat && this.state.errorMessage) {
      return <div>Error Message: {this.state.errorMessage} </div>;
    }
    return (
      <div>
        <Spinner message="please accept location request" />
      </div>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
