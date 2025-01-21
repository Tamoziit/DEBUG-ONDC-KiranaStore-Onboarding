import { ReactNode } from "react";

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-200 rounded-lg shadow-lg w-11/12 max-w-lg p-6">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;