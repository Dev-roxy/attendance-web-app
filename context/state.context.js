import React from "react";
import { createContext } from "react";
import { useState } from "react";

const [isModalOpen, setIsModalOpen] = useState(false);

export const popUpStateContext = createContext(
    {
        isModalOpen: false,
        setIsModalOpen: () => {},
    }
);
