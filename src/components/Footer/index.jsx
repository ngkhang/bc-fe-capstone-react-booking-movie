export default function Footer() {
  return (
    <footer className="mt-auto bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-base text-center font-medium tracking-tight text-gray-900">
          Movie Booking ©{new Date().getFullYear()} Created by ngKhang
        </p>
      </div>
    </footer>
  );
}
