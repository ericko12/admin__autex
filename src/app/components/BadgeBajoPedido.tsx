export function BadgeBajoPedido() {
  return (
    <span className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-xs font-semibold rounded-full px-3 py-1.5 leading-none select-none">
      {/* Hourglass SVG */}
      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M1 1h10M1 13h10M2 1v2.5C2 6 6 7 6 7S2 8 2 10.5V13M10 1v2.5C10 6 6 7 6 7s4 1 4 3.5V13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Bajo pedido
    </span>
  );
}
