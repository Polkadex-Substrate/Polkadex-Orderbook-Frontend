import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { Chart, ChartCanvas } from "react-stockcharts";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import { fitWidth } from "react-stockcharts/lib/helper";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { AreaSeries, CandlestickSeries, LineSeries } from "react-stockcharts/lib/series";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { last } from "react-stockcharts/lib/utils";

const margin = { left: 0, right: 70, top: 20, bottom: 30 };

const CustomChart = ({
  ratio,
  width,
  data: initialData,
  type = "svg",
  gridProps,
  seriesType = "CandlestickSeries",
}: any) => {
  const height = 400;
  const gridHeight = height - margin.top - margin.bottom;
  const gridWidth = width - margin.left - margin.right;
  const showGrid = true;
  const yGrid = showGrid ? { innerTickSize: -1 * gridWidth } : {};
  const xGrid = showGrid ? { innerTickSize: -1 * gridHeight } : {};
  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => d.date);
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData);

  const start = xAccessor(last(data));
  const end = xAccessor(data[Math.max(0, data.length - 150)]);
  const Series = seriesType === "line" ? LineSeries : CandlestickSeries;

  return (
    <div>
      <ChartCanvas
        ratio={ratio}
        height={400}
        width={width}
        padding={{ right: 0, left: 0, top: 0, bottom: 0 }}
        seriesName="MSFT"
        data={data}
        type={type}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={[start, end]}>
        <Chart id={1} yExtents={(d) => [d.high, d.low]}>
          <XAxis
            tickStroke="#8BA1BE"
            axisAt="bottom"
            orient="bottom"
            stroke="none"
            ticks={10}
            tickStrokeOpacity={0.05}
            {...xGrid}
          />

          <YAxis
            stroke="none"
            tickStroke="white"
            tickStrokeOpacity={0.05}
            axisAt="right"
            orient="right"
            ticks={5}
            {...yGrid}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
            fill="#1c2023"
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
            fill="#1c2023"
          />
          <Series
            wickStroke={(d) => (d.close > d.open ? "#0CA564" : "#E6007A")}
            fill={(d) => (d.close > d.open ? "#0CA564" : "#E6007A")}
            stroke="none"
          />
          <OHLCTooltip
            origin={[-40, 0]}
            textFill="#0CA564"
            labelFill="white"
            fontSize="1.3rem"
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    </div>
  );
};
const fitChart = fitWidth(CustomChart);
export default fitChart;
