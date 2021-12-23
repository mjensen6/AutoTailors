import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaList, FaMoneyBill, FaCar } from 'react-icons/fa';

const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col
                  bg-white dark:bg-gray-900 shadow-lg">
                    
        <SideBarIcon text='Overview' icon={<FaCar size="28" />} />
        <Divider />
        <SideBarIcon text='Financial Analysis' icon={<FaMoneyBill size="20" />} />
        <SideBarIcon text='Possible Trades' icon={<FaList size="20" />} />
        <SideBarIcon text='Add Car' icon={<BsPlus size="32" />} />
        
        <Divider />
        <SideBarIcon text='Settings' icon={<BsGearFill size="22" />} />
    </div>
  );
};

const SideBarIcon = ({ icon, text = 'tooltip 💡' }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </div>
);


const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;