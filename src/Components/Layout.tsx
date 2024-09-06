import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-black dark:text-white dark:border-black">
      
      <Header />

      <div className="flex flex-1">
        
        <Sidebar/>

        
        <main className="flex-1 bg-white overflow-y-auto dark:bg-black ml-[150px] mt-[60px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
