import { createLazyFileRoute, Link } from '@tanstack/react-router';
import '../index.css';
import {
  CheckCircleIcon,
  FilterIcon,
  HashIcon,
  LayoutDashboardIcon,
  LightbulbIcon,
  MenuIcon,
  SearchIcon,
  SettingsIcon,
  SparkleIcon,
  XIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useGetFriction } from '../api/hooks/useFriction';
export const Route = createLazyFileRoute('/')({
  component: FrictionLogComponent,
});

function FrictionLogComponent() {
  const [navToggle, setNavToggle] = useState(false);
  const [title, setTitle] = useState('');
  const [page, setPage] = useState('1');
  const [tags, setTags] = useState('');

  const [searchParams, setSearchParams] = useState({
    title: '',
    page: '1',
    tags: '',
  });
  const { data, isLoading, isError, error } = useGetFriction(searchParams);
  const handleFetch = async () => {
    setSearchParams({
      title,
      page,
      tags,
    });
  };
  return (
    <div className="w-full min-h-screen font-sans bg-[#0e0e0e]">
      {/*Mobile view */}

      {/* closed */}
      <aside
        className={` ml-8 items-center  md:hidden ${navToggle ? 'hidden' : 'flex'}`}
      >
        <MenuIcon
          onClick={() => setNavToggle((prev) => !prev)}
          className="w-10 hover:cursor-pointer h-8 text-[#FFB4AB]"
        />

        <div className="flex flex-row p-2 py-4  items-center">
          <CheckCircleIcon className="w-6 h-4 text-[#FFB4AB]" />
          <div className="flex flex-col">
            <h1 className="text-white  text-2xl font-semibold">Grit</h1>
            <p className="text-[#C4C7BE]">v1.0.0-beta</p>
          </div>
        </div>
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
          <nav className="my-12  ">
            <Link
              to="/"
              className="flex p-2 my-1 bg-[#2A2A2A] hover:cursor-pointer hover:bg-[#404040] text-white gap-2 items-center justify-content"
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
              to="/settings"
              className="flex my-1 p-2 hover:cursor-pointer hover:bg-[#404040] text-white gap-2 items-center justify-content"
            >
              <SettingsIcon className="w-10 h-6" />
              <p>Settings</p>
            </Link>
          </nav>
        </div>
      </aside>

      <div className="md:hidden bg-[#3A3D3D] w-full relative h-px "></div>
      <div className="flex flex-row  ">
        {/* Desktop view */}
        <aside className="flex-1 flex md:block hidden flex-col">
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
              className="flex p-2 my-1 bg-[#2A2A2A] hover:cursor-pointer hover:bg-[#404040] text-white gap-2 items-center justify-content"
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
              to="/settings"
              className="flex my-1 p-2 hover:cursor-pointer hover:bg-[#404040] text-white gap-2 items-center justify-content"
            >
              <SettingsIcon className="w-10 h-6" />
              <p>Settings</p>
            </Link>
          </nav>
        </aside>

        <div className="hidden md:block bg-[#3A3D3D] w-px self-stretch"></div>
        <div className="flex-4 text-white min-w-0 font-sans">
          <header className="m-8">
            <h1 className="text-2xl   font-semibold">Friction Feed</h1>
            <div className="flex gap-10 flex-wrap justify-between">
              <div className="flex flex-1 gap-3 flex-col w-[30%] ">
                <p className="text-[#C4C7C8]">
                  Tracking technical debt and workflow bottlenecks in real-time.
                </p>
                <div className="flex gap-2 items-center font-label w-fit px-4 py-2  rounded-sm  bg-[#2A2A2A] text-[#ffffff]">
                  <SparkleIcon className="w-4 h-4" />
                  GENERATE AI INSIGHTS
                </div>
              </div>
              <div className="flex flex-wrap gap-x-5 md:flex-2">
                {/*  #Title*/}

                <div className="flex border border-[#2A2A2A] self-start p-2 justify-center items-center gap-2 ">
                  <FilterIcon className="w-3 h-3" />
                  <input
                    type="text"
                    className="h-8 focus:outline-none p-2 text-sm"
                    placeholder="FILTER BY TITLE..."
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* # Tags */}
                <div className="flex border border-[#2A2A2A] self-start p-2 justify-center items-center gap-2 ">
                  <HashIcon className="w-3 h-3" />
                  <input
                    type="text"
                    className="h-8 focus:outline-none p-2 text-sm"
                    placeholder="TAGS SEPAEATE BY COMMA..."
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => handleFetch()}
                  className="flex hover:cursor-pointer h-10 px-4 gap-2 items-center justify-center rounded-sm bg-[#2A2A2A] text-white hover:bg-[#3A3A3A] transition-colors shrink-0"
                >
                  <span>Search</span>
                  <SearchIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          <main>
              {/*To Do*/}
          </main>
        </div>
      </div>
    </div>
  );
}
