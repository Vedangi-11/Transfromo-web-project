'use client';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import savefile from '../../image/savefileicon.png';

function Page() {
    const [files, setFiles] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/files/savedfile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFiles(response.data.data);
            } catch (error) {
                console.error('Error fetching files:', error);
                alert('Failed to fetch files.');
            }
        };

        fetchFiles();
    }, []);

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const handleDownload = async (savefileId, title, format) => {
        if (!savefileId || !title) {
            alert('Missing file details for download.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/files/downloadsaved/${savefileId}?format=${format}`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${title}.${format}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(`Error downloading ${format} file:`, error);
            alert(`Failed to download ${format} file.`);
        }
    };
    const handleDel = async (fileId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this file?');
        if (!confirmDelete) return;
    
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/files/savedfile/${fileId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            // Update the state to remove the deleted file
            setFiles(prevFiles => prevFiles.filter(file => file.fileId !== fileId));
            alert('File deleted successfully.');
        } catch (error) {
            console.error('Error deleting file:', error);
            alert('Failed to delete file.');
        }
    };

    return (
        <div>
            <h2 className="p-[50px] font-medium text-xl">Saved Files</h2>
            {files.length === 0 ? (
                <p className="p-[50px]">No files found.</p>
            ) : (
                files.map((file) => (
                    <div key={file._id}>
                        <div className="w-[200px] max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 m-[40px]">
                            <div className="flex justify-end px-4 pt-4 relative">
                                <button
                                    onClick={() => toggleDropdown(file._id)}
                                    className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                                    type="button"
                                >
                                    <span className="sr-only">Open dropdown</span>
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                        <path d="M2 0a1.5 1.5 0 1 1 0 3A1.5 1.5 0 0 1 2 0Zm6.041 0a1.5 1.5 0 1 1 0 3A1.5 1.5 0 0 1 8.041 0ZM14 0a1.5 1.5 0 1 1 0 3A1.5 1.5 0 0 1 14 0Z" />
                                    </svg>
                                </button>
                                {openDropdownId === file._id && (
                                    <div className="absolute top-10 right-0 z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                                        <ul className="py-2">
                                            <li>
                                                <button
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                    onClick={() => handleDownload(file.fileId, file.title, 'xml')}
                                                >
                                                    Download XML
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                    onClick={() => handleDownload(file.fileId, file.title, 'json')}
                                                >
                                                    Download JSON
                                                </button>
                                            </li>
                                            <li>
                                            <button
    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    onClick={() => handleDel(file.fileId)}
>
    Delete
</button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col items-center pb-10">
                                <Image className="w-24 h-24 mb-3 shadow-lg" src={savefile} alt="file preview" />
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{file.title}</h5>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Page;
