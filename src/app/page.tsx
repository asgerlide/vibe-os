import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers, Zap, Layout, MousePointer2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10 selection:text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
              V
            </div>
            <span className="text-lg font-semibold tracking-tight">VibeOS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#about" className="hover:text-foreground transition-colors">About</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              Log in
            </Link>
            <Link
              href="/canvas"
              className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Left Column: Content */}
              <div className="max-w-2xl">
                <div className="mb-8 inline-flex items-center rounded-full border border-border/60 bg-white/50 px-4 py-1.5 text-sm font-medium text-foreground backdrop-blur-sm shadow-sm">
                  <div className="flex -space-x-2 mr-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-gray-300" />
                    ))}
                  </div>
                  <span className="font-semibold mr-1">v2.0</span> is now live
                </div>

                <h1 className="text-6xl font-bold tracking-tight text-foreground sm:text-7xl mb-6 leading-[1.1]">
                  Design at the <br />
                  <span className="text-muted-foreground font-light">Speed of Thought</span>
                </h1>

                <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-lg">
                  Unlock the potential of your creative flow. A comprehensive workspace designed meticulously for the next generation of product builders.
                </p>

                <div className="mt-10 flex items-center gap-x-4">
                  <Link
                    href="/canvas"
                    className="rounded-full bg-gradient-to-r from-orange-400 to-orange-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    Start free trial <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#demo"
                    className="rounded-full bg-white/80 border border-gray-200 px-8 py-4 text-sm font-bold text-foreground shadow-sm hover:bg-white hover:shadow-md transition-all duration-300"
                  >
                    Demo Lesson
                  </Link>
                </div>

                {/* Stats Row */}
                <div className="mt-16 grid grid-cols-3 gap-8 border-t border-gray-200/60 pt-8">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Duration</p>
                    <p className="text-lg font-semibold text-foreground">Unlimited</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Level</p>
                    <p className="text-lg font-semibold text-foreground">Pro / Team</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Format</p>
                    <p className="text-lg font-semibold text-foreground">Web / Cloud</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual */}
              <div className="relative lg:h-[600px] w-full flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-[32px] bg-[#111213] p-6 shadow-2xl overflow-hidden group">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                      LIVE CANVAS
                    </div>
                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                      <Zap className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Main Visual Content (Abstract/Futuristic) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-purple-500/10 to-blue-500/10" />

                  {/* Floating Elements mimicking the reference */}
                  <div className="absolute top-1/4 left-0 right-0 h-64 bg-gradient-to-r from-orange-500/20 to-rose-500/20 blur-3xl transform -rotate-12" />

                  <div className="relative z-10 mt-12">
                    {/* Placeholder for the "Portrait" - using an abstract shape or icon instead since we don't have the person image */}
                    <div className="w-full h-64 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                      <div className="text-center p-6">
                        <div className="h-20 w-20 mx-auto bg-gradient-to-tr from-orange-400 to-rose-400 rounded-full blur-xl opacity-50 mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">VibeOS Canvas</h3>
                        <p className="text-white/60 text-sm">Real-time collaboration for your entire team.</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Floating Card */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">V</div>
                        <span className="text-white font-medium">VibeOS</span>
                      </div>
                      <span className="text-green-400 text-xs font-bold">+24.5%</span>
                    </div>
                    <div className="flex items-end gap-2 h-12">
                      <div className="w-1/5 h-[40%] bg-white/20 rounded-sm" />
                      <div className="w-1/5 h-[60%] bg-white/20 rounded-sm" />
                      <div className="w-1/5 h-[30%] bg-white/20 rounded-sm" />
                      <div className="w-1/5 h-[70%] bg-white/20 rounded-sm" />
                      <div className="w-1/5 h-[90%] bg-green-500 rounded-sm shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background Grid Lines (Subtle) */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 sm:py-32 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-accent-foreground">Everything you need</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Powerful features for modern teams
              </p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Built for speed and designed for clarity. Experience a workflow that adapts to your needs.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.name} className="flex flex-col bg-card p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground mb-4">
                      <feature.icon className="h-5 w-5 flex-none text-muted-foreground" aria-hidden="true" />
                      {feature.name}
                    </dt>
                    <dd className="flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:px-8 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to boost your productivity?
              <br />
              Start using VibeOS today.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Join thousands of designers and developers who are building the future with VibeOS.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/canvas"
                className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all hover:shadow-lg"
              >
                Get started
              </Link>
              <Link href="#" className="text-sm font-semibold leading-6 text-foreground hover:text-muted-foreground transition-colors">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-background border-t border-border/40 py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-6 w-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">V</div>
              <span className="text-sm font-semibold">VibeOS</span>
            </div>
            <p className="text-xs text-muted-foreground">
              &copy; 2024 VibeOS Inc. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

const features = [
  {
    name: 'Infinite Canvas',
    description:
      'A boundless space for your ideas. Drag, drop, and connect nodes to create complex flows with ease.',
    icon: Layout,
  },
  {
    name: 'Real-time Collaboration',
    description:
      'Work together with your team in real-time. See cursors, comments, and updates instantly.',
    icon: MousePointer2,
  },
  {
    name: 'Smart Components',
    description:
      'Pre-built components that adapt to your design system. Drag and drop to build faster.',
    icon: Layers,
  },
  {
    name: 'Lightning Fast',
    description:
      'Built on the latest tech stack for instant load times and smooth interactions.',
    icon: Zap,
  },
  {
    name: 'Version Control',
    description:
      'Never lose your work. Automatic saving and version history built right in.',
    icon: CheckCircle2,
  },
  {
    name: 'Export Anywhere',
    description:
      'Export your designs to code, images, or PDF. Integrate seamlessly with your workflow.',
    icon: ArrowRight,
  },
];
