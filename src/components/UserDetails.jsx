import React, { useState } from "react";
import PropTypes from "prop-types";
import image from "../assets/4c1a900b3b3e49a09cbd22efaee47a0cec00b79a.jpg";
import VerificationModal from "./VerificationModal";

const UserDetails = ({ user, onUpdate, onClose }) => {
  if (!user) return null;
  const [verificationModal, setVerificationModal] = useState(false);
  const [verificationType, setVerificationType] = useState('');

  const handleVerificationSuccess = (actionType) => {
    // Call the onUpdate callback to refresh the parent component
    onUpdate?.();
    console.log(`User ${actionType === 'approve' ? 'approved' : 'rejected'} successfully!`);
  };

  const openVerificationModal = (type) => {
    setVerificationType(type);
    setVerificationModal(true);
  };

  // Mock data for the table - you can replace this with real data from your API
  const userTasks = [
    {
      id: "NBO234",
      client: "Jonas Blong",
      task: "Brake Pad Servicing",
      date: "25/03/2025",
      amount: "$500",
      status: "Pending",
    },
    {
      id: "NBO235",
      client: "Jonas Blong",
      task: "Brake Pad Servicing",
      date: "25/03/2025",
      amount: "$500",
      status: "Completed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-[#D2FDD8] text-[#319F43]";
      case "Pending":
        return "bg-[rgba(255,192,10,0.13)] text-[#FBBC05]";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  console.log(user);

  return (
    <div className="w-full h-full p-8 px-20">
      {/* Main Container - matching Figma dimensions exactly */}
      <div className="max-w-[1280px] mx-auto space-y-8">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            onClick={onClose}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M21 11H6.414l5.293-5.293l-1.414-1.414L2.586 12l7.707 7.707l1.414-1.414L6.414 13H21z"
            />
          </svg>
          <h1 className="capitalize font-semibold text-3xl text-[#121212] mx-14">
            {user.role} Details
          </h1>
        </div>
        {/* User Details Section - Group 1104 */}
        <div className="relative bg-[#E1E1E1]/25 rounded-lg w-full max-w-[1000px] p-6">
          {/* User Photo - Photo by Marcelo Dias */}
          <div className="absolute top-[43px] left-[28px]">
            <img
              src={image}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-[200px] h-[200px] rounded-[20px] object-cover"
            />
          </div>

          {/* Content Container - positioned exactly as per Figma */}
          <div className="ml-[276px] space-y-[17px] pt-[44px]">
            {/* Name Section - Group 1026 */}
            <div className="flex items-center gap-[26px]">
              <span className="text-[#121212] font-medium text-[20px] leading-[1em]">
                Name:
              </span>
              <span className="text-black font-light text-[20px] leading-[1.5em]">
                {user.firstName} {user.lastName}
              </span>
            </div>

            <div className="bg-black/50 h-[0.5px] w-2/3"></div>

            {/* Address Section - Group 1030 */}
            <div className="flex items-start gap-[24px]">
              <span className="text-[#121212] font-medium text-[20px] leading-[1em]">
                Address:
              </span>
              <span className="text-black font-light text-[20px] leading-[1.5em]">
                {user.address || "35 home avenue, cana da"}
              </span>
            </div>
            <div className="bg-black/50 h-[0.5px] w-2/3"></div>

            {/* Phone Number Section - Group 1031 */}
            <div className="flex items-center gap-[24px]">
              <span className="text-[#121212] font-medium text-[20px] leading-[1em]">
                phone Number:
              </span>
              <span className="text-black font-light text-[20px] leading-[1.5em]">
                {user.phoneNumber || "+234 7890543"}
              </span>
            </div>
            <div className="bg-black/50 h-[0.5px] w-2/3"></div>

            {/* Email Section - Group 1032 */}
            <div className="flex items-center gap-[24px]">
              <span className="text-[#121212] font-medium text-[20px] leading-[1em]">
                Email:
              </span>
              <span className="text-black font-light text-[20px] leading-[1.5em]">
                {user.email}
              </span>
            </div>
            <div className="bg-black/50 h-[0.5px] w-2/3"></div>

            {/* Payment Section - Group 1034 */}
            <div className="flex items-center gap-[24px]">
              <span className="text-[#121212] font-medium text-[20px] leading-[1em]">
                Payment:
              </span>
              <span className="text-black font-light text-[20px] leading-[1.5em]">
                {user.payment || "Subscription"}
              </span>
            </div>
            <div className="bg-black/50 h-[0.5px] w-2/3"></div>

            {/* Document Section - Group 1033 */}
            <div className="flex items-center gap-[24px]">
              <span className="text-[#121212] font-medium text-[20px] leading-[1em]">
                Document:
              </span>
              <div className="flex gap-[20px]">
                <button
                  className="bg-[#023AA2] text-white px-5 py-2 rounded-[20px] text-[14px] font-normal leading-[1.5em] hover:bg-[#013d73] transition-colors"
                  onClick={() => openVerificationModal('governmentId')}
                >
                  Government ID
                </button>
                <button
                  className="bg-[#023AA2] text-white px-5 py-2 rounded-[20px] text-[14px] font-normal leading-[1.5em] hover:bg-[#013d73] transition-colors"
                  onClick={() => openVerificationModal('driversLicense')}
                >
                  Drivers License
                </button>
              </div>
            </div>
            <div className="bg-black/50 h-[0.5px] w-2/3"></div>

            {/* Verification Section - Group 1082 */}
            <div className="flex items-center gap-[24px]">
              <span className="text-[#121212] font-medium text-[20px] leading-[1em]">
                Verification:
              </span>
              <span
                className={`font-normal text-[20px] leading-[1.5em] ${
                  user.isVerified ? "text-[#11781B]" : "text-red-600"
                }`}
              >
                {user.isVerified ? "Approved" : "Pending"}
              </span>
            </div>
          </div>
        </div>

        {/* Tasks/Projects Table Section - Group 1102 */}
        <div className="max-w-[1063px] my-5 border border-[#12121280] rounded-md overflow-hidden">
          <div className="bg-[#F0F0F0] px-2 py-2">
            <div className="flex justify-between px-2 py-2 bg-[#F5F5F5] font-bold text-[#121212]">
              <div className="flex-1 text-left px-2">S/N</div>
              <div className="flex-1 text-left px-2">Client</div>
              <div className="flex-1 text-left px-2">Task</div>
              <div className="flex-1 text-left px-2">Date</div>
              <div className="flex-1 text-left px-2">Amount</div>
              <div className="flex-1 text-left px-2">Status</div>
            </div>
          </div>
          {userTasks.map((task, idx) => (
            <div
              key={task.id}
              className={`flex items-center px-2 py-2 bg-[rgba(224,224,224,0.25)] rounded-[10px] m-2`}
            >
              <div className="flex-1 px-2 text-black">{task.id}</div>
              <div className="flex-1 flex items-center px-2">
                <img
                  src={image}
                  alt={task.client}
                  className="w-5 h-5 rounded-full mr-2 bg-[#ccc] object-cover"
                />
                <span>{task.client}</span>
              </div>
              <div className="flex-1 px-2 text-black">{task.task}</div>
              <div className="flex-1 px-2 text-black">{task.date}</div>
              <div className="flex-1 px-2 text-black">{task.amount}</div>
              <div className="flex-1 px-2">
                <span
                  className={`
                    inline-flex items-center justify-center px-2 py-1 rounded 
                    text-[14px]
                    ${
                      task.status === "Pending"
                        ? "bg-[rgba(255,192,10,0.13)] text-[#FBC107]"
                        : task.status === "Completed"
                        ? "bg-[#D2FCD8] text-[#31A042]"
                        : "bg-gray-200 text-gray-800"
                    }
                  `}
                >
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <VerificationModal
        image="./cnic.png"
        isOpen={verificationModal}
        onClose={() => setVerificationModal(false)}
        title={verificationType === 'governmentId' ? 'Government ID' : verificationType === 'driversLicense' ? 'Drivers License' : 'Document Verification'}
        userId={user._id}
        onSuccess={handleVerificationSuccess}
      />
    </div>
  );
};

UserDetails.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    phoneNumber: PropTypes.string,
    payment: PropTypes.string,
    isVerified: PropTypes.bool,
    role: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

export default UserDetails;
