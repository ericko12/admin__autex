// SVG illustrations for automotive parts — white/transparent background, catalog-style

interface AutopartIconProps {
  sku: string;
  size?: number;
}

export function AutopartIcon({ sku, size = 56 }: AutopartIconProps) {
  const prefix = sku.split('-')[0];

  const icons: Record<string, JSX.Element> = {
    // ── Oil filter ──────────────────────────────────────────────────────────
    'FIL-001': (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="10" width="40" height="12" rx="4" fill="#e0e0e0" stroke="#9e9e9e" strokeWidth="2"/>
        <rect x="25" y="22" width="50" height="58" rx="8" fill="#f5f5f5" stroke="#9e9e9e" strokeWidth="2"/>
        <rect x="33" y="30" width="34" height="42" rx="5" fill="#fff" stroke="#bdbdbd" strokeWidth="1.5"/>
        <line x1="50" y1="30" x2="50" y2="72" stroke="#e0e0e0" strokeWidth="1"/>
        <line x1="40" y1="30" x2="40" y2="72" stroke="#e0e0e0" strokeWidth="1"/>
        <line x1="60" y1="30" x2="60" y2="72" stroke="#e0e0e0" strokeWidth="1"/>
        <rect x="38" y="10" width="24" height="5" rx="2" fill="#bdbdbd"/>
        <circle cx="50" cy="51" r="8" fill="#e0e0e0" stroke="#9e9e9e" strokeWidth="1.5"/>
        <text x="50" y="55" textAnchor="middle" fontSize="8" fill="#757575" fontFamily="sans-serif">FILTER</text>
      </svg>
    ),

    // ── Air filter ───────────────────────────────────────────────────────────
    'FIL-002': (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="38" ry="30" fill="#f5f5f5" stroke="#9e9e9e" strokeWidth="2"/>
        <ellipse cx="50" cy="50" rx="28" ry="20" fill="#e8e8e8" stroke="#bdbdbd" strokeWidth="1.5"/>
        <ellipse cx="50" cy="50" rx="18" ry="11" fill="#fff" stroke="#bdbdbd" strokeWidth="1.5"/>
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
          <line key={i}
            x1={50 + 18 * Math.cos(angle * Math.PI/180)}
            y1={50 + 11 * Math.sin(angle * Math.PI/180)}
            x2={50 + 28 * Math.cos(angle * Math.PI/180)}
            y2={50 + 20 * Math.sin(angle * Math.PI/180)}
            stroke="#9e9e9e" strokeWidth="1.2"/>
        ))}
        <rect x="40" y="42" width="20" height="16" rx="3" fill="#fff" stroke="#bdbdbd" strokeWidth="1"/>
        <text x="50" y="53" textAnchor="middle" fontSize="7" fill="#757575" fontFamily="sans-serif">AIR</text>
      </svg>
    ),

    // ── Fuel filter ──────────────────────────────────────────────────────────
    'FIL-099': (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="38" y="5" width="10" height="14" rx="3" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1.5"/>
        <rect x="52" y="5" width="10" height="14" rx="3" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1.5"/>
        <rect x="30" y="18" width="40" height="68" rx="10" fill="#f5f5f5" stroke="#9e9e9e" strokeWidth="2"/>
        <rect x="36" y="26" width="28" height="52" rx="6" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
        <line x1="36" y1="38" x2="64" y2="38" stroke="#e0e0e0" strokeWidth="1"/>
        <line x1="36" y1="50" x2="64" y2="50" stroke="#e0e0e0" strokeWidth="1"/>
        <line x1="36" y1="62" x2="64" y2="62" stroke="#e0e0e0" strokeWidth="1"/>
        <circle cx="50" cy="52" r="6" fill="#e0e0e0" stroke="#9e9e9e" strokeWidth="1"/>
      </svg>
    ),

    // ── Brake pads ───────────────────────────────────────────────────────────
    'FRE-045': (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="25" width="32" height="50" rx="6" fill="#f5f5f5" stroke="#9e9e9e" strokeWidth="2"/>
        <rect x="19" y="30" width="24" height="34" rx="3" fill="#616161" stroke="#424242" strokeWidth="1"/>
        <rect x="19" y="64" width="24" height="7" rx="2" fill="#9e9e9e"/>
        <rect x="53" y="25" width="32" height="50" rx="6" fill="#f5f5f5" stroke="#9e9e9e" strokeWidth="2"/>
        <rect x="57" y="30" width="24" height="34" rx="3" fill="#616161" stroke="#424242" strokeWidth="1"/>
        <rect x="57" y="64" width="24" height="7" rx="2" fill="#9e9e9e"/>
        <rect x="28" y="20" width="8" height="8" rx="1" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1"/>
        <rect x="64" y="20" width="8" height="8" rx="1" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1"/>
      </svg>
    ),

    // ── Brake disc ───────────────────────────────────────────────────────────
    'FRE-078': (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="42" fill="#f5f5f5" stroke="#9e9e9e" strokeWidth="2"/>
        <circle cx="50" cy="50" r="30" fill="#e0e0e0" stroke="#9e9e9e" strokeWidth="1.5"/>
        <circle cx="50" cy="50" r="12" fill="#f5f5f5" stroke="#9e9e9e" strokeWidth="2"/>
        {[0,45,90,135,180,225,270,315].map((angle, i) => (
          <rect key={i}
            x="46" y="14"
            width="8" height="18" rx="3"
            fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1"
            transform={`rotate(${angle} 50 50)`}/>
        ))}
        <circle cx="50" cy="50" r="5" fill="#9e9e9e"/>
      </svg>
    ),

    // ── Shock absorber ───────────────────────────────────────────────────────
    'SUS-112': (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="10" r="8" fill="#e0e0e0" stroke="#9e9e9e" strokeWidth="2"/>
        <rect x="44" y="18" width="12" height="30" rx="3" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1.5"/>
        <rect x="40" y="46" width="20" height="34" rx="4" fill="#f5f5f5" stroke="#9e9e9e" strokeWidth="2"/>
        {[50,56,62,68,74].map((y, i) => (
          <line key={i} x1="40" y1={y} x2="60" y2={y} stroke="#e0e0e0" strokeWidth="1"/>
        ))}
        <circle cx="50" cy="90" r="8" fill="#e0e0e0" stroke="#9e9e9e" strokeWidth="2"/>
        <circle cx="50" cy="10" r="3" fill="#9e9e9e"/>
        <circle cx="50" cy="90" r="3" fill="#9e9e9e"/>
      </svg>
    ),

    // ── Ball joint ───────────────────────────────────────────────────────────
    'SUS-200': (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="42" y="5" width="16" height="40" rx="4" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="2"/>
        <circle cx="50" cy="55" r="20" fill="#e0e0e0" stroke="#9e9e9e" strokeWidth="2"/>
        <circle cx="50" cy="55" r="12" fill="#f5f5f5" stroke="#bdbdbd" strokeWidth="1.5"/>
        <circle cx="50" cy="55" r="5" fill="#9e9e9e"/>
        <rect x="34" y="72" width="32" height="10" rx="3" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1.5"/>
        <rect x="42" y="82" width="16" height="14" rx="3" fill="#e0e0e0" stroke="#9e9e9e" strokeWidth="1.5"/>
      </svg>
    ),

    // ── Battery ──────────────────────────────────────────────────────────────
    'ELE-230': (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="80" height="55" rx="6" fill="#f5f5f5" stroke="#9e9e9e" strokeWidth="2"/>
        <rect x="10" y="30" width="80" height="10" rx="0" fill="#e0e0e0"/>
        <rect x="28" y="16" width="14" height="12" rx="3" fill="#424242"/>
        <rect x="58" y="16" width="14" height="12" rx="3" fill="#424242"/>
        <rect x="18" y="50" width="28" height="20" rx="3" fill="#e8e8e8" stroke="#bdbdbd" strokeWidth="1"/>
        <rect x="54" y="50" width="28" height="20" rx="3" fill="#e8e8e8" stroke="#bdbdbd" strokeWidth="1"/>
        <text x="32" y="64" textAnchor="middle" fontSize="9" fill="#388e3c" fontFamily="sans-serif">+</text>
        <text x="68" y="64" textAnchor="middle" fontSize="9" fill="#d32f2f" fontFamily="sans-serif">−</text>
        <text x="50" y="85" textAnchor="middle" fontSize="7" fill="#757575" fontFamily="sans-serif">12V 70Ah</text>
      </svg>
    ),

    // ── Alternator ───────────────────────────────────────────────────────────
    'ELE-101': (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="52" r="38" fill="#f5f5f5" stroke="#9e9e9e" strokeWidth="2"/>
        <circle cx="50" cy="52" r="28" fill="#e0e0e0" stroke="#bdbdbd" strokeWidth="1.5"/>
        <circle cx="50" cy="52" r="14" fill="#f5f5f5" stroke="#9e9e9e" strokeWidth="2"/>
        {[0,60,120,180,240,300].map((angle, i) => (
          <rect key={i} x="47" y="24" width="6" height="14" rx="2"
            fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1"
            transform={`rotate(${angle} 50 52)`}/>
        ))}
        <circle cx="50" cy="52" r="6" fill="#9e9e9e"/>
        <rect x="44" y="8" width="12" height="10" rx="2" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1.5"/>
        <line x1="50" y1="18" x2="50" y2="24" stroke="#9e9e9e" strokeWidth="2"/>
      </svg>
    ),

    // ── Oxygen sensor ────────────────────────────────────────────────────────
    'ELE-305': (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="44" y="5" width="12" height="20" rx="2" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1.5"/>
        {[10,16,22,28].map((y,i) => (
          <line key={i} x1="44" y1={y} x2="40" y2={y} stroke={['#e53935','#000','#fff','#9e9e9e'][i]} strokeWidth="2"/>
        ))}
        <rect x="38" y="24" width="24" height="16" rx="3" fill="#e0e0e0" stroke="#9e9e9e" strokeWidth="2"/>
        <rect x="42" y="40" width="16" height="8" rx="2" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1.5"/>
        <polygon points="50,48 42,56 58,56" fill="#9e9e9e"/>
        <rect x="44" y="55" width="12" height="30" rx="4" fill="#616161" stroke="#424242" strokeWidth="1.5"/>
        {[60,66,72,78].map((y,i) => (
          <line key={i} x1="44" y1={y} x2="56" y2={y} stroke="#424242" strokeWidth="1"/>
        ))}
        <circle cx="50" cy="90" r="5" fill="#e0e0e0" stroke="#9e9e9e" strokeWidth="1.5"/>
      </svg>
    ),

    // ── Spark plug ───────────────────────────────────────────────────────────
    'MOT-088': (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="44" y="5" width="12" height="18" rx="3" fill="#e0e0e0" stroke="#9e9e9e" strokeWidth="1.5"/>
        <rect x="40" y="22" width="20" height="14" rx="3" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="2"/>
        <rect x="42" y="35" width="16" height="8" rx="2" fill="#9e9e9e" stroke="#757575" strokeWidth="1"/>
        <polygon points="42,35 50,20 58,35" fill="none" stroke="#bdbdbd" strokeWidth="1"/>
        <rect x="44" y="43" width="12" height="38" rx="3" fill="#616161" stroke="#424242" strokeWidth="1.5"/>
        {[49,55,61,67,73].map((y,i) => (
          <line key={i} x1="44" y1={y} x2="56" y2={y} stroke="#424242" strokeWidth="0.8"/>
        ))}
        <line x1="50" y1="81" x2="50" y2="90" stroke="#424242" strokeWidth="2"/>
        <line x1="50" y1="88" x2="56" y2="94" stroke="#424242" strokeWidth="2"/>
        <text x="50" y="18" textAnchor="middle" fontSize="7" fill="#ffd600" fontFamily="sans-serif">⚡</text>
      </svg>
    ),

    // ── Head gasket ──────────────────────────────────────────────────────────
    'MOT-145': (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="20" width="84" height="60" rx="5" fill="#e0e0e0" stroke="#9e9e9e" strokeWidth="2"/>
        <rect x="14" y="26" width="72" height="48" rx="4" fill="#f5f5f5" stroke="#bdbdbd" strokeWidth="1.5"/>
        <ellipse cx="34" cy="50" rx="14" ry="18" fill="#fff" stroke="#9e9e9e" strokeWidth="1.5"/>
        <ellipse cx="66" cy="50" rx="14" ry="18" fill="#fff" stroke="#9e9e9e" strokeWidth="1.5"/>
        {[15,45,55,85].map((x,i) => (
          <circle key={i} cx={x} cy="30" r="4" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1"/>
        ))}
        {[15,45,55,85].map((x,i) => (
          <circle key={i} cx={x} cy="70" r="4" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1"/>
        ))}
        <text x="50" y="54" textAnchor="middle" fontSize="7" fill="#9e9e9e" fontFamily="sans-serif">GASKET</text>
      </svg>
    ),

    // ── Thermostat ───────────────────────────────────────────────────────────
    'COL-019': (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="48" r="32" fill="#f5f5f5" stroke="#9e9e9e" strokeWidth="2"/>
        <circle cx="50" cy="48" r="22" fill="#e0e0e0" stroke="#bdbdbd" strokeWidth="1.5"/>
        <circle cx="50" cy="48" r="10" fill="#fff" stroke="#9e9e9e" strokeWidth="2"/>
        <rect x="44" y="14" width="12" height="16" rx="4" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="2"/>
        <line x1="50" y1="28" x2="50" y2="38" stroke="#9e9e9e" strokeWidth="2"/>
        <line x1="50" y1="58" x2="50" y2="68" stroke="#9e9e9e" strokeWidth="2"/>
        <line x1="28" y1="48" x2="38" y2="48" stroke="#9e9e9e" strokeWidth="2"/>
        <line x1="62" y1="48" x2="72" y2="48" stroke="#9e9e9e" strokeWidth="2"/>
        <circle cx="50" cy="48" r="4" fill="#f44336"/>
        <text x="50" y="84" textAnchor="middle" fontSize="8" fill="#757575" fontFamily="sans-serif">82°C</text>
      </svg>
    ),

    // ── Radiator ─────────────────────────────────────────────────────────────
    'COL-055': (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="15" width="84" height="70" rx="5" fill="#f5f5f5" stroke="#9e9e9e" strokeWidth="2"/>
        <rect x="8" y="15" width="84" height="10" rx="5" fill="#e0e0e0" stroke="#9e9e9e" strokeWidth="1"/>
        <rect x="8" y="75" width="84" height="10" rx="5" fill="#e0e0e0" stroke="#9e9e9e" strokeWidth="1"/>
        {[20,30,40,50,60,70,80].map((x,i) => (
          <rect key={i} x={x} y="26" width="6" height="48" rx="2" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1"/>
        ))}
        {[35,45,55,65].map((y,i) => (
          <line key={i} x1="18" y1={y} x2="82" y2={y} stroke="#e0e0e0" strokeWidth="1"/>
        ))}
        <circle cx="20" cy="10" r="5" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1.5"/>
        <circle cx="80" cy="90" r="5" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1.5"/>
      </svg>
    ),

    // ── Clutch kit ───────────────────────────────────────────────────────────
    'TRA-067': (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" fill="#f5f5f5" stroke="#9e9e9e" strokeWidth="2"/>
        <circle cx="50" cy="50" r="30" fill="#e8e8e8" stroke="#bdbdbd" strokeWidth="1.5"/>
        {[0,60,120,180,240,300].map((angle, i) => (
          <ellipse key={i} cx={50 + 22*Math.cos(angle*Math.PI/180)} cy={50 + 22*Math.sin(angle*Math.PI/180)}
            rx="5" ry="5" fill="#9e9e9e" stroke="#757575" strokeWidth="1"/>
        ))}
        <circle cx="50" cy="50" r="16" fill="#f5f5f5" stroke="#9e9e9e" strokeWidth="2"/>
        <circle cx="50" cy="50" r="8" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1.5"/>
        <circle cx="50" cy="50" r="3" fill="#9e9e9e"/>
      </svg>
    ),

    // ── CV axle / semieje ────────────────────────────────────────────────────
    'TRA-033': (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="50" r="14" fill="#e0e0e0" stroke="#9e9e9e" strokeWidth="2"/>
        <circle cx="18" cy="50" r="8" fill="#f5f5f5" stroke="#bdbdbd" strokeWidth="1.5"/>
        {[0,72,144,216,288].map((angle,i) => (
          <circle key={i} cx={18+7*Math.cos(angle*Math.PI/180)} cy={50+7*Math.sin(angle*Math.PI/180)}
            r="2.5" fill="#9e9e9e"/>
        ))}
        <rect x="32" y="47" width="36" height="6" rx="3" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1.5"/>
        <circle cx="82" cy="50" r="14" fill="#e0e0e0" stroke="#9e9e9e" strokeWidth="2"/>
        <circle cx="82" cy="50" r="8" fill="#f5f5f5" stroke="#bdbdbd" strokeWidth="1.5"/>
        {[0,72,144,216,288].map((angle,i) => (
          <circle key={i} cx={82+7*Math.cos(angle*Math.PI/180)} cy={50+7*Math.sin(angle*Math.PI/180)}
            r="2.5" fill="#9e9e9e"/>
        ))}
        <line x1="18" y1="42" x2="18" y2="36" stroke="#9e9e9e" strokeWidth="2"/>
        <line x1="82" y1="64" x2="82" y2="58" stroke="#9e9e9e" strokeWidth="2"/>
      </svg>
    ),
  };

  // Fallback by category prefix
  const fallbacks: Record<string, JSX.Element> = {
    FIL: icons['FIL-001'],
    FRE: icons['FRE-045'],
    SUS: icons['SUS-112'],
    ELE: icons['ELE-230'],
    MOT: icons['MOT-088'],
    COL: icons['COL-019'],
    TRA: icons['TRA-067'],
  };

  const icon = icons[sku] ?? fallbacks[prefix] ?? (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="2"/>
      <text x="50" y="55" textAnchor="middle" fontSize="10" fill="#bdbdbd" fontFamily="sans-serif">PART</text>
    </svg>
  );

  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center bg-white rounded-lg border border-gray-100 overflow-hidden"
    >
      <div style={{ width: size - 8, height: size - 8 }}>
        {icon}
      </div>
    </div>
  );
}
