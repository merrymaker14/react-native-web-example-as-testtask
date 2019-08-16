import React, {useEffect} from "react";
import { View, Animated } from "react-native";

type ProgressBarProps = {
  progress: number
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const animation = new Animated.Value(props.progress);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: props.progress,
      duration: 500
    }).start();

    console.log(props.progress)
  });

  return (
    <View style={{ flex: 1, borderColor: "red", borderWidth: 2, borderRadius: 4}}>
      <Animated.View
        style={{
          width: animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
            extrapolate: "clamp"
          }),
          height: '10px',
          backgroundColor: 'red'
        }}
      />
    </View>
  );
};

export default ProgressBar;