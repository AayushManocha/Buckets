export default function Spacer({ className = '', size }: { className?: string, size: number }) {
  return <div className={`w-0 h-${size} ${className}`} />;
}