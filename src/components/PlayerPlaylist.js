import React from "react";
import { Button, Icon, Table } from "antd";

const PlayerPlaylist = ({ currentSong, changeSong, remove, playlist }) => (
  <Table
    columns={[
      {
        title: "Playlist",
        dataIndex: "name",
        key: "name",
        render: (text, record) => (
          <span>
            <a key={record.uid} onClick={() => changeSong(record)}>
              {record.name}{" "}
              {currentSong.uid === record.uid ? "(Now Playing)" : null}
            </a>
            <Button onClick={() => remove(record)}>
              <Icon type="delete" />
            </Button>
          </span>
        )
      }
    ]}
    dataSource={playlist}
  />
);

export default PlayerPlaylist;
