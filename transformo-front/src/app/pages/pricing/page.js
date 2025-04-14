import Navbar from '@/app/components/Navbar'
import React from 'react'

function page() {
    return (
        <div>
        <Navbar/>
            <div className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply h-[720px] pt-[60px]">
                <h2 class="text-4xl font-extrabold text-white p-6 pt-[60px]">Choose your plan</h2>


                <div class="relative overflow-x-auto">
                    <table class="w-[1200px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ms-6">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Plan
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Free
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Pro
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Enterprise
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Price
                                </th>
                                <td class="px-6 py-4">
                                    ₹0/month
                                </td>
                                <td class="px-6 py-4">
                                    ₹499/month
                                </td>
                                <td class="px-6 py-4">
                                    Contact us
                                </td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    OCR Uploads
                                </th>
                                <td class="px-6 py-4">
                                    10/month
                                </td>
                                <td class="px-6 py-4">
                                    Unlimited
                                </td>
                                <td class="px-6 py-4">
                                    Unlimited
                                </td>
                            </tr>
                            <tr class="bg-white dark:bg-gray-800">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Formats
                                </th>
                                <td class="px-6 py-4">
                                    JSON only
                                </td>
                                <td class="px-6 py-4">
                                    JSON & XML
                                </td>
                                <td class="px-6 py-4">
                                    Custom formats
                                </td>
                            </tr>
                            <tr class="bg-white dark:bg-gray-800">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Storage
                                </th>
                                <td class="px-6 py-4">
                                    Limited
                                </td>
                                <td class="px-6 py-4">
                                    Cloud storage
                                </td>
                                <td class="px-6 py-4">
                                    Dedicated server
                                </td>
                            </tr>
                            <tr class="bg-white dark:bg-gray-800">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Support
                                </th>
                                <td class="px-6 py-4">
                                    Community
                                </td>
                                <td class="px-6 py-4">
                                    Priority Support
                                </td>
                                <td class="px-6 py-4">
                                    24/7 Support
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default page