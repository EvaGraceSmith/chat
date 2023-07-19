import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    TextInput,
    Button,
    FlatList,
    Text,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
  } from 'react-native';
  import { Camera } from 'expo-camera';
  import { PermissionStatus } from 'expo-camera/build/Camera.types';

const ChatScreen = () => {
  //setting our initial state for messages/chat messages
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  //const [cameraVisible, setCameraVisible] = useState(false); // Track camera visibility
  //const [isCameraReady, setIsCameraReady] = useState(false);
  //const [camera, setCamera] = useState(null);
  //const [previewVisible, setPreviewVisible] = useState(false);
  //const [capturedImage, setCapturedImage] = useState(null);

  //const cameraRef = useRef(null); // Reference to the camera component

  //handler for messages/chat messages
  const handleSendMessage = () => {
    //ensures that only non-empty messages are sent and added to the chat.
    if (message !== '') {
      const timestamp = new Date().toLocaleString();
      const newMessage = {
        content: message,
        timestamp: timestamp,
        sender: 'user', // 'user' indicates messages sent by the user
      };
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  // const handleOpenCamera = () => {
  //   setCameraVisible(true);
  // };

  // const handleCloseCamera = () => {
  //   setIsCameraReady(false);
  //   setCameraVisible(false);
  // };

  // useEffect(() => {
  //   // Ask for camera permission when the component mounts
  //   (async () => {
  //       const { status } = await Camera.requestForegroundPermissionsAsync();
  //       if (status !== PermissionStatus.GRANTED) {
  //         // Handle the lack of camera permission
  //         console.log('Camera permission not granted');
  //       }
  //   })();
  // }, []);

  // const takePicture = async () => {
  //   if (cameraRef.current && isCameraReady) {
  //     const photo = await cameraRef.current.takePictureAsync();
  //     console.log(photo);
  //     // Handle the captured photo, e.g., send it as a message
  //     const source=photo.uri;
  //     if (source) {
  //       await cameraRef.current.pausePreview();
  //       const timestamp = new Date().toLocaleString();
  //       const newMessage = {
  //           content: source,
  //           timestamp: timestamp,
  //           sender: 'user', // 'user' indicates messages sent by the user
  //           };
  //       setChatMessages((prevMessages) => [...prevMessages, newMessage]);
  //       setMessage('');
  //       }
  //     setCameraVisible(false);
  //   }
  // };
  
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [flashMode, setFlashMode] = useState('off');
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        setStartCamera(true);
      } else {
        Alert.alert('Access denied');
      }
    })();
  }, []);

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      Alert.alert('Access denied');
    }
  };

  const __takePicture = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    startCamera();
  };

  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off');
    } else if (flashMode === 'off') {
      setFlashMode('on');
    } else {
      setFlashMode('auto');
    }
  };

  const __switchCamera = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  };

  return (
    //SafeAreaView render content within the safe area boundaries of a device.
    // KeyboardAvoidingView will automatically adjust its height, position, or bottom padding based on the keyboard height to remain visible while the virtual keyboard is displayed.
    // View container that supports layout with flexbox, style, some touch handling, and accessibility controls.
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

{/* {cameraVisible ? (
          // Render the camera view when cameraVisible is true
        <View style={styles.cameraContainer}>
<Camera style={styles.camera} ref={cameraRef} onCameraReady={() => setIsCameraReady(true)} /> */}
          {startCamera ? (
            <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={cameraType}
          flashMode={flashMode}
          ref={cameraRef}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={__switchCamera}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                {cameraType === Camera.Constants.Type.back ? '?' : '?'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={__handleFlashMode}
              style={styles.button}
            >
              <Text style={styles.buttonText}>⚡️</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.captureButtonContainer}>
            <TouchableOpacity
              onPress={__takePicture}
              style={styles.captureButton}
            />
          </View>
        </Camera>
      ) : previewVisible && capturedImage ? (
        <CameraPreview
          photo={capturedImage}
          savePhoto={() => {}}
          retakePicture={__retakePicture}
        />
          <View style={styles.cameraButtonsContainer}>
            <Button color= "#06b6d4" title="Take Picture" onPress={takePicture} />
            <Button color= "#06b6d4" title="Close Camera" onPress={handleCloseCamera} />
          </View>
        </View>
      ) : (


        <View style={styles.chatContainer}>
          <FlatList
            data={chatMessages}
            renderItem={({ item }) => (
              <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessageContainer : styles.otherMessageContainer]}>
                <View style={styles.timestampContainer}>
                  <Text style={styles.timestampText}>{item.timestamp}</Text>
                </View>
                <View>
                  <Text style={styles.messageText}>{item.content}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.chatList}
            contentContainerStyle={styles.chatListContent}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={(text) => setMessage(text)}
              placeholder="Type your message"
              placeholderTextColor="#888888"
            />
            <Button 
            color= "#06b6d4" 
            title="Send" onPress={handleSendMessage} />
            <Button 
            color= "#06b6d4"
            title="Open Camera" onPress={handleOpenCamera} />
          </View>
        </View>
              )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const CameraPreview = ({ photo, retakePicture }) => {
  return (
    <View style={styles.cameraPreviewContainer}>
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={styles.cameraPreview}
      >
        <View style={styles.cameraPreviewButtons}>
          <TouchableOpacity onPress={retakePicture}>
            <AntDesign name="retweet" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({

    cameraContainer: {
        flex: 1,
      },
      camera: {
        flex: 1,
      },
      cameraButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
      },


    timestampContainer: {
      marginTop: 8,
    },
    userMessageContainer: {
      alignSelf: 'flex-end',
      backgroundColor: '#FFA500', // Bright orange color
      borderRadius: 8,
    },
    otherMessageContainer: {
      alignSelf: 'flex-start',
      backgroundColor: '#FFA500', // Bright orange color
    },
    messageContainer: {
      marginVertical: 8,
    },
    messageText: {
      fontSize: 16,
      marginBottom: 4,
      color: 'white',
      //fontFamily: 'Poppins', // Assuming you have the Poppins font installed
    },
    timestampText: {
      fontSize: 12,
      color: 'white',
     // fontFamily: 'Poppins', // Assuming you have the Poppins font installed
    },
    container: {
      flex: 1,
      backgroundColor: 'black', // Set the screen background color to white
    },
    chatContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    chatList: {
      flex: 1,
    },
    chatListContent: {
      flexGrow: 1,
      justifyContent: 'flex-end',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      paddingTop: 8,
    },
    input: {
      height: 40,
      flex: 1,
      marginRight: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 15,
      color: '#FFA500', // Bright orange color
      //fontFamily: 'Poppins', // Assuming you have the Poppins font installed

    },
  });
  

export default ChatScreen;