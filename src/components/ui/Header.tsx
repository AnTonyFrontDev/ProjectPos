// import React from 'react'

import { Avatar} from "antd"
import { UserOutlined } from '@ant-design/icons';
import { AppIcon } from "./AppIcon";
// import { Fragment } from "react"

const header = () => {
  return (
    <div className="flex justify-end items-center content-center h-full pr-7">
      <div className="flex flex-row">
        <AppIcon type='notifications' className="cursor-pointer mx-4" width={24}></AppIcon>
        <Avatar.Group shape="square">
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        </Avatar.Group>
      </div>
    </div>
  )
}

export default header