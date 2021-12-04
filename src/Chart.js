import React, {useRef} from 'react';
import { Bar, Pie, getElementAtEvent } from "react-chartjs-2";
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { changeData } from './redux/chartSlice';

const ChartWrapper = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
`;
const ChartSidebar = styled.div`
    flex-basis: 30%;
    width: 400px;
`;
const ChartDisplay = styled.div`
    flex-basis: 70%;
    max-width: 600px;
    align-items: center;
    justify-content: center;
`;

const DataWrapper = styled.div`
    display: flex; 
    flex-direction: column;
`;
const DataInput = styled.input`
    width: 50px;
`;

const getRandomIntensity = (max=255, min=0) =>{
    return Math.max(Math.floor(Math.random() * max), min);
}
  
const getRandomColor = () => {
    return `rgba(${getRandomIntensity()},${getRandomIntensity()},${getRandomIntensity()}, ${getRandomIntensity(0.7, 0.5)})`
}

const chartType = {
    "bar": Bar,
    "pie": Pie,
}
  
function Chart({val, idx}) {

    const chartRef = useRef(null);

    /**
     * chart events
     */

    const dispatch = useDispatch();

    const printElementAtEvent = (element) => {
        if (!element.length) return;
        // console.log(element);

        const { datasetIndex, index } = element[0];
        console.log(datasetIndex, index);
    };

    const Chart = chartType[val?.type.toLowerCase()];
    const options = {
        // responsive: false,
        // maintainAspectRatio : false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Chart ${idx + 1} : ${val?.type}`,
            },
        },
    };
    const onClick = (event) => {
        const { current: chart } = chartRef;
    
        if (!chart) {
        return;
        }
        console.log(chart);
        printElementAtEvent(getElementAtEvent(chart, event));
    };

    const onChange = (event, elIdx) =>{
        const value = event.target.value;
        dispatch(changeData({ 
            chartIdx: idx,
            elIdx,
            value,
        }))
    }
    return (
        <ChartWrapper>
        <ChartSidebar> 
            Data: 
            <DataWrapper>
                {val.elements.map((el,elIdx) => (
                    <DataInput type="number" value={el} onChange={(e) => onChange(e, elIdx)}></DataInput>
                ))}
            </DataWrapper>

        </ChartSidebar>
        <ChartDisplay>
            <Chart
                ref={chartRef}
                options={options}
                onClick={onClick}
                key={idx}
                data={{
                    labels : [...val.elements],
                    datasets: [
                        {
                            data: [...val.elements], 
                            label: `chart-${idx}`,
                            backgroundColor: val.elements.map(() => getRandomColor()),
                            borderWidth: 1
                        }
                    ]
                }}
            >
            
            </Chart>
        </ChartDisplay>
        </ChartWrapper>
      )

}

export default Chart;