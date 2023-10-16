import React from 'react';

const LoadingSpinner:React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full border-t-[6px] border-gray-700 h-24 w-24"></div>
        </div>
    );
};

export default LoadingSpinner;
