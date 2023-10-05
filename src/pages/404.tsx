import RootLayout from '@/components/layouts/layout';

export default function Custom404() {
  return (
    <RootLayout title={'not found'} footer={false}>
      <div className="min-h-screen flex items-center justify-center font-mono">
        <h1 className="mr-4 text-3xl text-primary">404</h1>
        <div>
          <h2>This page could not be found </h2>
        </div>
      </div>
    </RootLayout>
  );
}
