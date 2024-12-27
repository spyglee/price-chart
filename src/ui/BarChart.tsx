import React, { memo } from 'react'
import { BarChart as BarChartComponent } from 'react-native-gifted-charts';
import { Dimensions, View } from "react-native"
import { GREEN, DARK_GREY, ORANGE } from '../colors';

const BarChart = ({data}: {data: { label: string, value: number }[]}) => {
  return (
    <View>
      <BarChartComponent
        data={data.map(d => (
          {
            labelTextStyle: { color: DARK_GREY},
            value: d.value,
            label: d.label,
            frontColor: d.value > 0 ? ORANGE : GREEN,
          }
        ))}
        barWidth={13}
        barBorderRadius={10}
        spacing={10}
        dashGap={0}
        yAxisColor={DARK_GREY}
        xAxisColor={DARK_GREY}
        xAxisLabelsVerticalShift={200}
        yAxisTextStyle={{ color: DARK_GREY }}
        width={Dimensions.get('window').width - 110}
      />
  </View>
  );
};

export default memo(BarChart);
