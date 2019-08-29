import React from 'react'
import Header from './Header'
import Order from './Order'
import Fish from './Fish'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'

class App extends React.Component {
	state = {
		fishes: {},
		order: {}
	}

	addFish = fish => {
		const fishes = { ...this.state.fishes }
		fishes[`fish${Date.now}`] = fish
		this.setState({
			// fishes: fishes
			//if the property and the value are the same thing, ES6 allows to 
			//pass a word
			fishes
		})
	}

	addToOrder = key => {
		const order = { ...this.state.order }
		order[key] = order[key] + 1 || 1
		this.setState({ order })

	}

	loadSampleFishes = () => {
		this.setState({
			fishes: sampleFishes
		})
	}

	render() {
		return (
			<div className='catch-of-the-day'>
				<div className='menu'>
					<Header tagline='Fresh seafood Market' />
					<ul className="fishes">
						{Object.keys(this.state.fishes).map(key => (
							<Fish
								key={key}
								index={key}
								details={this.state.fishes[key]}
								addToOrder={this.addToOrder}
							/>
						))}
					</ul>
				</div>
				<Order />
				<Inventory
					addFish={this.addFish}
					loadSampleFishes={this.loadSampleFishes} />
			</div>
		)
	}
}

export default App
