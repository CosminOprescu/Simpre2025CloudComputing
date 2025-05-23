import { useState } from "react";

const MusicForm = ({ entry, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(entry);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass =
    "bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400";

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-900">Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Enter song title" className={inputClass} required />
        </div>

        <div>
          <label htmlFor="artist" className="block mb-1 text-sm font-medium text-gray-900">Artist</label>
          <input type="text" id="artist" name="artist" value={formData.artist} onChange={handleChange} placeholder="Enter artist name" className={inputClass} required />
        </div>

        <div>
          <label htmlFor="genre" className="block mb-1 text-sm font-medium text-gray-900">Genre</label>
          <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} placeholder="Enter genre (e.g. Rock, Pop)" className={inputClass} />
        </div>

        <div>
          <label htmlFor="album" className="block mb-1 text-sm font-medium text-gray-900">Album</label>
          <input type="text" id="album" name="album" value={formData.album} onChange={handleChange} placeholder="Enter album name" className={inputClass} />
        </div>

        <div>
          <label htmlFor="year" className="block mb-1 text-sm font-medium text-gray-900">Year</label>
          <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} placeholder="Enter release year" className={inputClass} />
        </div>

        <div>
          <label htmlFor="youtubeUrl" className="block mb-1 text-sm font-medium text-gray-900">YouTube URL</label>
          <input type="url" id="youtubeUrl" name="youtubeUrl" value={formData.youtubeUrl} onChange={handleChange} placeholder="https://www.youtube.com/..." className={inputClass} />
        </div>

        <div>
          <label htmlFor="comment" className="block mb-1 text-sm font-medium text-gray-900">Comment</label>
          <textarea id="comment" name="comment" value={formData.comment} onChange={handleChange} placeholder="Add a comment about the song" className={inputClass} />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MusicForm;
