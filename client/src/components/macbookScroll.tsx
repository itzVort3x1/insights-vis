import React from "react";
import { MacbookScroll } from "./ui/macbook-scroll";

interface apodProps {
    url: string;
    title: string;
}

interface MacbookScrollDemoProps {
    apod?: apodProps;
}

export function MacbookScrollDemo({ apod }: MacbookScrollDemoProps) {
    return (
        <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
            <MacbookScroll
                title={
                    <div className="text-center py-6">
                        <h1 className="text-3xl md:text-5xl font-bold text-white bg-gradient-to-r from-purple-500 to-violet-800 inline-block px-6 py-2 rounded-lg shadow-lg">
                            Astronomy Picture of the Day
                        </h1>
                        <p className="text-gray-300 text-sm md:text-lg mt-2">
                            Explore the wonders of the universe with NASA’s
                            daily space image.
                        </p>
                        <h1 className="mt-10">{apod?.title}</h1>
                    </div>
                }
                src={apod?.url}
                showGradient={false}
            />
        </div>
    );
}
