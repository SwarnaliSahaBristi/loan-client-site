import React from "react";
import { GiReceiveMoney } from "react-icons/gi";
import MenuItem from "./MenuItem";
import { FaHandHoldingUsd } from "react-icons/fa";

const BorrowerMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaHandHoldingUsd}
        label="Apply for Loan"
        address="/all-loans"
      />
      <MenuItem icon={GiReceiveMoney} label="My Loans" address="my-loans" />
    </>
  );
};

export default BorrowerMenu;
