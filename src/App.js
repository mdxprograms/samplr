import React, { Component } from "react";
import ReactHowler from "react-howler";
import { Layout } from "antd";

import PlayerActions from "./components/PlayerActions";
import PlayerPlaylist from "./components/PlayerPlaylist";

// styles
import "antd/dist/antd.css";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentSong: { name: "" },
      playList: [],
      playSound: false,
      loop: false
    };

    this.player = React.createRef();
  }

  songDuration = () => {
    return this.player.duration();
  };

  changeSong = song => {
    this.setState({ currentSong: song }, () => {
      this.handleStop();
      this.handlePlay();
    });
  };

  handleAddFile = files => {
    let playList = this.state.playList;

    if (playList.length > 0) {
      playList.concat(files.fileList);
    } else {
      playList = files.fileList;
    }

    this.setState({ playList });
  };

  handlePlay = () => this.setState({ playSound: true });

  handleStop = () => {
    this.setState({ playSound: false });
    this.player.seek(0);
  };

  handleRemoveFile = file => {
    const playList = this.state.playList.filter(song => song.uid !== file.uid);
    this.setState({ playList });
  };

  handlePause = () => this.setState({ playSound: !this.state.playSound });

  toggleLoop = () => this.setState({ loop: !this.state.loop });

  render() {
    return (
      <Layout className="player">
        <Layout.Header>
          <PlayerActions
            play={this.handlePlay}
            pause={this.handlePause}
            stop={this.handleStop}
            loop={this.toggleLoop}
            addToList={this.handleAddFile}
          />
        </Layout.Header>

        <Layout.Content>
          <PlayerPlaylist
            changeSong={this.changeSong}
            remove={this.handleRemoveFile}
            playlist={this.state.playList}
          />
        </Layout.Content>

        {this.state.playList.length > 0 && (
          <ReactHowler
            src={this.state.playList.map(song => song.name)}
            loop={this.state.loop}
            playing={this.state.playSound}
            ref={ref => (this.player = ref)}
          />
        )}
      </Layout>
    );
  }
}

export default App;
