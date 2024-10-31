export default function NotFoundPage() {
  return (
    <div className="h-screen">
      <div className="flex items-center justify-center h-full gap-4">
        <div className="font-semibold">404</div>
        <div className="bg-gray-500 w-[1px] h-5"></div>
        <div className="text-xs text-gray-400">Not found</div>
      </div>
    </div>
  );
}
