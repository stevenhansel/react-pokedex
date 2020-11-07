import React, { useContext, useState, createContext } from "react";

type ModalContextType = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const ModalContext = createContext<ModalContextType>({
  showModal: false,
  setShowModal: () => {},
});

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};
const Button = ({ children, className, disabled }: ButtonProps) => {
  const { setShowModal } = useContext(ModalContext);

  return (
    <button
      onClick={() => {
        if (!disabled) {
          setShowModal(true);
        }
      }}
      className={className}
    >
      {children}
    </button>
  );
};

type ContentProps = {
  title?: string;
  children?: React.ReactNode;
  handleSaveModal?: () => void;
};
const Content = ({ children, title, handleSaveModal }: ContentProps) => {
  const { showModal, setShowModal } = useContext(ModalContext);
  return showModal ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* Content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                {title || "Title"}
              </h3>
            </div>
            {/* Body */}
            <div className="relative p-6 flex-auto overflow-y-auto h-96">
              {children}
            </div>
            {/* Footer */}
            <div className="flex items-center justify-end px-6 py-4 border-t border-solid border-gray-300 rounded-b">
              <button
                className="text-primary background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-3 mb-1 hover:text-white hover:bg-primary transition-all duration-200 ease-in-out rounded-lg"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                style={{ transition: "all .15s ease" }}
                onClick={() => {
                  if (handleSaveModal) {
                    handleSaveModal();
                  }

                  setShowModal(false);
                }}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : null;
};

type ModalProps = {
  children: React.ReactNode;
};
const Modal = ({ children }: ModalProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  );
};

Modal.Button = Button;
Modal.Content = Content;

export default Modal;
