import React, { useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { transformDataForXYChart } from "./TransformData";
am4core.useTheme(am4themes_animated);
const XYChart = ({
  data,
  type,
  dataFieldsValue,
  dataFieldsCategory,
  title,
}) => {
  const chart = useRef(null);

  useLayoutEffect(() => {
    let xyChart = am4core.create("xydiv", am4charts.XYChart);

    xyChart.data = transformDataForXYChart(data, type);

    chart.current = xyChart;

    let categoryAxis = xyChart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "name";
    categoryAxis.title.text = title.x;
    let valueAxis = xyChart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = title.y;
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 20;
    xyChart.logo.disabled = true;
    let series = xyChart.series.push(new am4charts.ColumnSeries());
    series.columns.template.width = am4core.percent(30);
    series.dataFields.categoryX = dataFieldsCategory;
    series.dataFields.valueY = dataFieldsValue;
    series.tooltipText = "{valueY.value}";
    xyChart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    xyChart.scrollbarX = scrollbarX;

    chart.current = xyChart;

    return () => {
      xyChart.dispose();
    };
    //eslint-disable-next-line
  }, [data]);

  return <div id="xydiv" className="xy"></div>;
};

export default XYChart;
