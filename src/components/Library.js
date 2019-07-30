import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import './Library.css';


class Library extends Component {
    constructor(props) {
        super(props);
        this.state = { albums: albumData };
    }

    render() {
      return (
        <section className='library'>
            {
                this.state.albums.map( (album, index) =>
                <Link to={`/album/${album.slug}`} key={index}>
                    <img className="albumCovers " src={album.albumCover} alt={album.title} />
                    <div className="albumTitle">{album.title}</div>
                    <div className="albumArtist">{album.artist}</div>
                    <div className="albumSongCount">{album.songs.length}</div>
                </Link>
              )
            }
        </section>
     );
  }
}

export default Library; 