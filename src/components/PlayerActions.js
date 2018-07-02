import React from "react";
import { Button, Icon, Upload } from "antd";

const PlayerActions = ({ play, pause, stop, loop, addToList }) => (
  <Button.Group className="player-actions">
    <Button onClick={play} className="player-actions__play">
      <Icon type="play-circle-o" />
    </Button>
    <Button onClick={pause} className="player-actions__pause">
      <Icon type="pause-circle-o" />
    </Button>
    <Button onClick={stop} className="player-actions__stop">
      <Icon type="close-circle-o" />
    </Button>
    <Button onClick={loop} className="player-actions__loop">
      <Icon type="sync" />
    </Button>

    <Upload onChange={addToList} showUploadList={false}>
      <Button>
        <Icon type="folder-add" />
      </Button>
    </Upload>
  </Button.Group>
);

export default PlayerActions;
