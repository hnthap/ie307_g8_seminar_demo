import { View, Button, ButtonProps } from 'react-native'
import { commonStyles } from '../styles';

export function ButtonRow({ propsList }: { propsList: ButtonProps[] }) {
  return (
    <View style={commonStyles.buttonRow}>
      {propsList.map((props, index) => (
        <Button key={index} {...props} />
      ))}
    </View>
  );
}