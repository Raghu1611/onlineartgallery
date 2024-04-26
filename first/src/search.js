import React, { useState } from "react";
import './NewArrivalNotification.css';

function Newarrivalnotification() {
  const [images, setImages] = useState([
    { id: 1, artist: "Leonardo da Vinci" },
    { id: 2, artist: "Pablo Picasso" },
    { id: 3, artist: "Diego Velázquez" },
    { id: 4, artist: "Vincent van Gogh" }
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredImages = images.filter(image =>
    image.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Art Images</h1>
      <input
        type="text"
        placeholder="Search Artist..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredImages.map(image => (
          <li key={image.id}>{image.artist}</li>
        ))}
      </ul>
    </div>
  );
}

export default Newarrivalnotification;
