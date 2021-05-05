import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import image from './images/image.png';

document.addEventListener('DOMContentLoaded', () => {
	(document.querySelectorAll('.notification .delete') || []).forEach(
		($delete) => {
			const $notification = $delete.parentNode;

			$delete.addEventListener('click', () => {
				$notification.parentNode.removeChild($notification);
			});
		}
	);
});

class App extends React.Component {
	state = {
		data: {},
		country: '',
	};

	async componentDidMount() {
		const fetchedData = await fetchData();

		this.setState({ data: fetchedData });
	}

	handleCountryChange = async (country) => {
		const fetchedData = await fetchData(country);

		this.setState({ data: fetchedData, country: country });
	};

	render() {
		const { data, country } = this.state;
		return (
			<>
				<div class="notification is-danger ml-5 has-text-centered">
					<button class="delete"></button>
					The API being used to fetch data for each country seems to be a little
					broken at the moment. Some countries will show 0 for values which
					shouldn't be 0. Please be aware of this!
				</div>
				<div className={styles.container}>
					<img className={styles.image} alt="CovidImage" src={image} />
					<Cards data={data} />
					<CountryPicker handleCountryChange={this.handleCountryChange} />
					<Chart data={data} country={country} />
				</div>
			</>
		);
	}
}

export default App;
