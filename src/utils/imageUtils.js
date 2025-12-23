/**
 * Utility functions for handling images and music from local folders
 * This file contains functions to dynamically import images from the Picture folder
 * and music files from the Music folder
 */

// Function to get a list of image names from the Picture folder
// This is a helper function to document which images are available
export const getPictureFolderImages = () => {
  // This is a list of the images currently in the Picture folder
  // You can update this list as needed when you add new images
  // Image mapping from /Picture folder - used by TimelineScreen component
  return [
    'f364efd3-e759-465e-a79f-eda5c5927c35.jpg',
    'z7357248112745_6e4313a6fccdf388b37c930d0812ccdc.jpg',
    'z7357248116144_a49dcf9564fe1f17f3dc27c464e3f564.jpg',
    'z7357248135912_df95bb4a13f4c7b2d31f02dd7eab9ec8.jpg',
    'z7357248138154_80de3fe333bb9bed8be664c65b0e9502.jpg',
    'z7357248151717_7b15d43781facd9ae77e2fd6ba7143b4.jpg',
    'z7357248155663_4dbbed4aea9dbbbce9358b27391e6b49.jpg',
    'z7357248170326_d2837f124021f286fe1742b2827af219.jpg',
    'z7357248195324_5a5084f2357ffd290d062631a00ec6d3.jpg',
    'z7357248196737_8b4b04ef4d02ad8301e3fce63499d91e.jpg',
    'z7357248209629_12f48434bc50c120c87c1267609d2920.jpg',
    'z7357377167894_789c424edbc499e4df00054c5afcb430.jpg',
    'z7357377173549_ea6beaae2111bfdd7545725e98218c8d.jpg',
    'z7357377186667_fe1f6ab90332a5cec2e32657757341be.jpg',
    'z7357377195989_92bd6b99ee5a2c1933e89294700ed0d8.jpg',
    'z7357377215059_38d92c865df55e659d6e0251a8182ec4.jpg',
    'z7357377222270_d86485c8e9e1122090877c03d70a18f8.jpg',
    'z7357377224491_2a89eb8fce7fc8c903ada9d21d0a775c.jpg',
    'z7357377238563_523bd0950cb17ab72d80b34b91a98221.jpg',
    'z7357377251743_33fe407bc6da2bcb9d9afe40f27c39f3.jpg',
    'z7357377256274_c4c9730b07c36b21a7d338c99b42bb40.jpg',
    'z7357377270694_005650d42700c760e0394bea0eaaa03e.jpg',
    'z7357377272474_786c63dd09db4289d98399cf779f6b7f.jpg',
    'z7357377294015_d576146a9b4f77bb0621276aeaab688d.jpg',
    'z7357377295310_c4076170fb9148f286f03dd50a13020c.jpg',
    'z7357377310482_22476bd2063dcba914000115c9fc6f33.jpg',
    'z7357377320772_8b18588a53cffea28225c6871eecf2bf.jpg',
    'z7357377323166_c22ea59e295399f5d6a9649aa1f22f39.jpg',
    'z7357377340536_eacffd3e2502eb900b96560a2ec95bce.jpg',
    'z7357377343007_0dcc2f6d124f126c19cb8bb8d8871096.jpg',
    'z7357377363772_27927cbfeefab5fa3e4f4fa0a1ca6a3f.jpg',
    'z7357377377384_ecf02fa7fff5738ba9e855668ac7b3fb.jpg',
    'z7357377383481_b3ec863283e01c7dc3ad7d167497e9de.jpg',
    'z7357377387399_a049338a93cf6863fc80d79166e7ebe3.jpg',
    'z7357377403686_87a92c05980d9db22fb739f3379d1d05.jpg',
    'z7357377410417_322c389549aad40b22795da720c7d9d1.jpg',
    'z7357377422499_2e57c1f8d5e51f878b2a552a0c0f5fff.jpg',
    'z7357377429637_054f8fe1fd1e6d300cb6a975e81a17e0.jpg'
  ];
};

// Function to get music files from the Music folder
// Used by MusicPlayer component to load available music files
export const getMusicFiles = () => {
  return [
    '/Music/IU (아이유) - Blueming (Color Coded Lyrics Eng_Rom_Han_가사) - Jaeguchi.mp3' // Direct path to music file
  ];
};

// Function to get a random music file
// Used by MusicPlayer component to select a random song
export const getRandomMusicFile = () => {
  const musicFiles = getMusicFiles();
  const randomIndex = Math.floor(Math.random() * musicFiles.length);
  return musicFiles[randomIndex];
};