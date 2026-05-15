export default function Spinner({ small = false }) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-transparent border-t-[#00C896] ${
        small ? 'h-4 w-4' : 'h-6 w-6'
      }`}
    ></div>
  );
}
