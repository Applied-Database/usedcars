import { useEffect } from "react";
import DataViz1 from "../Components/DataViz1";
import DataViz2 from "../Components/DataViz2";
import DataViz3 from "../Components/DataViz3";
import DataViz4 from "../Components/DataViz4";

const Charts = () => {
    return (
        <>
            <div style={{ "width": "100%" }}>
                <DataViz1 />

                <DataViz2 />
                <DataViz3 />
               <DataViz4/>
            </div>

        </>
    )
}
export default Charts;