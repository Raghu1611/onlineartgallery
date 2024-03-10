import React, { useState } from "react";
import './NewArrivalNotification.css';

import myImage from './monalisa.png';
import myImage1 from './goernica.png';
import myImage2 from './digego.png';
import myImage3 from './family.png';

function Newarrivalnotification() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([
    { src: myImage, alt: "Monalisa", artist: "Leonardo da Vinci", date: "1503 to 1519", where: "Louvre Museum (Paris)", time: new Date() },
    { src: myImage1, alt: "Goernica", artist: "Pablo Picasso", date: "1937", where: "Museo Reina Sofía (Madrid)", time: new Date() },
    { src: myImage2, alt: "Digego", artist: "Diego Velázquez", date: "1656", where: "Museo del Prado (Madrid)", time: new Date() },
    { src: myImage3, alt: "Family", artist: "Vincent van Gogh", date: "1889", where: "Museum of Modern Art (New York City)", time: new Date() }
  ]);
  const [deletedImages, setDeletedImages] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Check if a file is selected
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);

      // Here you can perform further actions, such as uploading to a server
      // For demonstration purposes, let's add the uploaded image to the list
      const reader = new FileReader();
      reader.onload = function(event) {
        const uploadedImage = event.target.result;
        console.log("Uploaded image:", uploadedImage);
        // You can update your UI with the uploaded image here
        setImages([...images, { src: uploadedImage, alt: "Uploaded Image", time: new Date() }]);
      };
      reader.readAsDataURL(selectedFile);

      // Reset the selected file state
      setSelectedFile(null);
    } else {
      console.log("Please select a file.");
    }
  };

  const handleDelete = (index) => {
    // Move the deleted image to the deletedImages array
    const deletedImage = images[index];
    setDeletedImages([...deletedImages, deletedImage]);

    // Remove the image at the specified index from the images array
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleEdit = (index) => {
    // Add your edit logic here
    console.log("Edit image at index:", index);
  };

  const handleRetrieve = () => {
    // Retrieve the last deleted image
    const lastDeletedImage = deletedImages.pop();
    if (lastDeletedImage) {
      setImages([...images, lastDeletedImage]);
    } else {
      console.log("No deleted images to retrieve.");
    }
    setDeletedImages([...deletedImages]);
  };

  return (
    <div>
      <h1>Art Images</h1>
      <table className="image-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Artist</th>
            <th>Date</th>
            <th>Where to See</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image, index) => (
            <tr key={index}>
              <td className="image-cell"><img src={image.src} width='200px' alt={image.alt} /></td>
              <td className="info-cell">{image.artist}</td>
              <td className="info-cell">{image.date}</td>
              <td className="info-cell">{image.where}</td>
              <td className="info-cell">{image.time.toLocaleString()}</td>
              <td className="info-cell">{(new Date() - image.time) < (24 * 3600 * 1000) ? 'New' : 'Old'}</td>
              <td className="info-cell">
                <button onClick={() => handleDelete(index)}>Delete</button>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Upload a File</h2>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <div>
        <h2>Deleted Images</h2>
        <button onClick={handleRetrieve}>Retrieve Last Deleted Image</button>
        <ul>
          {deletedImages.map((image, index) => (
            <li key={index}>{image.alt}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Newarrivalnotification;
