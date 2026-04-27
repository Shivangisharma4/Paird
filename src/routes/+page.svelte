<script lang="ts">
  import { onMount } from 'svelte';

  const NAV = ['How it Works', 'Subjects', 'Sessions', 'FAQ', 'Contact'];

  const PROFILES = [
    {
      initials: 'AP', gradient: 'linear-gradient(135deg,#7c5cbf,#4a3a8c)',
      name: 'Aria Patel', school: 'CS Junior · NYU',
      bio: 'Strong in algorithms and Python. Need a study partner for Linear Algebra before finals.',
      subjects: ['Algorithms', 'Python', 'Data Structures'],
      seeking: ['Linear Algebra', 'Calculus'],
      match: 94, avail: 'Evenings & weekends'
    },
    {
      initials: 'RK', gradient: 'linear-gradient(135deg,#2e8b6e,#1a5c4a)',
      name: 'Rohan Kumar', school: 'Pre-Med Sophomore · UCLA',
      bio: 'Acing Organic Chemistry, struggling with Physics. Looking for weekly sessions.',
      subjects: ['Organic Chem', 'Biology', 'Biochemistry'],
      seeking: ['Physics', 'Thermodynamics'],
      match: 88, avail: 'Weekday mornings'
    },
    {
      initials: 'ZM', gradient: 'linear-gradient(135deg,#c0622a,#7a3010)',
      name: 'Zoe Müller', school: 'Economics Senior · Columbia',
      bio: 'Macro & micro strong. Working through econometrics, want a consistent study buddy.',
      subjects: ['Macroeconomics', 'Statistics', 'Game Theory'],
      seeking: ['Econometrics', 'R / Stata'],
      match: 81, avail: 'Flexible'
    }
  ];

  let current = $state(0);
  let animating = $state(false);
  let direction = $state<'left' | 'right' | null>(null);
  let email = $state('');
  let submitted = $state(false);

  function swipe(dir: 'left' | 'right') {
    if (animating) return;
    animating = true;
    direction = dir;
    setTimeout(() => {
      current = (current + 1) % PROFILES.length;
      direction = null;
      animating = false;
    }, 380);
  }

  function submit(e: Event) {
    e.preventDefault();
    if (email) submitted = true;
  }

  let profile = $derived(PROFILES[current]);
</script>

<svelte:head>
  <title>Paird — Find your study partner</title>
</svelte:head>

<!-- Aurora background -->
<div class="fixed inset-0 overflow-hidden" style="background:#0e0b1a; z-index:0;">
  <div class="aurora-blob aurora-1"></div>
  <div class="aurora-blob aurora-2"></div>
  <div class="aurora-mid"></div>
</div>

<!-- Page wrapper -->
<div class="relative z-10 min-h-screen flex items-center justify-center p-8">
  <!-- White card -->
  <div class="w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl" style="background:#f9f6f0;">

    <!-- Nav -->
    <nav class="flex items-center justify-between px-12 py-5">
      <a href="/" class="flex items-center gap-2.5 no-underline">
        <div class="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style="background:#1a1208; color:#f9f6f0; font-family:'Instrument Serif',serif;">P</div>
        <span class="serif text-2xl" style="color:#1a1208;">Paird</span>
      </a>
      <ul class="hidden md:flex items-center gap-8 list-none m-0 p-0">
        {#each NAV as link}
          <li><a href="#" class="text-sm no-underline transition-colors" style="color:#6b5a47;">{link}</a></li>
        {/each}
      </ul>
      <div class="flex items-center gap-5">
        <button class="text-sm cursor-pointer border-none bg-transparent" style="color:#6b5a47; font-family:'Inter',sans-serif;">Log in</button>
        <button class="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer border-none transition-opacity hover:opacity-85" style="background:#1a1208; color:#f9f6f0; font-family:'Inter',sans-serif;">Find a Partner</button>
      </div>
    </nav>
    <div style="height:1px; background:#e8e0d4;"></div>

    <!-- Hero -->
    <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[540px] items-center overflow-hidden">

      <!-- Left -->
      <div class="flex flex-col gap-7 px-12 py-16">
        <h1 class="serif leading-tight m-0" style="font-size:clamp(2.4rem,3.8vw,3.5rem); color:#1a1208; font-weight:400;">
          Intelligent study<br>partner matching<br>built in.
        </h1>
        <p class="text-base leading-relaxed m-0 max-w-md font-light" style="color:#6b5a47;">
          Match with students who study what you study, score
          sessions automatically, and keep every study plan on
          track — no more studying alone.
        </p>

        <form onsubmit={submit} class="flex gap-2 max-w-sm">
          {#if !submitted}
            <input
              bind:value={email}
              type="email"
              placeholder="Enter your university email"
              class="flex-1 px-4 py-2.5 rounded-lg text-sm outline-none border transition-colors"
              style="background:#fff; border-color:#ddd4c5; color:#1a1208; font-family:'Inter',sans-serif;"
            />
            <button type="submit" class="px-5 py-2.5 rounded-lg text-sm font-medium border-none cursor-pointer text-white transition-opacity hover:opacity-90 whitespace-nowrap" style="background:#e07a2f; font-family:'Inter',sans-serif;">
              Request access
            </button>
          {:else}
            <p class="text-sm py-2.5 m-0" style="color:#e07a2f;">✓ You're on the list — we'll reach out soon.</p>
          {/if}
        </form>

        <a href="#" class="inline-flex items-center gap-2 text-sm no-underline" style="color:#e07a2f;">
          <span class="w-5 h-5 rounded-full border flex items-center justify-center text-xs" style="border-color:#e07a2f;">→</span>
          Browse open study sessions
        </a>
      </div>

      <!-- Right — profile card -->
      <div class="relative flex items-center justify-end" style="min-height:540px;">
        <!-- dark blob frame -->
        <div class="absolute rounded-3xl overflow-hidden" style="background:linear-gradient(135deg,#1a1208,#3d2b1f,#5c3d2e); width:420px; height:460px; right:0; top:50%; transform:translateY(-50%);">
          <svg class="absolute inset-0 w-full h-full opacity-10" aria-hidden="true">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
          <div class="absolute w-2 h-2 rounded-full top-6 right-6" style="background:#e07a2f;"></div>
          <div class="absolute w-1.5 h-1.5 rounded-full top-14 right-14 opacity-50" style="background:#e07a2f;"></div>
          <div class="absolute w-1.5 h-1.5 rounded-full bottom-8 left-8 opacity-40" style="background:#e07a2f;"></div>
        </div>

        <!-- back card -->
        <div class="absolute rounded-2xl shadow-xl" style="width:300px; height:380px; background:#e8dfd2; right:60px; top:50%; transform:translateY(-54%) rotate(5deg); z-index:1;"></div>

        <!-- front profile card -->
        <div
          class="relative rounded-2xl overflow-hidden shadow-2xl"
          style="width:300px; z-index:2; background:#fff; border:1px solid #e8d5c4; margin-right:60px;
                 transition: transform 0.38s ease, opacity 0.38s ease;
                 transform: {direction === 'right' ? 'translateX(260px) rotate(12deg)' : direction === 'left' ? 'translateX(-260px) rotate(-12deg)' : 'translateY(0)'};
                 opacity: {direction ? '0' : '1'};
                 animation: float 6s ease-in-out infinite;"
        >
          <!-- avatar header -->
          <div class="relative flex flex-col items-center justify-center gap-2 py-8" style="background:{profile.gradient}; min-height:150px;">
            <span class="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white" style="background:#e07a2f; font-family:'Inter',sans-serif;">
              {profile.match}% match
            </span>
            <div class="w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold text-white" style="background:rgba(255,255,255,0.2); font-family:'Inter',sans-serif;">
              {profile.initials}
            </div>
            <div class="text-center">
              <div class="serif text-lg text-white">{profile.name}</div>
              <div class="text-xs" style="color:rgba(255,255,255,0.75); font-family:'Inter',sans-serif;">{profile.school}</div>
            </div>
          </div>

          <!-- body -->
          <div class="p-4 flex flex-col gap-3">
            <p class="text-xs leading-relaxed m-0 font-light" style="color:#6b5a47; font-family:'Inter',sans-serif;">{profile.bio}</p>

            <div>
              <div class="text-xs font-semibold mb-1.5 tracking-widest" style="color:#b0a090; font-family:'Inter',sans-serif;">SUBJECTS</div>
              <div class="flex flex-wrap gap-1.5">
                {#each profile.subjects as s}
                  <span class="text-xs px-2.5 py-1 rounded-full" style="background:#ede6d6; color:#5a3d20; font-family:'Inter',sans-serif;">{s}</span>
                {/each}
              </div>
            </div>

            <div>
              <div class="text-xs font-semibold mb-1.5 tracking-widest" style="color:#b0a090; font-family:'Inter',sans-serif;">LOOKING FOR</div>
              <div class="flex flex-wrap gap-1.5">
                {#each profile.seeking as s}
                  <span class="text-xs px-2.5 py-1 rounded-full border" style="border-color:#e07a2f; color:#e07a2f; font-family:'Inter',sans-serif;">{s}</span>
                {/each}
              </div>
            </div>
          </div>

          <!-- footer -->
          <div class="flex items-center justify-between px-4 pb-4">
            <span class="text-xs" style="color:#b0a090; font-family:'Inter',sans-serif;">📅 {profile.avail}</span>
            <div class="flex gap-2">
              <button onclick={() => swipe('left')} class="w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer transition-transform hover:scale-110 text-sm" style="border-color:#e8d5c4; background:#f5ede6; color:#c0855a;">✕</button>
              <button onclick={() => swipe('right')} class="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border-none transition-transform hover:scale-110 text-sm text-white" style="background:#e07a2f;">♥</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

<style>
  .aurora-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.55;
    animation: drift 14s ease-in-out infinite alternate;
  }
  .aurora-1 {
    width: 900px; height: 700px;
    background: radial-gradient(ellipse, #5b3fa0 0%, #2d1f6e 60%, transparent 100%);
    top: -200px; left: -200px;
  }
  .aurora-2 {
    width: 800px; height: 600px;
    background: radial-gradient(ellipse, #1a3a7c 0%, #0e2060 60%, transparent 100%);
    bottom: -150px; right: -150px;
    animation-delay: -7s;
  }
  .aurora-mid {
    position: absolute;
    width: 600px; height: 500px;
    background: radial-gradient(ellipse, #6b2fa0 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    filter: blur(100px);
    opacity: 0.3;
    animation: pulse 8s ease-in-out infinite;
  }
  @keyframes drift {
    0%   { transform: translate(0, 0) scale(1); }
    50%  { transform: translate(60px, 40px) scale(1.08); }
    100% { transform: translate(-40px, 60px) scale(0.96); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.25; transform: translate(-50%, -50%) scale(1); }
    50%       { opacity: 0.4;  transform: translate(-50%, -50%) scale(1.15); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
</style>
