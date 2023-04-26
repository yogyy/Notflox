import RootLayout from '@/components/layouts/layout';

export default function Custom404() {
  return (
    <RootLayout title={'not found'}>
      <div className="flex h-screen w-screen items-center justify-center font-mono">
        <h1 className="text-3xl mr-4">404</h1>
        <div>
          <h2>This page could not be found </h2>
        </div>
      </div>
    </RootLayout>
  );
}
