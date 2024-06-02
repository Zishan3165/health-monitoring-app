import React from 'react';
import { View, Text } from 'react-native';
import { HealthLog } from '../../Types';

interface PatientItemProps {
   healthLog: HealthLog;
}

const getTime = (timestamp: number) => {
   return new Date(timestamp).toLocaleString([], {
      timeZone: 'Asia/Dhaka',
   });
};

const HealthLogItem = ({ healthLog }: PatientItemProps) => {
   const {
      bloodSugar,
      timestamp,
      type,
      kickCount,
      heartBeat,
      oxygenSaturation,
      temperature,
      fallDetection,
   } = healthLog;
   return (
      <View
         style={{
            backgroundColor: '#3A9E984A',
            height: 175,
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
         }}
      >
         <View
            style={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               height: '100%',
            }}
         >
            {!!timestamp && <Text>Time : {getTime(timestamp)}</Text>}
            {!!type && <Text>Reading Status : {type}</Text>}
            {!!bloodSugar && <Text>Blood Sugar : {bloodSugar} mmol/L</Text>}
            {kickCount != null && <Text>Kick count : {kickCount} k/m</Text>}
            {!!heartBeat && <Text>Heart Beat : {heartBeat} bpm</Text>}
            {!!oxygenSaturation && (
               <Text>Oxygen Saturation : {oxygenSaturation} %</Text>
            )}
            {!!temperature && <Text>Temperature : {temperature} F</Text>}
            {fallDetection == 1 && <Text>Fall : Detected</Text>}
            {fallDetection == 0 && <Text>Fall : Not Detected</Text>}
         </View>
      </View>
   );
};

export default HealthLogItem;
