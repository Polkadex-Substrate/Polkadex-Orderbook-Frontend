import { checkCoordinateOnSegment } from "klinecharts/lib/shape/segment";

import { defaultThemes } from "src/styles";
export const chartType = [
  {
    key: "candle_solid",
    name: "Candles Solid",
    icon: "CandleStroke",
  },
  {
    key: "candle_stroke",
    name: "Candles Stroke",
    icon: "Candle",
  },
  {
    key: "area",
    name: "Area",
    icon: "Area",
  },
];
export const options = (isDarkTheme = true) => {
  const theme = isDarkTheme ? defaultThemes.dark : defaultThemes.light;
  return {
    grid: {
      show: true,
      horizontal: {
        show: true,
        size: 1,
        color: theme.colors.secondaryBackgroundOpacity,
        // 'solid'|'dash'
        style: "dash",
        dashValue: [2, 2],
      },
      vertical: {
        show: true,
        size: 1,
        color: theme.colors.secondaryBackgroundOpacity,
        // 'solid'|'dash'
        style: "dash",
        dashValue: [2, 2],
      },
    },
    candle: {
      margin: {
        top: 0.2,
        bottom: 0.1,
      },
      // 'candle_solid'|'candle_stroke'|'candle_up_stroke'|'candle_down_stroke'|'ohlc'|'area'
      type: "candle_solid",
      bar: {
        upColor: theme.colors.green,
        downColor: theme.colors.primary,
        noChangeColor: theme.colors.secondaryBackground,
      },
      area: {
        lineSize: 2,
        lineColor: "#2196F3",
        value: "close",
        backgroundColor: [
          {
            offset: 0,
            color: "rgba(33, 150, 243, 0.01)",
          },
          {
            offset: 1,
            color: "rgba(33, 150, 243, 0.2)",
          },
        ],
      },
      priceMark: {
        show: true,
        high: {
          show: true,
          color: theme.colors.text,
          textMargin: 5,
          textSize: 10,
          textFamily: theme.font.family,
          textWeight: "normal",
        },
        low: {
          show: true,
          color: theme.colors.text,
          textMargin: 5,
          textSize: 10,
          textFamily: theme.font.family,
          textWeight: "normal",
        },
        last: {
          show: true,
          upColor: theme.colors.green,
          downColor: theme.colors.primary,
          noChangeColor: theme.colors.secondaryBackground,
          line: {
            show: true,
            // 'solid'|'dash'
            style: "dash",
            dashValue: [4, 4],
            size: 1,
          },
          text: {
            show: true,
            size: 12,
            paddingLeft: 2,
            paddingTop: 2,
            paddingRight: 2,
            paddingBottom: 2,
            color: theme.colors.white,
            family: theme.font.family,
            weight: "normal",
            borderRadius: 2,
          },
        },
      },
      tooltip: {
        // 'always' | 'follow_cross' | 'none'
        showRule: "always",
        // 'standard' | 'rect'
        showType: "standard",
        labels: ["Time: ", "Open: ", "Close: ", "High: ", "Low: ", "Volume: "],
        values: null,
        defaultValue: "n/a",
        rect: {
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 6,
          offsetLeft: 8,
          offsetTop: 8,
          offsetRight: 8,
          borderRadius: 4,
          borderSize: 1,
          borderColor: "#3f4254",
          backgroundColor: "rgba(17, 17, 17, .3)",
        },
        text: {
          size: 12,
          family: theme.font.family,
          weight: "500",
          color: theme.colors.text,
          marginLeft: 8,
          marginTop: 6,
          marginRight: 8,
          marginBottom: 0,
        },
      },
    },
    technicalIndicator: {
      margin: {
        top: 0.2,
        bottom: 0.1,
      },
      bar: {
        upColor: `${theme.colors.green}7F`,
        downColor: `${theme.colors.primary}7F`,
        noChangeColor: `${theme.colors.secondaryText}7F`,
      },
      line: {
        size: 1,
        colors: ["#FF9600", "#9D65C9", "#2196F3", "#E6007A", "#01C5C4"],
      },
      circle: {
        upColor: theme.colors.green,
        downColor: theme.colors.primary,
        noChangeColor: theme.colors.secondaryBackground,
      },
      lastValueMark: {
        show: false,
        text: {
          show: false,
          color: "#ffffff",
          size: 12,
          family: theme.font.family,
          weight: "normal",
          paddingLeft: 3,
          paddingTop: 2,
          paddingRight: 3,
          paddingBottom: 2,
          borderRadius: 2,
        },
      },
      tooltip: {
        // 'always' | 'follow_cross' | 'none'
        showRule: "always",
        // 'standard' | 'rect'
        showType: "standard",
        showName: true,
        showParams: true,
        defaultValue: "n/a",
        text: {
          size: 11,
          family: theme.font.family,
          weight: "normal",
          color: theme.colors.text,
          marginTop: 6,
          marginRight: 8,
          marginBottom: 0,
          marginLeft: 8,
        },
      },
    },
    xAxis: {
      show: true,
      height: null,
      axisLine: {
        show: true,
        color: theme.colors.secondaryBackground,
        size: 1,
      },
      tickText: {
        show: true,
        color: theme.colors.secondaryText,
        family: theme.font.family,
        weight: "normal",
        size: 12,
        paddingTop: 3,
        paddingBottom: 6,
      },
      tickLine: {
        show: true,
        size: 1,
        length: 3,
        color: "#888888",
      },
    },
    yAxis: {
      show: true,
      width: null,
      // 'left' | 'right'
      position: "right",
      // 'normal' | 'percentage' | 'log'
      type: "normal",
      inside: false,
      reverse: false,
      axisLine: {
        show: true,
        color: theme.colors.secondaryBackground,
        size: 1,
      },
      tickText: {
        show: true,
        color: theme.colors.secondaryText,
        family: theme.font.family,
        weight: "normal",
        size: 12,
        paddingLeft: 3,
        paddingRight: 6,
      },
      tickLine: {
        show: true,
        size: 1,
        length: 3,
        color: "#888888",
      },
    },
    separator: {
      size: 1,
      color: theme.colors.secondaryBackground,
      fill: true,
      activeBackgroundColor: "rgba(230, 230, 230, .15)",
    },
    crosshair: {
      show: true,
      horizontal: {
        show: true,
        line: {
          show: true,
          // 'solid'|'dash'
          style: "dash",
          dashValue: [4, 2],
          size: 1,
          color: "#888888",
        },
        text: {
          show: true,
          color: theme.colors.white,
          size: 12,
          family: theme.font.family,
          weight: "normal",
          paddingLeft: 2,
          paddingRight: 2,
          paddingTop: 2,
          paddingBottom: 2,
          borderSize: 1,
          borderColor: "#505050",
          borderRadius: 2,
          backgroundColor: "#505050",
        },
      },
      vertical: {
        show: true,
        line: {
          show: true,
          // 'solid'|'dash'
          style: "dash",
          dashValue: [4, 2],
          size: 1,
          color: "#888888",
        },
        text: {
          show: true,
          color: theme.colors.text,
          size: 12,
          family: theme.font.family,
          weight: "normal",
          paddingLeft: 2,
          paddingRight: 2,
          paddingTop: 2,
          paddingBottom: 2,
          borderSize: 1,
          borderColor: "#505050",
          borderRadius: 2,
          backgroundColor: "#505050",
        },
      },
    },
    shape: {
      point: {
        backgroundColor: "#2196F3",
        borderColor: "#2196F3",
        borderSize: 1,
        radius: 4,
        activeBackgroundColor: "#2196F3",
        activeBorderColor: "#2196F3",
        activeBorderSize: 1,
        activeRadius: 6,
      },
      line: {
        // 'solid'|'dash'
        style: "solid",
        color: "#2196F3",
        size: 1,
        dashValue: [2, 2],
      },
      polygon: {
        // 'stroke'|'fill'
        style: "stroke",
        stroke: {
          // 'solid'|'dash'
          style: "solid",
          size: 1,
          color: "#2196F3",
          dashValue: [2, 2],
        },
        fill: {
          color: "rgba(33, 150, 243, 0.1)",
        },
      },
      arc: {
        // 'stroke'|'fill'
        style: "stroke",
        stroke: {
          // 'solid'|'dash'
          style: "solid",
          size: 1,
          color: "#2196F3",
          dashValue: [2, 2],
        },
        fill: {
          color: "#2196F3",
        },
      },
      text: {
        style: "fill",
        color: "#2196F3",
        size: 12,
        family: theme.font.family,
        weight: "normal",
        offset: [0, 0],
      },
    },
    annotation: {
      // 'top' | 'bottom' | 'point'
      position: "top",
      offset: [20, 0],
      symbol: {
        // 'diamond' | 'circle' | 'rect' | 'triangle' | 'custom' | 'none'
        type: "diamond",
        size: 8,
        color: "#2196F3",
        activeSize: 10,
        activeColor: "#FF9600",
      },
    },
    tag: {
      // 'top' | 'bottom' | 'point'
      position: "point",
      offset: 0,
      line: {
        show: true,
        dashValue: [4, 2],
        size: 1,
        color: "#2196F3",
      },
      text: {
        color: "#FFFFFF",
        backgroundColor: "#2196F3",
        size: 12,
        family: theme.font.family,
        weight: "normal",
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 2,
        borderSize: 1,
        borderColor: "#2196F3",
      },
      mark: {
        offset: 0,
        color: "#FFFFFF",
        backgroundColor: "#2196F3",
        size: 12,
        family: theme.font.family,
        weight: "normal",
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 2,
        borderSize: 1,
        borderColor: "#2196F3",
      },
    },
  };
};

export const tools = [
  {
    key: "horizontalRayLine",
    iconName: "OriginalChartSingleLine",
    toolName: "Horizontal Ray Line",
  },
  {
    key: "horizontalSegment",
    iconName: "OriginalChartSingleLineSpaceAround",
    toolName: "Horizontal Segment",
  },
  // { key: "horizontalStraightLine", iconName: "OriginalChartSingleLineSpaceBetween" },
  {
    key: "verticalRayLine",
    iconName: "OriginalChartSingleLineVertical",
    toolName: "Vertical Ray Line",
  },
  {
    key: "verticalSegment",
    iconName: "OriginalChartSingleLineSpaceAroundVertical",
    toolName: "Vertical Segment",
  },
  // { key: "verticalStraightLine", iconName: "OriginalChartSingleLineSpaceBetweenVertical" },
  { key: "rayLine", iconName: "OriginalChartSingleLineInclined", toolName: "Ray Line" },
  {
    key: "segment",
    iconName: "OriginalChartSingleLineSpaceAroundInclined",
    toolName: "Segment",
  },
  // { key: "straightLine", iconName: "OriginalChartSingleLineSpaceBetweenInclined" },
  { key: "priceLine", iconName: "OriginalChartSingleLineNumber", toolName: "Price Line" },
  {
    key: "priceChannelLine",
    iconName: "OriginalChartDoubleLine",
    toolName: "Price Channel Line",
  },
  {
    key: "parallelStraightLine",
    iconName: "OriginalChartTripleLine",
    toolName: "Parallel Straight Line",
  },
  {
    key: "fibonacciLine",
    iconName: "OriginalChartQuaternaryLine",
    toolName: "Fibonacci Line",
  },
];

export const rect = {
  name: "rect",
  totalStep: 3,
  checkMousePointOn: (key, type, points, mousePoint) => {
    return checkCoordinateOnSegment(points[0], points[1], mousePoint);
  },
  createGraphicDataSource: (step, tpPoint, xyPoints) => {
    if (xyPoints.length === 2) {
      return [
        {
          type: "line",
          isDraw: false,
          isCheck: true,
          dataSource: [
            [{ ...xyPoints[0] }, { x: xyPoints[1].x, y: xyPoints[0].y }],
            [{ x: xyPoints[1].x, y: xyPoints[0].y }, { ...xyPoints[1] }],
            [{ ...xyPoints[1] }, { x: xyPoints[0].x, y: xyPoints[1].y }],
            [{ x: xyPoints[0].x, y: xyPoints[1].y }, { ...xyPoints[0] }],
          ],
        },
        {
          type: "polygon",
          isDraw: true,
          isCheck: false,
          style: "fill",
          dataSource: [
            [
              { ...xyPoints[0] },
              { x: xyPoints[1].x, y: xyPoints[0].y },
              { ...xyPoints[1] },
              { x: xyPoints[0].x, y: xyPoints[1].y },
            ],
          ],
        },
        {
          type: "polygon",
          isDraw: true,
          isCheck: false,
          dataSource: [
            [
              { ...xyPoints[0] },
              { x: xyPoints[1].x, y: xyPoints[0].y },
              { ...xyPoints[1] },
              { x: xyPoints[0].x, y: xyPoints[1].y },
            ],
          ],
        },
      ];
    }
    return [];
  },
};

export const circle = {
  name: "circle",
  totalStep: 3,
  checkMousePointOn: (key, type, points, mousePoint) => {
    const xDis = Math.abs(points.x - mousePoint.x);
    const yDis = Math.abs(points.y - mousePoint.y);
    const r = Math.sqrt(xDis * xDis + yDis * yDis);
    return Math.abs(r - points.radius) < 3;
  },
  createGraphicDataSource: (step, tpPoint, xyPoints) => {
    if (xyPoints.length === 2) {
      const xDis = Math.abs(xyPoints[0].x - xyPoints[1].x);
      const yDis = Math.abs(xyPoints[0].y - xyPoints[1].y);
      const radius = Math.sqrt(xDis * xDis + yDis * yDis);
      return [
        {
          type: "arc",
          isDraw: true,
          isCheck: false,
          style: "fill",
          dataSource: [{ ...xyPoints[0], radius, startAngle: 0, endAngle: Math.PI * 2 }],
        },
        {
          type: "arc",
          isDraw: true,
          isCheck: true,
          dataSource: [{ ...xyPoints[0], radius, startAngle: 0, endAngle: Math.PI * 2 }],
        },
      ];
    }
    return [];
  },
};

export const mainTechnicalIndicatorTypes = [
  { key: "MA", name: "MA(Moving Average)", isActive: false },
  { key: "EMA", name: "EMA(Exponential Moving Average)", isActive: false },
  { key: "SMA", name: "SMA", isActive: false },
  { key: "SAR", name: "SAR(Stop and Reverse)", isActive: false },
  { key: "BOLL", name: "BOLL(Bolinger Bands)", isActive: false },
  { key: "BBI", name: "BBI(Bull And Bear Index)", isActive: false },
];

export const subTechnicalIndicatorTypes = [
  { key: "VOL", name: "VOL(Volume)", isActive: true },
  { key: "MACD", name: "MACD(Moving Average Convergence / Divergence)", isActive: false },
  { key: "KDj", name: "KDJ(KDJ Index)", isActive: false },
  { key: "RSI", name: "RSI(Relative Strength Index)", isActive: false },
  { key: "BIAS", name: "BIAS(Bias Ratio)", isActive: false },
  { key: "BRAR", name: "BRAR", isActive: false },
  { key: "CCI", name: "CCI(Commodity Channel Index)", isActive: false },
  { key: "DMI", name: "DMI(Directional Movement Index)", isActive: false },
  { key: "CR", name: "CR", isActive: false },
  { key: "PSY", name: "PSY(Psychological Line)", isActive: false },
  { key: "DMA", name: "DMA(Different of Moving Average)", isActive: false },
  { key: "OBV", name: "OBV(On Balance Volume)", isActive: false },
  { key: "TRIX", name: "TRIX(Triple Exponentially Smoothed Moving Average)", isActive: false },
  { key: "VR", name: "VR(Volatility Volume Ratio)", isActive: false },
  { key: "MTM", name: "MTM(Momentum Index)", isActive: false },
  { key: "EMV", name: "EMV(Ease of Movement Value)", isActive: false },
  { key: "SAR", name: "SAR(Stop and Reverse)", isActive: false },
  { key: "ROC", name: "ROC(Price Rate of Change)", isActive: false },
  { key: "PVT", name: "PVT(Price and Volume Trend)", isActive: false },
  { key: "BBI", name: "BBI(Bull And Bear Index)", isActive: false },
  { key: "AO", name: "AO(Awesome Oscillator)", isActive: false },
];
