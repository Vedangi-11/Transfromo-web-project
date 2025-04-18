'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/redux/slice/authSlice';

function Page() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [fileId, setFileId] = useState(null);
    const [token, setToken] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const allowedTypes = [
                'image/jpeg',
                'image/png',
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];
            if (allowedTypes.includes(selectedFile.type)) {
                setFile(selectedFile);
                alert('File uploaded successfully!');
            } else {
                alert('Invalid file type. Please upload an image (jpg, png), PDF, or Word document.');
                e.target.value = '';
            }
        }
    };
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        alert('You are logged out now');
        router.push('/pages/logi?logout=true');
    };
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please upload a valid file.");
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);
        try {
            if (!token) {
                alert("Authentication error: No token found.");
                return;
            }
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            const response = await axios.post(`${API_BASE}/files/upload`,
                formData, config);
            if (response.data.success) {
                alert("File saved in database successfully!");
                setFileId(response.data.fileId);
            } else {
                alert("Failed to upload file. Please try again.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("An error occurred while uploading the file.");
        }
    };
    const handleDownload = async (format) => {
        if (!fileId) {
            alert('No file available for download.');
            return;
        }
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const response = await axios.get(`${API_BASE}/files/download/${fileId}?format=${format}`, {
                headers: { 'Authorization': `Bearer ${token}` }, // Add Authorization header
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
    const handleSaveForLater = async (fileId, saveForLaterValue) => {
        try {
            const response = await axios.put(
                `${API_BASE}/api/files/save/${fileId}`,
                { saveForLater: saveForLaterValue },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert(response.data.message || 'File saved for later successfully!');
            router.push('/pages/saveFile');
        } catch (err) {
            console.error('Error saving for later:', err.response?.data?.message || err.message);
            alert('Failed to save for later.');
        }
    };
    return (
        <div>
            <form className="max-w-sm mx-auto pt-[60px]" onSubmit={handleSubmit}>
                <h4 className='text-xl font-black'>Convert your image, PDF, or Word into JSON or XML</h4>
                <div className="mb-5 pt-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Title
                    </label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                        dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Title" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Upload file
                    </label>
                    <input className="block w-full py-2.5 text-sm text-gray-900 border border-gray-300 
                        rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="user_avatar" type="file" onChange={handleFileChange} accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" />
                </div>
                <button type="submit" className="text-white bg-green-600 focus:ring-4 focus:outline-none 
                    focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"> Convert
                </button>
            </form>
            <button className="p-2 mt-2 border-none text-black bg-blue-500 no-underline relative left-[1000px] bottom-[290px] rounded-lg font-medium" onClick={handleLogout}> LogOut </button>
            {fileId && (
                <div className="max-w-sm mx-auto relative bottom-[20px]">
                    <h5 className='mb-[10px]'>Your text has been successfully extracted from file uploaded</h5>
                    <button onClick={() => handleDownload('xml')} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Download XML
                    </button>
                    <button onClick={() => handleDownload('json')} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Download JSON
                    </button>
                    <button onClick={() => handleSaveForLater(fileId, true)}  className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Save for Later
                    </button>
                </div>
            )}
        </div>
    )
}
export default Page;