import Navbar from '@/app/components/Navbar'
import React from 'react'

function page() {
    return (
        <div>
        <Navbar/>
            <div className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply h-[650px] pt-[60px]">
                <h2 class="text-4xl font-extrabold text-white p-6 pt-[60px]">Our Mission</h2>
                <p class="text-lg text-white p-6 w-[1300px] relative bottom-[40px]">Transformo is on a mission to simplify document management using cutting-edge AI and OCR technology. We aim to help individuals and businesses handle documents with unmatched efficiency and accuracy.</p>

                <h2 class="mb-2 text-4xl font-extrabold text-gray-900 text-white p-6 relative bottom-[50px]">Why Transformo?</h2>
                <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside text-white relative left-[40px] bottom-[60px] text-lg">
                    <li>
                        AI-Powered OCR for precise extraction
                    </li>
                    <li>
                        Supports PDF, DOCX, and image files
                    </li>
                    <li>
                        JSON & XML output formats
                    </li>
                    <li>
                        Secure and user-friendly interface
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default page