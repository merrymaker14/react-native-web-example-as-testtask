import React, { useState, useRef, useEffect } from "react";
import { View, Dimensions, Image, Button, ActivityIndicator, ImageSourcePropType } from "react-native";
import styled from "styled-components"

type pictureType = {
  portrait: ImageSourcePropType,
  landscape: ImageSourcePropType
};

const picture: pictureType = {
  portrait: require('./img/nc_ss19_620x960px_1.png'),
  landscape: require('./img/960x576_1.png')
};

let presentPictureImageSourcePropType: ImageSourcePropType;
let presentPictureString: string;

const App: React.FC = () => {
  const [orientation, setOrientation] = useState('');
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [downloadingCloseButton, setDownloadingCloseButton] = useState(true);
  const view = useRef(null);

  /** Get device orientation */
  const getOrientation: () => void = () => {
    if (view) {
      if (Dimensions.get('window').width < Dimensions.get('window').height) {
        setOrientation('portrait');
      } else {
        setOrientation('landscape');
      }

      presentPictureImageSourcePropType = orientation === 'portrait' ? picture.portrait : picture.landscape;
      presentPictureString = orientation === 'portrait' ? require('./img/nc_ss19_620x960px_1.png') : require('./img/960x576_1.png');

      getSizeOfImage();
    }
  };

  /** Get need datas for Image component */
  const getSizeOfImage: () => void = () => {
    Image.getSize(presentPictureString, (width, height) => {
      // calculate image width and height 
      const screenWidth = Dimensions.get('window').width
      const scaleFactor = width / screenWidth
      const imgHeight = height / scaleFactor
      setImgWidth(screenWidth);
      setImgHeight(imgHeight);
    }, () => {
      console.error("Doesn't get the image");
    })
  };

  /** Just for TS */
  const pressCloseButton: () => void = () => {
    console.info("Закрыть")
  };

  useEffect(() => {
    getOrientation();

    setTimeout(() => {
      setDownloadingCloseButton(false)
    }, 3000);
    
    Dimensions.addEventListener('change', () =>
    {
      getOrientation();
    });
  });
  
  const Container = styled(View)`
    flex: 1;
    justifyContent: "center";
    alignItems: "center";
    height: "100%";
  `;

  const StyledButton = styled(Button)`
    position: "absolute"
    top: "5px";
    right: "5px";
    zIndex: 1;
  `;

  const StyledActivityIndicator = styled(ActivityIndicator)`
    position: "absolute";
    flex: 1;
    justifyContent: "center";
    alignItems: "center";
    height: ${orientation === 'portrait' ? "50px" : "100px"};
  `;

  return (
    <Container>
      {!downloadingCloseButton &&
        <StyledButton
          onPress={pressCloseButton}
          title="Закрыть"
          color="#0000ff"
          accessibilityLabel="Закрыть"
        />
      }
      <Container ref={view} style={{backgroundColor: (orientation === 'portrait') ? '#1B5E20' : '#006064'}}>
        <Image style={{width: imgWidth, height: imgHeight}} source={presentPictureImageSourcePropType} />
      </Container>
      {downloadingCloseButton && <StyledActivityIndicator size="large" color="#0000ff" />}
    </Container>
  );
};

export default App;

 