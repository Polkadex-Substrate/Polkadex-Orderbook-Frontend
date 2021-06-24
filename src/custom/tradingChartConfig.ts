/* eslint-disable */
import { ThemeName } from '../charting_library/charting_library.min';
import {defaultThemes} from "src/styles"
export const customWidgetParams = {};

export const customWidgetOptions = (colorTheme?: string) => {
    if (colorTheme === 'light') {
        return ({
            toolbar_bg: defaultThemes.dark.colors.primaryBackground,
            loading_screen: {
                backgroundColor: defaultThemes.dark.colors.primaryBackground,
            },
            overrides: {
                ['symbolWatermarkProperties.color']: defaultThemes.light.colors.primaryBackground,
                ['volumePaneSize']: 'iny',
                ['mainSeriesProperties.candleStyle.upColor']: defaultThemes.light.colors.primary,
                ['mainSeriesProperties.candleStyle.downColor']: defaultThemes.light.colors.green,
                ['mainSeriesProperties.candleStyle.borderUpColor']: defaultThemes.light.colors.primary,
                ['mainSeriesProperties.candleStyle.borderDownColor']: defaultThemes.light.colors.green,
                ['mainSeriesProperties.candleStyle.wickUpColor']: defaultThemes.light.colors.primary,
                ['mainSeriesProperties.candleStyle.wickDownColor']: defaultThemes.light.colors.green,
                ['paneProperties.background']:  defaultThemes.light.colors.primaryBackground,
                ['paneProperties.vertGridProperties.color']: defaultThemes.light.colors.primaryBackground,
                ['paneProperties.vertGridProperties.style']: 1,
                ['paneProperties.horzGridProperties.color']: defaultThemes.light.colors.primaryBackground,
                ['paneProperties.horzGridProperties.style']: 1,
                ['paneProperties.crossHairProperties.color']: defaultThemes.light.colors.primaryBackground,
                ['paneProperties.crossHairProperties.width']: 1,
                ['paneProperties.crossHairProperties.style']: 1,
                ['scalesProperties.backgroundColor']: defaultThemes.light.colors.primaryBackground,
            },
            theme: 'Light' as ThemeName,
        });
    }

    const primaryColor = defaultThemes.dark.colors.gradientBackground;
    const upColor =  defaultThemes.dark.colors.primary;
    const downColor =defaultThemes.dark.colors.green;

    return ({
        toolbar_bg: primaryColor,
        loading_screen: {
            backgroundColor: primaryColor,
        },
        overrides: {
            ['symbolWatermarkProperties.color']: primaryColor,
            ['volumePaneSize']: 'iny',
            ['mainSeriesProperties.candleStyle.upColor']: upColor,
            ['mainSeriesProperties.candleStyle.downColor']: downColor,
            ['mainSeriesProperties.candleStyle.borderUpColor']: upColor,
            ['mainSeriesProperties.candleStyle.borderDownColor']: downColor,
            ['mainSeriesProperties.candleStyle.wickUpColor']: upColor,
            ['mainSeriesProperties.candleStyle.wickDownColor']: downColor,
            ['paneProperties.background']: primaryColor,
            ['paneProperties.vertGridProperties.color']: primaryColor,
            ['paneProperties.vertGridProperties.style']: 1,
            ['paneProperties.horzGridProperties.color']: primaryColor,
            ['paneProperties.horzGridProperties.style']: 1,
            ['paneProperties.crossHairProperties.color']: primaryColor,
            ['paneProperties.crossHairProperties.width']: 1,
            ['paneProperties.crossHairProperties.style']: 1,
            ['scalesProperties.backgroundColor']: primaryColor,
        },
        studies_overrides: {
            ['volume.volume.color.0']: downColor,
            ['volume.volume.color.1']: upColor,
        },
        theme: 'Dark' as ThemeName,
    });
};
