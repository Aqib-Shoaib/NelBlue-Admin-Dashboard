import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import dotsVertical from "@iconify-icons/mdi/dots-vertical";
import starIcon from "@iconify-icons/mdi/star";
import starOutlineIcon from "@iconify-icons/mdi/star-outline";
import image from "../assets/4c1a900b3b3e49a09cbd22efaee47a0cec00b79a.jpg";
import Topbar from "../components/Topbar";
import { useAllProjects } from "../store/useDashboard";
import Spinner from "../components/Spinner";

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef();

  // Fetch projects data from API
  const { data: projectsData, isLoading, error } = useAllProjects();

  console.log(projectsData)

  // Extract data from API response
  const { projects = [], payments = [], feedbacks = [], stats = {} } = projectsData || {};

  // Filter projects based on search term
  const filteredProjects = projects.filter(project => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      project.userId?.firstName?.toLowerCase().includes(searchLower) ||
      project.userId?.lastName?.toLowerCase().includes(searchLower) ||
      project.userId?.email?.toLowerCase().includes(searchLower) ||
      project.serviceId?.title?.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (idx) => {
    if (dropdownIndex === idx) {
      setDropdownIndex(null);
    } else {
      setDropdownIndex(idx);
    }
  };

  const openProjectDetails = (project) => {
    setSelectedProject(project);
    setShowClientDetails(false);
    setDropdownIndex(null);
  };

  const openClientDetails = (project) => {
    setSelectedProject(project);
    setShowClientDetails(true);
    setDropdownIndex(null);
  };

  const closeDetails = () => {
    setSelectedProject(null);
    setShowClientDetails(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          icon={i <= rating ? starIcon : starOutlineIcon}
          className={`inline-block ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          width="20"
          height="20"
        />
      );
    }
    return stars;
  };



  return (
    <div className="w-full h-full p-10 space-y-6">
      <Topbar title="Projects" />

      {/* Loading state - inline, doesn't cover sidebar */}
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <Spinner />
            <div className="mt-4 text-gray-600">Loading projects...</div>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-2">Error loading projects</div>
            <div className="text-gray-500">Please try again later</div>
          </div>
        </div>
      )}

      {/* Content - only show when not loading */}
      {!isLoading && (
        <>
          {/* Search input */}
          <div className="flex justify-end">
            <div className="flex items-center border border-[#121212BF]/75 rounded-lg px-3 w-[300px]">
              <input
                type="text"
                placeholder="Search Projects"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full outline-none text-sm"
              />
              <Icon icon="mdi:magnify" width="24" height="24" className="text-[#121212BF]" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead className="bg-[#F5F5F5] h-[64px] text-sm font-semibold">
                <tr>
                  <th className="text-center">Client</th>
                  <th className="text-center">Service</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Client Role</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project, idx) => (
                    <tr key={project._id} className="text-sm text-center bg-[#E1E1E1] rounded-md">
                      <td className="px-4 py-2">
                        <div
                          className="flex items-center justify-center gap-2 cursor-pointer"
                          onClick={() => openClientDetails(project)}
                        >
                          <img
                            src={project.userId?.profileImage || image}
                            alt={`${project.userId?.firstName} ${project.userId?.lastName}`}
                            className="w-8 h-8 rounded-full border"
                            onError={(e) => {
                              e.target.src = image;
                            }}
                          />
                          <div className="flex flex-col text-left">
                            <p className="text-[16px]">
                              {project.userId?.firstName} {project.userId?.lastName}
                            </p>
                            <p className="text-xs text-gray-500">{project.userId?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <p className="border-l border-[#023AA2] pl-2">{project.serviceId?.title}</p>
                      </td>
                      <td className="px-4 py-2">${project.serviceId?.price || 0}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          project.userId?.role === 'Client' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {project.userId?.role || 'N/A'}
                        </span>
                      </td>
                      <td className="px-4 py-2 relative">
                        <Icon
                          icon={dotsVertical}
                          width="24"
                          height="24"
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(idx);
                          }}
                        />
                        {dropdownIndex === idx && (
                          <div
                            ref={dropdownRef}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                          >
                            <button
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                openProjectDetails(project);
                              }}
                            >
                              View Project Details
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500">
                      {searchTerm ? 'No projects found matching your search' : 'No projects available'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Client Details Modal */}
      {selectedProject && showClientDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[500px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Client Details</h3>
              <button
                onClick={closeDetails}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Client Header Section */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedProject.userId?.profileImage || image}
                alt={`${selectedProject.userId?.firstName} ${selectedProject.userId?.lastName}`}
                className="w-16 h-16 rounded-full border-2 border-gray-200"
                onError={(e) => {
                  e.target.src = image;
                }}
              />
              <div>
                <h4 className="text-lg font-semibold">
                  {selectedProject.userId?.firstName} {selectedProject.userId?.lastName}
                </h4>
                <p className="text-sm text-gray-500">{selectedProject.userId?.role}</p>
              </div>
            </div>

            {/* Client Details Grid */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                  <p className="text-sm text-blue-600">{selectedProject.userId?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Role</p>
                  <p className="text-sm">{selectedProject.userId?.role}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Service</p>
                <p className="text-sm font-semibold">{selectedProject.serviceId?.title}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Service Description</p>
                <p className="text-sm">{selectedProject.serviceId?.description}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Price</p>
                <p className="text-sm font-semibold text-green-600">${selectedProject.serviceId?.price}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && !showClientDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[500px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Project Details</h3>
              <button
                onClick={closeDetails}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Client Info Box */}
            <div className="w-full h-[85px] bg-[#F5F5F5] p-4 rounded-[10px] mb-5">
              <div className="flex justify-between items-center gap-4">
                <div className="flex justify-center gap-2 items-center">
                  <img
                    src={selectedProject.userId?.profileImage || image}
                    alt={`${selectedProject.userId?.firstName} ${selectedProject.userId?.lastName}`}
                    className="w-[50px] h-[50px] rounded-full border"
                    onError={(e) => {
                      e.target.src = image;
                    }}
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">
                      {selectedProject.userId?.firstName} {selectedProject.userId?.lastName}
                    </p>
                    <p className="font-normal text-[12px]">{selectedProject.userId?.role}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-black font-semibold">Project ID</p>
                  <p className="text-sm text-gray-600">{selectedProject._id?.slice(-8)}</p>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="flex flex-col gap-2 bg-[#F5F5F5] rounded-[10px]">
              {/* Service Info */}
              <div className="w-full flex justify-between items-center gap-4 px-5 py-6">
                <div className="flex justify-center gap-2 items-center">
                  <div className="w-[50px] h-[50px] bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon icon="mdi:briefcase" className="text-blue-600" width="24" height="24" />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold">{selectedProject.serviceId?.title}</p>
                    <p className="font-normal text-[12px]">Service</p>
                  </div>
                </div>
                <div className="flex justify-evenly items-center gap-3 bg-[#C4D9FF]/55 px-3 py-1 rounded">
                  <p className="text-sm text-black">${selectedProject.serviceId?.price}</p>
                </div>
              </div>
              <hr className="w-[401px] mx-auto bg-[#000000]/50" />

              {/* Project Details */}
              <div className="grid grid-cols-2 gap-4 mb-6 px-5 py-6">
                <div>
                  <p className="text-sm text-gray-500">Service Title</p>
                  <p className="text-[14px]">{selectedProject.serviceId?.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-[14px] font-semibold">${selectedProject.serviceId?.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Client Name</p>
                  <p className="text-[14px]">
                    {selectedProject.userId?.firstName} {selectedProject.userId?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Client Role</p>
                  <p className="text-[14px]">{selectedProject.userId?.role}</p>
                </div>
              </div>
              <hr className="w-[401px] mx-auto bg-[#000000]/50" />

              {/* Service Description Section */}
              <div className="px-5 py-6 bg-[#F5F5F5]">
                <p className="text-sm font-semibold mb-2 text-[#121212]">
                  Service Description
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selectedProject.serviceId?.description || 'No description available'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
