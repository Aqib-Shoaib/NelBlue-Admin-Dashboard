import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import MessageModal from "./MessageModal";
import { approveUser, rejectUser } from "../services/authService";

function VerificationModal({ isOpen, onClose, title, image, userId, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState(null); // 'approve' or 'reject'
  const [messageModal, setMessageModal] = useState({ isOpen: false, type: '', title: '', message: '' });

  const handleAction = async (actionType) => {
    console.log('VerificationModal - User ID:', userId);
    console.log('VerificationModal - Action Type:', actionType);
    
    if (!userId) {
      setMessageModal({
        isOpen: true,
        type: 'error',
        title: 'Missing User ID',
        message: 'User ID is required for this action. Please try again.'
      });
      return;
    }

    setIsLoading(true);
    setAction(actionType);
    
    try {
      const result = actionType === 'approve' 
        ? await approveUser(userId)
        : await rejectUser(userId);
      
      if (result.success) {
        // Call the onSuccess callback to refresh the parent component
        onSuccess?.(actionType);
        onClose();
        setMessageModal({
          isOpen: true,
          type: 'success',
          title: 'Action Successful',
          message: `User ${actionType === 'approve' ? 'approved' : 'rejected'} successfully!`
        });
      } else {
        setMessageModal({
          isOpen: true,
          type: 'error',
          title: 'Action Failed',
          message: result.message || 'The action failed. Please try again.'
        });
      }
    } catch (error) {
      console.error('VerificationModal - API Error:', error);
      setMessageModal({
        isOpen: true,
        type: 'error',
        title: 'Error Occurred',
        message: 'An error occurred while processing your request. Please try again.'
      });
    } finally {
      setIsLoading(false);
      setAction(null);
    }
  };

  const closeMessageModal = () => {
    setMessageModal({ isOpen: false, type: '', title: '', message: '' });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={title}>
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-xl font-medium text-[#121212] mb-3">Did you find {title.toLowerCase()} valid?</h2>
            <div>
              <div className="flex gap-4">
                <button
                  className="w-[140px] h-[35px] rounded-full bg-[#11781B] text-white text-base font-medium transition-colors hover:bg-[#0e5e16] disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                  onClick={() => handleAction('approve')}
                  disabled={isLoading}
                >
                  {isLoading && action === 'approve' ? 'Approving...' : 'Approve'}
                </button>
                <button
                  className="w-[114px] h-[35px] rounded-full bg-[#FF0000] text-white text-base font-medium transition-colors hover:bg-[#c20000] disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                  onClick={() => handleAction('reject')}
                  disabled={isLoading}
                >
                  {isLoading && action === 'reject' ? 'Rejecting...' : 'Decline'}
                </button>
              </div>
            </div>
          </div>
          <div>
            <img src={image} alt={`${title} image`} />
          </div>
        </div>
      </Modal>

      <MessageModal
        isOpen={messageModal.isOpen}
        onClose={closeMessageModal}
        type={messageModal.type}
        title={messageModal.title}
        message={messageModal.message}
        onConfirm={closeMessageModal}
      />
    </>
  );
}

VerificationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  userId: PropTypes.string,
  onSuccess: PropTypes.func,
};

export default VerificationModal;
