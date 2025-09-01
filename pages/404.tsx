import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="max-w-md w-full text-center px-6">
        <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-400">404</h1>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-300 mb-8">
              Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full"
            >
              Go Home
            </Link>
            
            <button
              onClick={() => router.back()}
              className="block w-full text-gray-300 hover:text-white transition-colors py-2"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}