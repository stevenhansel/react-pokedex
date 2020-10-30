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
};
const Button = ({ children, className }: ButtonProps) => {
  const { setShowModal } = useContext(ModalContext);

  return (
    <button onClick={() => setShowModal(true)} className={className}>
      {children}
    </button>
  );
};

type ContentProps = {
  children?: React.ReactNode;
};
const Content = ({ children }: ContentProps) => {
  const { showModal, setShowModal } = useContext(ModalContext);
  return showModal ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl font-semibold">Generations</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto overflow-y-auto h-96">
              {children}
            </div>
            {/*footer*/}
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
                onClick={() => setShowModal(false)}
              >
                Save Changes
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
  const [showModal, setShowModal] = useState<boolean>(true);

  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  );
};

Modal.Button = Button;
Modal.Content = Content;

export default Modal;
