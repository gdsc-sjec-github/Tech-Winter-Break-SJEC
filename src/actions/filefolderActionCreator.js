import { firestore, firebase } from '../config/firebase'; // Ensure firebase is imported

const createFolder = async (folderData) => {
  try {
    const folderRef = firestore.collection('folders').doc();
    await folderRef.set({
      ...folderData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Ensure correct usage of firebase.firestore.FieldValue
    });
    console.log('Folder created successfully');
  } catch (error) {
    console.error('Error creating folder:', error);
  }
};

