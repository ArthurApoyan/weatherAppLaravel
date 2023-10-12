import React from 'react';
import 'tailwindcss/tailwind.css';

const Home:React.FC = () => {
    return (
        <div>
            <h2 className="text-5xl text-center mt-[10%]">Welcome to free weather app, based on Open Weather API.</h2>
            <h2 className="text-5xl text-center mt-[10%]">Find information about weather in every place in the world that you want!</h2>
        </div>
    );
};

export default Home;
