import { configureStore } from "@reduxjs/toolkit";
import chartSlice from "./chartSlice";

export default configureStore({
    reducer: {
        chart: chartSlice
    },
})