import React, { useState } from "react";
import { Card } from "antd";
import { motion } from "framer-motion";
import {
  Briefcase,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Mail,
  Phone,
  User,
  XCircle,
  Download,
} from "lucide-react";

// Create a custom badge component since there might be issues with the Ant Design Badge
const CustomBadge = ({ children, style }) => {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full"
      style={style}
    >
      {children}
    </span>
  );
};

const ApplicationStatusCard = ({ application }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Define status configurations
  const getStatusConfig = (status) => {
    const statusMap = {
      Accepted: {
        color: "#10b981",
        bgColor: "#ecfdf5",
        borderColor: "#a7f3d0",
        icon: <CheckCircle size={16} className="mr-1.5" />,
      },
      Rejected: {
        color: "#ef4444",
        bgColor: "#fef2f2",
        borderColor: "#fecaca",
        icon: <XCircle size={16} className="mr-1.5" />,
      },
      Pending: {
        color: "#f59e0b",
        bgColor: "#fffbeb",
        borderColor: "#fde68a",
        icon: <Clock size={16} className="mr-1.5" />,
      },
    };

    return statusMap[status] || statusMap.Pending;
  };

  const statusConfig = getStatusConfig(application.Status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <Card
        bordered
        className="overflow-hidden"
        bodyStyle={{ padding: 0 }}
        style={{ borderColor: "#e5e7eb" }}
      >
        {/* Card Header */}
        <div
          className="py-4 px-6"
          style={{
            background: "linear-gradient(to right, #f0f7ff, #f0f5ff)",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-black m-0">
              Application Status
            </h2>
            <CustomBadge
              style={{
                backgroundColor: statusConfig.bgColor,
                color: statusConfig.color,
                border: `1px solid ${statusConfig.borderColor}`,
                fontWeight: 500,
              }}
            >
              <span className="flex items-center">
                {statusConfig.icon}
                {application.Status}
              </span>
            </CustomBadge>
          </div>
          {application.AppliedDate && (
            <p className="text-sm text-gray-500 mt-1 mb-0">
              Applied on {application.AppliedDate}
            </p>
          )}
        </div>

        {/* Card Content */}
        <div className="pt-6 px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Personal Information
              </h3>

              <div className="space-y-3">
                <div className="flex items-center">
                  <User
                    size={16}
                    className="mr-3"
                    style={{ color: "#2563eb" }}
                  />
                  <div>
                    <p className="text-sm text-gray-500 mb-0">Full Name</p>
                    <p className="font-medium mb-0">{application.Name}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail
                    size={16}
                    className="mr-3"
                    style={{ color: "#2563eb" }}
                  />
                  <div>
                    <p className="text-sm text-gray-500 mb-0">Email Address</p>
                    <p className="font-medium mb-0">{application.Email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FileText
                    size={16}
                    className="mr-3"
                    style={{ color: "#2563eb" }}
                  />
                  <div>
                    <p className="text-sm text-gray-500 mb-0">Roll Number</p>
                    <p className="font-medium mb-0">{application.RollNumber}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone
                    size={16}
                    className="mr-3"
                    style={{ color: "#2563eb" }}
                  />
                  <div>
                    <p className="text-sm text-gray-500 mb-0">Contact Number</p>
                    <p className="font-medium mb-0">
                      {application.ContactNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Application Details
              </h3>

              <div className="space-y-3">
                <div className="flex items-center">
                  <Briefcase
                    size={16}
                    className="mr-3"
                    style={{ color: "#2563eb" }}
                  />
                  <div>
                    <p className="text-sm text-gray-500 mb-0">Position</p>
                    <p className="font-medium mb-0">{application.Post}</p>
                  </div>
                </div>

                {application.subpost && (
                  <div className="flex items-center">
                    <Briefcase
                      size={16}
                      className="mr-3"
                      style={{ color: "#2563eb" }}
                    />
                    <div>
                      <p className="text-sm text-gray-500 mb-0">Subposition</p>
                      <p className="font-medium mb-0">{application.subpost}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {application.AdditionalDetails && (
            <>
              <div
                className="my-6"
                style={{ height: "1px", backgroundColor: "#e5e7eb" }}
              />

              <div>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center p-0 bg-transparent border-0 cursor-pointer mb-2"
                  style={{ color: "#2563eb" }}
                >
                  <span>Additional Details</span>
                  {showDetails ? (
                    <ChevronUp size={16} className="ml-1" />
                  ) : (
                    <ChevronDown size={16} className="ml-1" />
                  )}
                </button>

                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.2 }}
                    className="rounded-md p-4 text-gray-700 text-sm border"
                    style={{
                      backgroundColor: "#f9fafb",
                      borderColor: "#f3f4f6",
                    }}
                  >
                    {application.AdditionalDetails}
                  </motion.div>
                )}
              </div>
            </>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ApplicationStatusCard;
