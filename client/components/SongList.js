import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import gql from 'graphql-tag';
import query from '../queries/fetchSongs';

const mutation = gql`
	mutation DeleteSong($id: ID) {
		deleteSong(id: $id) {
			id
		}
	}
`;

class SongList extends Component {
	renderSongs() {
		return this.props.data.songs.map(song => (
			<li
				key={song.id}
				className="collection-item"
				style={{ display: 'flex', justifyContent: 'space-between' }}
			>
				<Link to={`/songs/${song.id}`}>{song.title}</Link>
				<i
					className="material-icons"
					onClick={() => this.onSongDelete(song.id)}
					style={{ cursor: 'pointer' }}
				>
					delete
				</i>
			</li>
		));
	}

	onSongDelete(id) {
		this.props.mutate({ variables: { id } }).then(() => this.props.data.refetch());
	}

	render() {
		return this.props.data.loading ? (
			<p>Loading...</p>
		) : (
			<div>
				<ol className="collection">{this.renderSongs()}</ol>
				<Link to="/songs/new" className="btn-floating btn-large red right">
					<i className="material-icons">add</i>
				</Link>
			</div>
		);
	}
}

export default graphql(mutation)(graphql(query)(SongList));
