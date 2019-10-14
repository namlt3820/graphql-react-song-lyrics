import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

const mutation = gql`
	mutation AddSong($title: String) {
		addSong(title: $title) {
			id
			title
		}
	}
`;

class SongCreate extends Component {
	constructor(props) {
		super(props);
		this.state = { title: '' };
	}

	onSubmit(e) {
		e.preventDefault();
		this.props
			.mutate({
				variables: {
					title: this.state.title
				},
				refetchQueries: [{ query }]
			})
			.then(() => hashHistory.push('/'));
	}

	render() {
		return (
			<div className="container">
				<Link to="/">Back</Link>
				<h3>Create new song</h3>
				<form onSubmit={this.onSubmit.bind(this)}>
					<label htmlFor="">Song Title</label>
					<input
						type="text"
						onChange={e => this.setState({ title: e.target.value })}
						value={this.state.title}
					/>
				</form>
			</div>
		);
	}
}

export default graphql(mutation)(SongCreate);
