import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import api from "../axios";
import "../styles/Statistics.css";

export default function Statistics() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const textColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--text-primary");

    useEffect(() => {
        api.get("/rentals-statistics")
            .then((res) => {
                const chartData = [["Vozilo", "Broj rentiranja"]];
                res.data.forEach((item: any) => {
                    chartData.push([item.vehicle_name, item.total]);
                });
                setData(chartData);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const options = {
        title: "Prikaz udela vozila u ukupnom rentiranju - popularnost vozila",
        is3D: true,
        backgroundColor: "transparent",
        titleTextStyle: { color: textColor, fontSize: 18 },
        pieSliceTextStyle: {
            color: textColor,
            fontSize: 14,
        },
        legend: {
            textStyle: {
                color: textColor,
                fontSize: 14,
            },
        },
    };

    const top5 = [...data.slice(1)].sort((a, b) => b[1] - a[1]).slice(0, 5);

    return (
        <div className="statistikaPage">
            <h1>Statistika poslovanja</h1>
            <hr />
            {loading ? (
                <p>Učitavanje podataka...</p>
            ) : (
                <>
                    <div className="chart-wrapper">
                        <Chart
                            chartType="PieChart"
                            data={data}
                            options={options}
                            width={"100%"}
                            height={"400px"}
                        />
                    </div>

                    <div className="top5-wrapper">
                        <h2>Top 5 najiznajmljivanijih vozila</h2>
                        <table className="top5-table">
                            <thead>
                                <tr>
                                    <th>Redni broj</th>
                                    <th>Vozilo</th>
                                    <th>Broj iznajmljivanja</th>
                                </tr>
                            </thead>
                            <tbody>
                                {top5.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item[0]}</td>
                                        <td>{item[1]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
