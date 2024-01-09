import { Avatar, Badge, Progress, Space, Switch } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

export const Example1 = () => {
  return (
    <>
    <Progress percent={30} />
    <Progress percent={50} status="active" />
    <Progress percent={70} status="exception" />
    <Progress percent={100} />
    <Progress percent={50} showInfo={false} />
  </>
  )
}


export const Example2 = () => {
  return (
    <Space wrap>
    <Progress type="circle" percent={30} size={80} />
    <Progress type="circle" percent={70} size={80} status="exception" />
    <Progress type="circle" percent={100} size={80} />
  </Space>
  )
}


export const Example3 = () => {
  return (
    <Space size="middle">
    <Badge count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={0} showZero>
      <Avatar shape="square" size="large" />
    </Badge>
    {/* <Badge count={<ClockCircleOutlined style={{ color: '#f5222d' }} />}>
      <Avatar shape="square" size="large" />
    </Badge> */}
  </Space>
  )
}


export const Example5 = () => {
  const [show, setShow] = useState(true);
  return (
    <Space>
      <Switch checked={show} onChange={() => setShow(!show)} />
      {/* <Badge count={show ? 11 : 0} showZero color='#faad14' /> */}
      {/* <Badge count={show ? 25 : 0} /> */}
      <Badge count={show ? <ClockCircleOutlined style={{ color: '#f5222d' }} /> : 0} />
      <Badge
        className="site-badge-count-109"
        count={show ? 109 : 0}
        style={{ backgroundColor: '#52c41a' }}
      />
    </Space>
  )
}



