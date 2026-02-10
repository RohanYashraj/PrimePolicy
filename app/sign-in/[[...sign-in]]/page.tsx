import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Decorative Gradient Background */}
      <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-accent/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-accent/5 blur-[120px]" />
      
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 h-8 w-8 bg-accent" />
          <h1 className="text-2xl font-bold tracking-tighter uppercase">PrimePolicy</h1>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-muted text-balance">Access Agentic Infrastructure</p>
        </div>
        
        <SignIn />
        
        <div className="mt-12 text-center">
          <a href="/" className="text-xs font-bold uppercase tracking-widest text-muted hover:text-foreground transition-colors">Return to Terminal</a>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:40px_40px]" />
    </div>
  );
}
