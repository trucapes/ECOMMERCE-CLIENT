import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase'

export const handleFireBaseUpload = async (file) => {
    console.log('start of upload')
    if (file === null) {
      console.log('No event image selected')
      return null
    }
    
    if (file === '') {
      console.log(`not an image, the image file is a ${typeof file}`)
      return null
    }

    const currentTime = Date.now()
    const uploadref = ref(storage, `/images/${currentTime}_${file.name}`)
    
    try {
      const snapshot = await uploadBytes(uploadref, file)
      console.log(snapshot)
      
      const downloadURL = await getDownloadURL(snapshot.ref)
      return downloadURL
    } catch (error) {
      console.error('Error uploading file:', error)
      return null
    }
}