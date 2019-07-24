import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
    constructor(props) {
        super(props);
        
        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug
        });
        
        this.state = {
            album: album,
            currentSong: album.songs,
            currentTime: 0,
            duration: album.songs[0].duration,
            volume: 0,
            isPlaying: false,
            hovered: ''
        };

        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    };

    componentDidMount() {
        this.eventListeners = {
            timeupdate: e => {
                this.setState({ currentTime: this.audioElement.currentTime });
            },
            durationchange: e => {
                this.setState({ duration: this.audioElement.duration });
            },
            volumeupdate: e => {
                this.setState({ volume: this.audioElement.volume });
            }
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.addEventListener('volumeupdate', this.eventListeners.volumeupdate);
    }


    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.removeEventListener('volumeupdate', this.eventListeners.volumeupdate);
    }

    play () {
        this.audioElement.play();
        this.setState({ isPlaying: true });
    }

    pause () {
        this.audioElement.pause();
        this.setState({ isPlaying: false });
    }
        
    setSong (song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
    }

    handleSongClick (song) {
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong) {
            this.pause();
        } else {
            if (!isSameSong) { this.setSong(song); }
            this.play();
        } 
    };

    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleNextClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex + 1);
        const newSong = this.state.album.songs[newIndex];
        if (newIndex < this.state.album.songs.length){
            this.setSong(newSong);
            this.play();    
        }
    } 
    
    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({ currentTime: newTime }); 
    }

    handleVolumeChange(e) {
        this.audioElement.volume = e.target.value;
        this.setState({ volume: e.target.value });
    }

    renderPlayButton(index, song) {
        if (this.state.isPlaying && this.state.currentSong === song) {
            return <span className="ion-pause"></span>;
        }

        if (!this.state.isPlaying && this.state.currentSong === song) {
            return <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
        }

        if (this.state.hovered === index) {
            return <span className="ion-play"></span>
        }
        return index + 1;
    }

    handleOnMouseOver(index) {
        this.setState({
            hovered: index,
        })
    }

    handleMouseLeave() {
        this.setState({
            hovered: ''
        })
    }

    formatTime(duration, song) {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration - minutes * 60);
        return (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds);
    }
    

    render() {
        
        return (
            <section className="album">
                <section id="album-info">
                    <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
                    <div className="album-details">
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
                        {
                            this.state.album.songs.map( (song, index) => {
                                return (
                                    <tr className="song" key={index}>
                                        <td
                                            onMouseOver={() => this.handleOnMouseOver(index)}
                                            onMouseLeave={() => this.handleMouseLeave()}
                                            onClick={() => this.handleSongClick(song)}
                                        >
                                            {this.renderPlayButton(index, song)}
                                        </td>
                                        <td key={song.id}></td>
                                        <td key={song.name}>{song.title}</td>
                                        <td key={song.length}>{song.duration}</td>
                                    </tr>
                                )
                            })
                        }
                    
                    </tbody>
                </table>
                <PlayerBar 
                    isPlaying={this.state.isPlaying}
                    currentSong={this.state.currentSong}
                    currentTime={this.audioElement.currentTime}
                    duration={this.audioElement.duration}
                    volume={this.audioElement.volume}
                    handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                    handlePrevClick={() => this.handlePrevClick()}
                    handleNextClick={() => this.handleNextClick()}
                    handleTimeChange={(e) => this.handleTimeChange(e)}
                    handleVolumeChange={(e) => this.handleVolumeChange(e)}
                    formatTime={(duration, song) => this.formatTime(duration, song)}
                />
            </section>
        );
    }
};

export default Album;