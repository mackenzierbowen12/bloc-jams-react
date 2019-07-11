import React, { Component } from 'react';
import albumData from './../data/albums';


class Album extends Component {
    constructor(props) {
        super(props);

        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug
        });
    
        this.state = {
            album: album
        };

        const songList = album.songs.map((song, index) => {
            console.log(song.title);
            console.log(index + 1 );
            return <tr>placeholder</tr>
            
        });
            
             
    };

    
    render() {
        return (
            <section className="album">
                <section id="album-info">
                    <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
                    <div className="albusm-details">
                        <h1 id="album-title">{this.state.album.title}</h1>
                        <h2 className="artist">{this.state.album.artist}</h2>
                        <div id="release-info">{this.state.album.releaseInfo}</div>
                    </div>                    
                </section>
                <table id="song-list">
                    <colgroup>
                        <col id="song-number-column"/>
                        <col id="song-title-column"/>
                        <col id="song-duration-column" />
                    </colgroup>
                    <tbody>
                        {this.state.album.songs.map((song, index) =>
                            <React.Fragment>
                            <tr>{song.index + 1}</tr>    
                            <tr>{song.title}</tr>
                            <tr>{song.duration}</tr>
                            </React.Fragment>
                        )}
                        
                    </tbody>
                </table>
            </section>
        );
    }
}

export default Album;
