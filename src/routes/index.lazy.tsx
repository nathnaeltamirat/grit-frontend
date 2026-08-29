import { createLazyFileRoute, Link } from '@tanstack/react-router';
import '../index.css';
import {
  AlertCircleIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit2Icon,
  FilterIcon,
  HashIcon,
  LayoutDashboardIcon,
  LightbulbIcon,
  LucideTrash2,
  MenuIcon,
  PlusIcon,
  PlusSquareIcon,
  SearchIcon,
  SettingsIcon,
  SparkleIcon,
  TriangleAlert,
  XIcon,
} from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import {
  useCreateFriction,
  useDeleteFriction,
  useGetFriction,
  useUpdateFriction,
} from '../api/hooks/useFriction';
import FrictionSkeltonComponent from '../skeltons/FrictionCardSkelton';
import { Modal } from '../Modal';

export const Route = createLazyFileRoute('/')({
  component: FrictionLogComponent,
});
export interface Tag {
  id: string;
  tag_name: string;
  created_at: string;
}

export interface FrictionLog {
  id: string;
  title: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'CRITICAL';
  user_id: string;
  created_at: string;
  updated_at: string;
  tags: Tag[];
}

export interface Pagination {
  page: string;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

export interface FrictionLogResponse {
  success: boolean;
  message: string;
  data: FrictionLog[];
  pagination: Pagination;
}
function getPaginationNumber(currentPage: number, totalPages: number) {
  const delta = 1;
  const range: (number | string)[] = [];
  for (let x = 1; x <= totalPages; x++) {
    if (
      x == 1 ||
      x == totalPages ||
      (x <= currentPage + delta && x >= currentPage - delta)
    ) {
      range.push(x);
    } else if (range[range.length - 1] !== '...') {
      range.push('...');
    }
  }
  return range;
}
function FrictionCardComponent({ item }: { item: FrictionLog }) {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const adjustHeight = () => {
    const el = textAreaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  };
  const date = new Date(item.created_at);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [lightPercentage, setLightPercentage] = useState(100);
  const [titleValue, setTitleValue] = useState(item.title);
  const [tagValue, setTagValue] = useState('');
  const [tags, setTags] = useState(item.tags.map((tag) => tag.tag_name));
  const [updateStatus, setUpdateStatus] = useState<'success' | 'error' | null>(
    null,
  );

  const [severityValue, setSeverityValue] = useState<
    'LOW' | 'MEDIUM' | 'CRITICAL'
  >(item.severity);
  const [descriptionViewId, setDescriptionViewId] = useState<string | null>(
    null,
  );
  const [descriptionValue, setDescriptionValue] = useState(item.description);
  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const calculateLightRatio = () => {
      const { clientHeight, scrollHeight } = el;

      if (scrollHeight == 0) return;
      const ratio = (clientHeight / scrollHeight) * 100;
      setLightPercentage(Math.min(100, ratio));
    };
    calculateLightRatio();
    const resizeObserver = new ResizeObserver(calculateLightRatio);
    resizeObserver.observe(el);
    window.addEventListener('resize', calculateLightRatio);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateLightRatio);
    };
  }, [item.description, descriptionViewId]);
  const [updateId, setUpdateId] = useState<null | string>(null);
  useLayoutEffect(() => {
    const el = textAreaRef.current;
    if (!el || updateId != item.id) return;

    adjustHeight();
    const resizeObserver = new ResizeObserver(adjustHeight);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [descriptionValue, updateId]);

  const handleDiscard = () => {
    setUpdateId(null);
    setTitleValue(item.title);
    setDescriptionViewId(null);
    setDescriptionValue(item.description);
    setTags(item.tags.map((tag) => tag.tag_name));
    setSeverityValue(item.severity);
    setUpdateStatus(null);
  };
  const { mutate, isPending } = useUpdateFriction();
  const handleSave = (id: string) => {
    mutate(
      {
        id,
        payLoad: {
          title: titleValue,
          description: descriptionValue,
          severity: severityValue,
          tags: tags,
        },
      },
      {
        onSuccess: () => {
          setUpdateStatus('success');
          setDescriptionViewId(null);
          setTimeout(() => {
            setUpdateId(null);
            setUpdateStatus(null);
          }, 1200);
        },
        onError: () => {
          setUpdateStatus('error');
        },
      },
    );
  };
  return (
    <div
      key={item.id}
      className="flex justify-content gap-4 m-8  p-4 border-[#3D4041] border"
    >
      {isDeleteModalOpen && (
        <Modal>
          <DeleteCardComponent
            onClose={() => setIsDeleteModalOpen(false)}
            id={item.id}
            title={item.title}
          />
        </Modal>
      )}
      {/*C7C6C6-light-gray  2A2A2A-darkgray */}

      <div
        className="w-2 shrink-0 self-strech rounded-lg"
        style={{
          background: ` ${updateId === item.id ? '#FFB4AB ' : `linear-gradient(to bottom, #C7C6C6 0% ${lightPercentage}%,#2A2A2A ${lightPercentage}% 100%)`}`,
        }}
      ></div>
      <div className="flex flex-col w-full gap-3 justify-between">
        <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          {item.id != updateId ? (
            <h1 className=" font-semibold text-[#ffffff] text-lg">
              {item.title}
            </h1>
          ) : (
            <input
              type="text"
              className=" placeholder:text-[#6E7172] font-semibold text-[#ffffff] flex-1 min-w-0 mr-2  focus:outline-none px-2 py-1 border-2 border-[#444748] text-lg"
              value={titleValue}
              placeholder="ENTER TITLE..."
              onChange={(e) => setTitleValue(e.target.value)}
            />
          )}

          <div className="flex gap-8 text-sm flex-wrap  items-center">
            {
              /*Edit*/
              updateId != item.id && (
                <button
                  onClick={() => setUpdateId(item.id)}
                  className="flex gap-2 items-center hover:cursor-pointer"
                >
                  <Edit2Icon className="text-[rgb(196,199,200)] w-4 h-8" />
                  <span className="text-[rgb(196,199,200)]">Edit</span>
                </button>
              )
            }

            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex gap-2 items-center hover:cursor-pointer"
            >
              <LucideTrash2 className="text-[rgb(196,199,200)] w-4 h-8" />
              <span className="text-[rgb(196,199,200)]">Delete</span>
            </button>
            {item.id != updateId &&
              (descriptionViewId == item.id ? (
                <ChevronDown
                  onClick={() => setDescriptionViewId(null)}
                  className=" text-[rgb(196,199,200)] w-4 h-8 hover:cursor-pointer"
                />
              ) : (
                lightPercentage < 100 && (
                  <ChevronRight
                    onClick={() => setDescriptionViewId(item.id)}
                    className=" text-[rgb(196,199,200)] w-4 h-8 hover:cursor-pointer"
                  />
                )
              ))}

            <p className=" text-[rgb(196,199,200)] ">
              {`${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} | ${date.getDate()} ${date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}`}
            </p>
          </div>
        </div>
        {item.id == updateId ? (
          <div className=" px-3 py-3  border-t-2 border-t-[#444748] relative bg-[#2A2A2A]">
            {updateStatus === 'success' && (
              <div className="mb-4 flex items-center justify-center gap-2  p-3 bg-emerald-950/80 border border-emerald-500/50 text-xs font-semibold rounded animate-in fade-in slide-in-from-top-2 duration-200">
                <CheckIcon className="w-4 h-4  text-emerald-400 shrink-0" />
                <span>Friction Log updated successfully</span>
              </div>
            )}
            {updateStatus === 'error' && (
              <div className="mb-4 flex items-center justify-center gap-2 p-3 bg-red-950/80 border border-red-500/50 text-xs font-semibold rounded animate-in fade-in slide-in-from-top-2 duration-200">
                <AlertCircleIcon className="w-4 h-4  text-red-400 shrink-0" />
                <span>Unable to update Try Again</span>
              </div>
            )}
            <p className="mt-3  my-2 text-white text-xs">DESCRIPTION</p>
            <textarea
              className="w-full bg-[#1C1B1B] placeholder:text-[#6E7172] text-[#C4C7C8] flex-1 min-w-0 mr-2 overflow-y-hidden resize-none  focus:outline-none px-4 py-4 pb-6 border-2 border-[#444748] text-sm"
              value={descriptionValue}
              placeholder="ENTER DESCRIPTION ..."
              ref={textAreaRef}
              onChange={(e) => setDescriptionValue(e.target.value)}
            />
            <p className="mt-4 mb-2 text-white text-xs">SEVERITY</p>
            <div className="flex flex-wrap gap-2 my-2">
              <button
                onClick={() => setSeverityValue('CRITICAL')}
                className={`w-fit hover:cursor-pointer  min-w-0  px-4 py-1 border-2 border-[#444748] text-sm ${severityValue == 'CRITICAL' ? 'bg-[#FFB4AB] text-[#6F070C]' : 'bg-[#1C1B1B] text-[#C4C7C8] '}`}
              >
                CRITICAL
              </button>
              <button
                onClick={() => setSeverityValue('MEDIUM')}
                className={`w-fit  hover:cursor-pointer min-w-0  px-4 py-1 border-2  border-[#444748] text-sm ${severityValue == 'MEDIUM' ? 'bg-[#FFB4AB] text-[#6F070C]' : 'bg-[#1C1B1B] text-[#C4C7C8] '}`}
              >
                MEDIUM
              </button>
              <button
                onClick={() => setSeverityValue('LOW')}
                className={`w-fit hover:cursor-pointer min-w-0  px-4 py-1 border-2 border-[#444748] text-sm ${severityValue == 'LOW' ? 'bg-[#FFB4AB] text-[#6F070C]' : 'bg-[#1C1B1B] text-[#C4C7C8] '}`}
              >
                LOW
              </button>
            </div>
            <p className="mt-5 mb-2 text-white text-xs">TAGS</p>
            <div className="flex mb-2 flex-wrap items-center ">
              {tags?.map((tagName) => (
                <div
                  key={`updateTag-${item.id}${tagName}`}

                  className={`w-fit flex gap-1 items-center m-1 min-w-0  py-1 px-2  border-2 border-[#444748] text-sm  bg-[#1C1B1B] text-[#C4C7C8] `}
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
                className={`w-fit flex gap-1  items-center m-1 min-w-0  p-2 border-dashed border-2 border-[#444748] text-sm  bg-[#1C1B1B] text-[#C4C7C8] `}
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
            <div className="h-1 border-t-2 border-[#313233] w-98% mx-auto"></div>
            <div className="m-2 items-center flex flex-wrap justify-end">
              <button
                onClick={handleDiscard}
                className={`w-fit hover:cursor-pointer m-1 min-w-0  p-2 border-2 border-[#444748] text-sm  bg-[#1C1B1B] text-[#C4C7C8] `}
              >
                DISCARD
              </button>
              <button
                onClick={() => handleSave(item.id)}
                disabled={isPending}
                className={`w-fit hover:cursor-pointer m-1 min-w-0  p-3 border-2 border-[#444748] text-sm  bg-[#ffffff] rounded text-[#2F3131] ${isPending ? 'opacity-50  pointer-events-none cursor-not-allowed' : 'hover:border-slate-700 hover:bg-slate-50 hover:cursor-pointer active:scale-[0.98]'} `}
              >
                {isPending ? 'Saving Changes...' : 'SAVE CHANGES'}
              </button>
            </div>
          </div>
        ) : (
          <p
            ref={textRef}
            className={`text-md text-[rgb(196,199,200)] ${descriptionViewId != item.id && 'line-clamp-2'}  wrap-break`}
          >
            {item.description}
          </p>
        )}

        <div className="flex w-full items-center gap-2 justify-between  flex-wrap">
          {updateId != item.id && (
            <div className="flex mb-3 flex-wrap gap-2">
              {item.tags.map((tag: Tag) => {
                return (
                  <div
                    key={tag.id}
                    className="border text-sm rounded-md px-2 py-1 text-[#C4C7C8] border-[#3D4041]"
                  >
                    {tag.tag_name}
                  </div>
                );
              })}
            </div>
          )}

          {
            /*Severity */ updateId != item.id && (
              <div className="flex mr-2 flex-wrap  items-center gap-2 ">
                <span
                  className={` text-xs ${item.severity == 'CRITICAL' ? 'text-[#FFA575]' : 'text-[#C4C7C8]'}`}
                >
                  SEVERITY: {item.severity}
                </span>
                <div
                  className={`w-3 h-1 rounded-2xl ${item.severity === 'CRITICAL' ? 'bg-[#FFA575]' : 'bg-[#C4C7C8]'}`}
                ></div>
                <div
                  className={`w-3 h-1 rounded-2xl ${item.severity === 'CRITICAL' ? 'bg-[#FFA575]' : item.severity === 'MEDIUM' ? 'bg-[#C4C7C8]' : 'bg-[#444748]'}`}
                ></div>
                <div
                  className={`w-3 h-1 rounded-2xl ${item.severity === 'CRITICAL' ? 'bg-[#FFA575]' : 'bg-[#444748]'}`}
                ></div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
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
function DeleteCardComponent({
  onClose,
  id,
  title,
}: {
  onClose: () => void;
  id: string;
  title: string;
}) {
  const [updateStatus, setUpdateStatus] = useState<'success' | 'error' | null>(
    null,
  );
  const { mutate, isPending } = useDeleteFriction();
  const handleSave = () => {
    mutate(id, {
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
    });
  };
  return (
    <>
      <div className="flex  m-5 text-[0.8em] text-sans flex-col bg-[#0E0E0E]">
        <div className="flex items-center mb-2 gap-2">
          <TriangleAlert className="w-8  text-[#FFB4AB] h-10" />
          <h1 className="text-lg  font-semibold">DELETE FRICTION ENTRY?</h1>
        </div>
        <div className="mx-auto h-0.5 w-[97%] bg-[#2C2C2C]"></div>
        <p className="my-4 text-[#C4C7C8] ">
          This action is irreversible. The log entry will be permanently removed
          from your technical debt history.
        </p>
        <div className="my-4 border border-[#2C2C2C] bg-[#1C1B1B] p-4">
          <p className="text-[#C4C7C8] mb-1 text-[0.8em] ">
            ITEM TO BE DELETED:
          </p>
          <p className="text-sm font-semibold text-[#ffffff]">{title}</p>
        </div>
        {updateStatus === 'success' && (
          <div className="mb-4 flex items-center justify-center gap-2  p-3 bg-emerald-950/80 border border-emerald-500/50 text-xs font-semibold rounded animate-in fade-in slide-in-from-top-2 duration-200">
            <CheckIcon className="w-4 h-4  text-emerald-400 shrink-0" />
            <span>Friction Log deleted successfully</span>
          </div>
        )}
        {updateStatus === 'error' && (
          <div className="mb-4 flex items-center justify-center gap-2 p-3 bg-red-950/80 border border-red-500/50 text-xs font-semibold rounded animate-in fade-in slide-in-from-top-2 duration-200">
            <AlertCircleIcon className="w-4 h-4  text-red-400 shrink-0" />
            <span>Unable to delete Try Again</span>
          </div>
        )}
        <div className="m-2 items-center flex flex-wrap justify-end">
          <button
            onClick={onClose}
            className={`w-fit hover:cursor-pointer m-1 min-w-0  p-2 border-2 border-[#444748] text-[0.8em]  bg-[#1C1B1B] text-[#C4C7C8] `}
          >
            DISCARD
          </button>
          <button
            disabled={isPending}
            onClick={handleSave}
            className={`w-fit hover:cursor-pointer m-1 min-w-0  p-2 border-2 border-[#444748] text-[0.8em]  bg-[#FFB4AB] rounded text-[#000000]
               ${isPending ? 'opacity-50  pointer-events-none cursor-not-allowed' : ' hover:bg-[#ff9c90] hover:cursor-pointer active:scale-[0.98]'} `}
          >
            {isPending ? 'Deleting ...' : 'Delete'}
          </button>
        </div>
      </div>
    </>
  );
}
function FrictionLogComponent() {
  const [navToggle, setNavToggle] = useState(false);
  const [title, setTitle] = useState('');
  const [page, setPage] = useState('1');
  const [tags, setTags] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [searchParams, setSearchParams] = useState({
    title: '',
    page: '1',
    tags: '',
  });
  const {
    data,
    isLoading,
    isError: isFetchingError,
    error,
    refetch,
  } = useGetFriction(searchParams);
  const handleFetch = async (overRidePage?: string) => {
    setSearchParams({
      title,
      page: overRidePage ?? page,
      tags,
    });
  };

  return (
    <div className="w-full relative min-h-screen font-sans bg-[#0e0e0e]">
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="fixed hover:ring-2 hover:ring-[#FFB4AB] items-center jusitfy-center gap-2 h-11 px-5 flex z-10 hover:cursor-pointer border shadow-xl  active:scale-95  transition-all font-semibold  text-sm  bg-[#ffffff] rounded text-[#2F3131] cursor-pointer bottom-5 right-3"
      >
        <PlusIcon className="w-5 h-5 text-[#2F3131]" />
        <span>CREATE FRICTION</span>
      </button>

      {isCreateModalOpen && (
        <Modal>
          <CreateFrictionComponent
            onClose={() => setIsCreateModalOpen(false)}
          />
        </Modal>
      )}

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
        <div className="flex-1 text-white min-w-0 font-sans">
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
              <div className="flex flex-wrap gap-3 items-center w-full  md:w-auto">
                {/*  #Title*/}

                <div className="flex border border-[#2A2A2A]  p-2 justify-center items-center gap-2 ">
                  <FilterIcon className="w-3 shrink-0 h-3" />
                  <input
                    type="text"
                    className="h-8 focus:outline-none w-full min-w-0 p-2 text-sm"
                    placeholder="FILTER BY TITLE..."
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* # Tags */}
                <div className="flex border border-[#2A2A2A]  p-2 justify-center items-center gap-2 ">
                  <HashIcon className="w-3 h-3 shrink-0" />
                  <input
                    type="text"
                    className="h-8 focus:outline-none w-full min-w-0 p-2 text-sm"
                    placeholder="TAGS SEPARATE BY COMMA..."
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
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <FrictionSkeltonComponent key={index} />
            ))
          ) : isFetchingError ? (
            <div className="p-4 bg-red-950 border border-red-500 text-red-200 rounded">
              <p>Failed to load feed: {error?.message}</p>
              <button onClick={() => refetch()}>Try Again</button>
            </div>
          ) : (
            <main className="font-sans mb-8">
              {data?.data?.map((item: FrictionLog) => {
                return <FrictionCardComponent key={item.id} item={item} />;
              })}
              <div className="flex text-xs md:text-md flex-wrap gap-4 justify-center">
                {/*Left*/}
                <button
                  disabled={page == '1'}

                  onClick={() => {
                    setPage(String(Number(page) - 1));
                    handleFetch();
                  }}
                  className="bg-[#201F1F] hover:cursor-pointer border-2 border-[#444748] flex gap-2 items-center px-4 py-1 pl-6 text-[#C4C7C8]"
                >
                  <ChevronLeft className="w-6 h-8 text-[#C4C7C8]" />
                  <p className="">PREV</p>
                </button>
                {getPaginationNumber(
                  Number(page),
                  data?.pagination.totalPages ?? 1,
                ).map((pageItem, idx) => {
                  if (pageItem == '...') {
                    return (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-2 py-2 select-none text-[#C4C7C8] "
                      >
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={`page-${idx}`}

                      onClick={() => {
                        setPage(String(pageItem));
                        handleFetch(String(pageItem));
                      }}
                      className={`border-2 hover:cursor-pointer border-[#444748] flex gap-2 items-center px-3 py-2 rounded-sm   ${pageItem == page ? 'bg-white text-[#2F3131]' : 'bg-[#201F1F] text-[#C4C7C8] '}`}
                    >
                      <p className="">{pageItem}</p>
                    </button>
                  );
                })}
                <button
                  disabled={page == `${data?.pagination.totalPages}`}
                  onClick={() => {
                    setPage(String(Number(page) + 1));
                    handleFetch();
                  }}
                  className="bg-[#201F1F] hover:cursor-pointer border-2 border-[#444748] flex gap-2 items-center px-4 py-1 pr-6 text-[#C4C7C8]"
                >
                  <p className="">NEXT</p>
                  <ChevronRight className="w-6 h-8 text-[#C4C7C8]" />
                </button>
              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  );
}
