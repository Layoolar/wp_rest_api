import React, { FC } from 'react';
import './App.css';
import GraphWidget from './component/GraphWidget';


declare const wp_data: { home_url: string };

const App : FC = () => {
   const { home_url } = wp_data;
    return (
        <div>
            <GraphWidget home_url={home_url} />
        </div>
    );
};

export default App;