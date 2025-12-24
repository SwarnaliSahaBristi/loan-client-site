import { GrMoney } from "react-icons/gr";
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
import { FcApproval } from "react-icons/fc";
import { PiApproximateEqualsFill } from "react-icons/pi";


const ManagerMenu = () => {
  return (
    <>
      <MenuItem
        icon={GrMoney}
        label='Add Loan'
        address='add-loan'
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Loans'
        address='manage-loans'
      />
      <MenuItem
        icon={PiApproximateEqualsFill}
        label='Pending Loans'
        address='pending-loans'
      />
      <MenuItem
        icon={FcApproval}
        label='Approved Loans'
        address='approved-loans'
      />
    </>
  )
}

export default ManagerMenu;
