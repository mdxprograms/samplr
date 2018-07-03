import React from "react";
import { Button, Icon } from "antd";

const PlayerActions = ({ play, pause, stop, loop, addToList, uploadRef }) => (
  <React.Fragment>
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
      <Button onClick={() => uploadRef.click()}>
        <Icon type="folder-add" />
      </Button>
    </Button.Group>
    <input
      type="file"
      onChange={addToList}
      ref={ref => (uploadRef = ref)}
      style={{ display: "none" }}
      multiple
    />
  </React.Fragment>
);

export default PlayerActions;
