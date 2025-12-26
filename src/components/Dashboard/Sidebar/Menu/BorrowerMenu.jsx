import React from 'react';
import { GiReceiveMoney } from "react-icons/gi";
import MenuItem from './MenuItem'

const BorrowerMenu = () => {
    
    return (
    <>
      <MenuItem icon={GiReceiveMoney } label='My Loans' address='my-loans' />
    </>
  )
};

export default BorrowerMenu;