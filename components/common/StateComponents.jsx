'use client';

export const LoadingState = () => (
    <div className="w-full h-64 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main-primary-buttons"></div>
            <p className="text-gray-600">Loading...</p>
        </div>
    </div>
);

export const ErrorState = ({ message = "Something went wrong. Please try again." }) => (
    <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center space-y-4">
            <div className="text-red-500">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <p className="text-gray-600">{message}</p>
            <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-main-primary-buttons text-white rounded-lg hover:bg-opacity-90"
            >
                Try Again
            </button>
        </div>
    </div>
);

export const NoDataState = ({ message = "No data found" }) => (
    <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center space-y-4">
            <div className="text-gray-400">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
            </div>
            <p className="text-gray-600">{message}</p>
        </div>
    </div>
);
