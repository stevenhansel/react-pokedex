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
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onClick={() => setShowModal(false)}
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl font-semibold">Modal Title</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-gray-600 text-lg leading-relaxed">
                I always felt like I could do anything. That’s the main thing
                people are controlled by! Thoughts- their perception of
                themselves! They're slowed down by their perception of
                themselves. If you're taught you can’t do anything, you won’t do
                anything. I was taught I could do everything.
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                style={{ transition: "all .15s ease" }}
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
