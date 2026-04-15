export default function Logo({ size = 32, className = "" }: { size?: number | string, className?: string }) {
    return (
        <img
            src="/logo-nobackground.png"
            alt="Logo"
            width={size}
            height={size}
            className={className}
            style={{ objectFit: "contain" }}
        />
    );
}
