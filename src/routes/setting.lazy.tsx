import { createLazyFileRoute, Link } from '@tanstack/react-router';
import '../index.css';
import {
  CheckCircleIcon,
  LayoutDashboardIcon,
  LightbulbIcon,
  MenuIcon,
  SettingsIcon,
  VerifiedIcon,
  XIcon,
} from 'lucide-react';
import { useState } from 'react';

import { useAuthContext } from '../providers/AuthProvider';

export const Route = createLazyFileRoute('/setting')({
  component: SettingComponent,
});

function SettingComponent() {
  const [navToggle, setNavToggle] = useState(false);
  const [accountEdit, setAccountEdit] = useState(false);
  const { status } = useAuthContext();
  console.log(status);
  return (
    <>
      {status == 'authed' || status == 'loading' ? (
        <div className="w-full relative min-h-screen font-sans bg-[#0e0e0e]">
          {/*Mobile view */}

          {/* closed */}
          <aside
            className={` w-full bg-[#0e0e0e]   left-0  sticky flex-col top-0 z-40  md:hidden ${navToggle ? 'hidden' : 'flex'}`}
          >
            <div className="flex flex-row py-3 items-center gap-4">
              <MenuIcon
                onClick={() => setNavToggle((prev) => !prev)}
                className="w-10 hover:cursor-pointer h-8 text-[#FFB4AB]"
              />

              <div className="flex flex-row p-2 py-4  items-center">
                <CheckCircleIcon className="w-12 h-8 text-[#FFB4AB]" />
                <div className="flex flex-col">
                  <h1 className="text-white  text-2xl font-semibold">Grit</h1>
                  <p className="text-[#C4C7BE]">v1.0.0-beta</p>
                </div>
              </div>
            </div>

            <div className=" bg-[#3A3D3D] w-full  h-px "></div>
          </aside>
          {/* Open */}
          <aside
            className={`fixed inset-0  bg-[#0e0e0e]/60 backdrop-blur-md shadow-xl z-50  md:hidden  flex-col  ${navToggle ? 'flex' : 'hidden'}`}
          >
            <div className="w-[75%] bg-[#0e0e0e] min-h-screen ">
              <div className="flex flex-row p-2 py-4  items-center">
                <CheckCircleIcon className="w-12 h-8 text-[#FFB4AB]" />
                <div className="flex flex-col">
                  <h1 className="text-white  text-2xl font-semibold">Grit</h1>
                  <p className="text-[#C4C7BE]">v1.0.0-beta</p>
                </div>
                <XIcon
                  onClick={() => setNavToggle((prev) => !prev)}
                  className="w-10 ml-auto hover:cursor-pointer h-8 text-[#FFB4AB]"
                />
              </div>
              <div className=" bg-[#3A3D3D] w-full  h-px "></div>
              <nav className="my-12  ">
                <Link
                  to="/"
                  className="flex my-1 p-2 hover:cursor-pointer hover:bg-[#404040] text-white gap-2 items-center justify-content"
                >
                  <LayoutDashboardIcon className="w-10 h-6" />
                  <p>Frictions</p>
                </Link>
                <Link
                  to="/insights"
                  className="flex my-1 p-2 hover:cursor-pointer hover:bg-[#404040] text-white gap-2 items-center justify-content"
                >
                  <LightbulbIcon className="w-10 h-6" />
                  <p>Insights</p>
                </Link>
                <Link
                  to="/setting"
                  className="flex p-2 my-1 bg-[#2A2A2A] hover:cursor-pointer hover:bg-[#404040] text-white gap-2 items-center justify-content"
                >
                  <SettingsIcon className="w-10 h-6" />
                  <p>Setting</p>
                </Link>
              </nav>
            </div>
          </aside>

          <div className="flex flex-row  min-h-screen">
            {/* Desktop view */}
            <aside className="sticky top-0 w-64 h-screen md:block hidden flex-col">
              <div className="flex flex-row p-2 py-4  items-center">
                <CheckCircleIcon className="w-12 h-8 text-[#FFB4AB]" />
                <div className="flex flex-col">
                  <h1 className="text-white  text-2xl font-semibold">Grit</h1>
                  <p className="text-[#C4C7BE]">v1.0.0-beta</p>
                </div>
              </div>
              <nav className="my-12  ">
                <Link
                  to="/"
                  className="flex my-1 p-2 hover:cursor-pointer hover:bg-[#404040] text-white gap-2 items-center justify-content"
                >
                  <LayoutDashboardIcon className="w-10 h-6" />
                  <p>Frictions</p>
                </Link>
                <Link
                  to="/insights"
                  className="flex my-1 p-2 hover:cursor-pointer hover:bg-[#404040] text-white gap-2 items-center justify-content"
                >
                  <LightbulbIcon className="w-10 h-6" />
                  <p>Insights</p>
                </Link>
                <Link
                  to="/setting"
                  className="flex p-2 my-1 bg-[#2A2A2A] hover:cursor-pointer hover:bg-[#404040] text-white gap-2 items-center justify-content"
                >
                  <SettingsIcon className="w-10 h-6" />
                  <p>Setting</p>
                </Link>
              </nav>
            </aside>

            <div className="hidden md:block bg-[#3A3D3D] w-px self-stretch"></div>
            <div className="flex flex-col ml-10 mt-8">
              <h1 className="text-white font-bold text-3xl ">
                Profile Settings
              </h1>
              <p className="text-[#C4C7C8]">
                Manage your identity, security credentials, and third-party
                developer integrations.
              </p>
              <div className="border mt-12 border-[#444748] p-4 py-6">
                {/* Acount label div*/}
                <div className="flex  justify-between">
                  <div className="flex gap-2 items-center">
                    <p className="text-white  text-xl">[ 01 ]</p>
                    <h1 className="text-white font-bold text-2xl ">
                      Account Information
                    </h1>
                  </div>
                  <button
                    onClick={() => setAccountEdit(true)}
                    className="bg-[#201F1F] py-1 px-8 opacity-90 hover:cursor-pointer border-[#444748] border-2 rounded text-[#ffffff] "
                  >
                    Edit
                  </button>
                </div>

                {/*Email address */}
                <div className="mt-8">
                  <label
                    htmlFor="email"
                    className="text-[#C4C7C8] text-sm font-semibold"
                  >
                    EMAIL ADDRESS
                  </label>
                  <div className="border-2 bg-[#201F1F] items-center flex justify-between border-[#444748] rounded p-2  ">
                    <input
                      type="email"
                      className=" text-sm text-[#c4c7c8]  focus:outline-none"
                      value="nathnaeltamirat3@gmail.com"
                      id="email"
                    />
                    <VerifiedIcon className="w-8 h-4 text-[#C4C7C8]" />
                  </div>
                </div>
                {/*Display Name */}
                <div className="mt-4">
                  <label
                    htmlFor="name"
                    className="text-[#C4C7C8] text-sm font-semibold"
                  >
                    DISPLAY NAME
                  </label>
                  <div className="border-2 bg-[#201F1F] items-center flex justify-between border-[#444748] rounded p-2  ">
                    <input
                      type="text"
                      className=" text-sm text-[#c4c7c8]  focus:outline-none"
                      value="Nathnael Tamirat"
                      id="name"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Unauthorizd</p>
      )}
    </>
  );
}
