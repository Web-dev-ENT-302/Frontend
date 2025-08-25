import { useEffect } from "react";

const LogoutConfirmationModal = ({ open, onClose, onConfirm }) => {

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        };
    }, [open])

    /* Handler to close the modal if user click on the modal overlay */
    function closeModal(e) {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const handleLogout = () => {
        onConfirm();
        onClose();
    }

    if (!open) return null;

    return (
        <div className='fixed z-[100] bg-[#00000090] backdrop-blur-md w-full h-full top-0 left-0 flex items-center justify-center p-4' onClick={closeModal}>
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
                {/* Modal Header */}
                <div className="mb-6 text-center">
                    <h3 className="mb-2 text-[.9rem] font-semibold text-gray-800 sm:text-lg">Confirm Logout</h3>
                    <p className="text-[.8rem] text-gray-600  sm:text-sm">Are you sure you want to log out of your account?</p>
                </div>

                {/* Modal Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 font-medium text-gray-700 transition-colors border border-gray-300 rounded-md hover:bg-gray-50 text-[.8rem] sm:text-[1rem]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex-1 px-4 py-2 font-medium text-white transition-colors bg-[--primary] rounded-md text-[.8rem] sm:text-[1rem]"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LogoutConfirmationModal;
