import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { auth } from "@/lib/auth-store";
import { useResume, exports_ } from "@/lib/resume-store";
import { ArrowLeft, Download, Mail, Phone, MapPin, Globe } from "lucide-react";

export const Route = createFileRoute("/preview")({
  head: () => ({
    meta: [{ title: "Preview — Resumely" }],
  }),
  component: PreviewPage,
});

function PreviewPage() {
  const navigate = useNavigate();
  const [resume] = useResume();

  useEffect(() => { if (!auth.get()) navigate({ to: "/" }); }, [navigate]);

  const handleExport = () => {
    const name = `${(resume.fullName || "resume").trim().replace(/\s+/g, "_")}.pdf`;
    exports_.add({ name, format: "PDF", size: "—" });
    // Approximate size after a tick — kept simple, real size unknown until OS save
    window.print();
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col min-h-full no-print">
        <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-xl border-b border-border">
          <div className="px-5 pt-6 pb-3 flex items-center gap-3">
            <Link to="/editor" className="h-9 w-9 rounded-full bg-secondary grid place-items-center hover:bg-muted transition">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Preview</p>
              <h1 className="text-base font-semibold truncate">{resume.title || "Resume"}</h1>
            </div>
            <button onClick={handleExport} className="h-9 px-3 rounded-full gradient-primary text-primary-foreground text-xs font-semibold inline-flex items-center gap-1 glow-primary">
              <Download className="h-3.5 w-3.5" /> Export PDF
            </button>
          </div>
        </div>
        <div className="flex-1 px-4 py-5">
          <div className="rounded-xl overflow-hidden shadow-card mx-auto" style={{ background: "#fff", color: "#111" }}>
            <ResumeDocument />
          </div>
          <p className="text-[11px] text-muted-foreground text-center mt-3">
            Tip: Choose "Save as PDF" in the print dialog.
          </p>
        </div>
      </div>
      {/* Print-only document */}
      <div className="print-only">
        <ResumeDocument />
      </div>
    </PhoneFrame>
  );
}

function ResumeDocument() {
  const [resume] = useResume();
  return (
    <div id="resume-doc" style={{ background: "#fff", color: "#111", padding: "28px", fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", lineHeight: 1.5 }}>
      <header style={{ display: "flex", gap: "16px", alignItems: "center", borderBottom: "2px solid #6e56cf", paddingBottom: "14px" }}>
        {resume.photo && (
          <img src={resume.photo} alt="" style={{ width: 64, height: 64, borderRadius: 8, objectFit: "cover" }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "22px", margin: 0, fontWeight: 700, color: "#111", letterSpacing: "-0.01em" }}>
            {resume.fullName || "Your Name"}
          </h1>
          <p style={{ margin: "2px 0 6px", color: "#6e56cf", fontWeight: 600, fontSize: "12px" }}>
            {resume.title}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", color: "#444", fontSize: "10px" }}>
            {resume.email && <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}><Mail size={10} /> {resume.email}</span>}
            {resume.phone && <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}><Phone size={10} /> {resume.phone}</span>}
            {resume.location && <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}><MapPin size={10} /> {resume.location}</span>}
            {resume.website && <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}><Globe size={10} /> {resume.website}</span>}
          </div>
        </div>
      </header>

      {resume.objective && (
        <Block title="Objective">
          <p style={{ margin: 0 }}>{resume.objective}</p>
        </Block>
      )}

      {resume.experiences.length > 0 && (
        <Block title="Experience">
          {resume.experiences.map((e) => (
            <div key={e.id} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <strong style={{ fontSize: 12 }}>{e.role || "Role"} · <span style={{ fontWeight: 500 }}>{e.company}</span></strong>
                <span style={{ fontSize: 10, color: "#666" }}>{e.start}{e.end ? ` – ${e.end}` : ""}</span>
              </div>
              {e.description && <p style={{ margin: "3px 0 0", color: "#333" }}>{e.description}</p>}
            </div>
          ))}
        </Block>
      )}

      {resume.educations.length > 0 && (
        <Block title="Education">
          {resume.educations.map((ed) => (
            <div key={ed.id} style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong style={{ fontSize: 12 }}>{ed.school}</strong>
                <div style={{ color: "#555" }}>{ed.degree}</div>
              </div>
              <span style={{ fontSize: 10, color: "#666" }}>{ed.start}{ed.end ? ` – ${ed.end}` : ""}</span>
            </div>
          ))}
        </Block>
      )}

      {resume.skills.length > 0 && (
        <Block title="Skills">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {resume.skills.map((s) => (
              <span key={s} style={{ background: "#f0ecff", color: "#4c3aa5", padding: "3px 8px", borderRadius: 999, fontSize: 10, fontWeight: 500 }}>{s}</span>
            ))}
          </div>
        </Block>
      )}

      {resume.certificates.length > 0 && (
        <Block title="Certificates & Licenses">
          {resume.certificates.map((c) => (
            <div key={c.id} style={{ marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong style={{ fontSize: 12 }}>{c.name}</strong>
                <span style={{ color: "#555" }}> · {c.issuer}</span>
              </div>
              <span style={{ fontSize: 10, color: "#666" }}>{c.year}</span>
            </div>
          ))}
        </Block>
      )}
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 14 }}>
      <h2 style={{ fontSize: 11, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#6e56cf", fontWeight: 700 }}>
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
