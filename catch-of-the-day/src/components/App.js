import React from 'react'
import Header from './Header'
import Order from './Order'
import Fish from './Fish'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import base from '..//base'

class App extends React.Component {
	state = {
		fishes: {},
		order: {}
	}

	componentDidMount() {
		const { params } = this.props.match
		const localStorageRef = localStorage.getItem(params.storeId)
		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) })
		}
		this.ref = base.syncState(`${params.storeId}/fishes`, {
			context: this,
			state: "fishes"
		})
	}

	componentWillUnmount() {
		base.removeBinding(this.ref)
	}

	componentDidUpdate() {
		localStorage.setItem(
			this.props.match.params.storeId,
			JSON.stringify(this.state.order)
		)
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

	updateFish = (key, updatedFish) => {
		const fishes = { ...this.state.fishes }
		fishes[key] = updatedFish
		this.setState({ fishes })
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
				<Order fishes={this.state.fishes} order={this.state.order} />
				<Inventory
					addFish={this.addFish}
					updateFish={this.updateFish}
					loadSampleFishes={this.loadSampleFishes}
					fishes={this.state.fishes}
				/>
			</div>
		)
	}
}

export default App
