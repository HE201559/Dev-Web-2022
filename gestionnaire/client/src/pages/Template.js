import React from 'react';
import Navigation from "../component/Navigation";
import secureLocalStorage from "react-secure-storage";

const Template = () => {
    return (
        <div>
            <Navigation />
            hello
            <br />
            test : {secureLocalStorage.getItem("secureBiblioId")}
        </div>
    );
};

export default Template;