import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList'
import query from '../queries/fetchSong';

class SongDetail extends Component {
	render() {
		const { loading, song } = this.props.data;
		return (
			<div className="container">
				{loading ? (
					<p>Loading...</p>
				) : (
					<div>
						<Link to="/">Back to List</Link>
						<h3>{song.title}</h3>
                        <LyricList lyrics={song.lyrics} />
						<LyricCreate songId={this.props.params.id} />
					</div>
				)}
			</div>
		);
	}
}

export default graphql(query, { options: props => ({ variables: { id: props.params.id } }) })(
	SongDetail
);
