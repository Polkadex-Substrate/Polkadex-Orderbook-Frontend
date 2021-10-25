/* eslint-disable */
import { ThemeName } from 'public/charting_library/charting_library.min';
import { colors } from 'src/constants';
import { convertRgbToHex, getStylesValueByKey } from '../helpers';

export const customWidgetParams = {};

export const customWidgetOptions = (colorTheme?: string) => {
  console.log(colorTheme)
    if (colorTheme === 'light') {
        return ({
            toolbar_bg: colors.light.chart.primary,
            loading_screen: {
                backgroundColor: colors.light.chart.primary,
            },
            overrides: {
                ['symbolWatermarkProperties.color']: colors.light.chart.primary,
                ['volumePaneSize']: 'iny',
                ['mainSeriesProperties.candleStyle.upColor']: colors.light.chart.up,
                ['mainSeriesProperties.candleStyle.downColor']: colors.light.chart.down,
                ['mainSeriesProperties.candleStyle.borderUpColor']: colors.light.chart.up,
                ['mainSeriesProperties.candleStyle.borderDownColor']: colors.light.chart.down,
                ['mainSeriesProperties.candleStyle.wickUpColor']: colors.light.chart.up,
                ['mainSeriesProperties.candleStyle.wickDownColor']: colors.light.chart.down,
                ['paneProperties.background']:  colors.light.chart.primary,
                ['paneProperties.vertGridProperties.color']: colors.light.chart.primary,
                ['paneProperties.vertGridProperties.style']: 1,
                ['paneProperties.horzGridProperties.color']: colors.light.chart.primary,
                ['paneProperties.horzGridProperties.style']: 1,
                ['paneProperties.crossHairProperties.color']: colors.light.chart.primary,
                ['paneProperties.crossHairProperties.width']: 1,
                ['paneProperties.crossHairProperties.style']: 1,
                ['scalesProperties.backgroundColor']: colors.light.chart.primary,
            },
            theme: 'Light' as ThemeName,
        });
    }
    const upColor = colors.dark.chart.up
    const downColor = colors.dark.chart.down

    return ({
        toolbar_bg: "#F9FBFC",
        loading_screen: {
            backgroundColor: "#F9FBFC",
        },
        overrides: {
            ['symbolWatermarkProperties.color']: "#F9FBFC",
            ['volumePaneSize']: 'iny',
            ['mainSeriesProperties.candleStyle.upColor']: upColor,
            ['mainSeriesProperties.candleStyle.downColor']: downColor,
            ['mainSeriesProperties.candleStyle.borderUpColor']: upColor,
            ['mainSeriesProperties.candleStyle.borderDownColor']: downColor,
            ['mainSeriesProperties.candleStyle.wickUpColor']: upColor,
            ['mainSeriesProperties.candleStyle.wickDownColor']: downColor,
            ['paneProperties.background']: "#F9FBFC",
            ['paneProperties.vertGridProperties.color']: "#F9FBFC",
            ['paneProperties.vertGridProperties.style']: 1,
            ['paneProperties.horzGridProperties.color']: "#F9FBFC",
            ['paneProperties.horzGridProperties.style']: 1,
            ['paneProperties.crossHairProperties.color']: "#F9FBFC",
            ['paneProperties.crossHairProperties.width']: 1,
            ['paneProperties.crossHairProperties.style']: 1,
            ['scalesProperties.backgroundColor']: "#F9FBFC",
        },
        studies_overrides: {
            ['volume.volume.color.0']: downColor,
            ['volume.volume.color.1']: upColor,
        },
        theme: 'Dark' as ThemeName,
    });
};
