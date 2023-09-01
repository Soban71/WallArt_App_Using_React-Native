import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator, TouchableOpacity,PermissionsAndroid,
    Image, Platform, } from 'react-native';

import { useRecoilState } from 'recoil'
import { WallpaperInputText } from '../Atoms/WallpaperInputText';


function Screen2({ route }) {
    const { clickedImage } = route.params;
    const [SearchValue, setSearchValue] = useRecoilState(WallpaperInputText)
    const [imagesData, setImagesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoadingNext, setIsLoadingNext] = useState(false); // Added state for Next button loading

    useEffect(() => {
        setTimeout(() => {
            setImagesData(JSON.parse(clickedImage)?.cover_photo.urls.regular);
            setLoading(false);
        }, 1200);
    }, []);

    const NextImage = async () => {
        setIsLoadingNext(true); // Show loader when Next is clicked
        try {
            const response = await fetch(`https://source.unsplash.com/900x1600/?=${SearchValue}`);
            if (response.ok) {
                const imageUrl = response.url;
                setImagesData(imageUrl);
                setIsLoadingNext(false); // Hide loader when image is ready
            } else {
                console.error('Failed to fetch image');
            }
        } catch (error) {
            console.error('Error fetching image', error);
        }
    }
   // const checkPermission = async () => { }
    const REMOTE_IMAGE_PATH = imagesData;

    const checkPermission = async () => {

        // Function to check the platform
        // If iOS then start downloading
        // If Android then ask for permission

        if (Platform.OS === 'ios') {
            downloadImage();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'App needs access to your storage to download Photos',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Once user grant the permission start downloading
                    console.log('Storage Permission Granted.');
                    downloadImage();
                } else {
                    // If permission denied then show alert
                    alert('Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.warn(err);
            }
        }
    };

    const downloadImage = () => {
        // Main function to download the image

        // To add the time suffix in filename
        let date = new Date();
        // Image URL which we want to download
        let image_URL = REMOTE_IMAGE_PATH;
        // Getting the extention of the file
        let ext = getExtention(image_URL);
        ext = '.' + ext[0];
        // Get config and fs from RNFetchBlob
        // config: To pass the downloading related options
        // fs: Directory path where we want our image to download
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                // Related to the Android only
                useDownloadManager: true,
                notification: true,
                path:
                    PictureDir +
                    '/image_' +
                    Math.floor(date.getTime() + date.getSeconds() / 2) +
                    ext,
                description: 'Image',
            },
        };
        config(options)
            .fetch('GET', image_URL)
            .then(res => {
                // Showing alert after successful downloading
                console.log('res -> ', JSON.stringify(res));
                alert('Image Downloaded Successfully.');
            });
    };

    const getExtention = filename => {
        // To get the file extension
        return /[.]/.exec(filename) ?
            /[^.]+$/.exec(filename) : undefined;
    };

  
    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="gray" style={styles.loader} />
            ) : (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imagesData }} style={styles.image} />
                    <View>
                <TouchableOpacity style={styles.DownloadBtn} onPress={checkPermission }>
                    <Text style={styles.textDownloadBtn}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.NextBtn} onPress={NextImage}>
                    {isLoadingNext ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={styles.textNextBtn}>Next </Text>
                    )}
                </TouchableOpacity>
            </View>
                </View>
            )}

           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    loader: {
        marginBottom: 20,
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        padding: 4,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    DownloadBtn:{
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 40,
        left: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        elevation: 20,
    },
    NextBtn:{
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 40,
        right: 20,
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 10,
        elevation: 20,
        
    },
    textDownloadBtn:{
        color: 'white',
        fontSize: 15,
    },
    textNextBtn:{
        color: 'white',
        //fontWeight: 'bold',
        fontSize: 15,
    }
});

export default Screen2;
