import RootLayout from '@/components/layouts/layout';

export default function Custom404() {
  return (
    <RootLayout title={'not found'}>
      <div className="flex h-[calc(100vh_-_133px)] w-screen items-center justify-center font-mono">
        <h1 className="mr-4 text-3xl text-primary">404</h1>
        <div>
          <h2>This page could not be found </h2>
        </div>
      </div>
    </RootLayout>
  );
}
