import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

interface CharProps{
    coinId: string;
}
interface IHistorical{
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}
function Chart({coinId}:CharProps){
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv",coinId], () => fetchCoinHistory(coinId));
    const isDark = useRecoilState(isDarkAtom);
    return (
        <div>
            {isLoading ? (
                "loading"
            ) : (
                <ApexChart
                    type="line"
                    series={[
                        {
                        name: "Price",
                        data: data?.map((price) => price.close) as number[],
                        },
                    ]}
                    options={{
                        theme: {
                        mode: "dark",
                        },
                        chart: {
                        height: 300,
                        width: 500,
                        toolbar: {
                            show: false,
                        },
                        background: "transparent",
                        },
                        grid: { show: false },
                        stroke: {
                        curve: "smooth",
                        width: 4,
                        },
                        yaxis: {
                        show: false,
                        },
                        xaxis: {
                        axisBorder: { show: false },
                        axisTicks: { show: false },
                        labels: { show: false },
                        },
                    }}
                />
            )}
        </div>
    )
}
export default Chart;

