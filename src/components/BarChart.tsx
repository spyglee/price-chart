import React, { memo } from 'react'
import { BarChart as BarChartComponent } from 'react-native-gifted-charts';
import { Dimensions, View, Text, StyleSheet } from "react-native"
import { GREEN, DARK_GREY, ORANGE, LIGHT_GREY, WHITE } from '../colors';

type Props =  {
  data: { label: string, value: number }[],
  title: string,
  legend: { title: string, color: string}[]
}

const BarChart = ({data, title, legend}: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.dateText}>
        {title}
      </Text>
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
        yAxisTextStyle={{ color: DARK_GREY }}
        width={Dimensions.get('window').width - 110}
      />
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
    </View>
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
    padding: 10,
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
