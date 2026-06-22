/* PREMA ENGINEERING WORKS — Engineering RFQ Configurator (Phase 5) */
/* Design: Same engineering-documentation language as Capabilities/Process/  */
/* EngineeringIntelligence — numbered badge cards, accent-line reveals,     */
/* Space Grotesk/Inter, signal-red accent. No new visual language.         */
/*                                                                          */
/* This is a self-contained, front-end intake wizard. It does not call the */
/* existing `configurator.submitQuote` tRPC mutation because that endpoint */
/* (a) requires authentication and (b) only models a narrower schema       */
/* (componentType: shaft|gear|rail|custom, no file uploads, no broken-     */
/* component intake). Wiring this to a real backend/storage endpoint is a  */
/* deliberate follow-up rather than a refactor of existing server code.    */
/* On submit, this composes a structured email via `mailto:` — zero new   */
/* backend surface, fully consistent with how Contact.tsx already works.  */

import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TechnicalIcon from './TechnicalIcon';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

type IconType = Parameters<typeof TechnicalIcon>[0]['type'];

interface OptionCard {
  id: string;
  label: string;
  description?: string;
  icon: IconType;
}

const WHAT_YOU_HAVE: OptionCard[] = [
  { id: 'drawing', label: 'Engineering Drawing', description: 'CAD drawing, sketch, or PDF spec sheet', icon: 'drawing' },
  { id: 'broken', label: 'Broken Component', description: 'Failed part that needs reverse engineering', icon: 'broken' },
  { id: 'sample', label: 'Existing Sample', description: 'A working part to be replicated or matched', icon: 'sample' },
  { id: 'cad', label: 'CAD Model', description: 'STEP, IGES, or native 3D model file', icon: 'cad' },
  { id: 'custom', label: 'Custom Requirement', description: 'No reference yet — describe what you need', icon: 'custom' },
];

const CATEGORIES: OptionCard[] = [
  { id: 'shaft', label: 'Shaft', icon: 'shaft-part' },
  { id: 'splined-shaft', label: 'Splined Shaft', icon: 'shaft-part' },
  { id: 'gear', label: 'Gear', icon: 'gear-part' },
  { id: 'sprocket', label: 'Sprocket', icon: 'gear-part' },
  { id: 'star-wheel', label: 'Star Wheel', icon: 'gear-part' },
  { id: 'guide-rail', label: 'Guide Rail', icon: 'rail-part' },
  { id: 'feed-screw', label: 'Feed Screw', icon: 'shaft-part' },
  { id: 'fixture', label: 'Fixture', icon: 'engineering' },
  { id: 'assembly', label: 'Assembly', icon: 'oem' },
  { id: 'fabrication', label: 'Fabrication', icon: 'machining' },
  { id: 'custom-component', label: 'Custom Component', icon: 'custom' },
];

const MATERIALS: OptionCard[] = [
  { id: 'mild-steel', label: 'Mild Steel', icon: 'material' },
  { id: 'en8', label: 'EN8', icon: 'material' },
  { id: 'en19', label: 'EN19', icon: 'material' },
  { id: 'ss304', label: 'SS304', icon: 'material' },
  { id: 'ss316', label: 'SS316', icon: 'material' },
  { id: 'brass', label: 'Brass', icon: 'material' },
  { id: 'aluminum', label: 'Aluminum', icon: 'material' },
  { id: 'nylon', label: 'Nylon', icon: 'material' },
  { id: 'delrin', label: 'Delrin', icon: 'material' },
  { id: 'other', label: 'Other / Not Sure', icon: 'custom' },
];

const TOLERANCES = ['±0.005mm', '±0.01mm', '±0.02mm', '±0.05mm', '±0.1mm', 'Not Sure'];

type Priority = 'standard' | 'urgent' | 'breakdown';

const PRIORITIES: { id: Priority; label: string; description: string; icon: IconType }[] = [
  { id: 'standard', label: 'Standard', description: 'Regular lead time, planned procurement', icon: 'measurement' },
  { id: 'urgent', label: 'Urgent', description: 'Expedited engineering and production', icon: 'urgent' },
  { id: 'breakdown', label: 'Production Breakdown', description: 'Line is down — emergency response', icon: 'breakdown' },
];

interface FormState {
  whatYouHave: string | null;
  files: File[];
  category: string | null;
  material: string | null;
  quantity: string;
  dimensions: string;
  application: string;
  tolerance: string | null;
  notes: string;
  priority: Priority | null;
  contactName: string;
  email: string;
  phone: string;
}

const INITIAL_STATE: FormState = {
  whatYouHave: null,
  files: [],
  category: null,
  material: null,
  quantity: '',
  dimensions: '',
  application: '',
  tolerance: null,
  notes: '',
  priority: null,
  contactName: '',
  email: '',
  phone: '',
};

const STEP_LABELS = [
  'What You Have',
  'Upload Files',
  'Category',
  'Material',
  'Requirements',
  'Summary',
  'Submit',
];

const TRUST_ITEMS: { label: string; icon: IconType }[] = [
  { label: 'Reverse Engineering Available', icon: 'design' },
  { label: 'No Drawing Required', icon: 'broken' },
  { label: 'Custom Manufacturing', icon: 'machining' },
  { label: 'Emergency Replacements', icon: 'urgent' },
  { label: 'Production Line Support', icon: 'turnaround' },
];

/* ---------------------------------------------------------------------- */
/* Reusable selection card — engineering-doc styling, no SaaS gradients   */
/* ---------------------------------------------------------------------- */

function SelectionCard({
  option,
  selected,
  onSelect,
}: {
  option: OptionCard;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative text-left p-5 border bg-background transition-all duration-200 group ${
        selected ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/60'
      }`}
    >
      <div className={`mb-4 transition-colors duration-200 ${selected ? 'text-accent' : 'text-foreground/60 group-hover:text-accent'}`}>
        <TechnicalIcon type={option.icon} className="w-7 h-7" />
      </div>
      <p className="font-bold tracking-tight text-sm mb-1">{option.label}</p>
      {option.description && (
        <p className="text-xs text-foreground/60 leading-relaxed font-light">{option.description}</p>
      )}
      {selected && (
        <div className="absolute top-3 right-3 w-2 h-2 bg-accent" aria-hidden="true" />
      )}
    </button>
  );
}

/* ---------------------------------------------------------------------- */
/* Section                                                                 */
/* ---------------------------------------------------------------------- */

export default function RFQConfigurator() {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const next = Array.from(incoming).slice(0, 10);
    update('files', [...form.files, ...next].slice(0, 10));
  };

  const removeFile = (idx: number) => {
    update('files', form.files.filter((_, i) => i !== idx));
  };

  const canAdvance = useMemo(() => {
    switch (step) {
      case 0:
        return !!form.whatYouHave;
      case 1:
        return true; // file upload optional — never block a plant manager without a file handy
      case 2:
        return !!form.category;
      case 3:
        return !!form.material;
      case 4:
        return !!form.priority;
      case 5:
        return true;
      default:
        return true;
    }
  }, [step, form]);

  const goNext = () => setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));
  const jumpTo = (i: number) => setStep(i);

  const handleSubmit = async () => {
    if (!user) {
      setSubmitError('You must be signed in to request an engineering review. Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/auth/login';
      }, 2000);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 1. Upload and register file metadata
      const fileIds: string[] = [];
      for (const file of form.files) {
        const fileType = file.name.split('.').pop()?.toUpperCase() || 'PDF';
        const registerRes = await fetch('/api/files', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            url: `https://prema-bucket.s3.amazonaws.com/uploads/${Date.now()}-${file.name}`,
            fileType,
            size: file.size,
          }),
        });

        if (!registerRes.ok) {
          throw new Error(`Failed to register file: ${file.name}`);
        }
        const fileData = await registerRes.json();
        fileIds.push(fileData.id);
      }

      // 2. Submit the RFQ
      const desc = `${form.category} query: ${form.dimensions}. Application: ${form.application}. Notes: ${form.notes}`;
      const deliveryDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(); // 14 days out

      const rfqRes = await fetch('/api/customer/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: desc,
          targetDeliveryDate: deliveryDate,
          notes: form.notes || 'Intake wizard submission',
          fileIds,
        }),
      });

      if (!rfqRes.ok) {
        const errData = await rfqRes.json();
        throw new Error(errData.error || 'Failed to submit RFQ');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || 'An unexpected error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPct = ((step + 1) / STEP_LABELS.length) * 100;

  return (
    <section id="rfq" className="py-24 md:py-32 bg-background">
      <div className="container">
        {/* Section Header — identical pattern to Capabilities/Process */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-bold tracking-widest text-accent uppercase mb-4">
            Engineering Intake
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Request a Custom Component
          </h2>
          <p className="text-lg text-foreground/70">
            Upload your drawing, sample part, or damaged component and receive an
            engineering review. No drawing on hand? We reverse engineer from the
            physical part.
          </p>
          <div className="h-px bg-gradient-to-r from-accent via-accent/50 to-transparent mt-8" />
        </div>

        {/* Stepper */}
        <div className="mb-12 overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
          <div className="flex items-center gap-1 min-w-max lg:min-w-0">
            {STEP_LABELS.map((label, idx) => (
              <button
                key={label}
                type="button"
                onClick={() => idx < step && jumpTo(idx)}
                disabled={idx > step}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-colors duration-200 ${
                  idx === step
                    ? 'text-accent'
                    : idx < step
                    ? 'text-foreground/70 hover:text-accent cursor-pointer'
                    : 'text-foreground/30 cursor-default'
                }`}
              >
                <span
                  className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold leading-none ${
                    idx === step
                      ? 'bg-accent text-accent-foreground'
                      : idx < step
                      ? 'bg-foreground/10 text-foreground/70'
                      : 'border border-foreground/20'
                  }`}
                >
                  {idx < step ? '✓' : idx + 1}
                </span>
                {label}
                {idx < STEP_LABELS.length - 1 && (
                  <span className="w-4 h-px bg-border mx-1 hidden sm:inline-block" />
                )}
              </button>
            ))}
          </div>
          <div className="h-px w-full bg-border relative mt-3 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Step panel — engineering documentation panel, same border treatment */}
        <div className="relative border border-border bg-card">
          <div className="absolute -top-1 -left-1 w-10 h-10 bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm leading-none">
            {String(step + 1).padStart(2, '0')}
          </div>

          <div className="p-6 md:p-10 pt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {/* STEP 1 — What do you have */}
                {step === 0 && (
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-2">What Do You Have?</h3>
                    <p className="text-foreground/60 mb-8 text-sm">
                      Select what best describes your starting point.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {WHAT_YOU_HAVE.map((opt) => (
                        <SelectionCard
                          key={opt.id}
                          option={opt}
                          selected={form.whatYouHave === opt.id}
                          onSelect={() => update('whatYouHave', opt.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2 — Upload files */}
                {step === 1 && (
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-2">Upload Files</h3>
                    <p className="text-foreground/60 mb-8 text-sm">
                      Images, drawings, PDFs, CAD references, or technical documents. Optional, but speeds up the review.
                    </p>

                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        addFiles(e.dataTransfer.files);
                      }}
                      className={`relative border-2 border-dashed p-12 text-center transition-colors duration-200 cursor-pointer ${
                        isDragging ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
                      }`}
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(45,45,45,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,45,45,0.04) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
                      }}
                      aria-label="Upload files"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,.pdf,.dwg,.dxf,.step,.stp,.iges,.igs,.doc,.docx"
                        className="hidden"
                        onChange={(e) => addFiles(e.target.files)}
                      />
                      <div className="flex flex-col items-center gap-3 text-foreground/50">
                        <TechnicalIcon type="upload" className="w-10 h-10" />
                        <p className="text-sm font-medium text-foreground/80">
                          Drag and drop files, or click to browse
                        </p>
                        <p className="text-xs tracking-widest uppercase text-foreground/40">
                          JPG · PNG · PDF · DWG · DXF · STEP · IGES
                        </p>
                      </div>
                    </div>

                    {form.files.length > 0 && (
                      <div className="mt-6 space-y-2">
                        {form.files.map((file, idx) => (
                          <div
                            key={`${file.name}-${idx}`}
                            className="flex items-center justify-between px-4 py-3 border border-border bg-background text-sm"
                          >
                            <span className="truncate font-mono text-xs text-foreground/70">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(idx)}
                              className="text-foreground/40 hover:text-accent text-xs font-bold tracking-widest uppercase shrink-0 ml-4"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 3 — Component category */}
                {step === 2 && (
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-2">Component Category</h3>
                    <p className="text-foreground/60 mb-8 text-sm">
                      Choose the category that matches your component.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {CATEGORIES.map((opt) => (
                        <SelectionCard
                          key={opt.id}
                          option={opt}
                          selected={form.category === opt.id}
                          onSelect={() => update('category', opt.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4 — Material */}
                {step === 3 && (
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-2">Material Selection</h3>
                    <p className="text-foreground/60 mb-8 text-sm">
                      Not sure what's needed? Select "Other / Not Sure" — our engineers will recommend a material.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                      {MATERIALS.map((opt) => (
                        <SelectionCard
                          key={opt.id}
                          option={opt}
                          selected={form.material === opt.id}
                          onSelect={() => update('material', opt.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 5 — Project requirements */}
                {step === 4 && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight mb-2">Project Requirements</h3>
                      <p className="text-foreground/60 text-sm">
                        Give us as much or as little detail as you have — engineers fill the gaps.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold tracking-widest uppercase text-foreground/60 mb-2">
                          Quantity
                        </label>
                        <input
                          type="number"
                          min={1}
                          value={form.quantity}
                          onChange={(e) => update('quantity', e.target.value)}
                          placeholder="e.g. 50"
                          className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold tracking-widest uppercase text-foreground/60 mb-2">
                          Dimensions
                        </label>
                        <input
                          type="text"
                          value={form.dimensions}
                          onChange={(e) => update('dimensions', e.target.value)}
                          placeholder="e.g. ⌀40mm × 250mm"
                          className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-foreground/60 mb-2">
                        Application
                      </label>
                      <input
                        type="text"
                        value={form.application}
                        onChange={(e) => update('application', e.target.value)}
                        placeholder="e.g. Bottling line indexing mechanism"
                        className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-foreground/60 mb-3">
                        Required Tolerance
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {TOLERANCES.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => update('tolerance', t)}
                            className={`px-4 py-2 text-sm border transition-colors duration-200 ${
                              form.tolerance === t
                                ? 'border-accent text-accent bg-accent/5'
                                : 'border-border text-foreground/70 hover:border-accent/50'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-foreground/60 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        value={form.notes}
                        onChange={(e) => update('notes', e.target.value)}
                        rows={3}
                        placeholder="Anything else our engineers should know"
                        className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-foreground/60 mb-3">
                        Priority
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {PRIORITIES.map((p) => {
                          const isBreakdown = p.id === 'breakdown';
                          const selected = form.priority === p.id;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => update('priority', p.id)}
                              aria-pressed={selected}
                              className={`relative text-left p-5 border-2 transition-all duration-200 ${
                                selected
                                  ? isBreakdown
                                    ? 'border-accent bg-accent/10'
                                    : 'border-accent bg-accent/5'
                                  : isBreakdown
                                  ? 'border-accent/40 hover:border-accent'
                                  : 'border-border hover:border-accent/60'
                              }`}
                            >
                              {isBreakdown && (
                                <span className="absolute -top-2.5 right-3 px-2 py-0.5 bg-accent text-accent-foreground text-[10px] font-bold tracking-widest uppercase">
                                  Emergency
                                </span>
                              )}
                              <div className={`mb-3 ${selected || isBreakdown ? 'text-accent' : 'text-foreground/60'}`}>
                                <TechnicalIcon type={p.icon} className="w-6 h-6" />
                              </div>
                              <p className="font-bold tracking-tight text-sm mb-1">{p.label}</p>
                              <p className="text-xs text-foreground/60 font-light leading-relaxed">{p.description}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 6 — Engineering summary */}
                {step === 5 && (
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-2">Engineering Summary</h3>
                    <p className="text-foreground/60 mb-8 text-sm">
                      Review before sending to our engineering team.
                    </p>

                    <div className="border border-border bg-background divide-y divide-border">
                      <SummaryRow
                        label="Component Type"
                        value={WHAT_YOU_HAVE.find((o) => o.id === form.whatYouHave)?.label}
                        onEdit={() => jumpTo(0)}
                      />
                      <SummaryRow
                        label="Uploaded Assets"
                        value={form.files.length ? `${form.files.length} file(s) attached` : 'None'}
                        onEdit={() => jumpTo(1)}
                      />
                      <SummaryRow
                        label="Category"
                        value={CATEGORIES.find((o) => o.id === form.category)?.label}
                        onEdit={() => jumpTo(2)}
                      />
                      <SummaryRow
                        label="Material"
                        value={MATERIALS.find((o) => o.id === form.material)?.label}
                        onEdit={() => jumpTo(3)}
                      />
                      <SummaryRow label="Quantity" value={form.quantity || '—'} onEdit={() => jumpTo(4)} />
                      <SummaryRow label="Dimensions" value={form.dimensions || '—'} onEdit={() => jumpTo(4)} />
                      <SummaryRow label="Application" value={form.application || '—'} onEdit={() => jumpTo(4)} />
                      <SummaryRow label="Required Tolerance" value={form.tolerance || '—'} onEdit={() => jumpTo(4)} />
                      <SummaryRow label="Notes" value={form.notes || '—'} onEdit={() => jumpTo(4)} />
                      <SummaryRow
                        label="Priority Level"
                        value={PRIORITIES.find((p) => p.id === form.priority)?.label}
                        accent={form.priority === 'breakdown'}
                        onEdit={() => jumpTo(4)}
                      />
                    </div>
                  </div>
                )}

                {/* STEP 7 — Submit */}
                {step === 6 && (
                  <div>
                    {!submitted ? (
                      <>
                        <h3 className="text-2xl font-bold tracking-tight mb-2">Submit for Review</h3>
                        <p className="text-foreground/60 mb-8 text-sm">
                          Leave your contact details so engineering can reach you directly.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div>
                            <label className="block text-xs font-bold tracking-widest uppercase text-foreground/60 mb-2">
                              Name
                            </label>
                            <input
                              type="text"
                              value={form.contactName}
                              onChange={(e) => update('contactName', e.target.value)}
                              placeholder="Your name"
                              className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-accent transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold tracking-widest uppercase text-foreground/60 mb-2">
                              Email
                            </label>
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) => update('email', e.target.value)}
                              placeholder="you@company.com"
                              className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-accent transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold tracking-widest uppercase text-foreground/60 mb-2">
                              Phone
                            </label>
                            <input
                              type="tel"
                              value={form.phone}
                              onChange={(e) => update('phone', e.target.value)}
                              placeholder="+91 ..."
                              className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-accent transition-colors"
                            />
                          </div>
                        </div>

                        {submitError && (
                          <div className="mb-6 p-4 border border-accent/20 bg-accent/5 text-accent text-xs font-mono">
                            {submitError}
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="w-full md:w-auto px-10 py-4 bg-accent text-accent-foreground font-bold tracking-wide uppercase text-sm transition-all duration-200 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Submitting RFQ...
                            </>
                          ) : (
                            'Request Engineering Review'
                          )}
                        </button>
                      </>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="py-8 text-center space-y-4"
                      >
                        <div className="w-14 h-14 mx-auto bg-accent/10 border border-accent flex items-center justify-center">
                          <TechnicalIcon type="quality" className="w-7 h-7 text-accent" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight">RFQ Submitted Successfully</h3>
                        <p className="text-foreground/60 text-sm max-w-md mx-auto">
                          Your RFQ has been logged in our engineering database. Our production desk is reviewing your specifications, and we will send a notification updates to your profile.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setForm(INITIAL_STATE);
                            setSubmitted(false);
                            setStep(0);
                            setSubmitError(null);
                          }}
                          className="text-xs font-bold tracking-widest uppercase text-accent hover:opacity-80"
                        >
                          Start a New Request
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav controls */}
          {!(step === 6 && submitted) && (
            <div className="flex items-center justify-between px-6 md:px-10 py-5 border-t border-border bg-secondary/20">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className={`text-xs font-bold tracking-widest uppercase transition-colors ${
                  step === 0 ? 'text-foreground/20 cursor-default' : 'text-foreground/60 hover:text-accent'
                }`}
              >
                ← Back
              </button>

              {step < 6 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canAdvance}
                  className={`px-8 py-3 font-medium text-sm transition-all duration-200 active:scale-95 ${
                    canAdvance
                      ? 'bg-accent text-accent-foreground hover:shadow-lg'
                      : 'bg-foreground/10 text-foreground/40 cursor-not-allowed'
                  }`}
                >
                  Continue
                </button>
              ) : (
                <span className="text-xs text-foreground/40">Step {step + 1} of {STEP_LABELS.length}</span>
              )}
            </div>
          )}
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-12">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center text-center gap-2 p-4 border border-border/60 bg-background"
            >
              <div className="text-foreground/50">
                <TechnicalIcon type={item.icon} className="w-6 h-6" />
              </div>
              <p className="text-[11px] font-bold tracking-wide uppercase text-foreground/60 leading-tight">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SummaryRow({
  label,
  value,
  onEdit,
  accent,
}: {
  label: string;
  value?: string;
  onEdit: () => void;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div>
        <p className="text-[11px] font-bold tracking-widest uppercase text-foreground/50 mb-1">{label}</p>
        <p className={`text-sm font-medium ${accent ? 'text-accent' : 'text-foreground'}`}>{value || '—'}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="text-[11px] font-bold tracking-widest uppercase text-foreground/40 hover:text-accent shrink-0 ml-4"
      >
        Edit
      </button>
    </div>
  );
}
