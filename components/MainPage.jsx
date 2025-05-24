import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { getRecords, deleteRecord, updateRecord, createRecord } from "../utils/recordsFunctions";
import MusicForm from "./MusicForm";
import Link from "next/link";

const useDebounce = (value, delay = 300) => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debounced;
};

const MainPage = () => {
    const [data, setData] = useState([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query);
    const [editRecord, setEditRecord] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [deezerResults, setDeezerResults] = useState([]);
    const [deezerQuery, setDeezerQuery] = useState("");
    const [showImportSuccess, setShowImportSuccess] = useState(false);

    const searchDeezer = async (query) => {
        try {
            const res = await fetch(`https://corsproxy.io/?https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            return data.data;
        } catch (error) {
            console.error("Deezer API error:", error);
            return [];
        }
    };

    const handleDeezerSearch = async () => {
        if (!deezerQuery.trim()) return;
        const results = await searchDeezer(deezerQuery);
        setDeezerResults(results);
    };

    const handleClearDeezer = () => {
        setDeezerResults([]);
        setDeezerQuery("");
    };

    const handleImport = async (track) => {
        const newEntry = {
            title: track.title,
            artist: track.artist.name,
            album: track.album.title,
            genre: "",
            year: new Date(track.release_date || Date.now()).getFullYear(),
            youtubeUrl: track.link,
            comment: "Imported from Deezer",
            addedAt: new Date().toISOString(),
        };
        await createRecord(newEntry);
        await fetchRecords();
        setShowImportSuccess(true);
        setTimeout(() => setShowImportSuccess(false), 3000);
    };

    const fetchRecords = async (search = "") => {
        try {
            if (isInitialLoading) setIsInitialLoading(true);
            else setIsFetching(true);

            const response = await getRecords(search);
            setData(response);
        } catch (error) {
            console.error("Error fetching records:", error);
            setData([]);
        } finally {
            setIsInitialLoading(false);
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchRecords(debouncedQuery);
    }, [debouncedQuery]);

    if (isInitialLoading) return <Spinner />;

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            await deleteRecord(id);
            setData((prev) => prev.filter((item) => item._id !== id));
        }
    };

    const handleEdit = (record) => {
        setEditRecord(record);
        setShowEditForm(true);
    };

    const handleUpdate = async (updatedData) => {
        await updateRecord(editRecord._id, updatedData);
        setData((prev) =>
            prev.map((item) => (item._id === editRecord._id ? { ...item, ...updatedData } : item))
        );
        setShowEditForm(false);
        setEditRecord(null);
    };

    return (
        <div className="p-6 text-center text-white">
            {showEditForm && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">
                        <MusicForm
                            entry={editRecord}
                            onSubmit={handleUpdate}
                            onCancel={() => {
                                setShowEditForm(false);
                                setEditRecord(null);
                            }}
                        />
                    </div>
                </div>
            )}

            <h1 className="text-5xl font-extrabold mb-6 text-white drop-shadow-lg">
                🎶 My Music Vault – <span className="text-blue-400">Your Timeless Collection</span>
            </h1>

            {showImportSuccess && (
                <div className="mb-4 px-4 py-2 bg-green-600 text-white font-medium rounded shadow inline-block">
                    ✅ Song successfully imported!
                </div>
            )}

            <div className="mt-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-start max-w-7xl mx-auto">
                <div className="flex flex-col items-center gap-4 w-full">
                    <input
                        type="text"
                        placeholder="Search a song, an artist or a year in your music vault"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Link href="/records/create">
                        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg shadow-lg transition-all duration-150 flex items-center">
                            <span className="mr-2">➕</span> Add New Song
                        </button>
                    </Link>
                </div>

                <div className="flex flex-col items-center gap-4 w-full">
                    <input
                        type="text"
                        placeholder="Search songs from Deezer..."
                        value={deezerQuery}
                        onChange={(e) => setDeezerQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        onClick={handleDeezerSearch}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                        Search
                    </button>
                    {deezerResults.length > 0 && (
                        <button
                            onClick={handleClearDeezer}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                        >
                            🔙 Back to My Vault Songs
                        </button>
                    )}
                </div>
            </div>

            {deezerResults.length > 0 && (
                <div className="mb-6">
                    <button
                        onClick={handleClearDeezer}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                    >
                        🔙 Back to My Vault Songs
                    </button>
                </div>
            )}

            <div className="flex flex-wrap gap-4 justify-center">
                {deezerResults.map((track) => (
                    <div
                        key={track.id}
                        className="max-w-sm p-4 bg-white border border-gray-300 rounded-lg shadow-sm text-left"
                    >
                        <img src={track.album.cover_medium} alt={track.album.title} className="rounded mb-2" />
                        <h3 className="text-lg font-bold">{track.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">by {track.artist.name}</p>
                        <audio controls className="w-full mt-2">
                            <source src={track.preview} type="audio/mpeg" />
                        </audio>
                        <button
                            onClick={() => handleImport(track)}
                            className="mt-4 w-full bg-blue-700 hover:bg-blue-800 text-white py-1 px-4 rounded-lg text-sm"
                        >
                            📅 Import into Vault
                        </button>
                    </div>
                ))}
            </div>

            {isFetching && (
                <div className="mt-2 mb-4 flex justify-center items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500 animate-spin" viewBox="0 0 100 101" fill="none">
                        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="10" />
                        <path fill="currentColor" d="M100 50.59A50 50 0 1150 0v10A40 40 0 1090 50h10z" />
                    </svg>
                    <span className="text-sm text-gray-300">Searching...</span>
                </div>
            )}

            <div className="flex flex-wrap gap-4 justify-center mt-6">
                {data.length === 0 ? (
                    <p className="text-gray-300 text-lg mt-4">No results found.</p>
                ) : (
                    data.map((record) => (
                        <div
                            key={record._id}
                            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 text-left"
                        >
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {record.title}
                            </h5>
                            <p className="mb-1 font-medium text-gray-800 dark:text-gray-300">
                                by {record.artist}
                            </p>
                            <a
                                href={record.youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mb-3 block font-normal text-blue-600 hover:underline dark:text-blue-400"
                            >
                                Ascultă pe YouTube
                            </a>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Album: <span className="font-medium">{record.album}</span>
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Genre: <span className="font-medium">{record.genre}</span>
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Year: <span className="font-medium">{record.year}</span>
                            </p>
                            {record.comment && (
                                <p className="text-sm italic mt-2 text-gray-300 dark:text-gray-400">
                                    “{record.comment}”
                                </p>
                            )}
                            <div className="mt-4">
                                <button
                                    type="button"
                                    onClick={() => handleEdit(record)}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(record._id)}
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default MainPage;