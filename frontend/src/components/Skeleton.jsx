export default function Skeleton({ count = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-12 bg-gradient-to-r from-[#161B22] via-[#21262D] to-[#161B22] rounded animate-pulse"
        ></div>
      ))}
    </div>
  );
}
