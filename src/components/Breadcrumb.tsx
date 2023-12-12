import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

interface BreadcrumbDataProps {
  routes: Array<{ title: string; path: string }>;
}

const BreadcrumbData: React.FC<BreadcrumbDataProps> = ({ routes }) => (
  <Breadcrumb
    items={routes.map((route, index) => ({
      title: <Link to={route.path} key={index}>{route.title}</Link>,
    }))}
  />
);

export default BreadcrumbData;
