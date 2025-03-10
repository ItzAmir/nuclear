import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import * as QueueActions from '../../actions/queue';
import * as PlayerActions from '../../actions/player';
import * as FavoritesActions from '../../actions/favorites';

import AlbumView from '../../components/AlbumView';

const isFavorite = (albumId, favoriteAlbums) => {
  const album = _.find(favoriteAlbums, { id: parseInt(albumId) });
  return !_.isNil(album);
};

class AlbumViewContainer extends React.Component {
  componentDidMount() {
    this.props.favoritesActions.readFavorites();
  }

  render() {
    const {
      actions,
      queueActions,
      playerActions,
      favoritesActions,
      match,
      history,
      albumDetails,
      musicSources,
      favoriteAlbums
    } = this.props;
    
    return (
      <AlbumView
        album={albumDetails[match.params.albumId]}
        artistInfoSearch={actions.artistInfoSearch}
        addToQueue={queueActions.addToQueue}
        musicSources={musicSources}
        selectSong={queueActions.selectSong}
        startPlayback={playerActions.startPlayback}
        clearQueue={queueActions.clearQueue}
        addFavoriteAlbum={favoritesActions.addFavoriteAlbum}
        removeFavoriteAlbum={favoritesActions.removeFavoriteAlbum}
        isFavorite={() => isFavorite(match.params.albumId, favoriteAlbums)}
        history={history}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    albumDetails: state.search.albumDetails,
    musicSources: state.plugin.plugins.musicSources,
    favoriteAlbums: state.favorites.albums
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
    queueActions: bindActionCreators(QueueActions, dispatch),
    playerActions: bindActionCreators(PlayerActions, dispatch),
    favoritesActions: bindActionCreators(FavoritesActions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AlbumViewContainer)
);
