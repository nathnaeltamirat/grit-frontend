import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
interface ModalProps {
  children: ReactNode;
}
export function Modal({ children }: ModalProps) {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const modalRoot = document.getElementById('modal');
    if (modalRoot && elRef.current) {
      modalRoot?.appendChild(elRef.current);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      if (modalRoot && elRef.current) {
        modalRoot?.removeChild(elRef.current);
      }
    };
  }, []);
  return createPortal(
    <div
      className="fixed overflow-auto  inset-0 z-50 flex items-center justify-center 
     bg-black/5 backdrop-blur-md   animate-in  fade-in duration-200"
    >
      <div
        className="w-full max-w-lg  bg-[#0E0E0E]
        border border-[#444748]  rounded-xl  shadow-2xl flex flex-col  text-white"
      >
        {children}
      </div>
    </div>,
    elRef.current,
  );
}
