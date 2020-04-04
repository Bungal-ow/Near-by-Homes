/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unused-state */
import React from 'react';
import axios from 'axios';
import Scores from './Scores.jsx';
import Stats from './Stats.jsx';
import SeeMore from './SeeMore.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      house: {},
      houses: [],
      neighborhood: {},
    };
    this.getHouseData = this.getHouseData.bind(this);
    this.getNeighborhoodData = this.getNeighborhoodData.bind(this);
  }

  componentDidMount() {
    const splitUrl = window.location.href.split('/');
    const index = splitUrl[3];
    this.getHouseData(index);
  }

  getNeighborhoodData(neighborhood) {
    axios.get('/api/neighborhoods', {
      params: {
        name: neighborhood,
      },
    })
      .then((response) => {
        const { house } = this.state;
        this.setState({
          house: { ...house },
          houses: response.data,
          neighborhood: response.data[0],
        });
        // console.log(response.data[0]);
      })
      .catch((err) => {
        throw err;
      });
  }

  getHouseData(index) {
    axios.get('/api/houses')
      .then((response) => {
        console.log(response)
        const { house, neighborhood } = this.state;
        if (!Object.keys(house).length) {
          this.setState({
            house: response.data[index],
            houses: response.data,
            neighborhood: { ...neighborhood },
          });
          // console.log(this.state.houses);
        } else {
          this.setState({
            house: { ...house },
            houses: { ...response.data },
            neighborhood: { ...neighborhood },
          });
        }
        this.getNeighborhoodData(this.state.house.neighborhood);
      })
      .catch((err) => {
        throw err;
      });
  }

  currentHouse(setHouse) {
    const { houses } = this.state;
    this.setState({ house: setHouse, houses: [...houses] });
  }

  render() {
    const { house, neighborhood } = this.state;
    const currentHouse = !Object.keys(house).length ? null : house;
    let scores = <div />;
    let stats = <div />;
    let seeMore = <div />;
    if (Object.keys(neighborhood).length) {
      scores = <Scores neighborhood={neighborhood} />;
      stats = <Stats neighborhood={neighborhood} house={house} />;
      seeMore = <SeeMore neighborhood={neighborhood} />;
    }
    return (
      <div id="appContainer">
        <h2 id="neighborhoodHeader">
          Neighborhood: {currentHouse ? currentHouse.neighborhood : ''}
        </h2>
        {scores}
        {stats}
        {seeMore}
      </div>
    );
  }
}

export default App;
