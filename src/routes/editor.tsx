import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { auth, useAuth } from "@/lib/auth-store";
import {
  ArrowLeft, Camera, User as UserIcon, Target, Briefcase, GraduationCap,
  Sparkles, Award, Plus, Trash2, Check, ChevronDown, ChevronUp, X,
} from "lucide-react";

export const Route = createFileRoute("/editor")({
  head: () => ({
    meta: [
      { title: "Resume Editor — Resumely" },
      { name: "description", content: "Edit your resume sections in one place." },
    ],
  }),
  component: EditorPage,
});

type Experience = {
  id: string; role: string; company: string; start: string; end: string; description: string;
};
type Education = {
  id: string; school: string; degree: string; start: string; end: string;
};
type Certificate = {
  id: string; name: string; issuer: string; year: string;
};

const uid = () => Math.random().toString(36).slice(2, 9);

function EditorPage() {
  const navigate = useNavigate();
  const user = useAuth();

  useEffect(() => {
    if (!auth.get()) navigate({ to: "/" });
  }, [navigate]);

  const [photo, setPhoto] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState(user?.name ?? "");
  const [title, setTitle] = useState("Senior Product Designer");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");

  const [objective, setObjective] = useState(
    "Product designer with 6+ years crafting human-centered digital experiences."
  );

  const [experiences, setExperiences] = useState<Experience[]>([
    { id: uid(), role: "Senior Product Designer", company: "Northwind", start: "2022", end: "Present", description: "Led design system adoption across 4 product teams." },
  ]);
  const [educations, setEducations] = useState<Education[]>([
    { id: uid(), school: "UC Berkeley", degree: "B.A. Design", start: "2014", end: "2018" },
  ]);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>(["Figma", "Design systems", "Prototyping", "User research"]);
  const [certificates, setCertificates] = useState<Certificate[]>([
    { id: uid(), name: "NN/g UX Certified", issuer: "Nielsen Norman Group", year: "2023" },
  ]);

  const [open, setOpen] = useState<string>("personal");
  const toggle = (id: string) => setOpen((cur) => (cur === id ? "" : id));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const addSkill = () => {
    const v = skillInput.trim();
    if (!v || skills.includes(v) || skills.length >= 30) return;
    setSkills([...skills, v.slice(0, 30)]);
    setSkillInput("");
  };

  if (!user) return null;

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-full">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-xl border-b border-border">
          <div className="px-5 pt-6 pb-3 flex items-center gap-3">
            <Link to="/home" className="h-9 w-9 rounded-full bg-secondary grid place-items-center hover:bg-muted transition">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Editing</p>
              <h1 className="text-base font-semibold truncate">{title || "Untitled resume"}</h1>
            </div>
            <button
              onClick={() => navigate({ to: "/home" })}
              className="h-9 px-3 rounded-full gradient-primary text-primary-foreground text-xs font-semibold inline-flex items-center gap-1 glow-primary"
            >
              <Check className="h-3.5 w-3.5" /> Save
            </button>
          </div>
        </div>

        <div className="flex-1 px-5 pt-5 pb-10 space-y-3">
          {/* Profile picture */}
          <div className="gradient-card rounded-2xl p-5 border border-border flex items-center gap-4">
            <div className="relative">
              <div className="h-20 w-20 rounded-2xl overflow-hidden bg-secondary grid place-items-center ring-2 ring-primary/30">
                {photo ? (
                  <img src={photo} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <UserIcon className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full gradient-primary grid place-items-center glow-primary"
                aria-label="Upload photo"
              >
                <Camera className="h-3.5 w-3.5 text-primary-foreground" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Profile photo</p>
              <p className="text-xs text-muted-foreground mt-0.5">PNG or JPG, up to 5MB</p>
              {photo && (
                <button onClick={() => setPhoto(null)} className="text-xs text-destructive mt-1.5 inline-flex items-center gap-1">
                  <Trash2 className="h-3 w-3" /> Remove
                </button>
              )}
            </div>
          </div>

          {/* Personal info */}
          <Section id="personal" title="Personal info" Icon={UserIcon} open={open} onToggle={toggle}>
            <Field label="Full name" value={fullName} onChange={setFullName} placeholder="Jane Doe" />
            <Field label="Job title" value={title} onChange={setTitle} placeholder="Product Designer" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Email" value={email} onChange={setEmail} type="email" placeholder="you@email.com" />
              <Field label="Phone" value={phone} onChange={setPhone} placeholder="+1 555…" />
            </div>
            <Field label="Location" value={location} onChange={setLocation} placeholder="San Francisco, CA" />
            <Field label="Website / LinkedIn" value={website} onChange={setWebsite} placeholder="linkedin.com/in/…" />
          </Section>

          {/* Career objective */}
          <Section id="objective" title="Career objective" Icon={Target} open={open} onToggle={toggle}>
            <textarea
              value={objective}
              onChange={(e) => setObjective(e.target.value.slice(0, 600))}
              rows={4}
              placeholder="Briefly describe your goals and what you bring to the table."
              className="w-full rounded-xl bg-input border border-border px-3.5 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 resize-none"
            />
            <p className="text-[10px] text-muted-foreground text-right">{objective.length}/600</p>
          </Section>

          {/* Work experience */}
          <Section id="experience" title="Work experience" Icon={Briefcase} open={open} onToggle={toggle}
            count={experiences.length}>
            <div className="space-y-3">
              {experiences.map((exp, i) => (
                <div key={exp.id} className="rounded-xl border border-border bg-surface p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">#{i + 1}</span>
                    <button onClick={() => setExperiences(experiences.filter((x) => x.id !== exp.id))}
                      className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <Field label="Role" value={exp.role}
                    onChange={(v) => setExperiences(experiences.map((x) => x.id === exp.id ? { ...x, role: v } : x))} />
                  <Field label="Company" value={exp.company}
                    onChange={(v) => setExperiences(experiences.map((x) => x.id === exp.id ? { ...x, company: v } : x))} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Start" value={exp.start} placeholder="2022"
                      onChange={(v) => setExperiences(experiences.map((x) => x.id === exp.id ? { ...x, start: v } : x))} />
                    <Field label="End" value={exp.end} placeholder="Present"
                      onChange={(v) => setExperiences(experiences.map((x) => x.id === exp.id ? { ...x, end: v } : x))} />
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground">Description</label>
                    <textarea
                      value={exp.description} rows={3}
                      onChange={(e) => setExperiences(experiences.map((x) => x.id === exp.id ? { ...x, description: e.target.value.slice(0, 500) } : x))}
                      className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 resize-none"
                      placeholder="Key impact, metrics, ownership…"
                    />
                  </div>
                </div>
              ))}
              <AddButton label="Add experience" onClick={() =>
                setExperiences([...experiences, { id: uid(), role: "", company: "", start: "", end: "", description: "" }])
              } />
            </div>
          </Section>

          {/* Education */}
          <Section id="education" title="Education" Icon={GraduationCap} open={open} onToggle={toggle}
            count={educations.length}>
            <div className="space-y-3">
              {educations.map((ed, i) => (
                <div key={ed.id} className="rounded-xl border border-border bg-surface p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">#{i + 1}</span>
                    <button onClick={() => setEducations(educations.filter((x) => x.id !== ed.id))}
                      className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <Field label="School" value={ed.school}
                    onChange={(v) => setEducations(educations.map((x) => x.id === ed.id ? { ...x, school: v } : x))} />
                  <Field label="Degree" value={ed.degree}
                    onChange={(v) => setEducations(educations.map((x) => x.id === ed.id ? { ...x, degree: v } : x))} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Start" value={ed.start}
                      onChange={(v) => setEducations(educations.map((x) => x.id === ed.id ? { ...x, start: v } : x))} />
                    <Field label="End" value={ed.end}
                      onChange={(v) => setEducations(educations.map((x) => x.id === ed.id ? { ...x, end: v } : x))} />
                  </div>
                </div>
              ))}
              <AddButton label="Add education" onClick={() =>
                setEducations([...educations, { id: uid(), school: "", degree: "", start: "", end: "" }])
              } />
            </div>
          </Section>

          {/* Skills */}
          <Section id="skills" title="Skills" Icon={Sparkles} open={open} onToggle={toggle} count={skills.length}>
            <div className="flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
                placeholder="e.g. TypeScript"
                className="flex-1 rounded-xl bg-input border border-border px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60"
              />
              <button onClick={addSkill}
                className="h-10 px-4 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold">
                Add
              </button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {skills.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-full bg-secondary border border-border text-xs">
                    {s}
                    <button onClick={() => setSkills(skills.filter((x) => x !== s))}
                      className="h-4 w-4 rounded-full grid place-items-center hover:bg-muted">
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </Section>

          {/* Certificates */}
          <Section id="certificates" title="Certificates & licenses" Icon={Award} open={open} onToggle={toggle}
            count={certificates.length}>
            <div className="space-y-3">
              {certificates.map((c, i) => (
                <div key={c.id} className="rounded-xl border border-border bg-surface p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">#{i + 1}</span>
                    <button onClick={() => setCertificates(certificates.filter((x) => x.id !== c.id))}
                      className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <Field label="Name" value={c.name}
                    onChange={(v) => setCertificates(certificates.map((x) => x.id === c.id ? { ...x, name: v } : x))} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Issuer" value={c.issuer}
                      onChange={(v) => setCertificates(certificates.map((x) => x.id === c.id ? { ...x, issuer: v } : x))} />
                    <Field label="Year" value={c.year}
                      onChange={(v) => setCertificates(certificates.map((x) => x.id === c.id ? { ...x, year: v } : x))} />
                  </div>
                </div>
              ))}
              <AddButton label="Add certificate" onClick={() =>
                setCertificates([...certificates, { id: uid(), name: "", issuer: "", year: "" }])
              } />
            </div>
          </Section>
        </div>
      </div>
    </PhoneFrame>
  );
}

function Section({
  id, title, Icon, open, onToggle, children, count,
}: {
  id: string; title: string; Icon: React.ComponentType<{ className?: string }>;
  open: string; onToggle: (id: string) => void; children: React.ReactNode; count?: number;
}) {
  const isOpen = open === id;
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-surface transition"
      >
        <div className="h-9 w-9 rounded-lg bg-secondary grid place-items-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">{title}</p>
          {typeof count === "number" && (
            <p className="text-[11px] text-muted-foreground mt-0.5">{count} {count === 1 ? "entry" : "entries"}</p>
          )}
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>
      {isOpen && <div className="px-4 pb-4 space-y-3">{children}</div>}
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="text-[11px] text-muted-foreground">{label}</label>
      <input
        type={type} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value.slice(0, 200))}
        className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60"
      />
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full h-11 rounded-xl border border-dashed border-border hover:border-primary/60 hover:bg-primary/5 text-sm text-muted-foreground hover:text-foreground transition inline-flex items-center justify-center gap-2"
    >
      <Plus className="h-4 w-4" /> {label}
    </button>
  );
}
