import React from 'react';
import axios from 'axios';
import FoodList from './Components/FoodList';
import SingleFood from './Components/SingleFood';
import Header from './Components/Header';
const faker = require('faker');

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            foods: [],
            selectedFood: {}
        }
    }

    componentDidMount = async() => {
        const foods = (await axios.get('/api/foods')).data;
        this.setState({foods});
    };

    selectFood = async(foodId) => {
        const selectedFood = (await axios.get(`/api/foods/${foodId}`)).data;
        this.setState({selectedFood});
    };

    goBack = () => {
        this.setState({selectedFood: {}});
    };

    onSubmit = async(e) => {
        e.preventDefault();
        const postData = {
            name: faker.lorem.word(),
            bio: faker.lorem.paragraphs(1),
            videoUrl: 'https://www.youtube.com/embed/_PK95JMWd_Y',
            imgURL: 'https://res.cloudinary.com/culturemap-com/image/upload/ar_4:3,c_fill,g_faces:center,w_980/v1629725417/photos/323255_original.jpg',
            countryId: 1,
        }
        await axios.post('/api/foods', postData)
          .then((resp) => this.setState({foods: [...this.state.foods, resp.data]}))
          .catch((err) => console.log(err))
    };

    deleteFood = async(foodId) => {
        await axios.delete(`api/foods/${foodId}`)
          .then((resp) => this.setState({foods: [...resp.data]}))
          .catch((err) => console.log(err))
    };

    render() {
        return (
            <div id='app'>
                <Header 
                  selectedFood={this.state.selectedFood} 
                  goBack={this.goBack} 
                  onSubmit={this.onSubmit}
                />
                {
                    this.state.selectedFood.id ? 
                    <SingleFood selectedFood={this.state.selectedFood}/> : 
                    <FoodList 
                        foods={this.state.foods} 
                        selectFood={this.selectFood} 
                        deleteFood={this.deleteFood}
                    />
                }
            </div>
        )
    }
}

export default App
 