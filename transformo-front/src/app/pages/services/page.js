import Navbar from '@/app/components/Navbar'
import React from 'react'

function page() {
    return (
        <div>
        <Navbar/>
            <div className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply h-[720px] pt-[60px]">
                <h2 class="text-4xl font-extrabold text-white p-6 pt-[60px]">Our Services</h2>
                <p class="text-lg text-white p-6 w-[1300px] relative bottom-[40px]">Transformo is on a mission to simplify document management using cutting-edge AI and OCR technology. We aim to help individuals and businesses handle documents with unmatched efficiency and accuracy.</p>

                <h2 class="mb-2 text-4xl font-extrabold text-gray-900 text-white p-6 relative bottom-[50px]">Why Transformo?</h2>
                <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside text-white relative left-[40px] bottom-[60px] text-lg">
                    <li>
                        OCR Extraction
                        <p className='ps-8 w-[800px]'>Upload PDFs, DOCX, or images, and get clean text data using our AI-based OCR.</p>
                    </li>
                    <li>
                        File Conversion
                        <p className='ps-8 w-[800px]'>Convert documents to structured JSON or XML formats for easy storage and processing.</p>
                    </li>
                    <li>
                        Saved File Management
                        <p className='ps-8 w-[800px]'>Store and download previously uploaded files at your convenience.</p>
                    </li>
                    <li>
                        Multi-format Downloads
                        <p className='ps-8 w-[800px]'>Choose your preferred format for each extracted file.</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default page