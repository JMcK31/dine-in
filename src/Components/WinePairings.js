import React, { Component } from 'react';
import {
  Label,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import axios from 'axios';

 
class WinePairings extends Component {
  constructor(props) {
    super(props);
      this.state = {
        searchValue: '',
          pairedWines: [ 
            'red ', 
            'white ',
            'sparkling'
            ],
          pairingText: (
            [], 
            'These are some great wines to pair with your food'
            ),
            productMatches: [
            {
              title: 'TEST',
              description: 'Suggested wine description',
              price: '$50',
              score: '100',
              imageUrl: 'https://fillmurray.com/g/200/300',
              link: 'https://www.fillmurray.com/'     
            }
          ]
        };
      }


  componentdidMount() {
    this.performSearch();
  }

  searchChange = e => {
    this.setState({searchValue: e.target.value})
  }

  performSearch = (e) => {
    e.preventDefault();
    axios
      .get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/wine/pairing?food=${this.state.searchValue}`, {
      headers: {'X-Mashape-Key': 'ZJyTOCf5oumshDvTwSFk11paKhp9p1Ry2SsjsnigTi3aFLLBlX'},
    })
      .then(response => {
        console.log(response)
        this.setState({ 
          pairedWines: response.data.pairedWines, 
          pairingText: response.data.pairingText,
          productMatches: response.data.productMatches
         });  
        })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
    }
   
    render() {
      const wines = this.state.pairedWines.map(wine =>
        <li>{wine}</li>
      );
      return ( 
          <div className="App">
            <div>
            <Label><h5>Find a Wine to Match your Meal</h5></Label>
            <Form inline className='searchBar'>
              <FormGroup>
                <FormControl 
                  type='search' 
                  value={this.state.searchValue}
                  placeholder='search for a pairing...' 
                  onChange={this.searchChange} />
              </FormGroup>
              <Button type='submit' onClick={this.performSearch}> 
                Search
              </Button>
            </Form>
            
            </div>
              <div className="">
                <ul className="winePairing">
                  {wines}
                </ul>
              </div>             
              <p> 
                {this.state.pairingText}
              </p>

              <ul>
                {this.state.productMatches.map(match => 
                  <div>
                    <a href={match.link}><li>{match.title}</li></a>
                    <li>Average Price: {match.price}</li>
                    <li>Score: {match.score}</li>
                    <li></li>
                  </div>
                  )}
              </ul>
              <ul>
                {this.state.productMatches.map(match =>
                  <div>
                    <li><img src={match.imageUrl} alt={match.title}/></li>
                    <li>{match.description}</li>
                  </div>
                )};
              </ul>
          </div>
      );
    }
  }

export default WinePairings;