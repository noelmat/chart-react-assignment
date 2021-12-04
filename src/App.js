import { useEffect } from 'react';
import { getChartData } from './services/api.service';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

import { useSelector, useDispatch} from 'react-redux';
import { setData } from "./redux/chartSlice";
import Chart from "./Chart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);


function App() {

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.chart || {});
  
  useEffect(()=>{
    
    getChartData()
      .then((res) => {
        dispatch(setData(res.data));
        return Promise.resolve();
      })
      .catch(err => {
        console.log(err);
      })
  },[])

  return (
    <div className="App">
      <header className="App-header">         
          {data?.map((val, idx) => 
            <Chart 
              key={idx}
              val={val}
              idx={idx}
            />
          )}
      </header>
    </div>
  );
}

export default App;
