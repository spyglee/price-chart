import React, { memo } from 'react'
import { BarChart as BarChartComponent, yAxisSides } from 'react-native-gifted-charts';
import { Dimensions, View, Text, StyleSheet } from "react-native"
import { GREEN, DARK_GREY, ORANGE, LIGHT_GREY, WHITE } from '../colors';

type Props =  {
  data: { label: string, value: number }[],
  legend: { title: string, color: string}[]
}

const BarChart = ({data, legend}: Props) => {
  return (
    <>
      <View style={styles.card}>
        <BarChartComponent
          data={data.map(d => (
            {
              labelTextStyle: { color: DARK_GREY, fontSize: 10 },
              value: d.value,
              label: d.label,
              frontColor: d.value > 0 ? ORANGE : GREEN,
            }
          ))}
          barWidth={7}
          roundToDigits={2}
          yAxisLabelWidth={40}
          barBorderRadius={3}
          spacing={5}
          dashGap={0}
          yAxisLabelPrefix='€'
          yAxisSide={yAxisSides.RIGHT}
          yAxisColor={DARK_GREY}
          xAxisColor={DARK_GREY}
          yAxisTextStyle={{ color: DARK_GREY }}
          width={Dimensions.get('window').width - 100}
        />
      </View>
      <View style={styles.legend}>
        {legend.map((item, index) => (
          <View style={styles.legendItem} key={index}>
            <View style={[styles.legendItemColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendItemText}>
              {item.title}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LIGHT_GREY,
  },
  card: {
    width: Dimensions.get('window').width - 40,
    backgroundColor: WHITE,
    paddingRight: 10,
    borderRadius: 10,
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  legend: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 10,
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendItemColor: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  legendItemText: {
    color: DARK_GREY,
  },
});

export default memo(BarChart);
