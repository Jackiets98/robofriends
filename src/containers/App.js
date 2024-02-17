import React, {Component} from "react";
import Cardlist from '../components/Cardlist';
import {robots} from '../robots';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll'
import './App.css';


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield : ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(response=>{
            response.json();
        }).then(users => {
            this.setState({ robots: robots})
        })    
    }

    onSearchChange = (event) => {   
        this.setState({
            searchfield: event.target.value
        })       
    }

    render() {
        const filteredRobots = this.state.robots.filter(robots =>{
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        if (this.state.robots.length === 0) {
            return <h1>Loading..Please Wait</h1>
        }else{
            return (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <Searchbox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <Cardlist robots={filteredRobots}/>
                    </Scroll>        
                </div>     
            );
        }
    }
}

export default App;