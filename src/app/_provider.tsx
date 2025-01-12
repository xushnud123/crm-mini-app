"use client";
import { FC, Suspense } from "react";
import { MainLayout } from "./_components";
import Sidebar from "./_sidebar/sidebar";
import NextAdapterApp from "next-query-params/app";
import { QueryParamProvider } from "use-query-params";
import { ToastContainer } from "react-toastify";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <>
      <Suspense fallback={<div>Loader...</div>}>
        <QueryParamProvider adapter={NextAdapterApp}>
          <MainLayout sidebar={<Sidebar />} content={children} />
        </QueryParamProvider>
      </Suspense>
    </>
  );
};

export default Provider;
