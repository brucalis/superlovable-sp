from pathlib import Path

p = Path("src/routes/index.tsx")
s = p.read_text()

old_import = 'import { ArrowRight, Check, Play, Shield, Sparkles, Star, Timer, X } from "lucide-react";'
new_import = 'import { ArrowRight, Check, Shield, Sparkles, Star, Timer, X } from "lucide-react";'
if old_import not in s:
    raise SystemExit("Play import not found")
s = s.replace(old_import, new_import, 1)

old_state = "function Hero() {\n  const [videoStarted, setVideoStarted] = useState(false);\n\n  return ("
new_state = "function Hero() {\n  return ("
if old_state not in s:
    raise SystemExit("Hero video state not found")
s = s.replace(old_state, new_state, 1)

hero_start = s.index("function Hero()")
start_marker = '        <Reveal delay={200} className="relative">'
start = s.index(start_marker, hero_start)
end_marker = "        </Reveal>"
end = s.index(end_marker, start) + len(end_marker)

new_block = '''        <Reveal delay={200} className="relative">
          <div className="glass-strong relative rounded-[2rem] p-3 shadow-glow">
            <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] bg-black shadow-2xl">
              <img
                src="/hero-superlovable.webp"
                alt="Super Lovable ilimitada"
                className="h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </Reveal>'''

s = s[:start] + new_block + s[end:]

for forbidden in ("videoStarted", "youtube-nocookie.com", "i.ytimg.com/vi/ZXh1LKiESDs"):
    if forbidden in s:
        raise SystemExit(f"Old player residue remains: {forbidden}")

p.write_text(s)
