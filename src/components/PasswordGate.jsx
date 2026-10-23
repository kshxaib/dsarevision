import { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PasswordGate({ onAuthenticated }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const cleanInput = password.trim();
    if (!cleanInput) return;

    const expectedPassword = String(import.meta.env.VITE_PASSWORD || '').trim();

    if (expectedPassword && cleanInput === expectedPassword) {
      setHasError(false);
      try {
        sessionStorage.setItem('vault_authenticated', 'true');
        localStorage.setItem('vault_authenticated', 'true');
      } catch (err) {
        console.error(err);
      }
      onAuthenticated();
    } else {
      setHasError(true);
      setIsShaking(true);
      setPassword('');
      setTimeout(() => setIsShaking(false), 500);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/80 backdrop-blur-2xl animate-fadeIn">
      <style>{`
        @keyframes shakeGate {
          10%, 90% { transform: translate3d(-2px, 0, 0); }
          20%, 80% { transform: translate3d(4px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-6px, 0, 0); }
          40%, 60% { transform: translate3d(6px, 0, 0); }
        }
      `}</style>

      <main className="flex flex-col justify-center items-center w-full">
        <div
          className={`rounded-2xl bg-card text-card-foreground border border-border shadow-2xl flex p-6 sm:p-7 flex-col w-[360px] max-w-full transition-transform duration-200 ${
            isShaking ? '' : 'animate-in zoom-in-95 duration-150'
          }`}
          style={
            isShaking
              ? {
                  animation: 'shakeGate 0.4s cubic-bezier(.36,.07,.19,.97) both',
                }
              : undefined
          }
        >
          {/* Simple Clean Heading */}
          <h1 className="font-semibold text-foreground text-xl tracking-tight text-center">
            Unlock Workspace
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="relative">
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (hasError) setHasError(false);
                }}
                placeholder="Enter password..."
                autoComplete="current-password"
                className={`w-full bg-background text-foreground border rounded-lg px-3 pr-11 h-10 placeholder:text-muted-foreground/50 text-sm outline-none transition-colors ${
                  hasError
                    ? 'border-destructive focus:border-destructive'
                    : 'border-border focus:border-muted-foreground/50'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
                className="text-muted-foreground flex absolute top-0 right-0 justify-center items-center size-10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

            {hasError && (
              <p className="text-destructive text-xs mt-2 text-center animate-fadeIn">
                Incorrect password. Try again.
              </p>
            )}

            <Button
              type="submit"
              className="bg-primary text-primary-foreground mt-4 w-full h-10 hover:bg-primary/90 font-medium text-sm cursor-pointer"
            >
              Unlock
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
