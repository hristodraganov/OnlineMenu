import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { transformDataForPie } from "./TransformData";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import useWindowDimensions from "../WindowDimensions/useWindowDimensions";
am4core.useTheme(am4themes_animated);

const Pie = ({ data, type, dataFieldsValue, dataFieldsCategory }) => {
  const chart = useRef(null);
  const [showLegend, setShowLegend] = useState(false);
  const { width } = useWindowDimensions();
  useLayoutEffect(() => {
    let pie = am4core.create("chartdiv", am4charts.PieChart3D);
    const pieData = transformDataForPie(data, type);

    type === "products"
      ? pieData.sort((a, b) => {
          return a.quantity - b.quantity;
        })
      : pieData.sort((a, b) => {
          return a.timesUsed - b.timesUsed;
        });

    pie.data = pieData;
    pie.legend = new am4charts.Legend();
    pie.legend.position = "right";
    pie.logo.disabled = true;
    let pieSeries = pie.series.push(new am4charts.PieSeries3D());
    pieSeries.slices.template.strokeOpacity = 1;
    pie.radius = am4core.percent(70);
    pieSeries.dataFields.value = dataFieldsValue;
    pieSeries.dataFields.category = dataFieldsCategory;
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
    pie.hiddenState.properties.radius = am4core.percent(60);
    pie.legend.maxHeight = 150;
    pie.legend.scrollable = true;
    pie.innerRadius = am4core.percent(40);
    pie.legend.disabled = showLegend;
    chart.current = pie;
    return () => {
      if (pie) pie.dispose();
    };
    //eslint-disable-next-line
  }, [data, showLegend]);

  useEffect(() => {
    width > 768 ? setShowLegend(false) : setShowLegend(true);
  }, [width]);

  return <div id="chartdiv" className="pie"></div>;
};

export default Pie;
