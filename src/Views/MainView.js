import React, {useEffect, useState} from 'react';
import {withStyles} from "@material-ui/core";
import styles from "./styles";
import DocsPage from "@material-docs/core/components/DocsPage";
import H2 from "@material-docs/core/components/H2";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    BarChart,
    Bar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar, Cell
} from "recharts";
import sendRequest from "../utils/sendRequest";
import clsx from "clsx";

const RenderJobsDetailsView = React.forwardRef((props, ref) => {
    const {
        classes,
        className,
    } = props;

    const [oxygenSensor, setOxygenSensor] = useState();
    const [averageOxygenSensor, setAverageOxygenSensor] = useState();
    const [pieChartOxygenSensor, setPieChartOxygenSensor] = useState();
    const [tempSensor, setTempSensor] = useState();
    const [averageTempSensor, setAverageTempSensor] = useState();
    const [pieChartTempSensor, setPieChartTempSensor] = useState();
    const [smokeSensor, setSmokeSensor] = useState();
    const [averageSmokeSensor, setAverageSmokeSensor] = useState();

    const sensorOxygenUrl = "https://iot-coursework.onrender.com/api/v1/sensors/data?type=oxygen";
    const sensorTempUrl = "https://iot-coursework.onrender.com/api/v1/sensors/data?type=temp";
    const sensorSmokeUrl = "https://iot-coursework.onrender.com/api/v1/sensors/data?type=smoke";

    const fetchData = () => {
        sendRequest(sensorOxygenUrl, 'GET').then((result) => {
            const data = [...result.data]
            const counters = {low: 0, normal: 0, high :0};

            data.forEach(d => {
                const date = new Date(d.timestamp)
                d.timestamp = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

                if(d.value < 15) {
                    counters.low += 1;
                } else if (d.value > 15 && d.value < 25) {
                    counters.normal += 1;
                } else {
                    counters.high += 1;
                }
            });

            const pieChartData = [
                {
                    name: '% низького рівня оксигену',
                    value: Math.round((counters.low / data.length) * 100)
                },
                {
                    name: '% нормального рівня оксигену',
                    value: Math.round((counters.normal / data.length) * 100)
                },
                {
                    name: '% високого рівня оксигену',
                    value: Math.round((counters.high / data.length) * 100)
                },
            ];

            const averageValue = data.reduce((previousValue, currentValue) => previousValue + currentValue.value, 0) / data.length;
            const averageData = [
                {
                    name: 'середнє значення',
                    value: averageValue
                },
                {
                    name: 'нормальне значення',
                    value: 21
                },
            ];

            setOxygenSensor(data);
            setAverageOxygenSensor(averageData);
            setPieChartOxygenSensor(pieChartData);
        });

        sendRequest(sensorTempUrl, 'GET').then((result) => {
            const data = [...result.data]
            const counters = {low: 0, normal: 0, high :0};

            data.forEach(d => {
                const date = new Date(d.timestamp)
                d.timestamp = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

                if(d.value < 15) {
                    counters.low += 1;
                } else if (d.value > 15 && d.value < 25) {
                    counters.normal += 1;
                } else {
                    counters.high += 1;
                }
            })

            const pieChartData = [
                {
                    name: '% низької температури',
                    value: Math.round((counters.low / data.length) * 100)
                },
                {
                    name: '% нормальної температури',
                    value: Math.round((counters.normal / data.length) * 100)
                },
                {
                    name: '% високої температури',
                    value: Math.round((counters.high / data.length) * 100)
                },
            ];

            const averageValue = data.reduce((previousValue, currentValue) => previousValue + currentValue.value, 0) / data.length;
            const averageData = [
                {
                    name: 'середнє значення',
                    value: averageValue
                },
                {
                    name: 'нормальне значення',
                    value: 19
                },
            ];

            setTempSensor(data);
            setAverageTempSensor(averageData);
            setPieChartTempSensor(pieChartData);
        });

        sendRequest(sensorSmokeUrl, 'GET').then((result) => {
            const data = [...result.data]
            data.forEach(d => {
                const date = new Date(d.timestamp)
                d.timestamp = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            })

            const averageValue = data.reduce((previousValue, currentValue) => previousValue + currentValue.value, 0) / data.length;
            const averageData = [
                {
                    name: 'average value',
                    value: averageValue
                },
                {
                    name: 'normal value',
                    value: 15
                },
            ];
            setSmokeSensor(data);
            setAverageSmokeSensor(averageData);
        });
    }

    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        },600000)

        return ()=> clearInterval(interval)
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <DocsPage name="Графіки сенсорів" searchDescription="Graphs of sensors">
            <H2>Графік змін рівня оксигену</H2>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={oxygenSensor}>
                    <CartesianGrid strokeDasharray="2 2"/>
                    <XAxis dataKey="timestamp" minTickGap={50}/>
                    <YAxis/>
                    <Tooltip/>
                    <Line dot={false} type="monotone" dataKey="value" stroke="#8884d8"/>
                </LineChart>
            </ResponsiveContainer>

            <H2>Графік зміни температури</H2>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={tempSensor}>
                    <CartesianGrid strokeDasharray="2 2"/>
                    <XAxis dataKey="timestamp" minTickGap={50}/>
                    <YAxis/>
                    <Tooltip/>
                    <Line dot={false} type="monotone" dataKey="value" stroke="#8884d8"/>
                </LineChart>
            </ResponsiveContainer>

            <H2>Графік задимлення</H2>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={smokeSensor}>
                    <CartesianGrid strokeDasharray="2 2"/>
                    <XAxis dataKey="timestamp" minTickGap={50}/>
                    <YAxis/>
                    <Tooltip/>
                    <Line dot={false} type="monotone" dataKey="value" stroke="#8884d8"/>
                </LineChart>
            </ResponsiveContainer>

            <H2>Порівняння середнього значення оксигену з нормальним</H2>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={averageOxygenSensor}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

            <H2>Порівняння середньої температури з нормальною</H2>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={averageTempSensor}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

            <H2>Діаграма відсоткового розподілення значень рівня оксигену</H2>

            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie data={pieChartOxygenSensor} dataKey="value" outerRadius={150} fill="#8884d8" label>
                        {pieChartOxygenSensor && pieChartOxygenSensor.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>

            <H2>Діаграма відсоткового розподілення значень температури</H2>

            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie data={pieChartTempSensor} dataKey="value" outerRadius={150} fill="#8884d8" label>
                        {pieChartTempSensor && pieChartTempSensor.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </DocsPage>
    );
});
RenderJobsDetailsView.displayName = "RenderJobsDetailsView";
RenderJobsDetailsView.propTypes = {}

export default withStyles(styles)(RenderJobsDetailsView);