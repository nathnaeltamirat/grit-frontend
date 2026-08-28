import '../index.css';

export default function FrictionSkeltonComponent() {
  return (
    <div className="flex  gap-4 mx-4 sm:mx-8 my-4 animate-pulse min-w-0 max-w-full  p-4 border-[#3D4041] border">
      {/*C7C6C6-light-gray  2A2A2A-darkgray */}
      <div className="w-2  rounded-lg bg-[#2A2A2A] shrink-0 self-stretch"></div>
      <div className="flex flex-col w-full gap-3 justify-between">
        <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 min-w-0">

            <div className="h-6 bg-[#2A2A2A] rounded-md  sm:w-1/3 w-1/3 min-w-[150px]"></div>
        

          <div className="flex gap-4 sm:gap-8 shrink-0 text-sm flex-wrap  items-center">
            <div className="h-4 bg-[#2A2A2A] rounded-md w-12"></div>
            <div className="h-4 bg-[#2A2A2A] rounded-md w-14"></div>
            <div className="h-4 bg-[#2A2A2A] rounded-md w-14"></div>
          </div>
        </div>

        <div className={`flex flex-col gap-2 w-full min-w-0 `}>
          <div className="h-4 bg-[#2A2A2A] rounded-md w-full"></div>
          <div className="h-4 bg-[#2A2A2A] rounded-md w-4/5"></div>
        </div>
        <div className="flex w-full items-center justify-between  flex-wrap">
          {/*Tag div*/}
          <div className="flex mb-3 flex-wrap gap-2">
            <div className="border text-sm bg-[#2A2A2A] w-16 h-4 rounded-md px-2 py-1 text-[#C4C7C8] border-[#3D4041]"></div>
            <div className="border text-sm bg-[#2A2A2A] w-20 h-4 rounded-md px-2 py-1 text-[#C4C7C8] border-[#3D4041]"></div>
          </div>

          {/*Severity */}
          <div className="flex justify-between  items-center gap-2 ">
            <div className="h-3 w-20 bg-[#2A2A2A] rounded-md "></div>
            <div className="h-1 bg-[#2A2A2A] rounded-2xl w-3"></div>
            <div className="h-1 bg-[#2A2A2A] rounded-2xl w-3"></div>
            <div className="h-1 bg-[#2A2A2A] rounded-2xl w-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
