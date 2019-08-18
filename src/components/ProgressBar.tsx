import React, {useEffect} from "react";
import { View, Animated } from "react-native";

class ProgressBar extends React.Component { // Doesn't use
  state = {
    animation: new Animated.Value(0)
  }

  componentDidMount() {
    this.state.animation.setValue(0);

    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 3000
    }).start();
  }

  render() {
    const progressInterpolate = 
    this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp"
    })

    return (
      <View style={{ width: "300px", height: "50px", flex: 1, borderColor: "red", borderWidth: 2, borderRadius: 4}}>
        <Animated.View
          style={{
            width: progressInterpolate,
            bottom: 0,
            backgroundColor: 'red'
          }}
        />
      </View>
    );
  };
};

export default ProgressBar;