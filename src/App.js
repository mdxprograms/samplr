import React, { Component } from "react";
import ReactHowler from "react-howler";
import { Layout, Row, Col } from "antd";

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
      loop: false,
      firstLoad: true
    };

    this.player = React.createRef();
    this.uploadRef = React.createRef();
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

  handleAddFile = e => {
    let files = this.state.playList;
    let index = this.state.playList.length;

    for (let item of e.target.files) {
      item.uid = index + 1;
      files.push(item);
      index++;
    }

    if (this.state.firstLoad && files.length > 0) {
      this.changeSong(files[0]);
      this.setState({ firstLoad: false, playList: files });
    } else if (files.length > 0) {
      this.setState({ playList: files });
    }
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
          <Row type="flex" justify="center">
            <Col>
              <PlayerActions
                play={this.handlePlay}
                pause={this.handlePause}
                stop={this.handleStop}
                loop={this.toggleLoop}
                addToList={this.handleAddFile}
                uploadRef={this.uploadRef}
              />
            </Col>
          </Row>
        </Layout.Header>

        <Layout.Content>
          <PlayerPlaylist
            currentSong={this.state.currentSong}
            changeSong={this.changeSong}
            remove={this.handleRemoveFile}
            playlist={this.state.playList}
          />
        </Layout.Content>

        {this.state.playList.length > 0 && (
          <ReactHowler
            src={this.state.currentSong.name}
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
