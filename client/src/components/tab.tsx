import React from "react";
import { Tabs } from "./ui/Tabs";

interface TabsDemoProps {
    apod?: any;
}

const TabsDemo = ({ apod }: TabsDemoProps) => {
    const tabs = [
        {
            title: "APOD",
            value: "product",
            content: (
                <div className="w-full h-full md:h-full overflow-hidden relative rounded-2xl text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900 group">
                    {/* Background Image */}
                    <img
                        src={apod.url ?? ""}
                        alt="APOD image"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Overlay for better text visibility */}
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                    {/* Title */}
                    <p className="absolute top-4 left-4 z-10">{apod.title}</p>

                    {/* Hidden Explanation (Slides Up on Hover) */}
                    <div
                        className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 p-4 text-white text-base transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 
        max-h-60 md:max-h-12 sm:max-h-12 overflow-y-auto scrollbar-hide"
                    >
                        <p>{apod.explanation}</p>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col py-10 px-10 w-full items-start justify-start">
            <Tabs tabs={tabs} />
        </div>
    );
};

export default TabsDemo;
