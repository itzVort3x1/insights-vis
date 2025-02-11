import React, { FC } from "react";

interface HelloProps {
    name: string;
}

const Hello: FC<HelloProps> = ({ name }) => {
    return <h1>Hello, {name}!</h1>;
};

export default Hello;
