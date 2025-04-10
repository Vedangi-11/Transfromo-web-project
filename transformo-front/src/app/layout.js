'use client'
import "./globals.css";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className="overflow-y-auto overflow-x-hidden">{children}</body>
      </html>
    </Provider>
  )
}
