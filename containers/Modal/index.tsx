import { MouseEvent, MouseEventHandler, ReactNode } from 'react';

type TProps = {
  children: ReactNode;
  isOpen: boolean;
  requestClose?: CallableFunction;
  className?: string;
};

const Modal = ({ children, isOpen, requestClose, className = '' }: TProps) => {
  const onRequestClose: MouseEventHandler<HTMLDivElement> = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    const id = target.id;
    if (id === 'modal-container') {
      if (requestClose) {
        requestClose();
      }
    }
  };
  return isOpen ? (
    <div
      id="modal-container"
      className={`${className} ${'z-[10000] fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 flex justify-center items-center'}`}
      onClick={onRequestClose}>
      {children}
    </div>
  ) : null;
};

export default Modal;
