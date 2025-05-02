import RootLayout from "@/components/layouts/layout";
import { ReactElement } from "react";

export default function Custom404() {
  return (
    <div className="flex min-h-screen items-center justify-center font-mono">
      <h1 className="mr-4 text-3xl text-primary">404</h1>
      <div>
        <h2>This page could not be found </h2>
      </div>
    </div>
  );
}

Custom404.getLayout = function getLayout(page: ReactElement) {
  return (
    <RootLayout title="Page not found" footer={false}>
      {page}
    </RootLayout>
  );
};
