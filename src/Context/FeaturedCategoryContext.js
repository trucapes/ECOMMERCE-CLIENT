import { createContext } from "react";

import menFashion from '../asset/Products/cloth/men/outdoor6.jpg'
import womenFashion from '../asset/Products/cloth/women/landscape.jpg'
import kidsFashion from '../asset/Products/cloth/kids/deck.jpeg'

export const FeatureCategoryContext = createContext([
    {
        name: "Men's Fashion",
        image: menFashion,
        url: '/category/men',
        id: 1
    },
    {
        name: "Women's Fashion",
        image: womenFashion,
        url: '/category/women',
        id: 2
    },
    {
        name: "Kids Fashion",
        image: kidsFashion,
        url: '/category/kids',
        id: 3
    }
])