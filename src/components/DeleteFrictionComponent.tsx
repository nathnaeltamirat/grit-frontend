import { AlertCircleIcon, CheckIcon, TriangleAlert } from 'lucide-react';
import { useDeleteFriction } from '../api/hooks/useFriction';
import { useState } from 'react';

function DeleteFrictionComponent({
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
export default DeleteFrictionComponent;
