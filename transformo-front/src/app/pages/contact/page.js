import Navbar from '@/app/components/Navbar'
import React from 'react'

function page() {
    return (
        <div>
            <Navbar />
            <div className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply min-h-screen pt-[120px] px-6">
                <div className="flex flex-col lg:flex-row justify-between items-start max-w-7xl mx-auto">
                    {/* LEFT SIDE - Contact Info */}
                    <div className="w-full lg:w-1/2 pr-8">
                        <h2 className="text-4xl font-extrabold text-white mb-6 mt-[20px]">We’d Love to Hear From You!</h2>
                        <ul className="space-y-2 text-white text-lg">
                            <li><strong>Email:</strong> support@transformo.com</li>
                            <li><strong>Phone:</strong> +91 98765 43210</li>
                            <li><strong>Location:</strong> Bengaluru, India</li>
                        </ul>
                    </div>

                    {/* RIGHT SIDE - Contact Form */}
                    <div className="w-full lg:w-1/2 p-6 rounded-lg mt-10 lg:mt-0">
                        <h2 className="mb-4 text-4xl font-extrabold text-white">Contact Us</h2>
                        <form action="#" className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block mb-1 text-sm font-medium text-white">Your name</label>
                                <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Name" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-1 text-sm font-medium text-white">Your email</label>
                                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="email@example.com" required />
                            </div>
                            <div>
                                <label htmlFor="message" className="block mb-1 text-sm font-medium text-white">Your message</label>
                                <textarea id="message" rows="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Leave your message..."></textarea>
                            </div>
                            <button type="submit" className="py-2 px-6 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                                Send message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
