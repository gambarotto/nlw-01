import React from 'react';

interface headerProps {
  title:string;
}

const Header: React.FC<headerProps> = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}

export default Header;