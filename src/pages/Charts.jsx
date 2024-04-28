import { useEffect } from "react";
import DataViz1 from "../Components/DataViz1";
import DataViz2 from "../Components/DataViz2";

const Charts = () => {
    return (
        <div style={{"width":"100%" }}>
            <DataViz1 />

            <DataViz2 />
        </div>
    )
}
export default Charts;