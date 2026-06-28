/* PREMA ENGINEERING WORKS — Shared Corner Brackets */
/*
 * The viewfinder/inspection-frame corner markers used on every
 * visualization panel across CaseStudies, QualityVerification,
 * TechnicalResourceLibrary, and EmergencyBreakdownCenter — previously
 * the same 4-string array + map repeated verbatim in each file.
 */

const POSITIONS = [
  'top-3 left-3 border-t border-l',
  'top-3 right-3 border-t border-r',
  'bottom-3 left-3 border-b border-l',
  'bottom-3 right-3 border-b border-r',
];

export default function CornerBrackets() {
  return (
    <>
      {POSITIONS.map((pos) => (
        <div key={pos} className={`absolute w-4 h-4 border-accent/60 ${pos}`} />
      ))}
    </>
  );
}
