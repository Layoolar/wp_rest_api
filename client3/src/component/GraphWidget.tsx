import React, { FC, useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import Select from './constants/Select';


interface Props {
  home_url: string;
}

interface DataPoint {
  date: string;
  visitors: number;
  clicks: number;
}

interface ResponseData {
  [key: string]: DataPoint;
}

const GraphWidget: FC<Props> = (props) => {
  const { home_url } = props;
  const [data, setData] = useState<DataPoint[]>([]);
  const [duration, setDuration] = useState<string>('7');

useEffect(() => {
  const fetchData = async () => {
  const response = await axios.get<ResponseData>(`${home_url}/wp-json/graph-widget/v1/sample-data/${duration}`);
  const data = JSON.parse(response.data as any);
  setData(Object.values(data));
}
    fetchData();
  }, [duration]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(event.target.value);
  };

  return (
    <div>
      <div className="graph-widget">
        <Select handleChange={handleChange} value={duration} />
      </div>
      <LineChart width={500} height={300} data={data} style={{marginTop: '50px'}}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="visitors" stroke="#8884d8" />
        <Line type="monotone" dataKey="clicks" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default GraphWidget;
