'use client';
import { useState, useEffect } from 'react';
import { Eye, Mail, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAllContactSubmissions, useUpdateContactSubmissionStatus } from '../../lib/supabase-hooks';

const ContactSubmissionsClient = () => {
    const { data: submissions, isLoading: loading, error } = useAllContactSubmissions();
    const [localSubmissions, setLocalSubmissions] = useState([]);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { updateContactSubmissionStatus, isLoading: isUpdating } = useUpdateContactSubmissionStatus();

    useEffect(() => {
        if (submissions) {
            const sortedSubmissions = [...submissions].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setLocalSubmissions(sortedSubmissions);
        }
    }, [submissions]);

    const handleUpdateStatus = async (submissionId, newStatus) => {
        const updatedSubmission = await updateContactSubmissionStatus(submissionId, newStatus);
        if (updatedSubmission) {
            setLocalSubmissions(prevSubmissions =>
                prevSubmissions.map(submission =>
                    submission.id === submissionId ? { ...submission, status: newStatus } : submission
                )
            );
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'new':
                return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'read':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'archived':
                return <XCircle className="w-4 h-4 text-red-500" />;
            default:
                return <Mail className="w-4 h-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'new':
                return 'bg-yellow-100 text-yellow-800';
            case 'read':
                return 'bg-green-100 text-green-800';
            case 'archived':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const viewSubmissionDetails = (submission) => {
        setSelectedSubmission(submission);
        setShowModal(true);
        if (submission.status === 'new') {
            handleUpdateStatus(submission.id, 'read');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D6AF66]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 text-red-500">
                <p>Error loading submissions. Please try again later.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Contact Submissions</h2>
                <div className="text-sm text-gray-500">
                    Total Submissions: {localSubmissions.length}
                </div>
            </div>

            {localSubmissions.length === 0 ? (
                <div className="text-center py-12">
                    <Mail className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No submissions yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Submissions will appear here once users start contacting you.
                    </p>
                </div>
            ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {localSubmissions.map((submission) => (
                            <li key={submission.id} className="px-6 py-4 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            {getStatusIcon(submission.status)}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center space-x-2">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {submission.subject}
                                                </p>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                                                    {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                                                </span>
                                            </div>
                                            <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                                                <p>{submission.name}</p>
                                                <p>{submission.email}</p>
                                                <p>{new Date(submission.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => viewSubmissionDetails(submission)}
                                            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D6AF66]"
                                        >
                                            <Eye className="w-4 h-4 mr-1" />
                                            View
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {showModal && selectedSubmission && (
                <SubmissionDetailsModal
                    submission={selectedSubmission}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

const SubmissionDetailsModal = ({ submission, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Submission Details</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Submission Information</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-500">Date:</span>
                                <p className="font-medium">{new Date(submission.created_at).toLocaleString()}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Status:</span>
                                <p className="font-medium capitalize">{submission.status}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Submitter Information</h4>
                        <div className="text-sm space-y-1">
                            <p><span className="text-gray-500">Name:</span> {submission.name}</p>
                            <p><span className="text-gray-500">Email:</span> {submission.email}</p>
                            {submission.phone && <p><span className="text-gray-500">Phone:</span> {submission.phone}</p>}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Message</h4>
                        <div className="text-sm">
                            <p className="font-medium text-gray-800">{submission.subject}</p>
                            <p className="mt-2 text-gray-600 whitespace-pre-wrap">{submission.message}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-[#D6AF66] text-white rounded-md hover:bg-[#C19A5A] focus:outline-none focus:ring-2 focus:ring-[#D6AF66]"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactSubmissionsClient;