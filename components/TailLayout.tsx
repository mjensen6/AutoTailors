import SideBar from '../components/SideBar';
import ContentContainer from './ContentContainer';
import React from "react";
import TopNavigation from './TopNavBar';


  
  const Layout: React.FC = (props) => (
      <>
          <TopNavigation />
          <div className="flex">
              <SideBar />
              <ContentContainer />
          </div>
    </>
  );
  
  export default Layout;