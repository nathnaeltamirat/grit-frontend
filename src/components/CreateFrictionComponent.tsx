import { useLayoutEffect, useRef, useState } from "react";
import { useCreateFriction } from "../api/hooks/useFriction";

import { AlertCircleIcon, CheckIcon, PlusIcon, PlusSquareIcon, XIcon } from "lucide-react";

function CreateFrictionComponent({ onClose }: { onClose: () => void }) {
  const [titleValue, setTitleValue] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [descriptionValue, setDescriptionValue] = useState('');
  const [updateStatus, setUpdateStatus] = useState<'success' | 'error' | null>(
    null,
  );
  const [severityValue, setSeverityValue] = useState<
    'LOW' | 'MEDIUM' | 'CRITICAL'
  >('CRITICAL');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const adjustHeight = () => {
    const el = textAreaRef.current;
    if (el) {
      el.style.height = '0px';
      el.style.height = `${el.scrollHeight}px`;
    }
  };
  useLayoutEffect(() => {
    const el = textAreaRef.current;
    if (!el) return;

    adjustHeight();
    const resizeObserver = new ResizeObserver(adjustHeight);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [descriptionValue]);
  const handleDiscard = () => {
    setTitleValue('');
    setDescriptionValue('');
    setTags([]);
    setSeverityValue('CRITICAL');
    setUpdateStatus(null);
    onClose();
  };
  const { mutate, isPending } = useCreateFriction();
  const handleSave = () => {
    mutate(
      {
        title: titleValue,
        description: descriptionValue,
        severity: severityValue,
        tags: tags,
      },
      {
        onSuccess: () => {
          setUpdateStatus('success');

          setTimeout(() => {
            setUpdateStatus(null);
            onClose();
          }, 1200);
        },
        onError: () => {
          setUpdateStatus('error');
        },
      },
    );
  };
  return (
    <>
      <div className="flex text-[0.8em] text-sans flex-col bg-[#0E0E0E]">
        <div className="flex items-center  py-4 px-3 justify-between border-b-2 border-[#2C2C2C] bg-[#1C1B1B]">
          <div className="flex   gap-2 text-[#F3F3F3] items-center">
            <PlusSquareIcon className="w-6 h-8" />
            <p className="text-sm">NEW FRICTION ENTRY</p>
          </div>
          <XIcon
            onClick={onClose}
            className="w-6  hover:cursor-pointer h-8 text-[#BFC2C3]"
          />
        </div>
        <div className="ml-8">
          <p className="text-[#C4C7C8] m-8 ml-0 mb-2 text-[0.9em]">TITLE</p>
          <input
            className=" w-[82%] bg-[#1C1B1B] placeholder:text-[#6E7172] text-[#C4C7C8]  focus:outline-none p-4 border-2 border-[#444748] "
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            placeholder="What's the bottleneck? ..."
          />
          <p className="text-[#C4C7C8] m-8 ml-0 mb-2 text-[0.9em]">
            DESCRIPTION
          </p>
          <textarea
            rows={1}
            className="w-[82%] bg-[#1C1B1B] placeholder:text-[#6E7172] text-[#C4C7C8] flex-1 min-w-0  overflow-y-hidden resize-none  focus:outline-none px-4 py-4 pb-6 border-2 border-[#444748] "
            value={descriptionValue}
            placeholder="ENTER DESCRIPTION ..."
            ref={textAreaRef}
            onChange={(e) => setDescriptionValue(e.target.value)}
          />
          <p className="text-[#C4C7C8] m-8 ml-0 mb-2 text-[0.9em]">
            SEVERITY LEVEL
          </p>
          <div className="flex flex-wrap gap-2 my-2">
            <button
              onClick={() => setSeverityValue('CRITICAL')}
              className={`w-fit hover:cursor-pointer  min-w-0  px-4 py-1 border-2 border-[#444748]  ${severityValue == 'CRITICAL' ? 'bg-[#FFB4AB] text-[#6F070C]' : 'bg-[#1C1B1B] text-[#C4C7C8] '}`}
            >
              CRITICAL
            </button>
            <button
              onClick={() => setSeverityValue('MEDIUM')}
              className={`w-fit  hover:cursor-pointer min-w-0  px-4 py-1 border-2  border-[#444748]  ${severityValue == 'MEDIUM' ? 'bg-[#FFB4AB] text-[#6F070C]' : 'bg-[#1C1B1B] text-[#C4C7C8] '}`}
            >
              MEDIUM
            </button>
            <button
              onClick={() => setSeverityValue('LOW')}
              className={`w-fit hover:cursor-pointer min-w-0  px-4 py-1 border-2 border-[#444748]  ${severityValue == 'LOW' ? 'bg-[#FFB4AB] text-[#6F070C]' : 'bg-[#1C1B1B] text-[#C4C7C8] '}`}
            >
              LOW
            </button>
          </div>
          <p className="text-[#C4C7C8] m-8 ml-0 mb-2 text-[0.9em]">TAGS</p>
          <div className="flex mb-2 flex-wrap items-center ">
            {tags?.map((tagName, key) => (
              <div
                key={`updateTag-${key}${tagName}`}

                className={`w-fit flex gap-1 items-center m-1 min-w-0  py-1 px-2  border-2 border-[#444748]   bg-[#1C1B1B] text-[#C4C7C8] `}
              >
                <p>{tagName}</p>
                <XIcon
                  onClick={() => {
                    setTags(tags.filter((item) => item != tagName));
                  }}
                  className="w-4 hover:cursor-pointer h-4 "
                />
              </div>
            ))}
            <div
              className={`w-fit flex gap-1  items-center m-1 min-w-0  p-2 border-dashed border-2 border-[#444748]   bg-[#1C1B1B] text-[#C4C7C8] `}
            >
              <PlusIcon className="w-4 hover:cursor-pointer h-4 " />
              <input
                type="text"
                className="bg-transparent focus:outline-none placeholder:text-[#6E7172] w-20"
                placeholder="NEW_TAG..."
                value={tagValue}
                onChange={(e) => setTagValue(e.target.value)}
              />
            </div>
            <button
              onClick={() => {
                if (tags.includes(tagValue.trim()) || tagValue == '') {
                  return;
                }
                setTags((prev) => {
                  const currentTags = prev ?? [];

                  return [...currentTags, tagValue.trim()];
                });
                setTagValue('');
              }}
              className={`w-fit hover:cursor-pointer m-1 min-w-0  py-1 px-2  border-2 border-[#444748] text-sm  bg-[#2A2A2A] text-[#00000] `}
            >
              COMMIT
            </button>
          </div>
          {updateStatus === 'success' && (
            <div className="mb-4 flex items-center justify-center gap-2  p-3 bg-emerald-950/80 border border-emerald-500/50 text-xs font-semibold rounded animate-in fade-in slide-in-from-top-2 duration-200">
              <CheckIcon className="w-4 h-4  text-emerald-400 shrink-0" />
              <span>Friction Log created successfully</span>
            </div>
          )}
          {updateStatus === 'error' && (
            <div className="mb-4 flex items-center justify-center gap-2 p-3 bg-red-950/80 border border-red-500/50 text-xs font-semibold rounded animate-in fade-in slide-in-from-top-2 duration-200">
              <AlertCircleIcon className="w-4 h-4  text-red-400 shrink-0" />
              <span>Unable to create Try Again</span>
            </div>
          )}
          <div className="m-2 items-center flex flex-wrap justify-end">
            <button
              onClick={handleDiscard}
              className={`w-fit hover:cursor-pointer m-1 min-w-0  p-2 border-2 border-[#444748] text-[0.8em]  bg-[#1C1B1B] text-[#C4C7C8] `}
            >
              DISCARD
            </button>
            <button
              onClick={handleSave}
              disabled={isPending}
              className={`w-fit hover:cursor-pointer m-1 min-w-0  p-3 border-2 border-[#444748] text-[0.8em]  bg-[#ffffff] rounded text-[#2F3131] ${isPending ? 'opacity-50  pointer-events-none cursor-not-allowed' : 'hover:border-slate-700 hover:bg-slate-50 hover:cursor-pointer active:scale-[0.98]'} `}
            >
              {isPending ? 'CREATING FRICTION ...' : 'CREATE FRICTION'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateFrictionComponent