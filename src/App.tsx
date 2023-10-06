import React from 'react';
import './App.css';
import LoginPage from "./pages/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const queryClient = new QueryClient()

function App() {

    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path="/" element={<Navigate to={"/login"}/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                    </Route>
                    <Route path='*' element={<PageNotFound/>}/>
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
