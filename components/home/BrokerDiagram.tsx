import { useTranslations } from "next-intl";

// Line schematic of the broker mechanism, drawn for the navy ground: several
// operators feed one Cherryz comparison, which delivers one connection to the
// client's site. A horizontal layout for wide screens, a vertical one for phones.
const OPERATORS = [
  { name: "Camtel", logo: "/logos/trim/camtel.png" },
  { name: "Orange", logo: "/logos/trim/orange.png" },
  { name: "MTN", logo: "/logos/trim/mtn.png" },
  { name: "" }, // other operators: labelled from the copy
];

const INK = "#ffffff";
const SOFT = "rgba(255,255,255,0.72)";
const font = { fontFamily: "var(--font-condensed)" };

function OperatorNode({ x, y, w, op, others }: { x: number; y: number; w: number; op: (typeof OPERATORS)[number]; others: string }) {
  return (
    <g>
      <rect x={x} y={y - 24} width={w} height="48" rx="6" fill="#fff" />
      {op.logo ? (
        <>
          <image href={op.logo} x={x + 10} y={y - 15} width="30" height="30" />
          <text x={x + 50} y={y + 6} fontSize="17" fontWeight="700" fill="#101b28">
            {op.name}
          </text>
        </>
      ) : (
        <text x={x + w / 2} y={y + 6} textAnchor="middle" fontSize="16" fontWeight="700" fill="#101b28">
          {others}
        </text>
      )}
    </g>
  );
}

function Building({ x, y }: { x: number; y: number }) {
  return (
    <g fill="none" stroke={INK} strokeWidth="1.5" strokeLinejoin="round">
      <rect x={x} y={y} width="96" height="98" rx="3" />
      <path d={`M${x + 48} ${y} V ${y - 30} M${x + 36} ${y - 20} Q ${x + 48} ${y - 32} ${x + 60} ${y - 20} M${x + 28} ${y - 28} Q ${x + 48} ${y - 48} ${x + 68} ${y - 28}`} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={x + 12 + c * 26} y={y + 12 + r * 22} width="16" height="12" rx="1.5" />),
      )}
      <rect x={x + 38} y={y + 78} width="20" height="20" />
    </g>
  );
}

function Hub({ cx, cy, sub }: { cx: number; cy: number; sub: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="58" fill="#a2032d" />
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff">
        Cherryz
      </text>
      <text x={cx} y={cy + 17} textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">
        {sub}
      </text>
    </g>
  );
}

export function BrokerDiagramWide({ className }: { className?: string }) {
  const t = useTranslations("Home.broker.diagram");
  const ys = [40, 112, 184, 256];
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label={t("label")} className={className} style={font}>
      {OPERATORS.map((op, i) => (
        <g key={op.name}>
          <OperatorNode x={1} y={ys[i]} w={170} op={op} others={t("others")} />
          <path
            d={`M171 ${ys[i]} C 225 ${ys[i]}, 225 150, 262 150`}
            fill="none"
            stroke={INK}
            strokeOpacity="0.7"
            strokeWidth="1.5"
            strokeDasharray={op.logo ? undefined : "5 5"}
          />
        </g>
      ))}
      <Hub cx={320} cy={150} sub={t("hub")} />
      <path d="M378 150 H 482" fill="none" stroke={INK} strokeWidth="2.5" />
      <path d="M474 142 L 484 150 L 474 158" fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <text x="430" y="136" textAnchor="middle" fontSize="13" fontWeight="600" letterSpacing="1" fill={SOFT}>
        {t("connection")}
      </text>
      <Building x={510} y={112} />
      <text x="558" y="236" textAnchor="middle" fontSize="17" fontWeight="700" fill={INK}>
        {t("site")}
      </text>
      <text x="558" y="256" textAnchor="middle" fontSize="13.5" fontWeight="600" fill={SOFT}>
        {t("siteSub")}
      </text>
    </svg>
  );
}

export function BrokerDiagramTall({ className }: { className?: string }) {
  const t = useTranslations("Home.broker.diagram");
  const nodes = [
    { x: 1, y: 30 },
    { x: 177, y: 30 },
    { x: 1, y: 94 },
    { x: 177, y: 94 },
  ];
  return (
    <svg viewBox="0 0 340 590" role="img" aria-label={t("label")} className={className} style={font}>
      {OPERATORS.map((op, i) => {
        const n = nodes[i];
        const sx = n.x + 81;
        const sy = n.y + 24;
        return (
          <g key={op.name}>
            <path
              d={`M${sx} ${sy} C ${sx} 190, 170 170, 170 200`}
              fill="none"
              stroke={INK}
              strokeOpacity="0.7"
              strokeWidth="1.5"
              strokeDasharray={op.logo ? undefined : "5 5"}
            />
            <OperatorNode x={n.x} y={n.y} w={162} op={op} others={t("others")} />
          </g>
        );
      })}
      <Hub cx={170} cy={258} sub={t("hub")} />
      <path d="M170 316 V 366" fill="none" stroke={INK} strokeWidth="2.5" />
      <path d="M162 358 L 170 368 L 178 358" fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <text x="184" y="346" fontSize="13" fontWeight="600" letterSpacing="1" fill={SOFT}>
        {t("connection")}
      </text>
      <Building x={122} y={428} />
      <text x="170" y="556" textAnchor="middle" fontSize="17" fontWeight="700" fill={INK}>
        {t("site")}
      </text>
      <text x="170" y="578" textAnchor="middle" fontSize="13.5" fontWeight="600" fill={SOFT}>
        {t("siteSub")}
      </text>
    </svg>
  );
}
